import React, { useState } from 'react';
import { Phone, Clock, ShieldCheck, Heart, AlertCircle, Copy, Check } from 'lucide-react';
import { HOTLINES } from '../data/initialData';

export const HotlinesSection: React.FC = () => {
  const [copiedPhone, setCopiedPhone] = useState<string | null>(null);

  const handleCopyPhone = (phone: string) => {
    navigator.clipboard.writeText(phone);
    setCopiedPhone(phone);
    setTimeout(() => setCopiedPhone(null), 2000);
  };

  return (
    <section id="hotlines" className="py-16 md:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="text-xs font-semibold uppercase tracking-wider text-sky-800 mb-2">
            Immediate Care & Urgent Response
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight text-balance">
            Emergency Hotlines & 24/7 Support Channels
          </h2>
          <p className="mt-4 text-base text-slate-600 leading-relaxed">
            If you or someone around you is in immediate physical danger, suffering an acute psychological crisis, or witnessing an imminent clinical emergency, use the direct phone lines below rather than waiting for an online ticket.
          </p>
        </div>

        {/* Hotlines Cards Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          {HOTLINES.map((h, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-7 rounded-2xl border border-slate-200 bg-slate-50/50 hover:border-slate-300 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                  <span className="font-semibold text-sky-900">{h.badge}</span>
                  <span className="flex items-center gap-1 font-mono text-[11px]">
                    <Clock className="w-3 h-3 text-slate-400" />
                    <span>{h.available}</span>
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900">
                  {h.name}
                </h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  {h.subtext}
                </p>
              </div>

              <div className="mt-6 pt-5 border-t border-slate-200/80 flex items-center justify-between">
                <a
                  href={`tel:${h.phone.replace(/[^0-9]/g, '')}`}
                  className="text-lg sm:text-xl font-mono font-extrabold text-sky-950 hover:text-sky-700 transition-colors tracking-tight flex items-center gap-2"
                >
                  <Phone className="w-4 h-4 text-sky-700" />
                  <span>{h.phone}</span>
                </a>

                <button
                  onClick={() => handleCopyPhone(h.phone)}
                  className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-md hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  {copiedPhone === h.phone ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Immediate Danger Alert Box */}
        <div className="mt-10 p-5 rounded-xl border border-rose-200 bg-rose-50/60 text-xs sm:text-sm text-rose-950 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-rose-700 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block">For Life-Threatening Emergencies or Active Physical Threats:</span>
              <span className="text-rose-900 text-xs block mt-0.5">
                Dial Hospital Security Emergency extension <strong>#4444</strong> or local civil authorities <strong>911</strong> immediately.
              </span>
            </div>
          </div>
          <a
            href="tel:911"
            className="px-4 py-2 text-xs font-bold text-white bg-rose-700 hover:bg-rose-800 rounded-lg shadow-xs transition-colors whitespace-nowrap self-start sm:self-auto"
          >
            Call 911 / Emergency
          </a>
        </div>
      </div>
    </section>
  );
};
