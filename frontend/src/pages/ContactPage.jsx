import React from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export const ContactPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <span className="inline-block px-3.5 py-1 rounded-full bg-teal-100 text-teal-900 text-xs font-black uppercase tracking-wider">
            Helpdesk & Grievances
          </span>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Contact TrustLink AI Team</h1>
          <p className="text-sm text-slate-600 font-medium">Get assistance regarding scheme eligibility, document verification, or payment tracking.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs text-center">
          <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm space-y-2 hover:shadow-md transition-all">
            <Mail className="w-6 h-6 text-teal-600 mx-auto" />
            <h4 className="font-extrabold text-slate-900 text-sm">Email Support</h4>
            <p className="text-slate-500 font-medium">support@trustlink.gov.in</p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm space-y-2 hover:shadow-md transition-all">
            <Phone className="w-6 h-6 text-blue-600 mx-auto" />
            <h4 className="font-extrabold text-slate-900 text-sm">Toll-Free Helpline</h4>
            <p className="text-slate-500 font-medium">1800-11-2026 (9 AM - 6 PM)</p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm space-y-2 hover:shadow-md transition-all">
            <MapPin className="w-6 h-6 text-indigo-600 mx-auto" />
            <h4 className="font-extrabold text-slate-900 text-sm">Headquarters</h4>
            <p className="text-slate-500 font-medium">Ministry of Tribal Affairs, New Delhi</p>
          </div>
        </div>
      </div>
    </div>
  );
};
