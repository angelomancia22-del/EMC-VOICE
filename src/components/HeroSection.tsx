import React from 'react';
import { Shield, Lock, Search, HeartHandshake, CheckCircle2 } from 'lucide-react';
import { TRUST_METRICS } from '../data/initialData';

interface HeroSectionProps {
  onOpenSubmit: () => void;
  onOpenTrack: () => void;
  onOpenGuide: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenSubmit,
  onOpenTrack,
  onOpenGuide,
}) => {
  return (
    <section id="hero" className="relative pt-8 pb-16 md:pt-12 md:pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main 2-column Hero split with items-stretch */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          {/* Left Column: Proposition and Actions */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Editorial Kicker */}
            <div className="text-xs font-semibold uppercase tracking-wider text-sky-800 mb-3 flex items-center gap-2">
              <span>EMC Voice</span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span className="text-slate-600 normal-case font-medium">It's all about concern</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.35rem] leading-[1.12] font-extrabold text-slate-900 tracking-tight text-balance">
              Where speaking up is met with care, dignity, and real action.
            </h1>

            <p className="mt-5 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
              An independent, confidential sanctuary to raise clinical safety, workplace conduct, well-being, or ethical concerns. Protected by institutional zero-retaliation covenants.
            </p>

            {/* Action Group */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                onClick={onOpenSubmit}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-semibold text-white bg-sky-900 hover:bg-sky-800 active:bg-sky-950 rounded-lg shadow-sm hover:shadow transition-all whitespace-nowrap cursor-pointer"
              >
                <Shield className="w-5 h-5 text-sky-200" />
                <span>File a Safe Concern</span>
              </button>

              <button
                onClick={onOpenTrack}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 text-base font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg transition-all whitespace-nowrap cursor-pointer"
              >
                <Search className="w-4 h-4 text-slate-500" />
                <span>Track Existing Case</span>
              </button>

              <button
                onClick={onOpenGuide}
                className="text-sm font-medium text-sky-900 hover:text-sky-700 hover:underline py-2 cursor-pointer transition-colors"
              >
                Not sure if you should report? Take the 1-min guide →
              </button>
            </div>

            {/* Core Protections Summary List */}
            <div className="mt-10 pt-6 border-t border-slate-200/80 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <Lock className="w-4 h-4 text-sky-800 mt-1 shrink-0" />
                <div>
                  <h4 className="text-sm font-semibold text-slate-900">100% Identity Shielding</h4>
                  <p className="text-xs text-slate-500 leading-normal mt-0.5">
                    File anonymously without IP capture, or choose confidential advocate mediation.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 mt-1 shrink-0" />
                <div>
                  <h4 className="text-sm font-semibold text-slate-900">Zero Retaliation Guarantee</h4>
                  <p className="text-xs text-slate-500 leading-normal mt-0.5">
                    Legally binding institutional charter prohibiting any adverse managerial action.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Asset */}
          <div className="lg:col-span-5 flex items-center">
            <div className="w-full relative rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-slate-100 group">
              <img
                src="/src/assets/images/hero_emc_voice_support_1793029260141.jpg"
                alt="Supportive confidential dialogue between an ombudsperson and a team member in a serene atrium"
                className="w-full h-84 sm:h-96 lg:h-full min-h-[380px] object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 text-white p-2">
                <p className="text-xs font-medium text-slate-200 tracking-wide">
                  Safe Listening & Ombudsperson Sanctuary
                </p>
                <p className="text-sm font-semibold mt-0.5 text-white/95">
                  "Every concern voiced is an opportunity to heal, protect, and improve."
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 4-column KPI / Trust Commitment Strip below the hero split */}
        <div className="mt-14 pt-8 border-t border-slate-200 grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tabular-nums font-display">
              {TRUST_METRICS.averageResponseHours}
            </div>
            <div className="text-xs text-slate-500 mt-1">
              Average Initial Triage SLA
            </div>
          </div>

          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tabular-nums font-display">
              {TRUST_METRICS.casesResolvedWithinSLA}
            </div>
            <div className="text-xs text-slate-500 mt-1">
              Resolution Within Governance Standard
            </div>
          </div>

          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tabular-nums font-display">
              {TRUST_METRICS.anonymityRate}
            </div>
            <div className="text-xs text-slate-500 mt-1">
              Anonymous Reporters Protected
            </div>
          </div>

          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tabular-nums font-display">
              {TRUST_METRICS.totalConcernsAddressed}
            </div>
            <div className="text-xs text-slate-500 mt-1">
              Systemic Improvements Documented
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
