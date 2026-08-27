# WorkFlowAI Architecture

## Conceptual Flow

```mermaid
graph TD
    A[User Request] --> B[LLM Intent & Requirement Extraction]
    B --> C[Agent / Workflow Controller]
    
    subgraph Deterministic Tools
    D[Policy Retrieval]
    E[Vendor Search]
    F[Budget Validation]
    end
    
    C --> D
    C --> E
    C --> F
    
    D --> G[Approval Determination]
    F --> G
    
    E --> H[Recommendation Generation]
    G --> H
    
    H --> I[Purchase Request]
```

## Evaluation Architecture

```mermaid
graph TD
    A[Synthetic Test Cases] --> B[Agent Processing]
    B --> C[Expected vs Actual Matching]
    
    C --> D[Deterministic Metrics: Budget, Intent, Approval]
    C --> E[LLM-as-a-judge: Usability, Robustness]
    
    D --> F[Evaluation Results & Failure Analysis]
    E --> F
    
    F --> G[Product Recommendations]
```

## Components
1. **Frontend:** Streamlit (`app/main.py`).
2. **Agent:** `app/agent.py` orchestrates the flow using `google-genai` SDK.
3. **Tools:** `app/tools.py` provides deterministic Python functions for search and math.
4. **Evaluator:** `app/evaluator.py` runs batch testing and calculates granular metrics.
