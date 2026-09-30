import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { 
  Award, 
  Download, 
  BarChart3, 
  Users, 
  Sliders, 
  FileText, 
  Clock, 
  ShieldCheck, 
  Sparkles 
} from 'lucide-react';

export const AdminDashboard = () => {
  const { token } = useAuth();
  const [analytics, setAnalytics] = useState(null);
  const [auditLogs, setAuditLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/analytics', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setAnalytics(data))
      .catch(err => console.error(err));

    fetch('/api/admin/audit-logs', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setAuditLogs(Array.isArray(data) ? data : []))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [token]);

  const handleExportCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8,Application ID,Student Name,Scheme,State,Status,Score\nAPP-8821,Rahul Kumar,Post-Matric,Jharkhand,DEFICIENCY_RAISED,68%\nAPP-8822,Sunita Oraon,NFST,Odisha,UNDER_VERIFICATION,96%\n";
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "TrustLink_MoTA_Report_2026.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Admin Header Card */}
        <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold border border-indigo-500/30">
              <Award className="w-3.5 h-3.5" /> Ministry of Tribal Affairs (MoTA) National Dashboard
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Ecosystem Analytics & Rules Management
            </h1>
            <p className="text-xs sm:text-sm text-slate-300">
              National monitoring of ST scholarship schemes, deficiency trends, and scheme rule engines.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/admin/rules"
              className="px-4 py-2 rounded-lg bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md transition-colors"
            >
              <Sliders className="w-4 h-4" /> Rules Engine Manager
            </Link>

            <button
              onClick={handleExportCSV}
              className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-xs flex items-center gap-1.5 transition-colors"
            >
              <Download className="w-4 h-4" /> Export CSV Report
            </button>
          </div>
        </div>

        {/* Analytics Highlights */}
        {analytics && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Total ST Beneficiaries Covered</span>
              <p className="text-3xl font-extrabold text-slate-900 mt-1">{analytics.summary?.totalApplications}</p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Applications Processed</span>
              <p className="text-3xl font-extrabold text-teal-600 mt-1">{analytics.summary?.totalProcessed}</p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Average Processing Time</span>
              <p className="text-3xl font-extrabold text-indigo-600 mt-1">{analytics.summary?.averageProcessingDays}</p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">AI OCR Scanning Accuracy</span>
              <p className="text-3xl font-extrabold text-emerald-600 mt-1">{analytics.summary?.aiVerificationAccuracy}</p>
            </div>
          </div>
        )}

        {/* State-wise Distribution & Deficiency Trends */}
        {analytics && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* State Table */}
            <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
              <h3 className="font-bold text-slate-900 text-base">State-Wise Application & Disbursement Distribution</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px]">
                      <th className="py-2.5 px-3">State</th>
                      <th className="py-2.5 px-3">Applications</th>
                      <th className="py-2.5 px-3">Selected</th>
                      <th className="py-2.5 px-3 text-right">Deficiency Rate</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {analytics.stateWiseDistribution?.map((st, idx) => (
                      <tr key={idx} className="hover:bg-slate-50">
                        <td className="py-2.5 px-3 font-semibold text-slate-900">{st.state}</td>
                        <td className="py-2.5 px-3 font-mono">{st.applications.toLocaleString()}</td>
                        <td className="py-2.5 px-3 font-mono text-emerald-700 font-bold">{st.selected.toLocaleString()}</td>
                        <td className="py-2.5 px-3 text-right font-mono font-semibold text-amber-700">{st.deficiencyRate}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Deficiency Categories */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
              <h3 className="font-bold text-slate-900 text-base">National Deficiency Category Breakdown</h3>
              <div className="space-y-4 text-xs">
                {analytics.deficiencyTrends?.map((item, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between font-medium">
                      <span className="text-slate-700">{item.category}</span>
                      <span className="font-bold text-slate-900">{item.percentage}%</span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-amber-500 transition-all duration-500"
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* National System Audit Log */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
          <h3 className="font-bold text-slate-900 text-base">Recent Audit Logs</h3>
          <div className="space-y-2 text-xs">
            {auditLogs.map((log) => (
              <div key={log.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-900">{log.action}</span>
                  <span className="text-slate-500 ml-2 font-mono text-[11px]">{new Date(log.timestamp).toLocaleString()}</span>
                  <p className="text-slate-600 text-[11px] mt-0.5">{log.details}</p>
                </div>
                <span className="px-2 py-0.5 rounded bg-slate-200 font-mono text-[10px] text-slate-700">
                  {log.performedBy}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
