import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Scan, Cpu, ShieldCheck, DollarSign, Sparkles } from 'lucide-react';

export const HowItWorksPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="inline-block px-3.5 py-1 rounded-full bg-teal-100 text-teal-900 text-xs font-black uppercase tracking-wider">
            System Architecture & Workflow
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">How TrustLink AI Operates</h1>
          <p className="text-sm text-slate-600 font-medium">
            A step-by-step breakdown of how AI automation and human oversight combine to deliver transparent ST scholarship disbursements.
          </p>
        </div>

        <div className="space-y-5">
          {[
            { step: '01', title: 'Student Registration & Aadhaar Seeding', desc: 'ST students register with their Aadhaar and ST caste certificate credentials. Bank accounts are verified for Direct Benefit Transfer (DBT).' },
            { step: '02', title: 'Scheme Selection & Multi-Step Wizard', desc: 'Applicants select their authorized scheme (Pre-Matric, Post-Matric, Top Class, NFST, NOS) and fill academic details.' },
            { step: '03', title: 'AI OCR Document Scanning', desc: 'TrustLink AI scans uploaded documents in real-time, extracts key fields (Name, Income, Certificate No, Issue Date), and computes confidence scores.' },
            { step: '04', title: 'Configurable Rules Engine Evaluation', desc: 'Backend rules engine checks income limits, category mandates, academic percentage thresholds, and flags missing or expired documents.' },
            { step: '05', title: 'Deficiency Detection & Resubmission', desc: 'If a document is expired or unreadable, a deficiency notice is generated automatically allowing the student to re-upload without starting over.' },
            { step: '06', title: 'Officer Verification & Sanction', desc: 'Welfare verification officers review AI verification summaries, examine risk flags, and issue official sanction orders.' }
          ].map((item, idx) => (
            <div key={idx} className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-sm flex items-start gap-4 hover:shadow-md transition-all">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-teal-700 to-emerald-600 text-white font-black text-base flex items-center justify-center shrink-0 shadow-xs">
                {item.step}
              </div>
              <div>
                <h3 className="font-black text-slate-900 text-base mb-1">{item.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="p-8 rounded-2xl bg-slate-900 text-white text-center space-y-4">
          <h3 className="text-xl font-black">Experience Automated ST Verification Today</h3>
          <p className="text-xs text-slate-300 max-w-xl mx-auto">
            Try out the live wizard or switch to Nodal Officer persona to view the AI OCR verification queue.
          </p>
          <div className="flex justify-center gap-3">
            <Link to="/apply" className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs">
              Apply Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
