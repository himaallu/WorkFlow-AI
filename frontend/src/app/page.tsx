import Link from "next/link";
import InfoButton from "@/components/InfoButton";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center space-y-12 text-gray-900">
      <div className="space-y-6 max-w-3xl">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-gray-900">
          Enterprise Procurement. <br />
          <span className="text-blue-600">Democratized by AI.</span>
        </h1>
        <p className="text-xl text-gray-700 font-medium max-w-2xl mx-auto leading-relaxed">
          Transform natural language requests into mathematically verified, policy-compliant procurement workflows instantly.
        </p>
      </div>

      <div className="flex gap-4">
        <Link href="/assistant" className="bg-black text-white px-8 py-4 rounded-full font-bold hover:bg-gray-800 transition-all hover:scale-105 shadow-lg">
          Launch Assistant
        </Link>
        <Link href="/prompts" className="bg-white text-gray-900 border border-gray-300 px-8 py-4 rounded-full font-bold hover:border-gray-400 transition-all shadow-sm">
          View Prompts
        </Link>
      </div>

      <div className="pt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-left max-w-5xl">
        <div className="p-6 bg-white rounded-3xl border border-gray-200 shadow-sm space-y-3">
          <h3 className="font-bold text-lg text-gray-900 flex items-center">
            Radical Accessibility
            <InfoButton text="Employees simply type what they need in plain English. No complex forms or training required." />
          </h3>
          <p className="text-gray-600 leading-relaxed text-sm font-medium">
            Anyone from an intern to a senior director can use the tool instantly. The LLM extracts structured data seamlessly from vague inputs.
          </p>
        </div>
        <div className="p-6 bg-white rounded-3xl border border-gray-200 shadow-sm space-y-3">
          <h3 className="font-bold text-lg text-gray-900 flex items-center">
            Zero Hallucinations
            <InfoButton text="The AI handles language, but rigid Python rules handle the math and policies. It cannot hallucinate a budget." />
          </h3>
          <p className="text-gray-600 leading-relaxed text-sm font-medium">
            By separating the natural language processing from the deterministic business logic, we guarantee 100% mathematical accuracy.
          </p>
        </div>
        <div className="p-6 bg-white rounded-3xl border border-gray-200 shadow-sm space-y-3">
          <h3 className="font-bold text-lg text-gray-900 flex items-center">
            Automated Approvals
            <InfoButton text="Automatically routes to Manager, VP, or Finance based on the precise numerical value extracted." />
          </h3>
          <p className="text-gray-600 leading-relaxed text-sm font-medium">
            It instantly calculates your required approval chain without anyone needing to check an organizational chart or policy handbook.
          </p>
        </div>
      </div>
    </div>
  );
}
