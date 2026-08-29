import { useState } from 'react';
import { CircleDot, Calendar, MapPin, Users, Trophy, ArrowRight, Sparkles } from 'lucide-react';
import { useApp } from '../store';
import { EVENT_INFO } from '../data';
import type { Role } from '../types';
import { cn } from '../utils';

const ROLES: { key: Role; label: string; desc: string; icon: typeof Users; accent: string }[] = [
  {
    key: 'organizer',
    label: 'Organizer',
    desc: 'Run the event. Track attendance, teams, submissions and analytics in real time.',
    icon: Users,
    accent: 'from-brand-500 to-brand-400',
  },
  {
    key: 'participant',
    label: 'Participant',
    desc: 'Register, check in, find teammates, form a team and submit your project.',
    icon: Sparkles,
    accent: 'from-violet-500 to-violet-400',
  },
  {
    key: 'judge',
    label: 'Judge',
    desc: 'Review assigned submissions, score against a rubric and shape the leaderboard.',
    icon: Trophy,
    accent: 'from-amber-500 to-amber-400',
  },
];

export function Landing() {
  const { setRole, setEntered, toast } = useApp();
  const [selected, setSelected] = useState<Role>('organizer');

  const enter = () => {
    setRole(selected);
    setEntered(true);
    toast({ type: 'success', title: 'Welcome to EventSphere', message: `You're now signed in as ${ROLES.find((r) => r.key === selected)?.label}.` });
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 bg-grid-faint [background-size:40px_40px] opacity-40" />
      <div className="pointer-events-none absolute -left-40 top-0 h-96 w-96 rounded-full bg-brand-500/20 blur-[120px]" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-violet-500/20 blur-[120px]" />

      <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col px-5 py-6">
        {/* Header */}
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-violet-500 shadow-glow">
              <CircleDot size={22} className="text-ink-950" />
            </div>
            <span className="font-display text-lg font-bold text-white">EventSphere</span>
          </div>
        </header>

        {/* Hero */}
        <div className="flex flex-1 flex-col items-center justify-center py-10 text-center">
          <div className="mb-4 flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1 text-xs text-ink-300 animate-fade-in">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            {EVENT_INFO.name} · Live now
          </div>

          <h1 className="font-display text-4xl font-extrabold leading-tight text-white sm:text-6xl animate-fade-in">
            The smart way to run
            <br />
            <span className="gradient-text">hackathons & tech fests</span>
          </h1>
          <p className="mt-5 max-w-xl text-balance text-sm text-ink-300 sm:text-base animate-fade-in">
            One platform for registration, QR check-in, team formation, announcements, judging and live
            leaderboards. Choose your role to enter the dashboard.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs text-ink-400">
            <span className="flex items-center gap-1.5"><Calendar size={14} className="text-brand-400" /> Sep 19–21, 2026</span>
            <span className="flex items-center gap-1.5"><MapPin size={14} className="brand-400" /> {EVENT_INFO.venue}</span>
            <span className="flex items-center gap-1.5"><Users size={14} className="text-violet-400" /> 1,248 registered</span>
          </div>

          {/* Role cards */}
          <div className="mt-10 grid w-full max-w-3xl gap-4 sm:grid-cols-3">
            {ROLES.map((r) => {
              const Icon = r.icon;
              const active = selected === r.key;
              return (
                <button
                  key={r.key}
                  onClick={() => setSelected(r.key)}
                  className={cn(
                    'group relative overflow-hidden rounded-2xl border p-5 text-left transition-all duration-300',
                    active
                      ? 'border-brand-400/40 bg-white/[0.06] shadow-glow -translate-y-1'
                      : 'border-white/[0.06] bg-white/[0.02] hover:border-white/15 hover:bg-white/[0.04]',
                  )}
                >
                  <div className={cn('mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br text-ink-950', r.accent)}>
                    <Icon size={20} />
                  </div>
                  <p className="font-display text-base font-semibold text-white">{r.label}</p>
                  <p className="mt-1 text-xs leading-relaxed text-ink-300">{r.desc}</p>
                  {active && (
                    <div className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-brand-400 text-ink-950">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><path d="M20 6 9 17l-5-5" /></svg>
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          <button onClick={enter} className="btn-primary mt-8 px-7 py-3 text-base animate-fade-in">
            Enter as {ROLES.find((r) => r.key === selected)?.label}
            <ArrowRight size={18} />
          </button>

          <p className="mt-4 text-[11px] text-ink-400">
            No account needed — this is a hackathon prototype with realistic sample data.
          </p>
        </div>
      </div>
    </div>
  );
}
