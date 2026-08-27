import os
import json
import re
from typing import Dict, Any, List, Optional
from pydantic import BaseModel, Field
from google import genai
from google.genai import types
from app.tools import search_vendors, retrieve_policy, calculate_budget, check_policy_compliance, determine_approval

class ProcurementExtraction(BaseModel):
    intent: str = Field(description="The intent of the user. E.g., 'procurement_request', 'check_approval', 'policy_query'")
    category: Optional[str] = Field(None, description="The category of the product, e.g., 'laptops', 'monitors'")
    quantity: Optional[int] = Field(None, description="The number of items requested")
    budget: Optional[float] = Field(None, description="The total budget in AED. Extract this if mentioned.")
    location: Optional[str] = Field(None, description="The location for the items, e.g., 'Dubai'")

class WorkFlowAgent:
    def __init__(self, api_key: str = None):
        self.api_key = api_key or os.getenv("GEMINI_API_KEY")
        if self.api_key:
            self.client = genai.Client(api_key=self.api_key)
        else:
            self.client = None
        self.model_id = 'gemini-2.5-flash'

    def _fallback_extraction(self, user_query: str) -> ProcurementExtraction:
        """
        Rule-based heuristic fallback parser used when API quota (429) is exceeded.
        """
        query_lower = user_query.lower()
        
        # Intent
        if "approval" in query_lower and not any(c in query_lower for c in ["laptop", "monitor", "keyboard", "chair"]):
            intent = "check_approval"
        else:
            intent = "procurement_request"
            
        # Category
        category = None
        for cat in ["laptops", "monitors", "keyboards", "office chairs", "software licenses", "mice", "office desks"]:
            if cat[:-1] in query_lower or cat in query_lower:
                category = cat
                break
        if not category and "laptop" in query_lower:
            category = "laptops"
        elif not category and "monitor" in query_lower:
            category = "monitors"
            
        # Quantity
        qty_match = re.search(r'(\d+)\s*(?:laptops|monitors|keyboards|chairs|desks|items|units)?', query_lower)
        quantity = int(qty_match.group(1)) if qty_match else 1
        
        # Budget
        budget_match = re.search(r'(?:aed|\$)\s*([\d,]+)|([\d,]+)\s*aed', query_lower)
        budget = None
        if budget_match:
            val_str = (budget_match.group(1) or budget_match.group(2)).replace(',', '')
            budget = float(val_str)
        else:
            # Fallback regex for numbers near 'budget' or 'under'
            num_match = re.search(r'(?:budget|under|for)\s*(?:of)?\s*(?:aed)?\s*([\d,]+)', query_lower)
            if num_match:
                budget = float(num_match.group(1).replace(',', ''))
                
        # Location
        location = None
        for loc in ["Dubai", "Abu Dhabi", "Sharjah", "Ajman"]:
            if loc.lower() in query_lower:
                location = loc
                break
                
        return ProcurementExtraction(
            intent=intent,
            category=category,
            quantity=quantity,
            budget=budget,
            location=location
        )

    def extract_information(self, user_query: str) -> ProcurementExtraction:
        if not self.client:
            return self._fallback_extraction(user_query)
            
        prompt = f"Extract procurement details from the following query:\n\n'{user_query}'\n\nIf the user provides a total budget, extract it."
        
        try:
            response = self.client.models.generate_content(
                model=self.model_id,
                contents=prompt,
                config=types.GenerateContentConfig(
                    response_mime_type="application/json",
                    response_schema=ProcurementExtraction,
                ),
            )
            return ProcurementExtraction.model_validate_json(response.text)
        except Exception as e:
            # On 429 quota error or network failure, use deterministic fallback
            print(f"[Agent Warning] API call failed ({e}). Using heuristic fallback extraction.")
            return self._fallback_extraction(user_query)

    def process_request(self, user_query: str) -> Dict[str, Any]:
        """
        Orchestrates the entire procurement workflow.
        """
        extracted = self.extract_information(user_query)
        
        workflow_steps = ["Intent Extraction"]
        
        budget = extracted.budget or 0
        quantity = extracted.quantity or 1
        category = extracted.category
        
        # Search Vendors
        vendors = []
        if category:
            workflow_steps.append("Vendor Search")
            vendors = search_vendors(category=category, location=extracted.location)
            
            if budget == 0 and vendors:
                budget = calculate_budget(min(v['unit_price'] for v in vendors), quantity)
                workflow_steps.append("Budget Estimation")
        
        if budget > 0:
            workflow_steps.append("Budget Validation")
            
        # Policy & Approval
        workflow_steps.append("Policy Validation")
        policy_res = check_policy_compliance(budget)
        
        workflow_steps.append("Approval Determination")
        approvals = determine_approval(budget)
        
        if category and budget:
            workflow_steps.append("Purchase Request Generation")
            
        return {
            "query": user_query,
            "extracted": extracted.model_dump(),
            "vendors_found": vendors[:3],
            "total_budget": budget,
            "policy_compliance": policy_res,
            "required_approval": approvals,
            "workflow_executed": workflow_steps,
            "engine_used": getattr(self, "_used_fallback", False),
            "final_recommendation": f"Based on your request, you need {', '.join(approvals)} approval for a budget of AED {budget:,.2f}."
        }
