import { CheckCircle2, Info, AlertTriangle, XCircle, X } from 'lucide-react';
import { useApp } from '../store';
import { cn } from '../utils';

export function ToastContainer() {
  const { toasts, dismissToast } = useApp();
  const icons = {
    success: <CheckCircle2 size={18} className="text-emerald-400" />,
    info: <Info size={18} className="text-brand-400" />,
    warning: <AlertTriangle size={18} className="text-amber-400" />,
    error: <XCircle size={18} className="text-red-400" />,
  };
  const borders = {
    success: 'border-emerald-500/20',
    info: 'border-brand-500/20',
    warning: 'border-amber-500/20',
    error: 'border-red-500/20',
  };
  return (
    <div className="fixed bottom-5 right-5 z-[60] flex w-full max-w-sm flex-col gap-2.5 px-4 sm:px-0">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={cn('glass-strong animate-slide-in-right flex items-start gap-3 rounded-xl border p-3.5 pr-3', borders[t.type])}
        >
          <div className="mt-0.5 shrink-0">{icons[t.type]}</div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-white">{t.title}</p>
            <p className="mt-0.5 text-xs text-ink-300">{t.message}</p>
          </div>
          <button onClick={() => dismissToast(t.id)} className="shrink-0 rounded-md p-1 text-ink-400 hover:text-white">
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  );
}
