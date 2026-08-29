import { type ReactNode } from 'react';
import {
  LayoutDashboard,
  UserPlus,
  ScanLine,
  Users,
  Megaphone,
  Gavel,
  Trophy,
  BarChart3,
  Calendar,
  CircleDot,
} from 'lucide-react';
import { useApp } from '../store';
import { cn } from '../utils';
import type { Role } from '../types';
import { EVENT_INFO } from '../data';

interface NavItem {
  key: string;
  label: string;
  icon: ReactNode;
  roles: Role[];
}

const NAV: NavItem[] = [
  { key: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={18} />, roles: ['organizer', 'participant', 'judge'] },
  { key: 'registration', label: 'Registration', icon: <UserPlus size={18} />, roles: ['organizer', 'participant'] },
  { key: 'checkin', label: 'QR Check-In', icon: <ScanLine size={18} />, roles: ['organizer'] },
  { key: 'teammates', label: 'Find Teammates', icon: <Users size={18} />, roles: ['organizer', 'participant'] },
  { key: 'announcements', label: 'Announcements', icon: <Megaphone size={18} />, roles: ['organizer', 'participant', 'judge'] },
  { key: 'judging', label: 'Judge Portal', icon: <Gavel size={18} />, roles: ['judge'] },
  { key: 'leaderboard', label: 'Leaderboard', icon: <Trophy size={18} />, roles: ['organizer', 'participant', 'judge'] },
  { key: 'analytics', label: 'Analytics', icon: <BarChart3 size={18} />, roles: ['organizer'] },
  { key: 'schedule', label: 'Schedule', icon: <Calendar size={18} />, roles: ['organizer', 'participant', 'judge'] },
];

const ROLE_LABEL: Record<Role, string> = {
  organizer: 'Organizer',
  participant: 'Participant',
  judge: 'Judge',
};

export function Layout({
  active,
  onNavigate,
  children,
  onRoleSwitch,
}: {
  active: string;
  onNavigate: (key: string) => void;
  children: ReactNode;
  onRoleSwitch: () => void;
}) {
  const { role, setRole, setEntered } = useApp();
  const items = NAV.filter((n) => n.roles.includes(role));

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside className="hidden w-64 shrink-0 flex-col border-r border-white/[0.06] bg-ink-900/60 backdrop-blur-xl lg:flex">
        <div className="flex items-center gap-3 px-5 py-5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-violet-500 shadow-glow">
            <CircleDot size={20} className="text-ink-950" />
          </div>
          <div>
            <p className="font-display text-sm font-bold text-white">EventSphere</p>
            <p className="text-[10px] text-ink-400">{EVENT_INFO.name}</p>
          </div>
        </div>

        <div className="px-3 py-2">
          <div className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-wider text-ink-400">
            {ROLE_LABEL[role]} Panel
          </div>
          <nav className="space-y-1">
            {items.map((item) => (
              <button
                key={item.key}
                onClick={() => onNavigate(item.key)}
                className={cn('nav-item w-full', active === item.key && 'nav-item-active')}
              >
                <span className={cn(active === item.key ? 'text-brand-400' : 'text-ink-400')}>{item.icon}</span>
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="mt-auto p-4">
          <div className="glass rounded-xl p-3">
            <div className="mb-2 flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              <span className="text-xs font-semibold text-emerald-300">Event Live</span>
            </div>
            <p className="text-[10px] text-ink-400">{EVENT_INFO.venue}</p>
            <button
              onClick={() => {
                setEntered(false);
                setRole('organizer');
              }}
              className="mt-2 w-full rounded-lg bg-white/[0.04] py-1.5 text-[11px] font-medium text-ink-300 hover:bg-white/[0.08] hover:text-white transition-colors"
            >
              Sign out
            </button>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top nav */}
        <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-white/[0.06] bg-ink-950/70 px-4 py-3 backdrop-blur-xl sm:px-6">
          <button
            onClick={() => onNavigate('dashboard')}
            className="flex items-center gap-2 lg:hidden"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500 to-violet-500">
              <CircleDot size={16} className="text-ink-950" />
            </div>
          </button>

          <div className="hidden sm:block">
            <p className="text-xs text-ink-400">Welcome back to</p>
            <p className="font-display text-sm font-semibold text-white">{EVENT_INFO.name}</p>
          </div>

          <div className="ml-auto flex items-center gap-2">
            {/* Role switcher */}
            <div className="flex items-center rounded-xl border border-white/[0.08] bg-ink-900/60 p-0.5">
              {(['organizer', 'participant', 'judge'] as Role[]).map((r) => (
                <button
                  key={r}
                  onClick={() => {
                    if (r !== role) {
                      setRole(r);
                      onRoleSwitch();
                    }
                  }}
                  className={cn(
                    'rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-all sm:px-3',
                    role === r
                      ? 'bg-gradient-to-r from-brand-500 to-brand-400 text-ink-950 shadow-glow'
                      : 'text-ink-300 hover:text-white',
                  )}
                >
                  {ROLE_LABEL[r]}
                </button>
              ))}
            </div>
          </div>
        </header>

        {/* Mobile nav */}
        <nav className="flex gap-1 overflow-x-auto border-b border-white/[0.06] px-3 py-2 no-scrollbar lg:hidden">
          {items.map((item) => (
            <button
              key={item.key}
              onClick={() => onNavigate(item.key)}
              className={cn(
                'flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium transition-colors',
                active === item.key ? 'bg-white/[0.08] text-white' : 'text-ink-300 hover:text-white',
              )}
            >
              <span className={active === item.key ? 'text-brand-400' : 'text-ink-400'}>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        <main className="flex-1 overflow-y-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
