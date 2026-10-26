import React, { useState } from 'react';
import {
  X,
  ShieldCheck,
  Lock,
  UserCheck,
  AlertTriangle,
  FileText,
  Paperclip,
  CheckCircle,
  Copy,
  Printer,
  ArrowRight,
  ArrowLeft,
  LogOut,
  ExternalLink,
} from 'lucide-react';
import { ConcernCategory, ConcernSeverity, ConcernCase } from '../types/concern';
import { addConcernCase } from '../data/storage';

interface SubmitConcernModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCategory?: ConcernCategory;
  initialAnonymous?: boolean;
  onCaseCreated: (createdCase: ConcernCase) => void;
}

export const SubmitConcernModal: React.FC<SubmitConcernModalProps> = ({
  isOpen,
  onClose,
  initialCategory = 'Patient & Clinical Safety',
  initialAnonymous = true,
  onCaseCreated,
}) => {
  const [step, setStep] = useState<number>(1);
  const [isAnonymous, setIsAnonymous] = useState<boolean>(initialAnonymous);
  const [category, setCategory] = useState<ConcernCategory>(initialCategory);
  const [severity, setSeverity] = useState<ConcernSeverity>('Moderate');
  const [department, setDepartment] = useState<string>('Emergency & Trauma');
  const [location, setLocation] = useState<string>('');
  const [incidentDate, setIncidentDate] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [witnesses, setWitnesses] = useState<string>('');
  const [evidenceNotes, setEvidenceNotes] = useState<string>('');
  const [desiredOutcome, setDesiredOutcome] = useState<string>('');

  // Confidential fields if not anonymous
  const [reporterName, setReporterName] = useState<string>('');
  const [reporterEmail, setReporterEmail] = useState<string>('');
  const [reporterRole, setReporterRole] = useState<string>('');

  // Post-submission state
  const [submittedCase, setSubmittedCase] = useState<ConcernCase | null>(null);
  const [copiedToken, setCopiedToken] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleQuickExit = () => {
    window.location.replace('https://www.google.com');
  };

  const handleNext = () => {
    if (step === 2 && !title.trim()) {
      alert('Please enter a brief summary title for the concern.');
      return;
    }
    if (step === 3 && !description.trim()) {
      alert('Please provide details in the concern description.');
      return;
    }
    setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const created = addConcernCase({
        title: title.trim() || `${category} Concern in ${department}`,
        category,
        severity,
        department,
        location: location.trim() || 'Unspecified unit location',
        isAnonymous,
        reporterName: isAnonymous ? undefined : reporterName,
        reporterEmail: isAnonymous ? undefined : reporterEmail,
        reporterRole: isAnonymous ? undefined : reporterRole,
        description: description.trim(),
        incidentDate: incidentDate || undefined,
        witnessesOrInvolved: witnesses.trim() || undefined,
        evidenceNotes: evidenceNotes.trim() || undefined,
        desiredOutcome: desiredOutcome.trim() || undefined,
      });

      setSubmittedCase(created);
      setIsSubmitting(false);
      setStep(5); // Confirmation screen
      onCaseCreated(created);
    }, 600);
  };

  const handleCopyToken = () => {
    if (submittedCase) {
      navigator.clipboard.writeText(submittedCase.trackingToken);
      setCopiedToken(true);
      setTimeout(() => setCopiedToken(false), 2500);
    }
  };

  const handlePrintReceipt = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xl w-full max-w-2xl my-8 overflow-hidden flex flex-col">
        {/* Top Header bar */}
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50/70 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-sky-900" />
            <div>
              <h3 className="text-base font-bold text-slate-900">
                EMC Voice · Safe Concern Intake
              </h3>
              <p className="text-xs text-slate-500">
                Independent, confidential, zero-retaliation channel
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleQuickExit}
              className="text-xs text-slate-500 hover:text-rose-600 px-2 py-1 rounded transition-colors cursor-pointer flex items-center gap-1"
              title="Leave this page immediately"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Quick Exit</span>
            </button>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Step Indicator (Steps 1-4) */}
        {step < 5 && (
          <div className="px-6 py-3 bg-white border-b border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Step {step} of 4</span>
            <div className="flex items-center gap-1.5">
              {[1, 2, 3, 4].map((s) => (
                <div
                  key={s}
                  className={`h-1.5 rounded-full transition-all ${
                    s === step
                      ? 'w-6 bg-sky-900'
                      : s < step
                      ? 'w-3 bg-sky-600'
                      : 'w-3 bg-slate-200'
                  }`}
                />
              ))}
            </div>
          </div>
        )}

        {/* Content Body */}
        <div className="p-6 sm:p-8 flex-1 overflow-y-auto">
          {/* STEP 1: Privacy Choice */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-bold text-slate-900">
                  How would you prefer to submit this concern?
                </h4>
                <p className="text-xs text-slate-600 mt-1">
                  You retain full control over your privacy. Both paths are protected by our Zero-Retaliation Charter.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {/* 100% Anonymous Option */}
                <div
                  onClick={() => setIsAnonymous(true)}
                  className={`p-5 rounded-xl border transition-all cursor-pointer ${
                    isAnonymous
                      ? 'border-sky-900 bg-sky-50/50 ring-1 ring-sky-900'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-sky-900 text-white mt-0.5">
                      <Lock className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-slate-900">
                          100% Anonymous (Recommended)
                        </span>
                        {isAnonymous && (
                          <span className="text-xs font-semibold text-sky-900">
                            Selected
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                        No name, email, IP address, or device logs are stored. You will receive a unique cryptographic tracking key to view responses and communicate safely.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Confidential Liaison Option */}
                <div
                  onClick={() => setIsAnonymous(false)}
                  className={`p-5 rounded-xl border transition-all cursor-pointer ${
                    !isAnonymous
                      ? 'border-sky-900 bg-sky-50/50 ring-1 ring-sky-900'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-slate-800 text-white mt-0.5">
                      <UserCheck className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-slate-900">
                          Confidential with Direct Ombuds Liaison
                        </span>
                        {!isAnonymous && (
                          <span className="text-xs font-semibold text-sky-900">
                            Selected
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                        Only the designated independent ethics ombudsman sees your identity. Your details are strictly shielded from your unit manager, scheduler, and colleagues.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Confidential contact fields if selected */}
              {!isAnonymous && (
                <div className="pt-4 border-t border-slate-100 space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Your Full Name
                      </label>
                      <input
                        type="text"
                        value={reporterName}
                        onChange={(e) => setReporterName(e.target.value)}
                        placeholder="e.g. Jordan Mitchell"
                        className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-sky-900"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Confidential Email (for Ombuds updates)
                      </label>
                      <input
                        type="email"
                        value={reporterEmail}
                        onChange={(e) => setReporterEmail(e.target.value)}
                        placeholder="jordan.m@organization.org"
                        className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-sky-900"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Role / Position (Optional)
                    </label>
                    <input
                      type="text"
                      value={reporterRole}
                      onChange={(e) => setReporterRole(e.target.value)}
                      placeholder="e.g. Clinical Staff, Resident, Staff Nurse, Technician"
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-sky-900"
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* STEP 2: Category, Urgency, Title */}
          {step === 2 && (
            <div className="space-y-5">
              <div>
                <h4 className="text-lg font-bold text-slate-900">
                  Categorize the Concern
                </h4>
                <p className="text-xs text-slate-600 mt-0.5">
                  Helps route your report to the appropriate specialized independent reviewer.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Concern Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as ConcernCategory)}
                  className="w-full px-3.5 py-2.5 text-xs border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-sky-900"
                >
                  <option value="Patient & Clinical Safety">Patient & Clinical Safety</option>
                  <option value="Workplace Respect & Dignity">Workplace Respect & Dignity (Harassment, Bias)</option>
                  <option value="Ethics, Fraud & Compliance">Ethics, Fraud & Compliance</option>
                  <option value="Mental Health & Staff Well-being">Mental Health & Staff Well-being</option>
                  <option value="Facility, Environmental & Physical Safety">Facility, Environmental & Physical Safety</option>
                  <option value="Policy & Process Improvement">Policy & Process Improvement</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Urgency / Risk Level
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'Routine', label: 'Routine', sub: 'Non-urgent suggestion' },
                    { id: 'Moderate', label: 'Moderate', sub: 'Impacting work climate' },
                    { id: 'Urgent', label: 'Urgent', sub: 'Safety or integrity risk' },
                    { id: 'Immediate Safety Risk', label: 'Immediate Risk', sub: 'Urgent clinical harm' },
                  ].map((lvl) => (
                    <button
                      type="button"
                      key={lvl.id}
                      onClick={() => setSeverity(lvl.id as ConcernSeverity)}
                      className={`p-2.5 rounded-lg border text-left cursor-pointer transition-all ${
                        severity === lvl.id
                          ? 'border-sky-900 bg-sky-50/50 text-slate-900 font-semibold'
                          : 'border-slate-200 text-slate-600 hover:border-slate-300'
                      }`}
                    >
                      <div className="text-xs font-semibold">{lvl.label}</div>
                      <div className="text-[10px] text-slate-500 mt-0.5 leading-tight">{lvl.sub}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Brief Summary / Title <span className="text-rose-600">*</span>
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Defective IV medication scanner causing near-misses on 3rd floor"
                  className="w-full px-3.5 py-2.5 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-sky-900"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Department / Division
                  </label>
                  <input
                    type="text"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    placeholder="e.g. Pediatric ICU, Surgical Sterile, Pharmacy"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-sky-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Specific Location (Floor/Room)
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Tower B, Station 4, Stairwell 2"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-sky-900"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Concern Narrative & Context */}
          {step === 3 && (
            <div className="space-y-4">
              <div>
                <h4 className="text-lg font-bold text-slate-900">
                  Concern Details & Narrative
                </h4>
                <p className="text-xs text-slate-600 mt-0.5">
                  Please describe what occurred as objectively as possible.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  What happened? Describe the incident or condition <span className="text-rose-600">*</span>
                </label>
                <textarea
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Detail the facts, sequences, equipment involved, or behavior observed. (Do not include personal names if you wish to remain strictly unidentifiable)."
                  className="w-full px-3.5 py-2.5 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-sky-900"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Approximate Date / Time
                  </label>
                  <input
                    type="date"
                    value={incidentDate}
                    onChange={(e) => setIncidentDate(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-sky-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Who was present / involved?
                  </label>
                  <input
                    type="text"
                    value={witnesses}
                    onChange={(e) => setWitnesses(e.target.value)}
                    placeholder="e.g. Evening shift team, unit charge nurse"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-sky-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  What constructive outcome or remedy would safely resolve this?
                </label>
                <textarea
                  rows={2}
                  value={desiredOutcome}
                  onChange={(e) => setDesiredOutcome(e.target.value)}
                  placeholder="e.g. Recalibrate barcode scanners, provide independent schedule mediation, open trauma debrief session..."
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-sky-900"
                />
              </div>
            </div>
          )}

          {/* STEP 4: Evidence & Review */}
          {step === 4 && (
            <div className="space-y-5">
              <div>
                <h4 className="text-lg font-bold text-slate-900">
                  Supporting Notes & Final Review
                </h4>
                <p className="text-xs text-slate-600 mt-0.5">
                  Confirm your submission details before registering under the safe shield.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Supporting Evidence, Logs, or Document References
                </label>
                <textarea
                  rows={3}
                  value={evidenceNotes}
                  onChange={(e) => setEvidenceNotes(e.target.value)}
                  placeholder="Mention ticket numbers, schedule dates, equipment serials, or relevant email dates if helpful."
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-sky-900"
                />
              </div>

              {/* Review summary box */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2">
                <div className="font-bold text-slate-900 mb-1 flex items-center justify-between">
                  <span>Submission Summary</span>
                  <span className="text-sky-900 font-semibold">
                    {isAnonymous ? '100% Anonymous' : 'Confidential Liaison'}
                  </span>
                </div>
                <div className="text-slate-600">
                  <span className="font-semibold text-slate-700">Category:</span> {category}
                </div>
                <div className="text-slate-600">
                  <span className="font-semibold text-slate-700">Urgency:</span> {severity}
                </div>
                <div className="text-slate-600">
                  <span className="font-semibold text-slate-700">Department:</span> {department} {location && `(${location})`}
                </div>
                <div className="text-slate-600">
                  <span className="font-semibold text-slate-700">Title:</span> {title}
                </div>
              </div>

              <div className="p-3.5 rounded-lg bg-emerald-50/70 border border-emerald-200 text-emerald-900 text-xs flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <span>
                  By submitting, your concern is protected by the EMC Non-Retaliation Policy. You will receive an encrypted case token to follow up anonymously.
                </span>
              </div>
            </div>
          )}

          {/* STEP 5: Confirmation & Token */}
          {step === 5 && submittedCase && (
            <div className="space-y-6 text-center py-2">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto shadow-xs">
                <CheckCircle className="w-8 h-8" />
              </div>

              <div>
                <h4 className="text-xl font-bold text-slate-900">
                  Concern Safely Registered
                </h4>
                <p className="text-xs text-slate-600 mt-1 max-w-md mx-auto">
                  Your voice has been safely received under full identity protection. Please store your confidential tracking key below.
                </p>
              </div>

              {/* Key Box */}
              <div className="p-5 rounded-2xl bg-sky-50 border border-sky-200/90 max-w-md mx-auto">
                <div className="text-xs text-sky-900 font-medium">Your Confidential Tracking Key</div>
                <div className="text-2xl font-mono font-extrabold text-sky-950 mt-1 tracking-wider tabular-nums">
                  {submittedCase.trackingToken}
                </div>
                <div className="mt-3 flex items-center justify-center gap-2">
                  <button
                    onClick={handleCopyToken}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-sky-900 bg-white border border-sky-200 rounded-md hover:bg-sky-100/50 transition-colors cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{copiedToken ? 'Copied to Clipboard!' : 'Copy Tracking Key'}</span>
                  </button>
                  <button
                    onClick={handlePrintReceipt}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-md hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print Receipt</span>
                  </button>
                </div>
              </div>

              <div className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
                <p>
                  Keep this key in a secure location. You can paste it into the <strong>Track Existing Case</strong> tab anytime to view ombudsperson notes and reply anonymously.
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-center gap-3">
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 text-xs font-semibold text-white bg-sky-900 hover:bg-sky-800 rounded-lg shadow-xs transition-colors cursor-pointer"
                >
                  Done & Close Window
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer actions for Steps 1-4 */}
        {step < 5 && (
          <div className="px-6 py-4 border-t border-slate-200 bg-slate-50/70 flex items-center justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={handleBack}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 rounded-lg transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
            ) : (
              <div />
            )}

            {step < 4 ? (
              <button
                type="button"
                onClick={handleNext}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 text-xs font-semibold text-white bg-sky-900 hover:bg-sky-800 rounded-lg shadow-xs transition-colors cursor-pointer"
              >
                <span>Continue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                type="button"
                disabled={isSubmitting}
                onClick={handleSubmit}
                className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-semibold text-white bg-sky-900 hover:bg-sky-800 active:bg-sky-950 rounded-lg shadow-xs transition-colors cursor-pointer disabled:opacity-50"
              >
                <ShieldCheck className="w-4 h-4 text-sky-200" />
                <span>{isSubmitting ? 'Registering Encrypted Case...' : 'Submit Protected Concern'}</span>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
