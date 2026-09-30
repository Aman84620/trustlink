import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  FileText, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  ArrowRight, 
  Sparkles, 
  Upload, 
  DollarSign, 
  ChevronRight, 
  ShieldCheck, 
  UserCheck 
} from 'lucide-react';

export const StudentDashboard = () => {
  const { user, token } = useAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/applications/my-applications', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        setApplications(Array.isArray(data) ? data : []);
      })
      .catch(err => console.error('Failed to fetch applications:', err))
      .finally(() => setLoading(false));
  }, [token]);

  const activeApps = applications.filter(a => a.status !== 'REJECTED');
  const underVerification = applications.filter(a => a.status === 'UNDER_VERIFICATION' || a.status === 'UNDER_RE_VERIFICATION' || a.status === 'SUBMITTED');
  const deficiencyRaised = applications.filter(a => a.status === 'DEFICIENCY_RAISED');
  const selected = applications.filter(a => a.status === 'SELECTED');

  const getStatusBadge = (status) => {
    switch (status) {
      case 'SELECTED':
        return <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-300">GREEN — Completed / Selected</span>;
      case 'OFFICER_REVIEW':
      case 'UNDER_VERIFICATION':
      case 'UNDER_RE_VERIFICATION':
        return <span className="px-2.5 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold border border-blue-300">BLUE — In Progress</span>;
      case 'DEFICIENCY_RAISED':
        return <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold border border-amber-300 animate-pulse">ORANGE — Action Required</span>;
      case 'REJECTED':
        return <span className="px-2.5 py-1 rounded-full bg-red-100 text-red-800 text-xs font-bold border border-red-300">RED — Ineligible</span>;
      default:
        return <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold border border-slate-300">GRAY — Pending</span>;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Top Header Card */}
        <div className="bg-slate-900 rounded-2xl p-6 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
          <div className="space-y-2 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-semibold border border-teal-500/30">
              <Sparkles className="w-3.5 h-3.5" /> Scheduled Tribe Student Portal
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Welcome back, {user?.name || 'Rahul'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300">
              Track your scholarship applications, AI OCR document verifications, and DBT disbursements.
            </p>
          </div>

          {/* Profile Completion Bar */}
          <div className="w-full md:w-72 bg-slate-800 border border-slate-700 p-4 rounded-xl relative z-10">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="font-semibold text-slate-300">Profile Completion</span>
              <span className="font-bold text-teal-400">{user?.profileCompletion || 85}%</span>
            </div>
            <div className="h-2 w-full bg-slate-700 rounded-full overflow-hidden mb-2">
              <div 
                className="h-full bg-gradient-to-r from-teal-500 to-emerald-400 transition-all duration-500" 
                style={{ width: `${user?.profileCompletion || 85}%` }}
              />
            </div>
            <p className="text-[10px] text-slate-400">
              Complete bank Aadhaar seeding to ensure smooth DBT transfers.
            </p>
          </div>
        </div>

        {/* Dashboard Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Active Applications</p>
              <h3 className="text-2xl font-extrabold text-slate-900 mt-1">{activeApps.length}</h3>
            </div>
            <div className="p-3 rounded-xl bg-blue-50 text-blue-600">
              <FileText className="w-6 h-6" />
            </div>
          </div>

          <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Under Verification</p>
              <h3 className="text-2xl font-extrabold text-slate-900 mt-1">{underVerification.length}</h3>
            </div>
            <div className="p-3 rounded-xl bg-indigo-50 text-indigo-600">
              <Clock className="w-6 h-6" />
            </div>
          </div>

          <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Deficiency Raised</p>
              <h3 className="text-2xl font-extrabold text-amber-600 mt-1">{deficiencyRaised.length}</h3>
            </div>
            <div className="p-3 rounded-xl bg-amber-50 text-amber-600">
              <AlertTriangle className="w-6 h-6" />
            </div>
          </div>

          <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Selected / Sanctioned</p>
              <h3 className="text-2xl font-extrabold text-emerald-600 mt-1">{selected.length}</h3>
            </div>
            <div className="p-3 rounded-xl bg-emerald-50 text-emerald-600">
              <CheckCircle2 className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Action Banner */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-xl bg-gradient-to-r from-teal-900 via-slate-900 to-indigo-950 text-white shadow-md border border-teal-800">
          <div className="space-y-1">
            <h3 className="font-bold text-base">Ready to apply for a new scholarship scheme?</h3>
            <p className="text-xs text-slate-300">
              Pre-Matric, Post-Matric, Top Class, NFST Fellowship, and NOS Overseas are currently open for 2026.
            </p>
          </div>
          <Link
            to="/apply"
            className="px-5 py-2.5 rounded-lg bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs shadow-md transition-colors shrink-0 flex items-center gap-1.5"
          >
            <span>Apply Now</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Applications List */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-lg text-slate-900">Your Scholarship Applications</h3>
              <p className="text-xs text-slate-500">Real-time status updates powered by TrustLink AI engine</p>
            </div>
            <Link to="/apply" className="font-semibold text-xs text-teal-700 hover:underline">
              + New Application
            </Link>
          </div>

          {loading ? (
            <div className="p-12 text-center text-slate-500 text-sm">Loading applications...</div>
          ) : applications.length === 0 ? (
            <div className="p-12 text-center text-slate-500 space-y-3">
              <p className="font-medium text-slate-700">No applications submitted yet.</p>
              <Link to="/apply" className="inline-block px-4 py-2 bg-teal-600 text-white rounded-lg text-xs font-bold">
                Start Scholarship Application
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {applications.map((app) => (
                <div key={app.id} className="p-6 hover:bg-slate-50/80 transition-colors space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-slate-500">{app.id}</span>
                        <span className="text-slate-300">•</span>
                        <h4 className="font-bold text-slate-900 text-base">{app.schemeName}</h4>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Institution: {app.institution} | Submitted: {new Date(app.submittedAt).toLocaleDateString()}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      {getStatusBadge(app.status)}
                      <Link
                        to={`/application/${app.id}`}
                        className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors flex items-center gap-1"
                      >
                        Details <ChevronRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>

                  {/* Application Visual Timeline */}
                  <div className="pt-2">
                    <p className="text-xs font-semibold text-slate-500 mb-2">Application Timeline:</p>
                    <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 text-center text-[11px]">
                      {[
                        { label: 'Submitted', done: true },
                        { label: 'Doc Verification', done: app.status !== 'SUBMITTED' },
                        { label: 'Eligibility Check', done: app.eligibilityScore > 0 },
                        { label: 'Officer Review', done: app.status === 'OFFICER_REVIEW' || app.status === 'SELECTED' },
                        { label: 'Selection', done: app.status === 'SELECTED' },
                        { label: 'Disbursement', done: app.status === 'SELECTED' }
                      ].map((step, idx) => (
                        <div
                          key={idx}
                          className={`p-2 rounded-lg border font-medium ${
                            step.done
                              ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                              : 'bg-slate-50 border-slate-200 text-slate-400'
                          }`}
                        >
                          {step.done ? '✓ ' : ''}{step.label}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Deficiency Action Prompt if Raised */}
                  {app.status === 'DEFICIENCY_RAISED' && (
                    <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                      <div className="flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold text-amber-900 block">Deficiency Notice: Expired Income Certificate</span>
                          <span className="text-amber-800">
                            Please upload an updated income certificate to proceed with verification.
                          </span>
                        </div>
                      </div>

                      <Link
                        to={`/deficiency/${app.id}`}
                        className="px-3.5 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs flex items-center gap-1 transition-colors shrink-0"
                      >
                        <Upload className="w-3.5 h-3.5" /> Resolve Deficiency
                      </Link>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
