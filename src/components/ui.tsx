import { type ReactNode } from 'react';
import { cn } from '../utils';

export function Badge({
  children,
  variant = 'neutral',
  className,
}: {
  children: ReactNode;
  variant?: 'neutral' | 'success' | 'warning' | 'danger' | 'info' | 'violet';
  className?: string;
}) {
  const variants: Record<string, string> = {
    neutral: 'bg-white/[0.06] text-ink-200 border-white/10',
    success: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/20',
    warning: 'bg-amber-500/15 text-amber-300 border-amber-500/20',
    danger: 'bg-red-500/15 text-red-300 border-red-500/20',
    info: 'bg-brand-500/15 text-brand-300 border-brand-500/20',
    violet: 'bg-violet-500/15 text-violet-300 border-violet-500/20',
  };
  return (
    <span className={cn('chip border', variants[variant], className)}>{children}</span>
  );
}

export function Avatar({
  name,
  color,
  size = 'md',
}: {
  name: string;
  color: string;
  size?: 'sm' | 'md' | 'lg';
}) {
  const sizes = {
    sm: 'h-8 w-8 text-xs',
    md: 'h-10 w-10 text-sm',
    lg: 'h-14 w-14 text-lg',
  };
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('');
  return (
    <div
      className={cn(
        'flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br font-semibold text-ink-950 ring-2 ring-white/10',
        color,
        sizes[size],
      )}
    >
      {initials}
    </div>
  );
}

export function ProgressBar({
  value,
  max = 100,
  className,
  color = 'brand',
}: {
  value: number;
  max?: number;
  className?: string;
  color?: 'brand' | 'violet' | 'emerald' | 'amber';
}) {
  const pct = Math.min(100, Math.round((value / max) * 100));
  const colors = {
    brand: 'from-brand-500 to-brand-400',
    violet: 'from-violet-500 to-violet-400',
    emerald: 'from-emerald-500 to-emerald-400',
    amber: 'from-amber-500 to-amber-400',
  };
  return (
    <div className={cn('h-2 w-full rounded-full bg-white/[0.06] overflow-hidden', className)}>
      <div
        className={cn('h-full rounded-full bg-gradient-to-r transition-all duration-700 ease-out', colors[color])}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

export function Modal({
  open,
  onClose,
  title,
  children,
  size = 'md',
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg';
}) {
  if (!open) return null;
  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-ink-950/80 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />
      <div className={cn('relative w-full glass-strong rounded-2xl animate-scale-in', sizes[size])}>
        <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-4">
          <h3 className="font-display text-base font-semibold text-white">{title}</h3>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-ink-300 hover:bg-white/[0.06] hover:text-white transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-5 max-h-[70vh] overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}

export function EmptyState({ icon, title, subtitle }: { icon: ReactNode; title: string; subtitle?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/[0.04] text-ink-400">
        {icon}
      </div>
      <p className="text-sm font-medium text-ink-200">{title}</p>
      {subtitle && <p className="mt-1 text-xs text-ink-400">{subtitle}</p>}
    </div>
  );
}

export function SectionHeader({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
      <div>
        <h1 className="font-display text-2xl font-bold text-white">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-ink-300">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}
