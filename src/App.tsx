/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { PillarsSection } from './components/PillarsSection';
import { DecisionGuideSection } from './components/DecisionGuideSection';
import { TrackCaseSection } from './components/TrackCaseSection';
import { CharterSection } from './components/CharterSection';
import { HotlinesSection } from './components/HotlinesSection';
import { Footer } from './components/Footer';
import { SubmitConcernModal } from './components/SubmitConcernModal';
import { CareOfficerPortal } from './components/CareOfficerPortal';
import { ConcernCategory, ConcernCase } from './types/concern';

export default function App() {
  const [isSubmitOpen, setIsSubmitOpen] = useState<boolean>(false);
  const [isOmbudsOpen, setIsOmbudsOpen] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<ConcernCategory>('Patient & Clinical Safety');
  const [isAnonymousPref, setIsAnonymousPref] = useState<boolean>(true);
  const [activeTrackingToken, setActiveTrackingToken] = useState<string>('');

  const handleOpenSubmit = (category?: ConcernCategory, anonymous = true) => {
    if (category) {
      setSelectedCategory(category);
    }
    setIsAnonymousPref(anonymous);
    setIsSubmitOpen(true);
  };

  const handleOpenTrack = () => {
    const trackerEl = document.getElementById('tracker');
    if (trackerEl) {
      trackerEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenGuide = () => {
    const guideEl = document.getElementById('guide');
    if (guideEl) {
      guideEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavigateSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCaseCreated = (createdCase: ConcernCase) => {
    setActiveTrackingToken(createdCase.trackingToken);
    // After user closes modal, tracker will be ready with their new token
  };

  const handleSelectCaseFromOmbuds = (token: string) => {
    setActiveTrackingToken(token);
    handleOpenTrack();
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/50 text-slate-900 selection:bg-sky-900 selection:text-white">
      {/* 3-Zone Top Bar */}
      <Navbar
        onOpenSubmit={() => handleOpenSubmit()}
        onOpenTrack={handleOpenTrack}
        onOpenOmbuds={() => setIsOmbudsOpen(true)}
        onNavigateSection={handleNavigateSection}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection
          onOpenSubmit={() => handleOpenSubmit()}
          onOpenTrack={handleOpenTrack}
          onOpenGuide={handleOpenGuide}
        />

        {/* 6 Core Pillars Bento Grid with High-Fidelity Visuals */}
        <PillarsSection
          onSelectCategory={(cat) => handleOpenSubmit(cat, true)}
        />

        {/* Interactive "Should I Speak Up?" Decision Guide */}
        <DecisionGuideSection
          onStartReportWithCategory={(cat, anon) => handleOpenSubmit(cat, anon)}
        />

        {/* Confidential Case Tracker & Two-Way Anonymous Dialogue */}
        <TrackCaseSection
          initialToken={activeTrackingToken}
          onOpenSubmit={() => handleOpenSubmit()}
        />

        {/* Speak-Up Charter & Zero-Retaliation Covenant */}
        <CharterSection />

        {/* Immediate Emergency Hotlines & Crisis Care */}
        <HotlinesSection />
      </main>

      {/* Institutional Footer */}
      <Footer
        onOpenSubmit={() => handleOpenSubmit()}
        onOpenTrack={handleOpenTrack}
        onOpenOmbuds={() => setIsOmbudsOpen(true)}
        onNavigateSection={handleNavigateSection}
      />

      {/* Concern Submission Modal */}
      <SubmitConcernModal
        isOpen={isSubmitOpen}
        onClose={() => setIsSubmitOpen(false)}
        initialCategory={selectedCategory}
        initialAnonymous={isAnonymousPref}
        onCaseCreated={handleCaseCreated}
      />

      {/* Ombudsperson & Ethics Committee Review Workspace */}
      <CareOfficerPortal
        isOpen={isOmbudsOpen}
        onClose={() => setIsOmbudsOpen(false)}
        onCaseSelectedInTracker={handleSelectCaseFromOmbuds}
      />
    </div>
  );
}
