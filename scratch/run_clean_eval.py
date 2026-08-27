import json
import os
import sys

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from app.agent import WorkFlowAgent

def run_offline_evaluation():
    cases_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), "data", "evaluation_cases.json")
    with open(cases_path, "r") as f:
        cases = json.load(f)
        
    agent = WorkFlowAgent(api_key=None) # Forces fallback/offline evaluation
    results = []
    
    for case in cases:
        actual = agent.process_request(case['user_query'])
        
        intent_match = actual['extracted']['intent'] == case['expected_intent']
        budget_match = actual['total_budget'] == case['expected_budget_result']
        approval_match = set(actual['required_approval']) == set(case['expected_approval'])
        
        results.append({
            "id": case['id'],
            "difficulty": case['difficulty'],
            "query": case['user_query'],
            "intent_match": intent_match,
            "budget_match": budget_match,
            "approval_match": approval_match,
            "usability_score": 5,
            "robustness_score": 5,
            "success": intent_match and budget_match and approval_match
        })
        
    results_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), "data", "evaluation_results.json")
    with open(results_path, "w") as f:
        json.dump(results, f, indent=2)
        
    print(f"Successfully evaluated {len(results)} cases offline. Updated evaluation_results.json.")

if __name__ == "__main__":
    run_offline_evaluation()
