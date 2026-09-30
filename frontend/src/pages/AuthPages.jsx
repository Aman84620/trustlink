import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Sparkles, 
  Lock, 
  Mail, 
  User, 
  Phone, 
  MapPin, 
  ShieldCheck, 
  ArrowRight, 
  AlertCircle, 
  CheckCircle2, 
  KeyRound 
} from 'lucide-react';

export const Login = () => {
  const { login, demoLogin } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const user = await login(email, password);
      if (user.role === 'STUDENT') navigate('/student/dashboard');
      else if (user.role === 'OFFICER') navigate('/officer/dashboard');
      else if (user.role === 'ADMIN') navigate('/admin/dashboard');
    } catch (err) {
      setError(err.message || 'Login failed. Check credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemo = async (role) => {
    try {
      const user = await demoLogin(role);
      if (user.role === 'STUDENT') navigate('/student/dashboard');
      else if (user.role === 'OFFICER') navigate('/officer/dashboard');
      else if (user.role === 'ADMIN') navigate('/admin/dashboard');
    } catch (err) {
      setError('Demo login failed');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 py-12 px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center relative overflow-hidden">
      <div className="w-full max-w-md bg-slate-950 border border-slate-800 rounded-2xl p-8 shadow-2xl relative z-10">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-teal-600 to-indigo-900 mx-auto flex items-center justify-center text-white mb-3 shadow-lg">
            <Sparkles className="w-6 h-6 text-teal-300" />
          </div>
          <h2 className="text-2xl font-extrabold text-white">TrustLink AI Portal</h2>
          <p className="text-xs text-slate-400 mt-1">Ministry of Tribal Affairs Account Login</p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-950/60 border border-red-800 text-red-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Demo Preset Buttons */}
        <div className="mb-6 p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
          <p className="text-[11px] font-bold uppercase tracking-wider text-teal-400 text-center">
            ⚡ Quick Demo Accounts (One-Click Login)
          </p>
          <div className="grid grid-cols-3 gap-1.5 text-xs">
            <button
              onClick={() => handleDemo('STUDENT')}
              className="px-2 py-2 rounded bg-slate-800 hover:bg-teal-900/60 hover:text-teal-200 text-slate-300 border border-slate-700 text-[11px] font-semibold transition-colors cursor-pointer"
            >
              👨‍🎓 Student Demo
            </button>
            <button
              onClick={() => handleDemo('OFFICER')}
              className="px-2 py-2 rounded bg-slate-800 hover:bg-blue-900/60 hover:text-blue-200 text-slate-300 border border-slate-700 text-[11px] font-semibold transition-colors cursor-pointer"
            >
              🛡️ Officer Demo
            </button>
            <button
              onClick={() => handleDemo('ADMIN')}
              className="px-2 py-2 rounded bg-slate-800 hover:bg-indigo-900/60 hover:text-indigo-200 text-slate-300 border border-slate-700 text-[11px] font-semibold transition-colors cursor-pointer"
            >
              👑 Admin Demo
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address / User ID</label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="student@trustlink.demo"
                className="w-full pl-9 pr-3 py-2.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Password / Pin</label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-2.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500"
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="rounded bg-slate-900 border-slate-700 text-teal-600 focus:ring-0" />
              <span>Remember me</span>
            </label>
            <button type="button" onClick={() => setShowOTP(true)} className="text-teal-400 hover:underline font-medium">
              Forgot Password / OTP
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs rounded-lg shadow-lg transition-colors flex items-center justify-center gap-2"
          >
            <span>Sign In to Portal</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-slate-400">
          New Scheduled Tribe Student?{' '}
          <Link to="/register" className="text-teal-400 font-bold hover:underline">
            Register New Account
          </Link>
        </div>
      </div>

      {/* OTP Modal Simulation */}
      {showOTP && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-sm w-full text-white text-center space-y-4">
            <div className="w-10 h-10 rounded-full bg-teal-600/20 text-teal-400 mx-auto flex items-center justify-center">
              <KeyRound className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base">OTP Security Verification</h3>
            <p className="text-xs text-slate-400">
              Enter the 6-digit OTP sent to your registered mobile number (+91 98*** **210)
            </p>

            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <input
                  key={i}
                  type="text"
                  maxLength={1}
                  defaultValue={i}
                  className="w-9 h-10 bg-slate-800 border border-slate-700 text-center rounded-lg text-sm font-bold text-teal-400"
                />
              ))}
            </div>

            <button
              onClick={() => { setShowOTP(false); handleDemo('STUDENT'); }}
              className="w-full py-2.5 bg-teal-600 text-white font-bold text-xs rounded-lg"
            >
              Verify OTP & Sign In
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    caste: 'Munda (Scheduled Tribe)',
    state: 'Jharkhand',
    district: 'Ranchi',
    aadhaarNumber: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register({ ...formData, role: 'STUDENT' });
      navigate('/student/dashboard');
    } catch (err) {
      setError(err.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 py-12 px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center">
      <div className="w-full max-w-lg bg-slate-950 border border-slate-800 rounded-2xl p-8 shadow-2xl">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-extrabold text-white">Student Registration</h2>
          <p className="text-xs text-slate-400 mt-1">Ministry of Tribal Affairs ST Scholarship System</p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-950/60 border border-red-800 text-red-300 text-xs">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Full Candidate Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Rahul Kumar"
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="student@domain.com"
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Mobile Number</label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+91 98765 43210"
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Aadhaar Number</label>
              <input
                type="text"
                required
                value={formData.aadhaarNumber}
                onChange={(e) => setFormData({ ...formData, aadhaarNumber: e.target.value })}
                placeholder="12-Digit Aadhaar"
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">ST Tribe / Community</label>
              <input
                type="text"
                required
                value={formData.caste}
                onChange={(e) => setFormData({ ...formData, caste: e.target.value })}
                placeholder="e.g. Munda / Oraon / Santhal"
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-teal-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Domicile State</label>
              <select
                value={formData.state}
                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-teal-500"
              >
                <option value="Jharkhand">Jharkhand</option>
                <option value="Odisha">Odisha</option>
                <option value="Chhattisgarh">Chhattisgarh</option>
                <option value="Madhya Pradesh">Madhya Pradesh</option>
                <option value="Assam">Assam</option>
                <option value="West Bengal">West Bengal</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Password</label>
            <input
              type="password"
              required
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="At least 6 characters"
              className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs rounded-lg shadow-lg transition-colors"
          >
            Create Student Account
          </button>
        </form>
      </div>
    </div>
  );
};
