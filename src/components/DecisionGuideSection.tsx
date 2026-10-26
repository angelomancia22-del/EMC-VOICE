import React, { useState } from 'react';
import { HelpCircle, Check, ArrowRight, ShieldCheck, HeartHandshake, RefreshCw } from 'lucide-react';
import { ConcernCategory } from '../types/concern';

interface DecisionGuideSectionProps {
  onStartReportWithCategory: (category: ConcernCategory, recommendedAnonymous: boolean) => void;
}

export const DecisionGuideSection: React.FC<DecisionGuideSectionProps> = ({
  onStartReportWithCategory,
}) => {
  const [step, setStep] = useState<number>(1);
  const [answers, setAnswers] = useState<{
    impact?: string;
    nature?: string;
    addressed?: string;
  }>({});

  const handleSelect = (key: 'impact' | 'nature' | 'addressed', val: string) => {
    const updated = { ...answers, [key]: val };
    setAnswers(updated);
    if (step < 3) {
      setStep(step + 1);
    } else {
      setStep(4); // Result step
    }
  };

  const handleReset = () => {
    setAnswers({});
    setStep(1);
  };

  // Determine recommendation based on answers
  const getRecommendation = () => {
    const nature = answers.nature || '';
    const impact = answers.impact || '';

    let category: ConcernCategory = 'Patient & Clinical Safety';
    let urgency = 'Routine';
    let anonRec = true;
    let advice = 'Your concern is valid and protected under the EMC Speak-Up Charter.';

    if (nature === 'clinical_safety' || impact === 'patients') {
      category = 'Patient & Clinical Safety';
      advice = 'Clinical and patient safety concerns are handled under our Non-Punitive Culture policy. The focus is strictly on fixing underlying systemic defects, equipment faults, or staffing barriers—not punitive blame.';
      urgency = 'Urgent';
      anonRec = true;
    } else if (nature === 'harassment' || impact === 'myself') {
      category = 'Workplace Respect & Dignity';
      advice = 'You are protected by mandatory Zero-Retaliation covenants. You can report 100% anonymously. If you choose confidential reporting, an independent ombudsperson will serve as your confidential liaison.';
      anonRec = true;
    } else if (nature === 'burnout') {
      category = 'Mental Health & Staff Well-being';
      advice = 'Compassion and care fatigue are systemic workplace hazards, not individual shortcomings. You can submit an anonymous well-being alert or connect directly with our peer support network.';
      anonRec = true;
    } else if (nature === 'ethics') {
      category = 'Ethics, Fraud & Compliance';
      advice = 'Financial, regulatory, or policy concerns are reviewed by an independent Ethics Committee. Legal whistleblower safeguards apply unconditionally.';
      anonRec = true;
    } else {
      category = 'Facility, Environmental & Physical Safety';
      advice = 'Physical building or environmental safety concerns are immediately dispatched to facilities engineering with verification inspections.';
    }

    return { category, urgency, anonRec, advice };
  };

  const rec = getRecommendation();

  return (
    <section id="guide" className="py-16 md:py-20 bg-slate-50/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <div className="text-xs font-semibold uppercase tracking-wider text-sky-800 mb-2">
            Interactive Navigator
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight text-balance">
            Not sure if you should speak up?
          </h2>
          <p className="mt-3 text-sm text-slate-600">
            Answer 3 quick questions to understand your protections, the right reporting path, and what happens next.
          </p>
        </div>

        {/* Wizard Container */}
        <div className="mt-10 bg-white rounded-2xl border border-slate-200 shadow-xs p-6 sm:p-8">
          {/* Progress Indicator */}
          <div className="flex items-center justify-between text-xs text-slate-500 pb-6 border-b border-slate-100">
            <span>
              {step <= 3 ? `Step ${step} of 3` : 'Your Personalized Guidance'}
            </span>
            <div className="flex items-center gap-1.5">
              {[1, 2, 3].map((s) => (
                <div
                  key={s}
                  className={`h-1.5 rounded-full transition-all ${
                    s === step
                      ? 'w-8 bg-sky-900'
                      : s < step || step === 4
                      ? 'w-4 bg-sky-600'
                      : 'w-4 bg-slate-200'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Question 1 */}
          {step === 1 && (
            <div className="mt-6">
              <h3 className="text-base sm:text-lg font-bold text-slate-900">
                1. Who is primarily affected or at risk in this situation?
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Select the group most impacted by the concern.
              </p>

              <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { id: 'patients', label: 'Patients or Care Recipients', desc: 'Direct care standard, medication, safety protocols' },
                  { id: 'staff', label: 'Coworkers & Care Team', desc: 'Working conditions, shifts, interpersonal climate' },
                  { id: 'myself', label: 'Myself Directly', desc: 'Targeted behavior, harassment, unreasonable workload' },
                  { id: 'organization', label: 'The Organization & Community', desc: 'Billing, regulatory standards, physical facilities' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleSelect('impact', item.id)}
                    className="text-left p-4 rounded-xl border border-slate-200 hover:border-sky-900 hover:bg-sky-50/40 transition-all cursor-pointer group"
                  >
                    <div className="text-sm font-semibold text-slate-900 group-hover:text-sky-950">
                      {item.label}
                    </div>
                    <div className="text-xs text-slate-500 mt-1">
                      {item.desc}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Question 2 */}
          {step === 2 && (
            <div className="mt-6">
              <h3 className="text-base sm:text-lg font-bold text-slate-900">
                2. What is the primary nature of the concern?
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Choose the description that closest matches the core issue.
              </p>

              <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { id: 'clinical_safety', label: 'Clinical or Patient Safety Incident', desc: 'Near-miss, dosage deviation, hygiene or equipment fault' },
                  { id: 'harassment', label: 'Interpersonal Harassment or Bias', desc: 'Unwelcome conduct, discrimination, unfair discipline' },
                  { id: 'burnout', label: 'Acute Stress, Exhaustion or Trauma', desc: 'Severe burnout, lack of critical incident debriefing' },
                  { id: 'ethics', label: 'Ethics, Compliance or Financial Lapses', desc: 'Billing fraud, conflicts of interest, falsified documents' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleSelect('nature', item.id)}
                    className="text-left p-4 rounded-xl border border-slate-200 hover:border-sky-900 hover:bg-sky-50/40 transition-all cursor-pointer group"
                  >
                    <div className="text-sm font-semibold text-slate-900 group-hover:text-sky-950">
                      {item.label}
                    </div>
                    <div className="text-xs text-slate-500 mt-1">
                      {item.desc}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Question 3 */}
          {step === 3 && (
            <div className="mt-6">
              <h3 className="text-base sm:text-lg font-bold text-slate-900">
                3. Have you felt safe addressing this through your immediate supervisor?
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Your comfort level helps determine the best reporting channel.
              </p>

              <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { id: 'fear_retaliation', label: 'No — I fear retaliation or adverse reactions', desc: 'We recommend full anonymous reporting with encrypted token' },
                  { id: 'supervisor_involved', label: 'No — My supervisor or lead is involved', desc: 'Report directly to independent ombuds outside the unit chain' },
                  { id: 'tried_no_change', label: 'I spoke up before, but nothing changed', desc: 'Formal escalation required with time-bound SLA tracking' },
                  { id: 'want_neutral', label: 'I want neutral, confidential guidance first', desc: 'Connect with an independent ombudsperson without formal filing' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleSelect('addressed', item.id)}
                    className="text-left p-4 rounded-xl border border-slate-200 hover:border-sky-900 hover:bg-sky-50/40 transition-all cursor-pointer group"
                  >
                    <div className="text-sm font-semibold text-slate-900 group-hover:text-sky-950">
                      {item.label}
                    </div>
                    <div className="text-xs text-slate-500 mt-1">
                      {item.desc}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Guidance Result */}
          {step === 4 && (
            <div className="mt-6">
              <div className="flex items-start gap-4 p-4 rounded-xl bg-sky-50/70 border border-sky-200/80">
                <ShieldCheck className="w-6 h-6 text-sky-900 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-base font-bold text-sky-950">
                    Recommended Path: {rec.category}
                  </h4>
                  <p className="text-xs text-sky-900/90 mt-1 leading-relaxed">
                    {rec.advice}
                  </p>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50">
                  <div className="font-semibold text-slate-900">Recommended Shield</div>
                  <div className="text-slate-600 mt-0.5">
                    100% Anonymous with random token
                  </div>
                </div>

                <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50">
                  <div className="font-semibold text-slate-900">Reviewing Authority</div>
                  <div className="text-slate-600 mt-0.5">
                    Independent Ombuds Triage Team
                  </div>
                </div>

                <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50">
                  <div className="font-semibold text-slate-900">Guaranteed Response</div>
                  <div className="text-slate-600 mt-0.5">
                    Within 24 business hours
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 pt-5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
                <button
                  onClick={handleReset}
                  className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Start over</span>
                </button>

                <button
                  onClick={() => onStartReportWithCategory(rec.category, rec.anonRec)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-sky-900 hover:bg-sky-800 rounded-lg shadow-xs transition-all cursor-pointer"
                >
                  <span>Proceed to Safe Submission</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
