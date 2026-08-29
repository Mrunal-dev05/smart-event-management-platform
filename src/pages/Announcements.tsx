import { useState } from 'react';
import { Megaphone, Plus, Clock, MapPin, User, AlertCircle, Bell } from 'lucide-react';
import { useApp } from '../store';
import { Badge, Modal, SectionHeader } from '@/components/ui';
import { formatRelative, formatTime, cn } from '../utils';
import type { Priority } from '../types';

export function Announcements() {
  const { announcements, publishAnnouncement, toast, role } = useApp();
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({ title: '', message: '', priority: 'medium' as Priority, venue: 'Main Hall' });

  const submit = () => {
    if (!form.title.trim() || !form.message.trim()) {
      toast({ type: 'warning', title: 'Missing details', message: 'Title and message are required.' });
      return;
    }
    publishAnnouncement(form);
    toast({ type: 'success', title: 'Announcement published', message: form.title });
    setForm({ title: '', message: '', priority: 'medium', venue: 'Main Hall' });
    setModal(false);
  };

  const priorityStyle: Record<Priority, { badge: 'danger' | 'warning' | 'info'; ring: string; label: string }> = {
    high: { badge: 'danger', ring: 'border-l-red-500', label: 'High Priority' },
    medium: { badge: 'warning', ring: 'border-l-amber-500', label: 'Medium' },
    low: { badge: 'info', ring: 'border-l-brand-500', label: 'Low' },
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <SectionHeader
        title="Announcement Center"
        subtitle="Real-time announcements pushed to all participants"
        action={
          role === 'organizer' && (
            <button onClick={() => setModal(true)} className="btn-primary">
              <Plus size={16} /> Create Announcement
            </button>
          )
        }
      />

      <div className="grid gap-4 lg:grid-cols-3">
        {/* Feed */}
        <div className="space-y-3 lg:col-span-2">
          {announcements.map((a, i) => {
            const ps = priorityStyle[a.priority];
            return (
              <div
                key={a.id}
                className={cn('card card-hover border-l-4 p-5 animate-fade-in', ps.ring)}
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <div className="flex items-start gap-3">
                  <div className={cn(
                    'flex h-9 w-9 shrink-0 items-center justify-center rounded-lg',
                    a.priority === 'high' ? 'bg-red-500/10 text-red-400' : a.priority === 'medium' ? 'bg-amber-500/10 text-amber-400' : 'bg-brand-500/10 text-brand-400',
                  )}>
                    {a.priority === 'high' ? <AlertCircle size={18} /> : <Megaphone size={18} />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-display text-base font-semibold text-white">{a.title}</p>
                      <Badge variant={ps.badge}>{ps.label}</Badge>
                    </div>
                    <p className="mt-1.5 text-sm text-ink-200 leading-relaxed">{a.message}</p>
                    <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-ink-400">
                      <span className="flex items-center gap-1"><Clock size={12} /> {formatRelative(a.time)}</span>
                      <span className="flex items-center gap-1"><MapPin size={12} /> {a.venue}</span>
                      <span className="flex items-center gap-1"><User size={12} /> {a.organizer}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <div className="card p-5">
            <div className="flex items-center gap-2">
              <Bell size={16} className="text-brand-400" />
              <p className="section-title">Feed Stats</p>
            </div>
            <div className="mt-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-ink-300">Total announcements</span>
                <span className="font-display text-lg font-bold text-white">{announcements.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-ink-300">High priority</span>
                <span className="font-display text-lg font-bold text-red-400">{announcements.filter((a) => a.priority === 'high').length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-ink-300">Latest</span>
                <span className="text-xs text-ink-400">{announcements[0] ? formatRelative(announcements[0].time) : '—'}</span>
              </div>
            </div>
          </div>

          <div className="card p-5">
            <p className="section-title mb-3">Priority Legend</p>
            <div className="space-y-2">
              <div className="flex items-center gap-2"><span className="h-3 w-3 rounded-full bg-red-500" /> <span className="text-sm text-ink-300">High — urgent, time-sensitive</span></div>
              <div className="flex items-center gap-2"><span className="h-3 w-3 rounded-full bg-amber-500" /> <span className="text-sm text-ink-300">Medium — important updates</span></div>
              <div className="flex items-center gap-2"><span className="h-3 w-3 rounded-full bg-brand-500" /> <span className="text-sm text-ink-300">Low — informational</span></div>
            </div>
          </div>
        </div>
      </div>

      <Modal open={modal} onClose={() => setModal(false)} title="Create Announcement">
        <div className="space-y-4">
          <div>
            <label className="label">Title</label>
            <input className="input" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="e.g. Lunch is served!" />
          </div>
          <div>
            <label className="label">Message</label>
            <textarea className="input min-h-[100px] resize-none" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Write your announcement..." />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label">Priority</label>
              <select className="input" value={form.priority} onChange={(e) => setForm({ ...form, priority: e.target.value as Priority })}>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
            <div>
              <label className="label">Venue</label>
              <input className="input" value={form.venue} onChange={(e) => setForm({ ...form, venue: e.target.value })} placeholder="Main Hall" />
            </div>
          </div>
          <button onClick={submit} className="btn-primary w-full">
            <Megaphone size={16} /> Publish Announcement
          </button>
        </div>
      </Modal>
    </div>
  );
}
