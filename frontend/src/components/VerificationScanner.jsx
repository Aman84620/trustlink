import React, { useState, useEffect } from 'react';
import { 
  Scan, 
  FileCheck, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  Sparkles, 
  Upload, 
  Eye, 
  ShieldAlert 
} from 'lucide-react';

export const VerificationScanner = ({ 
  documentData, 
  onResolveDeficiency, 
  isAutoStart = true 
}) => {
  const [step, setStep] = useState(isAutoStart ? 0 : 5);
  const [isScanning, setIsScanning] = useState(isAutoStart);

  const steps = [
    'Scanning document OCR...',
    'Extracting information...',
    'Checking document quality...',
    'Comparing applicant information...',
    'Running scheme eligibility rules...',
    'Verification completed.'
  ];

  useEffect(() => {
    if (!isAutoStart) return;
    setIsScanning(true);
    setStep(0);

    const interval = setInterval(() => {
      setStep(prev => {
        if (prev < steps.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          setIsScanning(false);
          return prev;
        }
      });
    }, 800);

    return () => clearInterval(interval);
  }, [documentData, isAutoStart]);

  const doc = documentData || {
    type: 'INCOME_CERT',
    name: 'Income_Certificate_Rahul.pdf',
    verificationStatus: 'VERIFIED',
    confidenceScore: 97,
    extractedFields: {
      'Name': { value: 'Rahul Kumar', confidence: 98 },
      'Certificate Number': { value: 'INC-2026-23981', confidence: 94 },
      'Annual Income': { value: '₹1,80,000', confidence: 97 },
      'Issue Date': { value: '14/08/2026', confidence: 96 }
    }
  };

  const isDeficient = doc.verificationStatus === 'DEFICIENT' || doc.isExpired;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 text-white shadow-xl relative overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-teal-500/20 border border-teal-500/30 text-teal-400">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-slate-100">AI Document Verification</h3>
            <p className="text-xs text-slate-400 font-mono truncate max-w-xs">{doc.name}</p>
          </div>
        </div>

        <div>
          {isScanning ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 text-xs font-semibold animate-pulse">
              <Scan className="w-3.5 h-3.5 animate-spin" /> Scanning...
            </span>
          ) : isDeficient ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold">
              <AlertTriangle className="w-3.5 h-3.5" /> Action Required
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold">
              <CheckCircle2 className="w-3.5 h-3.5" /> Verified ({doc.confidenceScore || 97}%)
            </span>
          )}
        </div>
      </div>

      {/* Scanning Stage Progress Bar */}
      {isScanning && (
        <div className="py-4 relative">
          <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden mb-2">
            <div 
              className="h-full bg-gradient-to-r from-teal-500 to-emerald-400 transition-all duration-500" 
              style={{ width: `${((step + 1) / steps.length) * 100}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
            <span className="text-teal-400 font-semibold">{steps[step]}</span>
            <span>{Math.round(((step + 1) / steps.length) * 100)}%</span>
          </div>
          <div className="animate-scan" />
        </div>
      )}

      {/* Extracted Fields Breakdown */}
      {!isScanning && (
        <div className="mt-4 space-y-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Extracted Fields & OCR Confidence Scores:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            {Object.entries(doc.extractedFields || {}).map(([key, data]) => {
              const val = typeof data === 'object' ? data.value : data;
              const conf = typeof data === 'object' ? data.confidence : 95;

              return (
                <div key={key} className="p-2.5 rounded-lg bg-slate-800/80 border border-slate-700/60 flex items-center justify-between">
                  <div>
                    <span className="text-slate-400 block text-[11px] font-medium">{key}</span>
                    <span className="font-semibold text-slate-100">{val}</span>
                  </div>
                  <div className="text-right">
                    <span className={`font-mono font-bold ${conf >= 90 ? 'text-emerald-400' : 'text-amber-400'}`}>
                      {conf}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Verification Result Banner */}
          {isDeficient ? (
            <div className="mt-4 p-3.5 rounded-lg bg-amber-950/40 border border-amber-800/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-start gap-2.5">
                <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-xs text-amber-200">Verification Result: Action Required</h4>
                  <p className="text-xs text-amber-300/80 mt-0.5">
                    {doc.deficiencyReason || doc.issueReason || 'Income Certificate is expired. Current fiscal year document required.'}
                  </p>
                </div>
              </div>

              {onResolveDeficiency && (
                <button
                  onClick={onResolveDeficiency}
                  className="px-3.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-colors shrink-0 shadow-sm"
                >
                  <Upload className="w-3.5 h-3.5" /> Upload New Document
                </button>
              )}
            </div>
          ) : (
            <div className="mt-4 p-3 rounded-lg bg-emerald-950/40 border border-emerald-800/50 flex items-center gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <div>
                <h4 className="font-bold text-xs text-emerald-200">Verification Result: Verified</h4>
                <p className="text-xs text-emerald-300/80">
                  Document passed authenticity checks and rules match.
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
