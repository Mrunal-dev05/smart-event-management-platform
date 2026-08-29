import { useMemo, useState } from 'react';
import { Gavel, FileCode2, CheckCircle2, Clock, Star, ArrowRight, X, MessageSquare } from 'lucide-react';
import { useApp } from '../store';
import { Badge, Modal, SectionHeader, ProgressBar, Avatar } from '@/components/ui';
import { RUBRIC } from '../types';
import type { RubricScore, Project } from '../types';
import { cn } from '../utils';

export function JudgePortal() {
  const { judges, projects, evaluations, submitEvaluation, toast, activeJudgeId, setActiveJudgeId, getTeamById } = useApp();
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [scores, setScores] = useState<RubricScore>({ innovation: 0, technical: 0, impact: 0, ux: 0, presentation: 0 });
  const [feedback, setFeedback] = useState('');

  const judge = judges.find((j) => j.id === activeJudgeId) ?? judges[0];
  const assigned = judge.assignedProjectIds
    .map((id) => projects.find((p) => p.id === id))
    .filter((p): p is Project => Boolean(p));

  const myEvals = evaluations.filter((e) => e.judgeId === judge.id);
  const pending = assigned.filter((p) => !myEvals.some((e) => e.projectId === p.id));
  const completed = assigned.filter((p) => myEvals.some((e) => e.projectId === p.id));
  const avgScore = myEvals.length ? (myEvals.reduce((s, e) => s + e.total, 0) / myEvals.length).toFixed(1) : '—';

  const total = RUBRIC.reduce((s, r) => s + (scores[r.key] || 0), 0);

  const openForm = (p: Project) => {
    const existing = myEvals.find((e) => e.projectId === p.id);
    setActiveProject(p);
    setScores(existing?.scores ?? { innovation: 0, technical: 0, impact: 0, ux: 0, presentation: 0 });
    setFeedback(existing?.feedback ?? '');
  };

  const submit = () => {
    if (!activeProject) return;
    if (total === 0) {
      toast({ type: 'warning', title: 'No scores entered', message: 'Please score at least one criterion.' });
      return;
    }
    submitEvaluation(activeProject.id, judge.id, scores, feedback);
    toast({ type: 'success', title: 'Evaluation submitted', message: `${activeProject.title} scored ${total}/100. Leaderboard updated.` });
    setActiveProject(null);
    setScores({ innovation: 0, technical: 0, impact: 0, ux: 0, presentation: 0 });
    setFeedback('');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <SectionHeader
        title="Judge Portal"
        subtitle="Review assigned submissions and score against the rubric"
        action={
          <select className="input max-w-[220px]" value={activeJudgeId} onChange={(e) => setActiveJudgeId(e.target.value)}>
            {judges.map((j) => <option key={j.id} value={j.id}>{j.name}</option>)}
          </select>
        }
      />

      {/* Judge stats */}
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

      {/* Judge profile */}
      <div className="card p-5">
        <div className="flex items-center gap-4">
          <Avatar name={judge.name} color={judge.avatarColor} size="lg" />
          <div>
            <p className="font-display text-lg font-semibold text-white">{judge.name}</p>
            <div className="mt-1 flex flex-wrap gap-1.5">
              {judge.expertise.map((e) => <Badge key={e} variant="violet">{e}</Badge>)}
            </div>
          </div>
        </div>
      </div>

      {/* Pending evaluations */}
      <div>
        <p className="section-title mb-3">Pending Evaluations</p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {pending.map((p) => {
            const team = getTeamById(p.teamId);
            return (
              <div key={p.id} className="card card-hover p-5">
                <div className="flex items-start justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10 text-amber-400">
                    <FileCode2 size={18} />
                  </div>
                  <Badge variant="warning">Pending</Badge>
                </div>
                <p className="mt-3 font-display text-base font-semibold text-white">{p.title}</p>
                <p className="text-xs text-ink-400">{team?.name ?? 'Unassigned'} · {p.category}</p>
                <p className="mt-2 text-xs text-ink-300 line-clamp-2">{p.description}</p>
                <button onClick={() => openForm(p)} className="btn-primary mt-4 w-full">
                  <Gavel size={14} /> Start Evaluation <ArrowRight size={14} />
                </button>
              </div>
            );
          })}
          {pending.length === 0 && (
            <div className="card col-span-full p-8 text-center">
              <CheckCircle2 size={28} className="mx-auto mb-2 text-emerald-400" />
              <p className="text-sm text-ink-300">All assigned evaluations complete. Great work!</p>
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
              const team = getTeamById(p.teamId);
              const eval_ = myEvals.find((e) => e.projectId === p.id);
              return (
                <div key={p.id} className="card p-5">
                  <div className="flex items-start justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
                      <CheckCircle2 size={18} />
                    </div>
                    <Badge variant="success">Scored</Badge>
                  </div>
                  <p className="mt-3 font-display text-base font-semibold text-white">{p.title}</p>
                  <p className="text-xs text-ink-400">{team?.name ?? 'Unassigned'} · {p.category}</p>
                  {eval_ && (
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-xs text-ink-300">Total Score</span>
                      <span className="font-display text-xl font-bold text-emerald-400">{eval_.total}<span className="text-sm text-ink-400">/100</span></span>
                    </div>
                  )}
                  <button onClick={() => openForm(p)} className="btn-ghost mt-3 w-full">Review & Edit</button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Judging form modal */}
      <Modal open={Boolean(activeProject)} onClose={() => setActiveProject(null)} title="Evaluation Rubric" size="lg">
        {activeProject && (
          <div className="space-y-5">
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-display text-base font-semibold text-white">{activeProject.title}</p>
                  <p className="text-xs text-ink-400">{getTeamById(activeProject.teamId)?.name ?? 'Unassigned'} · {activeProject.category}</p>
                </div>
                <Badge variant="info">{activeProject.status}</Badge>
              </div>
              <p className="mt-2 text-xs text-ink-300">{activeProject.description}</p>
              <div className="mt-2 flex gap-3 text-xs text-ink-400">
                <span>Repo: {activeProject.repoUrl || '—'}</span>
                <span>Demo: {activeProject.demoUrl || '—'}</span>
              </div>
            </div>

            {/* Rubric sliders */}
            <div className="space-y-4">
              {RUBRIC.map((r) => {
                const val = scores[r.key];
                return (
                  <div key={r.key}>
                    <div className="mb-1.5 flex items-center justify-between">
                      <span className="text-sm font-medium text-white">{r.label}</span>
                      <span className="font-display text-sm font-bold text-brand-300">{val}<span className="text-ink-400">/{r.max}</span></span>
                    </div>
                    <div className="flex items-center gap-3">
                      <input
                        type="range"
                        min={0}
                        max={r.max}
                        value={val}
                        onChange={(e) => setScores({ ...scores, [r.key]: Number(e.target.value) })}
                        className="flex-1 accent-brand-400"
                      />
                      <div className="flex gap-1">
                        {Array.from({ length: r.max / 5 }, (_, i) => (i + 1) * 5).map((v) => (
                          <button
                            key={v}
                            onClick={() => setScores({ ...scores, [r.key]: v })}
                            className={cn('h-7 w-7 rounded-md text-[10px] font-bold transition-colors', val >= v ? 'bg-brand-500/30 text-brand-200' : 'bg-white/[0.04] text-ink-400 hover:bg-white/[0.08]')}
                          >
                            {v}
                          </button>
                        ))}
                      </div>
                    </div>
                    <ProgressBar value={val} max={r.max} className="mt-1.5" />
                  </div>
                );
              })}
            </div>

            {/* Total */}
            <div className="flex items-center justify-between rounded-xl border border-brand-400/20 bg-brand-500/5 p-4">
              <span className="font-display text-sm font-semibold text-white">Total Score</span>
              <span className="font-display text-2xl font-bold gradient-text">{total}<span className="text-base text-ink-400">/100</span></span>
            </div>

            {/* Feedback */}
            <div>
              <label className="label"><MessageSquare size={12} className="inline mr-1" /> Structured Feedback</label>
              <textarea
                className="input min-h-[100px] resize-none"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Share specific, actionable feedback for the team..."
              />
            </div>

            <div className="flex gap-2">
              <button onClick={() => setActiveProject(null)} className="btn-ghost flex-1"><X size={16} /> Cancel</button>
              <button onClick={submit} className="btn-primary flex-1"><CheckCircle2 size={16} /> Submit Evaluation</button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
