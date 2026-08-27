# Key Product & Engineering Decisions

1. **Deterministic Logic over LLM Math**
   - *Decision:* Budget calculations and approval routing are handled by Python functions (`app/tools.py`), not by prompting the LLM.
   - *Reasoning:* LLMs are prone to arithmetic hallucinations. Procurement requires 100% accuracy for budgets and compliance.

2. **Modular Tool Architecture**
   - *Decision:* Abstracted `search_vendors`, `check_policy_compliance`, etc., into independent functions.
   - *Reasoning:* Allows easy unit testing (`pytest`) and future replacement with real API calls without touching the LLM agent code.

3. **Evaluation as a Core Feature**
   - *Decision:* Built a dedicated Evaluation Dashboard into the main Streamlit app.
   - *Reasoning:* AI products are non-deterministic. Continuous evaluation is a product feature, not just a QA step, providing transparency into model performance.

4. **Hybrid Evaluation Methodology**
   - *Decision:* Use exact matching for intent and budget, but use "LLM-as-a-judge" for usability and robustness.
   - *Reasoning:* Objective criteria should be evaluated deterministically. Subjective criteria (like how politely or clearly the bot responded) require an LLM judge.

5. **Local Synthetic Data**
   - *Decision:* Used CSV and TXT files for vendors and policies instead of a cloud database.
   - *Reasoning:* Ensures the project is lightweight, reproducible, and can be demoed locally in under 3 minutes without infrastructure setup.

6. **Separation of Extraction and Execution**
   - *Decision:* The LLM uses Structured Output (Pydantic) to extract entities *first*, and then Python code executes the workflow sequentially.
   - *Reasoning:* Tightly controls the workflow execution and prevents the LLM from taking unauthorized actions (e.g., generating a purchase request without checking the budget).
