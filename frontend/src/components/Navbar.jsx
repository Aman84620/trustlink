import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  ShieldCheck, 
  User, 
  LogOut, 
  Menu, 
  X, 
  LayoutDashboard, 
  Shield, 
  Award, 
  CheckCircle2, 
  Bell, 
  ChevronDown,
  Sparkles,
  Lock,
  PhoneCall,
  Globe
} from 'lucide-react';

export const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-40 w-full shadow-sm bg-white">
      {/* Top Official National Header */}
      <div className="gov-top-bar text-slate-200 text-[11px] py-1 px-4 sm:px-8 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="text-xs">🇮🇳</span>
            <span className="font-bold tracking-wide uppercase text-amber-400">Government of India</span>
          </div>
          <span className="text-slate-600 hidden sm:inline">|</span>
          <span className="text-slate-300 font-medium hidden sm:inline">Ministry of Tribal Affairs (MoTA)</span>
        </div>
        <div className="flex items-center gap-4 text-slate-300 text-[10px] sm:text-[11px]">
          <div className="hidden md:flex items-center gap-1 hover:text-white transition-colors cursor-pointer">
            <PhoneCall className="w-3 h-3 text-teal-400" />
            <span>Toll-Free Helpline: <strong>1800-11-2026</strong></span>
          </div>
          <span className="text-slate-600 hidden md:inline">|</span>
          <div className="flex items-center gap-1 text-emerald-400 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>AI OCR Engine v3.4 Active</span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="bg-white/95 backdrop-blur-md border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo Brand */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-slate-950 via-teal-950 to-emerald-700 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-all border border-teal-500/30">
                <ShieldCheck className="w-6 h-6 text-teal-400" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-black text-xl tracking-tight text-slate-900">TrustLink</span>
                  <span className="bg-gradient-to-r from-teal-700 to-emerald-600 text-white text-[10px] font-black px-1.5 py-0.5 rounded shadow-xs tracking-wider uppercase">AI</span>
                </div>
                <p className="text-[10px] text-slate-500 font-semibold tracking-wide flex items-center gap-1">
                  <span>National Tribal Scholarship Portal</span>
                </p>
              </div>
            </Link>

            {/* Desktop Nav Links */}
            <nav className="hidden md:flex items-center gap-7 text-sm font-semibold text-slate-600">
              <Link 
                to="/" 
                className={`transition-colors py-1 border-b-2 ${isActive('/') ? 'text-teal-700 border-teal-600 font-bold' : 'border-transparent hover:text-slate-900'}`}
              >
                Home
              </Link>
              <Link 
                to="/schemes" 
                className={`transition-colors py-1 border-b-2 ${isActive('/schemes') ? 'text-teal-700 border-teal-600 font-bold' : 'border-transparent hover:text-slate-900'}`}
              >
                Schemes
              </Link>
              <Link 
                to="/how-it-works" 
                className={`transition-colors py-1 border-b-2 ${isActive('/how-it-works') ? 'text-teal-700 border-teal-600 font-bold' : 'border-transparent hover:text-slate-900'}`}
              >
                How It Works
              </Link>
              <Link 
                to="/faqs" 
                className={`transition-colors py-1 border-b-2 ${isActive('/faqs') ? 'text-teal-700 border-teal-600 font-bold' : 'border-transparent hover:text-slate-900'}`}
              >
                FAQs
              </Link>

              {/* Role-Specific Navigation Buttons */}
              {user?.role === 'STUDENT' && (
                <>
                  <Link 
                    to="/student/dashboard" 
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-all ${
                      isActive('/student/dashboard') 
                        ? 'bg-teal-50 border-teal-300 text-teal-800 font-bold' 
                        : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <LayoutDashboard className="w-4 h-4 text-teal-600" />
                    <span>My Dashboard</span>
                  </Link>
                  <Link 
                    to="/apply" 
                    className="px-3.5 py-1.5 rounded-lg bg-teal-700 text-white text-xs font-bold hover:bg-teal-800 transition-colors shadow-sm flex items-center gap-1"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    Apply Now
                  </Link>
                </>
              )}

              {user?.role === 'OFFICER' && (
                <Link 
                  to="/officer/dashboard" 
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-all ${
                    isActive('/officer/dashboard')
                      ? 'bg-blue-50 border-blue-300 text-blue-800 font-bold'
                      : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <Shield className="w-4 h-4 text-blue-600" />
                  <span>Verification Portal</span>
                </Link>
              )}

              {user?.role === 'ADMIN' && (
                <Link 
                  to="/admin/dashboard" 
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-all ${
                    isActive('/admin/dashboard')
                      ? 'bg-indigo-50 border-indigo-300 text-indigo-800 font-bold'
                      : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <Award className="w-4 h-4 text-indigo-600" />
                  <span>MoTA Executive Hub</span>
                </Link>
              )}
            </nav>

            {/* Right Action / User Profile */}
            <div className="hidden md:flex items-center gap-3">
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-800 text-xs font-medium transition-all shadow-xs"
                  >
                    <div className="w-7 h-7 rounded-lg bg-slate-950 text-teal-400 flex items-center justify-center font-bold text-xs border border-teal-500/30">
                      {user.name.charAt(0)}
                    </div>
                    <div className="text-left hidden lg:block">
                      <p className="font-bold text-xs leading-tight text-slate-900">{user.name}</p>
                      <span className="text-[10px] text-teal-700 font-black uppercase tracking-wider">{user.role}</span>
                    </div>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                  </button>

                  {userDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 text-xs animate-in fade-in zoom-in-95 duration-100">
                      <div className="px-4 py-3 border-b border-slate-100 bg-slate-50/60 rounded-t-2xl">
                        <p className="font-extrabold text-slate-900">{user.name}</p>
                        <p className="text-slate-500 text-[11px] truncate">{user.email}</p>
                        <div className="mt-1.5 flex items-center gap-1.5">
                          <span className="px-2 py-0.5 rounded-full bg-teal-100 text-teal-800 text-[10px] font-bold uppercase tracking-wider">
                            Verified {user.role}
                          </span>
                        </div>
                      </div>

                      {user.role === 'STUDENT' && (
                        <>
                          <Link
                            to="/student/dashboard"
                            onClick={() => setUserDropdownOpen(false)}
                            className="flex items-center gap-2.5 px-4 py-2.5 text-slate-700 hover:bg-slate-50 font-medium"
                          >
                            <LayoutDashboard className="w-4 h-4 text-teal-600" /> Student Dashboard
                          </Link>
                          <Link
                            to="/disbursement"
                            onClick={() => setUserDropdownOpen(false)}
                            className="flex items-center gap-2.5 px-4 py-2.5 text-slate-700 hover:bg-slate-50 font-medium"
                          >
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" /> DBT Disbursement Tracker
                          </Link>
                        </>
                      )}

                      {user.role === 'OFFICER' && (
                        <Link
                          to="/officer/dashboard"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2.5 text-slate-700 hover:bg-slate-50 font-medium"
                        >
                          <Shield className="w-4 h-4 text-blue-600" /> Verification Dashboard
                        </Link>
                      )}

                      {user.role === 'ADMIN' && (
                        <Link
                          to="/admin/dashboard"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2.5 text-slate-700 hover:bg-slate-50 font-medium"
                        >
                          <Award className="w-4 h-4 text-indigo-600" /> Executive Analytics
                        </Link>
                      )}

                      <button
                        onClick={handleLogout}
                        className="w-full text-left flex items-center gap-2.5 px-4 py-2.5 text-red-600 hover:bg-red-50 font-bold border-t border-slate-100 mt-1"
                      >
                        <LogOut className="w-4 h-4" /> Secure Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Link
                    to="/login"
                    className="px-4 py-2 text-xs font-bold text-slate-700 hover:text-slate-900 border border-slate-300 rounded-xl hover:bg-slate-50 transition-colors"
                  >
                    Portal Login
                  </Link>
                  <Link
                    to="/register"
                    className="px-4 py-2 text-xs font-bold text-white bg-slate-950 hover:bg-slate-800 rounded-xl shadow-sm transition-colors border border-slate-800"
                  >
                    New Registration
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Toggle */}
            <div className="flex md:hidden items-center gap-2">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-slate-700 hover:text-slate-900 rounded-lg border border-slate-200"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-5 py-5 space-y-4 text-sm shadow-xl">
          <Link to="/" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-800 font-bold border-b border-slate-100">
            Home
          </Link>
          <Link to="/schemes" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-800 font-bold border-b border-slate-100">
            Schemes
          </Link>
          <Link to="/how-it-works" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-800 font-bold border-b border-slate-100">
            How It Works
          </Link>
          <Link to="/faqs" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-800 font-bold border-b border-slate-100">
            FAQs
          </Link>

          {user?.role === 'STUDENT' && (
            <Link to="/student/dashboard" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-teal-700 font-extrabold">
              Student Dashboard
            </Link>
          )}
          {user?.role === 'OFFICER' && (
            <Link to="/officer/dashboard" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-blue-700 font-extrabold">
              Officer Dashboard
            </Link>
          )}

          {user ? (
            <button
              onClick={handleLogout}
              className="w-full text-left py-2.5 text-red-600 font-extrabold border-t border-slate-200 mt-2"
            >
              Sign Out ({user.name})
            </button>
          ) : (
            <div className="pt-2 flex flex-col gap-2.5">
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 bg-teal-700 text-white font-extrabold rounded-xl shadow-sm"
              >
                Login to Portal
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
