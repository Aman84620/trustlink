import React from 'react';
import { ShieldCheck, Award, Heart, Sparkles } from 'lucide-react';

export const AboutPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="inline-block px-3.5 py-1 rounded-full bg-teal-100 text-teal-900 text-xs font-black uppercase tracking-wider">
            Ministry of Tribal Affairs Initiative
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">About TrustLink AI</h1>
          <p className="text-sm text-slate-600 font-medium">
            TrustLink AI is a modern digital public service platform built to streamline scholarship and fellowship administration for Scheduled Tribe (ST) students across India.
          </p>
        </div>

        <div className="bg-white border border-slate-200/90 rounded-2xl p-8 shadow-sm space-y-6 text-xs text-slate-600 leading-relaxed font-medium">
          <h3 className="font-black text-slate-900 text-lg">Our National Mission</h3>
          <p>
            Scheduled Tribe students in remote and tribal districts often face significant administrative hurdles, document verification delays, and transparent status tracking issues. TrustLink AI introduces artificial intelligence and automated OCR scanning to drastically reduce processing times from 45 days down to under 4 days.
          </p>

          <h3 className="font-black text-slate-900 text-lg">Human-in-the-Loop Governance</h3>
          <p>
            While AI algorithms perform document extraction, confidence scoring, and scheme rule evaluation, the platform ensures that official decision-making authority remains strictly in the hands of authorized government welfare officers.
          </p>
        </div>
      </div>
    </div>
  );
};
