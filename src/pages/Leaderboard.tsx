import { Trophy, Medal, Crown, ArrowUp, Minus } from 'lucide-react';
import { useApp } from '../store';
import { Badge, SectionHeader } from '@/components/ui';
import { RUBRIC } from '../types';
import { cn } from '../utils';

export function Leaderboard() {
  const { getLeaderboard, evaluations } = useApp();
  const rows = getLeaderboard();

  const podiumColors = [
    'from-amber-400 to-amber-600',
    'from-ink-200 to-ink-400',
    'from-orange-400 to-orange-600',
  ];
  const podiumHeights = ['h-32', 'h-24', 'h-20'];
  const podiumIcons = [<Crown size={20} className="text-amber-300" />, <Medal size={18} className="text-ink-200" />, <Medal size={18} className="text-orange-300" />];

  return (
    <div className="space-y-6 animate-fade-in">
      <SectionHeader
        title="Live Leaderboard"
        subtitle="Updates instantly when judges submit scores"
        action={<Badge variant="success"><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" /> {evaluations.length} evaluations</Badge>}
      />

      {/* Podium */}
      {rows.length >= 3 && (
        <div className="card p-6">
          <div className="flex items-end justify-center gap-4 sm:gap-8">
            {[1, 0, 2].map((idx) => {
              const r = rows[idx];
              if (!r) return null;
              return (
                <div key={r.team.id} className="flex flex-col items-center" style={{ animationDelay: `${idx * 100}ms` }}>
                  <div className="mb-2 text-center">
                    <div className={cn('mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br text-ink-950', podiumColors[idx])}>
                      {idx === 0 ? <Crown size={20} /> : <Medal size={18} />}
                    </div>
                    <p className="font-display text-sm font-bold text-white">{r.team.name}</p>
                    <p className="text-xs text-ink-400">{r.project.title}</p>
                    <p className="mt-1 font-display text-xl font-bold gradient-text">{r.total}</p>
                  </div>
                  <div className={cn('w-24 rounded-t-xl bg-gradient-to-b sm:w-32', podiumColors[idx], podiumHeights[idx])} style={{ opacity: 0.8 }}>
                    <div className="flex h-full items-center justify-center font-display text-2xl font-bold text-ink-950">
                      #{r.rank}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Full table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/[0.06] bg-white/[0.02] text-left text-xs text-ink-400">
                <th className="px-4 py-3 font-semibold">Rank</th>
                <th className="px-4 py-3 font-semibold">Team</th>
                <th className="px-4 py-3 font-semibold">Project</th>
                {RUBRIC.map((r) => (
                  <th key={r.key} className="px-3 py-3 text-center font-semibold">{r.label.split(' ')[0]}</th>
                ))}
                <th className="px-4 py-3 text-center font-semibold">Total</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr
                  key={r.team.id}
                  className={cn('border-b border-white/[0.03] transition-colors hover:bg-white/[0.02]', r.rank <= 3 && 'bg-white/[0.015]')}
                >
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2">
                      <span className={cn('flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold', r.rank === 1 ? 'bg-amber-500/20 text-amber-300' : r.rank === 2 ? 'bg-ink-300/20 text-ink-100' : r.rank === 3 ? 'bg-orange-500/20 text-orange-300' : 'bg-white/[0.06] text-ink-300')}>
                        {r.rank}
                      </span>
                      {r.rank <= 3 ? <Trophy size={14} className="text-amber-400" /> : i === 0 ? <ArrowUp size={14} className="text-emerald-400" /> : <Minus size={14} className="text-ink-400" />}
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <p className="font-semibold text-white">{r.team.name}</p>
                    <p className="text-xs text-ink-400">{r.evalCount} judge{r.evalCount !== 1 ? 's' : ''}</p>
                  </td>
                  <td className="px-4 py-3.5">
                    <p className="font-medium text-white">{r.project.title}</p>
                    <p className="text-xs text-ink-400">{r.project.category}</p>
                  </td>
                  {RUBRIC.map((rub) => (
                    <td key={rub.key} className="px-3 py-3.5 text-center">
                      <span className="font-mono text-sm text-ink-200">{r.scores[rub.key]}</span>
                    </td>
                  ))}
                  <td className="px-4 py-3.5 text-center">
                    <span className={cn('font-display text-base font-bold', r.rank === 1 ? 'text-amber-400' : r.rank === 2 ? 'text-ink-100' : r.rank === 3 ? 'text-orange-300' : 'text-brand-300')}>
                      {r.total}
                    </span>
                    <span className="text-xs text-ink-400">/100</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {rows.length === 0 && (
          <div className="p-12 text-center">
            <Trophy size={32} className="mx-auto mb-3 text-ink-400" />
            <p className="text-sm text-ink-300">No scored submissions yet. Judging will populate the leaderboard.</p>
          </div>
        )}
      </div>
    </div>
  );
}
