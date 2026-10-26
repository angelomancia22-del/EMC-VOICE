import { ConcernCase } from '../types/concern';

export const INITIAL_CASES: ConcernCase[] = [
  {
    id: 'EMC-4819-K2',
    trackingToken: 'EMC-4819-K2',
    title: 'Double-verification protocol bypass in high-alert pediatric medication unit',
    category: 'Patient & Clinical Safety',
    severity: 'Urgent',
    department: 'Pediatric Acute Care',
    location: 'West Wing, 3rd Floor',
    isAnonymous: true,
    description: 'During peak evening shift handovers, secondary barcode double-checks on pediatric IV drips were repeatedly bypassed due to severe understaffing and faulty terminal scanners. Three near-miss dosing alarms were logged without senior supervisor debrief.',
    incidentDate: '2026-10-18',
    witnessesOrInvolved: 'Evening nursing rotation shift B',
    evidenceNotes: 'Shift activity logs and 2 scanner malfunction tickets filed on Oct 14 and Oct 17.',
    desiredOutcome: 'Emergency recalibration/replacement of wireless scanners and interim supervisor presence during evening medication administration windows.',
    status: 'Corrective Action',
    createdAt: '2026-10-19T09:15:00Z',
    assignedOfficer: 'Dr. Elena Rostova (Lead Clinical Quality Ombuds)',
    messages: [
      {
        id: 'msg-1',
        sender: 'Reporter',
        content: 'I submitted this anonymously because staff are anxious about punitive blame rather than fixing the faulty equipment.',
        timestamp: '2026-10-19T09:18:00Z',
      },
      {
        id: 'msg-2',
        sender: 'Care Officer',
        content: 'Thank you for your courage. Your concern has been classified as high-priority Clinical Safety under our Non-Punitive Reporting Charter. Biomedical engineering has been dispatched to West Wing 3, and senior nursing leads are establishing temporary backup scanners.',
        timestamp: '2026-10-19T14:30:00Z',
      },
      {
        id: 'msg-3',
        sender: 'Reporter',
        content: 'The backup scanners arrived yesterday. Staff feel relieved that leadership took it as a system fix rather than disciplinary action.',
        timestamp: '2026-10-21T11:04:00Z',
      },
    ],
    timeline: [
      {
        stage: 'Concern Received & Shielded',
        date: 'Oct 19, 2026 · 09:15',
        note: 'Encrypted submission received. Reporter identity shielded with zero audit telemetry.',
        status: 'completed',
      },
      {
        stage: 'Clinical Care Triage',
        date: 'Oct 19, 2026 · 11:40',
        note: 'Assigned to Clinical Quality Ombudsperson. Risk rated Urgent.',
        status: 'completed',
      },
      {
        stage: 'System & Equipment Audit',
        date: 'Oct 20, 2026 · 16:00',
        note: 'Biomedical engineering inspected 4 barcode terminals. Replaced 2 defective optical units.',
        status: 'completed',
      },
      {
        stage: 'Corrective Protocol Deployed',
        date: 'Oct 22, 2026 · 10:00',
        note: 'Staffing relief pilot initiated during 18:00–21:00 medication administration window.',
        status: 'current',
      },
      {
        stage: 'Resolution & Audit Closeout',
        date: 'Pending follow-up inspection',
        note: 'Scheduled 14-day zero-near-miss validation audit.',
        status: 'upcoming',
      },
    ],
    actionTakenNotes: 'Biomedical engineering replaced 2 failing scanners. Added a floating charge nurse during peak 19:00 medication rounds.',
  },
  {
    id: 'EMC-9034-V7',
    trackingToken: 'EMC-9034-V7',
    title: 'Repeated micro-retaliation and exclusionary shift scheduling after safety audit input',
    category: 'Workplace Respect & Dignity',
    severity: 'Moderate',
    department: 'Surgical Services / Central Sterile',
    location: 'Building B, Lower Concourse',
    isAnonymous: false,
    reporterName: 'Confidential Staff Member',
    reporterEmail: 'confidential.contact@care-network.org',
    reporterRole: 'Sterile Processing Technician',
    description: 'After I pointed out autoclave temperature variance issues during the September quarterly review, my weekend rotation was abruptly switched without mandatory 72-hour notice, and I have been systematically excluded from team planning meetings.',
    incidentDate: '2026-10-12',
    witnessesOrInvolved: 'Direct unit scheduler and shift supervisor',
    evidenceNotes: 'Scheduling software timestamp comparison between pre-audit and post-audit rotations.',
    desiredOutcome: 'Independent schedule audit, enforcement of the EMC Anti-Retaliation Policy, and neutral scheduling oversight.',
    status: 'Under Review',
    createdAt: '2026-10-15T14:22:00Z',
    assignedOfficer: 'Marcus Sterling (Ethics & Workplace Fairness Officer)',
    messages: [
      {
        id: 'msg-4',
        sender: 'Reporter',
        content: 'I want to ensure my direct supervisor does not get a copy of this communication until the Ombuds team has reviewed the schedule logs.',
        timestamp: '2026-10-15T14:25:00Z',
      },
      {
        id: 'msg-5',
        sender: 'Care Officer',
        content: 'Rest assured: under Article 4 of our Whistleblower & Voice Charter, your submission is firewalled. The supervisor will not receive direct reporter details. We are pulling the scheduling audit trails independently.',
        timestamp: '2026-10-16T10:15:00Z',
      },
    ],
    timeline: [
      {
        stage: 'Concern Received',
        date: 'Oct 15, 2026 · 14:22',
        note: 'Confidential grievance logged with protected contact channel.',
        status: 'completed',
      },
      {
        stage: 'Anti-Retaliation Shield Activated',
        date: 'Oct 16, 2026 · 09:00',
        note: 'Ethics team established independent scheduling review lock.',
        status: 'completed',
      },
      {
        stage: 'Ombuds Fact-Finding Review',
        date: 'Oct 20, 2026 · 15:30',
        note: 'Reviewing 90-day shift allocation records across the sterile processing division.',
        status: 'current',
      },
      {
        stage: 'Remediation & Fair Scheduling Order',
        date: 'Scheduled Oct 28',
        note: 'Independent ombudsperson consultation with department director.',
        status: 'upcoming',
      },
      {
        stage: 'Case Resolution',
        date: 'Pending',
        note: 'Final restorative agreement and 6-month retaliation monitoring check.',
        status: 'upcoming',
      },
    ],
  },
  {
    id: 'EMC-6120-M4',
    trackingToken: 'EMC-6120-M4',
    title: 'Extreme cumulative fatigue and secondary trauma without psychological debrief',
    category: 'Mental Health & Staff Well-being',
    severity: 'Moderate',
    department: 'Emergency & Trauma Services',
    location: 'Ground Level Trauma Bays 1-4',
    isAnonymous: true,
    description: 'Following three consecutive multi-casualty incidents this month, staff have exhibited severe signs of acute secondary traumatic stress. Several residents and junior nurses broke down in supply closets. Management has not held a single clinical debrief or offered on-site mental wellness support.',
    incidentDate: '2026-10-05',
    desiredOutcome: 'Bring on-site trauma counseling support, establish mandatory 20-minute restorative quiet decompression pauses, and schedule a multidisciplinary reflective debrief.',
    status: 'Resolved',
    createdAt: '2026-10-08T18:40:00Z',
    assignedOfficer: 'Sarah Jenkins, LCSW (Employee Care & Psychological Safety)',
    messages: [
      {
        id: 'msg-6',
        sender: 'Reporter',
        content: 'People are scared to admit they are hurting because they do not want to appear weak in front of attending physicians.',
        timestamp: '2026-10-08T18:45:00Z',
      },
      {
        id: 'msg-7',
        sender: 'Care Officer',
        content: 'Thank you for sounding the alarm for your colleagues. Psychological safety is paramount. We have mobilized our Critical Incident Stress Management (CISM) team and scheduled drop-in reflective debrief sessions starting this Thursday.',
        timestamp: '2026-10-09T08:30:00Z',
      },
      {
        id: 'msg-8',
        sender: 'Care Officer',
        content: 'Update: CISM rounds completed with 38 staff participants. 2 dedicated quiet decompression spaces opened on Ground Floor West with peer support access.',
        timestamp: '2026-10-18T16:20:00Z',
      },
    ],
    timeline: [
      {
        stage: 'Concern Received',
        date: 'Oct 08, 2026 · 18:40',
        note: 'Anonymous well-being alert prioritized for CISM review.',
        status: 'completed',
      },
      {
        stage: 'CISM Rapid Mobilization',
        date: 'Oct 09, 2026 · 08:30',
        note: 'Trauma support specialists assigned to ED shift changes.',
        status: 'completed',
      },
      {
        stage: 'Decompression Rooms Opened',
        date: 'Oct 14, 2026 · 12:00',
        note: 'Quiet rooms 104 & 106 equipped with acoustic shielding and peer guidance literature.',
        status: 'completed',
      },
      {
        stage: 'Policy Institutionalized',
        date: 'Oct 18, 2026 · 17:00',
        note: 'Mandatory debrief protocols after Level 1 trauma incidents added to departmental policy.',
        status: 'completed',
      },
      {
        stage: 'Case Resolved with Commendation',
        date: 'Oct 20, 2026 · 10:00',
        note: 'Ongoing quarterly wellness checks established with ED leadership.',
        status: 'completed',
      },
    ],
    resolutionSummary: 'Critical Incident Stress Management team conducted 4 trauma decompression workshops. Two permanent staff quiet recovery spaces established with 24/7 peer counseling contact.',
  },
  {
    id: 'EMC-3185-R9',
    trackingToken: 'EMC-3185-R9',
    title: 'Unrepaired emergency stairwell lighting and door latch binding in North Wing',
    category: 'Facility, Environmental & Physical Safety',
    severity: 'Routine',
    department: 'Facilities & Environmental Health',
    location: 'North Tower, Stairwell B (Floors 2 to 4)',
    isAnonymous: true,
    description: 'Emergency exit lighting strobes erratically and the heavy fire door on the 3rd floor landing sticks in the jamb, requiring significant force to open during evacuation tests.',
    incidentDate: '2026-10-22',
    desiredOutcome: 'Immediate hinge readjustment, panic bar inspection, and replacement of the backup emergency ballast unit.',
    status: 'Care Triage',
    createdAt: '2026-10-23T11:05:00Z',
    assignedOfficer: 'David Chen (Director of Facilities Safety & Risk)',
    messages: [
      {
        id: 'msg-9',
        sender: 'Care Officer',
        content: 'Work order #FL-8831 dispatched to building maintenance for physical inspection today.',
        timestamp: '2026-10-23T14:10:00Z',
      },
    ],
    timeline: [
      {
        stage: 'Concern Received',
        date: 'Oct 23, 2026 · 11:05',
        note: 'Logged via mobile safe submission portal.',
        status: 'completed',
      },
      {
        stage: 'Facilities Work Order Assigned',
        date: 'Oct 23, 2026 · 14:10',
        note: 'Assigned to senior mechanical technician for physical inspection.',
        status: 'current',
      },
      {
        stage: 'Safety Verification',
        date: 'Expected Oct 27',
        note: 'Inspection of door pressure tolerance and emergency egress illumination.',
        status: 'upcoming',
      },
    ],
  },
];

export const TRUST_METRICS = {
  casesResolvedWithinSLA: '94.6%',
  averageResponseHours: '18.2h',
  anonymityRate: '78%',
  retaliationZeroToleranceAudits: '100%',
  totalConcernsAddressed: '1,248',
};

export const HOTLINES = [
  {
    name: '24/7 Crisis & Immediate Support Line',
    phone: '1-800-273-8255',
    subtext: 'Direct access to compassionate licensed counselors. Always confidential.',
    available: '24 hours / 7 days a week',
    badge: 'Immediate Help',
  },
  {
    name: 'Independent Ethics & Ombudsperson Line',
    phone: '1-888-362-8642',
    subtext: 'Third-party hosted call center outside institutional management chain.',
    available: 'Monday – Friday, 7 AM – 9 PM EST',
    badge: 'Confidential Third-Party',
  },
  {
    name: 'Staff Mental Well-being & EAP Care',
    phone: '1-800-555-0199',
    subtext: 'Free confidential counseling sessions, critical incident debriefing, family assistance.',
    available: '24/7 Dedicated Care Navigators',
    badge: 'Employee Assistance',
  },
  {
    name: 'Patient Safety & Clinical Advocacy Office',
    phone: '1-888-444-CARE',
    subtext: 'Patient safety officers and clinical ombudsmen for immediate care escalations.',
    available: 'Direct paging 24/7',
    badge: 'Clinical Safety',
  },
];

export const CONCERN_CATEGORIES: Array<{
  id: ConcernCase['category'];
  title: string;
  shortDesc: string;
  examples: string[];
}> = [
  {
    id: 'Patient & Clinical Safety',
    title: 'Patient & Clinical Safety',
    shortDesc: 'Standards of care, near-misses, protocol deviations, or clinical equipment issues.',
    examples: ['Medication dosing double-check bypass', 'Unsanitized equipment usage', 'Staffing ratios impairing vital signs monitoring'],
  },
  {
    id: 'Workplace Respect & Dignity',
    title: 'Workplace Respect & Dignity',
    shortDesc: 'Protection from harassment, bullying, discrimination, micro-aggressions, or retaliation.',
    examples: ['Shift assignment retaliation', 'Discriminatory remarks by leadership', 'Abuse of managerial power or intimidation'],
  },
  {
    id: 'Ethics, Fraud & Compliance',
    title: 'Ethics, Fraud & Compliance',
    shortDesc: 'Financial irregularities, billing issues, regulatory violations, or conflicts of interest.',
    examples: ['Inaccurate medical billing codes', 'Undisclosed vendor kickbacks or gifts', 'Falsification of regulatory compliance records'],
  },
  {
    id: 'Mental Health & Staff Well-being',
    title: 'Mental Health & Staff Well-being',
    shortDesc: 'Acute burnout, moral injury, secondary trauma, and psychological safety needs.',
    examples: ['Trauma debriefing deficits after critical incidents', 'Exhaustion leading to cognitive fog', 'Lack of safe decompression resources'],
  },
  {
    id: 'Facility, Environmental & Physical Safety',
    title: 'Facility & Physical Safety',
    shortDesc: 'Physical hazards, broken security locks, chemical spills, air quality, or egress blocks.',
    examples: ['Stuck fire exit doors', 'Biohazard receptacle overflows', 'Slippery unindicated chemical floor cleanings'],
  },
  {
    id: 'Policy & Process Improvement',
    title: 'Policy & Constructive Voice',
    shortDesc: 'Ideas, feedback, and proactive reforms to improve caring workflows and team equity.',
    examples: ['Streamlining redundant paperwork', 'Fairer shift bidding algorithm', 'Patient discharge empathy checklist'],
  },
];
