import InfoButton from "@/components/InfoButton";

export default function Prompts() {
  const basic = [
    "What approval is required for a AED 3,000 purchase?",
    "I need to buy a AED 8,500 software license. Who needs to approve?",
    "What's the policy for a AED 1,500 office chair?",
    "Do I need Finance approval for AED 24,000?",
    "I want to spend AED 4,999 on team building."
  ];

  const mid = [
    "Find three monitors under AED 2,000 and identify the required approval.",
    "I need a laptop for a new developer in Dubai. Budget is 15k.",
    "Show me office desks available in Abu Dhabi under AED 4,000.",
    "I need 2 keyboards for my team in Sharjah under AED 500 total.",
    "Find a high-end laptop for AED 22,000 in Dubai and tell me the policy."
  ];

  const complex = [
    "I need 12 laptops for my Dubai team. Total budget AED 65000. Find vendors and approvals.",
    "Expanding Abu Dhabi office. I need 20 monitors with a budget of AED 45,000.",
    "Get 50 office chairs for the new HQ in Dubai. Total budget is AED 120,000.",
    "8 high-performance laptops for data science. Budget AED 95,000. Check compliance.",
    "Procure 100 software licenses for AED 250,000. Who exactly approves this?"
  ];

  return (
    <div className="space-y-12 text-gray-900">
      <div className="space-y-4">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">Prompt Library</h1>
        <p className="text-gray-600 text-lg font-medium">
          Not sure what to ask? Try these varied scenarios to test the agent 
          <InfoButton text="These prompts test intent extraction, budget math, and policy routing accuracy." />
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="space-y-4">
          <h2 className="font-bold text-lg border-b border-gray-200 pb-2 text-gray-900">🟢 Basic Inquiries</h2>
          {basic.map((p, i) => (
            <div key={i} className="p-4 bg-white rounded-2xl border border-gray-200 shadow-sm text-sm text-gray-900 font-semibold hover:border-gray-400 transition-colors select-all">
              "{p}"
            </div>
          ))}
        </div>
        <div className="space-y-4">
          <h2 className="font-bold text-lg border-b border-gray-200 pb-2 text-gray-900">🟡 Vendor Searches</h2>
          {mid.map((p, i) => (
            <div key={i} className="p-4 bg-white rounded-2xl border border-gray-200 shadow-sm text-sm text-gray-900 font-semibold hover:border-gray-400 transition-colors select-all">
              "{p}"
            </div>
          ))}
        </div>
        <div className="space-y-4">
          <h2 className="font-bold text-lg border-b border-gray-200 pb-2 text-gray-900">🔴 Complex Bulk Orders</h2>
          {complex.map((p, i) => (
            <div key={i} className="p-4 bg-white rounded-2xl border border-gray-200 shadow-sm text-sm text-gray-900 font-semibold hover:border-gray-400 transition-colors select-all">
              "{p}"
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
