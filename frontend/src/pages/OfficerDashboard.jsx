import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Shield, 
  FileText, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  Filter, 
  Search, 
  ChevronRight, 
  Sparkles, 
  Users, 
  Download 
} from 'lucide-react';

export const OfficerDashboard = () => {
  const { token } = useAuth();
  const [stats, setStats] = useState(null);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters State
  const [search, setSearch] = useState('');
  const [selectedScheme, setSelectedScheme] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedState, setSelectedState] = useState('');

  useEffect(() => {
    // Fetch stats
    fetch('/api/officer/dashboard-stats', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(err => console.error(err));

    // Fetch applications
    fetch('/api/officer/applications', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setApplications(Array.isArray(data) ? data : []))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [token]);

  const filteredApps = applications.filter(app => {
    const matchesSearch = !search || 
      app.id.toLowerCase().includes(search.toLowerCase()) || 
      app.studentName.toLowerCase().includes(search.toLowerCase()) ||
      app.schemeName.toLowerCase().includes(search.toLowerCase());

    const matchesScheme = !selectedScheme || app.schemeCode === selectedScheme || app.schemeId === selectedScheme;
    const matchesStatus = !selectedStatus || app.status === selectedStatus;
    const matchesState = !selectedState || app.state === selectedState;

    return matchesSearch && matchesScheme && matchesStatus && matchesState;
  });

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Officer Header Card */}
        <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold border border-blue-500/30">
              <Shield className="w-3.5 h-3.5" /> District & State Verification Officer Portal
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Scholarship Verification Dashboard
            </h1>
            <p className="text-xs sm:text-sm text-slate-300">
              AI-assisted application review, document authenticity evaluation, and official sanctioning.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-xs text-slate-300 font-mono">
              Role: Senior Verification Officer
            </span>
          </div>
        </div>

        {/* Dashboard Metric Summary Cards */}
        {stats && (
          <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
              <span className="text-slate-500 font-semibold block uppercase tracking-wider text-[10px]">Total Applications</span>
              <p className="text-2xl font-extrabold text-slate-900 mt-1">{stats.totalApplications?.toLocaleString()}</p>
            </div>

            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
              <span className="text-slate-500 font-semibold block uppercase tracking-wider text-[10px]">Pending Verification</span>
              <p className="text-2xl font-extrabold text-blue-600 mt-1">{stats.pendingVerification?.toLocaleString()}</p>
            </div>

            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
              <span className="text-slate-500 font-semibold block uppercase tracking-wider text-[10px]">Deficiency Raised</span>
              <p className="text-2xl font-extrabold text-amber-600 mt-1">{stats.deficiencyRaised?.toLocaleString()}</p>
            </div>

            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
              <span className="text-slate-500 font-semibold block uppercase tracking-wider text-[10px]">Eligible Match</span>
              <p className="text-2xl font-extrabold text-teal-600 mt-1">{stats.eligible?.toLocaleString()}</p>
            </div>

            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
              <span className="text-slate-500 font-semibold block uppercase tracking-wider text-[10px]">Selected / Sanctioned</span>
              <p className="text-2xl font-extrabold text-emerald-600 mt-1">{stats.selected?.toLocaleString()}</p>
            </div>

            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
              <span className="text-slate-500 font-semibold block uppercase tracking-wider text-[10px]">Rejected</span>
              <p className="text-2xl font-extrabold text-red-600 mt-1">{stats.rejected?.toLocaleString()}</p>
            </div>
          </div>
        )}

        {/* Visual Analytics Grid */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Status Breakdown */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
              <h3 className="font-bold text-slate-900 text-sm">Verification Status Distribution</h3>
              <div className="space-y-3">
                {stats.statusDistribution?.map((item, idx) => (
                  <div key={idx} className="space-y-1 text-xs">
                    <div className="flex justify-between font-medium">
                      <span className="text-slate-700">{item.name}</span>
                      <span className="font-bold text-slate-900">{item.value}</span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full transition-all duration-500"
                        style={{ width: `${Math.min(100, (item.value / 2000) * 100)}%`, backgroundColor: item.color }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* State Distribution */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
              <h3 className="font-bold text-slate-900 text-sm">Applications by Domicile State</h3>
              <div className="grid grid-cols-2 gap-3 text-xs">
                {stats.applicationsByState?.map((st, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex justify-between">
                    <span className="font-semibold text-slate-700">{st.state}</span>
                    <strong className="text-teal-700">{st.count}</strong>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Applications Filterable Table */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden">
          <div className="p-6 border-b border-slate-100 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-bold text-lg text-slate-900">Application Queue for Review</h3>
                <p className="text-xs text-slate-500">Filter applications by scheme, status, domicile state, or risk flag</p>
              </div>

              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search ID, Student, Scheme..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-blue-600 w-full sm:w-64"
                />
              </div>
            </div>

            {/* Filter Controls */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <select
                value={selectedScheme}
                onChange={(e) => setSelectedScheme(e.target.value)}
                className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-700"
              >
                <option value="">All Schemes</option>
                <option value="PRE_MATRIC_ST">Pre-Matric ST Scholarship</option>
                <option value="POST_MATRIC_ST">Post-Matric ST Scholarship</option>
                <option value="TOP_CLASS_ST">Top Class Education</option>
                <option value="NFST_FELLOWSHIP">NFST Fellowship</option>
                <option value="NOS_OVERSEAS">NOS Overseas</option>
              </select>

              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-700"
              >
                <option value="">All Statuses</option>
                <option value="UNDER_VERIFICATION">Under Verification</option>
                <option value="DEFICIENCY_RAISED">Deficiency Raised</option>
                <option value="OFFICER_REVIEW">Officer Review</option>
                <option value="SELECTED">Selected / Sanctioned</option>
                <option value="REJECTED">Rejected</option>
              </select>

              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-700"
              >
                <option value="">All Domicile States</option>
                <option value="Jharkhand">Jharkhand</option>
                <option value="Odisha">Odisha</option>
                <option value="Chhattisgarh">Chhattisgarh</option>
                <option value="Madhya Pradesh">Madhya Pradesh</option>
                <option value="Assam">Assam</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                  <th className="py-3 px-4">Application ID</th>
                  <th className="py-3 px-4">Student Name</th>
                  <th className="py-3 px-4">Scheme</th>
                  <th className="py-3 px-4">Submitted Date</th>
                  <th className="py-3 px-4">Verification Status</th>
                  <th className="py-3 px-4">Eligibility</th>
                  <th className="py-3 px-4">Risk Flag</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredApps.map((app) => (
                  <tr key={app.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-slate-900">{app.id}</td>
                    <td className="py-3 px-4 font-semibold text-slate-800">{app.studentName}</td>
                    <td className="py-3 px-4 text-slate-600">{app.schemeCode}</td>
                    <td className="py-3 px-4 text-slate-500">{new Date(app.submittedAt).toLocaleDateString()}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                        app.status === 'SELECTED' ? 'bg-emerald-100 text-emerald-800' :
                        app.status === 'DEFICIENCY_RAISED' ? 'bg-amber-100 text-amber-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {app.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-bold text-teal-700">{app.eligibilityScore}% Match</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded font-medium text-[10px] ${
                        app.riskFlag === 'Action Required' ? 'bg-amber-100 text-amber-900 font-bold' : 'bg-slate-100 text-slate-700'
                      }`}>
                        {app.riskFlag || 'Low Risk'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <Link
                        to={`/application/${app.id}`}
                        className="px-3 py-1 rounded bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs inline-flex items-center gap-1 transition-colors"
                      >
                        Review <ChevronRight className="w-3.5 h-3.5" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
