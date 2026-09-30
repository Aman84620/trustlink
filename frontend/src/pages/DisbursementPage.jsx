import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { CheckCircle2, DollarSign, ShieldCheck, Info, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export const DisbursementPage = () => {
  const { token } = useAuth();
  const [disbursements, setDisbursements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/disbursements/my-disbursements', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setDisbursements(Array.isArray(data) ? data : []))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [token]);

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <Link to="/student/dashboard" className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-slate-900">
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </Link>

        <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-xl flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-teal-400 uppercase tracking-wider">Direct Benefit Transfer (DBT)</span>
            <h1 className="text-2xl font-extrabold">Scholarship Disbursement Tracker</h1>
            <p className="text-xs text-slate-300 mt-1">PFMS / Aadhaar Payment Bridge System (APBS) Status</p>
          </div>

          <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/30">
            Demo Transaction Mode
          </span>
        </div>

        {loading ? (
          <div className="p-12 text-center text-slate-500">Loading disbursement records...</div>
        ) : disbursements.length === 0 ? (
          <div className="p-12 bg-white border border-slate-200 rounded-2xl text-center space-y-3 text-xs text-slate-500">
            <Info className="w-8 h-8 text-slate-400 mx-auto" />
            <p className="font-bold text-slate-700">No active disbursements found.</p>
            <p>Disbursements are initiated automatically upon official sanction by verification officers.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {disbursements.map((item) => (
              <div key={item.id} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                  <div>
                    <span className="text-xs font-bold text-teal-700 uppercase tracking-wide">{item.schemeName}</span>
                    <h3 className="font-bold text-slate-900 text-lg">Sanctioned Amount: ₹{item.sanctionedAmount?.toLocaleString('en-IN')}</h3>
                  </div>

                  <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-300">
                    Status: {item.disbursementStatus}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs text-slate-600">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-slate-400 block text-[10px]">Transaction Reference</span>
                    <strong className="font-mono text-slate-900 text-[11px]">{item.transactionReference}</strong>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-slate-400 block text-[10px]">Payment Date</span>
                    <strong className="text-slate-900">{new Date(item.paymentDate).toLocaleDateString()}</strong>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-slate-400 block text-[10px]">Bank & Account</span>
                    <strong className="text-slate-900">{item.bankName} ({item.accountNumber})</strong>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-slate-400 block text-[10px]">DBT Seeding</span>
                    <strong className="text-emerald-700">Aadhaar Linked</strong>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-[11px] text-amber-900">
                  <strong>Notice:</strong> This transaction record is generated in <strong>Demo Mode</strong> for prototype presentation. PFMS API integration service layer is ready for live government production deployment.
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
