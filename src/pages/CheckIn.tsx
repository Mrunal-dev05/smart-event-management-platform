import { useState } from 'react';
import { ScanLine, CheckCircle2, XCircle, UserCheck, Search, Camera } from 'lucide-react';
import { useApp } from '../store';
import { Badge, SectionHeader } from '@/components/ui';
import { formatTime, formatRelative, cn } from '../utils';

export function CheckIn() {
  const { participants, checkIns, manualCheckIn, toast } = useApp();
  const [regId, setRegId] = useState('');
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<{ ok: boolean; message: string; name?: string } | null>(null);

  const doCheckIn = (id: string) => {
    const res = manualCheckIn(id);
    setResult({ ok: res.ok, message: res.message, name: res.participant?.name });
    if (res.ok) {
      toast({ type: 'success', title: 'Check-in successful', message: res.message });
    } else if (res.participant) {
      toast({ type: 'info', title: 'Already checked in', message: res.message });
    } else {
      toast({ type: 'error', title: 'Not found', message: res.message });
    }
  };

  const simulateScan = () => {
    setScanning(true);
    setResult(null);
    setTimeout(() => {
      // pick a random not-checked-in participant
      const pending = participants.filter((p) => !p.checkedIn);
      const target = pending[Math.floor(Math.random() * pending.length)] ?? participants[0];
      setScanning(false);
      doCheckIn(target.regId);
    }, 1800);
  };

  const checkedInCount = participants.filter((p) => p.checkedIn).length;
  const pendingCount = participants.length - checkedInCount;

  return (
    <div className="space-y-6 animate-fade-in">
      <SectionHeader
        title="QR Check-In"
        subtitle="Scan a participant QR code or enter a registration ID manually"
        action={
          <div className="flex gap-2">
            <Badge variant="success"><UserCheck size={12} /> {checkedInCount} checked in</Badge>
            <Badge variant="warning">{pendingCount} pending</Badge>
          </div>
        }
      />

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Scanner */}
        <div className="card p-6">
          <p className="section-title mb-4">QR Scanner</p>
          <div className="relative mx-auto aspect-square max-w-xs overflow-hidden rounded-2xl border border-white/[0.08] bg-ink-950/60">
            {/* Scanner viewport */}
            <div className="absolute inset-0 flex items-center justify-center">
              {scanning ? (
                <div className="text-center">
                  <div className="mx-auto mb-3 h-12 w-12 animate-spin-slow rounded-full border-2 border-brand-400 border-t-transparent" />
                  <p className="text-sm text-brand-300">Scanning...</p>
                </div>
              ) : result ? (
                <div className="px-6 text-center animate-scale-in">
                  <div className={cn('mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full', result.ok ? 'bg-emerald-500/15 text-emerald-400' : 'bg-red-500/15 text-red-400')}>
                    {result.ok ? <CheckCircle2 size={30} /> : <XCircle size={30} />}
                  </div>
                  <p className="font-display text-base font-bold text-white">{result.ok ? 'Checked In' : 'Failed'}</p>
                  {result.name && <p className="text-sm text-brand-300">{result.name}</p>}
                  <p className="mt-1 text-xs text-ink-400">{result.message}</p>
                </div>
              ) : (
                <div className="text-center">
                  <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/[0.04] text-ink-400">
                    <Camera size={28} />
                  </div>
                  <p className="text-sm text-ink-300">Point camera at QR code</p>
                </div>
              )}
            </div>
            {/* Corner brackets */}
            <div className="pointer-events-none absolute inset-6">
              <div className="absolute left-0 top-0 h-8 w-8 border-l-2 border-t-2 border-brand-400 rounded-tl-lg" />
              <div className="absolute right-0 top-0 h-8 w-8 border-r-2 border-t-2 border-brand-400 rounded-tr-lg" />
              <div className="absolute bottom-0 left-0 h-8 w-8 border-b-2 border-l-2 border-brand-400 rounded-bl-lg" />
              <div className="absolute bottom-0 right-0 h-8 w-8 border-b-2 border-r-2 border-brand-400 rounded-br-lg" />
              {scanning && <div className="absolute inset-x-0 top-0 h-0.5 animate-pulse bg-brand-400 shadow-glow" style={{ animation: 'pulse-ring 1.5s ease-in-out infinite' }} />}
            </div>
          </div>
          <button onClick={simulateScan} disabled={scanning} className="btn-primary mt-5 w-full">
            <ScanLine size={18} /> {scanning ? 'Scanning...' : 'Simulate Scan'}
          </button>
        </div>

        {/* Manual entry + recent */}
        <div className="space-y-6">
          <div className="card p-6">
            <p className="section-title mb-4">Manual Check-In</p>
            <label className="label">Registration ID</label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
                <input
                  className="input pl-9 font-mono"
                  value={regId}
                  onChange={(e) => setRegId(e.target.value)}
                  placeholder="ES26-0001"
                  onKeyDown={(e) => e.key === 'Enter' && regId && doCheckIn(regId)}
                />
              </div>
              <button onClick={() => regId && doCheckIn(regId)} className="btn-violet">
                <UserCheck size={16} /> Verify & Check In
              </button>
            </div>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {participants.filter((p) => !p.checkedIn).slice(0, 4).map((p) => (
                <button key={p.id} onClick={() => { setRegId(p.regId); doCheckIn(p.regId); }} className="chip border border-white/[0.06] bg-white/[0.04] text-ink-300 hover:border-brand-400/30 hover:text-white">
                  {p.regId}
                </button>
              ))}
            </div>
          </div>

          <div className="card p-5">
            <p className="section-title mb-4">Recent Check-Ins</p>
            <div className="space-y-2 max-h-72 overflow-y-auto">
              {checkIns.map((c) => (
                <div key={c.id} className="flex items-center gap-3 rounded-lg border border-white/[0.04] bg-white/[0.02] px-3 py-2.5 animate-fade-in">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400">
                    <UserCheck size={14} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-white">{c.participantName}</p>
                    <p className="text-xs text-ink-400">{c.regId} · {c.college}</p>
                  </div>
                  <div className="text-right">
                    <Badge variant="success">In</Badge>
                    <p className="mt-0.5 text-[10px] text-ink-400">{formatRelative(c.time)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* All participants status */}
      <div className="card p-5">
        <p className="section-title mb-4">Participant Status ({participants.length})</p>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {participants.map((p) => (
            <div key={p.id} className="flex items-center gap-3 rounded-lg border border-white/[0.04] bg-white/[0.02] px-3 py-2.5">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white truncate">{p.name}</p>
                <p className="text-xs text-ink-400 font-mono">{p.regId}</p>
              </div>
              {p.checkedIn ? <Badge variant="success">Checked in</Badge> : <Badge variant="neutral">Not checked in</Badge>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
