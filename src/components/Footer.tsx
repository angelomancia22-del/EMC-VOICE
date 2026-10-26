import React from 'react';
import { ShieldCheck, HeartHandshake, Lock, Phone } from 'lucide-react';

interface FooterProps {
  onOpenSubmit: () => void;
  onOpenTrack: () => void;
  onOpenOmbuds: () => void;
  onNavigateSection: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenSubmit,
  onOpenTrack,
  onOpenOmbuds,
  onNavigateSection,
}) => {
  return (
    <footer className="bg-slate-900 text-slate-400 text-xs py-14 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-slate-800">
          {/* Col 1: Wordmark & Ethos */}
          <div className="space-y-3 md:col-span-1">
            <div className="text-white font-extrabold text-lg tracking-tight font-display flex items-center gap-2">
              <span className="w-7 h-7 rounded-md bg-sky-800 text-white flex items-center justify-center text-xs">
                E
              </span>
              <span>EMC Voice</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              "It's all about concern." Providing employees, healthcare providers, and community members an independent, retaliation-free sanctuary to speak up and protect one another.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-slate-500 pt-1">
              <Lock className="w-3.5 h-3.5 text-slate-400" />
              <span>Zero-Tracker Architecture · HIPAA & Whistleblower Compliant</span>
            </div>
          </div>

          {/* Col 2: Navigation Mirror */}
          <div className="space-y-2">
            <h4 className="text-slate-200 font-semibold uppercase tracking-wider text-[11px]">
              Platform Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={onOpenSubmit}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  File a Safe Concern
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenTrack}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Track Case Status
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('pillars')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Concern Categories
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('guide')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Decision Guide
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Institutional Governance */}
          <div className="space-y-2">
            <h4 className="text-slate-200 font-semibold uppercase tracking-wider text-[11px]">
              Ethics & Governance
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigateSection('charter')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Zero-Retaliation Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('charter')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  The 5 Speak-Up Guarantees
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenOmbuds}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Ombuds Review Workspace
                </button>
              </li>
              <li>
                <a
                  href="#hotlines"
                  onClick={() => onNavigateSection('hotlines')}
                  className="hover:text-white transition-colors cursor-pointer text-left block"
                >
                  Immediate Emergency Hotlines
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Safe Exit & Contact */}
          <div className="space-y-2">
            <h4 className="text-slate-200 font-semibold uppercase tracking-wider text-[11px]">
              Privacy & Quick Exit
            </h4>
            <p className="text-slate-400 text-xs leading-relaxed">
              If at any moment you need to close this page immediately to preserve confidentiality, click the button below.
            </p>
            <div className="pt-2">
              <button
                onClick={() => window.location.replace('https://www.google.com')}
                className="px-3.5 py-1.5 text-xs font-semibold text-rose-300 bg-rose-950/60 border border-rose-800 rounded-md hover:bg-rose-900 transition-colors cursor-pointer inline-flex items-center gap-1.5"
              >
                <span>Emergency Quick Exit</span>
              </button>
            </div>
          </div>
        </div>

        {/* Quiet Bottom Legal bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} EMC Voice Platform. Operating under independent ethics charter covenants.
          </div>
          <div className="flex items-center gap-4">
            <span>Non-Punitive Safety Protocol</span>
            <span aria-hidden="true">·</span>
            <span>Independent Ombuds Oversight</span>
            <span aria-hidden="true">·</span>
            <span>All Concerns Acted Upon</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
