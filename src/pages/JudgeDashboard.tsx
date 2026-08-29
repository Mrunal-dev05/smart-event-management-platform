import { Gavel, Clock, CheckCircle2, Star, ArrowRight, FileCode2 } from 'lucide-react';
import { useApp } from '../store';
import { Badge, SectionHeader, Avatar } from '@/components/ui';
import type { PageProps } from './types';

export function JudgeDashboard({ onNavigate }: PageProps) {
  const { judges, projects, evaluations, activeJudgeId, getTeamById } = useApp();
  const judge = judges.find((j) => j.id === activeJudgeId) ?? judges[0];
  const myEvals = evaluations.filter((e) => e.judgeId === judge.id);
  const assigned = judge.assignedProjectIds.map((id) => projects.find((p) => p.id === id)).filter(Boolean);
  const pending = assigned.filter((p) => !myEvals.some((e) => e.projectId === p!.id));
  const completed = assigned.filter((p) => myEvals.some((e) => e.projectId === p!.id));
  const avgScore = myEvals.length ? (myEvals.reduce((s, e) => s + e.total, 0) / myEvals.length).toFixed(1) : '—';

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Welcome */}
      <div className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-gradient-to-br from-amber-500/10 via-ink-800/80 to-violet-500/10 p-6">
        <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-amber-500/10 blur-3xl" />
        <div className="relative flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Avatar name={judge.name} color={judge.avatarColor} size="lg" />
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-amber-400">Judge Dashboard</p>
              <h2 className="mt-1 font-display text-xl font-bold text-white">{judge.name}</h2>
              <div className="mt-1 flex flex-wrap gap-1.5">
                {judge.expertise.map((e) => <Badge key={e} variant="violet">{e}</Badge>)}
              </div>
            </div>
          </div>
          <button onClick={() => onNavigate('judging')} className="btn-primary">
            <Gavel size={16} /> Start Judging <ArrowRight size={16} />
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <div className="card p-4">
          <div className="flex items-center gap-2 text-ink-400"><FileCode2 size={16} /><span className="text-xs">Assigned</span></div>
          <p className="mt-2 font-display text-2xl font-bold text-white">{assigned.length}</p>
        </div>
        <div className="card p-4">
          <div className="flex items-center gap-2 text-ink-400"><Clock size={16} /><span className="text-xs">Pending</span></div>
          <p className="mt-2 font-display text-2xl font-bold text-amber-400">{pending.length}</p>
        </div>
        <div className="card p-4">
          <div className="flex items-center gap-2 text-ink-400"><CheckCircle2 size={16} /><span className="text-xs">Completed</span></div>
          <p className="mt-2 font-display text-2xl font-bold text-emerald-400">{completed.length}</p>
        </div>
        <div className="card p-4">
          <div className="flex items-center gap-2 text-ink-400"><Star size={16} /><span className="text-xs">Avg Score</span></div>
          <p className="mt-2 font-display text-2xl font-bold text-brand-400">{avgScore}</p>
        </div>
      </div>

      {/* Pending quick action */}
      <div>
        <p className="section-title mb-3">Pending Evaluations</p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {pending.map((p) => {
            const proj = p!;
            const team = getTeamById(proj.teamId);
            return (
              <div key={proj.id} className="card card-hover p-5">
                <div className="flex items-start justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10 text-amber-400">
                    <FileCode2 size={18} />
                  </div>
                  <Badge variant="warning">Pending</Badge>
                </div>
                <p className="mt-3 font-display text-base font-semibold text-white">{proj.title}</p>
                <p className="text-xs text-ink-400">{team?.name ?? 'Unassigned'} · {proj.category}</p>
                <p className="mt-2 text-xs text-ink-300 line-clamp-2">{proj.description}</p>
                <button onClick={() => onNavigate('judging')} className="btn-primary mt-4 w-full">
                  <Gavel size={14} /> Evaluate Now
                </button>
              </div>
            );
          })}
          {pending.length === 0 && (
            <div className="card col-span-full p-8 text-center">
              <CheckCircle2 size={28} className="mx-auto mb-2 text-emerald-400" />
              <p className="text-sm text-ink-300">All evaluations complete!</p>
            </div>
          )}
        </div>
      </div>

      {/* Completed */}
      {completed.length > 0 && (
        <div>
          <p className="section-title mb-3">Completed Evaluations</p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {completed.map((p) => {
              const proj = p!;
              const team = getTeamById(proj.teamId);
              const eval_ = myEvals.find((e) => e.projectId === proj.id);
              return (
                <div key={proj.id} className="card p-5">
                  <div className="flex items-start justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
                      <CheckCircle2 size={18} />
                    </div>
                    <Badge variant="success">Scored</Badge>
                  </div>
                  <p className="mt-3 font-display text-base font-semibold text-white">{proj.title}</p>
                  <p className="text-xs text-ink-400">{team?.name ?? 'Unassigned'} · {proj.category}</p>
                  {eval_ && (
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-xs text-ink-300">Total</span>
                      <span className="font-display text-xl font-bold text-emerald-400">{eval_.total}<span className="text-sm text-ink-400">/100</span></span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
