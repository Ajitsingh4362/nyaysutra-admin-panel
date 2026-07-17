'use client';
import { useState, useEffect, useCallback } from 'react';
import {
  Plus, Trash2, Edit3, X, Save, Upload, RefreshCw, GraduationCap, Star,
  Eye, Search, CheckCircle, ChevronDown, ChevronUp, BookOpen, FileText, Video, Mic
} from 'lucide-react';

interface Module {
  title: string; description: string; content: string; pdfUrl: string; videoUrl: string; audioUrl: string; order: number; published: boolean;
}
interface Course {
  _id?: string; title: string; slug?: string; shortSummary: string; fullDescription: string;
  level: 'Beginner'|'Intermediate'|'Advanced'; duration: string; language: string; instructor: string;
  coverImage: string; fee: number; isFree: boolean; modules: Module[];
  learningOutcomes: string[]; prerequisites: string[]; hasCertificate: boolean;
  status: 'draft'|'published'; featured: boolean;
}

const blank: Course = {
  title:'', shortSummary:'', fullDescription:'', level:'Beginner', duration:'', language:'Hindi / English',
  instructor:'Adv. A.K. Tripathi', coverImage:'', fee:0, isFree:true, modules:[],
  learningOutcomes:[], prerequisites:[], hasCertificate:false, status:'published', featured:false,
};

const blankModule: Module = { title:'', description:'', content:'', pdfUrl:'', videoUrl:'', audioUrl:'', order:0, published:true };

function CourseForm({ course, onSave, onCancel }: { course: Course|null; onSave:()=>void; onCancel:()=>void }) {
  const [form, setForm] = useState<Course>({ ...blank, ...(course||{}) });
  const [outcomeInput, setOutcomeInput] = useState('');
  const [prereqInput, setPrereqInput] = useState('');
  const [saving, setSaving] = useState(false);
  const [imgLoading, setImgLoading] = useState(false);
  const [msg, setMsg] = useState('');
  const [openModule, setOpenModule] = useState<number|null>(0);

  const setF = (k: keyof Course, v: any) => setForm(p => ({ ...p, [k]: v }));

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImgLoading(true);
    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const res = await fetch('/api/upload', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ image: reader.result }) });
        const data = await res.json();
        if (data.url) setF('coverImage', data.url);
      } catch {}
      setImgLoading(false);
    };
    reader.readAsDataURL(file);
  };

  const addModule = () => { setForm(p=>({...p, modules:[...p.modules, {...blankModule, order:p.modules.length}]})); setOpenModule(form.modules.length); };
  const removeModule = (idx:number) => setForm(p=>({...p, modules: p.modules.filter((_,i)=>i!==idx)}));
  const updateModule = (idx:number, k: keyof Module, v:any) => setForm(p=>({...p, modules: p.modules.map((m,i)=> i===idx ? {...m,[k]:v} : m)}));

  const handleSave = async (status:'published'|'draft') => {
    if (!form.title.trim()) { setMsg('⚠️ Course title is required.'); return; }
    if (!form.shortSummary.trim()) { setMsg('⚠️ Short summary is required.'); return; }
    setSaving(true); setMsg('');
    const payload = { ...form, status, fee: form.isFree ? 0 : form.fee };
    try {
      const isEdit = !!form._id;
      const url = isEdit ? `/api/courses/${form._id}` : '/api/courses';
      const method = isEdit ? 'PUT' : 'POST';
      const res = await fetch(url, { method, headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload) });
      if (!res.ok) throw new Error(await res.text());
      setMsg(status==='draft' ? '✓ Saved as Draft' : '✓ Published!');
      setTimeout(onSave, 900);
    } catch (err:any) { setMsg(`Error: ${err.message||'Try again.'}`); }
    setSaving(false);
  };

  return (
    <div className="max-w-[800px] mx-auto">
      <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
        <button onClick={onCancel} className="flex items-center gap-2 text-xs text-[var(--muted2)] hover:text-[var(--ivory)] transition-colors"><X size={14}/> Cancel</button>
        <div className="flex items-center gap-2 flex-wrap">
          {msg && <span className={`text-xs px-3 py-1.5 rounded-xl ${msg.startsWith('✓') ? 'bg-green-500/15 text-green-300' : 'bg-red-500/15 text-red-300'}`}>{msg}</span>}
          <button onClick={()=>handleSave('draft')} disabled={saving} className="btn-outline text-xs py-2 px-4"><Save size={12}/> Draft</button>
          <button onClick={()=>handleSave('published')} disabled={saving} className="btn-gold text-xs py-2 px-5">
            {saving ? <><RefreshCw size={12} className="animate-spin"/> Saving...</> : form._id ? '✓ Update' : '🚀 Publish'}
          </button>
        </div>
      </div>

      <label className="block text-[10px] text-[var(--gold)] mb-1.5 font-bold uppercase tracking-wider">Course Title *</label>
      <input value={form.title} onChange={e=>setF('title',e.target.value)}
        className="w-full bg-[rgba(201,168,76,0.04)] border border-[rgba(201,168,76,0.25)] focus:border-[var(--gold)] rounded-xl px-4 py-3 outline-none font-display text-2xl font-bold text-[var(--ivory)] placeholder-[var(--muted2)] mb-4 transition-colors"
        placeholder="e.g. Constitutional Law Foundations"/>

      <div className="mb-4">
        <label className="block text-[10px] text-[var(--muted2)] mb-1.5 font-bold uppercase tracking-wider">Short Summary *</label>
        <textarea value={form.shortSummary} onChange={e=>setF('shortSummary',e.target.value)} className="input text-sm" style={{minHeight:70}} placeholder="One or two lines shown on course cards..."/>
      </div>

      <div className="mb-4">
        <label className="block text-[10px] text-[var(--muted2)] mb-1.5 font-bold uppercase tracking-wider">Full Description</label>
        <textarea value={form.fullDescription} onChange={e=>setF('fullDescription',e.target.value)} className="input text-sm" style={{minHeight:100}} placeholder="Detailed course description..."/>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
        <div>
          <label className="block text-[10px] text-[var(--muted2)] mb-1.5 font-bold uppercase tracking-wider">Level</label>
          <select value={form.level} onChange={e=>setF('level',e.target.value)} className="input text-sm">
            {['Beginner','Intermediate','Advanced'].map(l=><option key={l}>{l}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-[10px] text-[var(--muted2)] mb-1.5 font-bold uppercase tracking-wider">Duration</label>
          <input value={form.duration} onChange={e=>setF('duration',e.target.value)} className="input text-sm" placeholder="e.g. 4 weeks"/>
        </div>
        <div>
          <label className="block text-[10px] text-[var(--muted2)] mb-1.5 font-bold uppercase tracking-wider">Language</label>
          <input value={form.language} onChange={e=>setF('language',e.target.value)} className="input text-sm"/>
        </div>
        <div>
          <label className="block text-[10px] text-[var(--muted2)] mb-1.5 font-bold uppercase tracking-wider">Instructor</label>
          <input value={form.instructor} onChange={e=>setF('instructor',e.target.value)} className="input text-sm"/>
        </div>
      </div>

      {/* Cover Image */}
      <div className="mb-4">
        <label className="block text-[10px] text-[var(--muted2)] mb-1.5 font-bold uppercase tracking-wider">Cover Image</label>
        <div className="flex items-center gap-3 flex-wrap">
          <label className="btn-outline text-xs py-2 px-3 cursor-pointer">
            {imgLoading ? <><RefreshCw size={11} className="animate-spin"/> Uploading...</> : <><Upload size={11}/> Upload</>}
            <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden"/>
          </label>
          {form.coverImage && <img src={form.coverImage} alt="cover" className="w-20 h-12 rounded-lg object-cover border border-[rgba(201,168,76,0.2)]"/>}
        </div>
      </div>

      {/* Pricing */}
      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        <div className="flex items-center justify-between p-3 rounded-xl bg-[rgba(201,168,76,0.04)] border border-[rgba(201,168,76,0.1)]">
          <div><p className="font-medium text-sm">Free Course</p><p className="text-xs text-[var(--muted2)]">No fee required</p></div>
          <button onClick={()=>setF('isFree',!form.isFree)} className={`w-11 h-6 rounded-full transition-colors relative ${form.isFree?'bg-[var(--gold)]':'bg-[rgba(255,255,255,0.08)]'}`}>
            <span className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all shadow ${form.isFree?'left-6':'left-1'}`}/>
          </button>
        </div>
        {!form.isFree && (
          <div>
            <label className="block text-[10px] text-[var(--muted2)] mb-1.5 font-bold uppercase tracking-wider">Fee (₹)</label>
            <input type="number" value={form.fee} onChange={e=>setF('fee',Number(e.target.value))} className="input text-sm"/>
          </div>
        )}
        <div className="flex items-center justify-between p-3 rounded-xl bg-[rgba(201,168,76,0.04)] border border-[rgba(201,168,76,0.1)]">
          <div><p className="font-medium text-sm">Certificate</p><p className="text-xs text-[var(--muted2)]">Issued on completion</p></div>
          <button onClick={()=>setF('hasCertificate',!form.hasCertificate)} className={`w-11 h-6 rounded-full transition-colors relative ${form.hasCertificate?'bg-[var(--gold)]':'bg-[rgba(255,255,255,0.08)]'}`}>
            <span className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all shadow ${form.hasCertificate?'left-6':'left-1'}`}/>
          </button>
        </div>
        <div className="flex items-center justify-between p-3 rounded-xl bg-[rgba(201,168,76,0.04)] border border-[rgba(201,168,76,0.1)]">
          <div><p className="font-medium text-sm">Featured</p><p className="text-xs text-[var(--muted2)]">Highlight on Students page</p></div>
          <button onClick={()=>setF('featured',!form.featured)} className={`w-11 h-6 rounded-full transition-colors relative ${form.featured?'bg-[var(--gold)]':'bg-[rgba(255,255,255,0.08)]'}`}>
            <span className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all shadow ${form.featured?'left-6':'left-1'}`}/>
          </button>
        </div>
      </div>

      {/* Learning Outcomes */}
      <div className="mb-4">
        <label className="block text-[10px] text-[var(--muted2)] mb-1.5 font-bold uppercase tracking-wider">Learning Outcomes</label>
        <div className="space-y-1.5 mb-2">
          {form.learningOutcomes.map((o,i)=>(
            <div key={i} className="flex items-center gap-2 text-sm p-2 rounded-lg bg-[rgba(255,255,255,0.02)]">
              <CheckCircle size={12} className="text-[var(--gold)] shrink-0"/><span className="flex-1">{o}</span>
              <button onClick={()=>setF('learningOutcomes',form.learningOutcomes.filter((_,x)=>x!==i))}><X size={12} className="text-[var(--muted2)]"/></button>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <input value={outcomeInput} onChange={e=>setOutcomeInput(e.target.value)}
            onKeyDown={e=>{if(e.key==='Enter'&&outcomeInput.trim()){setF('learningOutcomes',[...form.learningOutcomes,outcomeInput.trim()]);setOutcomeInput('');e.preventDefault();}}}
            className="input text-sm flex-1" placeholder="e.g. Understand Article 32 writ jurisdiction..."/>
        </div>
      </div>

      {/* Prerequisites */}
      <div className="mb-4">
        <label className="block text-[10px] text-[var(--muted2)] mb-1.5 font-bold uppercase tracking-wider">Prerequisites</label>
        <div className="flex flex-wrap gap-1.5 mb-2">
          {form.prerequisites.map(p=>(
            <span key={p} className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[rgba(201,168,76,0.1)] border border-[rgba(201,168,76,0.2)] text-[11px] text-[var(--gold)]">
              {p}<button onClick={()=>setF('prerequisites',form.prerequisites.filter(x=>x!==p))}><X size={9}/></button>
            </span>
          ))}
        </div>
        <input value={prereqInput} onChange={e=>setPrereqInput(e.target.value)}
          onKeyDown={e=>{if(e.key==='Enter'&&prereqInput.trim()){setF('prerequisites',[...form.prerequisites,prereqInput.trim()]);setPrereqInput('');e.preventDefault();}}}
          className="input text-sm" placeholder="Add prerequisite then press Enter..."/>
      </div>

      {/* Modules */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <label className="block text-[10px] text-[var(--muted2)] font-bold uppercase tracking-wider">Course Modules ({form.modules.length})</label>
          <button onClick={addModule} className="btn-outline text-xs py-1.5 px-3"><Plus size={11}/> Add Module</button>
        </div>
        <div className="space-y-2">
          {form.modules.map((mod, idx) => (
            <div key={idx} className="module-card">
              <div className="flex items-center justify-between cursor-pointer" onClick={()=>setOpenModule(openModule===idx?null:idx)}>
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <BookOpen size={14} className="text-[var(--gold)] shrink-0"/>
                  <span className="text-sm font-medium truncate">{mod.title || `Module ${idx+1}`}</span>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button onClick={(e)=>{e.stopPropagation();removeModule(idx);}} className="tb-btn text-red-400 hover:bg-red-500/10"><Trash2 size={12}/></button>
                  {openModule===idx ? <ChevronUp size={14} className="text-[var(--muted2)]"/> : <ChevronDown size={14} className="text-[var(--muted2)]"/>}
                </div>
              </div>
              {openModule===idx && (
                <div className="mt-3 pt-3 border-t border-[rgba(201,168,76,0.1)] space-y-3">
                  <input value={mod.title} onChange={e=>updateModule(idx,'title',e.target.value)} className="input text-sm" placeholder="Module title..."/>
                  <textarea value={mod.description} onChange={e=>updateModule(idx,'description',e.target.value)} className="input text-sm" style={{minHeight:60}} placeholder="Short module description (shown before enrolling)..."/>
                  <div>
                    <label className="block text-[10px] text-[var(--muted2)] mb-1.5 font-bold uppercase tracking-wider flex items-center gap-1.5">
                      <FileText size={11}/> Lesson Notes (Text Content)
                    </label>
                    <textarea
                      value={mod.content}
                      onChange={e=>updateModule(idx,'content',e.target.value)}
                      className="input text-sm font-mono leading-relaxed"
                      style={{minHeight:180}}
                      placeholder={'Full written notes for this lesson, like a Coding Ninjas-style notes tab.\n\nLeave a blank line between paragraphs to start a new one.'}
                    />
                  </div>
                  <div className="grid sm:grid-cols-3 gap-2">
                    <div className="relative">
                      <FileText size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted2)]"/>
                      <input value={mod.pdfUrl} onChange={e=>updateModule(idx,'pdfUrl',e.target.value)} className="input text-xs pl-8" placeholder="PDF URL (downloadable notes)"/>
                    </div>
                    <div className="relative">
                      <Video size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted2)]"/>
                      <input value={mod.videoUrl} onChange={e=>updateModule(idx,'videoUrl',e.target.value)} className="input text-xs pl-8" placeholder="Video URL (lecture)"/>
                    </div>
                    <div className="relative">
                      <Mic size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted2)]"/>
                      <input value={mod.audioUrl} onChange={e=>updateModule(idx,'audioUrl',e.target.value)} className="input text-xs pl-8" placeholder="Audio URL"/>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
          {form.modules.length===0 && <p className="text-xs text-[var(--muted2)] text-center py-4">No modules yet. Click "Add Module" to create the course curriculum.</p>}
        </div>
      </div>
    </div>
  );
}

export default function CourseManager() {
  const [items, setItems] = useState<Course[]>([]);
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState<'list'|'form'>('list');
  const [editing, setEditing] = useState<Course|null>(null);
  const [search, setSearch] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const r = await fetch('/api/courses?admin=1');
      const d = await r.json();
      setItems(Array.isArray(d) ? d : []);
    } catch { setItems([]); }
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const del = async (id: string) => {
    if (!confirm('Delete this course?')) return;
    await fetch(`/api/courses/${id}`, { method:'DELETE' });
    load();
  };

  const filtered = items.filter(i => !search || i.title?.toLowerCase().includes(search.toLowerCase()));

  if (view==='form') {
    return <CourseForm course={editing} onSave={()=>{load();setView('list');setEditing(null);}} onCancel={()=>{setView('list');setEditing(null);}}/>;
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="relative w-full sm:max-w-xs">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted2)]"/>
          <input value={search} onChange={e=>setSearch(e.target.value)} className="input pl-8 text-sm py-2.5" placeholder="Search courses..."/>
        </div>
        <div className="flex gap-2">
          <button onClick={load} className="btn-outline text-xs py-2 px-3"><RefreshCw size={12}/></button>
          <button onClick={()=>{setEditing(null);setView('form');}} className="btn-gold text-sm py-2 px-4 whitespace-nowrap"><Plus size={13}/> Add Course</button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-16"><RefreshCw size={20} className="animate-spin inline text-[var(--muted2)]"/></div>
      ) : filtered.length===0 ? (
        <div className="card text-center py-16">
          <GraduationCap size={40} className="text-[var(--muted2)] mx-auto mb-3 opacity-30"/>
          <p className="text-[var(--muted2)] text-sm">{search ? 'No matching courses.' : 'No courses yet. Add your first course!'}</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filtered.map(c => (
            <div key={c._id} className="card">
              <div className="flex items-start justify-between mb-2">
                <span className="text-[10px] font-bold text-[var(--gold)] uppercase tracking-wider bg-[rgba(201,168,76,0.1)] px-2 py-0.5 rounded-full">{c.level}</span>
                <span className={`badge badge-${c.status}`}>{c.status}</span>
              </div>
              <h3 className="font-semibold text-sm flex items-center gap-1.5">{c.featured && <Star size={11} className="text-[var(--gold)] shrink-0"/>}{c.title}</h3>
              <p className="text-xs text-[var(--muted2)] mt-1 line-clamp-2">{c.shortSummary}</p>
              <div className="flex items-center gap-3 mt-2 text-[10px] text-[var(--muted2)]">
                <span>{c.modules?.length||0} modules</span>
                <span>{c.duration||'—'}</span>
                <span>{c.isFree ? 'Free' : `₹${c.fee}`}</span>
              </div>
              <div className="flex items-center gap-1 mt-3">
                <button onClick={()=>{setEditing(c);setView('form');}} className="tb-btn flex-1 justify-center"><Edit3 size={12}/></button>
                <a href="/students" target="_blank" className="tb-btn flex-1 justify-center"><Eye size={12}/></a>
                <button onClick={()=>del(c._id!)} className="tb-btn flex-1 justify-center text-red-400 hover:bg-red-500/10"><Trash2 size={12}/></button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
