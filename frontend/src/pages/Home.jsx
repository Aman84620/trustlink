import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HeroCarousel } from '../components/HeroCarousel';
import { 
  Scan, 
  Cpu, 
  Clock, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  BookOpen, 
  Award, 
  Globe, 
  Users, 
  Sparkles, 
  FileCheck2, 
  UserCheck,
  Lock,
  Zap,
  Building2,
  HelpCircle,
  Search,
  ExternalLink
} from 'lucide-react';

export const Home = () => {
  const [activeTab, setActiveTab] = useState('ALL');

  const sampleSchemes = [
    {
      id: 'pre-matric',
      name: 'Pre-Matric Scholarship for ST Students',
      category: 'School Level (Class 9 & 10)',
      incomeLimit: 'Family income <= ₹2.50 Lakh/yr',
      benefit: 'Day Scholar ₹225/mo | Hosteller ₹525/mo',
      deadline: '31st October 2026',
      badge: 'Direct Bank Transfer'
    },
    {
      id: 'post-matric',
      name: 'Post-Matric Scholarship for ST Students',
      category: 'Higher Education (Class 11 to PhD)',
      incomeLimit: 'Family income <= ₹2.50 Lakh/yr',
      benefit: 'Compulsory non-refundable fee + Maintenance',
      deadline: '15th November 2026',
      badge: 'Popular Scheme'
    },
    {
      id: 'top-class',
      name: 'Top Class Education Scheme for ST Students',
      category: 'Premier Institutes (IIT, IIM, NIT, AIIMS)',
      incomeLimit: 'Family income <= ₹8.00 Lakh/yr',
      benefit: 'Full Tuition Fee + ₹3,000/mo Living + ₹45k Computer',
      deadline: '30th November 2026',
      badge: 'Full Reimbursement'
    },
    {
      id: 'nfst',
      name: 'National Fellowship for ST Students (NFST)',
      category: 'Research Scholars (M.Phil & Ph.D)',
      incomeLimit: '750 Fixed Slots / Merit Based',
      benefit: '₹31,000/mo (JRF) | ₹35,000/mo (SRF) + HRA',
      deadline: '31st December 2026',
      badge: '750 Slots'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* 3-Slide Hero Carousel */}
      <HeroCarousel />

      {/* Official Government Trust Metrics Bar */}
      <section className="bg-slate-900 border-b border-slate-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
              <span className="text-2xl sm:text-3xl font-black text-emerald-400">₹482.5 Cr+</span>
              <p className="text-xs text-slate-400 mt-1 font-semibold">Total Funds Disbursed</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
              <span className="text-2xl sm:text-3xl font-black text-teal-400">1.28M+</span>
              <p className="text-xs text-slate-400 mt-1 font-semibold">ST Applicants Verified</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
              <span className="text-2xl sm:text-3xl font-black text-amber-400">99.4%</span>
              <p className="text-xs text-slate-400 mt-1 font-semibold">Automated OCR Accuracy</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
              <span className="text-2xl sm:text-3xl font-black text-cyan-400">&lt; 4 Days</span>
              <p className="text-xs text-slate-400 mt-1 font-semibold">Average Processing Time</p>
            </div>
          </div>
        </div>
      </section>

      {/* WHY TRUSTLINK AI SECTION */}
      <section className="py-20 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="inline-block px-3.5 py-1 rounded-full bg-teal-100 text-teal-900 text-xs font-black uppercase tracking-wider mb-3">
              Transforming National Tribal Welfare
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Why TrustLink AI?
            </h2>
            <p className="mt-4 text-base text-slate-600 leading-relaxed font-medium">
              An intelligent, transparent government ecosystem designed by the Ministry of Tribal Affairs to eliminate paper bottlenecks and fast-track scholarship delivery for Scheduled Tribe students.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-7 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-xl transition-all group">
              <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-teal-700 to-emerald-600 text-white flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-md">
                <Scan className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-slate-900 text-lg mb-2.5">AI OCR Document Scan</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Optical character extraction automatically verifies ST Caste & Income Certificates against government parameters in real-time.
              </p>
            </div>

            <div className="p-7 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-xl transition-all group">
              <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-blue-700 to-indigo-600 text-white flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-md">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-slate-900 text-lg mb-2.5">Rules Engine</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Dynamic scheme rules engine evaluates income ceilings, course criteria, and caste certificate expiry to ensure eligibility.
              </p>
            </div>

            <div className="p-7 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-xl transition-all group">
              <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-indigo-700 to-purple-600 text-white flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-md">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-slate-900 text-lg mb-2.5">Real-Time DBT Status</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Complete transparency from initial document upload down to Aadhaar-linked Public Financial Management System (PFMS) bank credit.
              </p>
            </div>

            <div className="p-7 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-xl transition-all group">
              <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-amber-600 to-orange-600 text-white flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-md">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-slate-900 text-lg mb-2.5">Officer Oversight</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Human-in-the-loop verification portal empowers Nodal Officers with confidence scores to sanction valid claims instantly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED SCHEMES PREVIEW SECTION */}
      <section className="py-20 bg-slate-50 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="inline-block px-3.5 py-1 rounded-full bg-teal-100 text-teal-900 text-xs font-black uppercase tracking-wider mb-2">
                Available Government Grants
              </span>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                Scheduled Tribe Scholarship Schemes
              </h2>
            </div>
            <Link
              to="/schemes"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-sm transition-colors"
            >
              <span>View All 5 Schemes</span>
              <ArrowRight className="w-4 h-4 text-teal-400" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sampleSchemes.map((s) => (
              <div key={s.id} className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-800 border border-teal-200 font-extrabold text-[11px] uppercase tracking-wider">
                      {s.badge}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">Deadline: {s.deadline}</span>
                  </div>

                  <h3 className="font-black text-slate-900 text-lg mb-2">{s.name}</h3>
                  <p className="text-xs font-bold text-slate-500 mb-4">{s.category}</p>

                  <div className="space-y-2 text-xs bg-slate-50 p-3.5 rounded-xl border border-slate-100 mb-5">
                    <p className="text-slate-700">
                      <strong className="text-slate-900">Income Limit:</strong> {s.incomeLimit}
                    </p>
                    <p className="text-slate-700">
                      <strong className="text-slate-900">Assistance:</strong> {s.benefit}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                  <span className="text-emerald-700 font-extrabold text-xs flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" /> AI Auto-Scan Support
                  </span>
                  <Link
                    to="/apply"
                    className="px-4 py-2 rounded-lg bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold transition-colors shadow-xs"
                  >
                    Apply Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION (6-Step Visual Timeline) */}
      <section className="py-20 bg-slate-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="inline-block px-3.5 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-black uppercase tracking-wider mb-3">
              Automated Process Timeline
            </span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight">How TrustLink AI Operates</h2>
            <p className="mt-3 text-slate-400 text-sm sm:text-base font-medium">
              From student registration to Direct Benefit Transfer (DBT) bank credit in six seamless steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-5">
            {[
              { num: '01', title: 'Register', desc: 'Create account with Aadhaar & ST Caste credentials' },
              { num: '02', title: 'Upload Proofs', desc: 'Upload Income, Caste, and Marksheet documents' },
              { num: '03', title: 'AI OCR Scan', desc: 'TrustLink AI extracts text and calculates confidence scores' },
              { num: '04', title: 'Rules Engine', desc: 'Automated eligibility verification against MoTA scheme criteria' },
              { num: '05', title: 'Officer Sign-Off', desc: 'Nodal Verification Officer reviews AI recommendation' },
              { num: '06', title: 'DBT Transfer', desc: 'Scholarship credited directly to Aadhaar-seeded bank account' }
            ].map((step, idx) => (
              <div key={idx} className="bg-slate-900 border border-slate-800 p-5 rounded-2xl relative text-left hover:border-teal-500/50 transition-all">
                <span className="text-3xl font-black text-teal-400 block mb-2">{step.num}</span>
                <h3 className="font-extrabold text-white text-base mb-1.5">{step.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CALL TO ACTION BANNER */}
      <section className="py-16 bg-gradient-to-r from-teal-900 via-slate-900 to-slate-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl space-y-6">
          <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
            Ready to apply for your ST Scholarship?
          </h2>
          <p className="text-slate-300 text-base font-medium">
            Join over 1.2 million Scheduled Tribe students getting faster, transparent scholarship disbursements powered by TrustLink AI.
          </p>
          <div className="pt-2 flex justify-center gap-4">
            <Link
              to="/apply"
              className="px-8 py-3.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-extrabold text-sm shadow-lg shadow-teal-950/60 transition-all flex items-center gap-2"
            >
              <span>Start Application Wizard</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
