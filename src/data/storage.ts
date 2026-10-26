import { ConcernCase, CaseMessage, ConcernStatus } from '../types/concern';
import { INITIAL_CASES } from './initialData';

const STORAGE_KEY = 'emc_voice_cases_v1';

export function getStoredCases(): ConcernCase[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_CASES));
      return INITIAL_CASES;
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_CASES));
      return INITIAL_CASES;
    }
    return parsed;
  } catch {
    return INITIAL_CASES;
  }
}

export function saveCases(cases: ConcernCase[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cases));
  } catch (err) {
    console.error('Failed to save to localStorage', err);
  }
}

export function generateTrackingToken(): string {
  const digits = Math.floor(1000 + Math.random() * 9000);
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const c1 = chars.charAt(Math.floor(Math.random() * chars.length));
  const c2 = chars.charAt(Math.floor(Math.random() * chars.length));
  return `EMC-${digits}-${c1}${c2}`;
}

export function addConcernCase(newCase: Omit<ConcernCase, 'id' | 'trackingToken' | 'createdAt' | 'status' | 'messages' | 'timeline' | 'assignedOfficer'>): ConcernCase {
  const cases = getStoredCases();
  const token = generateTrackingToken();
  const now = new Date();
  const formattedDate = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) + ' · ' + now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

  const createdCase: ConcernCase = {
    ...newCase,
    id: token,
    trackingToken: token,
    createdAt: now.toISOString(),
    status: 'Received',
    assignedOfficer: 'Ombudsperson Review Triage Desk',
    messages: [
      {
        id: 'msg-initial',
        sender: 'Reporter',
        content: `Concern registered securely. Category: ${newCase.category}. Priority: ${newCase.severity}.`,
        timestamp: now.toISOString(),
      },
      {
        id: 'msg-ack',
        sender: 'Care Officer',
        content: `Your concern has been safely received under reference ${token}. Our care intake team will complete initial risk appraisal within 24 hours. You can return to this page anytime using your tracking key to view confidential updates or provide additional information.`,
        timestamp: new Date(now.getTime() + 1000).toISOString(),
      },
    ],
    timeline: [
      {
        stage: 'Concern Received & Identity Shielded',
        date: formattedDate,
        note: newCase.isAnonymous
          ? 'Registered anonymously with 0 identity artifacts recorded.'
          : 'Confidential case registered with secure reporter channel.',
        status: 'completed',
      },
      {
        stage: 'Care & Safety Triage',
        date: 'Initiated immediately',
        note: 'Ethics Ombuds assigned to evaluate urgency and protective measures.',
        status: 'current',
      },
      {
        stage: 'Confidential Review / Inquiry',
        date: 'Pending triage',
        note: 'Independent review of facts and standard adherence.',
        status: 'upcoming',
      },
      {
        stage: 'Protective & Corrective Action',
        date: 'Pending review',
        note: 'Implementing structural, leadership, or clinical remedies.',
        status: 'upcoming',
      },
      {
        stage: 'Resolution & Restorative Closeout',
        date: 'Final stage',
        note: 'Outcome shared with reporter via secure token.',
        status: 'upcoming',
      },
    ],
  };

  const updated = [createdCase, ...cases];
  saveCases(updated);
  return createdCase;
}

export function getCaseByToken(token: string): ConcernCase | undefined {
  const cases = getStoredCases();
  const clean = token.trim().toUpperCase();
  return cases.find(c => c.trackingToken.toUpperCase() === clean || c.id.toUpperCase() === clean);
}

export function addMessageToCase(token: string, message: { sender: 'Reporter' | 'Care Officer'; content: string }): ConcernCase | null {
  const cases = getStoredCases();
  const clean = token.trim().toUpperCase();
  const caseIndex = cases.findIndex(c => c.trackingToken.toUpperCase() === clean || c.id.toUpperCase() === clean);

  if (caseIndex === -1) return null;

  const currentCase = cases[caseIndex];
  const newMsg: CaseMessage = {
    id: `msg-${Date.now()}`,
    sender: message.sender,
    content: message.content,
    timestamp: new Date().toISOString(),
  };

  const updatedCase: ConcernCase = {
    ...currentCase,
    messages: [...currentCase.messages, newMsg],
  };

  cases[caseIndex] = updatedCase;
  saveCases(cases);
  return updatedCase;
}

export function updateCaseStatus(token: string, status: ConcernStatus, note?: string): ConcernCase | null {
  const cases = getStoredCases();
  const clean = token.trim().toUpperCase();
  const caseIndex = cases.findIndex(c => c.trackingToken.toUpperCase() === clean || c.id.toUpperCase() === clean);

  if (caseIndex === -1) return null;

  const currentCase = cases[caseIndex];
  const now = new Date();
  const formattedDate = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) + ' · ' + now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

  // Update timeline stages
  const timeline = currentCase.timeline.map((evt, idx) => {
    if (status === 'Care Triage' && idx <= 1) return { ...evt, status: 'completed' as const };
    if (status === 'Under Review' && idx <= 2) return { ...evt, status: 'completed' as const };
    if (status === 'Corrective Action' && idx <= 3) return { ...evt, status: 'completed' as const };
    if (status === 'Resolved') return { ...evt, status: 'completed' as const };
    return evt;
  });

  const updatedMessages = [...currentCase.messages];
  if (note) {
    updatedMessages.push({
      id: `msg-${Date.now()}`,
      sender: 'Care Officer',
      content: `Status updated to [${status}]: ${note}`,
      timestamp: now.toISOString(),
    });
  }

  const updatedCase: ConcernCase = {
    ...currentCase,
    status,
    timeline,
    messages: updatedMessages,
    resolutionSummary: status === 'Resolved' && note ? note : currentCase.resolutionSummary,
  };

  cases[caseIndex] = updatedCase;
  saveCases(cases);
  return updatedCase;
}

export function resetToSeedData(): ConcernCase[] {
  saveCases(INITIAL_CASES);
  return INITIAL_CASES;
}
