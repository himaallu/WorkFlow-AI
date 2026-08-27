import json

cases = []

# 10 Simple
for i in range(1, 11):
    cases.append({
        "id": f"simple-{i:02d}",
        "difficulty": "Simple",
        "user_query": f"What approval is required for a AED {i*2000} purchase?",
        "expected_intent": "check_approval",
        "expected_requirements": {"budget": i*2000},
        "expected_policy_result": "Manager" if i*2000 < 5000 else "Department Head",
        "expected_budget_result": i*2000,
        "expected_approval": ["Manager"] if i*2000 < 5000 else ["Department Head"],
        "expected_workflow": ["Approval Determination"]
    })

# 10 Medium
for i in range(1, 11):
    budget = 15000 + i * 1000
    cases.append({
        "id": f"medium-{i:02d}",
        "difficulty": "Medium",
        "user_query": f"Find three laptops under AED {budget} and identify the required approval.",
        "expected_intent": "procurement_request",
        "expected_requirements": {"category": "laptops", "budget": budget, "quantity": 3},
        "expected_policy_result": "Department Head",
        "expected_budget_result": budget,
        "expected_approval": ["Department Head"],
        "expected_workflow": ["Vendor Search", "Policy Validation", "Approval Determination"]
    })

# 10 Complex
for i in range(1, 11):
    qty = 5 + i
    budget = qty * 4500
    cases.append({
        "id": f"complex-{i:02d}",
        "difficulty": "Complex",
        "user_query": f"I need {qty} laptops for my Dubai engineering team with a total budget of AED {budget}. Find suitable vendors, compare total costs, check procurement policy compliance, and determine the approval workflow.",
        "expected_intent": "procurement_request",
        "expected_requirements": {"category": "laptops", "quantity": qty, "location": "Dubai", "budget": budget},
        "expected_policy_result": "Department Head" if budget <= 25000 else ("Department Head + Finance" if budget <= 100000 else "Department Head + Finance + Procurement"),
        "expected_budget_result": budget,
        "expected_approval": ["Department Head"] if budget <= 25000 else (["Department Head", "Finance"] if budget <= 100000 else ["Department Head", "Finance", "Procurement"]),
        "expected_workflow": ["Vendor Search", "Budget Validation", "Policy Validation", "Approval Determination", "Purchase Request Generation"]
    })

with open('data/evaluation_cases.json', 'w') as f:
    json.dump(cases, f, indent=2)

print("Generated 30 evaluation cases.")
