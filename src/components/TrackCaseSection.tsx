import React, { useState, useEffect } from 'react';
import {
  Search,
  CheckCircle2,
  Clock,
  Shield,
  MessageSquare,
  Send,
  FileText,
  AlertCircle,
  Copy,
  Printer,
  ChevronRight,
  Info,
} from 'lucide-react';
import { ConcernCase } from '../types/concern';
import { getCaseByToken, addMessageToCase, getStoredCases } from '../data/storage';

interface TrackCaseSectionProps {
  initialToken?: string;
  onOpenSubmit: () => void;
}

export const TrackCaseSection: React.FC<TrackCaseSectionProps> = ({
  initialToken = '',
  onOpenSubmit,
}) => {
  const [tokenInput, setTokenInput] = useState<string>(initialToken);
  const [activeCase, setActiveCase] = useState<ConcernCase | null>(null);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState<string>('');
  const [isSending, setIsSending] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  // Suggested demo tokens for immediate testing
  const demoTokens = ['EMC-4819-K2', 'EMC-9034-V7', 'EMC-6120-M4', 'EMC-3185-R9'];

  const performLookup = (tokenToFind: string) => {
    const found = getCaseByToken(tokenToFind);
    if (found) {
      setActiveCase(found);
      setSearchError(null);
    } else {
      setActiveCase(null);
      setSearchError(`No active case found for tracking code "${tokenToFind}". Please verify your key.`);
    }
  };

  useEffect(() => {
    if (initialToken) {
      setTokenInput(initialToken);
      performLookup(initialToken);
    } else {
      // Default to the first case so the UI has immediately visible value
      const all = getStoredCases();
      if (all.length > 0) {
        setActiveCase(all[0]);
        setTokenInput(all[0].trackingToken);
      }
    }
  }, [initialToken]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tokenInput.trim()) return;
    performLookup(tokenInput);
  };

  const handleSelectDemoToken = (tok: string) => {
    setTokenInput(tok);
    performLookup(tok);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !activeCase) return;

    setIsSending(true);
    const content = newMessage.trim();
    setNewMessage('');

    const updated = addMessageToCase(activeCase.trackingToken, {
      sender: 'Reporter',
      content,
    });

    if (updated) {
      setActiveCase(updated);
    }

    setIsSending(false);
  };

  const handleCopy = () => {
    if (activeCase) {
      navigator.clipboard.writeText(activeCase.trackingToken);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const getStatusBadge = (status: ConcernCase['status']) => {
    switch (status) {
      case 'Resolved':
        return 'text-emerald-700 bg-emerald-50 border-emerald-200';
      case 'Corrective Action':
        return 'text-sky-800 bg-sky-50 border-sky-200';
      case 'Under Review':
        return 'text-amber-800 bg-amber-50 border-amber-200';
      case 'Care Triage':
        return 'text-indigo-800 bg-indigo-50 border-indigo-200';
      default:
        return 'text-slate-700 bg-slate-100 border-slate-200';
    }
  };

  return (
    <section id="tracker" className="py-16 md:py-24 bg-white border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="text-xs font-semibold uppercase tracking-wider text-sky-800 mb-2">
            Confidential Case Tracker
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight text-balance">
            Check case progress & converse with your ombudsperson.
          </h2>
          <p className="mt-3 text-sm text-slate-600 leading-relaxed">
            Enter the tracking key generated when your concern was registered. You can review investigator notes, inspect real-time progress, and exchange two-way messages with zero risk to your identity.
          </p>
        </div>

        {/* Lookup Bar */}
        <div className="mt-8 bg-slate-50 p-4 sm:p-6 rounded-2xl border border-slate-200">
          <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={tokenInput}
                onChange={(e) => setTokenInput(e.target.value)}
                placeholder="Enter case tracking key (e.g. EMC-4819-K2)"
                className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm font-mono bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-sky-900"
              />
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-sky-900 hover:bg-sky-800 active:bg-sky-950 rounded-lg shadow-xs transition-colors whitespace-nowrap cursor-pointer"
            >
              Lookup Case
            </button>
          </form>

          {/* Quick Demo Pre-fills */}
          <div className="mt-3.5 flex flex-wrap items-center gap-2 text-xs">
            <span className="text-slate-500 font-medium">Quick inspect sample cases:</span>
            {demoTokens.map((tok) => (
              <button
                key={tok}
                type="button"
                onClick={() => handleSelectDemoToken(tok)}
                className={`px-2.5 py-1 text-xs font-mono rounded border transition-colors cursor-pointer ${
                  activeCase?.trackingToken === tok
                    ? 'bg-sky-900 text-white border-sky-900'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {tok}
              </button>
            ))}
          </div>

          {searchError && (
            <div className="mt-4 p-3 rounded-lg bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{searchError}</span>
            </div>
          )}
        </div>

        {/* Active Case Details View */}
        {activeCase && (
          <div className="mt-8 bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            {/* Case Header */}
            <div className="p-6 sm:p-8 border-b border-slate-200 bg-slate-50/50">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 mb-2">
                    <span className="font-mono font-bold text-slate-900">{activeCase.trackingToken}</span>
                    <span aria-hidden="true">·</span>
                    <span>{activeCase.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{activeCase.department}</span>
                    <span aria-hidden="true">·</span>
                    <span>Severity: {activeCase.severity}</span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                    {activeCase.title}
                  </h3>
                </div>

                <div className="flex items-center gap-2.5 shrink-0">
                  <span className={`px-3 py-1 rounded-md text-xs font-semibold border ${getStatusBadge(activeCase.status)}`}>
                    Status: {activeCase.status}
                  </span>

                  <button
                    onClick={handleCopy}
                    className="p-2 text-slate-500 hover:text-slate-800 hover:bg-white rounded-lg border border-slate-200 transition-colors cursor-pointer"
                    title="Copy Tracking Token"
                  >
                    <Copy className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => window.print()}
                    className="p-2 text-slate-500 hover:text-slate-800 hover:bg-white rounded-lg border border-slate-200 transition-colors cursor-pointer"
                    title="Print Case Summary"
                  >
                    <Printer className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Case Metadata Grid */}
              <div className="mt-6 pt-5 border-t border-slate-200/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div>
                  <span className="text-slate-500 block">Assigned Ombuds Officer:</span>
                  <span className="font-semibold text-slate-900 mt-0.5 block">{activeCase.assignedOfficer}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Identity Protection Level:</span>
                  <span className="font-semibold text-slate-900 mt-0.5 block">
                    {activeCase.isAnonymous ? '100% Anonymous (Cryptographic Token)' : `Confidential (${activeCase.reporterName || 'Shielded Reporter'})`}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block">Registration Timestamp:</span>
                  <span className="font-semibold text-slate-900 mt-0.5 block font-mono">
                    {new Date(activeCase.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                </div>
              </div>
            </div>

            {/* Main Case Content: Grid with Timeline on Left, Messaging on Right */}
            <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-200">
              {/* Left Column: Case Narrative & Resolution Timeline (7 cols) */}
              <div className="lg:col-span-7 p-6 sm:p-8 space-y-6">
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                    Reported Concern Details
                  </h4>
                  <div className="p-4 rounded-xl bg-slate-50 text-xs sm:text-sm text-slate-700 leading-relaxed border border-slate-100">
                    {activeCase.description}
                  </div>
                </div>

                {activeCase.desiredOutcome && (
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                      Requested Safe Remedy
                    </h4>
                    <p className="text-xs text-slate-600 bg-sky-50/50 p-3 rounded-lg border border-sky-100">
                      {activeCase.desiredOutcome}
                    </p>
                  </div>
                )}

                {activeCase.actionTakenNotes && (
                  <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200/90 text-emerald-950 text-xs">
                    <div className="font-bold mb-1 flex items-center gap-1.5 text-emerald-900">
                      <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                      <span>Documented Corrective Action Taken</span>
                    </div>
                    <p className="leading-relaxed">{activeCase.actionTakenNotes}</p>
                  </div>
                )}

                {/* Milestone Pipeline */}
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-4">
                    Case Lifecycle & Investigation Milestones
                  </h4>

                  <div className="space-y-4">
                    {activeCase.timeline.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <div className="mt-0.5">
                          {item.status === 'completed' ? (
                            <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                            </div>
                          ) : item.status === 'current' ? (
                            <div className="w-5 h-5 rounded-full bg-sky-100 text-sky-800 flex items-center justify-center">
                              <Clock className="w-3.5 h-3.5" />
                            </div>
                          ) : (
                            <div className="w-5 h-5 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center text-[10px] font-mono">
                              {idx + 1}
                            </div>
                          )}
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-bold text-slate-900">{item.stage}</span>
                            <span className="text-slate-400 font-mono text-[11px]">{item.date}</span>
                          </div>
                          <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                            {item.note}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Two-Way Anonymous Dialogue (5 cols) */}
              <div className="lg:col-span-5 flex flex-col justify-between bg-slate-50/30">
                <div className="p-6 sm:p-7 flex-1 flex flex-col">
                  <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                    <div className="flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-sky-900" />
                      <h4 className="text-sm font-bold text-slate-900">
                        Confidential Dialogue Channel
                      </h4>
                    </div>
                    <span className="text-[11px] text-slate-400 font-medium">
                      Encrypted End-to-End
                    </span>
                  </div>

                  <p className="text-xs text-slate-500 mt-2 mb-4">
                    Exchange secure inquiries or provide additional evidence directly with your assigned officer without revealing your identity.
                  </p>

                  {/* Messages Scroll Area */}
                  <div className="space-y-3 flex-1 overflow-y-auto max-h-[420px] pr-1">
                    {activeCase.messages.map((msg) => {
                      const isReporter = msg.sender === 'Reporter';
                      return (
                        <div
                          key={msg.id}
                          className={`flex flex-col ${isReporter ? 'items-end' : 'items-start'}`}
                        >
                          <div className="text-[10px] text-slate-400 mb-1 flex items-center gap-1.5 px-1 font-mono">
                            <span>{msg.sender === 'Reporter' ? 'You (Reporter)' : 'Ethics / Care Officer'}</span>
                            <span>·</span>
                            <span>{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                          </div>

                          <div
                            className={`p-3.5 rounded-2xl max-w-[90%] text-xs leading-relaxed ${
                              isReporter
                                ? 'bg-sky-900 text-white rounded-br-xs'
                                : 'bg-white text-slate-800 border border-slate-200 rounded-bl-xs shadow-2xs'
                            }`}
                          >
                            {msg.content}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Reply Form */}
                <div className="p-4 sm:p-5 border-t border-slate-200 bg-white">
                  <form onSubmit={handleSendMessage} className="space-y-2">
                    <textarea
                      rows={2}
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Type a confidential reply or provide additional details..."
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-sky-900"
                    />
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] text-slate-400">
                        Identity stays shielded
                      </span>
                      <button
                        type="submit"
                        disabled={isSending || !newMessage.trim()}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-sky-900 hover:bg-sky-800 rounded-lg transition-colors cursor-pointer disabled:opacity-40"
                      >
                        <Send className="w-3 h-3" />
                        <span>Send Note</span>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
