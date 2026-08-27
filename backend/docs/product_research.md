# Competitor & Product Research

This document analyzes five key products in the enterprise procurement and AI assistant space.

## 1. SAP Ariba
- **Focus:** Enterprise procurement and supply chain.
- **AI Capabilities:** Guided buying, contract intelligence.
- **Workflow Automation:** Extremely robust, handles global tax, compliance, and multi-tier approvals.
- **User Interaction:** Traditional enterprise UI, transitioning to conversational AI (Joule).
- **Strengths:** Industry standard, massive supplier network.
- **Gaps:** High implementation cost, steep learning curve, rigid for small requests.

## 2. Coupa
- **Focus:** Business spend management (BSM).
- **AI Capabilities:** Spend analysis, fraud detection, community intelligence.
- **Workflow Automation:** Streamlined P2P (Procure-to-Pay) process.
- **User Interaction:** Modern web/mobile interface, relatively intuitive.
- **Strengths:** Excellent spend visibility, strong UI.
- **Gaps:** AI is more focused on backend analytics rather than front-end conversational request generation.

## 3. Microsoft Copilot (for Finance/Dynamics 365)
- **Focus:** Productivity and embedded AI.
- **AI Capabilities:** Natural language querying of ERP data, auto-drafting emails.
- **Workflow Automation:** Integrates directly with Microsoft Power Automate.
- **User Interaction:** Conversational, embedded in Teams and Office.
- **Strengths:** Seamless integration into daily workflow (Teams/Outlook).
- **Gaps:** Lacks deep out-of-the-box procurement rules engine; relies on underlying ERP for policy logic.

## 4. ServiceNow (Procurement Service Management)
- **Focus:** Enterprise Service Management.
- **AI Capabilities:** Now Assist (GenAI) for ticket summarization and chat.
- **Workflow Automation:** Highly customizable workflow engine.
- **User Interaction:** Portal-based ticketing system with a virtual agent.
- **Strengths:** Great at cross-departmental workflows (IT + HR + Procurement).
- **Gaps:** Can feel like a ticketing system rather than a dedicated smart procurement tool.

## 5. Glean
- **Focus:** Enterprise AI search and knowledge management.
- **AI Capabilities:** RAG over all company documents, personalized search.
- **Workflow Automation:** Emerging "Glean Actions" to trigger workflows.
- **User Interaction:** Search bar / chat interface.
- **Strengths:** Best-in-class at finding policies (e.g., "What is the travel policy?").
- **Gaps:** Not a system of record for procurement; cannot process the actual transaction natively without third-party integration.

## Conclusion
Most established players (SAP, Coupa) have robust backends but complex frontends. AI-first tools (Glean, Copilot) have great frontends but lack native procurement state engines. **WorkFlowAI** aims to bridge this by providing a simple conversational frontend backed by deterministic policy and approval engines.
