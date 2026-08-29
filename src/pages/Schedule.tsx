import { useEffect, useState } from 'react';
import { Calendar, Clock, MapPin, CheckCircle2, Circle, Utensils, Mic, PartyPopper, Flag } from 'lucide-react';
import { useApp } from '../store';
import { SectionHeader, Badge } from '@/components/ui';
import { cn } from '../utils';
import type { TimelineEvent } from '../types';

const TYPE_META: Record<TimelineEvent['type'], { icon: typeof Calendar; color: string; label: string }> = {
  checkpoint: { icon: Flag, color: 'text-brand-400 bg-brand-500/10', label: 'Checkpoint' },
  meal: { icon: Utensils, color: 'text-amber-400 bg-amber-500/10', label: 'Meal' },
  talk: { icon: Mic, color: 'text-violet-400 bg-violet-500/10', label: 'Talk' },
  social: { icon: PartyPopper, color: 'text-fuchsia-400 bg-fuchsia-500/10', label: 'Social' },
  deadline: { icon: Clock, color: 'text-red-400 bg-red-500/10', label: 'Deadline' },
};

export function Schedule() {
  const { timeline } = useApp();
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 60000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="space-y-6 animate-fade-in">
      <SectionHeader title="Event Schedule" subtitle="Full timeline of HackSphere 2026" />

      <div className="card p-6">
        <div className="relative">
          {/* vertical line */}
          <div className="absolute left-[18px] top-2 bottom-2 w-px bg-white/[0.08]" />
          <div className="space-y-1">
            {timeline.map((t, i) => {
              const meta = TYPE_META[t.type];
              const Icon = meta.icon;
              return (
                <div
                  key={t.id}
                  className="relative flex gap-4 py-3 animate-fade-in"
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  <div className={cn('relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full', meta.color)}>
                    {t.done ? <CheckCircle2 size={16} /> : <Circle size={16} />}
                  </div>
                  <div className="flex-1 rounded-xl border border-white/[0.04] bg-white/[0.02] p-3.5">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="font-display text-sm font-semibold text-white">{t.time}</span>
                        <Badge variant="neutral"><Icon size={11} /> {meta.label}</Badge>
                      </div>
                      {t.done ? <Badge variant="success">Done</Badge> : <Badge variant="warning">Upcoming</Badge>}
                    </div>
                    <p className="mt-1.5 text-sm font-medium text-white">{t.title}</p>
                    <p className="text-xs text-ink-400">{t.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
