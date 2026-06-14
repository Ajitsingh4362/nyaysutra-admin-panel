'use client';
import { useState, useEffect, useCallback } from 'react';
import {
  Plus, Trash2, Edit3, X, Save, Upload, RefreshCw, Camera, Star,
  Image as ImageIcon, Eye, Search, CheckCircle
} from 'lucide-react';

const ALBUMS = [
  'Supreme Court Visits','High Court Visits','District Court Practice','Office Photographs',
  'Internship Programs','Moot Court Sessions','Seminars & Conferences','Legal Events',
  'Professional Meetings','Legal Awareness Programs','General',
];

interface GalleryImage { url: string; publicId: string; altText: string; }
interface GalleryItem {
  _id?: string; title: string; slug?: string; album: string; caption: string;
  description: string; date: string; location: string; tags: string[];
  images: GalleryImage[]; videoUrl: string; featured: boolean; status: 'draft'|'published';
}

const blank: GalleryItem = {
  title:'', album: ALBUMS[0], caption:'', description:'', date:'', location:'',
  tags:[], images:[], videoUrl:'', featured:false, status:'published',
};

function GalleryForm({ item, onSave, onCancel }: { item: GalleryItem|null; onSave:()=>void; onCancel:()=>void }) {
  const [form, setForm] = useState<GalleryItem>({ ...blank, ...(item||{}) });
  const [tagInput, setTagInput] = useState('');
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');

  const setF = (k: keyof GalleryItem, v: any) => setForm(p => ({ ...p, [k]: v }));

  const handleImagesUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setUploading(true); setMsg('');
    const uploaded: GalleryImage[] = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      await new Promise<void>((resolve) => {
        const reader = new FileReader();
        reader.onload = async () => {
          try {
            const res = await fetch('/api/upload', {
              method:'POST', headers:{'Content-Type':'application/json'},
              body: JSON.stringify({ image: reader.result }),
            });
            const data = await res.json();
            if (data.url) uploaded.push({ url: data.url, publicId: data.publicId||'', altText: form.title || file.name });
          } catch {}
          resolve();
        };
        reader.readAsDataURL(file);
      });
    }
    if (uploaded.length) setF('images', [...form.images, ...uploaded]);
    else setMsg('Upload failed — check Cloudinary configuration.');
    setUploading(false);
  };

  const removeImage = (idx: number) => setF('images', form.images.filter((_,i)=>i!==idx));

  const handleSave = async (status: 'published'|'draft') => {
    if (!form.title.trim()) { setMsg('⚠️ Title is required.'); return; }
    if (form.images.length === 0) { setMsg('⚠️ Please upload at least one image.'); return; }
    setSaving(true); setMsg('');
    const payload = { ...form, status, date: form.date || new Date().toISOString() };
    try {
      const isEdit = !!form._id;
      const url = isEdit ? `/api/gallery/${form._id}` : '/api/gallery';
      const method = isEdit ? 'PUT' : 'POST';
      const res = await fetch(url, { method, headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload) });
      if (!res.ok) throw new Error(await res.text());
      setMsg(status==='draft' ? '✓ Saved as Draft' : '✓ Published!');
      setTimeout(onSave, 900);
    } catch (err:any) { setMsg(`Error: ${err.message||'Try again.'}`); }
    setSaving(false);
  };

  return (
    <div className="max-w-[760px] mx-auto">
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

      <label className="block text-[10px] text-[var(--gold)] mb-1.5 font-bold uppercase tracking-wider">Title *</label>
      <input value={form.title} onChange={e=>setF('title',e.target.value)}
        className="w-full bg-[rgba(201,168,76,0.04)] border border-[rgba(201,168,76,0.25)] focus:border-[var(--gold)] rounded-xl px-4 py-3 outline-none font-display text-2xl font-bold text-[var(--ivory)] placeholder-[var(--muted2)] mb-4 transition-colors"
        placeholder="e.g. Supreme Court Visit — June 2026"/>

      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-[10px] text-[var(--muted2)] mb-1.5 font-bold uppercase tracking-wider">Album / Category *</label>
          <select value={form.album} onChange={e=>setF('album',e.target.value)} className="input text-sm">
            {ALBUMS.map(a => <option key={a}>{a}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-[10px] text-[var(--muted2)] mb-1.5 font-bold uppercase tracking-wider">Location</label>
          <input value={form.location} onChange={e=>setF('location',e.target.value)} className="input text-sm" placeholder="e.g. Supreme Court, New Delhi"/>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-[10px] text-[var(--muted2)] mb-1.5 font-bold uppercase tracking-wider">Caption</label>
        <input value={form.caption} onChange={e=>setF('caption',e.target.value)} className="input text-sm" placeholder="Short one-line caption shown on the gallery card..."/>
      </div>

      <div className="mb-4">
        <label className="block text-[10px] text-[var(--muted2)] mb-1.5 font-bold uppercase tracking-wider">Description</label>
        <textarea value={form.description} onChange={e=>setF('description',e.target.value)} className="input text-sm" style={{minHeight:80}} placeholder="Optional longer description..."/>
      </div>

      {/* Images */}
      <div className="mb-4">
        <label className="block text-[10px] text-[var(--muted2)] mb-1.5 font-bold uppercase tracking-wider">Photos * (multiple allowed)</label>
        <label className="btn-outline text-xs py-2 px-4 cursor-pointer inline-flex w-fit">
          {uploading ? <><RefreshCw size={12} className="animate-spin"/> Uploading...</> : <><Upload size={12}/> Upload Images</>}
          <input type="file" accept="image/*" multiple onChange={handleImagesUpload} className="hidden" disabled={uploading}/>
        </label>
        {form.images.length > 0 && (
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 mt-3">
            {form.images.map((img,idx) => (
              <div key={idx} className="relative group rounded-lg overflow-hidden border border-[rgba(201,168,76,0.15)] aspect-square">
                <img src={img.url} alt={img.altText} className="w-full h-full object-cover"/>
                <button onClick={()=>removeImage(idx)} className="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/60 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity"><X size={11}/></button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-[10px] text-[var(--muted2)] mb-1.5 font-bold uppercase tracking-wider">YouTube / Video URL (optional)</label>
        <input value={form.videoUrl} onChange={e=>setF('videoUrl',e.target.value)} className="input text-sm font-mono" placeholder="https://youtube.com/watch?v=..."/>
      </div>

      <div className="mb-4">
        <label className="block text-[10px] text-[var(--muted2)] mb-1.5 font-bold uppercase tracking-wider">Tags</label>
        <div className="flex flex-wrap gap-1.5 mb-2">
          {form.tags.map(t=>(
            <span key={t} className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[rgba(201,168,76,0.1)] border border-[rgba(201,168,76,0.2)] text-[11px] text-[var(--gold)]">
              #{t}<button onClick={()=>setF('tags',form.tags.filter(x=>x!==t))}><X size={9}/></button>
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <input value={tagInput} onChange={e=>setTagInput(e.target.value)}
            onKeyDown={e=>{if(e.key==='Enter'&&tagInput.trim()){setF('tags',[...form.tags,tagInput.trim()]);setTagInput('');e.preventDefault();}}}
            className="input text-sm flex-1" placeholder="Add tag then press Enter..."/>
        </div>
      </div>

      <div className="flex items-center justify-between p-3 rounded-xl bg-[rgba(201,168,76,0.04)] border border-[rgba(201,168,76,0.1)]">
        <div><p className="font-medium text-sm">Featured</p><p className="text-xs text-[var(--muted2)]">Highlight in Media Highlights section</p></div>
        <button onClick={()=>setF('featured',!form.featured)} className={`w-11 h-6 rounded-full transition-colors relative ${form.featured?'bg-[var(--gold)]':'bg-[rgba(255,255,255,0.08)]'}`}>
          <span className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all shadow ${form.featured?'left-6':'left-1'}`}/>
        </button>
      </div>
    </div>
  );
}

export default function GalleryManager() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState<'list'|'form'>('list');
  const [editing, setEditing] = useState<GalleryItem|null>(null);
  const [search, setSearch] = useState('');
  const [albumFilter, setAlbumFilter] = useState('all');

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const r = await fetch('/api/gallery?admin=1');
      const d = await r.json();
      setItems(Array.isArray(d) ? d : []);
    } catch { setItems([]); }
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const del = async (id: string) => {
    if (!confirm('Delete this gallery item?')) return;
    await fetch(`/api/gallery/${id}`, { method:'DELETE' });
    load();
  };

  const filtered = items.filter(i => {
    const matchSearch = !search || i.title?.toLowerCase().includes(search.toLowerCase());
    const matchAlbum = albumFilter==='all' || i.album===albumFilter;
    return matchSearch && matchAlbum;
  });

  if (view==='form') {
    return <GalleryForm item={editing} onSave={()=>{load();setView('list');setEditing(null);}} onCancel={()=>{setView('list');setEditing(null);}}/>;
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex gap-2 flex-1 flex-wrap">
          <div className="relative max-w-xs flex-1">
            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted2)]"/>
            <input value={search} onChange={e=>setSearch(e.target.value)} className="input pl-8 text-sm py-2.5" placeholder="Search gallery..."/>
          </div>
          <select value={albumFilter} onChange={e=>setAlbumFilter(e.target.value)} className="input text-sm py-2.5 w-auto min-w-[140px]">
            <option value="all">All Albums</option>
            {ALBUMS.map(a=><option key={a} value={a}>{a}</option>)}
          </select>
        </div>
        <div className="flex gap-2">
          <button onClick={load} className="btn-outline text-xs py-2 px-3"><RefreshCw size={12}/></button>
          <button onClick={()=>{setEditing(null);setView('form');}} className="btn-gold text-sm py-2 px-4 whitespace-nowrap"><Plus size={13}/> Upload Photos</button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-16"><RefreshCw size={20} className="animate-spin inline text-[var(--muted2)]"/></div>
      ) : filtered.length===0 ? (
        <div className="card text-center py-16">
          <Camera size={40} className="text-[var(--muted2)] mx-auto mb-3 opacity-30"/>
          <p className="text-[var(--muted2)] text-sm">{search||albumFilter!=='all' ? 'No matching items.' : 'No gallery items yet. Upload your first photos!'}</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {filtered.map(item => (
            <div key={item._id} className="card p-0 overflow-hidden group">
              <div className="aspect-[4/3] relative bg-[#101520]">
                {item.images?.[0]?.url ? (
                  <img src={item.images[0].url} alt={item.title} className="w-full h-full object-cover"/>
                ) : (
                  <div className="w-full h-full flex items-center justify-center"><ImageIcon className="text-[var(--muted2)] opacity-30" size={32}/></div>
                )}
                {item.images?.length > 1 && (
                  <span className="absolute bottom-2 right-2 text-[10px] px-2 py-0.5 rounded-full bg-black/60 text-white">+{item.images.length-1}</span>
                )}
                {item.featured && <Star size={14} className="absolute top-2 left-2 text-[var(--gold)] fill-[var(--gold)]"/>}
                <span className={`absolute top-2 right-2 badge badge-${item.status}`}>{item.status}</span>
              </div>
              <div className="p-3">
                <p className="text-[10px] text-[var(--gold)] uppercase tracking-wider font-bold truncate">{item.album}</p>
                <p className="text-sm font-medium truncate mt-0.5">{item.title}</p>
                <div className="flex items-center gap-1 mt-2">
                  <button onClick={()=>{setEditing(item);setView('form');}} className="tb-btn flex-1 justify-center"><Edit3 size={12}/></button>
                  <a href="/gallery" target="_blank" className="tb-btn flex-1 justify-center"><Eye size={12}/></a>
                  <button onClick={()=>del(item._id!)} className="tb-btn flex-1 justify-center text-red-400 hover:bg-red-500/10"><Trash2 size={12}/></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
