'use client';
import { useState, useEffect, useCallback } from 'react';
import {
  Plus, Trash2, Edit3, X, Save, Upload, RefreshCw, Users, Star,
  Eye, Search, CheckCircle, Mail, Phone, Linkedin, ArrowUp, ArrowDown
} from 'lucide-react';

interface TeamMember {
  _id?: string; name: string; slug?: string; designation: string;
  specialization: string; bio: string; qualification: string; experience: string;
  photo: string; email: string; phone: string; linkedin: string; barCouncilId: string;
  order: number; featured: boolean; status: 'draft' | 'published';
}

const blank: TeamMember = {
  name: '', designation: 'Advocate', specialization: '', bio: '', qualification: '',
  experience: '', photo: '', email: '', phone: '', linkedin: '', barCouncilId: '',
  order: 0, featured: false, status: 'published',
};

function TeamForm({ member, onSave, onCancel }: { member: TeamMember | null; onSave: () => void; onCancel: () => void }) {
  const [form, setForm] = useState<TeamMember>({ ...blank, ...(member || {}) });
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');

  const setF = (k: keyof TeamMember, v: any) => setForm(p => ({ ...p, [k]: v }));

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true); setMsg('');
    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const res = await fetch('/api/upload', {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ image: reader.result }),
        });
        const data = await res.json();
        if (data.url) setF('photo', data.url);
        else setMsg('Upload failed — check Cloudinary configuration.');
      } catch { setMsg('Photo upload failed.'); }
      setUploading(false);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async (status: 'published' | 'draft') => {
    if (!form.name.trim()) { setMsg('⚠️ Name is required.'); return; }
    if (!form.designation.trim()) { setMsg('⚠️ Designation is required.'); return; }
    setSaving(true); setMsg('');
    const payload = { ...form, status };
    try {
      const isEdit = !!form._id;
      const url = isEdit ? `/api/team/${form._id}` : '/api/team';
      const method = isEdit ? 'PUT' : 'POST';
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      if (!res.ok) throw new Error(await res.text());
      setMsg(status === 'draft' ? '✓ Saved as Draft' : '✓ Published!');
      setTimeout(onSave, 900);
    } catch (err: any) { setMsg(`Error: ${err.message || 'Try again.'}`); }
    setSaving(false);
  };

  return (
    <div className="max-w-[680px] mx-auto">
      <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
        <button onClick={onCancel} className="flex items-center gap-2 text-xs text-[var(--muted2)] hover:text-[var(--ivory)] transition-colors"><X size={14} /> Cancel</button>
        <div className="flex items-center gap-2 flex-wrap">
          {msg && <span className={`text-xs px-3 py-1.5 rounded-xl ${msg.startsWith('✓') ? 'bg-green-500/15 text-green-300' : 'bg-red-500/15 text-red-300'}`}>{msg}</span>}
          <button onClick={() => handleSave('draft')} disabled={saving} className="btn-outline text-xs py-2 px-4"><Save size={12} /> Draft</button>
          <button onClick={() => handleSave('published')} disabled={saving} className="btn-gold text-xs py-2 px-5">
            {saving ? <><RefreshCw size={12} className="animate-spin" /> Saving...</> : form._id ? '✓ Update' : '🚀 Publish'}
          </button>
        </div>
      </div>

      {/* Photo */}
      <div className="flex flex-col items-center mb-6">
        <div className="w-28 h-28 rounded-2xl overflow-hidden border-2 border-[rgba(201,168,76,0.25)] bg-[#101520] flex items-center justify-center mb-3">
          {form.photo
            ? <img src={form.photo} alt={form.name} className="w-full h-full object-cover" />
            : <Users size={32} className="text-[var(--muted2)] opacity-40" />}
        </div>
        <label className="btn-outline text-xs py-2 px-4 cursor-pointer">
          {uploading ? <><RefreshCw size={11} className="animate-spin" /> Uploading...</> : <><Upload size={11} /> Upload Photo</>}
          <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" disabled={uploading} />
        </label>
      </div>

      <label className="block text-[10px] text-[var(--gold)] mb-1.5 font-bold uppercase tracking-wider">Full Name *</label>
      <input value={form.name} onChange={e => setF('name', e.target.value)}
        className="w-full bg-[rgba(201,168,76,0.04)] border border-[rgba(201,168,76,0.25)] focus:border-[var(--gold)] rounded-xl px-4 py-3 outline-none font-display text-2xl font-bold text-[var(--ivory)] placeholder-[var(--muted2)] mb-4 transition-colors"
        placeholder="e.g. Adv. Priya Sharma" />

      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-[10px] text-[var(--muted2)] mb-1.5 font-bold uppercase tracking-wider">Designation *</label>
          <input value={form.designation} onChange={e => setF('designation', e.target.value)} className="input text-sm" placeholder="e.g. Senior Associate" />
        </div>
        <div>
          <label className="block text-[10px] text-[var(--muted2)] mb-1.5 font-bold uppercase tracking-wider">Experience</label>
          <input value={form.experience} onChange={e => setF('experience', e.target.value)} className="input text-sm" placeholder="e.g. 5+ Years" />
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-[10px] text-[var(--muted2)] mb-1.5 font-bold uppercase tracking-wider">Specialization</label>
        <input value={form.specialization} onChange={e => setF('specialization', e.target.value)} className="input text-sm" placeholder="e.g. Criminal Law, Constitutional Law" />
      </div>

      <div className="mb-4">
        <label className="block text-[10px] text-[var(--muted2)] mb-1.5 font-bold uppercase tracking-wider">Qualification</label>
        <input value={form.qualification} onChange={e => setF('qualification', e.target.value)} className="input text-sm" placeholder="e.g. LL.B., LL.M., Delhi University" />
      </div>

      <div className="mb-4">
        <label className="block text-[10px] text-[var(--muted2)] mb-1.5 font-bold uppercase tracking-wider">Bio / About</label>
        <textarea value={form.bio} onChange={e => setF('bio', e.target.value)} className="input text-sm" style={{ minHeight: 110 }} placeholder="Brief professional background, achievements, focus areas..." />
      </div>

      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-[10px] text-[var(--muted2)] mb-1.5 font-bold uppercase tracking-wider">Email</label>
          <input value={form.email} onChange={e => setF('email', e.target.value)} className="input text-sm" placeholder="email@nyayasutra.org" />
        </div>
        <div>
          <label className="block text-[10px] text-[var(--muted2)] mb-1.5 font-bold uppercase tracking-wider">Phone</label>
          <input value={form.phone} onChange={e => setF('phone', e.target.value)} className="input text-sm" placeholder="+91 XXXXXXXXXX" />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-[10px] text-[var(--muted2)] mb-1.5 font-bold uppercase tracking-wider">LinkedIn URL</label>
          <input value={form.linkedin} onChange={e => setF('linkedin', e.target.value)} className="input text-sm" placeholder="https://linkedin.com/in/..." />
        </div>
        <div>
          <label className="block text-[10px] text-[var(--muted2)] mb-1.5 font-bold uppercase tracking-wider">Bar Council ID</label>
          <input value={form.barCouncilId} onChange={e => setF('barCouncilId', e.target.value)} className="input text-sm" placeholder="e.g. D/1234/2015" />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="flex items-center justify-between p-3 rounded-xl bg-[rgba(201,168,76,0.04)] border border-[rgba(201,168,76,0.1)]">
          <div><p className="font-medium text-sm">Featured</p><p className="text-xs text-[var(--muted2)]">Show prominently (e.g. Founder)</p></div>
          <button onClick={() => setF('featured', !form.featured)} className={`w-11 h-6 rounded-full transition-colors relative ${form.featured ? 'bg-[var(--gold)]' : 'bg-[rgba(255,255,255,0.08)]'}`}>
            <span className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all shadow ${form.featured ? 'left-6' : 'left-1'}`} />
          </button>
        </div>
        <div>
          <label className="block text-[10px] text-[var(--muted2)] mb-1.5 font-bold uppercase tracking-wider">Display Order (0 = first)</label>
          <input type="number" value={form.order} onChange={e => setF('order', Number(e.target.value))} className="input text-sm" />
        </div>
      </div>
    </div>
  );
}

export default function TeamManager() {
  const [items, setItems] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState<'list' | 'form'>('list');
  const [editing, setEditing] = useState<TeamMember | null>(null);
  const [search, setSearch] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const r = await fetch('/api/team?admin=1');
      const d = await r.json();
      setItems(Array.isArray(d) ? d : []);
    } catch { setItems([]); }
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const del = async (id: string) => {
    if (!confirm('Remove this team member?')) return;
    await fetch(`/api/team/${id}`, { method: 'DELETE' });
    load();
  };

  const moveOrder = async (member: TeamMember, dir: -1 | 1) => {
    await fetch(`/api/team/${member._id}`, {
      method: 'PUT', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ order: (member.order || 0) + dir }),
    });
    load();
  };

  const filtered = items.filter(i => !search || i.name?.toLowerCase().includes(search.toLowerCase()) || i.designation?.toLowerCase().includes(search.toLowerCase()));

  if (view === 'form') {
    return <TeamForm member={editing} onSave={() => { load(); setView('list'); setEditing(null); }} onCancel={() => { setView('list'); setEditing(null); }} />;
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="relative w-full sm:max-w-xs">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted2)]" />
          <input value={search} onChange={e => setSearch(e.target.value)} className="input pl-8 text-sm py-2.5" placeholder="Search team members..." />
        </div>
        <div className="flex gap-2">
          <button onClick={load} className="btn-outline text-xs py-2 px-3"><RefreshCw size={12} /></button>
          <button onClick={() => { setEditing(null); setView('form'); }} className="btn-gold text-sm py-2 px-4 whitespace-nowrap"><Plus size={13} /> Add Team Member</button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-16"><RefreshCw size={20} className="animate-spin inline text-[var(--muted2)]" /></div>
      ) : filtered.length === 0 ? (
        <div className="card text-center py-16">
          <Users size={40} className="text-[var(--muted2)] mx-auto mb-3 opacity-30" />
          <p className="text-[var(--muted2)] text-sm">{search ? 'No matching team members.' : 'No team members yet. Add your first one!'}</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filtered.map((m, idx) => (
            <div key={m._id} className="card">
              <div className="flex items-start gap-3">
                <div className="w-14 h-14 rounded-xl overflow-hidden bg-[#101520] shrink-0 border border-[rgba(201,168,76,0.15)]">
                  {m.photo ? <img src={m.photo} alt={m.name} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center"><Users size={18} className="text-[var(--muted2)] opacity-40" /></div>}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    {m.featured && <Star size={11} className="text-[var(--gold)] shrink-0" />}
                    <h3 className="font-semibold text-sm truncate">{m.name}</h3>
                  </div>
                  <p className="text-xs text-[var(--gold)] truncate">{m.designation}</p>
                  <p className="text-[10px] text-[var(--muted2)] truncate mt-0.5">{m.specialization}</p>
                </div>
              </div>
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-[rgba(201,168,76,0.08)]">
                <span className={`badge badge-${m.status}`}>{m.status}</span>
                <div className="flex items-center gap-0.5">
                  <button onClick={() => moveOrder(m, -1)} className="tb-btn" title="Move up"><ArrowUp size={12} /></button>
                  <button onClick={() => moveOrder(m, 1)} className="tb-btn" title="Move down"><ArrowDown size={12} /></button>
                  <button onClick={() => { setEditing(m); setView('form'); }} className="tb-btn" title="Edit"><Edit3 size={12} /></button>
                  <a href="/team" target="_blank" className="tb-btn" title="View"><Eye size={12} /></a>
                  <button onClick={() => del(m._id!)} className="tb-btn text-red-400 hover:bg-red-500/10" title="Remove"><Trash2 size={12} /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
