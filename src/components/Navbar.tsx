import React from 'react';
import { ShieldCheck, EyeOff, Lock, LogOut } from 'lucide-react';

interface NavbarProps {
  onOpenSubmit: () => void;
  onOpenTrack: () => void;
  onOpenOmbuds: () => void;
  activeView?: string;
  onNavigateSection: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenSubmit,
  onOpenTrack,
  onOpenOmbuds,
  onNavigateSection,
}) => {
  // Discreet quick exit for confidential safety (redirects to neutral weather/search)
  const handleQuickExit = () => {
    window.location.replace('https://www.google.com');
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Strict 3-Zone Contract: Brand Zone — Nav Links — 1 Primary Action */}
        <div className="flex items-center justify-between gap-8 h-18">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onNavigateSection('hero');
            }}
            className="flex items-center gap-2 text-xl font-extrabold tracking-tight text-slate-900 whitespace-nowrap shrink-0 hover:text-sky-950 transition-colors"
          >
            <span className="w-8 h-8 rounded-lg bg-sky-900 text-white flex items-center justify-center font-display font-bold text-sm shadow-xs">
              E
            </span>
            <span>EMC Voice</span>
          </a>

          {/* Zone 2: 4-5 clean single-line text navigation links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-600">
            <button
              onClick={() => onNavigateSection('pillars')}
              className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 py-2 cursor-pointer"
            >
              Concern Areas
            </button>
            <button
              onClick={() => onNavigateSection('guide')}
              className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 py-2 cursor-pointer"
            >
              Decision Guide
            </button>
            <button
              onClick={onOpenTrack}
              className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 py-2 cursor-pointer"
            >
              Track Case
            </button>
            <button
              onClick={() => onNavigateSection('charter')}
              className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 py-2 cursor-pointer"
            >
              Speak-Up Charter
            </button>
            <button
              onClick={() => onNavigateSection('hotlines')}
              className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 py-2 cursor-pointer"
            >
              Care Hotlines
            </button>
            <button
              onClick={onOpenOmbuds}
              className="text-slate-500 hover:text-sky-900 transition-colors whitespace-nowrap shrink-0 py-2 cursor-pointer"
              title="Ombudsperson & Ethics Review Workspace"
            >
              Ombuds Desk
            </button>
          </nav>

          {/* Zone 3: 1 primary action button + discreet quick escape */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={handleQuickExit}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-500 hover:text-rose-700 hover:bg-rose-50 rounded-md transition-colors cursor-pointer"
              title="Quickly exit this page to a blank search engine for personal privacy"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Quick Exit</span>
            </button>

            <button
              onClick={onOpenSubmit}
              className="inline-flex items-center gap-2 px-4.5 py-2.5 text-sm font-semibold text-white bg-sky-900 hover:bg-sky-800 active:bg-sky-950 rounded-lg shadow-xs hover:shadow transition-all whitespace-nowrap shrink-0 cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4 text-sky-200" />
              <span>Voice a Concern</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
