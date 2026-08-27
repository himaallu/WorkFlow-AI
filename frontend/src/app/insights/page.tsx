import InfoButton from "@/components/InfoButton";

export default function Insights() {
  return (
    <div className="space-y-12 max-w-4xl text-gray-900">
      <div className="space-y-4">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">Product Insights</h1>
        <p className="text-gray-600 text-lg font-medium">Engineering decisions tailored for enterprise AI survivability.</p>
      </div>

      <div className="space-y-12">
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center">
            1. The Hallucination Problem
            <InfoButton text="Highlighting the danger of trusting LLMs with numerical logic." />
          </h2>
          <p className="text-gray-700 leading-relaxed text-lg font-medium">
            Enterprise software cannot afford "creative" math. If a user asks for 10 laptops at AED 5,000 each, an LLM might hallucinate the total as AED 45,000 or incorrectly approve it without Finance signatures. 
          </p>
          <div className="p-6 bg-blue-50 border border-blue-200 rounded-2xl">
            <h4 className="font-bold text-blue-950 text-base mb-2">Our Solution: Deterministic Architecture</h4>
            <p className="text-blue-900 text-sm leading-relaxed font-medium">
              We strictly partition the architecture. The LLM handles Natural Language (NLP) purely to extract intent into JSON. From there, rigid, unit-tested Python functions handle the math and policy routing. 
            </p>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center">
            2. Graceful Degradation
            <InfoButton text="Crucial for SaaS apps where uptime is tied to revenue." />
          </h2>
          <p className="text-gray-700 leading-relaxed text-lg font-medium">
            AI APIs fail. They hit rate limits, they time out, and they change versions. Relying 100% on a cloud provider for critical business paths is dangerous.
          </p>
          <div className="p-6 bg-blue-50 border border-blue-200 rounded-2xl">
            <h4 className="font-bold text-blue-950 text-base mb-2">Our Solution: Offline Heuristics</h4>
            <p className="text-blue-900 text-sm leading-relaxed font-medium">
              We built a heuristic RegEx fallback engine. If the primary LLM API hits rate limits (HTTP 429), the application seamlessly shifts to deterministic offline NLP parsing. The exact same math and policy engines execute flawlessly.
            </p>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">3. UX Psychology in B2B Tools</h2>
          <p className="text-gray-700 leading-relaxed text-lg font-medium">
            Procurement portals are notoriously ugly and complex. By shifting to a conversational UI with a sleek, vibrant design language, we drastically lower the cognitive load on the user. They don't need a manual; they just chat with the system.
          </p>
        </section>
      </div>
    </div>
  );
}
