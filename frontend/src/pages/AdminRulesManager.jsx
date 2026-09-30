import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { Sliders, Save, CheckCircle2, ArrowLeft, Plus, Trash2 } from 'lucide-react';

export const AdminRulesManager = () => {
  const { token } = useAuth();
  const [schemes, setSchemes] = useState([]);
  const [selectedSchemeId, setSelectedSchemeId] = useState('');
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Form rule fields
  const [maxAnnualIncome, setMaxAnnualIncome] = useState(250000);
  const [minPercentage, setMinPercentage] = useState(50);
  const [maxAge, setMaxAge] = useState(35);

  useEffect(() => {
    fetch('/api/schemes')
      .then(res => res.json())
      .then(data => {
        setSchemes(Array.isArray(data) ? data : []);
        if (data.length > 0) {
          setSelectedSchemeId(data[0].id);
          setMaxAnnualIncome(data[0].maxAnnualIncome || 250000);
          setMinPercentage(data[0].minPercentage || 50);
          setMaxAge(data[0].maxAge || 35);
        }
      })
      .catch(err => console.error(err));
  }, []);

  const handleSchemeSelect = (schemeId) => {
    setSelectedSchemeId(schemeId);
    const sch = schemes.find(s => s.id === schemeId);
    if (sch) {
      setMaxAnnualIncome(sch.maxAnnualIncome || 250000);
      setMinPercentage(sch.minPercentage || 50);
      setMaxAge(sch.maxAge || 35);
    }
  };

  const handleSaveRules = async () => {
    setSaving(true);
    setSavedSuccess(false);

    try {
      const res = await fetch(`/api/schemes/${selectedSchemeId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          maxAnnualIncome: Number(maxAnnualIncome),
          minPercentage: Number(minPercentage),
          maxAge: Number(maxAge)
        })
      });

      if (res.ok) {
        setSavedSuccess(true);
        setTimeout(() => setSavedSuccess(false), 3000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <Link to="/admin/dashboard" className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-slate-900">
          <ArrowLeft className="w-4 h-4" /> Back to Admin Dashboard
        </Link>

        <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-xl flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-teal-400 uppercase tracking-wider">MoTA Dynamic Rules Engine</span>
            <h1 className="text-2xl font-extrabold">Configurable Scheme Eligibility Rules</h1>
            <p className="text-xs text-slate-300 mt-1">Configure income limits, age cutoffs, and required documents dynamically without code redeployment.</p>
          </div>

          <Sliders className="w-8 h-8 text-teal-400" />
        </div>

        {savedSuccess && (
          <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-800 text-emerald-300 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>Scheme eligibility rules updated and deployed to live backend rules engine!</span>
          </div>
        )}

        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-6">
          {/* Select Scheme */}
          <div>
            <label className="block text-xs font-bold text-slate-900 mb-1">Target Scholarship Scheme</label>
            <select
              value={selectedSchemeId}
              onChange={(e) => handleSchemeSelect(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-semibold text-slate-900 focus:outline-none"
            >
              {schemes.map((sch) => (
                <option key={sch.id} value={sch.id}>{sch.name} ({sch.code})</option>
              ))}
            </select>
          </div>

          {/* Rule Configuration Form */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Max Annual Income Ceiling (₹)</label>
              <input
                type="number"
                value={maxAnnualIncome}
                onChange={(e) => setMaxAnnualIncome(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-mono font-bold"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Min Aggregate Marks (%)</label>
              <input
                type="number"
                value={minPercentage}
                onChange={(e) => setMinPercentage(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-mono font-bold"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Max Allowable Age (Years)</label>
              <input
                type="number"
                value={maxAge}
                onChange={(e) => setMaxAge(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-mono font-bold"
              />
            </div>
          </div>

          <button
            onClick={handleSaveRules}
            disabled={saving}
            className="w-full py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl shadow-md transition-colors flex items-center justify-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Saving Rules...' : 'Save & Update Scheme Rules Engine'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
