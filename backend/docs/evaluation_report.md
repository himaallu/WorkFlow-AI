# Evaluation Report

## Objective
To evaluate the WorkFlowAI agent's ability to accurately parse procurement requests, apply deterministic enterprise policies, calculate budgets, and recommend approval workflows.

## Test Dataset
- **Size:** 30 synthetic test cases.
- **Difficulty Breakdown:** 10 Simple, 10 Medium, 10 Complex.
- **Constraints:** Synthetic policies require manager approval below AED 5k, Head below AED 25k, Finance below AED 100k.

## Methodology
The evaluation suite (`app/evaluator.py`) runs each query against the `WorkFlowAgent`.
1. **Deterministic Metrics:** Intent extraction, Budget matching, and Approval matching are automatically compared against expected values.
2. **LLM-as-a-judge:** An LLM reviews the output and assigns a score (1-5) for *Usability* and *Robustness*.

## Actual Results
Out of the runs executed, the application experienced significant infrastructure limitations that halted execution on most cases:
- **Success Rate (when API available):** 100% on intent, budget, and approval matches for processed cases.
- **Overall Success Rate (including API failures):** 0-10% depending on rate limit throttling.

### Representative Successful Case
**Query:** "What approval is required for a AED 4000 purchase?"
**Result:** 
- Intent Match: True
- Budget Match: True
- Approval Match: True (Manager)
- Usability Score: 4/5
- Robustness Score: 5/5

## Failure Modes Analysis
During the evaluation, the primary failure modes were entirely infrastructural rather than logic-based:

1. **`RESOURCE_EXHAUSTED` (Rate Limits)**
   - The primary model (`gemini-3.6-flash`) enforces a strict 5 Requests-Per-Minute (RPM) limit on the free tier. This caused 90% of the batch evaluation to fail with HTTP 429.
2. **`NOT_FOUND` (Model Availability)**
   - Attempts to fall back to `gemini-1.5-flash` or `gemini-2.5-flash` using the `v1beta` API version through `google-genai` resulted in 404 errors, indicating the API key/project does not have access to these models in this specific SDK version.

*Note: No logic failures (e.g., incorrect budget math or wrong policy routing) were observed.*

## Recommendations for Product Optimization
1. **Queueing & Rate Limit Handling:** Implement exponential backoff (e.g., `tenacity` retry loops) in the agent layer to handle `RESOURCE_EXHAUSTED` errors gracefully.
2. **Model Fallbacks:** Implement a dynamic model routing system that checks `ModelService.ListModels` to verify availability before attempting generation, falling back to a cheaper/available model if the primary is unavailable.
3. **Caching:** Cache repeated queries (like identical policy checks) to reduce API load.

## Limitations
- **Data:** All vendors, policies, and evaluation metrics are synthetic/demo data.
- **Scale:** The evaluation was artificially bottlenecked by the API key's free-tier limits, preventing a full assessment of the Complex test cases.
