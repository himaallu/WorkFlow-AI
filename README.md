# WorkFlowAI: Enterprise Procurement Copilot & Evaluation Engine

[![Next.js 14](https://img.shields.io/badge/Next.js-14-black?logo=next.js)](https://nextjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.110.0-009688?logo=fastapi)](https://fastapi.tiangolo.com/)
[![Gemini API](https://img.shields.io/badge/Gemini_API-2.5--Flash-4285F4?logo=google)](https://ai.google.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-38BDF8?logo=tailwindcss)](https://tailwindcss.com/)
[![Accuracy](https://img.shields.io/badge/Benchmark_Accuracy-100%25-emerald)](https://github.com/himaallu/WorkFlow-AI)

An enterprise-grade B2B procurement copilot combining LLM natural language parsing with deterministic local Python guardrails. Designed to transform unstructured user requests into policy-compliant Purchase Requests (PRs) with 0% math hallucination risk and complete financial auditability.

---

## 🚀 Key Architectural Highlights

- **Hybrid AI Architecture:** The LLM (`gemini-2.5-flash`) is strictly restricted to Natural Language Intent Parsing into JSON. All budget arithmetic (`unit_price * qty`), corporate policy compliance rules, and executive approval routing are executed in rigid, local Python code.
- **Zero Math Hallucinations & Security Hardening:** Prevents multiplication errors and prompt injection attacks (e.g. users attempting to bypass approval rules via prompt manipulation).
- **Interactive Procurement Suite:** Select specific vendor items (ThinkPad, MacBook Pro/Air), customize requester/approver details, and generate signed Purchase Request documents.
- **Automated 30-Case Evaluation Harness:** Live evaluation dashboard running synthetic benchmarks across 3 difficulty tiers (Simple, Medium, Complex) with real-time terminal log streaming.
- **Graceful Offline Degradation:** Automatically fails over to an offline RegEx heuristic engine if cloud LLM rate limits (`HTTP 429`) occur, guaranteeing 100% application availability.

---

## 🛠️ System Architecture

```text
[ User Interface (Next.js 14 + TailwindCSS) ]
                     │
                     ▼ (HTTP POST /api/procure)
         [ FastAPI REST API Backend ]
                     │
        ┌────────────┴────────────┐
        ▼                         ▼
 [ Primary Route ]        [ Fallback Route ]
 Gemini API (2.5-Flash)   Offline RegEx Heuristics
 Structured JSON Parsing  Offline Entity Extraction
        └────────────┬────────────┘
                     │
                     ▼ (Extracted JSON)
    [ Local Python Deterministic Engine ]
    ├── Budget Math: unit_price * quantity
    ├── Policy Compliance: >$10k requires 3 quotes
    └── Approval Routing: Manager < $5k < Dept Head < $25k < Finance
                     │
                     ▼
  [ Generated Purchase Request & Vendor Matches ]
```

---

## 💻 Tech Stack

- **Frontend:** Next.js 14 (App Router), React 19, TailwindCSS v4, Lucide React Icons.
- **Backend:** Python 3.12, FastAPI, Uvicorn, Pydantic v2.
- **LLM Integration:** `google-genai` SDK (`gemini-2.5-flash` with JSON Schema mode).
- **Benchmarking:** Synthetic 30-case dataset, real-time log trace streamer.

---

## 🏃 Quick Start Guide

### Prerequisites
- Python 3.12+
- Node.js 18+
- Gemini API Key ([Get an API key here](https://aistudio.google.com/))

### Running the Stack

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/himaallu/WorkFlow-AI.git
   cd WorkFlow-AI
   ```

2. **Start Both Servers (Concurrent Execution):**
   ```bash
   ./start.sh
   ```

3. **Open the Web UI:**
   Navigate to **[http://localhost:3000](http://localhost:3000)** in your browser.

---

## 📊 Evaluation & Benchmark Results

WorkFlowAI includes an automated evaluation harness testing:
- **Intent Extraction Match**
- **Budget Calculation Match**
- **Approval Signature Match**

Runs across 30 synthetic B2B purchasing queries with **100% benchmark pass rate (30/30 passed)**.

---

## 📄 License

MIT License. Free for enterprise portfolio use and demonstration.
