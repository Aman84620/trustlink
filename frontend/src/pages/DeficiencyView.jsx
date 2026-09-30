import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { VerificationScanner } from '../components/VerificationScanner';
import { AlertTriangle, Upload, CheckCircle2, ArrowLeft, RefreshCw } from 'lucide-react';

export const DeficiencyView = () => {
  const { id } = useParams();
  const { token } = useAuth();
  const navigate = useNavigate();

  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [reVerified, setReVerified] = useState(false);

  useEffect(() => {
    fetch(`/api/applications/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setApplication(data.application))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [id, token]);

  const handleResolve = async () => {
    setSubmitting(true);
    try {
      const res = await fetch(`/api/applications/${id}/resubmit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          documentType: 'INCOME_CERT',
          newDocumentName: 'Income_Certificate_2026_Updated_Valid.pdf'
        })
      });

      if (res.ok) {
        setReVerified(true);
        setTimeout(() => {
          navigate('/student/dashboard');
        }, 2000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="p-12 text-center text-slate-500">Loading deficiency details...</div>;

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-6">
        <button
          onClick={() => navigate('/student/dashboard')}
          className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-slate-900"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </button>

        <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-xl space-y-3">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-400" />
            <h1 className="text-xl font-extrabold">Resolve Deficiency Notice</h1>
          </div>
          <p className="text-xs text-slate-300">
            Application ID: <strong className="text-amber-400">{id}</strong> | Scheme: {application?.schemeName}
          </p>
        </div>

        {/* Deficiency Details */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-6">
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs space-y-2">
            <h3 className="font-bold text-amber-900 text-sm">Issue Flagged: Expired Income Certificate</h3>
            <p className="text-amber-800">
              The uploaded Income Certificate (Issued 14/08/2024) expired prior to the 2026-27 academic session. A valid certificate issued after April 1, 2026 is required.
            </p>
          </div>

          {!reVerified ? (
            <div className="space-y-4 text-xs">
              <h4 className="font-bold text-slate-900">Upload Updated Document</h4>
              <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center bg-slate-50 hover:bg-slate-100 transition-colors">
                <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                <p className="font-bold text-slate-800">Income_Certificate_2026_Updated_Valid.pdf</p>
                <p className="text-[11px] text-slate-500 mt-1">Issued by Tehsildar / SDO Revenue Authority (Verified Format)</p>
              </div>

              <button
                onClick={handleResolve}
                disabled={submitting}
                className="w-full py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl shadow-md transition-colors flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" /> Running AI Re-Verification...
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" /> Re-Submit for AI Verification
                  </>
                )}
              </button>
            </div>
          ) : (
            <div className="p-6 rounded-xl bg-emerald-950/20 border border-emerald-500/40 text-center space-y-3">
              <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
              <h3 className="font-bold text-base text-emerald-900">Deficiency Resolved & Re-Verified!</h3>
              <p className="text-xs text-emerald-800">
                AI document scanner confirmed 98% validity. Application status updated to <strong>Under Re-Verification</strong> and routed to verification officer.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
