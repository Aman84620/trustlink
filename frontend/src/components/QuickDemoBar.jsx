import React from 'react';
import { useAuth } from '../context/AuthContext';
import { UserCheck, Shield, Award, Sparkles, CheckCircle2 } from 'lucide-react';

export const QuickDemoBar = () => {
  const { user, demoLogin } = useAuth();

  const handleRoleSwitch = async (role) => {
    try {
      await demoLogin(role);
    } catch (err) {
      console.error('Failed to switch demo account:', err);
    }
  };

  return (
    <div className="bg-slate-950 text-slate-200 border-b border-slate-800 text-xs py-1.5 px-4 sm:px-8 flex flex-col md:flex-row items-center justify-between gap-2 z-50">
      <div className="flex items-center gap-2">
        <span className="inline-flex items-center px-2 py-0.5 rounded bg-teal-500/20 text-teal-300 border border-teal-500/40 font-bold tracking-wider uppercase text-[10px]">
          <Sparkles className="w-3 h-3 mr-1 text-teal-400" /> TrustLink AI Live Demo
        </span>
        <span className="hidden sm:inline text-slate-700">|</span>
        <span className="text-slate-300 font-semibold text-[11px]">
          Ministry of Tribal Affairs (MoTA) Automated Verification System
        </span>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-slate-400 text-[11px] font-medium hidden lg:inline">Switch Demo Persona:</span>
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => handleRoleSwitch('STUDENT')}
            className={`px-3 py-1 rounded-lg flex items-center gap-1.5 transition-all text-xs font-bold ${
              user?.role === 'STUDENT'
                ? 'bg-teal-600 text-white shadow-sm ring-2 ring-teal-400/30'
                : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800'
            }`}
            title="Login as ST Student (Rahul Kumar)"
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>Student Persona</span>
          </button>

          <button
            onClick={() => handleRoleSwitch('OFFICER')}
            className={`px-3 py-1 rounded-lg flex items-center gap-1.5 transition-all text-xs font-bold ${
              user?.role === 'OFFICER'
                ? 'bg-blue-600 text-white shadow-sm ring-2 ring-blue-400/30'
                : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800'
            }`}
            title="Login as Nodal Verification Officer (Dr. Rajesh Sharma)"
          >
            <Shield className="w-3.5 h-3.5" />
            <span>Officer Persona</span>
          </button>

          <button
            onClick={() => handleRoleSwitch('ADMIN')}
            className={`px-3 py-1 rounded-lg flex items-center gap-1.5 transition-all text-xs font-bold ${
              user?.role === 'ADMIN'
                ? 'bg-indigo-600 text-white shadow-sm ring-2 ring-indigo-400/30'
                : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800'
            }`}
            title="Login as MoTA Administrator (Priya Verma)"
          >
            <Award className="w-3.5 h-3.5" />
            <span>Admin Persona</span>
          </button>
        </div>
      </div>
    </div>
  );
};
