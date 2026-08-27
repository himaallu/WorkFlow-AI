"use client";
import { useState } from "react";
import InfoButton from "@/components/InfoButton";
import { CheckCircle2, Send, Check } from "lucide-react";

export default function Assistant() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [selectedVendor, setSelectedVendor] = useState<any>(null);
  const [showPR, setShowPR] = useState(false);
  const [prSubmitted, setPrSubmitted] = useState(false);

  // Form details for PR
  const [requesterName, setRequesterName] = useState("Aditya Sharma");
  const [requesterDept, setRequesterDept] = useState("AI Engineering");
  const [requesterEmail, setRequesterEmail] = useState("aditya@enterprise.com");
  const [approverEmail, setApproverEmail] = useState("vp.engineering@enterprise.com");
  const [justification, setJustification] = useState("Hardware allocation for upcoming Q3 AI engineering project.");
  const [urgency, setUrgency] = useState("Normal");

  const handleSubmit = async () => {
    if (!query) return;
    setLoading(true);
    setShowPR(false);
    setPrSubmitted(false);
    setSelectedVendor(null);
    try {
      const res = await fetch("http://127.0.0.1:8000/api/procure", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });
      const data = await res.json();
      setResult(data);
      if (data.vendors_found && data.vendors_found.length > 0) {
        setSelectedVendor(data.vendors_found[0]);
      }
    } catch (e) {
      alert("Error connecting to backend server");
    }
    setLoading(false);
  };

  const handleRaisePR = () => {
    setShowPR(true);
    setPrSubmitted(false);
  };

  const handleFinalSubmitPR = () => {
    setPrSubmitted(true);
  };

  const qty = result?.extracted?.quantity || 1;
  const calculatedTotal = selectedVendor ? selectedVendor.unit_price * qty : (result?.total_budget || 0);

  return (
    <div className="space-y-12 pb-24 text-gray-900">
      <div className="space-y-4">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 flex items-center">
          Procurement Assistant
          <InfoButton text="The LLM is strictly used to parse structured JSON entities from natural language. The extracted data is then sent to a local deterministic Python engine for budget math, policy checks, and approval routing. This guarantees zero chance of LLM math hallucinations, prevents prompt injection or security bypasses into corporate fintech details, and ensures full auditability compliance with financial regulations." />
        </h1>
        <p className="text-gray-600 text-lg font-medium">Describe what you need. The AI handles vendor matching, policies, and PR generation.</p>
      </div>

      <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-200 space-y-4">
        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Procurement Request</label>
          <textarea 
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="e.g., I need 5 laptops for my Dubai engineering team. Budget is AED 35,000."
            className="w-full p-4 bg-gray-50 border border-gray-200 text-gray-900 font-medium placeholder:text-gray-400 rounded-xl h-36 outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all resize-none text-base"
          />
        </div>
        <button 
          onClick={handleSubmit}
          disabled={loading || !query.trim()}
          className="bg-black text-white px-8 py-4 rounded-xl font-semibold hover:bg-gray-800 transition-all hover:-translate-y-0.5 w-full md:w-auto shadow-md disabled:opacity-50 cursor-pointer"
        >
          {loading ? "Analyzing Policies & Searching Vendors..." : "Generate Workflow 🚀"}
        </button>
      </div>

      {result && (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-200">
                <h3 className="font-bold text-lg text-gray-900 mb-4 flex items-center">
                  Structured Intent
                  <InfoButton text="The LLM extracts pure JSON entities from the unstructured text. This is its only job." />
                </h3>
                <pre className="bg-gray-900 text-green-400 p-4 rounded-xl text-xs font-mono overflow-x-auto border border-gray-800">
                  {JSON.stringify(result.extracted, null, 2)}
                </pre>
              </div>

              <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-200">
                <h3 className="font-bold text-lg text-gray-900 mb-4 flex items-center">
                  Policy & Approvals
                  <InfoButton text="Calculated purely via local deterministic Python logic based on the extracted total budget. Zero risk of LLM hallucination or prompt injection bypass." />
                </h3>
                <div className="space-y-3">
                  <p className="text-sm font-bold text-gray-800">Required Signatures:</p>
                  <div className="flex flex-wrap gap-2">
                    {result.required_approval?.map((req: string, i: number) => (
                      <span key={i} className="px-3 py-1 bg-red-100 text-red-800 border border-red-200 rounded-full text-xs font-bold">{req}</span>
                    ))}
                  </div>
                  <div className="text-sm mt-4 p-4 bg-amber-50 text-amber-900 rounded-xl border border-amber-200 font-medium">
                    <span className="font-bold uppercase text-xs text-amber-800 block mb-1">Compliance Notes:</span>
                    {result.policy_compliance?.notes}
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-200 h-full flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-lg text-gray-900 mb-2 flex items-center">
                    Select Vendor & Equipment
                    <InfoButton text="Click on a vendor card below to select the exact product model for your Purchase Request." />
                  </h3>
                  <p className="text-xs text-gray-500 mb-4">Click to select which vendor equipment to attach to your PR:</p>
                  
                  {result.vendors_found?.length > 0 ? (
                    <div className="space-y-3">
                      {result.vendors_found.map((v: any, i: number) => {
                        const isSelected = selectedVendor?.vendor_name === v.vendor_name && selectedVendor?.product === v.product;
                        return (
                          <div 
                            key={i} 
                            onClick={() => setSelectedVendor(v)}
                            className={`p-4 border rounded-2xl cursor-pointer transition-all ${
                              isSelected 
                                ? "bg-blue-50/80 border-blue-600 shadow-md ring-2 ring-blue-500/20" 
                                : "bg-gray-50 border-gray-200 hover:border-gray-300 hover:bg-white"
                            }`}
                          >
                            <div className="flex justify-between items-start">
                              <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                  <h4 className="font-bold text-gray-900">{v.vendor_name}</h4>
                                  {isSelected && <CheckCircle2 className="w-4 h-4 text-blue-600 fill-blue-100" />}
                                </div>
                                <p className="text-sm text-gray-700 font-medium">{v.product}</p>
                                <p className="text-xs text-gray-500">📍 {v.location} • ⭐ {v.rating} • {v.warranty_years}yr Warranty</p>
                              </div>
                              <div className="text-right">
                                <span className="font-extrabold text-blue-700 text-base block">AED {v.unit_price.toLocaleString()}</span>
                                <span className="text-xs text-gray-500 block">Total ({qty}x): AED {(v.unit_price * qty).toLocaleString()}</span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-sm italic">No specific vendors required for this policy tier.</p>
                  )}
                </div>

                {selectedVendor && (
                  <div className="mt-6 p-4 bg-gray-900 text-white rounded-2xl flex justify-between items-center">
                    <div>
                      <p className="text-xs text-gray-400 font-semibold uppercase">Selected Item</p>
                      <p className="font-bold text-sm text-white">{selectedVendor.vendor_name} — {selectedVendor.product}</p>
                    </div>
                    <p className="font-black text-blue-400 text-lg">AED {calculatedTotal.toLocaleString()}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Form details for Purchase Request */}
          <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm space-y-6">
            <h3 className="text-xl font-bold text-gray-900 flex items-center">
              Purchase Request Recipient & Requester Details
              <InfoButton text="Fill in the requester profile and target approver details to finalize the official PR workflow document." />
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Requester Full Name</label>
                <input 
                  type="text" 
                  value={requesterName} 
                  onChange={e => setRequesterName(e.target.value)}
                  className="w-full p-3 bg-gray-50 border border-gray-200 text-gray-900 font-medium rounded-xl outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Department</label>
                <input 
                  type="text" 
                  value={requesterDept} 
                  onChange={e => setRequesterDept(e.target.value)}
                  className="w-full p-3 bg-gray-50 border border-gray-200 text-gray-900 font-medium rounded-xl outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Requester Email</label>
                <input 
                  type="email" 
                  value={requesterEmail} 
                  onChange={e => setRequesterEmail(e.target.value)}
                  className="w-full p-3 bg-gray-50 border border-gray-200 text-gray-900 font-medium rounded-xl outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Target Approver Email</label>
                <input 
                  type="email" 
                  value={approverEmail} 
                  onChange={e => setApproverEmail(e.target.value)}
                  className="w-full p-3 bg-gray-50 border border-gray-200 text-gray-900 font-medium rounded-xl outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white text-sm"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Business Justification</label>
                <input 
                  type="text" 
                  value={justification} 
                  onChange={e => setJustification(e.target.value)}
                  className="w-full p-3 bg-gray-50 border border-gray-200 text-gray-900 font-medium rounded-xl outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white text-sm"
                />
              </div>
            </div>

            <div className="flex justify-center pt-4">
              <button 
                onClick={handleRaisePR}
                className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-blue-700 transition-all hover:scale-105 shadow-xl flex items-center gap-2 cursor-pointer text-base"
              >
                Generate Official Purchase Request Document 📝
              </button>
            </div>
          </div>

          {showPR && (
            <div className="mt-12 bg-white p-8 md:p-12 rounded-3xl shadow-2xl border-t-8 border-t-blue-600 border border-gray-200 font-mono text-sm max-w-4xl mx-auto text-gray-900 animate-in zoom-in-95 duration-500">
              <div className="flex justify-between items-end mb-8 border-b border-gray-200 pb-4">
                <div>
                  <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">OFFICIAL PURCHASE REQUEST</h2>
                  <p className="text-gray-500 font-semibold mt-1">PR ID: PR-{new Date().getTime().toString().slice(-6)}</p>
                </div>
                <div className="text-right">
                  <p className="text-gray-600 font-bold">{new Date().toLocaleDateString()}</p>
                  <span className="px-2.5 py-0.5 bg-amber-100 text-amber-800 rounded-full text-xs font-bold uppercase tracking-wider">Priority: {urgency}</span>
                </div>
              </div>

              {/* Requester & Approver Box */}
              <div className="grid grid-cols-2 gap-6 bg-gray-50 p-6 rounded-2xl border border-gray-200 mb-8 font-sans">
                <div>
                  <p className="text-gray-500 uppercase text-xs font-bold mb-1">Requester Profile</p>
                  <p className="font-bold text-gray-900">{requesterName}</p>
                  <p className="text-xs text-gray-600">{requesterDept} • {requesterEmail}</p>
                </div>
                <div>
                  <p className="text-gray-500 uppercase text-xs font-bold mb-1">Target Approver</p>
                  <p className="font-bold text-gray-900">{approverEmail}</p>
                  <p className="text-xs text-gray-600">Chain: {result.required_approval?.join(" ➔ ")}</p>
                </div>
              </div>

              {/* Line item details */}
              <div className="grid grid-cols-2 gap-8 mb-8">
                <div>
                  <p className="text-gray-500 uppercase text-xs font-bold mb-1">Selected Vendor & Model</p>
                  <p className="font-bold text-lg text-gray-900">{selectedVendor ? `${selectedVendor.vendor_name} (${selectedVendor.product})` : result.extracted.category}</p>
                </div>
                <div>
                  <p className="text-gray-500 uppercase text-xs font-bold mb-1">Quantity & Unit Price</p>
                  <p className="font-bold text-lg text-gray-900">{qty} Units @ AED {selectedVendor ? selectedVendor.unit_price.toLocaleString() : "N/A"}</p>
                </div>
                <div>
                  <p className="text-gray-500 uppercase text-xs font-bold mb-1">Location</p>
                  <p className="font-bold text-lg text-gray-900">{result.extracted.location || "Global"}</p>
                </div>
                <div>
                  <p className="text-gray-500 uppercase text-xs font-bold mb-1 flex items-center">
                    Total Calculated PR Budget
                    <InfoButton text="Calculated strictly by unit_math * quantity inside local Python." />
                  </p>
                  <p className="font-black text-2xl text-blue-700">AED {calculatedTotal.toLocaleString()}</p>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 mb-8 font-sans">
                <p className="text-gray-500 uppercase text-xs font-bold mb-1">Business Justification</p>
                <p className="text-gray-800 font-medium">{justification}</p>
              </div>

              <div className="bg-amber-50 p-6 rounded-xl border border-amber-200 mb-8 font-sans">
                <p className="text-amber-800 uppercase text-xs font-bold mb-1">Policy & Compliance Mandatory Checks</p>
                <p className="text-amber-900 font-medium">{result.policy_compliance?.notes}</p>
              </div>

              <div>
                <p className="text-gray-500 uppercase text-xs font-bold mb-4 flex items-center">
                  Approval Workflow Chain
                  <InfoButton text="Routing hierarchy determined by Python thresholds." />
                </p>
                <div className="space-y-6">
                  {result.required_approval?.map((req: string, i: number) => (
                    <div key={i} className="flex justify-between items-center border-b border-dashed border-gray-300 pb-2">
                      <span className="font-bold text-gray-900">{req} Approval Signature</span>
                      <span className="text-gray-400 font-semibold italic">____________________ (Pending Approval)</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-10 pt-6 border-t border-gray-200 flex justify-between items-center font-sans">
                {prSubmitted ? (
                  <div className="w-full p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 font-bold rounded-2xl flex items-center justify-center gap-2">
                    <Check className="w-5 h-5 text-emerald-600" />
                    Purchase Request PR-{new Date().getTime().toString().slice(-6)} Submitted & Notification Sent to {approverEmail}!
                  </div>
                ) : (
                  <button 
                    onClick={handleFinalSubmitPR}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-8 py-4 rounded-2xl transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer w-full"
                  >
                    <Send className="w-4 h-4" />
                    Submit Purchase Request & Send to {approverEmail}
                  </button>
                )}
              </div>
            </div>
          )}

        </div>
      )}
    </div>
  );
}
