import React, { useState } from 'react';
import {
  X,
  Award,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  FileCheck2,
  PhoneCall,
  Sparkles,
  Building2,
  Info,
} from 'lucide-react';
import { Scheme } from '../../types';
import { useApp } from '../../context/AppContext';

interface ApplySchemeModalProps {
  scheme: Scheme | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ApplySchemeModal: React.FC<ApplySchemeModalProps> = ({
  scheme,
  isOpen,
  onClose,
}) => {
  const { farmerProfile } = useApp();

  // State to track farmer checked document items
  const [checkedDocs, setCheckedDocs] = useState<Record<string, boolean>>({});

  if (!isOpen || !scheme) return null;

  const toggleDoc = (doc: string) => {
    setCheckedDocs((prev) => ({ ...prev, [doc]: !prev[doc] }));
  };

  const allDocsChecked = scheme.documentsRequired.every((d) => checkedDocs[d]);

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-100 space-y-6 relative animate-in zoom-in-95 duration-150">
        
        {/* Modal Header */}
        <div className="flex items-start justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-900 flex items-center justify-center font-bold shrink-0">
              <Award className="w-6 h-6 text-amber-700" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black font-mono bg-amber-100 text-amber-900 px-2 py-0.5 rounded">
                  {scheme.code}
                </span>
                <span className="text-xs font-bold text-slate-500">
                  {scheme.category}
                </span>
              </div>
              <h3 className="text-xl font-black text-slate-900 tracking-tight mt-0.5">
                {scheme.name}
              </h3>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Financial Benefit Banner */}
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-bold uppercase text-emerald-800 block">
              Entitled Financial Benefit
            </span>
            <strong className="text-sm sm:text-base font-black text-emerald-950">
              {scheme.financialBenefit}
            </strong>
          </div>
          <span className="px-2.5 py-1 rounded-full bg-emerald-200 text-emerald-950 font-black text-[10px] shrink-0">
            Govt Funded
          </span>
        </div>

        {/* Active Profile Verification Summary */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-2">
          <span className="font-bold text-slate-800 block">
            Eligibility Match for {farmerProfile.fullName} ({farmerProfile.village}, {farmerProfile.district}):
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-600">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Landholding: <strong>{farmerProfile.landSizeAcres} Acres (Eligible)</strong></span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Aadhaar e-KYC: <strong>{farmerProfile.aadhaarLinked ? 'Verified Active' : 'Pending'}</strong></span>
            </div>
          </div>
        </div>

        {/* Interactive Document Checklist */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-slate-900">
              Step 1: Check Required Documents
            </h4>
            <span className="text-xs text-slate-500">Click each document you possess</span>
          </div>

          <div className="space-y-2">
            {scheme.documentsRequired.map((doc) => {
              const isChecked = !!checkedDocs[doc];
              return (
                <div
                  key={doc}
                  onClick={() => toggleDoc(doc)}
                  className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between text-xs ${
                    isChecked
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-900 font-bold'
                      : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`w-5 h-5 rounded-lg flex items-center justify-center border transition-colors ${
                        isChecked
                          ? 'bg-emerald-600 border-emerald-600 text-white'
                          : 'border-slate-300 bg-white'
                      }`}
                    >
                      {isChecked && <CheckCircle2 className="w-3.5 h-3.5" />}
                    </div>
                    <span>{doc}</span>
                  </div>
                  <span className="text-[10px] text-slate-400">
                    {isChecked ? 'Ready' : 'Click to Verify'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Application Process Steps */}
        <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs text-amber-950 space-y-1.5">
          <h5 className="font-bold flex items-center gap-1.5 text-amber-900">
            <Info className="w-4 h-4 text-amber-700" />
            <span>Step 2: Direct Portal Submission</span>
          </h5>
          <p className="text-[11px] text-amber-900/90 leading-relaxed">
            Applications are processed directly through the official Government portal ({scheme.officialPortalUrl}) or your nearest Common Service Center (CSC). No middlemen fees required.
          </p>
        </div>

        {/* Modal Actions */}
        <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <a
            href={`tel:${scheme.tollFreeHelpline.replace(/[^0-9]/g, '')}`}
            className="inline-flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold px-4 py-3 rounded-2xl transition-colors"
          >
            <PhoneCall className="w-4 h-4 text-emerald-600" />
            <span>Helpline: {scheme.tollFreeHelpline}</span>
          </a>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-2xl text-xs font-bold transition-colors"
            >
              Close
            </button>

            <a
              href={scheme.officialPortalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white font-extrabold text-xs rounded-2xl shadow-lg shadow-emerald-700/30 hover:scale-105 active:scale-95 transition-all"
            >
              <span>Apply on Official Portal</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ApplySchemeModal;
