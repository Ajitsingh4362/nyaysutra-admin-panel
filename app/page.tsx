import Link from 'next/link';
import Image from 'next/image';
import VisitorPopup from '@/components/VisitorPopup';
import FadeInSection from '@/components/motion/FadeInSection';
import { StaggerGroup, StaggerItem } from '@/components/motion/StaggerGroup';
import TiltCard from '@/components/motion/TiltCard';
import Scales3D from '@/components/motion/Scales3D';
import GoldParticles from '@/components/motion/GoldParticles';
import AnimatedCounter from '@/components/motion/AnimatedCounter';
import {
  ArrowRight, ChevronRight, CheckCircle, Scale, Shield, HeartHandshake,
  FileText, Search, Building2, Gavel, Users, Briefcase, Globe, BookOpen,
  MessageCircle, Youtube, Instagram, Facebook, Linkedin, Twitter,
  GraduationCap, Award
} from 'lucide-react';

const stats = [
  { num:'7+', label:'Years Experience' },
  { num:'500+', label:'Cases Handled' },
  { num:'1200+', label:'Clients Served' },
  { num:'98%', label:'Client Satisfaction' },
];

const practiceAreas = [
  { icon:Gavel,        title:'Supreme Court',         slug:'supreme-court',       desc:'SLP, Writ Petitions, Article 32, Appeals & Advisory' },
  { icon:Building2,    title:'High Courts',           slug:'high-court',          desc:'Allahabad, Delhi, Karnataka, Calcutta & 6 more' },
  { icon:Scale,        title:'District Courts',       slug:'district-court',      desc:'Civil, Criminal, Family, Recovery & Property Matters' },
  { icon:Shield,       title:'Criminal Law',          slug:'criminal-law',        desc:'FIR, Bail, Trial Defence, Quashing, Appeals' },
  { icon:FileText,     title:'Civil Litigation',      slug:'civil-law',           desc:'Property, Recovery, Injunctions, Partition, Contracts' },
  { icon:HeartHandshake,title:'Family & Matrimonial', slug:'family-matrimonial',  desc:'Divorce, 498A, Custody, Maintenance, DV Act' },
  { icon:Briefcase,    title:'Corporate & Commercial',slug:'corporate-commercial',desc:'Agreements, Startups, Compliance, Advisory' },
  { icon:Globe,        title:'Constitutional Law',    slug:'constitutional-law',  desc:'Art 14, 19, 21, Writs, Public Law, PIL' },
  { icon:Search,       title:'Arbitration & ADR',     slug:'arbitration-adr',     desc:'Mediation, Commercial Disputes, Settlement' },
  { icon:BookOpen,     title:'Legal Research',        slug:'legal-research',      desc:'Drafting, Memorial, Notices, SLP, Case Briefing' },
  { icon:Users,        title:'RTI & Human Rights',    slug:'rti-human-rights',    desc:'RTI Drafting, NHRC, Public Grievances' },
  { icon:Globe,        title:'Cyber Law',             slug:'cyber-law',           desc:'Cyber Crime, Digital Fraud, Privacy Issues' },
];

const whyChoose = [
  'Research-based legal approach',
  'Professional litigation support',
  'Supreme Court & High Court expertise',
  'Strong drafting & documentation support',
  'Legal intelligence-based framework',
  'Law student & internship guidance',
  'Corporate & commercial legal support',
  'Constitutional & public law awareness',
  'Modern digital legal presence',
  'Client-centric professional assistance',
];

const courts = [
  'Supreme Court of India','Allahabad High Court','Delhi High Court',
  'Karnataka High Court','Calcutta High Court','Madhya Pradesh High Court',
  'Madras High Court','Chhattisgarh High Court','Kerala High Court','All District Courts',
];

async function getLatestBlogs() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/blogs`, { cache: 'no-store' });
    if (!res.ok) throw new Error('fetch failed');
    const blogs = await res.json();
    return Array.isArray(blogs) ? blogs.slice(0,3) : [];
  } catch {
    return [
      { _id:'1', title:'Understanding Your Fundamental Rights Under the Indian Constitution', category:'Constitutional Law', excerpt:'A guide for citizens to understand their rights before taking any legal action.', readTime:'5 min read', publishedAt:'2026-05-20T00:00:00.000Z', slug:'fundamental-rights-india' },
      { _id:'2', title:'Supreme Court Weekly Digest — Landmark Judgments Explained', category:'Daily Legal Intelligence', excerpt:'Key Supreme Court judgments explained in simple language.', readTime:'7 min read', publishedAt:'2026-06-01T00:00:00.000Z', slug:'sc-weekly-digest' },
      { _id:'3', title:'Bail Rights, FIR Procedure and Criminal Law Basics', category:'Criminal Law', excerpt:'Essential knowledge about FIR filing, bail procedures and rights of the accused.', readTime:'6 min read', publishedAt:'2026-05-28T00:00:00.000Z', slug:'bail-fir-guide' },
    ];
  }
}

export default async function Home() {
  const blogs = await getLatestBlogs();

  return (
    <main className="overflow-x-hidden">
      <VisitorPopup />

      {/* ── HERO ── */}
      {/* OLD: <section className="relative min-h-[92vh] flex items-center overflow-hidden"> */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#07090F] via-[#0C1018] to-[#07090F]"/>
        <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-[radial-gradient(circle,rgba(201,168,76,0.1),transparent_65%)] pointer-events-none"/>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(201,168,76,0.05),transparent_60%)] pointer-events-none"/>
        <GoldParticles count={22}/>

        {/* OLD: <div className="container px-4 py-20 lg:py-28 grid lg:grid-cols-2 gap-12 items-center relative z-10 w-full mx-auto"> */}
        <div className="container px-4 py-10 lg:py-14 grid lg:grid-cols-2 gap-12 items-center relative z-10 w-full mx-auto">
          <div className="animate-fadeup">
            <p className="tag mb-4">NyayaSutra — Legal Intelligence</p>
            <h1 className="section-title leading-tight">
              Strategic Litigation<br/>
              <span className="shimmer-gold">Legal Research</span><br/>
              & Court Support
            </h1>
            <p className="muted text-base sm:text-lg mt-6 max-w-xl leading-relaxed">
              Supreme Court · High Courts · District Courts · Arbitration · International & Corporate Legal Support.
              A modern legal intelligence and litigation support platform for professional legal assistance, strategic research, drafting, and advisory across India.
            </p>
            <div className="flex flex-wrap gap-3 mt-8">
              <Link href="/contact" className="btn-gold"><Scale size={15}/> Book Consultation</Link>
              <a href="https://wa.me/919971950371" target="_blank" className="btn-outline"><MessageCircle size={15}/> WhatsApp</a>
              <Link href="/practice-areas" className="btn-outline">Practice Areas <ArrowRight size={14}/></Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-3 mt-12 pt-8 border-t border-[rgba(201,168,76,0.12)]">
              {stats.map(({ num, label }) => (
                <div key={label}>
                  <div className="font-display text-xl sm:text-2xl font-bold text-[var(--gold)]"><AnimatedCounter value={num}/></div>
                  <div className="text-[10px] sm:text-xs text-[var(--muted2)] mt-0.5">{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Founder image */}
          <div className="flex justify-center animate-fadeup-2">
            <div className="relative w-full max-w-[340px]">
              <div className="absolute -inset-4 bg-[radial-gradient(circle,rgba(201,168,76,0.12),transparent_70%)] rounded-3xl"/>
              <div className="glass rounded-[2rem] p-3 relative">
                <Image
                  src="/ak-tripathi.jpeg"
                  alt="Adv. A.K. Tripathi — Founder NyayaSutra"
                  width={340}
                  height={400}
                  className="rounded-[1.5rem] w-full object-cover object-top"
                  style={{ maxHeight: '400px' }}
                  priority
                />
                <div className="absolute -bottom-4 left-4 glass rounded-2xl px-4 py-2.5">
                  <p className="text-xs text-[var(--gold)] font-semibold">Adv. A.K. Tripathi</p>
                  <p className="text-[10px] text-[var(--muted2)]">Advocate & Founder · UPSC Mains Qualified</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ABOUT STRIP ── */}
      {/* OLD (dark): <section className="section bg-[#0C1018] border-y border-[rgba(201,168,76,0.1)]"> */}
      <section className="section section-light border-y border-[rgba(139,107,42,0.15)]">
        <div className="container px-4 mx-auto grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <p className="tag">About NyayaSutra</p>
            <h2 className="font-display text-4xl font-bold mt-3">Legal Intelligence.<br/>Not Just a Law Firm.</h2>
            <p className="muted mt-4 leading-relaxed">
              NyayaSutra is a modern legal intelligence platform built to combine litigation support, legal research, drafting, legal education, and legal awareness into one structured ecosystem. Founded by <strong className="text-[var(--ivory)]">Adv. A.K. Tripathi</strong> — Advocate & UPSC Mains Qualified candidate — who brings governance, constitutional law, and analytical depth to every case.
            </p>
            <Link href="/about" className="btn-outline mt-6">Know More <ArrowRight size={14}/></Link>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {whyChoose.slice(0,6).map(w => (
              <div key={w} className="flex items-start gap-2.5 p-3 rounded-xl bg-[rgba(201,168,76,0.04)] border border-[rgba(201,168,76,0.08)]">
                <CheckCircle className="text-[var(--gold)] shrink-0 mt-0.5" size={14}/>
                <span className="text-xs text-[var(--muted)]">{w}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRACTICE AREAS ── */}
      <section className="section">
        <div className="container px-4 mx-auto">
          <FadeInSection className="text-center mb-12">
            <p className="tag">What We Handle</p>
            <h2 className="section-title mt-3">Practice Areas</h2>
            <p className="muted mt-4 max-w-2xl mx-auto">From the Supreme Court to District Courts — comprehensive legal coverage across all major practice areas.</p>
          </FadeInSection>
          <StaggerGroup className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4" stagger={0.05}>
            {practiceAreas.map(({ icon: Icon, title, slug, desc }) => (
              <StaggerItem key={slug}>
                <TiltCard className="group h-full">
                  {/* OLD: <Link href={`/practice-areas/${slug}`} className="card-link h-full block"> */}
                  <Link href={`/practice-areas/${slug}`} className="pa-card h-full block">
                    {/* OLD icon wrap: <div className="w-10 h-10 rounded-xl bg-[rgba(201,168,76,0.1)] flex items-center justify-center mb-3"> */}
                    <div className="pa-icon mb-3">
                      <Icon size={19} className="text-[var(--gold2)]"/>
                    </div>
                    <h3 className="font-semibold text-sm leading-tight">{title}</h3>
                    <p className="text-[var(--muted2)] text-xs mt-1.5 leading-snug line-clamp-2 hidden sm:block">{desc}</p>
                    <span className="text-[var(--gold2)] text-xs mt-3 inline-flex items-center gap-0.5 font-semibold">Explore <ChevronRight size={10}/></span>
                  </Link>
                </TiltCard>
              </StaggerItem>
            ))}
          </StaggerGroup>
          <div className="text-center mt-8">
            <Link href="/practice-areas" className="btn-gold">All Practice Areas <ArrowRight size={15}/></Link>
          </div>
        </div>
      </section>

      {/* ── COURTS COVERAGE ── */}
      {/* OLD (dark navy): <section className="section bg-[#0C1018]"> */}
      <section className="section court-section">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-10">
            <p className="tag">Court Coverage</p>
            <h2 className="section-title mt-3">Courts We Work With</h2>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {courts.map(c => (
              <Link key={c} href="/courts" className="px-4 py-2.5 rounded-xl border border-[rgba(201,168,76,0.18)] text-sm text-[var(--muted)] hover:border-[var(--gold)] hover:text-[var(--gold)] transition-all">
                {c}
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/courts" className="btn-outline">View All Courts & Jurisdictions <ChevronRight size={14}/></Link>
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE (LIGHT SECTION) ── */}
      <section className="section section-light">
        <div className="container px-4 mx-auto">
          <div className="grid lg:grid-cols-[340px_1fr] gap-10 lg:gap-14 items-center">
            <FadeInSection direction="right" className="order-2 lg:order-1">
              <Scales3D/>
              <p className="text-center text-[10px] uppercase tracking-[0.3em] mt-2" style={{color:'var(--gold)'}}>Justice, Balanced</p>
            </FadeInSection>
            <div className="order-1 lg:order-2">
              <FadeInSection>
                <p className="tag">Why Choose Us</p>
                <h2 className="section-title mt-3">Why NyayaSutra?</h2>
                <p className="muted mt-4 leading-relaxed max-w-xl">When you need legal help, you deserve experienced, ethical, and genuinely committed legal support — backed by research and real courtroom strategy.</p>
              </FadeInSection>
              <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6" stagger={0.05}>
                {whyChoose.map(w => (
                  <StaggerItem key={w}>
                    <div className="flex items-start gap-3 p-3 rounded-xl" style={{background:'rgba(139,107,42,0.05)', border:'1px solid var(--bdr2)'}}>
                      <CheckCircle className="text-[var(--gold)] shrink-0 mt-0.5" size={14}/>
                      <span className="text-sm text-[var(--muted)]">{w}</span>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerGroup>
            </div>
          </div>
        </div>
      </section>

      {/* ── STUDENT SECTION ── */}
      <section className="section bg-[#0C1018]">
        <div className="container px-4 mx-auto grid lg:grid-cols-2 gap-6">
          <div className="card">
            <GraduationCap className="text-[var(--gold)]" size={42}/>
            <h2 className="font-display text-3xl font-bold mt-4">Law Student Section</h2>
            <p className="muted mt-3 leading-relaxed">Internship opportunities, moot court guidance, bare act notes, judgment analysis, legal drafting practice, research publication support, and career guidance.</p>
            <Link href="/students" className="btn-gold mt-6">Explore Student Programs</Link>
          </div>
          <div className="card">
            <Award className="text-[var(--gold)]" size={42}/>
            <h2 className="font-display text-3xl font-bold mt-4">Gallery & Media</h2>
            <p className="muted mt-3 leading-relaxed">Court visits, professional engagements, legal conferences, seminars, internship sessions, legal awareness programs and professional journey highlights.</p>
            <Link href="/gallery" className="btn-outline mt-6">View Gallery <ArrowRight size={14}/></Link>
          </div>
        </div>
      </section>

      {/* ── MEDIA & SOCIAL ── */}
      <section className="section">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-10">
            <p className="tag">Media, Updates & Connect</p>
            <h2 className="section-title mt-3">Follow NyayaSutra</h2>
            <p className="muted mt-4 max-w-2xl mx-auto">Follow NyayaSutra on our social media platforms for legal awareness videos, court updates, case discussions, research-based legal insights, and professional announcements.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
            {/* Video placeholder */}
            <div className="card flex flex-col items-center justify-center text-center py-8 col-span-full lg:col-span-1">
              <div className="w-16 h-16 rounded-2xl bg-[rgba(201,168,76,0.1)] flex items-center justify-center mb-4">
                <Youtube size={28} className="text-red-500"/>
              </div>
              <h3 className="font-display text-xl font-semibold">YouTube Channel</h3>
              <p className="muted text-sm mt-2">Legal awareness videos, court journey clips & founder intro</p>
              <a href="https://youtube.com" target="_blank" className="btn-outline mt-4 text-sm">Subscribe</a>
            </div>
            {/* Social */}
            <div className="card">
              <h3 className="font-display text-xl font-semibold mb-5">Connect With Us</h3>
              <div className="space-y-3">
                {[
                  { icon: Facebook,  label:'Facebook',  href:'https://www.facebook.com/share/1CjgsCYHCE/', color:'text-blue-500' },
                  { icon: Instagram, label:'Instagram', href:'https://www.instagram.com/advtripathi334/', color:'text-pink-500' },
                  { icon: Linkedin,  label:'LinkedIn',  href:'https://www.linkedin.com/in/akhileshkumartripathi', color:'text-blue-400' },
                  { icon: Youtube,   label:'YouTube',   href:'https://youtube.com', color:'text-red-500' },
                  { icon: Twitter,   label:'X / Twitter', href:'https://twitter.com', color:'text-sky-400' },
                  { icon: MessageCircle, label:'WhatsApp', href:'https://wa.me/919971950371', color:'text-green-500' },
                ].map(({ icon: Icon, label, href, color }) => (
                  <a key={label} href={href} target="_blank"
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-[rgba(201,168,76,0.06)] border border-transparent hover:border-[rgba(201,168,76,0.15)] transition-all">
                    <Icon size={18} className={color}/>
                    <span className="text-sm text-[var(--muted)]">{label}</span>
                    <ChevronRight size={12} className="text-[var(--muted2)] ml-auto"/>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── LATEST BLOG ── */}
      {/* OLD (dark): <section className="section bg-[#0C1018]"> */}
      <section className="section section-light">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <p className="tag">Legal Intelligence</p>
              <h2 className="section-title mt-2">Latest Articles</h2>
            </div>
            <Link href="/blog" className="btn-outline shrink-0 text-sm">All Articles <ArrowRight size={13}/></Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {blogs.map((blog: any) => (
              <Link key={blog._id || blog.id} href={`/blog/${blog.slug}`} className="card-link group">
                <span className="text-[10px] font-bold text-[var(--gold)] uppercase tracking-widest bg-[rgba(201,168,76,0.1)] px-3 py-1 rounded-full">{blog.category}</span>
                <h3 className="font-display text-lg font-semibold leading-snug mt-3 group-hover:text-[var(--gold)] transition-colors line-clamp-2">{blog.title}</h3>
                <p className="text-[var(--muted2)] text-sm mt-2 leading-relaxed line-clamp-3">{blog.excerpt}</p>
                <div className="flex items-center justify-between mt-4 pt-3 border-t border-[rgba(201,168,76,0.1)]">
                  <span className="text-xs text-[var(--muted2)]">{blog.readTime}</span>
                  <span className="text-[var(--gold)] text-xs font-semibold inline-flex items-center gap-1">Read <ChevronRight size={11}/></span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#C9A84C] to-[#8B6B2A]"/>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.12),transparent_50%)]"/>
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-6 relative z-10 px-4">
          <div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#07090F]">Need Legal Assistance?</h2>
            <p className="text-[#07090F]/70 mt-1 text-sm">First consultation free — connect for legal help, drafting, research or student guidance.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href="https://wa.me/919971950371" target="_blank"
              className="bg-[#07090F] text-white rounded-full px-5 py-3 font-bold inline-flex gap-2 hover:bg-[#0C1018] transition text-sm items-center">
              <MessageCircle size={15}/> WhatsApp Now
            </a>
            <Link href="/contact" className="bg-white/20 text-[#07090F] rounded-full px-5 py-3 font-bold inline-flex gap-2 hover:bg-white/30 transition text-sm">
              Book Consultation
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
