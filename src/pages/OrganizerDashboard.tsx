import {
  Users,
  UserCheck,
  Users as TeamIcon,
  FileCode2,
  Gavel,
  Star,
  TrendingUp,
  Megaphone,
  Plus,
  ScanLine,
  UserPlus,
  ArrowRight,
  Clock,
  MapPin,
} from 'lucide-react';
import { useApp } from '../store';
import { ATTENDANCE_TREND, EVENT_INFO } from '../data';
import { AreaChart } from '@/components/charts';
import { Badge, ProgressBar } from '@/components/ui';
import { formatRelative, formatTime } from '../utils';
import type { PageProps } from './types';

export function OrganizerDashboard({ onNavigate }: PageProps) {
  const { participants, teams, projects, announcements, evaluations, checkIns, timeline, getTeamById } = useApp();

  const checkedInCount = participants.filter((p) => p.checkedIn).length;
  const submittedCount = projects.filter((p) => p.status === 'submitted' || p.status === 'late').length;
  const avgScore = evaluations.length
    ? (evaluations.reduce((s, e) => s + e.total, 0) / evaluations.length).toFixed(1)
    : '0.0';

  const stats = [
    { label: 'Registered Participants', value: 1248, icon: Users, color: 'text-brand-400', bg: 'bg-brand-500/10', trend: '+12%' },
    { label: 'Checked In', value: checkedInCount, icon: UserCheck, color: 'text-emerald-400', bg: 'bg-emerald-500/10', trend: `${Math.round((checkedInCount / participants.length) * 100)}%` },
    { label: 'Teams Formed', value: teams.filter((t) => t.memberIds.length > 0).length, icon: TeamIcon, color: 'text-violet-400', bg: 'bg-violet-500/10', trend: '+8%' },
    { label: 'Submissions', value: submittedCount, icon: FileCode2, color: 'text-amber-400', bg: 'bg-amber-500/10', trend: '+5%' },
    { label: 'Active Judges', value: 28, icon: Gavel, color: 'text-cyan-400', bg: 'bg-cyan-500/10', trend: 'live' },
    { label: 'Average Score', value: avgScore, icon: Star, color: 'text-fuchsia-400', bg: 'bg-fuchsia-500/10', trend: '+2.1' },
  ];

  const quickActions = [
    { label: 'Check In', icon: ScanLine, page: 'checkin' },
    { label: 'Register', icon: UserPlus, page: 'registration' },
    { label: 'Announce', icon: Megaphone, page: 'announcements' },
    { label: 'Leaderboard', icon: Star, page: 'leaderboard' },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Hero banner */}
      <div className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-gradient-to-br from-ink-800/80 to-ink-900/80 p-6">
        <div className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-brand-500/10 blur-3xl" />
        <div className="relative flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-brand-400">Operations Command Center</p>
            <h2 className="mt-1 font-display text-2xl font-bold text-white">{EVENT_INFO.name}</h2>
            <p className="mt-1 text-sm text-ink-300">{EVENT_INFO.tagline} · {EVENT_INFO.venue}</p>
          </div>
          <div className="flex gap-2">
            {quickActions.map((a) => (
              <button key={a.label} onClick={() => onNavigate(a.page)} className="btn-ghost">
                <a.icon size={16} /> <span className="hidden sm:inline">{a.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-6">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="card card-hover p-4">
              <div className="flex items-start justify-between">
                <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${s.bg}`}>
                  <Icon size={18} className={s.color} />
                </div>
                <span className="text-[10px] font-semibold text-emerald-400">{s.trend}</span>
              </div>
              <p className="mt-3 font-display text-2xl font-bold text-white">{s.value}</p>
              <p className="text-xs text-ink-400">{s.label}</p>
            </div>
          );
        })}
      </div>

      {/* Charts row */}
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="card p-5 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="section-title">Attendance Trend</p>
              <p className="text-xs text-ink-400">Check-ins vs registrations over the day</p>
            </div>
            <Badge variant="success"><TrendingUp size={12} /> Live</Badge>
          </div>
          <AreaChart
            data={ATTENDANCE_TREND}
            series={[
              { key: 'registrations', color: '#8b5cf6', label: 'Registrations' },
              { key: 'checkIns', color: '#38bdf8', label: 'Check-ins' },
            ]}
          />
        </div>

        <div className="card p-5">
          <p className="section-title mb-4">Quick Actions</p>
          <div className="grid grid-cols-2 gap-2.5">
            {quickActions.map((a) => {
              const Icon = a.icon;
              return (
                <button
                  key={a.label}
                  onClick={() => onNavigate(a.page)}
                  className="group flex flex-col items-start gap-2 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3.5 transition-all hover:border-brand-400/30 hover:bg-white/[0.05]"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-500/10 text-brand-400 group-hover:bg-brand-500/20">
                    <Icon size={16} />
                  </div>
                  <span className="text-xs font-semibold text-white">{a.label}</span>
                  <ArrowRight size={12} className="text-ink-400 transition-transform group-hover:translate-x-1" />
                </button>
              );
            })}
          </div>
          <div className="mt-4 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-ink-400">Check-in rate</p>
            <div className="mt-2 flex items-center gap-3">
              <ProgressBar value={checkedInCount} max={participants.length} color="emerald" className="flex-1" />
              <span className="text-sm font-bold text-white">{Math.round((checkedInCount / participants.length) * 100)}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent activity */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Recent announcements */}
        <div className="card p-5">
          <div className="mb-4 flex items-center justify-between">
            <p className="section-title">Recent Announcements</p>
            <button onClick={() => onNavigate('announcements')} className="text-xs font-semibold text-brand-400 hover:text-brand-300">
              View all
            </button>
          </div>
          <div className="space-y-3">
            {announcements.slice(0, 4).map((a) => (
              <div key={a.id} className="flex gap-3 rounded-xl border border-white/[0.04] bg-white/[0.02] p-3">
                <div className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                  a.priority === 'high' ? 'bg-red-500/10 text-red-400' : a.priority === 'medium' ? 'bg-amber-500/10 text-amber-400' : 'bg-brand-500/10 text-brand-400'
                }`}>
                  <Megaphone size={14} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white truncate">{a.title}</p>
                  <p className="text-xs text-ink-400 line-clamp-1">{a.message}</p>
                  <div className="mt-1 flex items-center gap-2 text-[10px] text-ink-400">
                    <Clock size={10} /> {formatRelative(a.time)}
                    <MapPin size={10} /> {a.venue}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent submissions */}
        <div className="card p-5">
          <div className="mb-4 flex items-center justify-between">
            <p className="section-title">Recent Submissions</p>
            <button onClick={() => onNavigate('leaderboard')} className="text-xs font-semibold text-brand-400 hover:text-brand-300">
              View all
            </button>
          </div>
          <div className="space-y-3">
            {projects.filter((p) => p.status === 'submitted' || p.status === 'late').slice(0, 4).map((p) => {
              const team = getTeamById(p.teamId);
              return (
                <div key={p.id} className="flex items-center gap-3 rounded-xl border border-white/[0.04] bg-white/[0.02] p-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-violet-500/10 text-violet-400">
                    <FileCode2 size={14} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-white truncate">{p.title}</p>
                    <p className="text-xs text-ink-400">{team?.name ?? 'Unassigned'} · {p.category}</p>
                  </div>
                  <Badge variant={p.status === 'submitted' ? 'success' : 'warning'}>{p.status}</Badge>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Event timeline */}
      <div className="card p-5">
        <p className="section-title mb-4">Event Timeline</p>
        <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
          {timeline.map((t, i) => (
            <div key={t.id} className="relative flex min-w-[160px] flex-col gap-1">
              <div className="flex items-center gap-2">
                <div className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${
                  t.done ? 'bg-emerald-500/20 text-emerald-300' : 'bg-white/[0.06] text-ink-400'
                }`}>
                  {t.done ? '✓' : i + 1}
                </div>
                <span className="text-xs font-semibold text-white">{t.time}</span>
              </div>
              <p className="text-sm font-medium text-white">{t.title}</p>
              <p className="text-xs text-ink-400">{t.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recent check-ins */}
      <div className="card p-5">
        <div className="mb-4 flex items-center justify-between">
          <p className="section-title">Recent Check-Ins</p>
          <button onClick={() => onNavigate('checkin')} className="text-xs font-semibold text-brand-400 hover:text-brand-300">
            Go to Check-In
          </button>
        </div>
        <div className="space-y-2">
          {checkIns.slice(0, 5).map((c) => (
            <div key={c.id} className="flex items-center gap-3 rounded-lg border border-white/[0.04] bg-white/[0.02] px-3 py-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400">
                <UserCheck size={14} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white">{c.participantName}</p>
                <p className="text-xs text-ink-400">{c.regId} · {c.college}</p>
              </div>
              <span className="text-xs text-ink-400">{formatTime(c.time)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
