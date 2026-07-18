import Link from 'next/link';
import { Gavel, Building2, MapPin, ChevronRight, Scale, ArrowRight, MessageCircle } from 'lucide-react';

const highCourts = [
  { name:'Allahabad High Court', state:'Uttar Pradesh', est:'1866', slug:'allahabad-hc' },
  { name:'Delhi High Court', state:'Delhi', est:'1966', slug:'delhi-hc' },
  { name:'Karnataka High Court', state:'Karnataka', est:'1884', slug:'karnataka-hc' },
  { name:'Calcutta High Court', state:'West Bengal', est:'1862', slug:'calcutta-hc' },
  { name:'Madhya Pradesh High Court', state:'Madhya Pradesh', est:'1936', slug:'mp-hc' },
  { name:'Madras High Court', state:'Tamil Nadu', est:'1862', slug:'madras-hc' },
  { name:'Chhattisgarh High Court', state:'Chhattisgarh', est:'2000', slug:'cg-hc' },
  { name:'Kerala High Court', state:'Kerala', est:'1958', slug:'kerala-hc' },
];

const districtCourts = [
  { name:'Allahabad District Courts', note:'Front District Judge Block C, Room No. 28' },
  { name:'Delhi District Courts', note:'Saket, Dwarka, Tis Hazari, Patiala House, Rohini' },
  { name:'Bengaluru District Courts', note:'City Civil Court Complex, Bengaluru' },
  { name:'Kolkata District Courts', note:'City Sessions Court, Kolkata' },
  { name:'District Courts Across India', note:'Available on request' },
];

const tribunals = [
  'National Consumer Commission (NCDRC)',
  'Debt Recovery Tribunal (DRT)',
  'Labour Court & Industrial Tribunal',
  'Rent Control Tribunal',
  'RERA Appellate Tribunal',
  'Motor Accident Claims Tribunal',
  'Income Tax Appellate Tribunal (ITAT)',
  'National Company Law Tribunal (NCLT)',
  'Human Rights Commission (NHRC / SHRC)',
  'Central Administrative Tribunal (CAT)',
];

export default function Courts() {
  return (
    <main className="overflow-x-hidden">
      {/* OLD: <section className="relative py-20 px-4 overflow-hidden bg-[#0C1018]"> */}
      <section className="relative py-20 px-4 overflow-hidden court-section">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(201,168,76,0.07),transparent_60%)] pointer-events-none"/>
        <div className="container mx-auto relative z-10">
          <p className="tag">Jurisdiction & Coverage</p>
          <h1 className="section-title mt-3">Courts & Working<br/>Jurisdiction</h1>
          <p className="muted text-lg mt-5 max-w-3xl">NyayaSutra provides strategic legal support, drafting assistance, research coordination, and court-oriented legal preparation across all tiers of the Indian judicial system.</p>
        </div>
      </section>

      {/* Supreme Court */}
      <section className="section">
        <div className="container px-4 mx-auto">
          <div className="grid lg:grid-cols-2 gap-10 items-start">
            <div>
              <p className="tag">Apex Court</p>
              <h2 className="font-display text-4xl font-bold mt-3">Supreme Court of India</h2>
              <p className="muted mt-4 leading-relaxed">NyayaSutra provides strategic support, drafting assistance, research coordination, and court-oriented legal preparation for matters before the Supreme Court of India — the apex constitutional court.</p>
              <p className="muted mt-3 leading-relaxed">Supreme Court practice requires precision, deep legal research, and a clear understanding of constitutional principles, procedural law, and judicial reasoning.</p>
              <Link href="/practice-areas/supreme-court" className="btn-gold mt-6">Supreme Court Services <ArrowRight size={14}/></Link>
            </div>
            <div className="card">
              <Gavel className="text-[var(--gold)]" size={36}/>
              <h3 className="font-display text-xl font-semibold mt-4 mb-4">Services We Provide</h3>
              <div className="grid grid-cols-2 gap-2">
                {['SLP Drafting','Article 32 Petitions','Civil Appeals','Criminal Appeals','Review Petitions','Curative Petitions','Constitutional Matters','Research & Briefing','Case Strategy Support','Judgment Analysis','Writ Petitions','PIL Matters'].map(s => (
                  <div key={s} className="flex items-center gap-2 text-xs text-[var(--muted)]">
                    <ChevronRight size={10} className="text-[var(--gold)] shrink-0"/>{s}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* High Courts */}
      <section className="section bg-[#0C1018]">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-12">
            <p className="tag">High Courts</p>
            <h2 className="section-title mt-3">High Court Practice</h2>
            <p className="muted mt-4 max-w-2xl mx-auto">NyayaSutra provides legal assistance, drafting, litigation support, and strategic legal research for matters before various High Courts across India.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {highCourts.map(hc => (
              <Link key={hc.slug} href={`/practice-areas/high-court`} className="card-link">
                <div className="w-10 h-10 rounded-xl bg-[rgba(201,168,76,0.1)] flex items-center justify-center mb-3">
                  <Building2 size={18} className="text-[var(--gold)]"/>
                </div>
                <h3 className="font-semibold text-sm leading-tight">{hc.name}</h3>
                <p className="text-[var(--muted2)] text-xs mt-1">{hc.state}</p>
                <p className="text-[var(--muted2)] text-[10px] mt-0.5">Est. {hc.est}</p>
                <span className="text-[var(--gold)] text-xs mt-3 inline-flex items-center gap-0.5 font-semibold">View Services <ChevronRight size={10}/></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* District Courts */}
      <section className="section">
        <div className="container px-4 mx-auto">
          <div className="grid lg:grid-cols-2 gap-10">
            <div>
              <p className="tag">District Courts</p>
              <h2 className="font-display text-4xl font-bold mt-3">District Court Practice</h2>
              <p className="muted mt-4 leading-relaxed">We provide legal support and litigation assistance in District Courts relating to criminal matters, civil disputes, recovery suits, family disputes, property litigation, injunctions, consumer matters, and documentation.</p>
              <div className="space-y-3 mt-6">
                {districtCourts.map(dc => (
                  <div key={dc.name} className="flex items-start gap-3 p-4 rounded-xl border border-[rgba(201,168,76,0.12)] bg-[rgba(201,168,76,0.03)]">
                    <MapPin size={16} className="text-[var(--gold)] shrink-0 mt-0.5"/>
                    <div>
                      <p className="font-semibold text-sm">{dc.name}</p>
                      <p className="text-[var(--muted2)] text-xs mt-0.5">{dc.note}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="tag">Tribunals & Forums</p>
              <h2 className="font-display text-4xl font-bold mt-3">Tribunals & Forums</h2>
              <p className="muted mt-4 leading-relaxed">Beyond courts, we assist in quasi-judicial proceedings before various tribunals and forums.</p>
              <div className="space-y-2 mt-6">
                {tribunals.map(t => (
                  <div key={t} className="flex items-center gap-3 p-3 rounded-xl border border-[rgba(201,168,76,0.08)] hover:border-[rgba(201,168,76,0.25)] transition-colors">
                    <ChevronRight size={12} className="text-[var(--gold)] shrink-0"/>
                    <span className="text-sm text-[var(--muted)]">{t}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Office */}
      <section className="section bg-[#0C1018]">
        <div className="container px-4 mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="card">
              <MapPin className="text-[var(--gold)]" size={32}/>
              <h3 className="font-display text-2xl font-bold mt-4">Head Office</h3>
              <p className="text-[var(--muted)] mt-2">Allahabad — Front District Judge Block C, Room No. 28</p>
              <div className="mt-4 p-4 rounded-xl bg-[rgba(201,168,76,0.06)] border border-[rgba(201,168,76,0.15)]">
                <p className="text-xs text-[var(--gold)] font-semibold mb-1">Also Practice At:</p>
                <p className="text-xs text-[var(--muted2)]">Supreme Court of India, New Delhi · All Major High Courts · District Courts Across India</p>
              </div>
            </div>
            <div className="card flex flex-col justify-center">
              <h3 className="font-display text-2xl font-bold mb-4">Need Court Assistance?</h3>
              <p className="text-[var(--muted)] text-sm mb-6">Whether your matter is before the Supreme Court, a High Court, or District Court — we can help. Contact us for a free first consultation.</p>
              <div className="flex flex-wrap gap-3">
                <a href="https://wa.me/919971950371" target="_blank" className="btn-gold text-sm"><MessageCircle size={14}/> WhatsApp</a>
                <Link href="/contact" className="btn-outline text-sm">Book Consultation</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
