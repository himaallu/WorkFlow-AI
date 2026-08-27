import json
import os
import sys
import time
from pydantic import BaseModel
from google import genai
from google.genai import types

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from app.agent import WorkFlowAgent

class SubjectiveEvaluation(BaseModel):
    usability_score: int = types.Field(description="Score out of 5 for usability and response quality.")
    usability_reason: str = types.Field(description="Reason for the usability score.")
    robustness_score: int = types.Field(description="Score out of 5 for robustness (handling vague inputs).")
    robustness_reason: str = types.Field(description="Reason for the robustness score.")

def evaluate_subjective(agent: WorkFlowAgent, query: str, response: dict) -> SubjectiveEvaluation:
    prompt = f"""
    Evaluate the following procurement AI response based on the user query.
    
    User Query: {query}
    Agent Response: {json.dumps(response, indent=2)}
    
    Provide a score out of 5 for:
    1. Usability: Is the response clear, helpful, and formatted well?
    2. Robustness: Did the agent handle missing or vague information gracefully?
    """
    res = agent.client.models.generate_content(
        model=agent.model_id,
        contents=prompt,
        config=types.GenerateContentConfig(
            response_mime_type="application/json",
            response_schema=SubjectiveEvaluation,
        ),
    )
    return SubjectiveEvaluation.model_validate_json(res.text)

def run_evaluation(cases_path: str):
    agent = WorkFlowAgent()
    with open(cases_path, "r") as f:
        cases = json.load(f)
    
    results = []
    
    for case in cases:
        success = False
        retries = 3
        while retries > 0 and not success:
            try:
                actual = agent.process_request(case['user_query'])
                
                # Deterministic Evaluation
                intent_match = actual['extracted']['intent'] == case['expected_intent']
                budget_match = actual['total_budget'] == case['expected_budget_result']
                approval_match = set(actual['required_approval']) == set(case['expected_approval'])
                
                # LLM-assisted Evaluation
                sub_eval = evaluate_subjective(agent, case['user_query'], actual)
                
                results.append({
                    "id": case['id'],
                    "difficulty": case['difficulty'],
                    "query": case['user_query'],
                    "intent_match": intent_match,
                    "budget_match": budget_match,
                    "approval_match": approval_match,
                    "usability_score": sub_eval.usability_score,
                    "robustness_score": sub_eval.robustness_score,
                    "success": intent_match and budget_match and approval_match
                })
                success = True
                time.sleep(12) # Delay between requests to stay under rate limits
            except Exception as e:
                err_str = str(e)
                if "429" in err_str or "RESOURCE_EXHAUSTED" in err_str:
                    print(f"Rate limited on {case['id']}, retrying in 20s...")
                    time.sleep(20)
                    retries -= 1
                else:
                    results.append({
                        "id": case['id'],
                        "difficulty": case['difficulty'],
                        "query": case['user_query'],
                        "error": err_str,
                        "success": False
                    })
                    break
            
    with open(os.path.join(os.path.dirname(cases_path), "evaluation_results.json"), "w") as f:
        json.dump(results, f, indent=2)
        
    print(f"Evaluated {len(cases)} cases. Results saved to evaluation_results.json")

if __name__ == "__main__":
    cases_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), "data", "evaluation_cases.json")
    run_evaluation(cases_path)
