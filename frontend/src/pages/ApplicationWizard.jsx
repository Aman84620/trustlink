import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { VerificationScanner } from '../components/VerificationScanner';
import { 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  Upload, 
  FileText, 
  AlertCircle, 
  ShieldCheck, 
  Info 
} from 'lucide-react';

export const ApplicationWizard = () => {
  const { user, token } = useAuth();
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(1);
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Form State
  const [personalInfo, setPersonalInfo] = useState({
    name: user?.name || 'Rahul Kumar',
    fatherName: 'Mangal Kumar',
    dob: '2004-05-14',
    gender: 'Male',
    phone: user?.phone || '+91 98765 43210',
    caste: user?.caste || 'Munda (Scheduled Tribe)',
    state: user?.state || 'Jharkhand',
    district: user?.district || 'Ranchi',
    aadhaarNumber: user?.aadhaarNumber || 'XXXX-XXXX-8912',
    annualIncome: 180000
  });

  const [academicInfo, setAcademicInfo] = useState({
    institution: 'Ranchi University, Jharkhand',
    course: 'Bachelor of Technology (Computer Science)',
    academicYear: '2nd Year',
    rollNumber: '2024-CSE-091',
    previousPercentage: 78.5
  });

  const [selectedSchemeId, setSelectedSchemeId] = useState('SCH-002');
  const [simulateExpiredDoc, setSimulateExpiredDoc] = useState(false);

  const [uploadedDocuments, setUploadedDocuments] = useState([
    { type: 'CASTE_CERT', name: 'ST_Caste_Certificate_Munda.pdf', isExpired: false },
    { type: 'INCOME_CERT', name: 'Income_Certificate_Current.pdf', isExpired: false },
    { type: 'MARKSHEET', name: 'Class_XII_Marksheet.pdf', isExpired: false },
    { type: 'FEE_RECEIPT', name: 'Admission_Fee_Receipt_2026.pdf', isExpired: false }
  ]);

  useEffect(() => {
    fetch('/api/schemes')
      .then(res => res.json())
      .then(data => {
        setSchemes(Array.isArray(data) ? data : []);
      })
      .catch(err => console.error(err));
  }, []);

  const selectedScheme = schemes.find(s => s.id === selectedSchemeId) || schemes[0] || {
    name: 'Post-Matric Scholarship for ST Students',
    maxAnnualIncome: 250000
  };

  const handleNext = () => {
    if (currentStep < 7) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
      window.scrollTo(0, 0);
    }
  };

  const toggleExpiredDoc = (checked) => {
    setSimulateExpiredDoc(checked);
    setUploadedDocuments(prev => prev.map(d => {
      if (d.type === 'INCOME_CERT') {
        return {
          ...d,
          name: checked ? 'Income_Certificate_2024_Expired.pdf' : 'Income_Certificate_Current.pdf',
          isExpired: checked
        };
      }
      return d;
    }));
  };

  const handleSubmitApplication = async () => {
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          schemeId: selectedSchemeId,
          personalInfo,
          academicInfo,
          uploadedDocuments
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Submission failed');

      navigate('/student/dashboard');
    } catch (err) {
      setError(err.message || 'Failed to submit application');
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    'Personal Info',
    'Academic Details',
    'Select Scheme',
    'Eligibility',
    'Document Scan',
    'Review Application',
    'Submit'
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Progress Stepper Header */}
        <div className="bg-slate-900 rounded-2xl p-6 text-white shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-xs font-semibold text-teal-400 uppercase tracking-wider">
                Multi-Step Scholarship Wizard
              </span>
              <h2 className="text-xl font-extrabold text-white">Step {currentStep} of 7: {steps[currentStep - 1]}</h2>
            </div>
            <span className="text-xs font-mono px-3 py-1 bg-slate-800 rounded-full text-slate-300">
              {Math.round((currentStep / 7) * 100)}% Completed
            </span>
          </div>

          <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-teal-500 to-emerald-400 transition-all duration-300"
              style={{ width: `${(currentStep / 7) * 100}%` }}
            />
          </div>

          <div className="mt-4 hidden sm:grid grid-cols-7 gap-1 text-[10px] text-center text-slate-400 font-medium">
            {steps.map((name, idx) => (
              <span
                key={idx}
                className={idx + 1 === currentStep ? 'text-teal-300 font-bold' : idx + 1 < currentStep ? 'text-emerald-400 font-semibold' : ''}
              >
                {idx + 1}. {name}
              </span>
            ))}
          </div>
        </div>

        {error && (
          <div className="p-4 rounded-xl bg-red-950/60 border border-red-800 text-red-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Wizard Form Container */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs">
          {/* STEP 1: Personal Information */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-slate-900 pb-2 border-b border-slate-100">Step 1: Personal Information</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Full Candidate Name</label>
                  <input
                    type="text"
                    value={personalInfo.name}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, name: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-teal-600"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Father's Name</label>
                  <input
                    type="text"
                    value={personalInfo.fatherName}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, fatherName: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-teal-600"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Date of Birth</label>
                  <input
                    type="date"
                    value={personalInfo.dob}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, dob: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-teal-600"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">ST Tribe / Community</label>
                  <input
                    type="text"
                    value={personalInfo.caste}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, caste: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-teal-600"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Annual Family Income (₹)</label>
                  <input
                    type="number"
                    value={personalInfo.annualIncome}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, annualIncome: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-teal-600 font-mono"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">State & District</label>
                  <input
                    type="text"
                    value={`${personalInfo.district}, ${personalInfo.state}`}
                    readOnly
                    className="w-full px-3 py-2 bg-slate-100 border border-slate-300 rounded-lg text-slate-700"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Academic Information */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-slate-900 pb-2 border-b border-slate-100">Step 2: Academic Details</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Current Educational Institution</label>
                  <input
                    type="text"
                    value={academicInfo.institution}
                    onChange={(e) => setAcademicInfo({ ...academicInfo, institution: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-teal-600"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Course Name</label>
                  <input
                    type="text"
                    value={academicInfo.course}
                    onChange={(e) => setAcademicInfo({ ...academicInfo, course: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-teal-600"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Academic Roll / Enrollment No</label>
                  <input
                    type="text"
                    value={academicInfo.rollNumber}
                    onChange={(e) => setAcademicInfo({ ...academicInfo, rollNumber: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-teal-600"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Previous Qualifying Exam Percentage (%)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={academicInfo.previousPercentage}
                    onChange={(e) => setAcademicInfo({ ...academicInfo, previousPercentage: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-teal-600 font-mono"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Select Scheme */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-slate-900 pb-2 border-b border-slate-100">Step 3: Select Scholarship Scheme</h3>
              <div className="space-y-3">
                {schemes.map((scheme) => (
                  <label
                    key={scheme.id}
                    onClick={() => setSelectedSchemeId(scheme.id)}
                    className={`block p-4 rounded-xl border cursor-pointer transition-all ${
                      selectedSchemeId === scheme.id
                        ? 'bg-teal-50/70 border-teal-600 ring-2 ring-teal-600/30'
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-xs font-bold text-teal-800 uppercase tracking-wide">{scheme.category}</span>
                        <h4 className="font-bold text-slate-900 text-sm">{scheme.name}</h4>
                        <p className="text-xs text-slate-600 mt-1">{scheme.description}</p>
                      </div>
                      <span className="font-mono text-xs font-semibold px-2 py-1 bg-slate-100 rounded text-slate-700 shrink-0">
                        Max ₹{scheme.maxAnnualIncome?.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* STEP 4: Eligibility Questions */}
          {currentStep === 4 && (
            <div className="space-y-4 text-xs">
              <h3 className="text-lg font-bold text-slate-900 pb-2 border-b border-slate-100">Step 4: Configurable Eligibility Rules Check</h3>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-700">Scheme Income Limit</span>
                  <span className="font-mono font-bold text-slate-900">≤ ₹{selectedScheme.maxAnnualIncome?.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-700">Your Annual Income</span>
                  <span className="font-mono font-bold text-teal-700">₹{personalInfo.annualIncome?.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-700">Category Mandate</span>
                  <span className="font-bold text-emerald-700">Scheduled Tribe (ST) Verified</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-700">Academic Score Match</span>
                  <span className="font-mono font-bold text-emerald-700">{academicInfo.previousPercentage}% (Meets cutoff)</span>
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: Document Upload & Live AI Scanner */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Step 5: AI Document OCR Verification Scanner</h3>
                <p className="text-xs text-slate-500">Upload your documents or toggle the deficiency simulation for testing.</p>
              </div>

              {/* Demo Toggle for Testing Deficiency Workflow */}
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Info className="w-5 h-5 text-amber-600" />
                  <div>
                    <span className="font-bold text-xs text-amber-900 block">Simulate Expired Document (Deficiency Demo)</span>
                    <span className="text-[11px] text-amber-800">
                      Check this box to test the AI deficiency detection and student resolution workflow!
                    </span>
                  </div>
                </div>

                <input
                  type="checkbox"
                  checked={simulateExpiredDoc}
                  onChange={(e) => toggleExpiredDoc(e.target.checked)}
                  className="w-5 h-5 text-teal-600 rounded focus:ring-0 cursor-pointer"
                />
              </div>

              {/* Live AI Scanner Component Demo */}
              <VerificationScanner
                documentData={{
                  type: 'INCOME_CERT',
                  name: simulateExpiredDoc ? 'Income_Certificate_2024_Expired.pdf' : 'Income_Certificate_Current.pdf',
                  verificationStatus: simulateExpiredDoc ? 'DEFICIENT' : 'VERIFIED',
                  confidenceScore: 97,
                  isExpired: simulateExpiredDoc,
                  issueReason: simulateExpiredDoc ? 'Income Certificate is expired (Issued 14/08/2024). Current fiscal year certificate required.' : null,
                  extractedFields: {
                    'Applicant Name': { value: personalInfo.name, confidence: 98 },
                    'Certificate Number': { value: 'INC-2026-23981', confidence: 94 },
                    'Annual Income': { value: `₹${personalInfo.annualIncome.toLocaleString('en-IN')}`, confidence: 97 },
                    'Issue Date': { value: simulateExpiredDoc ? '14/08/2024' : '15/04/2026', confidence: 96 }
                  }
                }}
              />
            </div>
          )}

          {/* STEP 6: Review Application */}
          {currentStep === 6 && (
            <div className="space-y-4 text-xs">
              <h3 className="text-lg font-bold text-slate-900 pb-2 border-b border-slate-100">Step 6: Review Application Summary</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <h4 className="font-bold text-slate-900">Personal Details</h4>
                  <p><strong>Name:</strong> {personalInfo.name}</p>
                  <p><strong>Caste:</strong> {personalInfo.caste}</p>
                  <p><strong>Annual Income:</strong> ₹{personalInfo.annualIncome.toLocaleString('en-IN')}</p>
                  <p><strong>State:</strong> {personalInfo.state}</p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <h4 className="font-bold text-slate-900">Academic Details</h4>
                  <p><strong>Scheme:</strong> {selectedScheme.name}</p>
                  <p><strong>Institution:</strong> {academicInfo.institution}</p>
                  <p><strong>Course:</strong> {academicInfo.course}</p>
                  <p><strong>Percentage:</strong> {academicInfo.previousPercentage}%</p>
                </div>
              </div>
            </div>
          )}

          {/* STEP 7: Submit Application */}
          {currentStep === 7 && (
            <div className="py-6 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-teal-100 text-teal-700 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-extrabold text-slate-900">Ready to Submit Application</h3>
              <p className="text-xs text-slate-600 max-w-md mx-auto">
                Your application will be processed by the TrustLink AI rules engine and queued for official verification.
              </p>

              <button
                onClick={handleSubmitApplication}
                disabled={loading}
                className="px-8 py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl shadow-lg transition-colors"
              >
                {loading ? 'Submitting Application...' : 'Confirm & Submit Application'}
              </button>
            </div>
          )}

          {/* Wizard Prev / Next Controls */}
          {currentStep < 7 && (
            <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={handlePrev}
                disabled={currentStep === 1}
                className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 font-semibold text-xs disabled:opacity-40 flex items-center gap-1 hover:bg-slate-50"
              >
                <ArrowLeft className="w-4 h-4" /> Previous
              </button>

              <button
                onClick={handleNext}
                className="px-6 py-2 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-lg shadow-sm flex items-center gap-1 transition-colors"
              >
                <span>Next Step</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
