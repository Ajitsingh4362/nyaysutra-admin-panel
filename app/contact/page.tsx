'use client';
import { Mail, MapPin, MessageCircle, Phone, Clock, Send, CheckCircle, Building2, Scale } from 'lucide-react';
import { useState } from 'react';

const services = ['Legal Consultation','Criminal Defence','Civil Litigation','Constitutional / Writ Matter','Family & Matrimonial','Property Dispute','Consumer Protection','Corporate / Business Legal','Arbitration / ADR','RTI / Human Rights','Cyber Crime','Legal Research & Drafting','Law Student Mentorship','Other'];

const courts = ['Supreme Court of India','Allahabad High Court','Delhi High Court','Karnataka High Court','Calcutta High Court','Madhya Pradesh High Court','Madras High Court','Chhattisgarh High Court','Kerala High Court','District Courts Across India'];

export default function Contact() {
  const [form, setForm] = useState({ name:'', phone:'', email:'', service: services[0], message:'', contactMethod:'WhatsApp' });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const setF = (k: string, v: string) => setForm(p => ({ ...p, [k]: v }));

  const handleSubmit = async () => {
    if (!form.name || !form.phone) { setError('Name and phone are required.'); return; }
    setSending(true); setError('');
    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Failed');
      setSent(true);
    } catch {
      setError('Something went wrong. Please try WhatsApp instead.');
    }
    setSending(false);
  };

  return (
    <main className="overflow-x-hidden">
      {/* Hero */}
      <section className="relative py-20 px-4 overflow-hidden bg-[#0C1018]">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(201,168,76,0.07),transparent_60%)] pointer-events-none"/>
        <div className="container mx-auto relative z-10">
          <p className="tag">Get In Touch</p>
          <h1 className="section-title mt-3">Consultation &<br/>Support</h1>
          <p className="muted text-lg mt-5 max-w-2xl">Reach out for legal consultation, documentation support, or student mentorship. First consultation is free.</p>
        </div>
      </section>

      <section className="section">
        <div className="container px-4 mx-auto grid lg:grid-cols-2 gap-10">

          {/* Left — info */}
          <div className="space-y-4">
            <h2 className="font-display text-2xl font-bold text-[var(--gold)]">Contact Information</h2>

            <a href="tel:+919971950371" className="flex gap-4 p-4 card hover:border-[rgba(201,168,76,0.4)] transition-colors group">
              <div className="w-10 h-10 rounded-xl bg-[rgba(201,168,76,0.1)] flex items-center justify-center shrink-0"><Phone size={18} className="text-[var(--gold)]"/></div>
              <div><p className="text-xs text-[var(--muted2)] mb-0.5">Phone / WhatsApp</p><p className="font-semibold">+91 9971950371</p></div>
            </a>

            <a href="mailto:nyayasutralegalintelligence@gmail.com" className="flex gap-4 p-4 card hover:border-[rgba(201,168,76,0.4)] transition-colors">
              <div className="w-10 h-10 rounded-xl bg-[rgba(201,168,76,0.1)] flex items-center justify-center shrink-0"><Mail size={18} className="text-[var(--gold)]"/></div>
              <div><p className="text-xs text-[var(--muted2)] mb-0.5">Email</p><p className="font-semibold text-sm break-all">nyayasutralegalintelligence@gmail.com</p></div>
            </a>

            <div className="flex gap-4 p-4 card">
              <div className="w-10 h-10 rounded-xl bg-[rgba(201,168,76,0.1)] flex items-center justify-center shrink-0"><MapPin size={18} className="text-[var(--gold)]"/></div>
              <div>
                <p className="text-xs text-[var(--muted2)] mb-0.5">Head Office</p>
                <p className="font-semibold text-sm">Allahabad — Front District Judge Block C, Room No. 28</p>
                <p className="text-xs text-[var(--muted2)] mt-1">Also: Sangam Vihar, Wazirabad Highway Road, Delhi – 110084</p>
              </div>
            </div>

            <div className="flex gap-4 p-4 card">
              <div className="w-10 h-10 rounded-xl bg-[rgba(201,168,76,0.1)] flex items-center justify-center shrink-0"><Clock size={18} className="text-[var(--gold)]"/></div>
              <div><p className="text-xs text-[var(--muted2)] mb-0.5">Office Hours</p><p className="font-semibold text-sm">Mon – Sat: 10:00 AM – 7:00 PM</p><p className="text-xs text-[var(--muted2)]">Sunday: By Appointment Only</p></div>
            </div>

            <a href="https://wa.me/919971950371" target="_blank" className="btn-gold w-full justify-center mt-2">
              <MessageCircle size={16}/> Start WhatsApp Consultation
            </a>

            {/* Courts covered */}
            <div className="card mt-2">
              <div className="flex items-center gap-2 mb-4">
                <Scale size={16} className="text-[var(--gold)]"/>
                <h3 className="font-semibold text-sm">Practice & Work Base</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                {courts.map(c => (
                  <div key={c} className="flex items-center gap-2 text-xs text-[var(--muted2)]">
                    <Building2 size={10} className="text-[var(--gold)] shrink-0"/>{c}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right — form */}
          <div className="card">
            <h2 className="font-display text-2xl font-bold text-[var(--gold)] mb-6">Send a Query</h2>
            {sent ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle size={32} className="text-green-400"/>
                </div>
                <h3 className="font-display text-xl font-semibold">Query Received!</h3>
                <p className="muted text-sm mt-2">We will contact you within 24 hours on {form.contactMethod}.</p>
                <a href="https://wa.me/919971950371" target="_blank" className="btn-gold mt-5 mx-auto">
                  <MessageCircle size={14}/> WhatsApp for Faster Response
                </a>
                <button onClick={() => { setSent(false); setForm({ name:'', phone:'', email:'', service: services[0], message:'', contactMethod:'WhatsApp' }); }}
                  className="btn-outline mt-3 w-full justify-center text-sm">Send Another Query</button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-[var(--muted2)] mb-1.5 font-semibold uppercase tracking-wider">Full Name *</label>
                    <input value={form.name} onChange={e => setF('name', e.target.value)} className="input" placeholder="Your full name"/>
                  </div>
                  <div>
                    <label className="block text-xs text-[var(--muted2)] mb-1.5 font-semibold uppercase tracking-wider">Phone / WhatsApp *</label>
                    <input value={form.phone} onChange={e => setF('phone', e.target.value)} className="input" placeholder="+91 XXXXXXXXXX"/>
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-[var(--muted2)] mb-1.5 font-semibold uppercase tracking-wider">Email Address</label>
                  <input value={form.email} onChange={e => setF('email', e.target.value)} className="input" placeholder="your@email.com"/>
                </div>
                <div>
                  <label className="block text-xs text-[var(--muted2)] mb-1.5 font-semibold uppercase tracking-wider">Service Required *</label>
                  <select value={form.service} onChange={e => setF('service', e.target.value)} className="input">
                    {services.map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-[var(--muted2)] mb-1.5 font-semibold uppercase tracking-wider">Brief Description</label>
                  <textarea value={form.message} onChange={e => setF('message', e.target.value)}
                    className="input" style={{minHeight:110}} placeholder="Describe your legal matter or query briefly..."/>
                </div>
                <div>
                  <label className="block text-xs text-[var(--muted2)] mb-2 font-semibold uppercase tracking-wider">Preferred Contact</label>
                  <div className="flex flex-wrap gap-2">
                    {['WhatsApp','Call','Email','Office Visit'].map(m => (
                      <button key={m} type="button" onClick={() => setF('contactMethod', m)}
                        className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all ${form.contactMethod===m ? 'border-[var(--gold)] bg-[rgba(201,168,76,0.12)] text-[var(--gold)]' : 'border-[rgba(201,168,76,0.2)] text-[var(--muted2)] hover:border-[rgba(201,168,76,0.4)]'}`}>
                        {m}
                      </button>
                    ))}
                  </div>
                </div>
                {error && <p className="text-red-400 text-sm">{error}</p>}
                <p className="text-xs text-[var(--muted2)]">By submitting, you agree to be contacted by NyayaSutra. First consultation is free.</p>
                <button onClick={handleSubmit} disabled={sending} className="btn-gold w-full justify-center">
                  {sending ? 'Sending...' : <><Send size={14}/> Submit Query</>}
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Consultation services */}
      <section className="section bg-[#0C1018] px-4">
        <div className="container mx-auto">
          <div className="text-center mb-8">
            <p className="tag">Consultation Support</p>
            <h2 className="font-display text-3xl font-bold mt-3">How We Can Help</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {['WhatsApp Consultation','Legal Research Support','Drafting Assistance','Litigation Guidance','Documentation Support','Legal Advisory'].map(s => (
              <div key={s} className="p-3 rounded-xl border border-[rgba(201,168,76,0.12)] text-center hover:border-[rgba(201,168,76,0.35)] transition-colors">
                <p className="text-xs text-[var(--muted)] font-medium">{s}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
