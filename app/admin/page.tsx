'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import GalleryManager from './_components/GalleryManager';
import CourseManager from './_components/CourseManager';
import TeamManager from './_components/TeamManager';
// import AnalyticsDashboard from './_components/AnalyticsDashboard'; // Disabled until Google Analytics ID is added — uncomment to re-enable
import {
  LayoutDashboard, FileText, Users, Inbox, LogOut, Menu, X, Plus,
  Trash2, Eye, Edit3, Save, Bold, Italic, Underline, List, Link2,
  AlignLeft, AlignCenter, AlignRight, Quote, Heading1, Heading2,
  Image as ImageIcon, Code, CheckCircle, Tag, Star, Search,
  RefreshCw, Upload, BarChart2, TrendingUp,
  BookOpen, MessageCircle, Phone, Mail, Globe, Layers, Hash,
  Camera, Video, GraduationCap, Settings, Bell, ChevronDown,
  ExternalLink, Copy, Archive, Filter
} from 'lucide-react';

// ─── TYPES ──────────────────────────────────────────────────────────
type Tab = 'dashboard' | 'blogs' | 'blog-editor' | 'inquiries' | 'gallery' | 'courses' | 'team' | 'analytics' | 'seo' | 'settings';

interface Blog {
  _id?: string; id?: string; title: string; slug: string; category: string;
  excerpt: string; content: string; coverImage: string; author: string;
  tags: string[]; publishedAt: string; readTime: string; featured: boolean;
  status: 'draft' | 'published'; createdAt?: string;
  seo?: { metaTitle: string; metaDescription: string; keywords: string[] };
  views?: number;
}

interface Inquiry {
  _id: string; name: string; phone: string; email: string; service: string;
  message: string; contactMethod: string; status: string; notes: string;
  createdAt: string;
}

const BLOG_CATS = [
  'Constitutional Law','Daily Legal Intelligence','Criminal Law','Civil Law',
  'Matrimonial & Family Law','Property Law','Consumer Protection','Labour Law',
  'Cyber Law','Research & Analysis','Student Corner','Supreme Court Updates',
  'RTI & Human Rights','International Law','Corporate Law',
];

// ─── TOOLBAR BUTTON ──────────────────────────────────────────────────
function TBtn({ onClick, title, active, children }: any) {
  return (
    <button type="button" onClick={onClick} title={title}
      className={`tb-btn${active ? ' active' : ''}`}>
      {children}
    </button>
  );
}

// ─── RICH TEXT EDITOR ────────────────────────────────────────────────
function RichEditor({ initialValue, onChange }: { initialValue: string; onChange: (v: string) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (ref.current && !initialized.current) {
      ref.current.innerHTML = initialValue || '<p>Start writing your article here...</p>';
      initialized.current = true;
    }
  }, []);

  const exec = (cmd: string, val?: string) => {
    document.execCommand(cmd, false, val);
    ref.current?.focus();
    onChange(ref.current?.innerHTML || '');
  };

  const insertTable = () => {
    exec('insertHTML', `<table style="border-collapse:collapse;width:100%;margin:1rem 0"><tbody><tr><td style="border:1px solid rgba(201,168,76,0.3);padding:8px 12px">Cell 1</td><td style="border:1px solid rgba(201,168,76,0.3);padding:8px 12px">Cell 2</td></tr><tr><td style="border:1px solid rgba(201,168,76,0.3);padding:8px 12px">Cell 3</td><td style="border:1px solid rgba(201,168,76,0.3);padding:8px 12px">Cell 4</td></tr></tbody></table>`);
  };

  const insertCallout = () => {
    exec('insertHTML', `<blockquote style="border-left:3px solid #C9A84C;padding:12px 16px;margin:1rem 0;background:rgba(201,168,76,0.05);border-radius:0 8px 8px 0;font-style:italic;color:#C5BBAB">Important legal note here...</blockquote>`);
  };

  const insertLink = () => {
    const url = prompt('Enter URL (https://...):');
    if (url) exec('createLink', url);
  };

  const insertImage = () => {
    const url = prompt('Enter image URL:');
    if (url) exec('insertHTML', `<img src="${url}" alt="Image" style="max-width:100%;border-radius:8px;margin:1rem 0"/>`);
  };

  const insertDivider = () => {
    exec('insertHTML', '<hr style="border:none;border-top:1px solid rgba(201,168,76,0.2);margin:2rem 0"/>');
  };

  const setFontSize = (size: string) => {
    const sel = window.getSelection();
    if (sel && sel.rangeCount) {
      const range = sel.getRangeAt(0);
      const span = document.createElement('span');
      span.style.fontSize = size;
      range.surroundContents(span);
      onChange(ref.current?.innerHTML || '');
    }
  };

  return (
    <div className="rounded-xl overflow-hidden border border-[rgba(201,168,76,0.15)]">
      {/* Toolbar Row 1 */}
      <div className="editor-toolbar border-b border-[rgba(201,168,76,0.08)]">
        <TBtn onClick={() => exec('formatBlock','h1')} title="Heading 1"><Heading1 size={14}/></TBtn>
        <TBtn onClick={() => exec('formatBlock','h2')} title="Heading 2"><Heading2 size={14}/></TBtn>
        <TBtn onClick={() => exec('formatBlock','h3')} title="Heading 3"><span className="text-xs font-bold">H3</span></TBtn>
        <TBtn onClick={() => exec('formatBlock','p')}  title="Paragraph"><span className="text-xs font-bold">P</span></TBtn>
        <div className="tb-sep"/>
        <TBtn onClick={() => exec('bold')}             title="Bold"><Bold size={14}/></TBtn>
        <TBtn onClick={() => exec('italic')}           title="Italic"><Italic size={14}/></TBtn>
        <TBtn onClick={() => exec('underline')}        title="Underline"><Underline size={14}/></TBtn>
        <TBtn onClick={() => exec('strikeThrough')}    title="Strikethrough"><span className="text-xs line-through font-bold">S</span></TBtn>
        <TBtn onClick={() => exec('superscript')}      title="Superscript"><span className="text-xs">X²</span></TBtn>
        <div className="tb-sep"/>
        <TBtn onClick={() => exec('justifyLeft')}      title="Align Left"><AlignLeft size={14}/></TBtn>
        <TBtn onClick={() => exec('justifyCenter')}    title="Center"><AlignCenter size={14}/></TBtn>
        <TBtn onClick={() => exec('justifyRight')}     title="Align Right"><AlignRight size={14}/></TBtn>
        <TBtn onClick={() => exec('justifyFull')}      title="Justify"><span className="text-xs">≡</span></TBtn>
        <div className="tb-sep"/>
        <TBtn onClick={() => exec('insertUnorderedList')} title="Bullet List"><List size={14}/></TBtn>
        <TBtn onClick={() => exec('insertOrderedList')}   title="Numbered List"><Hash size={14}/></TBtn>
        <TBtn onClick={() => exec('outdent')}             title="Outdent"><span className="text-xs">⇤</span></TBtn>
        <TBtn onClick={() => exec('indent')}              title="Indent"><span className="text-xs">⇥</span></TBtn>
      </div>
      {/* Toolbar Row 2 */}
      <div className="editor-toolbar">
        <TBtn onClick={insertLink}     title="Insert Link"><Link2 size={14}/></TBtn>
        <TBtn onClick={insertImage}    title="Insert Image"><ImageIcon size={14}/></TBtn>
        <TBtn onClick={insertTable}    title="Insert Table"><span className="text-xs font-bold">⊞</span></TBtn>
        <TBtn onClick={insertCallout}  title="Callout / Quote"><Quote size={14}/></TBtn>
        <TBtn onClick={() => exec('formatBlock','pre')} title="Code Block"><Code size={14}/></TBtn>
        <TBtn onClick={insertDivider}  title="Divider"><span className="text-xs font-bold">—</span></TBtn>
        <div className="tb-sep"/>
        <TBtn onClick={() => setFontSize('0.875rem')} title="Small Text"><span className="text-[10px] font-bold">A-</span></TBtn>
        <TBtn onClick={() => setFontSize('1.125rem')} title="Large Text"><span className="text-sm font-bold">A+</span></TBtn>
        <div className="tb-sep"/>
        <TBtn onClick={() => exec('foreColor','#C9A84C')} title="Gold Color"><span className="text-xs font-bold text-[#C9A84C]">A</span></TBtn>
        <TBtn onClick={() => exec('foreColor','#F5F0E8')} title="White Color"><span className="text-xs font-bold text-white">A</span></TBtn>
        <TBtn onClick={() => exec('removeFormat')}        title="Clear Format"><span className="text-xs">✕</span></TBtn>
        <div className="tb-sep"/>
        <TBtn onClick={() => exec('undo')} title="Undo"><span className="text-xs">↩</span></TBtn>
        <TBtn onClick={() => exec('redo')} title="Redo"><span className="text-xs">↪</span></TBtn>
        <div className="tb-sep"/>
        <select onChange={e => exec('fontName', e.target.value)}
          className="text-[10px] bg-transparent border border-[rgba(201,168,76,0.2)] rounded px-1 text-[var(--muted2)] cursor-pointer">
          <option value="">Font</option>
          <option value="DM Sans">DM Sans</option>
          <option value="Cormorant Garamond">Cormorant</option>
          <option value="Courier New">Mono</option>
        </select>
      </div>
      {/* Editor Area */}
      <div
        ref={ref}
        contentEditable
        suppressContentEditableWarning
        className="blog-editor"
        style={{ minHeight: 520 }}
        onInput={() => onChange(ref.current?.innerHTML || '')}
        onPaste={e => {
          // Clean paste — strip external styles
          e.preventDefault();
          const text = e.clipboardData.getData('text/plain');
          document.execCommand('insertText', false, text);
        }}
        spellCheck
      />
      {/* Word count */}
      <div className="px-4 py-2 border-t border-[rgba(201,168,76,0.08)] flex items-center justify-between">
        <span className="text-[10px] text-[var(--muted2)]" id="word-count">Word count updates as you type</span>
        <span className="text-[10px] text-[var(--gold)]">Rich Text Editor</span>
      </div>
    </div>
  );
}

// ─── BLOG FORM ───────────────────────────────────────────────────────
function BlogForm({ blog, onSave, onCancel }: {
  blog: Partial<Blog> | null; onSave: () => void; onCancel: () => void;
}) {
  const blank: Blog = {
    title:'', slug:'', category: BLOG_CATS[0], excerpt:'', content:'',
    coverImage:'', author:'Adv. A.K. Tripathi', tags:[], publishedAt:'',
    readTime:'5 min read', featured:false, status:'published',
    seo:{ metaTitle:'', metaDescription:'', keywords:[] },
  };
  const [form, setForm] = useState<Blog>({ ...blank, ...(blog || {}) });
  const [tagInput, setTagInput]   = useState('');
  const [kInput, setKInput]       = useState('');
  const [saving, setSaving]       = useState(false);
  const [msg, setMsg]             = useState('');
  const [imgLoading, setImgLoading] = useState(false);
  const [activeTab, setActiveTab]  = useState<'content'|'seo'|'settings'>('content');
  const [wordCount, setWordCount]  = useState(0);
  const titleRef = useRef<HTMLInputElement>(null);

  const setF   = (k: keyof Blog, v: any) => setForm(p => ({ ...p, [k]: v }));
  const setSeo = (k: string, v: any)     => setForm(p => ({ ...p, seo: { ...p.seo!, [k]: v } }));

  const autoSlug = (t: string) =>
    t.toLowerCase().replace(/[^a-z0-9\s]/g,'').replace(/\s+/g,'-').substring(0,80);

  const handleContentChange = (html: string) => {
    setF('content', html);
    const wc = html.replace(/<[^>]*>/g,'').trim().split(/\s+/).filter(Boolean).length;
    setWordCount(wc);
    const rt = `${Math.max(1, Math.ceil(wc / 200))} min read`;
    setF('readTime', rt);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImgLoading(true);
    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const res = await fetch('/api/upload', {
          method:'POST', headers:{'Content-Type':'application/json'},
          body: JSON.stringify({ image: reader.result }),
        });
        const data = await res.json();
        if (data.url) setF('coverImage', data.url);
        else setMsg('Upload failed — check Cloudinary config.');
      } catch { setMsg('Image upload failed. Try a URL instead.'); }
      setImgLoading(false);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async (status: 'published' | 'draft') => {
    if (!form.title.trim()) {
      setMsg('⚠️ Title is required — likhiye "Article Title" box mein (sabse upar).');
      setActiveTab('content');
      setTimeout(() => { titleRef.current?.focus(); titleRef.current?.scrollIntoView({ behavior:'smooth', block:'center' }); }, 50);
      return;
    }
    if (!form.excerpt.trim()) {
      setMsg('⚠️ Excerpt / summary is required.');
      setActiveTab('content');
      return;
    }
    setSaving(true); setMsg('');
    const slug = form.slug || autoSlug(form.title);
    const payload = { ...form, slug, status };
    try {
      const isEdit = !!(form._id || form.id);
      const id = form._id || form.id;
      const url = isEdit ? `/api/blogs/${id}` : '/api/blogs';
      const method = isEdit ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method, headers:{'Content-Type':'application/json'},
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(await res.text());
      setMsg(status === 'draft' ? '✓ Saved as Draft' : '✓ Published!');
      setTimeout(() => onSave(), 1000);
    } catch (err: any) {
      setMsg(`Error: ${err.message || 'Please try again.'}`);
    }
    setSaving(false);
  };

  const tabs = [
    { id:'content',  label:'✍️ Content'  },
    { id:'seo',      label:'🔍 SEO'      },
    { id:'settings', label:'⚙️ Settings' },
  ];

  return (
    <div className="max-w-[960px] mx-auto">
      {/* Top bar */}
      <div className="flex items-center justify-between mb-5 flex-wrap gap-3 sticky top-16 z-20 bg-[#07090F] py-3 -mx-1 px-1">
        <button onClick={onCancel} className="flex items-center gap-2 text-xs text-[var(--muted2)] hover:text-[var(--ivory)] transition-colors">
          <X size={14}/> Cancel
        </button>
        <div className="flex items-center gap-2 flex-wrap">
          {msg && (
            <span className={`text-xs px-3 py-1.5 rounded-xl ${msg.startsWith('✓') ? 'bg-green-500/15 text-green-300' : 'bg-red-500/15 text-red-300'}`}>
              {msg}
            </span>
          )}
          {wordCount > 0 && (
            <span className="text-[10px] text-[var(--muted2)] px-2 py-1 border border-[rgba(201,168,76,0.1)] rounded-lg">
              ~{wordCount} words · {form.readTime}
            </span>
          )}
          <button onClick={() => handleSave('draft')} disabled={saving} className="btn-outline text-xs py-2 px-4">
            <Save size={12}/> Draft
          </button>
          <button onClick={() => handleSave('published')} disabled={saving} className="btn-gold text-xs py-2 px-5">
            {saving ? <><RefreshCw size={12} className="animate-spin"/> Saving...</> : form._id ? '✓ Update' : '🚀 Publish'}
          </button>
        </div>
      </div>

      {/* Title input */}
      <label className="block text-[10px] text-[var(--gold)] mb-1.5 font-bold uppercase tracking-wider">Article Title *</label>
      <input
        ref={titleRef}
        value={form.title}
        onChange={e => { setF('title', e.target.value); if (!form._id) setF('slug', autoSlug(e.target.value)); }}
        className="w-full bg-[rgba(201,168,76,0.04)] border border-[rgba(201,168,76,0.25)] focus:border-[var(--gold)] rounded-xl px-4 py-3 outline-none font-display text-2xl sm:text-3xl font-bold text-[var(--ivory)] placeholder-[var(--muted2)] mb-1 transition-colors"
        placeholder="Enter your article title here..."
      />
      <div className="text-[10px] text-[var(--muted2)] mb-4">
        Slug: <span className="text-[var(--gold)] font-mono">/blog/{form.slug || autoSlug(form.title) || 'auto-generated'}</span>
      </div>
      <div className="h-px bg-[rgba(201,168,76,0.12)] mb-5"/>

      {/* Tabs */}
      <div className="flex gap-0 mb-5 border-b border-[rgba(201,168,76,0.1)] overflow-x-auto">
        {tabs.map(t => (
          <button key={t.id} onClick={() => setActiveTab(t.id as any)}
            className={`px-4 py-2.5 text-xs font-semibold whitespace-nowrap transition-all border-b-2 -mb-px
              ${activeTab === t.id ? 'border-[var(--gold)] text-[var(--gold)]' : 'border-transparent text-[var(--muted2)] hover:text-[var(--ivory)]'}`}>
            {t.label}
          </button>
        ))}
      </div>

      {/* ── CONTENT TAB ── */}
      {activeTab === 'content' && (
        <div className="space-y-5">
          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-[10px] text-[var(--muted2)] mb-1.5 font-bold uppercase tracking-wider">Category *</label>
              <select value={form.category} onChange={e => setF('category', e.target.value)} className="input text-sm">
                {BLOG_CATS.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-[10px] text-[var(--muted2)] mb-1.5 font-bold uppercase tracking-wider">Author</label>
              <input value={form.author} onChange={e => setF('author', e.target.value)} className="input text-sm"/>
            </div>
            <div>
              <label className="block text-[10px] text-[var(--muted2)] mb-1.5 font-bold uppercase tracking-wider">Custom Slug</label>
              <input value={form.slug} onChange={e => setF('slug', e.target.value)} className="input text-sm font-mono" placeholder="auto-generated"/>
            </div>
          </div>

          <div>
            <label className="block text-[10px] text-[var(--muted2)] mb-1.5 font-bold uppercase tracking-wider">Excerpt / Summary *</label>
            <textarea value={form.excerpt} onChange={e => setF('excerpt', e.target.value)}
              className="input text-sm" style={{minHeight:80}}
              placeholder="Brief summary shown in blog cards and search results (2–3 sentences)..."/>
            <p className="text-[10px] text-[var(--muted2)] mt-1">{form.excerpt.length}/300 characters</p>
          </div>

          <div>
            <label className="block text-[10px] text-[var(--muted2)] mb-1.5 font-bold uppercase tracking-wider">Cover Image</label>
            <div className="flex items-center gap-3 flex-wrap mb-2">
              <label className="btn-outline text-xs py-2 px-3 cursor-pointer">
                {imgLoading ? <><RefreshCw size={11} className="animate-spin"/> Uploading...</> : <><Upload size={11}/> Upload Image</>}
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden"/>
              </label>
              {form.coverImage && (
                <div className="flex items-center gap-2">
                  <img src={form.coverImage} alt="cover" className="w-20 h-12 rounded-lg object-cover border border-[rgba(201,168,76,0.2)]"/>
                  <button type="button" onClick={() => setF('coverImage','')} className="text-red-400 hover:text-red-300 text-xs">Remove</button>
                </div>
              )}
            </div>
            <input value={form.coverImage} onChange={e => setF('coverImage', e.target.value)}
              className="input text-xs font-mono" placeholder="Or paste Cloudinary / image URL..."/>
          </div>

          <div>
            <label className="block text-[10px] text-[var(--muted2)] mb-1.5 font-bold uppercase tracking-wider">Article Content *</label>
            <RichEditor initialValue={form.content} onChange={handleContentChange}/>
          </div>

          <div>
            <label className="block text-[10px] text-[var(--muted2)] mb-1.5 font-bold uppercase tracking-wider">Tags</label>
            <div className="flex flex-wrap gap-2 mb-2 min-h-[26px]">
              {form.tags.map(t => (
                <span key={t} className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[rgba(201,168,76,0.1)] border border-[rgba(201,168,76,0.2)] text-[11px] text-[var(--gold)]">
                  #{t}
                  <button type="button" onClick={() => setF('tags', form.tags.filter(x => x !== t))} className="hover:text-red-400 transition-colors"><X size={9}/></button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input value={tagInput} onChange={e => setTagInput(e.target.value)}
                onKeyDown={e => { if (e.key==='Enter' && tagInput.trim() && !form.tags.includes(tagInput.trim())) { setF('tags',[...form.tags,tagInput.trim()]); setTagInput(''); e.preventDefault(); }}}
                className="input text-sm flex-1" placeholder="Add tag then press Enter..."/>
              <button type="button"
                onClick={() => { if(tagInput.trim()&&!form.tags.includes(tagInput.trim())){ setF('tags',[...form.tags,tagInput.trim()]); setTagInput(''); }}}
                className="btn-outline shrink-0 py-2 px-3 text-xs">Add</button>
            </div>
          </div>
        </div>
      )}

      {/* ── SEO TAB ── */}
      {activeTab === 'seo' && (
        <div className="space-y-5 max-w-2xl">
          <div className="card p-5">
            <h3 className="font-semibold mb-1 flex items-center gap-2 text-sm"><Globe size={15} className="text-[var(--gold)]"/> SEO Optimization</h3>
            <p className="text-xs text-[var(--muted2)] mb-5">Optimize this article for search engines. Google shows ~60 char title and ~160 char description.</p>
            <div className="space-y-4">
              <div>
                <label className="block text-[10px] text-[var(--muted2)] mb-1.5 font-bold uppercase tracking-wider">SEO Title</label>
                <input value={form.seo?.metaTitle||''} onChange={e => setSeo('metaTitle', e.target.value)}
                  className="input text-sm" placeholder="Optimized page title (60 chars max)..."/>
                <div className="flex justify-between mt-1">
                  <p className="text-[10px] text-[var(--muted2)]">If blank, article title will be used.</p>
                  <p className={`text-[10px] ${(form.seo?.metaTitle||'').length > 60 ? 'text-red-400' : 'text-[var(--muted2)]'}`}>{(form.seo?.metaTitle||'').length}/60</p>
                </div>
              </div>
              <div>
                <label className="block text-[10px] text-[var(--muted2)] mb-1.5 font-bold uppercase tracking-wider">Meta Description</label>
                <textarea value={form.seo?.metaDescription||''} onChange={e => setSeo('metaDescription', e.target.value)}
                  className="input text-sm" style={{minHeight:80}} placeholder="Compelling description for search results (160 chars max)..."/>
                <div className="flex justify-between mt-1">
                  <p className="text-[10px] text-[var(--muted2)]">Shown under the title in Google results.</p>
                  <p className={`text-[10px] ${(form.seo?.metaDescription||'').length > 160 ? 'text-red-400' : 'text-[var(--muted2)]'}`}>{(form.seo?.metaDescription||'').length}/160</p>
                </div>
              </div>
              <div>
                <label className="block text-[10px] text-[var(--muted2)] mb-1.5 font-bold uppercase tracking-wider">Focus Keywords</label>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {(form.seo?.keywords||[]).map((k: string) => (
                    <span key={k} className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-[11px] text-blue-400">
                      {k}<button type="button" onClick={() => setSeo('keywords',(form.seo?.keywords||[]).filter((x:string)=>x!==k))}><X size={9}/></button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input value={kInput} onChange={e => setKInput(e.target.value)}
                    onKeyDown={e => { if(e.key==='Enter'&&kInput.trim()){setSeo('keywords',[...(form.seo?.keywords||[]),kInput.trim()]);setKInput('');e.preventDefault();}}}
                    className="input text-sm flex-1" placeholder="Add keyword then press Enter..."/>
                </div>
              </div>
            </div>
            {/* Google SERP Preview */}
            <div className="mt-6 p-4 rounded-xl bg-white/5 border border-white/10">
              <p className="text-[10px] text-[var(--muted2)] mb-2 font-bold uppercase tracking-wider">Google Preview</p>
              <p className="text-[#1a73e8] text-sm font-medium leading-snug line-clamp-1">{form.seo?.metaTitle||form.title||'Article Title'}</p>
              <p className="text-[#006621] text-xs mt-0.5">nyayasutra.com › blog › {form.slug||'article-slug'}</p>
              <p className="text-[#545454] text-xs mt-1 line-clamp-2">{form.seo?.metaDescription||form.excerpt||'Article description will appear here in Google search results.'}</p>
            </div>
          </div>
        </div>
      )}

      {/* ── SETTINGS TAB ── */}
      {activeTab === 'settings' && (
        <div className="space-y-4 max-w-lg">
          <div className="card p-5 space-y-5">
            <h3 className="font-semibold flex items-center gap-2 text-sm"><Settings size={15} className="text-[var(--gold)]"/> Post Settings</h3>
            <div className="flex items-center justify-between p-3 rounded-xl bg-[rgba(201,168,76,0.04)] border border-[rgba(201,168,76,0.1)]">
              <div>
                <p className="font-medium text-sm">Featured Post</p>
                <p className="text-xs text-[var(--muted2)]">Show prominently on homepage</p>
              </div>
              <button type="button" onClick={() => setF('featured', !form.featured)}
                className={`w-11 h-6 rounded-full transition-colors relative ${form.featured ? 'bg-[var(--gold)]' : 'bg-[rgba(255,255,255,0.08)]'}`}>
                <span className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all shadow ${form.featured ? 'left-6' : 'left-1'}`}/>
              </button>
            </div>
            <div>
              <label className="block text-[10px] text-[var(--muted2)] mb-1.5 font-bold uppercase tracking-wider">Status</label>
              <div className="flex gap-2">
                {(['published','draft'] as const).map(s => (
                  <button key={s} type="button" onClick={() => setF('status', s)}
                    className={`flex-1 py-2 rounded-xl text-xs font-semibold border transition-all capitalize
                      ${form.status===s ? 'border-[var(--gold)] bg-[rgba(201,168,76,0.12)] text-[var(--gold)]' : 'border-[rgba(201,168,76,0.15)] text-[var(--muted2)] hover:border-[rgba(201,168,76,0.35)]'}`}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-[10px] text-[var(--muted2)] mb-1.5 font-bold uppercase tracking-wider">Publish Date</label>
              <input type="datetime-local"
                value={form.publishedAt ? new Date(form.publishedAt).toISOString().substring(0,16) : ''}
                onChange={e => setF('publishedAt', e.target.value)}
                className="input text-sm"/>
            </div>
            <div>
              <label className="block text-[10px] text-[var(--muted2)] mb-1.5 font-bold uppercase tracking-wider">Custom Read Time</label>
              <input value={form.readTime} onChange={e => setF('readTime', e.target.value)} className="input text-sm" placeholder="Auto-calculated from content"/>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── MAIN ADMIN ──────────────────────────────────────────────────────
export default function AdminPanel() {
  const [authed, setAuthed]     = useState(false);
  const [email, setEmail]       = useState('');
  const [pass, setPass]         = useState('');
  const [loginErr, setLoginErr] = useState('');
  const [tab, setTab]           = useState<Tab>('dashboard');
  const [sideOpen, setSideOpen] = useState(false);
  const [blogs, setBlogs]       = useState<Blog[]>([]);
  const [inquiries, setInq]     = useState<Inquiry[]>([]);
  const [editBlog, setEditBlog] = useState<Partial<Blog>|null>(null);
  const [loading, setLoading]   = useState(false);
  const [blogSearch, setBlogSearch] = useState('');
  const [inqFilter, setInqFilter]   = useState('all');
  const [inqSearch, setInqSearch]   = useState('');

  const loadBlogs = useCallback(async () => {
    setLoading(true);
    try {
      const r = await fetch('/api/blogs?admin=1');
      const data = await r.json();
      setBlogs(Array.isArray(data) ? data : []);
    } catch { setBlogs([]); }
    setLoading(false);
  }, []);

  const loadInq = useCallback(async () => {
    try {
      const r = await fetch('/api/inquiries');
      const data = await r.json();
      setInq(Array.isArray(data) ? data : []);
    } catch { setInq([]); }
  }, []);

  useEffect(() => {
    if (authed) { loadBlogs(); loadInq(); }
  }, [authed]);

  const handleLogin = async () => {
    setLoginErr('');
    try {
      const r = await fetch('/api/auth/login', {
        method:'POST', headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ email, password: pass }),
      });
      if (r.ok) setAuthed(true);
      else setLoginErr('Invalid email or password.');
    } catch { setLoginErr('Connection error. Please try again.'); }
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method:'POST' });
    setAuthed(false); setEmail(''); setPass('');
  };

  const deleteBlog = async (id: string) => {
    if (!confirm('Delete this post permanently?')) return;
    await fetch(`/api/blogs/${id}`, { method:'DELETE' });
    loadBlogs();
  };

  const updateInqStatus = async (id: string, status: string) => {
    await fetch(`/api/inquiries/${id}`, { method:'PUT', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ status }) });
    loadInq();
  };

  const deleteInq = async (id: string) => {
    if (!confirm('Delete this inquiry?')) return;
    await fetch(`/api/inquiries/${id}`, { method:'DELETE' });
    loadInq();
  };

  const openNewBlog = () => { setEditBlog(null); setTab('blog-editor'); };
  const openEditBlog = (b: Blog) => { setEditBlog(b); setTab('blog-editor'); };
  const onBlogSave = () => { loadBlogs(); setTab('blogs'); setEditBlog(null); };

  const filteredBlogs = blogs.filter(b =>
    !blogSearch ||
    b.title?.toLowerCase().includes(blogSearch.toLowerCase()) ||
    b.category?.toLowerCase().includes(blogSearch.toLowerCase())
  );

  const filteredInq = inquiries.filter(i => {
    const matchStatus = inqFilter === 'all' || i.status === inqFilter;
    const matchSearch = !inqSearch ||
      i.name?.toLowerCase().includes(inqSearch.toLowerCase()) ||
      i.phone?.includes(inqSearch) ||
      i.service?.toLowerCase().includes(inqSearch.toLowerCase());
    return matchStatus && matchSearch;
  });

  const stats = {
    published: blogs.filter(b => b.status === 'published').length,
    drafts:    blogs.filter(b => b.status === 'draft').length,
    total:     blogs.length,
    inqTotal:  inquiries.length,
    inqNew:    inquiries.filter(i => i.status === 'new').length,
    inqReplied:inquiries.filter(i => i.status === 'replied').length,
  };

  // ── LOGIN PAGE ───────────────────────────────────────────────────
  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-[#07090F]">
        <div className="w-full max-w-[400px]">
          <div className="glass rounded-3xl p-8">
            <div className="text-center mb-7">
              <div className="w-16 h-16 rounded-2xl bg-[rgba(201,168,76,0.12)] flex items-center justify-center mx-auto mb-4">
                <Layers size={28} className="text-[var(--gold)]"/>
              </div>
              <h1 className="font-display text-3xl font-bold text-[var(--gold)]">NyayaSutra</h1>
              <p className="text-[var(--muted2)] text-sm mt-1">Admin Control Panel</p>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-[10px] text-[var(--muted2)] mb-1.5 font-bold uppercase tracking-wider">Email</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                  onKeyDown={e => e.key==='Enter'&&handleLogin()} className="input" placeholder="Enter admin email"/>
              </div>
              <div>
                <label className="block text-[10px] text-[var(--muted2)] mb-1.5 font-bold uppercase tracking-wider">Password</label>
                <input type="password" value={pass} onChange={e => setPass(e.target.value)}
                  onKeyDown={e => e.key==='Enter'&&handleLogin()} className="input" placeholder="••••••••"/>
              </div>
              {loginErr && <p className="text-red-400 text-sm text-center">{loginErr}</p>}
              <button onClick={handleLogin} className="btn-gold w-full justify-center mt-1">Login to Dashboard</button>
              <p className="text-center text-[10px] text-[var(--muted2)]">
                Authorized personnel only · NyayaSutra Legal Intelligence
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── SIDEBAR ITEMS ─────────────────────────────────────────────────
  const sideItems: { id: Tab; icon: any; label: string; badge?: number }[] = [
    { id:'dashboard',   icon: LayoutDashboard, label:'Dashboard' },
    { id:'blogs',       icon: FileText,        label:'Blog Posts',   badge: stats.total },
    { id:'inquiries',   icon: Inbox,           label:'Inquiries',    badge: stats.inqNew || undefined },
    { id:'gallery',     icon: Camera,          label:'Gallery' },
    { id:'courses',     icon: GraduationCap,   label:'Courses' },
    { id:'team',        icon: Users,           label:'Advocate Team' },
    // { id:'analytics',   icon: BarChart2,       label:'Analytics' }, // Disabled until Google Analytics ID is added — uncomment to re-enable
    { id:'seo',         icon: Globe,           label:'SEO Settings' },
    { id:'settings',    icon: Settings,        label:'Settings' },
  ];

  const isEditing = tab === 'blog-editor';

  return (
    <div className="min-h-screen flex bg-[#07090F] font-sans">
      {/* Mobile overlay */}
      {sideOpen && <div className="fixed inset-0 bg-black/60 z-40 lg:hidden" onClick={() => setSideOpen(false)}/>}

      {/* ── SIDEBAR ── */}
      <aside className={`admin-sidebar ${sideOpen ? 'open' : ''}`}>
        <div className="p-4 border-b border-[rgba(201,168,76,0.1)] flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[rgba(201,168,76,0.12)] flex items-center justify-center shrink-0">
            <Layers size={17} className="text-[var(--gold)]"/>
          </div>
          <div>
            <p className="font-bold text-sm text-[var(--gold)] leading-tight">NyayaSutra</p>
            <p className="text-[10px] text-[var(--muted2)]">Admin Panel</p>
          </div>
        </div>

        <nav className="p-2.5 space-y-0.5 flex-1">
          {sideItems.map(({ id, icon: Icon, label, badge }) => (
            <button key={id} onClick={() => { setTab(id); setSideOpen(false); }}
              className={`admin-nav-item ${(tab===id || (isEditing&&id==='blogs')) ? 'active' : ''}`}>
              <span className="admin-nav-icon"><Icon size={14}/></span>
              <span className="flex-1 text-left">{label}</span>
              {badge !== undefined && badge > 0 && (
                <span className="min-w-[18px] h-[18px] rounded-full bg-[var(--gold)] text-[#07090F] text-[9px] font-bold flex items-center justify-center px-1">
                  {badge > 99 ? '99+' : badge}
                </span>
              )}
            </button>
          ))}
        </nav>

        <div className="p-2.5 border-t border-[rgba(201,168,76,0.08)]">
          <a href="/" target="_blank"
            className="admin-nav-item text-[var(--muted2)] hover:text-[var(--gold)] mb-1">
            <span className="admin-nav-icon"><ExternalLink size={13}/></span>
            <span>View Website</span>
          </a>
          <button onClick={handleLogout}
            className="admin-nav-item w-full text-red-400 hover:text-red-300 hover:bg-red-500/10">
            <span className="admin-nav-icon"><LogOut size={13}/></span>
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* ── MAIN ── */}
      <div className="admin-main flex-1 flex flex-col min-w-0 overflow-x-hidden">
        {/* Top bar */}
        <div className="sticky top-0 z-30 border-b border-[rgba(201,168,76,0.08)] bg-[#07090F]/97 backdrop-blur-xl px-4 sm:px-5 py-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button className="lg:hidden p-1.5 text-[var(--ivory)]" onClick={() => setSideOpen(v => !v)}>
              <Menu size={18}/>
            </button>
            <div>
              <h1 className="font-semibold text-sm text-[var(--ivory)] capitalize">
                {isEditing ? (editBlog?._id ? 'Edit Post' : 'New Blog Post') : tab.replace(/-/g,' ')}
              </h1>
              {tab==='blogs' && <p className="text-[10px] text-[var(--muted2)]">{stats.published} published · {stats.drafts} drafts</p>}
              {tab==='inquiries' && <p className="text-[10px] text-[var(--muted2)]">{stats.inqNew} new · {stats.inqTotal} total</p>}
            </div>
          </div>
          <div className="flex items-center gap-3">
            {stats.inqNew > 0 && (
              <button onClick={() => setTab('inquiries')} className="relative">
                <Bell size={16} className="text-[var(--muted2)]"/>
                <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 rounded-full text-[8px] font-bold flex items-center justify-center text-white">
                  {stats.inqNew > 9 ? '9+' : stats.inqNew}
                </span>
              </button>
            )}
            <div className="w-8 h-8 rounded-full bg-[rgba(201,168,76,0.12)] flex items-center justify-center text-[var(--gold)] font-bold text-sm">A</div>
          </div>
        </div>

        {/* ── CONTENT AREA ── */}
        <div className="flex-1 p-4 sm:p-5 overflow-x-hidden">

          {/* ──────────── DASHBOARD ──────────── */}
          {tab==='dashboard' && (
            <div className="space-y-5">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {[
                  { label:'Published',   val:stats.published,  icon:CheckCircle, c:'text-green-400' },
                  { label:'Drafts',      val:stats.drafts,     icon:Archive,     c:'text-yellow-400' },
                  { label:'Total Posts', val:stats.total,      icon:FileText,    c:'text-blue-400' },
                  { label:'New Inquiries',val:stats.inqNew,    icon:Bell,        c:'text-red-400' },
                  { label:'Replied',     val:stats.inqReplied, icon:Mail,        c:'text-purple-400' },
                  { label:'Total Inquiries',val:stats.inqTotal,icon:Inbox,       c:'text-[var(--gold)]' },
                ].map(({ label, val, icon: Icon, c }) => (
                  <div key={label} className="stat-card">
                    <Icon size={16} className={c}/>
                    <p className="font-display text-2xl font-bold mt-2">{val}</p>
                    <p className="text-[10px] text-[var(--muted2)] mt-0.5">{label}</p>
                  </div>
                ))}
              </div>

              <div className="grid lg:grid-cols-2 gap-5">
                <div className="card">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-sm">Recent Blog Posts</h3>
                    <button onClick={() => setTab('blogs')} className="text-[var(--gold)] text-xs hover:underline">View all</button>
                  </div>
                  <div className="space-y-3">
                    {blogs.slice(0,5).map(b => (
                      <div key={b._id} className="flex items-center gap-3">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{b.title}</p>
                          <p className="text-[10px] text-[var(--muted2)]">{b.category} · {b.readTime}</p>
                        </div>
                        <span className={`badge badge-${b.status}`}>{b.status}</span>
                        <button onClick={() => openEditBlog(b)} className="text-[var(--muted2)] hover:text-[var(--gold)] transition-colors"><Edit3 size={13}/></button>
                      </div>
                    ))}
                    {blogs.length===0 && <p className="text-sm text-[var(--muted2)] text-center py-4">No posts yet. Create your first!</p>}
                  </div>
                </div>

                <div className="card">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-sm">Recent Inquiries</h3>
                    <button onClick={() => setTab('inquiries')} className="text-[var(--gold)] text-xs hover:underline">View all</button>
                  </div>
                  <div className="space-y-3">
                    {inquiries.slice(0,5).map(i => (
                      <div key={i._id} className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-full bg-[rgba(201,168,76,0.1)] flex items-center justify-center text-[var(--gold)] text-xs font-bold shrink-0">
                          {i.name?.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{i.name}</p>
                          <p className="text-[10px] text-[var(--muted2)]">{i.service}</p>
                        </div>
                        <span className={`badge badge-${i.status}`}>{i.status}</span>
                      </div>
                    ))}
                    {inquiries.length===0 && <p className="text-sm text-[var(--muted2)] text-center py-4">No inquiries yet.</p>}
                  </div>
                </div>
              </div>

              <div className="card">
                <h3 className="font-semibold text-sm flex items-center gap-2 mb-4"><TrendingUp size={14} className="text-[var(--gold)]"/> Quick Actions</h3>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                  {[
                    { label:'New Blog Post',    icon:Plus,          action: openNewBlog },
                    { label:'View Inquiries',   icon:Inbox,         action:()=>setTab('inquiries') },
                    { label:'Gallery Upload',   icon:Camera,        action:()=>setTab('gallery') },
                    { label:'Advocate Team',    icon:Users,         action:()=>setTab('team') },
                    { label:'SEO Settings',     icon:Globe,         action:()=>setTab('seo') },
                  ].map(({ label, icon: Icon, action }) => (
                    <button key={label} onClick={action}
                      className="p-4 rounded-xl border border-[rgba(201,168,76,0.12)] hover:border-[rgba(201,168,76,0.35)] hover:bg-[rgba(201,168,76,0.04)] transition-all text-left">
                      <Icon size={18} className="text-[var(--gold)] mb-2"/>
                      <p className="text-xs font-medium">{label}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ──────────── BLOGS LIST ──────────── */}
          {tab==='blogs' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="relative w-full sm:max-w-xs">
                  <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted2)]"/>
                  <input value={blogSearch} onChange={e => setBlogSearch(e.target.value)}
                    className="input pl-8 text-sm py-2.5" placeholder="Search posts..."/>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => loadBlogs()} className="btn-outline text-xs py-2 px-3"><RefreshCw size={12}/></button>
                  <button onClick={openNewBlog} className="btn-gold text-sm py-2 px-4 whitespace-nowrap"><Plus size={13}/> New Post</button>
                </div>
              </div>

              <div className="card p-0 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="admin-table" style={{minWidth:580}}>
                    <thead>
                      <tr>
                        <th style={{width:'40%'}}>Title</th>
                        <th>Category</th>
                        <th>Status</th>
                        <th>Date</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {loading ? (
                        <tr><td colSpan={5} className="text-center py-10"><RefreshCw size={18} className="animate-spin inline text-[var(--muted2)]"/></td></tr>
                      ) : filteredBlogs.length===0 ? (
                        <tr><td colSpan={5} className="text-center py-10 text-[var(--muted2)] text-sm">
                          {blogSearch ? 'No posts match your search.' : 'No posts yet. Create your first!'}
                        </td></tr>
                      ) : filteredBlogs.map(b => (
                        <tr key={b._id||b.id}>
                          <td>
                            <div className="flex items-start gap-2">
                              {b.featured && <Star size={11} className="text-[var(--gold)] shrink-0 mt-1"/>}
                              <span className="font-medium text-sm truncate max-w-[250px]">{b.title}</span>
                            </div>
                          </td>
                          <td><span className="text-xs text-[var(--muted2)]">{b.category}</span></td>
                          <td><span className={`badge badge-${b.status}`}>{b.status}</span></td>
                          <td><span className="text-xs text-[var(--muted2)]">
                            {b.publishedAt ? new Date(b.publishedAt).toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'2-digit'}) : '—'}
                          </span></td>
                          <td>
                            <div className="flex items-center gap-1">
                              <a href={`/blog/${b.slug}`} target="_blank" className="tb-btn" title="Preview"><Eye size={13}/></a>
                              <button onClick={() => openEditBlog(b)} className="tb-btn" title="Edit"><Edit3 size={13}/></button>
                              <button onClick={() => deleteBlog(b._id||b.id||'')} className="tb-btn text-red-400 hover:bg-red-500/10" title="Delete"><Trash2 size={13}/></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ──────────── BLOG EDITOR ──────────── */}
          {tab==='blog-editor' && (
            <BlogForm blog={editBlog} onSave={onBlogSave} onCancel={() => { setTab('blogs'); setEditBlog(null); }}/>
          )}

          {/* ──────────── INQUIRIES ──────────── */}
          {tab==='inquiries' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                <div className="relative w-full sm:max-w-xs">
                  <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted2)]"/>
                  <input value={inqSearch} onChange={e => setInqSearch(e.target.value)}
                    className="input pl-8 text-sm py-2.5" placeholder="Search by name, phone, service..."/>
                </div>
                <div className="flex gap-1 flex-wrap">
                  {['all','new','read','replied','closed'].map(s => (
                    <button key={s} onClick={() => setInqFilter(s)}
                      className={`px-3 py-1.5 rounded-xl text-[11px] font-semibold uppercase tracking-wide transition-all
                        ${inqFilter===s ? 'bg-[rgba(201,168,76,0.15)] text-[var(--gold)]' : 'text-[var(--muted2)] hover:text-[var(--ivory)]'}`}>
                      {s} ({s==='all' ? inquiries.length : inquiries.filter(i=>i.status===s).length})
                    </button>
                  ))}
                </div>
                <button onClick={loadInq} className="btn-outline text-xs py-2 px-3 ml-auto"><RefreshCw size={12}/></button>
              </div>

              {filteredInq.length===0 ? (
                <div className="card text-center py-16">
                  <Inbox size={36} className="text-[var(--muted2)] mx-auto mb-3 opacity-30"/>
                  <p className="text-[var(--muted2)] text-sm">{inqSearch ? 'No matching inquiries.' : 'No inquiries yet.'}</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredInq.map(inq => (
                    <div key={inq._id} className="card">
                      <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-[rgba(201,168,76,0.1)] flex items-center justify-center text-[var(--gold)] font-bold text-sm shrink-0">
                          {inq.name?.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2 mb-1.5">
                            <h3 className="font-semibold text-sm">{inq.name}</h3>
                            <span className={`badge badge-${inq.status}`}>{inq.status}</span>
                            <span className="text-[10px] text-[var(--muted2)]">
                              {new Date(inq.createdAt).toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric',hour:'2-digit',minute:'2-digit'})}
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-3 mb-2">
                            <a href={`tel:${inq.phone}`} className="flex items-center gap-1 text-xs text-[var(--muted2)] hover:text-[var(--gold)] transition-colors"><Phone size={11}/>{inq.phone}</a>
                            {inq.email && <a href={`mailto:${inq.email}`} className="flex items-center gap-1 text-xs text-[var(--muted2)] hover:text-[var(--gold)] transition-colors"><Mail size={11}/>{inq.email}</a>}
                            <span className="flex items-center gap-1 text-xs text-[var(--muted2)]"><Tag size={11}/>{inq.service}</span>
                            <span className="flex items-center gap-1 text-xs text-[var(--muted2)]"><MessageCircle size={11}/>{inq.contactMethod}</span>
                          </div>
                          {inq.message && (
                            <p className="text-xs text-[var(--muted2)] bg-[rgba(255,255,255,0.03)] p-3 rounded-xl border border-[rgba(255,255,255,0.05)] leading-relaxed">
                              {inq.message}
                            </p>
                          )}
                        </div>
                        <div className="flex flex-wrap sm:flex-col gap-2 shrink-0">
                          <select value={inq.status} onChange={e => updateInqStatus(inq._id, e.target.value)}
                            className="input text-xs py-1.5 px-2 w-auto min-w-[90px]">
                            {['new','read','replied','closed'].map(s => <option key={s} value={s}>{s}</option>)}
                          </select>
                          <a href={`https://wa.me/${inq.phone?.replace(/\D/g,'')}`} target="_blank"
                            className="btn-gold text-xs py-1.5 px-3 justify-center"><MessageCircle size={11}/> WA</a>
                          <a href={`tel:${inq.phone}`} className="btn-outline text-xs py-1.5 px-3 justify-center"><Phone size={11}/></a>
                          <button onClick={() => deleteInq(inq._id)} className="text-xs py-1.5 px-2 rounded-xl text-red-400 hover:bg-red-500/10 transition-colors border border-red-500/20"><Trash2 size={13}/></button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ──────────── GALLERY ──────────── */}
          {tab==='gallery' && <GalleryManager/>}

          {/* ──────────── COURSES ──────────── */}
          {tab==='courses' && <CourseManager/>}

          {/* ──────────── ADVOCATE TEAM ──────────── */}
          {tab==='team' && <TeamManager/>}

          {/* ──────────── ANALYTICS (Disabled until Google Analytics ID is added) ──────────── */}
          {/* {tab==='analytics' && <AnalyticsDashboard/>} */}

          {/* ──────────── SEO ──────────── */}
          {tab==='seo' && (
            <div className="max-w-2xl space-y-5">
              <div className="card">
                <h2 className="font-semibold text-base flex items-center gap-2 mb-5"><Globe size={16} className="text-[var(--gold)]"/> Global SEO Settings</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-[10px] text-[var(--muted2)] mb-1.5 font-bold uppercase tracking-wider">Site Title</label>
                    <input className="input text-sm" defaultValue="NyayaSutra — Legal Intelligence | Adv. A.K. Tripathi"/>
                    <p className="text-[10px] text-[var(--muted2)] mt-1">Shown in browser tab and Google. {60} chars max.</p>
                  </div>
                  <div>
                    <label className="block text-[10px] text-[var(--muted2)] mb-1.5 font-bold uppercase tracking-wider">Site Description</label>
                    <textarea className="input text-sm" style={{minHeight:80}} defaultValue="NyayaSutra is a modern legal intelligence platform — strategic litigation, legal research, drafting, constitutional practice, corporate advisory by Adv. A.K. Tripathi, Allahabad & Delhi."/>
                    <p className="text-[10px] text-[var(--muted2)] mt-1">160 chars max. Shown in Google results.</p>
                  </div>
                  <div>
                    <label className="block text-[10px] text-[var(--muted2)] mb-1.5 font-bold uppercase tracking-wider">Focus Keywords</label>
                    <input className="input text-sm" defaultValue="lawyer allahabad, legal services delhi, advocate india, NyayaSutra, AK Tripathi advocate, supreme court lawyer"/>
                  </div>
                  <div>
                    <label className="block text-[10px] text-[var(--muted2)] mb-1.5 font-bold uppercase tracking-wider">OG Image URL (Social Share Image)</label>
                    <input className="input text-sm font-mono" placeholder="https://res.cloudinary.com/..."/>
                  </div>
                  <div>
                    <label className="block text-[10px] text-[var(--muted2)] mb-1.5 font-bold uppercase tracking-wider">Google Analytics ID</label>
                    <input className="input text-sm font-mono" placeholder="G-XXXXXXXXXX"/>
                  </div>
                  <button className="btn-gold text-sm py-2 px-5">Save SEO Settings</button>
                </div>
              </div>
              <div className="card">
                <h3 className="font-semibold text-sm mb-4 flex items-center gap-2"><CheckCircle size={14} className="text-[var(--gold)]"/> SEO Health Checklist</h3>
                <div className="space-y-2">
                  {[
                    ['Sitemap.xml configured', true],['Robots.txt configured', true],
                    ['Meta title set', true],['Meta description set', true],
                    ['Open Graph tags active', true],['Canonical URLs set', true],
                    ['Schema markup (LocalBusiness)', false],['Google Search Console', false],
                    ['Google Analytics', false],['Bing Webmaster Tools', false],
                  ].map(([item, done]) => (
                    <div key={item as string} className="flex items-center gap-3 text-sm">
                      <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${done ? 'bg-green-500/20' : 'bg-[rgba(255,255,255,0.05)]'}`}>
                        {done ? <CheckCircle size={10} className="text-green-400"/> : <div className="w-1.5 h-1.5 rounded-full bg-[rgba(255,255,255,0.15)]"/>}
                      </div>
                      <span className={done ? 'text-[var(--ivory)]' : 'text-[var(--muted2)]'}>{item as string}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ──────────── SETTINGS ──────────── */}
          {tab==='settings' && (
            <div className="max-w-xl space-y-5">
              <div className="card">
                <h2 className="font-semibold text-base flex items-center gap-2 mb-5"><Settings size={16} className="text-[var(--gold)]"/> Admin Settings</h2>
                <div className="space-y-4">
                  <div><label className="block text-[10px] text-[var(--muted2)] mb-1.5 font-bold uppercase tracking-wider">Admin Email</label>
                    <input className="input text-sm" defaultValue="admin@nyayasutra.org"/></div>
                  <div><label className="block text-[10px] text-[var(--muted2)] mb-1.5 font-bold uppercase tracking-wider">New Password</label>
                    <input type="password" className="input text-sm" placeholder="Leave blank to keep current"/></div>
                  <div><label className="block text-[10px] text-[var(--muted2)] mb-1.5 font-bold uppercase tracking-wider">Site URL</label>
                    <input className="input text-sm font-mono" defaultValue="https://nyayasutra.com"/></div>
                  <div><label className="block text-[10px] text-[var(--muted2)] mb-1.5 font-bold uppercase tracking-wider">WhatsApp Number</label>
                    <input className="input text-sm font-mono" defaultValue="+919971950371"/></div>
                  <button className="btn-gold text-sm py-2 px-5">Save Settings</button>
                </div>
              </div>
              <div className="card">
                <h3 className="font-semibold text-sm mb-3">Default Admin Credentials</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between p-3 rounded-xl bg-[rgba(255,255,255,0.03)]">
                    <span className="text-[var(--muted2)]">Email</span>
                    <span className="font-mono text-[var(--gold)] text-xs">admin@nyayasutra.org</span>
                  </div>
                  <div className="flex justify-between p-3 rounded-xl bg-[rgba(255,255,255,0.03)]">
                    <span className="text-[var(--muted2)]">Password</span>
                    <span className="font-mono text-[var(--gold)] text-xs">admin123</span>
                  </div>
                </div>
                <div className="mt-3 p-3 rounded-xl bg-yellow-500/8 border border-yellow-500/20">
                  <p className="text-xs text-yellow-400">⚠️ Change the default password after first login in production for security.</p>
                </div>
              </div>
              <div className="card">
                <h3 className="font-semibold text-sm mb-3">Environment Variables</h3>
                <div className="space-y-1.5 text-xs font-mono">
                  {['MONGODB_URI','JWT_SECRET','ADMIN_EMAIL','ADMIN_PASSWORD','CLOUDINARY_CLOUD_NAME','CLOUDINARY_API_KEY','NEXT_PUBLIC_SITE_URL'].map(v => (
                    <div key={v} className="flex justify-between p-2 rounded-lg bg-[rgba(255,255,255,0.02)]">
                      <span className="text-[var(--gold)]">{v}</span>
                      <span className="text-[var(--muted2)]">configured ✓</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
