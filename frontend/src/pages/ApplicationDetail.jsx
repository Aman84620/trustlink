import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { VerificationScanner } from '../components/VerificationScanner';
import { 
  FileText, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  User, 
  BookOpen, 
  ShieldCheck, 
  Sparkles, 
  ArrowLeft, 
  Upload, 
  Award, 
  Info 
} from 'lucide-react';

export const ApplicationDetail = () => {
  const { id } = useParams();
  const { user, token } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [officerDecision, setOfficerDecision] = useState('APPROVE');
  const [remarks, setRemarks] = useState('');
  const [submittingReview, setSubmittingReview] = useState(false);

  useEffect(() => {
    fetch(`/api/applications/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(resData => setData(resData))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [id, token]);

  const handleOfficerReview = async () => {
    setSubmittingReview(true);
    try {
      const res = await fetch(`/api/applications/${id}/officer-review`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          decision: officerDecision,
          remarks
        })
      });

      const resData = await res.json();
      if (res.ok) {
        window.location.reload();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmittingReview(false);
    }
  };

  if (loading) {
    return <div className="p-12 text-center text-slate-500 font-medium">Loading application details...</div>;
  }

  if (!data || !data.application) {
    return <div className="p-12 text-center text-slate-500 font-medium">Application record not found.</div>;
  }

  const { application, student, scheme, documents = [], deficiencies = [], timeline = [], aiSummary } = data;

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Top Navigation */}
        <div className="flex items-center justify-between">
          <Link
            to={user?.role === 'OFFICER' ? '/officer/dashboard' : '/student/dashboard'}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Dashboard
          </Link>

          <span className="font-mono text-xs font-bold text-slate-500">ID: {application.id}</span>
        </div>

        {/* Application Header Card */}
        <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-bold text-teal-400 uppercase tracking-wider">{application.schemeCode}</span>
            <h1 className="text-2xl font-extrabold">{application.schemeName}</h1>
            <p className="text-xs text-slate-300">
              Applicant: {application.studentName} | State: {application.state} | District: {application.district}
            </p>
          </div>

          <div className="flex flex-col items-end gap-1.5">
            <span className="px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-bold border border-teal-500/30">
              Status: {application.status}
            </span>
            <span className="text-[11px] text-slate-400">
              Score: <strong className="text-teal-400">{application.eligibilityScore}%</strong> Match
            </span>
          </div>
        </div>

        {/* AI Officer Assistance Panel (Highlighted for Officers / Admins) */}
        {aiSummary && (user?.role === 'OFFICER' || user?.role === 'ADMIN') && (
          <div className="bg-slate-900 border border-teal-500/30 rounded-2xl p-6 text-white space-y-4 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-teal-400" />
                <h3 className="font-bold text-sm text-slate-100">AI Verification Summary (Officer Assistance)</h3>
              </div>
              <span className="text-[10px] text-amber-300 bg-amber-500/20 px-2 py-0.5 rounded font-semibold border border-amber-500/30">
                Official Oversight Required
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-center">
              <div className="p-3 rounded-xl bg-slate-800 border border-slate-700">
                <span className="text-slate-400 block text-[10px]">Verified Docs</span>
                <span className="font-bold text-teal-300 text-sm">{aiSummary.documentsVerified}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-800 border border-slate-700">
                <span className="text-slate-400 block text-[10px]">Eligibility Match</span>
                <span className="font-bold text-emerald-400 text-sm">{aiSummary.eligibilityMatch}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-800 border border-slate-700">
                <span className="text-slate-400 block text-[10px]">Potential Issues</span>
                <span className="font-bold text-amber-400 text-sm">{aiSummary.potentialIssues}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-800 border border-slate-700">
                <span className="text-slate-400 block text-[10px]">Risk Flags</span>
                <span className="font-bold text-emerald-400 text-sm">{aiSummary.riskFlags}</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700 text-xs text-slate-200">
              <strong className="text-teal-300 block mb-1">AI Recommendation:</strong>
              <p>{aiSummary.aiRecommendation}</p>
              <span className="block mt-2 text-[10px] text-amber-400 font-semibold">
                ⚠️ {aiSummary.disclaimer}
              </span>
            </div>
          </div>
        )}

        {/* Detail Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Info Columns */}
          <div className="lg:col-span-2 space-y-6">
            {/* Applicant Profile */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
              <h3 className="font-bold text-slate-900 text-base pb-2 border-b border-slate-100">Student & Academic Details</h3>
              <div className="grid grid-cols-2 gap-4 text-xs text-slate-600">
                <div>
                  <span className="text-slate-400 block text-[11px]">Full Name</span>
                  <strong className="text-slate-900">{student.name}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Caste / Tribe</span>
                  <strong className="text-slate-900">{student.caste || 'Scheduled Tribe'}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Annual Family Income</span>
                  <strong className="text-slate-900">₹{application.annualIncome?.toLocaleString('en-IN')}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Percentage</span>
                  <strong className="text-slate-900">{application.previousPercentage}%</strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Institution</span>
                  <strong className="text-slate-900">{application.institution}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Course</span>
                  <strong className="text-slate-900">{application.course}</strong>
                </div>
              </div>
            </div>

            {/* Document Verifications */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
              <h3 className="font-bold text-slate-900 text-base pb-2 border-b border-slate-100">Uploaded Documents & AI Verification Results</h3>
              {documents.length === 0 ? (
                <p className="text-xs text-slate-500">No document records found.</p>
              ) : (
                <div className="space-y-4">
                  {documents.map((doc) => (
                    <VerificationScanner key={doc.id} documentData={doc} isAutoStart={false} />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Side Column: Action Panel & Timeline */}
          <div className="space-y-6">
            {/* Officer Review Form (Only visible to Officer/Admin) */}
            {(user?.role === 'OFFICER' || user?.role === 'ADMIN') && (
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
                <h3 className="font-bold text-slate-900 text-sm">Official Officer Decision Panel</h3>
                
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Decision</label>
                  <select
                    value={officerDecision}
                    onChange={(e) => setOfficerDecision(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none"
                  >
                    <option value="APPROVE">Approve & Select for Sanction</option>
                    <option value="DEFICIENCY">Raise Deficiency Notice</option>
                    <option value="REJECT">Reject Application</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Official Remarks</label>
                  <textarea
                    rows={3}
                    value={remarks}
                    onChange={(e) => setRemarks(e.target.value)}
                    placeholder="Enter official remarks..."
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none"
                  />
                </div>

                <button
                  onClick={handleOfficerReview}
                  disabled={submittingReview}
                  className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-lg shadow-sm transition-colors"
                >
                  {submittingReview ? 'Submitting Decision...' : 'Submit Official Review'}
                </button>
              </div>
            )}

            {/* Application Timeline Audit Trail */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
              <h3 className="font-bold text-slate-900 text-sm">Audit Trail Timeline</h3>
              <div className="space-y-3 relative border-l-2 border-slate-200 pl-4 text-xs">
                {timeline.map((item, idx) => (
                  <div key={idx} className="relative">
                    <span className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-teal-600 ring-4 ring-white" />
                    <p className="font-bold text-slate-900">{item.action}</p>
                    <p className="text-[11px] text-slate-500">{new Date(item.timestamp).toLocaleString()}</p>
                    <p className="text-slate-600 text-[11px] mt-0.5">{item.details}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
