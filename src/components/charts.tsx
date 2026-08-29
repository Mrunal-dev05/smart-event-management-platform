import { useMemo } from 'react';
import { cn } from '../utils';

interface Point {
  label: string;
  [key: string]: string | number;
}

export function AreaChart({
  data,
  series,
  height = 180,
}: {
  data: Point[];
  series: { key: string; color: string; label: string }[];
  height?: number;
}) {
  const { path, areaPath, max, points } = useMemo(() => {
    const w = 100;
    const h = 100;
    const max = Math.max(...data.flatMap((d) => series.map((s) => Number(d[s.key]))), 1);
    const stepX = w / (data.length - 1 || 1);
    const seriesData = series.map((s) => {
      const pts = data.map((d, i) => ({
        x: i * stepX,
        y: h - (Number(d[s.key]) / max) * h,
      }));
      const line = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
      const area = `${line} L ${w} ${h} L 0 ${h} Z`;
      return { ...s, pts, line, area };
    });
    return { path: seriesData, areaPath: seriesData, max, points: seriesData };
  }, [data, series]);

  return (
    <div className="w-full" style={{ height }}>
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-full w-full overflow-visible">
        <defs>
          {points.map((s) => (
            <linearGradient key={s.key} id={`grad-${s.key}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={s.color} stopOpacity="0.35" />
              <stop offset="100%" stopColor={s.color} stopOpacity="0" />
            </linearGradient>
          ))}
        </defs>
        {[0, 25, 50, 75, 100].map((y) => (
          <line key={y} x1="0" y1={y} x2="100" y2={y} stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />
        ))}
        {path.map((s) => (
          <g key={s.key}>
            <path d={s.area} fill={`url(#grad-${s.key})`} />
            <path d={s.line} fill="none" stroke={s.color} strokeWidth="1.5" vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        ))}
      </svg>
      <div className="mt-2 flex justify-between px-1">
        {data.map((d) => (
          <span key={d.label} className="text-[10px] text-ink-400">{d.label}</span>
        ))}
      </div>
      <div className="mt-1 flex gap-4 px-1">
        {series.map((s) => (
          <span key={s.key} className="flex items-center gap-1.5 text-[10px] text-ink-300">
            <span className="h-2 w-2 rounded-full" style={{ background: s.color }} />
            {s.label}
          </span>
        ))}
      </div>
    </div>
  );
}

export function BarChart({
  data,
  color = '#38bdf8',
  height = 160,
}: {
  data: Point[];
  color?: string;
  height?: number;
}) {
  const max = Math.max(...data.map((d) => Number(d.value)), 1);
  return (
    <div className="w-full" style={{ height }}>
      <div className="flex h-full items-end justify-between gap-2">
        {data.map((d) => (
          <div key={d.label} className="flex flex-1 flex-col items-center gap-2">
            <div className="flex w-full flex-1 items-end">
              <div
                className="w-full rounded-t-md transition-all duration-700 ease-out hover:brightness-125"
                style={{
                  height: `${(Number(d.value) / max) * 100}%`,
                  background: `linear-gradient(to top, ${color}, ${color}80)`,
                  minHeight: '4px',
                }}
              />
            </div>
            <span className="text-[10px] text-ink-400">{d.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function DonutChart({
  segments,
  size = 140,
  thickness = 18,
  centerLabel,
  centerValue,
}: {
  segments: { label: string; value: number; color: string }[];
  size?: number;
  thickness?: number;
  centerLabel?: string;
  centerValue?: string;
}) {
  const total = segments.reduce((s, x) => s + x.value, 0) || 1;
  const radius = (size - thickness) / 2;
  const circ = 2 * Math.PI * radius;
  let offset = 0;
  return (
    <div className="flex items-center gap-5">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth={thickness} />
          {segments.map((seg) => {
            const len = (seg.value / total) * circ;
            const el = (
              <circle
                key={seg.label}
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke={seg.color}
                strokeWidth={thickness}
                strokeDasharray={`${len} ${circ - len}`}
                strokeDashoffset={-offset}
                strokeLinecap="round"
                className="transition-all duration-700"
              />
            );
            offset += len;
            return el;
          })}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-display text-xl font-bold text-white">{centerValue}</span>
          <span className="text-[10px] text-ink-400">{centerLabel}</span>
        </div>
      </div>
      <div className="space-y-1.5">
        {segments.map((seg) => (
          <div key={seg.label} className="flex items-center gap-2 text-xs">
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: seg.color }} />
            <span className="text-ink-300">{seg.label}</span>
            <span className="text-ink-400">{Math.round((seg.value / total) * 100)}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Sparkline({ data, color = '#38bdf8', height = 36 }: { data: number[]; color?: string; height?: number }) {
  const w = 100;
  const h = 100;
  const max = Math.max(...data, 1);
  const min = Math.min(...data, 0);
  const range = max - min || 1;
  const step = w / (data.length - 1 || 1);
  const pts = data.map((v, i) => `${i * step},${h - ((v - min) / range) * h}`).join(' ');
  return (
    <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" style={{ height }} className={cn('w-full')}>
      <polyline points={pts} fill="none" stroke={color} strokeWidth="2" vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
