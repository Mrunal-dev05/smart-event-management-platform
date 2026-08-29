import { useState } from 'react';
import { UserPlus, CheckCircle2, QrCode, Download, Search } from 'lucide-react';
import { useApp } from '../store';
import { Badge, SectionHeader } from '@/components/ui';
import { QRCode } from '@/components/QRCode';
import { ALL_SKILLS, CATEGORIES, PROJECT_INTERESTS } from '../types';
import type { ParticipantRole } from '../types';
import { cn } from '../utils';

const ROLES: ParticipantRole[] = ['Frontend', 'Backend', 'Fullstack', 'Designer', 'ML/AI', 'DevOps', 'Mobile'];

export function Registration({ onNavigate }: { onNavigate: (p: string) => void }) {
  const { participants, registerParticipant, toast, activeParticipantId, setActiveParticipantId } = useApp();
  const [form, setForm] = useState({
    name: '',
    email: '',
    college: '',
    role: 'Fullstack' as ParticipantRole,
    skills: [] as string[],
    projectInterests: [] as string[],
    availability: 'Full weekend',
    bio: '',
  });
  const [skillInput, setSkillInput] = useState('');
  const [justRegistered, setJustRegistered] = useState<string | null>(null);

  const toggle = (arr: string[], v: string) => (arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);

  const submit = () => {
    if (!form.name.trim() || !form.email.trim() || !form.college.trim()) {
      toast({ type: 'warning', title: 'Missing details', message: 'Please fill in name, email and college.' });
      return;
    }
    const p = registerParticipant({
      ...form,
      teamStatus: 'solo',
      teamId: null,
    });
    setJustRegistered(p.regId);
    setActiveParticipantId(p.id);
    toast({ type: 'success', title: 'Registration confirmed', message: `${p.name} is registered as ${p.regId}.` });
  };

  const registered = justRegistered ? participants.find((p) => p.regId === justRegistered) : null;

  return (
    <div className="space-y-6 animate-fade-in">
      <SectionHeader title="Participant Registration" subtitle="Register a new participant and generate their QR code" />

      <div className="grid gap-6 lg:grid-cols-5">
        {/* Form */}
        <div className="card p-6 lg:col-span-3">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="label">Full Name</label>
              <input className="input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Aarav Sharma" />
            </div>
            <div>
              <label className="label">Email</label>
              <input className="input" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="name@college.ac.in" />
            </div>
            <div>
              <label className="label">College</label>
              <input className="input" value={form.college} onChange={(e) => setForm({ ...form, college: e.target.value })} placeholder="e.g. IIT Bombay" />
            </div>
            <div>
              <label className="label">Preferred Role</label>
              <select className="input" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value as ParticipantRole })}>
                {ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
          </div>

          <div className="mt-4">
            <label className="label">Skills</label>
            <div className="flex flex-wrap gap-2">
              {ALL_SKILLS.map((s) => (
                <button
                  key={s}
                  onClick={() => setForm({ ...form, skills: toggle(form.skills, s) })}
                  className={cn(
                    'chip border transition-colors',
                    form.skills.includes(s) ? 'bg-brand-500/20 border-brand-400/40 text-brand-200' : 'bg-white/[0.04] border-white/[0.06] text-ink-300 hover:border-white/15',
                  )}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4">
            <label className="label">Project Interests</label>
            <div className="flex flex-wrap gap-2">
              {PROJECT_INTERESTS.map((s) => (
                <button
                  key={s}
                  onClick={() => setForm({ ...form, projectInterests: toggle(form.projectInterests, s) })}
                  className={cn(
                    'chip border transition-colors',
                    form.projectInterests.includes(s) ? 'bg-violet-500/20 border-violet-400/40 text-violet-200' : 'bg-white/[0.04] border-white/[0.06] text-ink-300 hover:border-white/15',
                  )}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <label className="label">Availability</label>
              <select className="input" value={form.availability} onChange={(e) => setForm({ ...form, availability: e.target.value })}>
                <option>Full weekend</option>
                <option>Saturday only</option>
                <option>Sunday only</option>
                <option>Remote</option>
              </select>
            </div>
            <div>
              <label className="label">Short Bio</label>
              <input className="input" value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} placeholder="Tell us about yourself" />
            </div>
          </div>

          <button onClick={submit} className="btn-primary mt-6 w-full">
            <UserPlus size={18} /> Register Participant
          </button>
        </div>

        {/* QR / confirmation */}
        <div className="lg:col-span-2">
          {registered ? (
            <div className="card p-6 text-center animate-scale-in">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400">
                <CheckCircle2 size={26} />
              </div>
              <p className="font-display text-lg font-bold text-white">Registration Confirmed</p>
              <p className="text-sm text-ink-300">{registered.name}</p>
              <div className="mt-4 flex justify-center">
                <QRCode value={registered.regId} size={170} />
              </div>
              <div className="mt-4 space-y-1 text-sm">
                <p><span className="text-ink-400">Reg ID:</span> <span className="font-mono font-semibold text-brand-300">{registered.regId}</span></p>
                <p><span className="text-ink-400">College:</span> <span className="text-white">{registered.college}</span></p>
                <p><span className="text-ink-400">Role:</span> <span className="text-white">{registered.role}</span></p>
              </div>
              <div className="mt-4 flex gap-2">
                <button onClick={() => onNavigate('checkin')} className="btn-ghost flex-1">Check In Now</button>
                <button onClick={() => setJustRegistered(null)} className="btn-primary flex-1">Register Another</button>
              </div>
            </div>
          ) : (
            <div className="card flex h-full flex-col items-center justify-center p-6 text-center">
              <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/[0.04] text-ink-400">
                <QrCode size={28} />
              </div>
              <p className="text-sm font-medium text-ink-200">QR code appears here</p>
              <p className="mt-1 text-xs text-ink-400">Fill the form and register to generate a check-in QR code.</p>
            </div>
          )}
        </div>
      </div>

      {/* Registered list */}
      <div className="card p-5">
        <div className="mb-4 flex items-center justify-between">
          <p className="section-title">Registered Participants ({participants.length})</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/[0.06] text-left text-xs text-ink-400">
                <th className="pb-2 font-semibold">Reg ID</th>
                <th className="pb-2 font-semibold">Name</th>
                <th className="pb-2 font-semibold">College</th>
                <th className="pb-2 font-semibold">Role</th>
                <th className="pb-2 font-semibold">Team</th>
                <th className="pb-2 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {participants.slice(0, 10).map((p) => (
                <tr key={p.id} className="border-b border-white/[0.03] hover:bg-white/[0.02]">
                  <td className="py-2.5 font-mono text-xs text-brand-300">{p.regId}</td>
                  <td className="py-2.5 font-medium text-white">{p.name}</td>
                  <td className="py-2.5 text-ink-300">{p.college}</td>
                  <td className="py-2.5 text-ink-300">{p.role}</td>
                  <td className="py-2.5">
                    {p.teamStatus === 'in_team' ? <Badge variant="info">In team</Badge> : p.teamStatus === 'looking' ? <Badge variant="warning">Looking</Badge> : <Badge variant="neutral">Solo</Badge>}
                  </td>
                  <td className="py-2.5">
                    {p.checkedIn ? <Badge variant="success">Checked in</Badge> : <Badge variant="neutral">Pending</Badge>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
