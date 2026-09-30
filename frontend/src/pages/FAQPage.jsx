import React from 'react';
import { HelpCircle } from 'lucide-react';

export const FAQPage = () => {
  const faqs = [
    {
      q: "Who is eligible for Scheduled Tribe (ST) Scholarships?",
      a: "Students belonging to officially recognized Scheduled Tribe (ST) communities with annual family income within configured scheme limits (e.g. ₹2.50 Lakh for Post-Matric, ₹8.00 Lakh for Top Class & NOS) pursuing recognized courses in India or abroad."
    },
    {
      q: "How does AI Document Verification work?",
      a: "TrustLink AI scans your uploaded documents (Income Certificate, ST Certificate, Marksheets) using Optical Character Recognition (OCR). It extracts key information, validates certificates against expiry rules, and provides real-time confidence scores."
    },
    {
      q: "What should I do if my application is marked 'Deficient'?",
      a: "Log into your Student Dashboard, navigate to 'Deficiency Raised', click 'Resolve Deficiency', view the specific document error (e.g., expired income certificate), and upload a clear, updated document. Your application will automatically move to 'Under Re-Verification'."
    },
    {
      q: "Does AI make the final decision to approve or reject my application?",
      a: "No. TrustLink AI assists verification by highlighting discrepancy flags and evaluating eligibility scores. Final decision and sanction authority remain strictly with authorized government welfare officers."
    },
    {
      q: "What is the National Fellowship for ST (NFST)?",
      a: "NFST supports 750 ST research scholars annually pursuing M.Phil. and Ph.D. degrees in recognized Indian universities. It offers ₹31,000/month (JRF) and ₹35,000/month (SRF) plus contingency grants."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <span className="inline-block px-3 py-1 rounded-full bg-teal-100 text-teal-900 text-xs font-black uppercase tracking-wider">
            Help & Knowledge Base
          </span>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Frequently Asked Questions</h1>
          <p className="text-sm text-slate-600 font-medium">Clear answers on ST scholarship eligibility, document verification, and DBT disbursements.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-sm space-y-2 hover:shadow-md transition-all">
              <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                <HelpCircle className="w-4.5 h-4.5 text-teal-600 shrink-0" />
                <span>{faq.q}</span>
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed pl-6.5 font-medium">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
