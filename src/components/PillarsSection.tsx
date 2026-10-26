import React from 'react';
import { CONCERN_CATEGORIES } from '../data/initialData';
import { ConcernCategory } from '../types/concern';
import { ArrowUpRight, ShieldCheck, Heart, Stethoscope, Scale, Sparkles, Building2 } from 'lucide-react';

interface PillarsSectionProps {
  onSelectCategory: (cat: ConcernCategory) => void;
}

export const PillarsSection: React.FC<PillarsSectionProps> = ({ onSelectCategory }) => {
  return (
    <section id="pillars" className="py-16 md:py-24 bg-white border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="text-xs font-semibold uppercase tracking-wider text-sky-800 mb-2">
            Pillars of Care & Integrity
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight text-balance">
            Whatever weighs on your mind, you have a safe place to voice it.
          </h2>
          <p className="mt-4 text-base text-slate-600 leading-relaxed">
            EMC Voice provides specialized triage paths for clinical care, workplace fairness, ethical compliance, and staff mental health. Select any area below to initiate a protected report.
          </p>
        </div>

        {/* Bento Grid with Asymmetric Spans and High-Fidelity Photography */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 01: Clinical & Patient Safety (Featured with Image) */}
          <div className="lg:col-span-2 rounded-2xl border border-slate-200 overflow-hidden bg-slate-50/60 flex flex-col justify-between group hover:border-slate-300 transition-all">
            <div className="p-6 sm:p-8">
              <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                <span className="font-semibold text-sky-900 font-display">01. Clinical & Patient Care</span>
                <span>Near-Miss & Protocol Protection</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 group-hover:text-sky-900 transition-colors">
                Patient Safety, Medication & Treatment Standards
              </h3>
              <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                Report near-misses, compromised sterile protocols, staffing strain impacting acute monitoring, or clinical equipment failures without fear of personal blame.
              </p>

              {/* Specific Examples */}
              <div className="mt-5 space-y-2">
                <div className="text-xs font-semibold text-slate-700">Common situations reported:</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-600" />
                    <span>Medication verification scanner failures</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-600" />
                    <span>Inadequate coverage during shift handoffs</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-600" />
                    <span>Unaddressed clinical monitor calibration alerts</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-600" />
                    <span>Cross-contamination barrier deviations</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-6 pb-6 sm:px-8 sm:pb-8 flex items-center justify-between pt-4 border-t border-slate-200/70">
              <button
                onClick={() => onSelectCategory('Patient & Clinical Safety')}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-900 hover:text-sky-700 cursor-pointer"
              >
                <span>Voice a patient care concern</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
              <span className="text-xs text-slate-400">Non-punitive review protocol</span>
            </div>
          </div>

          {/* Photo Card: Mediation & Safe Space */}
          <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-900 min-h-[280px] flex flex-col justify-end p-6 group">
            <img
              src="/src/assets/images/emc_safe_dialogue_1793029261429.jpg"
              alt="Confidential safe listening room"
              className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
            <div className="relative z-10 text-white">
              <div className="text-xs font-medium text-sky-200 mb-1">Confidential Sanctuary</div>
              <h4 className="text-base font-bold">1-on-1 Neutral Ombudsperson Access</h4>
              <p className="text-xs text-slate-300 mt-1 leading-normal">
                Prefer to talk to someone face-to-face or via secure audio? You can schedule an informal confidential consultation anytime.
              </p>
            </div>
          </div>

          {/* Card 02: Workplace Respect & Harassment */}
          <div className="rounded-2xl border border-slate-200 p-6 sm:p-7 bg-white hover:border-slate-300 transition-all flex flex-col justify-between">
            <div>
              <div className="text-xs font-semibold text-sky-900 font-display mb-2">
                02. Workplace Respect & Dignity
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                Harassment, Discrimination & Retaliation
              </h3>
              <p className="mt-2.5 text-xs text-slate-600 leading-relaxed">
                Zero tolerance for intimidation, discriminatory bias, hostile behavior, or punitive schedule shifts following past feedback.
              </p>
              <div className="mt-4 pt-4 border-t border-slate-100 text-xs text-slate-500 space-y-1.5">
                <p>· Exclusionary scheduling & assignment bias</p>
                <p>· Unwelcome remarks or boundary violations</p>
                <p>· Managerial coercion or intimidation</p>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100">
              <button
                onClick={() => onSelectCategory('Workplace Respect & Dignity')}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-900 hover:text-sky-700 cursor-pointer"
              >
                <span>Report workplace conduct</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Card 03: Ethics, Fraud & Compliance */}
          <div className="rounded-2xl border border-slate-200 p-6 sm:p-7 bg-white hover:border-slate-300 transition-all flex flex-col justify-between">
            <div>
              <div className="text-xs font-semibold text-sky-900 font-display mb-2">
                03. Institutional Ethics & Compliance
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                Fraud, Billing & Regulatory Integrity
              </h3>
              <p className="mt-2.5 text-xs text-slate-600 leading-relaxed">
                Independent channel to report financial irregularities, conflicts of interest, false documentation, or regulatory non-compliance.
              </p>
              <div className="mt-4 pt-4 border-t border-slate-100 text-xs text-slate-500 space-y-1.5">
                <p>· Medical billing and coding irregularities</p>
                <p>· Undisclosed vendor relationships or perks</p>
                <p>· Regulatory documentation fabrication</p>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100">
              <button
                onClick={() => onSelectCategory('Ethics, Fraud & Compliance')}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-900 hover:text-sky-700 cursor-pointer"
              >
                <span>Report ethics or compliance</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Card 04: Mental Health & Staff Well-being */}
          <div className="rounded-2xl border border-slate-200 p-6 sm:p-7 bg-white hover:border-slate-300 transition-all flex flex-col justify-between">
            <div>
              <div className="text-xs font-semibold text-sky-900 font-display mb-2">
                04. Psychological Safety & Well-being
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                Burnout, Moral Injury & Trauma Support
              </h3>
              <p className="mt-2.5 text-xs text-slate-600 leading-relaxed">
                Care for those who care for others. Report acute exhaustion, absence of critical incident debriefs, or request restorative support.
              </p>
              <div className="mt-4 pt-4 border-t border-slate-100 text-xs text-slate-500 space-y-1.5">
                <p>· Post-incident emotional distress without debrief</p>
                <p>· Chronic exhaustion compromising focus</p>
                <p>· Compassion fatigue and grief support</p>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100">
              <button
                onClick={() => onSelectCategory('Mental Health & Staff Well-being')}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-900 hover:text-sky-700 cursor-pointer"
              >
                <span>Request well-being support</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Card 05: Facility & Physical Safety (with ethics investigation image banner) */}
          <div className="lg:col-span-2 rounded-2xl border border-slate-200 overflow-hidden bg-white grid grid-cols-1 sm:grid-cols-12">
            <div className="p-6 sm:p-7 sm:col-span-7 flex flex-col justify-between">
              <div>
                <div className="text-xs font-semibold text-sky-900 font-display mb-2">
                  05. Facility & Environmental Safety
                </div>
                <h3 className="text-lg font-bold text-slate-900">
                  Physical Hazards, Egress & Environmental Health
                </h3>
                <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                  Fast escalation for physical building hazards, compromised emergency exit routes, air quality or ventilation issues, and hazardous chemical protocols.
                </p>
                <div className="mt-4 text-xs text-slate-500 space-y-1">
                  <p>· Sticking fire and emergency escape doors</p>
                  <p>· Hazardous chemical disposal protocol lapses</p>
                  <p>· Broken security badges or unmonitored sensitive wards</p>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100">
                <button
                  onClick={() => onSelectCategory('Facility, Environmental & Physical Safety')}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-900 hover:text-sky-700 cursor-pointer"
                >
                  <span>Report environmental hazard</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
            <div className="sm:col-span-5 relative bg-slate-100 min-h-[160px]">
              <img
                src="/src/assets/images/emc_ethics_investigation_1793029262630.jpg"
                alt="Ethics review team verifying safety standard implementation"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          {/* Card 06: Policy & Constructive Ideas */}
          <div className="rounded-2xl border border-slate-200 p-6 sm:p-7 bg-white hover:border-slate-300 transition-all flex flex-col justify-between">
            <div>
              <div className="text-xs font-semibold text-sky-900 font-display mb-2">
                06. Constructive Voice & Process Reform
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                Constructive Ideas & Workflow Evolution
              </h3>
              <p className="mt-2.5 text-xs text-slate-600 leading-relaxed">
                Concern is also about care for better ways of working. Suggest systemic improvements to unnecessary paperwork or scheduling equity.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100">
              <button
                onClick={() => onSelectCategory('Policy & Process Improvement')}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-900 hover:text-sky-700 cursor-pointer"
              >
                <span>Propose constructive reform</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
