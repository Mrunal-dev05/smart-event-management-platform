export type Role = 'organizer' | 'participant' | 'judge';

export type ParticipantRole = 'Frontend' | 'Backend' | 'Fullstack' | 'Designer' | 'ML/AI' | 'DevOps' | 'Mobile';

export type Priority = 'high' | 'medium' | 'low';

export type SubmissionStatus = 'submitted' | 'pending' | 'late' | 'draft';

export interface Participant {
  id: string;
  regId: string;
  name: string;
  email: string;
  college: string;
  skills: string[];
  role: ParticipantRole;
  teamStatus: 'solo' | 'in_team' | 'looking';
  teamId: string | null;
  checkedIn: boolean;
  checkedInAt: string | null;
  registeredAt: string;
  avatarColor: string;
  projectInterests: string[];
  availability: string;
  matchScore: number;
  bio: string;
}

export interface Team {
  id: string;
  name: string;
  projectId: string;
  memberIds: string[];
  captainId: string;
  formedAt: string;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  teamId: string;
  status: SubmissionStatus;
  submittedAt: string | null;
  repoUrl: string;
  demoUrl: string;
}

export interface Announcement {
  id: string;
  title: string;
  message: string;
  time: string;
  priority: Priority;
  venue: string;
  organizer: string;
}

export interface RubricScore {
  innovation: number;
  technical: number;
  impact: number;
  ux: number;
  presentation: number;
}

export interface Evaluation {
  id: string;
  projectId: string;
  judgeId: string;
  judgeName: string;
  scores: RubricScore;
  feedback: string;
  total: number;
  submittedAt: string;
}

export interface Judge {
  id: string;
  name: string;
  expertise: string[];
  assignedProjectIds: string[];
  avatarColor: string;
}

export interface TimelineEvent {
  id: string;
  time: string;
  title: string;
  description: string;
  type: 'checkpoint' | 'meal' | 'talk' | 'social' | 'deadline';
  done: boolean;
}

export interface CheckInRecord {
  id: string;
  participantId: string;
  participantName: string;
  regId: string;
  college: string;
  time: string;
}

export interface ToastMessage {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
}

export const RUBRIC: { key: keyof RubricScore; label: string; max: number }[] = [
  { key: 'innovation', label: 'Innovation', max: 25 },
  { key: 'technical', label: 'Technical Implementation', max: 25 },
  { key: 'impact', label: 'Impact', max: 20 },
  { key: 'ux', label: 'UX', max: 15 },
  { key: 'presentation', label: 'Presentation', max: 15 },
];

export const CATEGORIES = [
  'AI/ML',
  'Web3',
  'HealthTech',
  'FinTech',
  'EdTech',
  'Sustainability',
  'Developer Tools',
  'AR/VR',
];

export const ALL_SKILLS = [
  'React',
  'TypeScript',
  'Node.js',
  'Python',
  'TensorFlow',
  'Figma',
  'Go',
  'Rust',
  'AWS',
  'Docker',
  'GraphQL',
  'Next.js',
  'Flutter',
  'PyTorch',
  'Solidity',
  'MongoDB',
  'PostgreSQL',
  'Kubernetes',
];

export const PROJECT_INTERESTS = [
  'AI Assistants',
  'Climate Tech',
  'Developer Tools',
  'Fintech',
  'Healthcare',
  'Education',
  'Gaming',
  'Web3',
];
