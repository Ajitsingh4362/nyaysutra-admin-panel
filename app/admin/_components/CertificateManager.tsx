'use client';
import { useState, useEffect, useCallback, useRef } from 'react';
import {
  Plus, Trash2, Edit3, X, Save, RefreshCw, Award, Search,
  Download, FileImage, FileText as FileTextIcon, Eye, Printer, CheckCircle
} from 'lucide-react';
import CertificateTemplate, { CertificateData } from './CertificateTemplate';

interface Certificate extends CertificateData {
  _id?: string;
  status?: 'active' | 'revoked';
  createdAt?: string;
}

const blank: Certificate = {
  certificateNumber: '',
  studentName: '',
  fatherName: '',
  courseName: '',
  courseType: 'Certificate Course',
  duration: '',
  startDate: '',
  endDate: '',
  grade: 'Successfully Completed',
  issueDate: new Date().toISOString().split('T')[0],
  remarks: '',
  signatoryName: 'Adv. A.K. Tripathi',
  signatoryDesignation: 'Founder, NyayaSutra — Legal Intelligence',
};

const COURSE_TYPES = [
  'Certificate Course', 'Internship Program', 'Moot Court Training',
  'Legal Research Workshop', 'Drafting Workshop', 'Mentorship Program', 'Seminar / Webinar',
];

const GRADES = ['Successfully Completed', 'A+ (Outstanding)', 'A (Excellent)', 'B+ (Very Good)', 'B (Good)', 'Distinction', 'Merit'];

// ── Export helpers ─────────────────────────────────────────────
// IMPORTANT: html2canvas is unreliable when capturing elements that are
// either (a) positioned off-screen (e.g. left: -99999px) or (b) wrapped
// in a CSS `transform: scale()`. On many mobile browsers this produced
// either fully blank exports or overlapping/misplaced text.
//
// The reliable approach: capture the certificate while it is fully
// visible, in-flow, and rendered at its true 1:1 size (no transform).
// We do this by briefly setting the preview's scale to 1 (forcing a
// real layout reflow at full size), capturing it, then restoring the
// original on-screen scale — all within a few hundred milliseconds,
// so the user barely notices a flicker.
function wait(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function captureAtFullSize(
  node: HTMLElement,
  setScale: (n: number) => void,
  originalScale: number
) {
  const html2canvas = (await import('html2canvas')).default;

  // Force the node to render at true 1:1 scale before capture.
  setScale(1);
  // Wait two animation frames + a short delay so the browser actually
  // repaints at the new (unscaled) size before html2canvas reads it.
  await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));
  await wait(120);

  let canvas: HTMLCanvasElement;
  try {
    canvas = await html2canvas(node, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#FCFAF4',
      width: 1754,
      height: 1240,
      logging: false,
    });
  } finally {
    // Always restore the original preview scale, even if capture throws.
    setScale(originalScale);
  }

  return canvas;
}

async function exportAsPNG(
  node: HTMLElement,
  filename: string,
  setScale: (n: number) => void,
  originalScale: number
) {
  const canvas = await captureAtFullSize(node, setScale, originalScale);
  const link = document.createElement('a');
  link.download = `${filename}.png`;
  link.href = canvas.toDataURL('image/png');
  link.click();
}

async function exportAsPDF(
  node: HTMLElement,
  filename: string,
  setScale: (n: number) => void,
  originalScale: number
) {
  const canvas = await captureAtFullSize(node, setScale, originalScale);
  const { jsPDF } = await import('jspdf');
  const imgData = canvas.toDataURL('image/png');
  // A4 landscape: 297mm x 210mm
  const pdf = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
  pdf.addImage(imgData, 'PNG', 0, 0, 297, 210);
  pdf.save(`${filename}.pdf`);
}

// ── Certificate Form (Create / Edit) ───────────────────────────
function CertificateForm({ cert, onSave, onCancel }: { cert: Certificate | null; onSave: () => void; onCancel: () => void }) {
  const [form, setForm] = useState<Certificate>({ ...blank, ...(cert || {}) });
  const [saving, setSaving] = useState(false);
  const [exporting, setExporting] = useState<'pdf' | 'png' | null>(null);
  const [msg, setMsg] = useState('');
  const previewRef = useRef<HTMLDivElement>(null);
  const previewBoxRef = useRef<HTMLDivElement>(null);
  const [previewScale, setPreviewScale] = useState(0.2);

  // Recalculate the preview scale whenever the container is resized
  // (window resize, orientation change, sidebar collapse, etc.) so the
  // certificate always fits its box exactly — no overlap, no clipping.
  useEffect(() => {
    const box = previewBoxRef.current;
    if (!box) return;
    const CERT_WIDTH = 1754;

    const updateScale = () => {
      const boxWidth = box.getBoundingClientRect().width;
      if (boxWidth > 0) setPreviewScale(boxWidth / CERT_WIDTH);
    };

    updateScale();
    const observer = new ResizeObserver(updateScale);
    observer.observe(box);
    return () => observer.disconnect();
  }, []);

  const setF = (k: keyof Certificate, v: any) => setForm(p => ({ ...p, [k]: v }));

  const handleSave = async () => {
    if (!form.studentName.trim()) { setMsg('⚠️ Student name is required.'); return; }
    if (!form.courseName.trim()) { setMsg('⚠️ Course name is required.'); return; }
    setSaving(true); setMsg('');
    try {
      const isEdit = !!form._id;
      const url = isEdit ? `/api/certificates/${form._id}` : '/api/certificates';
      const method = isEdit ? 'PUT' : 'POST';
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      if (!res.ok) throw new Error(await res.text());
      const saved = await res.json();
      setForm(saved);
      setMsg('✓ Certificate saved!');
    } catch (err: any) { setMsg(`Error: ${err.message || 'Try again.'}`); }
    setSaving(false);
  };

  const handleExport = async (type: 'pdf' | 'png') => {
    if (!previewRef.current) return;
    if (!form.studentName.trim()) { setMsg('⚠️ Fill in student name before exporting.'); return; }
    // Auto-save first if not saved yet
    if (!form._id) {
      await handleSave();
    }
    setExporting(type);
    const filename = `Certificate_${form.studentName.replace(/\s+/g, '_')}_${form.certificateNumber || Date.now()}`;
    try {
      if (type === 'pdf') await exportAsPDF(previewRef.current, filename, setPreviewScale, previewScale);
      else await exportAsPNG(previewRef.current, filename, setPreviewScale, previewScale);
    } catch (e) {
      setMsg('Export failed — please try again.');
      setPreviewScale(previewScale); // ensure scale is restored even on outer failure
    }
    setExporting(null);
  };

  return (
    <div className="space-y-6">
      {/* Top bar */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <button onClick={onCancel} className="flex items-center gap-2 text-xs text-[var(--muted2)] hover:text-[var(--ivory)] transition-colors"><X size={14} /> Back to List</button>
        <div className="flex items-center gap-2 flex-wrap">
          {msg && <span className={`text-xs px-3 py-1.5 rounded-xl ${msg.startsWith('✓') ? 'bg-green-500/15 text-green-300' : 'bg-red-500/15 text-red-300'}`}>{msg}</span>}
          <button onClick={handleSave} disabled={saving} className="btn-outline text-xs py-2 px-4">
            {saving ? <RefreshCw size={12} className="animate-spin" /> : <Save size={12} />} Save
          </button>
          <button onClick={() => handleExport('png')} disabled={exporting !== null} className="btn-outline text-xs py-2 px-4">
            {exporting === 'png' ? <RefreshCw size={12} className="animate-spin" /> : <FileImage size={12} />} PNG
          </button>
          <button onClick={() => handleExport('pdf')} disabled={exporting !== null} className="btn-gold text-xs py-2 px-5">
            {exporting === 'pdf' ? <RefreshCw size={12} className="animate-spin" /> : <Download size={12} />} Download PDF
          </button>
        </div>
      </div>

      <div className="grid xl:grid-cols-[420px_1fr] gap-6">
        {/* Form */}
        <div className="space-y-4">
          <div className="card space-y-4">
            <h3 className="font-semibold text-sm flex items-center gap-2"><Award size={14} className="text-[var(--gold)]" /> Student & Course Details</h3>

            <div>
              <label className="block text-[10px] text-[var(--muted2)] mb-1.5 font-bold uppercase tracking-wider">Student Full Name *</label>
              <input value={form.studentName} onChange={e => setF('studentName', e.target.value)} className="input text-sm" placeholder="e.g. Rahul Kumar Sharma" />
            </div>

            <div>
              <label className="block text-[10px] text-[var(--muted2)] mb-1.5 font-bold uppercase tracking-wider">Father's / Mother's Name</label>
              <input value={form.fatherName} onChange={e => setF('fatherName', e.target.value)} className="input text-sm" placeholder="e.g. Mr. Suresh Sharma" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] text-[var(--muted2)] mb-1.5 font-bold uppercase tracking-wider">Certificate Type</label>
                <select value={form.courseType} onChange={e => setF('courseType', e.target.value)} className="input text-sm">
                  {COURSE_TYPES.map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-[10px] text-[var(--muted2)] mb-1.5 font-bold uppercase tracking-wider">Grade / Result</label>
                <select value={form.grade} onChange={e => setF('grade', e.target.value)} className="input text-sm">
                  {GRADES.map(g => <option key={g}>{g}</option>)}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[10px] text-[var(--muted2)] mb-1.5 font-bold uppercase tracking-wider">Course / Internship Name *</label>
              <input value={form.courseName} onChange={e => setF('courseName', e.target.value)} className="input text-sm" placeholder="e.g. Legal Research & Drafting Internship" />
            </div>

            <div>
              <label className="block text-[10px] text-[var(--muted2)] mb-1.5 font-bold uppercase tracking-wider">Duration (display text)</label>
              <input value={form.duration} onChange={e => setF('duration', e.target.value)} className="input text-sm" placeholder="e.g. 3 Months / 90 Hours" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] text-[var(--muted2)] mb-1.5 font-bold uppercase tracking-wider">Start Date</label>
                <input type="date" value={form.startDate} onChange={e => setF('startDate', e.target.value)} className="input text-sm" />
              </div>
              <div>
                <label className="block text-[10px] text-[var(--muted2)] mb-1.5 font-bold uppercase tracking-wider">End Date</label>
                <input type="date" value={form.endDate} onChange={e => setF('endDate', e.target.value)} className="input text-sm" />
              </div>
            </div>

            <div>
              <label className="block text-[10px] text-[var(--muted2)] mb-1.5 font-bold uppercase tracking-wider">Issue Date</label>
              <input type="date" value={form.issueDate} onChange={e => setF('issueDate', e.target.value)} className="input text-sm" />
            </div>

            <div>
              <label className="block text-[10px] text-[var(--muted2)] mb-1.5 font-bold uppercase tracking-wider">Remarks (optional quote/note)</label>
              <textarea value={form.remarks} onChange={e => setF('remarks', e.target.value)} className="input text-sm" style={{ minHeight: 60 }} placeholder="e.g. Demonstrated exceptional research and drafting skills." />
            </div>
          </div>

          <div className="card space-y-4">
            <h3 className="font-semibold text-sm">Signatory Details</h3>
            <div>
              <label className="block text-[10px] text-[var(--muted2)] mb-1.5 font-bold uppercase tracking-wider">Signatory Name</label>
              <input value={form.signatoryName} onChange={e => setF('signatoryName', e.target.value)} className="input text-sm" />
            </div>
            <div>
              <label className="block text-[10px] text-[var(--muted2)] mb-1.5 font-bold uppercase tracking-wider">Signatory Designation</label>
              <input value={form.signatoryDesignation} onChange={e => setF('signatoryDesignation', e.target.value)} className="input text-sm" />
            </div>
            {form.certificateNumber && (
              <div className="p-3 rounded-xl bg-[rgba(201,168,76,0.06)] border border-[rgba(201,168,76,0.15)]">
                <p className="text-[10px] text-[var(--gold)] font-bold uppercase tracking-wider mb-1">Certificate Number</p>
                <p className="text-sm font-mono">{form.certificateNumber}</p>
                <p className="text-[10px] text-[var(--muted2)] mt-1">Auto-generated on save — sequential & unique</p>
              </div>
            )}
          </div>
        </div>

        {/* Live Preview — responsive scaling via ResizeObserver (works correctly on all screen sizes).
            This SAME visible node is also used for PNG/PDF export: at export time its scale is
            briefly set to 1 (full size, in-flow, fully visible) so html2canvas captures it
            reliably, then the scale is restored. This avoids the blank/overlapping export bugs
            caused by capturing off-screen or CSS-transformed elements on mobile browsers. */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-sm flex items-center gap-2"><Eye size={14} className="text-[var(--gold)]" /> Live Preview</h3>
            <span className="text-[10px] text-[var(--muted2)]">Scaled preview — exports at full print quality</span>
          </div>
          <div
            ref={previewBoxRef}
            className="rounded-2xl overflow-hidden border border-[rgba(201,168,76,0.2)] bg-[#0a0a0a] relative"
            style={{ width: '100%', aspectRatio: '1754 / 1240' }}
          >
            <div
              style={{
                width: 1754,
                height: 1240,
                transform: `scale(${previewScale})`,
                transformOrigin: 'top left',
              }}
            >
              <CertificateTemplate ref={previewRef} data={form} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main Manager (List view) ────────────────────────────────────
export default function CertificateManager() {
  const [items, setItems] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState<'list' | 'form'>('list');
  const [editing, setEditing] = useState<Certificate | null>(null);
  const [search, setSearch] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const r = await fetch('/api/certificates');
      const d = await r.json();
      setItems(Array.isArray(d) ? d : []);
    } catch { setItems([]); }
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const del = async (id: string) => {
    if (!confirm('Delete this certificate record permanently?')) return;
    await fetch(`/api/certificates/${id}`, { method: 'DELETE' });
    load();
  };

  const filtered = items.filter(i =>
    !search ||
    i.studentName?.toLowerCase().includes(search.toLowerCase()) ||
    i.certificateNumber?.toLowerCase().includes(search.toLowerCase()) ||
    i.courseName?.toLowerCase().includes(search.toLowerCase())
  );

  if (view === 'form') {
    return <CertificateForm cert={editing} onSave={() => load()} onCancel={() => { load(); setView('list'); setEditing(null); }} />;
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="relative w-full sm:max-w-xs">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted2)]" />
          <input value={search} onChange={e => setSearch(e.target.value)} className="input pl-8 text-sm py-2.5" placeholder="Search by name, cert no, course..." />
        </div>
        <div className="flex gap-2">
          <button onClick={load} className="btn-outline text-xs py-2 px-3"><RefreshCw size={12} /></button>
          <button onClick={() => { setEditing(null); setView('form'); }} className="btn-gold text-sm py-2 px-4 whitespace-nowrap"><Plus size={13} /> Generate Certificate</button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-16"><RefreshCw size={20} className="animate-spin inline text-[var(--muted2)]" /></div>
      ) : filtered.length === 0 ? (
        <div className="card text-center py-16">
          <Award size={40} className="text-[var(--muted2)] mx-auto mb-3 opacity-30" />
          <p className="text-[var(--muted2)] text-sm">{search ? 'No matching certificates.' : 'No certificates issued yet. Generate your first one!'}</p>
        </div>
      ) : (
        <div className="card p-0 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="admin-table" style={{ minWidth: 640 }}>
              <thead>
                <tr>
                  <th>Cert. No.</th>
                  <th>Student</th>
                  <th>Course</th>
                  <th>Issue Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(c => (
                  <tr key={c._id}>
                    <td><span className="font-mono text-xs text-[var(--gold)]">{c.certificateNumber}</span></td>
                    <td className="font-medium text-sm">{c.studentName}</td>
                    <td><span className="text-xs text-[var(--muted2)] truncate max-w-[180px] inline-block">{c.courseName}</span></td>
                    <td><span className="text-xs text-[var(--muted2)]">{c.issueDate ? new Date(c.issueDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '—'}</span></td>
                    <td>
                      <div className="flex items-center gap-1">
                        <button onClick={() => { setEditing(c); setView('form'); }} className="tb-btn" title="Edit / Re-export"><Edit3 size={13} /></button>
                        <button onClick={() => del(c._id!)} className="tb-btn text-red-400 hover:bg-red-500/10" title="Delete"><Trash2 size={13} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
