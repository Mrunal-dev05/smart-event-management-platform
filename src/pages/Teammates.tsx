import { useMemo, useState } from 'react';
import { Users, Plus, X, Filter, UserPlus, Link2, Sparkles, MapPin } from 'lucide-react';
import { useApp } from '../store';
import { Badge, Modal, ProgressBar, SectionHeader, Avatar } from '@/components/ui';
import { ALL_SKILLS, PROJECT_INTERESTS } from '../types';
import type { Participant } from '../types';
import { cn } from '../utils';

export function Teammates() {
  const { participants, teams, createTeam, inviteToTeam, connectParticipant, toast, activeParticipantId } = useApp();
  const [skillFilter, setSkillFilter] = useState<string>('');
  const [roleFilter, setRoleFilter] = useState<string>('');
  const [interestFilter, setInterestFilter] = useState<string>('');
  const [search, setSearch] = useState('');
  const [teamModal, setTeamModal] = useState(false);
  const [inviteTarget, setInviteTarget] = useState<Participant | null>(null);

  const [teamName, setTeamName] = useState('');
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);

  const me = participants.find((p) => p.id === activeParticipantId);

  const filtered = useMemo(() => {
    return participants.filter((p) => {
      if (skillFilter && !p.skills.includes(skillFilter)) return false;
      if (roleFilter && p.role !== roleFilter) return false;
      if (interestFilter && !p.projectInterests.includes(interestFilter)) return false;
      if (search && !p.name.toLowerCase().includes(search.toLowerCase()) && !p.college.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [participants, skillFilter, roleFilter, interestFilter, search]);

  const roles = ['Frontend', 'Backend', 'Fullstack', 'Designer', 'ML/AI', 'DevOps', 'Mobile'];

  const openTeamModal = (p?: Participant) => {
    if (p) {
      setInviteTarget(p);
      setSelectedMembers([activeParticipantId, p.id]);
      setTeamName('');
    } else {
      setInviteTarget(null);
      setSelectedMembers([activeParticipantId]);
      setTeamName('');
    }
    setTeamModal(true);
  };

  const submitTeam = () => {
    if (!teamName.trim()) {
      toast({ type: 'warning', title: 'Team name required', message: 'Give your team a name.' });
      return;
    }
    if (selectedMembers.length < 2) {
      toast({ type: 'warning', title: 'Need at least 2 members', message: 'Invite at least one teammate.' });
      return;
    }
    createTeam(teamName, activeParticipantId, selectedMembers.filter((id) => id !== activeParticipantId));
    toast({ type: 'success', title: 'Team created', message: `"${teamName}" is ready to hack!` });
    setTeamModal(false);
    setInviteTarget(null);
  };

  const handleInvite = (p: Participant) => {
    const myTeam = teams.find((t) => t.id === me?.teamId);
    if (!myTeam) {
      openTeamModal(p);
      return;
    }
    inviteToTeam(myTeam.id, p.id);
    toast({ type: 'success', title: 'Invite sent', message: `${p.name} has been added to ${myTeam.name}.` });
  };

  const handleConnect = (p: Participant) => {
    connectParticipant(p.id);
    toast({ type: 'info', title: 'Connection request sent', message: `Reached out to ${p.name}.` });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <SectionHeader
        title="Find Teammates"
        subtitle="Discover hackers that match your skills and interests"
        action={
          <button onClick={() => openTeamModal()} className="btn-primary">
            <Plus size={16} /> Create Team
          </button>
        }
      />

      {/* Filters */}
      <div className="card p-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-ink-300">
            <Filter size={14} /> Filters:
          </div>
          <input
            className="input max-w-[180px]"
            placeholder="Search name or college..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select className="input max-w-[150px]" value={skillFilter} onChange={(e) => setSkillFilter(e.target.value)}>
            <option value="">All Skills</option>
            {ALL_SKILLS.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
          <select className="input max-w-[150px]" value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)}>
            <option value="">All Roles</option>
            {roles.map((r) => <option key={r} value={r}>{r}</option>)}
          </select>
          <select className="input max-w-[170px]" value={interestFilter} onChange={(e) => setInterestFilter(e.target.value)}>
            <option value="">All Interests</option>
            {PROJECT_INTERESTS.map((r) => <option key={r} value={r}>{r}</option>)}
          </select>
          {(skillFilter || roleFilter || interestFilter || search) && (
            <button
              onClick={() => { setSkillFilter(''); setRoleFilter(''); setInterestFilter(''); setSearch(''); }}
              className="chip border border-white/[0.08] bg-white/[0.04] text-ink-300 hover:text-white"
            >
              <X size={12} /> Clear
            </button>
          )}
          <span className="ml-auto text-xs text-ink-400">{filtered.length} hackers</span>
        </div>
      </div>

      {/* Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p) => (
          <div key={p.id} className="card card-hover p-5">
            <div className="flex items-start gap-3">
              <Avatar name={p.name} color={p.avatarColor} />
              <div className="flex-1 min-w-0">
                <p className="font-display text-base font-semibold text-white">{p.name}</p>
                <p className="flex items-center gap-1 text-xs text-ink-400"><MapPin size={11} /> {p.college}</p>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1 text-xs font-bold text-emerald-400">
                  <Sparkles size={12} /> {p.matchScore}%
                </div>
                <p className="text-[10px] text-ink-400">match</p>
              </div>
            </div>

            <p className="mt-3 text-xs text-ink-300 line-clamp-2">{p.bio}</p>

            <div className="mt-3">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-ink-400">Skills</p>
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                {p.skills.slice(0, 4).map((s) => (
                  <span key={s} className="chip bg-brand-500/10 text-brand-300">{s}</span>
                ))}
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-ink-400">Role</p>
                <Badge variant="violet" className="mt-1">{p.role}</Badge>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-ink-400">Availability</p>
                <p className="mt-1 text-xs text-ink-200">{p.availability}</p>
              </div>
            </div>

            <div className="mt-3">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-ink-400">Interests</p>
              <div className="mt-1 flex flex-wrap gap-1.5">
                {p.projectInterests.map((i) => (
                  <span key={i} className="chip bg-violet-500/10 text-violet-300">{i}</span>
                ))}
              </div>
            </div>

            <div className="mt-4 flex gap-2">
              <button onClick={() => handleConnect(p)} className="btn-ghost flex-1">
                <Link2 size={14} /> Connect
              </button>
              <button onClick={() => handleInvite(p)} className="btn-primary flex-1">
                <UserPlus size={14} /> Invite
              </button>
            </div>

            {p.teamStatus === 'in_team' && (
              <div className="mt-2 text-center text-[11px] text-emerald-400">Already in a team</div>
            )}
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="card p-12 text-center">
          <Users size={32} className="mx-auto mb-3 text-ink-400" />
          <p className="text-sm text-ink-300">No teammates match your filters.</p>
        </div>
      )}

      {/* Team creation modal */}
      <Modal open={teamModal} onClose={() => setTeamModal(false)} title={inviteTarget ? `Create team with ${inviteTarget.name}` : 'Create a Team'}>
        <div className="space-y-4">
          <div>
            <label className="label">Team Name</label>
            <input className="input" value={teamName} onChange={(e) => setTeamName(e.target.value)} placeholder="e.g. Null Pointers" />
          </div>
          <div>
            <label className="label">Selected Members ({selectedMembers.length})</label>
            <div className="space-y-2">
              {selectedMembers.map((id) => {
                const p = participants.find((x) => x.id === id);
                if (!p) return null;
                return (
                  <div key={id} className="flex items-center gap-3 rounded-lg border border-white/[0.06] bg-white/[0.02] p-2.5">
                    <Avatar name={p.name} color={p.avatarColor} size="sm" />
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-white">{p.name}</p>
                      <p className="text-xs text-ink-400">{p.role} · {p.college}</p>
                    </div>
                    {id !== activeParticipantId && (
                      <button onClick={() => setSelectedMembers(selectedMembers.filter((x) => x !== id))} className="text-ink-400 hover:text-red-400">
                        <X size={16} />
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          <div>
            <label className="label">Add more teammates</label>
            <div className="flex flex-wrap gap-1.5">
              {participants
                .filter((p) => !selectedMembers.includes(p.id) && p.teamStatus !== 'in_team')
                .slice(0, 8)
                .map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setSelectedMembers([...selectedMembers, p.id])}
                    className="chip border border-white/[0.06] bg-white/[0.04] text-ink-300 hover:border-brand-400/30 hover:text-white"
                  >
                    <Plus size={12} /> {p.name}
                  </button>
                ))}
            </div>
          </div>
          <button onClick={submitTeam} className="btn-primary w-full">
            <Users size={16} /> Create Team
          </button>
        </div>
      </Modal>
    </div>
  );
}
