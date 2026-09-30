import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Lock, ExternalLink, Award, Globe, PhoneCall } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 text-xs">
      {/* Upper Footer Badges & Trust Banner */}
      <div className="border-b border-slate-800/80 bg-slate-900/40 py-6 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-950 border border-teal-500/30 flex items-center justify-center text-teal-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="font-extrabold text-white text-sm">TrustLink AI - Official MoTA Platform</p>
              <p className="text-[11px] text-slate-400">Direct Benefit Transfer (DBT) & Automated OCR Verification Portal</p>
            </div>
          </div>

          <div className="flex items-center gap-6 text-[11px] text-slate-300">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>Aadhaar PFMS Seeded</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800">
              <Lock className="w-3.5 h-3.5 text-teal-400" />
              <span>256-Bit Encrypted</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Col 1 */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-teal-700 to-emerald-600 flex items-center justify-center text-white font-bold shadow-xs">
                <ShieldCheck className="w-4 h-4 text-white" />
              </div>
              <span className="font-black text-xl text-white tracking-tight">TrustLink <span className="text-teal-400">AI</span></span>
            </div>
            <p className="text-slate-400 leading-relaxed font-medium">
              National AI-Powered ST Scholarship Management & Verification Platform. Streamlining direct benefit transfers for ST students across India.
            </p>
            <p className="text-[11px] text-slate-500">
              Ministry of Tribal Affairs, Government of India
            </p>
          </div>

          {/* Col 2 */}
          <div>
            <h4 className="font-extrabold text-slate-200 uppercase tracking-wider text-[11px] mb-4 text-teal-400">
              Scholarship Schemes
            </h4>
            <ul className="space-y-2.5">
              <li><Link to="/schemes" className="hover:text-teal-300 transition-colors flex items-center gap-1.5"><ExternalLink className="w-3 h-3 text-slate-600" /> Pre-Matric ST Scholarship</Link></li>
              <li><Link to="/schemes" className="hover:text-teal-300 transition-colors flex items-center gap-1.5"><ExternalLink className="w-3 h-3 text-slate-600" /> Post-Matric ST Scholarship</Link></li>
              <li><Link to="/schemes" className="hover:text-teal-300 transition-colors flex items-center gap-1.5"><ExternalLink className="w-3 h-3 text-slate-600" /> Top Class Education Scheme</Link></li>
              <li><Link to="/schemes" className="hover:text-teal-300 transition-colors flex items-center gap-1.5"><ExternalLink className="w-3 h-3 text-slate-600" /> NFST Fellowship (750 Slots)</Link></li>
              <li><Link to="/schemes" className="hover:text-teal-300 transition-colors flex items-center gap-1.5"><ExternalLink className="w-3 h-3 text-slate-600" /> NOS Overseas (20 Awards)</Link></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h4 className="font-extrabold text-slate-200 uppercase tracking-wider text-[11px] mb-4 text-teal-400">
              Quick Links & Portals
            </h4>
            <ul className="space-y-2.5">
              <li><Link to="/how-it-works" className="hover:text-teal-300 transition-colors">AI Verification Workflow</Link></li>
              <li><Link to="/faqs" className="hover:text-teal-300 transition-colors">Frequently Asked Questions</Link></li>
              <li><Link to="/about" className="hover:text-teal-300 transition-colors">About TrustLink AI Platform</Link></li>
              <li><Link to="/contact" className="hover:text-teal-300 transition-colors">Help Desk & Grievances</Link></li>
            </ul>
          </div>

          {/* Col 4 */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-slate-200 uppercase tracking-wider text-[11px] text-teal-400">
              Government Support
            </h4>
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-[11px] space-y-2">
              <span className="font-bold text-amber-400 block text-xs">National Support Helpline</span>
              <p className="text-slate-300 flex items-center gap-1.5">
                <PhoneCall className="w-3.5 h-3.5 text-teal-400" /> Toll Free: 1800-11-2026
              </p>
              <p className="text-slate-400 text-[10px]">
                Email: support@trustlink.gov.in (Mon-Sat, 9am - 6pm IST)
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Disclaimer */}
        <div className="pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>© 2026 TrustLink AI — Ministry of Tribal Affairs (MoTA), Government of India. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-slate-300">Privacy Policy</a>
            <span className="text-slate-800">•</span>
            <a href="#" className="hover:text-slate-300">Terms of Portal Use</a>
            <span className="text-slate-800">•</span>
            <a href="#" className="hover:text-slate-300">Accessibility Statement</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
