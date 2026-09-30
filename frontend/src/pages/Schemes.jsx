import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, CheckCircle2, ArrowRight } from 'lucide-react';

export const Schemes = () => {
  const [schemes, setSchemes] = useState([]);

  useEffect(() => {
    fetch('/api/schemes')
      .then(res => res.json())
      .then(data => setSchemes(Array.isArray(data) ? data : []))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-block px-3 py-1 rounded-full bg-teal-100 text-teal-800 text-xs font-bold uppercase tracking-wider mb-2">
            Ministry of Tribal Affairs Programs
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Scheduled Tribe Scholarship & Fellowship Schemes
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Explore eligible schemes, financial benefits, mandatory document requirements, and income ceilings.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {schemes.map((scheme) => (
            <div key={scheme.id} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
              <div>
                <span className="px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-700 text-xs font-bold uppercase">
                  {scheme.category}
                </span>
                <h3 className="font-bold text-slate-900 text-lg mt-2 mb-2">{scheme.name}</h3>
                <p className="text-xs text-slate-600 mb-4">{scheme.description}</p>
                <div className="space-y-1 text-xs text-slate-500 mb-6">
                  <p><strong>Income Ceiling:</strong> ≤ ₹{scheme.maxAnnualIncome?.toLocaleString('en-IN')}</p>
                  <p><strong>Financial Benefit:</strong> {scheme.financialBenefit}</p>
                </div>
              </div>

              <Link
                to="/apply"
                className="w-full py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-lg text-center transition-colors flex items-center justify-center gap-1"
              >
                <span>Apply Now</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
