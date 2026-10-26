import React, { useState } from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  Clock,
  Filter,
  Search,
  MessageSquare,
  AlertTriangle,
  RotateCcw,
  X,
  Send,
  Eye,
  SlidersHorizontal,
} from 'lucide-react';
import { ConcernCase, ConcernStatus } from '../types/concern';
import { getStoredCases, updateCaseStatus, addMessageToCase, resetToSeedData } from '../data/storage';
import { TRUST_METRICS } from '../data/initialData';

interface CareOfficerPortalProps {
  isOpen: boolean;
  onClose: () => void;
  onCaseSelectedInTracker: (token: string) => void;
}

export const CareOfficerPortal: React.FC<CareOfficerPortalProps> = ({
  isOpen,
  onClose,
  onCaseSelectedInTracker,
}) => {
  const [cases, setCases] = useState<ConcernCase[]>(() => getStoredCases());
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCase, setSelectedCase] = useState<ConcernCase | null>(null);

  // Status update state inside detail modal
  const [statusToUpdate, setStatusToUpdate] = useState<ConcernStatus>('Care Triage');
  const [statusNote, setStatusNote] = useState<string>('');
  const [officerReply, setOfficerReply] = useState<string>('');

  if (!isOpen) return null;

  const handleRefresh = () => {
    setCases(getStoredCases());
  };

  const handleResetData = () => {
    if (confirm('Reset cases back to initial demonstration state?')) {
      const reset = resetToSeedData();
      setCases(reset);
      setSelectedCase(null);
    }
  };

  // Filter cases
  const filteredCases = cases.filter((c) => {
    const matchesStatus =
      filterStatus === 'all'
        ? true
        : filterStatus === 'urgent'
        ? c.severity === 'Urgent' || c.severity === 'Immediate Safety Risk'
        : c.status.toLowerCase() === filterStatus.toLowerCase();

    const matchesSearch =
      searchQuery.trim() === '' ||
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.trackingToken.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesStatus && matchesSearch;
  });

  const handleOpenDetail = (c: ConcernCase) => {
    setSelectedCase(c);
    setStatusToUpdate(c.status);
    setStatusNote('');
    setOfficerReply('');
  };

  const handleApplyStatusChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCase) return;

    const updated = updateCaseStatus(selectedCase.trackingToken, statusToUpdate, statusNote.trim() || undefined);
    if (updated) {
      setSelectedCase(updated);
      handleRefresh();
      setStatusNote('');
    }
  };

  const handleSendOfficerReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCase || !officerReply.trim()) return;

    const updated = addMessageToCase(selectedCase.trackingToken, {
      sender: 'Care Officer',
      content: officerReply.trim(),
    });

    if (updated) {
      setSelectedCase(updated);
      handleRefresh();
      setOfficerReply('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-5xl my-6 flex flex-col max-h-[92vh] overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-sky-800 text-white">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white">
                  Ombudsperson & Ethics Review Workspace
                </h3>
                <span className="text-[11px] font-mono text-sky-200 bg-sky-950/80 px-2 py-0.5 rounded border border-sky-800">
                  Confidential Internal
                </span>
              </div>
              <p className="text-xs text-slate-300">
                Authorized review board for EMC Voice speak-up cases
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleResetData}
              className="px-2.5 py-1 text-xs text-slate-300 hover:text-white hover:bg-slate-800 rounded transition-colors cursor-pointer flex items-center gap-1"
              title="Reset demonstration data"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset Demo</span>
            </button>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white p-1.5 rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Metrics Banner */}
        <div className="px-6 py-3.5 bg-slate-50 border-b border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div>
            <span className="text-slate-500 block">Active Intake Queue</span>
            <span className="font-bold text-slate-900 text-sm font-mono mt-0.5 block">
              {cases.length} cases
            </span>
          </div>
          <div>
            <span className="text-slate-500 block">Response Time SLA</span>
            <span className="font-bold text-emerald-700 text-sm font-mono mt-0.5 block">
              {TRUST_METRICS.averageResponseHours} (94.6% compliant)
            </span>
          </div>
          <div>
            <span className="text-slate-500 block">Reporter Anonymity</span>
            <span className="font-bold text-slate-900 text-sm font-mono mt-0.5 block">
              {TRUST_METRICS.anonymityRate} shielded
            </span>
          </div>
          <div>
            <span className="text-slate-500 block">Retaliation Zero Tolerance</span>
            <span className="font-bold text-slate-900 text-sm font-mono mt-0.5 block">
              100% verified
            </span>
          </div>
        </div>

        {/* Controls Bar: Filters & Search */}
        <div className="p-4 sm:px-6 bg-white border-b border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Segmented filter tabs */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg w-full sm:w-auto overflow-x-auto text-xs">
            {[
              { id: 'all', label: 'All Cases' },
              { id: 'urgent', label: 'Urgent / Risk' },
              { id: 'Under Review', label: 'Under Review' },
              { id: 'Corrective Action', label: 'Action Taken' },
              { id: 'Resolved', label: 'Resolved' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilterStatus(tab.id)}
                className={`px-3 py-1.5 font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                  filterStatus === tab.id
                    ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-72">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by token, department, or keyword"
              className="w-full pl-9 pr-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-sky-900"
            />
          </div>
        </div>

        {/* Case Queue Table */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-50/50">
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 font-semibold uppercase tracking-wider text-[11px] border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-4">Case Token</th>
                    <th className="py-3 px-4">Category & Department</th>
                    <th className="py-3 px-4">Title Summary</th>
                    <th className="py-3 px-4">Severity</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Date</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredCases.map((c) => (
                    <tr
                      key={c.id}
                      className="hover:bg-slate-50/80 transition-colors cursor-pointer group"
                      onClick={() => handleOpenDetail(c)}
                    >
                      <td className="py-3.5 px-4 font-mono font-bold text-sky-950">
                        {c.trackingToken}
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-slate-900">{c.category}</div>
                        <div className="text-[11px] text-slate-500">{c.department}</div>
                      </td>
                      <td className="py-3.5 px-4 max-w-xs truncate text-slate-700 font-medium">
                        {c.title}
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`font-semibold ${
                            c.severity === 'Immediate Safety Risk' || c.severity === 'Urgent'
                              ? 'text-rose-700'
                              : c.severity === 'Moderate'
                              ? 'text-amber-700'
                              : 'text-slate-600'
                          }`}
                        >
                          {c.severity}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="font-medium text-slate-700">
                          {c.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-slate-500 font-mono text-[11px] whitespace-nowrap">
                        {new Date(c.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-3.5 px-4 text-right whitespace-nowrap">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpenDetail(c);
                          }}
                          className="px-2.5 py-1 text-xs font-semibold text-sky-900 hover:bg-sky-50 rounded border border-slate-200 transition-colors cursor-pointer"
                        >
                          Review Case
                        </button>
                      </td>
                    </tr>
                  ))}
                  {filteredCases.length === 0 && (
                    <tr>
                      <td colSpan={7} className="py-8 text-center text-xs text-slate-500">
                        No cases match the selected filter or search query.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Detail Inspection Modal */}
        {selectedCase && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col my-6">
              {/* Top modal bar */}
              <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
                    <span>{selectedCase.trackingToken}</span>
                    <span>·</span>
                    <span>{selectedCase.category}</span>
                    <span>·</span>
                    <span>{selectedCase.isAnonymous ? '100% Anonymous' : `Confidential (${selectedCase.reporterName})`}</span>
                  </div>
                  <h4 className="text-base font-bold text-slate-900 mt-0.5">
                    {selectedCase.title}
                  </h4>
                </div>
                <button
                  onClick={() => setSelectedCase(null)}
                  className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs">
                {/* Description */}
                <div>
                  <div className="font-semibold text-slate-900 uppercase tracking-wider text-[11px] mb-1">
                    Concern Narrative:
                  </div>
                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-slate-800 leading-relaxed whitespace-pre-wrap">
                    {selectedCase.description}
                  </div>
                </div>

                {selectedCase.desiredOutcome && (
                  <div>
                    <div className="font-semibold text-slate-900 uppercase tracking-wider text-[11px] mb-1">
                      Reporter's Desired Safe Remedy:
                    </div>
                    <div className="p-3 bg-sky-50 rounded-lg border border-sky-100 text-slate-700">
                      {selectedCase.desiredOutcome}
                    </div>
                  </div>
                )}

                {/* Status Triage Form */}
                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70">
                  <h5 className="font-bold text-slate-900 mb-2">
                    Update Investigation & Action Stage
                  </h5>
                  <form onSubmit={handleApplyStatusChange} className="space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-slate-700 font-semibold mb-1">
                          Set Case Status:
                        </label>
                        <select
                          value={statusToUpdate}
                          onChange={(e) => setStatusToUpdate(e.target.value as ConcernStatus)}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-sky-900"
                        >
                          <option value="Received">Received</option>
                          <option value="Care Triage">Care Triage</option>
                          <option value="Under Review">Under Review</option>
                          <option value="Corrective Action">Corrective Action</option>
                          <option value="Resolved">Resolved</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-slate-700 font-semibold mb-1">
                          Official Note to Reporter:
                        </label>
                        <input
                          type="text"
                          value={statusNote}
                          onChange={(e) => setStatusNote(e.target.value)}
                          placeholder="e.g. Biomedical equipment inspected; replacement deployed."
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-sky-900"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="px-4 py-2 bg-sky-900 text-white font-semibold rounded-lg hover:bg-sky-800 transition-colors cursor-pointer"
                      >
                        Apply Status Update
                      </button>
                    </div>
                  </form>
                </div>

                {/* Direct Message back to Reporter */}
                <div className="p-4 rounded-xl border border-slate-200 bg-white">
                  <h5 className="font-bold text-slate-900 mb-1 flex items-center gap-1.5">
                    <MessageSquare className="w-4 h-4 text-sky-900" />
                    <span>Send Message to Reporter's Safe Channel</span>
                  </h5>
                  <p className="text-slate-500 mb-3 text-[11px]">
                    The reporter can view this note in their confidential case tracker.
                  </p>

                  <form onSubmit={handleSendOfficerReply} className="space-y-2">
                    <textarea
                      rows={2}
                      value={officerReply}
                      onChange={(e) => setOfficerReply(e.target.value)}
                      placeholder="Write an ombuds update or ask a clarifying question..."
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-sky-900"
                    />
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        disabled={!officerReply.trim()}
                        className="px-4 py-1.5 bg-sky-900 text-white font-semibold rounded-lg hover:bg-sky-800 transition-colors cursor-pointer disabled:opacity-40"
                      >
                        Dispatch Note
                      </button>
                    </div>
                  </form>

                  {/* Existing thread preview */}
                  <div className="mt-4 pt-3 border-t border-slate-100 space-y-2">
                    <div className="font-semibold text-slate-700 text-[11px]">
                      Message History ({selectedCase.messages.length}):
                    </div>
                    {selectedCase.messages.map((m) => (
                      <div key={m.id} className="p-2.5 rounded-lg bg-slate-50 text-[11px] leading-relaxed">
                        <span className="font-bold text-slate-800">{m.sender}:</span> {m.content}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Modal footer */}
              <div className="px-6 py-3 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-xs">
                <button
                  onClick={() => {
                    onCaseSelectedInTracker(selectedCase.trackingToken);
                    setSelectedCase(null);
                    onClose();
                  }}
                  className="text-sky-900 hover:underline font-semibold cursor-pointer"
                >
                  Open in Public Tracker View →
                </button>
                <button
                  onClick={() => setSelectedCase(null)}
                  className="px-4 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold rounded-lg transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
