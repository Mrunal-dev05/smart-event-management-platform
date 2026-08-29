import { useEffect, useState } from 'react';
import {
  Calendar,
  QrCode,
  Users as TeamIcon,
  Users,
  Megaphone,
  FileCode2,
  Sparkles,
  Clock,
  MapPin,
  ArrowRight,
  UserPlus,
  Link2,
} from 'lucide-react';
import { useApp } from '../store';
import { EVENT_INFO } from '../data';
import { Badge, ProgressBar, SectionHeader, Avatar } from '@/components/ui';
import { QRCode } from '@/components/QRCode';
import { formatRelative, getCountdown, cn } from '../utils';
import type { PageProps } from './types';

export function ParticipantDashboard({ onNavigate }: PageProps) {
  const { participants, teams, announcements, projects, activeParticipantId, timeline } = useApp();
  const me = participants.find((p) => p.id === activeParticipantId) ?? participants[0];
  const myTeam = teams.find((t) => t.id === me.teamId);
  const myProject = projects.find((p) => p.teamId === myTeam?.id);
  const recommended = participants.filter((p) => p.id !== me.id && p.teamStatus !== 'in_team').slice(0, 3);

  const [countdown, setCountdown] = useState(getCountdown(EVENT_INFO.startDate));

  useEffect(() => {
    const t = setInterval(() => setCountdown(getCountdown(EVENT_INFO.startDate)), 1000);
    return () => clearInterval(t);
  }, []);

  const cd = [
    { label: 'Days', value: countdown.days },
    { label: 'Hours', value: countdown.hours },
    { label: 'Mins', value: countdown.minutes },
    { label: 'Secs', value: countdown.seconds },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Countdown hero */}
      <div className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-gradient-to-br from-brand-500/10 via-ink-800/80 to-violet-500/10 p-6">
        <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-brand-500/10 blur-3xl" />
        <div className="relative">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-brand-400">
            <Calendar size={14} /> Event Starts In
          </div>
          <div className="mt-4 flex gap-3 sm:gap-5">
            {cd.map((c) => (
              <div key={c.label} className="text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-xl border border-white/[0.08] bg-ink-950/60 font-display text-2xl font-bold text-white sm:h-20 sm:w-20 sm:text-3xl">
                  {String(c.value).padStart(2, '0')}
                </div>
                <p className="mt-1.5 text-[10px] uppercase tracking-wider text-ink-400">{c.label}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm text-ink-300">{EVENT_INFO.name} · {EVENT_INFO.venue}</p>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {/* My registration + QR */}
        <div className="card p-5">
          <div className="mb-3 flex items-center gap-2">
            <QrCode size={16} className="text-brand-400" />
            <p className="section-title">My Registration</p>
          </div>
          <div className="flex flex-col items-center">
            <QRCode value={me.regId} size={150} />
            <p className="mt-3 font-mono text-sm font-semibold text-brand-300">{me.regId}</p>
            <p className="text-sm text-white">{me.name}</p>
            <p className="text-xs text-ink-400">{me.college}</p>
          </div>
          <div className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-ink-400">Role</span><Badge variant="violet">{me.role}</Badge></div>
            <div className="flex justify-between"><span className="text-ink-400">Check-in</span>{me.checkedIn ? <Badge variant="success">Checked in</Badge> : <Badge variant="warning">Pending</Badge>}</div>
            <div className="flex justify-between"><span className="text-ink-400">Team</span>{me.teamStatus === 'in_team' ? <Badge variant="info">In team</Badge> : <Badge variant="neutral">Solo</Badge>}</div>
          </div>
        </div>

        {/* My team */}
        <div className="card p-5">
          <div className="mb-3 flex items-center gap-2">
            <TeamIcon size={16} className="text-violet-400" />
            <p className="section-title">My Team</p>
          </div>
          {myTeam ? (
            <>
              <p className="font-display text-lg font-bold text-white">{myTeam.name}</p>
              <p className="text-xs text-ink-400">{myTeam.memberIds.length} members</p>
              <div className="mt-3 space-y-2">
                {myTeam.memberIds.map((id) => {
                  const m = participants.find((p) => p.id === id);
                  if (!m) return null;
                  return (
                    <div key={id} className="flex items-center gap-2.5">
                      <Avatar name={m.name} color={m.avatarColor} size="sm" />
                      <div>
                        <p className="text-sm font-medium text-white">{m.name}</p>
                        <p className="text-xs text-ink-400">{m.role}{id === myTeam.captainId ? ' · Captain' : ''}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            <div className="py-6 text-center">
              <Users size={28} className="mx-auto mb-2 text-ink-400" />
              <p className="text-sm text-ink-300">You don't have a team yet.</p>
              <button onClick={() => onNavigate('teammates')} className="btn-primary mt-3">
                <UserPlus size={14} /> Find Teammates
              </button>
            </div>
          )}
        </div>

        {/* Submission status */}
        <div className="card p-5">
          <div className="mb-3 flex items-center gap-2">
            <FileCode2 size={16} className="text-amber-400" />
            <p className="section-title">Submission Status</p>
          </div>
          {myProject ? (
            <div>
              <p className="font-display text-base font-semibold text-white">{myProject.title}</p>
              <p className="text-xs text-ink-400">{myProject.category}</p>
              <div className="mt-3">
                <Badge variant={myProject.status === 'submitted' ? 'success' : myProject.status === 'pending' ? 'warning' : 'danger'}>
                  {myProject.status}
                </Badge>
              </div>
              {myProject.repoUrl && <p className="mt-3 text-xs text-ink-300">{myProject.repoUrl}</p>}
              <button onClick={() => onNavigate('leaderboard')} className="btn-ghost mt-4 w-full">
                View Leaderboard <ArrowRight size={14} />
              </button>
            </div>
          ) : (
            <div className="py-6 text-center">
              <FileCode2 size={28} className="mx-auto mb-2 text-ink-400" />
              <p className="text-sm text-ink-300">No submission yet.</p>
              <p className="mt-1 text-xs text-ink-400">Deadline: Sep 21, 4:00 PM</p>
            </div>
          )}
        </div>
      </div>

      {/* Recommended teammates */}
      <div className="card p-5">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles size={16} className="text-violet-400" />
            <p className="section-title">Recommended Teammates</p>
          </div>
          <button onClick={() => onNavigate('teammates')} className="text-xs font-semibold text-brand-400 hover:text-brand-300">See all</button>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          {recommended.map((p) => (
            <div key={p.id} className="rounded-xl border border-white/[0.04] bg-white/[0.02] p-3.5">
              <div className="flex items-center gap-2.5">
                <Avatar name={p.name} color={p.avatarColor} size="sm" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white truncate">{p.name}</p>
                  <p className="text-xs text-ink-400">{p.role}</p>
                </div>
                <span className="text-xs font-bold text-emerald-400">{p.matchScore}%</span>
              </div>
              <div className="mt-2 flex flex-wrap gap-1">
                {p.skills.slice(0, 3).map((s) => <span key={s} className="chip bg-brand-500/10 text-brand-300 text-[10px]">{s}</span>)}
              </div>
              <button onClick={() => onNavigate('teammates')} className="btn-ghost mt-2.5 w-full py-1.5 text-xs">
                <Link2 size={12} /> Connect
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Announcements + Schedule */}
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="card p-5">
          <div className="mb-3 flex items-center gap-2">
            <Megaphone size={16} className="text-brand-400" />
            <p className="section-title">Announcements</p>
          </div>
          <div className="space-y-2.5">
            {announcements.slice(0, 4).map((a) => (
              <div key={a.id} className="rounded-lg border border-white/[0.04] bg-white/[0.02] p-3">
                <div className="flex items-center gap-2">
                  <p className="flex-1 text-sm font-semibold text-white truncate">{a.title}</p>
                  <Badge variant={a.priority === 'high' ? 'danger' : a.priority === 'medium' ? 'warning' : 'info'}>{a.priority}</Badge>
                </div>
                <p className="mt-0.5 text-xs text-ink-400 line-clamp-1">{a.message}</p>
                <div className="mt-1 flex items-center gap-2 text-[10px] text-ink-400">
                  <Clock size={10} /> {formatRelative(a.time)} <MapPin size={10} /> {a.venue}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card p-5">
          <p className="section-title mb-3">Schedule</p>
          <div className="space-y-2">
            {timeline.slice(0, 6).map((t) => (
              <div key={t.id} className="flex items-center gap-3 rounded-lg border border-white/[0.04] bg-white/[0.02] px-3 py-2">
                <span className={cn('flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold', t.done ? 'bg-emerald-500/20 text-emerald-300' : 'bg-white/[0.06] text-ink-400')}>
                  {t.done ? '✓' : ''}
                </span>
                <span className="text-xs font-semibold text-brand-300 w-12">{t.time}</span>
                <span className="flex-1 text-sm text-white">{t.title}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
