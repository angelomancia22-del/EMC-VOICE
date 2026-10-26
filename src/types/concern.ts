export type ConcernCategory =
  | 'Patient & Clinical Safety'
  | 'Workplace Respect & Dignity'
  | 'Ethics, Fraud & Compliance'
  | 'Mental Health & Staff Well-being'
  | 'Facility, Environmental & Physical Safety'
  | 'Policy & Process Improvement';

export type ConcernSeverity =
  | 'Routine'
  | 'Moderate'
  | 'Urgent'
  | 'Immediate Safety Risk';

export type ConcernStatus =
  | 'Received'
  | 'Care Triage'
  | 'Under Review'
  | 'Corrective Action'
  | 'Resolved';

export interface CaseMessage {
  id: string;
  sender: 'Reporter' | 'Care Officer';
  content: string;
  timestamp: string;
}

export interface CaseTimelineEvent {
  stage: string;
  date: string;
  note: string;
  status: 'completed' | 'current' | 'upcoming';
}

export interface ConcernCase {
  id: string;
  trackingToken: string;
  title: string;
  category: ConcernCategory;
  severity: ConcernSeverity;
  department: string;
  location: string;
  isAnonymous: boolean;
  reporterName?: string;
  reporterEmail?: string;
  reporterRole?: string;
  description: string;
  incidentDate?: string;
  witnessesOrInvolved?: string;
  evidenceNotes?: string;
  desiredOutcome?: string;
  status: ConcernStatus;
  createdAt: string;
  assignedOfficer: string;
  messages: CaseMessage[];
  timeline: CaseTimelineEvent[];
  resolutionSummary?: string;
  actionTakenNotes?: string;
}
