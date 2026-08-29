import { Users, UserCheck, Users as TeamIcon, FileCode2, Star, Activity, TrendingUp } from 'lucide-react';
import { useApp } from '../store';
import { ATTENDANCE_TREND, ENGAGEMENT_TREND } from '../data';
import { AreaChart, BarChart, DonutChart } from '@/components/charts';
import { Badge, ProgressBar, SectionHeader } from '@/components/ui';

export function Analytics() {
  const { participants, teams, projects, evaluations } = useApp();

  const checkedIn = participants.filter((p) => p.checkedIn).length;
  const inTeams = participants.filter((p) => p.teamStatus === 'in_team').length;
  const submitted = projects.filter((p) => p.status === 'submitted' || p.status === 'late').length;
  const avgScore = evaluations.length ? (evaluations.reduce((s, e) => s + e.total, 0) / evaluations.length).toFixed(1) : '0.0';

  const checkInPct = Math.round((checkedIn / participants.length) * 100);
  const teamPct = Math.round((inTeams / participants.length) * 100);
  const submitPct = Math.round((submitted / projects.length) * 100);

  const metrics = [
    { label: 'Registration Count', value: 1248, icon: Users, color: 'text-brand-400', bg: 'bg-brand-500/10' },
    { label: 'Check-in Rate', value: `${checkInPct}%`, icon: UserCheck, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
    { label: 'Team Formation', value: `${teamPct}%`, icon: TeamIcon, color: 'text-violet-400', bg: 'bg-violet-500/10' },
    { label: 'Submission Rate', value: `${submitPct}%`, icon: FileCode2, color: 'text-amber-400', bg: 'bg-amber-500/10' },
    { label: 'Average Score', value: avgScore, icon: Star, color: 'text-fuchsia-400', bg: 'bg-fuchsia-500/10' },
    { label: 'Active Now', value: 942, icon: Activity, color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
  ];

  const roleDist = [
    { label: 'Fullstack', value: participants.filter((p) => p.role === 'Fullstack').length, color: '#38bdf8' },
    { label: 'ML/AI', value: participants.filter((p) => p.role === 'ML/AI').length, color: '#8b5cf6' },
    { label: 'Designer', value: participants.filter((p) => p.role === 'Designer').length, color: '#f59e0b' },
    { label: 'Backend', value: participants.filter((p) => p.role === 'Backend').length, color: '#10b981' },
    { label: 'Frontend', value: participants.filter((p) => p.role === 'Frontend').length, color: '#f43f5e' },
    { label: 'DevOps', value: participants.filter((p) => p.role === 'DevOps').length, color: '#06b6d4' },
    { label: 'Mobile', value: participants.filter((p) => p.role === 'Mobile').length, color: '#a78bfa' },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <SectionHeader title="Analytics" subtitle="Event performance and engagement metrics" />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-6">
        {metrics.map((m) => {
          const Icon = m.icon;
          return (
            <div key={m.label} className="card card-hover p-4">
              <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${m.bg}`}>
                <Icon size={18} className={m.color} />
              </div>
              <p className="mt-3 font-display text-2xl font-bold text-white">{m.value}</p>
              <p className="text-xs text-ink-400">{m.label}</p>
            </div>
          );
        })}
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="card p-5 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="section-title">Registration vs Check-in</p>
              <p className="text-xs text-ink-400">Hourly attendance trend</p>
            </div>
            <Badge variant="info"><TrendingUp size={12} /> Trending up</Badge>
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
          <p className="section-title mb-4">Role Distribution</p>
          <DonutChart segments={roleDist} centerLabel="Hackers" centerValue={String(participants.length)} />
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="card p-5">
          <p className="section-title mb-4">Engagement Trend</p>
          <BarChart data={ENGAGEMENT_TREND} color="#8b5cf6" />
        </div>

        <div className="card p-5">
          <p className="section-title mb-4">Funnel Metrics</p>
          <div className="space-y-4">
            {[
              { label: 'Registered', value: 1248, max: 1248, color: 'brand' as const },
              { label: 'Checked In', value: checkedIn, max: 1248, color: 'emerald' as const },
              { label: 'In Teams', value: inTeams, max: participants.length, color: 'violet' as const },
              { label: 'Submitted', value: submitted, max: projects.length, color: 'amber' as const },
            ].map((f) => (
              <div key={f.label}>
                <div className="mb-1.5 flex items-center justify-between text-sm">
                  <span className="text-ink-300">{f.label}</span>
                  <span className="font-semibold text-white">{f.value}</span>
                </div>
                <ProgressBar value={f.value} max={f.max} color={f.color} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
