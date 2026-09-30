import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { QuickDemoBar } from './components/QuickDemoBar';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { AssistantWidget } from './components/AssistantWidget';

// Pages
import { Home } from './pages/Home';
import { Schemes } from './pages/Schemes';
import { HowItWorksPage } from './pages/HowItWorksPage';
import { FAQPage } from './pages/FAQPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { Login, Register } from './pages/AuthPages';
import { StudentDashboard } from './pages/StudentDashboard';
import { ApplicationWizard } from './pages/ApplicationWizard';
import { ApplicationDetail } from './pages/ApplicationDetail';
import { DeficiencyView } from './pages/DeficiencyView';
import { DisbursementPage } from './pages/DisbursementPage';
import { OfficerDashboard } from './pages/OfficerDashboard';
import { AdminDashboard } from './pages/AdminDashboard';
import { AdminRulesManager } from './pages/AdminRulesManager';

// Protected Route Wrapper
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();
  if (loading) return <div className="p-12 text-center text-slate-500">Authenticating...</div>;
  if (!user) return <Navigate to="/login" replace />;
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export function AppContent() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-900 selection:bg-teal-500 selection:text-white">
      {/* Top Demo Account Bar for Judges & Presentation */}
      <QuickDemoBar />

      {/* Main Government Navbar */}
      <Navbar />

      {/* Main View Area */}
      <main className="flex-1">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/schemes" element={<Schemes />} />
          <Route path="/how-it-works" element={<HowItWorksPage />} />
          <Route path="/faqs" element={<FAQPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Student Portal Routes */}
          <Route
            path="/student/dashboard"
            element={
              <ProtectedRoute allowedRoles={['STUDENT']}>
                <StudentDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/apply"
            element={
              <ProtectedRoute allowedRoles={['STUDENT']}>
                <ApplicationWizard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/deficiency/:id"
            element={
              <ProtectedRoute allowedRoles={['STUDENT']}>
                <DeficiencyView />
              </ProtectedRoute>
            }
          />
          <Route
            path="/disbursement"
            element={
              <ProtectedRoute allowedRoles={['STUDENT']}>
                <DisbursementPage />
              </ProtectedRoute>
            }
          />

          {/* Shared Detail View Route */}
          <Route
            path="/application/:id"
            element={
              <ProtectedRoute allowedRoles={['STUDENT', 'OFFICER', 'ADMIN']}>
                <ApplicationDetail />
              </ProtectedRoute>
            }
          />

          {/* Officer Portal Route */}
          <Route
            path="/officer/dashboard"
            element={
              <ProtectedRoute allowedRoles={['OFFICER', 'ADMIN']}>
                <OfficerDashboard />
              </ProtectedRoute>
            }
          />

          {/* Admin Portal Routes */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute allowedRoles={['ADMIN']}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/rules"
            element={
              <ProtectedRoute allowedRoles={['ADMIN']}>
                <AdminRulesManager />
              </ProtectedRoute>
            }
          />

          {/* Fallback Catch-All */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Floating Groq AI Assistant Widget */}
      <AssistantWidget />

      {/* Government Footer */}
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}
