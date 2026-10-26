import React from 'react';
import { ShieldAlert, ShieldCheck, HeartHandshake, EyeOff, Award, FileCheck2 } from 'lucide-react';

export const CharterSection: React.FC = () => {
  return (
    <section id="charter" className="py-16 md:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="text-xs font-semibold uppercase tracking-wider text-sky-800 mb-2">
            Institutional Covenant
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight text-balance">
            The EMC Speak-Up Charter & Zero-Retaliation Covenant
          </h2>
          <p className="mt-4 text-base text-slate-600 leading-relaxed">
            "It's all about concern." Raising a concern requires courage and care for our patients, colleagues, and community. We pledge that your voice will always be protected, respected, and answered.
          </p>
        </div>

        {/* 2-Column Section with Guarantees and Community Image */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          {/* Left Column: 5 Guarantees */}
          <div className="lg:col-span-7 space-y-4">
            {[
              {
                num: '01',
                title: 'Strict Anti-Retaliation Invariant',
                desc: 'Institutional policy and governing board bylaws strictly prohibit any form of retaliation—direct or subtle, including shift reassignments, exclusion from meetings, or negative reviews—against anyone raising a concern in good faith.',
              },
              {
                num: '02',
                title: 'Total Identity Control & True Anonymity',
                desc: 'We do not capture IP addresses, session fingerprints, or device telemetry for anonymous submissions. If you choose confidential liaison, your identity is firewalled within the Ombuds Office.',
              },
              {
                num: '03',
                title: 'Non-Punitive Restorative Safety Culture',
                desc: 'Clinical near-misses, equipment problems, and procedural breakdowns are approached from human factors engineering: fixing systems, training, and safeguards rather than scapegoating front-line staff.',
              },
              {
                num: '04',
                title: 'Time-Bound Triage & SLA Accountability',
                desc: 'Every concern receives an initial triage and safety risk assessment within 24 hours. Formal inquiries follow structured milestones accessible to reporters via their confidential token.',
              },
              {
                num: '05',
                title: 'Independent Ombudsperson Governance',
                desc: 'Our designated Ombuds and Care Officers report directly to the Board Audit & Ethics Committee, completely independent of department heads and unit supervisors.',
              },
            ].map((g) => (
              <div
                key={g.num}
                className="p-5 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition-all flex items-start gap-4"
              >
                <div className="text-base font-extrabold text-sky-900 font-display mt-0.5">
                  {g.num}.
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">{g.title}</h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">{g.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Community Visual Asset & Quote */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div className="rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-xs">
              <img
                src="/src/assets/images/emc_community_wellbeing_1793029261621.jpg"
                alt="Diverse team of healthcare providers and staff collaborating respectfully"
                className="w-full h-72 sm:h-80 object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="p-6">
                <div className="text-xs font-semibold text-sky-900 uppercase tracking-wider mb-1">
                  Our Community Promise
                </div>
                <h4 className="text-base font-bold text-slate-900">
                  "Silence creates risk. Concern creates safety."
                </h4>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  When you speak up, you protect a patient, safeguard a colleague, or help our community deliver care with uncompromised integrity.
                </p>

                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span>Approved by the Ethics Governance Board</span>
                  <span className="font-mono">Charter Rev. 2026</span>
                </div>
              </div>
            </div>

            {/* Quick whistleblower hotline callout */}
            <div className="mt-4 p-4 rounded-xl bg-sky-900 text-white text-xs flex items-center justify-between">
              <div>
                <span className="font-bold block">Need an informal advice call first?</span>
                <span className="text-sky-200 text-[11px] block mt-0.5">
                  Consult the neutral Ombuds Office without filing a formal ticket.
                </span>
              </div>
              <a
                href="#hotlines"
                className="px-3 py-1.5 bg-white text-sky-950 font-semibold rounded-md hover:bg-sky-50 transition-colors whitespace-nowrap"
              >
                View Hotlines
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
