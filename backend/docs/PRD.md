# WorkFlowAI Product Requirements Document (PRD)

## 1. Problem
Enterprise procurement is often a fragmented, manual process requiring employees to navigate disparate vendor catalogs, interpret complex approval policies, and manually calculate budgets. This leads to slow fulfillment, policy violations, and poor employee experience.

## 2. Target Users
- **Employees/Requesters:** Need to quickly request equipment or software without memorizing policies.
- **Procurement Managers:** Need to ensure compliance and automate low-level requests.
- **Finance Teams:** Need accurate budget calculations and correct approval routing.

## 3. User Pain Points
- "I don't know who needs to approve a $10k purchase."
- "Searching for vendors and comparing prices takes too much time."
- "I have to read a 20-page PDF to understand if I need 1 or 3 quotations."

## 4. Product Hypothesis
By providing an AI-powered natural language interface, we can automate vendor selection, budget calculation, and policy compliance checks, reducing the time to generate a valid purchase request from hours to seconds.

## 5. User Journey
1. User enters natural language request (e.g., "I need 10 laptops under $10k for Dubai").
2. WorkFlowAI extracts intent, category, location, and budget constraints.
3. System retrieves matching vendors from the database.
4. System calculates total budget and checks procurement policy (e.g., quotations needed).
5. System determines the exact approval workflow (e.g., Manager + Finance).
6. User reviews the summary and clicks "Generate Purchase Request".

## 6. Core Features
- **Natural Language Intent Extraction:** Uses LLMs to parse complex requests.
- **Automated Vendor Matching:** Filters vendors by category, price, and location.
- **Deterministic Policy Engine:** Calculates required approvals based on strict thresholds.
- **Workflow Automation:** Recommends the exact next steps for the user.

## 7. Functional Requirements
- Must support Streamlit-based web interface.
- Must separate LLM parsing from deterministic logic (calculations must not use LLMs).
- Must provide real-time vendor recommendations based on a structured dataset.

## 8. Evaluation Metrics
- **Intent Accuracy:** Does the system understand the request type?
- **Requirement Extraction:** Are budget, location, and quantity correctly parsed?
- **Policy Compliance:** Are the quotation rules applied correctly?
- **Budget Correctness:** Is the total budget mathematically correct?
- **Usability (LLM Judge):** Is the final recommendation helpful?

## 9. Success Metrics
- 90%+ Accuracy on Intent Extraction.
- 100% Accuracy on Budget Calculation and Approval Routing.
- Under 5 seconds response time per request.

## 10. Future Improvements
- Integration with real vendor APIs (Amazon Business, CDW).
- Integration with Slack/Teams for approval routing.
- Agentic multi-step negotiation with vendors.
