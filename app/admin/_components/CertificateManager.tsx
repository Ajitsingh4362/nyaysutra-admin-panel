'use client';
import { useState, useEffect, useCallback } from 'react';
import {
  Plus, Trash2, Edit3, X, Save, RefreshCw, Award, Search,
  Download, FileImage
} from 'lucide-react';
import { createRoot } from 'react-dom/client';
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

function wait(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Renders the certificate into a brand-new, temporary container that is
 * attached to the document body (normal in-flow, zero CSS transform, zero
 * `position: fixed`/off-screen tricks, zero `zoom`), waits for it to fully
 * paint, captures it with html2canvas, then removes the container.
 *
 * No "preview" is kept mounted at any time — there is nothing to go stale,
 * nothing to mis-scale, nothing to overlap. This is the simplest possible
 * approach and avoids every failure mode hit previously.
 */
async function renderAndCapture(data: CertificateData): Promise<HTMLCanvasElement> {
  const container = document.createElement('div');
  container.style.position = 'absolute';
  container.style.top = '0';
  container.style.left = '0';
  // Push it below everything visually without using off-screen/negative
  // positioning or display:none (both of which can confuse capture tools).
  container.style.zIndex = '-1';
  container.style.opacity = '0';
  container.style.pointerEvents = 'none';
  document.body.appendChild(container);

  const root = createRoot(container);
  root.render(<CertificateTemplate data={data} />);

  // Wait for React to commit + the browser to actually paint the node
  // (fonts, layout, etc.) before handing it to html2canvas.
  await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));
  await wait(150);

  const target = container.firstElementChild as HTMLElement;
  const html2canvas = (await import('html2canvas')).default;
  const canvas = await html2canvas(target, {
    scale: 2,
    useCORS: true,
    backgroundColor: '#FCFAF4',
    width: 1754,
    height: 1240,
    logging: false,
  });

  root.unmount();
  document.body.removeChild(container);

  return canvas;
}

async function exportAsPNG(data: CertificateData, filename: string) {
  const canvas = await renderAndCapture(data);
  const link = document.createElement('a');
  link.download = `${filename}.png`;
  link.href = canvas.toDataURL('image/png');
  link.click();
}

async function exportAsPDF(data: CertificateData, filename: string) {
  const canvas = await renderAndCapture(data);
  const { jsPDF } = await import('jspdf');
  const imgData = canvas.toDataURL('image/png');
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
    if (!form.studentName.trim()) { setMsg('⚠️ Fill in student name before exporting.'); return; }
    if (!form.courseName.trim()) { setMsg('⚠️ Fill in course name before exporting.'); return; }

    let dataForExport = form;
    if (!form._id) {
      await handleSave();
    }

    setExporting(type);
    const filename = `Certificate_${form.studentName.replace(/\s+/g, '_')}_${form.certificateNumber || Date.now()}`;
    try {
      if (type === 'pdf') await exportAsPDF(dataForExport, filename);
      else await exportAsPNG(dataForExport, filename);
      setMsg(`✓ ${type.toUpperCase()} downloaded!`);
    } catch (e) {
      setMsg('Export failed — please try again.');
    }
    setExporting(null);
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      {/* Top bar */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <button onClick={onCancel} className="flex items-center gap-2 text-xs text-[var(--muted2)] hover:text-[var(--ivory)] transition-colors"><X size={14} /> Back to List</button>
        <div className="flex items-center gap-2 flex-wrap">
          {msg && <span className={`text-xs px-3 py-1.5 rounded-xl ${msg.startsWith('✓') ? 'bg-green-500/15 text-green-300' : 'bg-red-500/15 text-red-300'}`}>{msg}</span>}
        </div>
      </div>

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

      {/* Actions */}
      <div className="card space-y-3">
        <h3 className="font-semibold text-sm">Save & Download</h3>
        <p className="text-xs text-[var(--muted2)]">Fill in the details above, then save and download the certificate as PNG or PDF. There is no live preview — each download is freshly generated from the form data.</p>
        <div className="flex flex-wrap gap-2">
          <button onClick={handleSave} disabled={saving} className="btn-outline text-sm py-2.5 px-5">
            {saving ? <RefreshCw size={13} className="animate-spin" /> : <Save size={13} />} Save
          </button>
          <button onClick={() => handleExport('png')} disabled={exporting !== null} className="btn-outline text-sm py-2.5 px-5">
            {exporting === 'png' ? <RefreshCw size={13} className="animate-spin" /> : <FileImage size={13} />} Download PNG
          </button>
          <button onClick={() => handleExport('pdf')} disabled={exporting !== null} className="btn-gold text-sm py-2.5 px-6">
            {exporting === 'pdf' ? <RefreshCw size={13} className="animate-spin" /> : <Download size={13} />} Download PDF
          </button>
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
                        <button onClick={() => { setEditing(c); setView('form'); }} className="tb-btn" title="Edit / Re-download"><Edit3 size={13} /></button>
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
