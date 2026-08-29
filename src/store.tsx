import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import type {
  Announcement,
  CheckInRecord,
  Evaluation,
  Judge,
  Participant,
  Priority,
  Project,
  Role,
  RubricScore,
  Team,
  TimelineEvent,
  ToastMessage,
} from './types';
import { RUBRIC } from './types';
import {
  initialAnnouncements,
  initialCheckIns,
  initialEvaluations,
  initialJudges,
  initialParticipants,
  initialProjects,
  initialTeams,
  initialTimeline,
} from './data';

interface AppState {
  role: Role;
  setRole: (r: Role) => void;
  entered: boolean;
  setEntered: (v: boolean) => void;

  participants: Participant[];
  teams: Team[];
  projects: Project[];
  announcements: Announcement[];
  judges: Judge[];
  evaluations: Evaluation[];
  timeline: TimelineEvent[];
  checkIns: CheckInRecord[];

  activeJudgeId: string;
  setActiveJudgeId: (id: string) => void;
  activeParticipantId: string;
  setActiveParticipantId: (id: string) => void;

  toasts: ToastMessage[];
  toast: (t: Omit<ToastMessage, 'id'>) => void;
  dismissToast: (id: string) => void;

  registerParticipant: (p: Omit<Participant, 'id' | 'regId' | 'checkedIn' | 'checkedInAt' | 'registeredAt' | 'matchScore' | 'avatarColor'>) => Participant;
  checkIn: (regId: string) => { ok: boolean; message: string; participant?: Participant };
  manualCheckIn: (regId: string) => { ok: boolean; message: string; participant?: Participant };

  createTeam: (name: string, captainId: string, memberIds: string[]) => Team;
  inviteToTeam: (teamId: string, participantId: string) => void;
  connectParticipant: (participantId: string) => void;

  publishAnnouncement: (a: { title: string; message: string; priority: Priority; venue: string }) => void;

  submitEvaluation: (projectId: string, judgeId: string, scores: RubricScore, feedback: string) => void;

  getTeamById: (id: string | null) => Team | undefined;
  getProjectById: (id: string) => Project | undefined;
  getParticipantById: (id: string) => Participant | undefined;
  getEvaluationsForProject: (projectId: string) => Evaluation[];
  getLeaderboard: () => LeaderboardRow[];
}

export interface LeaderboardRow {
  rank: number;
  team: Team;
  project: Project;
  scores: RubricScore;
  total: number;
  evalCount: number;
}

const AVATAR_COLORS = [
  'from-brand-500 to-brand-400',
  'from-violet-500 to-violet-400',
  'from-emerald-500 to-emerald-400',
  'from-amber-500 to-amber-400',
  'from-rose-500 to-rose-400',
  'from-cyan-500 to-cyan-400',
  'from-fuchsia-500 to-fuchsia-400',
  'from-teal-500 to-teal-400',
];

const AppContext = createContext<AppState | null>(null);

let toastCounter = 0;

export function AppProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<Role>('organizer');
  const [entered, setEntered] = useState(false);

  const [participants, setParticipants] = useState<Participant[]>(initialParticipants);
  const [teams, setTeams] = useState<Team[]>(initialTeams);
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [announcements, setAnnouncements] = useState<Announcement[]>(initialAnnouncements);
  const [judges] = useState<Judge[]>(initialJudges);
  const [evaluations, setEvaluations] = useState<Evaluation[]>(initialEvaluations);
  const [timeline] = useState<TimelineEvent[]>(initialTimeline);
  const [checkIns, setCheckIns] = useState<CheckInRecord[]>(initialCheckIns);

  const [activeJudgeId, setActiveJudgeId] = useState('j1');
  const [activeParticipantId, setActiveParticipantId] = useState('p1');

  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const dismissToast = useCallback((id: string) => {
    setToasts((t) => t.filter((x) => x.id !== id));
  }, []);

  const toast = useCallback(
    (t: Omit<ToastMessage, 'id'>) => {
      const id = `t${++toastCounter}`;
      setToasts((prev) => [...prev, { ...t, id }]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((x) => x.id !== id));
      }, 4000);
    },
    [],
  );

  const getTeamById = useCallback((id: string | null) => teams.find((t) => t.id === id), [teams]);
  const getProjectById = useCallback((id: string) => projects.find((p) => p.id === id), [projects]);
  const getParticipantById = useCallback((id: string) => participants.find((p) => p.id === id), [participants]);
  const getEvaluationsForProject = useCallback(
    (projectId: string) => evaluations.filter((e) => e.projectId === projectId),
    [evaluations],
  );

  const registerParticipant: AppState['registerParticipant'] = useCallback((p) => {
    const id = `p${Date.now()}`;
    const regId = `ES26-${String(participants.length + 1).padStart(4, '0')}`;
    const newP: Participant = {
      ...p,
      id,
      regId,
      checkedIn: false,
      checkedInAt: null,
      registeredAt: new Date().toISOString(),
      matchScore: Math.floor(70 + Math.random() * 25),
      avatarColor: AVATAR_COLORS[participants.length % AVATAR_COLORS.length],
    };
    setParticipants((prev) => [newP, ...prev]);
    return newP;
  }, [participants.length]);

  const doCheckIn = useCallback(
    (regId: string): { ok: boolean; message: string; participant?: Participant } => {
      const participant = participants.find((p) => p.regId.toLowerCase() === regId.toLowerCase().trim());
      if (!participant) return { ok: false, message: 'No participant found with that registration ID.' };
      if (participant.checkedIn) return { ok: false, message: `${participant.name} is already checked in.`, participant };

      setParticipants((prev) =>
        prev.map((p) => (p.id === participant.id ? { ...p, checkedIn: true, checkedInAt: new Date().toISOString() } : p)),
      );
      setCheckIns((prev) => [
        {
          id: `c${Date.now()}`,
          participantId: participant.id,
          participantName: participant.name,
          regId: participant.regId,
          college: participant.college,
          time: new Date().toISOString(),
        },
        ...prev,
      ]);
      return { ok: true, message: `${participant.name} checked in successfully.`, participant };
    },
    [participants],
  );

  const checkIn = doCheckIn;
  const manualCheckIn = doCheckIn;

  const createTeam: AppState['createTeam'] = useCallback(
    (name, captainId, memberIds) => {
      const id = `t${Date.now()}`;
      const team: Team = {
        id,
        name,
        projectId: '',
        memberIds: [...new Set([captainId, ...memberIds])],
        captainId,
        formedAt: new Date().toISOString(),
      };
      setTeams((prev) => [...prev, team]);
      setParticipants((prev) =>
        prev.map((p) =>
          team.memberIds.includes(p.id) ? { ...p, teamStatus: 'in_team', teamId: id } : p,
        ),
      );
      return team;
    },
    [],
  );

  const inviteToTeam = useCallback((teamId: string, participantId: string) => {
    setTeams((prev) =>
      prev.map((t) =>
        t.id === teamId && !t.memberIds.includes(participantId)
          ? { ...t, memberIds: [...t.memberIds, participantId] }
          : t,
      ),
    );
    setParticipants((prev) =>
      prev.map((p) => (p.id === participantId ? { ...p, teamStatus: 'in_team', teamId } : p)),
    );
  }, []);

  const connectParticipant = useCallback((participantId: string) => {
    setParticipants((prev) =>
      prev.map((p) => (p.id === participantId ? { ...p, teamStatus: 'looking' } : p)),
    );
  }, []);

  const publishAnnouncement: AppState['publishAnnouncement'] = useCallback((a) => {
    const ann: Announcement = {
      id: `a${Date.now()}`,
      title: a.title,
      message: a.message,
      time: new Date().toISOString(),
      priority: a.priority,
      venue: a.venue,
      organizer: 'EventSphere Operations',
    };
    setAnnouncements((prev) => [ann, ...prev]);
  }, []);

  const submitEvaluation: AppState['submitEvaluation'] = useCallback(
    (projectId, judgeId, scores, feedback) => {
      const judge = judges.find((j) => j.id === judgeId);
      const total = RUBRIC.reduce((sum, r) => sum + (scores[r.key] || 0), 0);
      const eval_: Evaluation = {
        id: `e${Date.now()}`,
        projectId,
        judgeId,
        judgeName: judge?.name ?? 'Judge',
        scores,
        feedback,
        total,
        submittedAt: new Date().toISOString(),
      };
      setEvaluations((prev) => [...prev.filter((e) => !(e.projectId === projectId && e.judgeId === judgeId)), eval_]);
    },
    [judges],
  );

  const getLeaderboard = useCallback((): LeaderboardRow[] => {
    const submitted = projects.filter((p) => p.status === 'submitted' || p.status === 'late');
    const rows = submitted
      .map((project) => {
        const team = teams.find((t) => t.id === project.teamId);
        const evals = evaluations.filter((e) => e.projectId === project.id);
        if (!team || evals.length === 0) return null;
        const avg: RubricScore = {
          innovation: Math.round(evals.reduce((s, e) => s + e.scores.innovation, 0) / evals.length),
          technical: Math.round(evals.reduce((s, e) => s + e.scores.technical, 0) / evals.length),
          impact: Math.round(evals.reduce((s, e) => s + e.scores.impact, 0) / evals.length),
          ux: Math.round(evals.reduce((s, e) => s + e.scores.ux, 0) / evals.length),
          presentation: Math.round(evals.reduce((s, e) => s + e.scores.presentation, 0) / evals.length),
        };
        const total = avg.innovation + avg.technical + avg.impact + avg.ux + avg.presentation;
        return { team, project, scores: avg, total, evalCount: evals.length };
      })
      .filter((r): r is LeaderboardRow => r !== null)
      .sort((a, b) => b.total - a.total);
    return rows.map((r, i) => ({ ...r, rank: i + 1 }));
  }, [projects, teams, evaluations]);

  const value = useMemo<AppState>(
    () => ({
      role,
      setRole,
      entered,
      setEntered,
      participants,
      teams,
      projects,
      announcements,
      judges,
      evaluations,
      timeline,
      checkIns,
      activeJudgeId,
      setActiveJudgeId,
      activeParticipantId,
      setActiveParticipantId,
      toasts,
      toast,
      dismissToast,
      registerParticipant,
      checkIn,
      manualCheckIn,
      createTeam,
      inviteToTeam,
      connectParticipant,
      publishAnnouncement,
      submitEvaluation,
      getTeamById,
      getProjectById,
      getParticipantById,
      getEvaluationsForProject,
      getLeaderboard,
    }),
    [role, entered, participants, teams, projects, announcements, judges, evaluations, timeline, checkIns, activeJudgeId, activeParticipantId, toasts, toast, dismissToast, registerParticipant, checkIn, manualCheckIn, createTeam, inviteToTeam, connectParticipant, publishAnnouncement, submitEvaluation, getTeamById, getProjectById, getParticipantById, getEvaluationsForProject, getLeaderboard],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
