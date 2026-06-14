import Link from 'next/link';
import { ChevronRight, ArrowRight, GraduationCap, BookOpen, FileText, Scale, Search, Trophy, Newspaper, PenTool, Briefcase, MessageCircle, CheckCircle, Users, Award } from 'lucide-react';
import CoursesSection from './CoursesSection';

const programs = [
  { icon: Briefcase, title: 'Internship Program', desc: 'Gain real courtroom and office experience. Work directly on live legal matters, drafting, research, and client interactions under professional supervision.', tags: ['Live Cases', 'Drafting Practice', 'Court Visits', 'Certificate'] },
  { icon: Trophy, title: 'Moot Court Guidance', desc: 'Comprehensive moot court preparation including memorial drafting, oral argument coaching, research strategy, and participation guidance.', tags: ['Memorial Drafting', 'Oral Arguments', 'Research', 'Strategy'] },
  { icon: BookOpen, title: 'Bare Act Notes', desc: 'Simplified bare act study notes for IPC/BNS, CrPC/BNSS, CPC, Evidence Act/BSA, Constitutional Law, and other key subjects.', tags: ['BNS 2023', 'BNSS 2023', 'BSA', 'Constitutional Law'] },
  { icon: Scale, title: 'Judgment Analysis', desc: 'Weekly Supreme Court and High Court judgment analysis sessions to develop analytical and legal reasoning skills.', tags: ['Supreme Court', 'High Courts', 'Analysis', 'Weekly'] },
  { icon: PenTool, title: 'Legal Drafting Guidance', desc: 'Practical legal drafting classes covering plaints, petitions, bail applications, legal notices, affidavits, writ petitions, and SLPs.', tags: ['Petitions', 'Affidavits', 'Bail Applications', 'Notices'] },
  { icon: Search, title: 'Research Assistance', desc: 'Legal research methodology, database usage (Manupatra, SCC Online), citation formats, and academic legal writing guidance.', tags: ['Research Methodology', 'Databases', 'Citations', 'Writing'] },
  { icon: Newspaper, title: 'Publication Support', desc: 'Guidance on writing and publishing legal articles, case comments, and research papers in law journals and online platforms.', tags: ['Articles', 'Case Comments', 'Journals', 'Online'] },
  { icon: GraduationCap, title: 'Career Guidance', desc: 'Personalized career counseling for law students choosing between litigation, corporate law, judiciary, civil services, or academic careers.', tags: ['Litigation', 'Judiciary', 'Civil Services', 'Corporate'] },
];

const subjects = [
  'Constitutional Law (Articles, Rights, Writs)','Criminal Law (BNS 2023, BNSS 2023)','Civil Law (CPC, Suits, Evidence)',
  'Evidence Act / BSA 2023','Family Law (Hindu, Muslim, Special)','Property Law (TPA, Registration)',
  'Contract Law (Indian Contract Act)','Company Law Basics','Arbitration & Conciliation Act',
  'Consumer Protection Law','Labour Laws (Codes)','Cyber Law & IT Act',
  'Human Rights & International Law','Legal Drafting & Professional Ethics','UPSC Law Optional Guidance',
];

export default function Students() {
  return (
    <main className="overflow-x-hidden">
      <section className="relative py-20 px-4 overflow-hidden bg-[#0C1018]">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(201,168,76,0.07),transparent_60%)] pointer-events-none"/>
        <div className="container mx-auto relative z-10">
          <p className="tag">Law Student Support</p>
          <h1 className="section-title mt-3">Students &<br/>Internship Support</h1>
          <p className="muted text-lg mt-5 max-w-3xl">NyayaSutra welcomes motivated law students who wish to gain exposure in litigation, legal drafting, legal research, and court practice. The objective is to help students understand practical legal work and professional standards in a real legal environment.</p>
          <div className="flex flex-wrap gap-3 mt-8">
            <Link href="/contact" className="btn-gold"><GraduationCap size={15}/> Apply for Internship</Link>
            <a href="https://wa.me/919971950371" target="_blank" className="btn-outline"><MessageCircle size={15}/> WhatsApp Query</a>
          </div>
        </div>
      </section>

      {/* Programs */}
      <section className="section">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-12">
            <p className="tag">What We Offer</p>
            <h2 className="section-title mt-3">Student Support Programs</h2>
            <p className="muted mt-4 max-w-2xl mx-auto">Comprehensive support for law students at every stage of their academic and professional journey.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {programs.map(({ icon: Icon, title, desc, tags }) => (
              <div key={title} className="card hover:border-[rgba(201,168,76,0.35)] transition-all">
                <div className="w-12 h-12 rounded-2xl bg-[rgba(201,168,76,0.1)] flex items-center justify-center mb-4">
                  <Icon size={22} className="text-[var(--gold)]"/>
                </div>
                <h3 className="font-display text-lg font-semibold">{title}</h3>
                <p className="text-[var(--muted2)] text-sm mt-2 leading-relaxed">{desc}</p>
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {tags.map(t => (
                    <span key={t} className="text-[10px] px-2 py-0.5 rounded-full border border-[rgba(201,168,76,0.2)] text-[var(--muted2)]">{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Subjects */}
      <section className="section bg-[#0C1018]">
        <div className="container px-4 mx-auto grid lg:grid-cols-2 gap-10">
          <div>
            <p className="tag">Subject Coverage</p>
            <h2 className="font-display text-4xl font-bold mt-3">Subjects We Cover</h2>
            <p className="muted mt-4 leading-relaxed">Guidance across all major law subjects — both traditional and new codes (BNS, BNSS, BSA 2023).</p>
            <Link href="/contact" className="btn-gold mt-6">Start Your Journey <ArrowRight size={14}/></Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {subjects.map(s => (
              <div key={s} className="flex items-center gap-2 p-3 rounded-xl border border-[rgba(201,168,76,0.08)] hover:border-[rgba(201,168,76,0.25)] transition-colors">
                <CheckCircle size={13} className="text-[var(--gold)] shrink-0"/>
                <span className="text-xs text-[var(--muted)]">{s}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CoursesSection/>

      {/* Internship */}
      <section className="section">
        <div className="container px-4 mx-auto">
          <div className="card">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <p className="tag">Apply Now</p>
                <h2 className="font-display text-3xl font-bold mt-3">Internship at NyayaSutra</h2>
                <p className="muted mt-4 leading-relaxed">NyayaSutra welcomes motivated law students for practical legal exposure. Interns work on real drafting, research, court documentation, and client matters under the direct guidance of Adv. A.K. Tripathi.</p>
                <div className="space-y-3 mt-5">
                  {['Real court documentation experience','Direct mentorship by Adv. A.K. Tripathi','Certificate of completion','Exposure to litigation, drafting & research','Flexible duration (1–3 months)'].map(b => (
                    <div key={b} className="flex items-center gap-3 text-sm text-[var(--muted)]">
                      <CheckCircle size={14} className="text-[var(--gold)] shrink-0"/>{b}
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <p className="tag">Eligibility</p>
                <div className="space-y-2">
                  {['Currently enrolled in LLB / BA LLB / LLM program','Basic understanding of legal concepts','Willingness to learn and work diligently','Must be available for minimum 1 month'].map(e => (
                    <div key={e} className="flex items-center gap-3 p-3 rounded-xl bg-[rgba(201,168,76,0.04)] border border-[rgba(201,168,76,0.08)] text-sm text-[var(--muted)]">
                      <ChevronRight size={12} className="text-[var(--gold)] shrink-0"/>{e}
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-3 pt-2">
                  <Link href="/contact" className="btn-gold text-sm">Apply for Internship</Link>
                  <a href="https://wa.me/919971950371" target="_blank" className="btn-outline text-sm">WhatsApp Us</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
