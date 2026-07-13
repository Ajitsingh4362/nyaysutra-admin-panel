import Image from 'next/image';
import Link from 'next/link';
import { BookOpen, Globe2, GraduationCap, Scale, CheckCircle, Award, ShieldCheck, Users, Star, ArrowRight, MessageCircle, Gavel, Search, FileText } from 'lucide-react';
import FadeInSection from '@/components/motion/FadeInSection';
import { StaggerGroup, StaggerItem } from '@/components/motion/StaggerGroup';
import LawCube3D from '@/components/motion/LawCube3D';
import TiltCard from '@/components/motion/TiltCard';

const pillars = [
  { icon: Scale,         title: 'Litigation Support',         desc: 'Strategic court support from Supreme Court to District Courts across India.' },
  { icon: Search,        title: 'Legal Research',             desc: 'Research-based approach to every case — deep analysis, precision drafting.' },
  { icon: FileText,      title: 'Drafting & Documentation',   desc: 'Petitions, affidavits, notices, SLPs, memorials and all legal documents.' },
  { icon: BookOpen,      title: 'Legal Education',            desc: 'Practical mentorship, internship guidance, and career support for law students.' },
  { icon: Globe2,        title: 'Legal Intelligence',         desc: 'Daily Supreme Court updates, judgment analysis, and legal awareness for all.' },
  { icon: Award,         title: 'Student Mentorship',         desc: 'One-on-one guidance for law students, interns, and young advocates.' },
];

const whyChoose = [
  { icon: Star,         title: 'Research-Based Approach',          desc: '7+ years of focused practice backed by deep legal research on every matter.' },
  { icon: ShieldCheck,  title: 'Ethical & Professional Standards',  desc: 'Zero compromise on legal ethics — always in the client\'s best interest.' },
  { icon: Globe2,       title: 'Online + Offline Support',          desc: 'WhatsApp, email, video calls and in-person meetings — your choice.' },
  { icon: GraduationCap,'title': 'Law Student Guidance',            desc: 'Dedicated to building the next generation of legal professionals.' },
  { icon: CheckCircle,  title: 'Result-Oriented Strategy',         desc: 'Every case is approached with clear strategy for the best possible outcome.' },
  { icon: Users,        title: 'Client-Centric Assistance',        desc: 'Personalized legal attention — your case is treated as our own.' },
];

const timeline = [
  { year: '2018–2023', title: 'UPSC Preparation', desc: 'Pursued UPSC Civil Services through Drishti IAS. UPSC Mains qualified candidate. Built deep understanding of constitutional law, governance, public administration, policy, and current affairs.' },
  { year: '2020+',     title: 'Legal Practice Begins', desc: 'Started active legal practice with focus on civil and criminal law, legal research, and drafting. Worked on developing a research-based approach to litigation.' },
  { year: '2023+',     title: 'Supreme Court & High Court Practice', desc: 'Expanded practice to Supreme Court and High Courts — handling constitutional matters, SLPs, writs, criminal appeals, and complex civil litigation.' },
  { year: '2024',      title: 'NyayaSutra Launched', desc: 'NyayaSutra — Legal Intelligence officially launched as a full-stack legal intelligence platform combining legal services, student mentorship, research, and legal intelligence.' },
];

const stats = [{ num:'7+', label:'Years Legal Study' },{ num:'500+', label:'Cases Handled' },{ num:'1200+', label:'Clients Served' },{ num:'98%', label:'Satisfaction Rate' }];

const professionalFocus = ['Litigation Support','Legal Research','Drafting and Documentation','Constitutional Law','Criminal Law','Civil Law','Corporate Advisory','Arbitration','International Legal Research','Law Student Mentorship'];

export default function About() {
  return (
    <main className="overflow-x-hidden">
      {/* Hero */}
      <section className="relative py-20 px-4 overflow-hidden bg-[#0C1018]">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(201,168,76,0.08),transparent_60%)] pointer-events-none"/>
        <div className="container mx-auto relative z-10">
          <p className="tag">About NyayaSutra</p>
          <h1 className="section-title mt-3">Legal Intelligence.<br/>Not Just a Law Firm.</h1>
          <p className="muted text-lg mt-5 max-w-3xl leading-relaxed">NyayaSutra — Legal Intelligence is a premium legal platform built with the vision of combining litigation support, legal research, drafting, legal education, and legal awareness into one structured ecosystem.</p>
        </div>
      </section>

      {/* About + Founder */}
      <section className="section">
        <div className="container px-4 mx-auto grid lg:grid-cols-[340px_1fr] gap-12 items-start">
          <div className="glass rounded-3xl p-3">
            <Image src="/ak-tripathi.jpeg" alt="Adv. A.K. Tripathi — Founder NyayaSutra" width={340} height={400}
              className="rounded-2xl w-full object-cover object-top" style={{maxHeight:'400px'}}/>
            <div className="p-4">
              <h3 className="font-display text-xl font-bold text-[var(--gold)]">Adv. A.K. Tripathi</h3>
              <p className="text-sm text-[var(--muted2)] mt-1">Advocate & Founder · UPSC Mains Qualified</p>
              <div className="grid grid-cols-2 gap-3 mt-4">
                {stats.map(({ num, label }) => (
                  <div key={label} className="text-center p-2 rounded-xl bg-[rgba(201,168,76,0.06)]">
                    <div className="font-display text-xl font-bold text-[var(--gold)]">{num}</div>
                    <div className="text-[10px] text-[var(--muted2)] mt-0.5">{label}</div>
                  </div>
                ))}
              </div>
              <div className="flex gap-2 mt-4">
                <a href="https://wa.me/919971950371" target="_blank" className="btn-gold flex-1 justify-center text-xs py-2"><MessageCircle size={12}/> WhatsApp</a>
                <Link href="/contact" className="btn-outline flex-1 justify-center text-xs py-2">Consult</Link>
              </div>
            </div>
          </div>

          <div>
            <div className="mb-8">
              <p className="tag">About NyayaSutra Platform</p>
              <h2 className="font-display text-3xl font-bold mt-3">The Platform</h2>
              <p className="muted mt-4 leading-relaxed">NyayaSutra — Legal Intelligence is a premium legal platform built with the vision of combining litigation support, legal research, drafting, legal education, and legal awareness into one structured ecosystem.</p>
              <p className="muted mt-3 leading-relaxed">The purpose of the platform is not only to provide legal services but also to present law in a more practical, research-based, and client-friendly form. It is designed to help people understand legal processes, navigate disputes, and access structured legal assistance with professionalism and clarity.</p>
              <p className="muted mt-3 leading-relaxed">NyayaSutra reflects a modern approach to law, where legal knowledge, court procedure, documentation, and advisory services come together under one trusted identity.</p>
            </div>

            <div>
              <p className="tag">About the Founder</p>
              <h2 className="font-display text-3xl font-bold mt-3">Adv. A.K. Tripathi</h2>
              <p className="muted mt-4 leading-relaxed">Adv. A.K. Tripathi is a law professional with a strong interest in litigation, legal drafting, research, and legal education. He pursued UPSC preparation from 2018 to 2023 through Drishti IAS and is a <strong className="text-[var(--ivory)]">UPSC Mains qualified candidate</strong>.</p>
              <p className="muted mt-3 leading-relaxed">His study journey has contributed to his understanding of constitutional law, governance, public administration, policy, legal reasoning, and current affairs. His background gives him a broader analytical perspective in legal work, especially in matters involving constitutional interpretation, litigation strategy, public law, and structured legal research.</p>
              <h3 className="font-display text-lg font-semibold text-[var(--gold)] mt-6 mb-3">Professional Focus Areas</h3>
              <div className="grid sm:grid-cols-2 gap-2">
                {professionalFocus.map(f => (
                  <div key={f} className="flex items-center gap-2 text-sm text-[var(--muted)] p-2 rounded-lg border border-[rgba(201,168,76,0.08)]">
                    <CheckCircle size={12} className="text-[var(--gold)] shrink-0"/>{f}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="section bg-[#0C1018]">
        <div className="container px-4 mx-auto">
          <div className="grid lg:grid-cols-[220px_1fr] gap-12 items-start mb-12">
            <FadeInSection direction="right" className="hidden lg:block">
              <LawCube3D/>
              <p className="text-center text-[10px] uppercase tracking-[0.3em] text-[var(--gold)] mt-4">Hover to interact</p>
            </FadeInSection>
            <FadeInSection>
              <p className="tag">Our Foundation</p>
              <h2 className="section-title mt-3">Built on Six Pillars</h2>
              <p className="muted mt-4 max-w-xl">NyayaSutra is not just a law firm — it is a legal intelligence ecosystem built on six core pillars that define our approach to law and practice.</p>
            </FadeInSection>
          </div>
          <StaggerGroup className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5" stagger={0.07}>
            {pillars.map(({ icon: Icon, title, desc }) => (
              <StaggerItem key={title}>
                <TiltCard className="h-full">
                  <div className="card h-full">
                    <div className="w-12 h-12 rounded-2xl bg-[rgba(201,168,76,0.1)] flex items-center justify-center mb-4">
                      <Icon className="text-[var(--gold)]" size={22}/>
                    </div>
                    <h3 className="font-display text-xl font-semibold text-[var(--gold)]">{title}</h3>
                    <p className="muted text-sm mt-2 leading-relaxed">{desc}</p>
                  </div>
                </TiltCard>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* Why Choose */}
      <section className="section">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-12">
            <p className="tag">Why Choose Us</p>
            <h2 className="section-title mt-3">Why NyayaSutra?</h2>
            <p className="muted mt-4 max-w-2xl mx-auto">When you need legal help, you deserve experienced, ethical, and genuinely committed legal support — backed by research and real courtroom strategy.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {whyChoose.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="card">
                <div className="w-12 h-12 rounded-2xl bg-[rgba(201,168,76,0.1)] flex items-center justify-center mb-4">
                  <Icon className="text-[var(--gold)]" size={22}/>
                </div>
                <h3 className="font-semibold">{title}</h3>
                <p className="muted text-sm mt-2 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section bg-[#0C1018]">
        <div className="container px-4 mx-auto max-w-3xl">
          <div className="text-center mb-12">
            <p className="tag">Our Journey</p>
            <h2 className="section-title mt-3">The NyayaSutra Story</h2>
          </div>
          <div className="relative pl-8 sm:pl-12">
            <div className="absolute left-3 sm:left-5 top-2 bottom-2 w-0.5 bg-gradient-to-b from-[var(--gold)] via-[rgba(201,168,76,0.4)] to-transparent"/>
            <div className="space-y-10">
              {timeline.map((item, i) => (
                <div key={i} className="relative">
                  <div className="absolute -left-5 sm:-left-7 top-1 w-4 h-4 rounded-full bg-[var(--gold)] border-4 border-[#0C1018]"/>
                  <p className="tag text-xs">{item.year}</p>
                  <h3 className="font-display text-xl font-semibold mt-1">{item.title}</h3>
                  <p className="muted text-sm mt-2 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      {/* Meet the Team teaser */}
      <section className="section-sm bg-[#0C1018] px-4">
        <div className="container mx-auto text-center">
          <p className="tag">Our People</p>
          <h2 className="font-display text-3xl font-bold mt-3">Meet the Advocate Team</h2>
          <p className="muted mt-3 max-w-xl mx-auto">Beyond the founder, NyayaSutra is built by a team of dedicated legal professionals across practice areas.</p>
          <Link href="/team" className="btn-gold mt-6"><Users size={14}/> View Full Team <ArrowRight size={14}/></Link>
        </div>
      </section>

      <section className="section-sm px-4">
        <div className="container mx-auto text-center">
          <h2 className="font-display text-3xl font-bold">Ready to work with NyayaSutra?</h2>
          <p className="muted mt-3">First consultation free — no commitment required.</p>
          <div className="flex flex-wrap gap-4 justify-center mt-6">
            <Link href="/contact" className="btn-gold">Contact Us <ArrowRight size={14}/></Link>
            <Link href="/practice-areas" className="btn-outline">Practice Areas</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
