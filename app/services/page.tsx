import Link from 'next/link';
import { ArrowRight, MessageCircle, ChevronRight, Scale, FileText, Search, GraduationCap, BookOpen, Globe, Gavel } from 'lucide-react';

const services = [
  { icon: Gavel,   title:'Litigation Support',        desc:'Active court representation and litigation strategy from Supreme Court to District Courts.',   href:'/practice-areas/supreme-court' },
  { icon: Search,  title:'Legal Research',            desc:'Deep case research, judgment analysis, statutory research, and case briefing support.',         href:'/practice-areas/legal-research' },
  { icon: FileText,title:'Drafting & Documentation',  desc:'Petitions, plaints, affidavits, notices, agreements, SLPs, memorials — all legal documents.',   href:'/practice-areas/legal-research' },
  { icon: Scale,   title:'Legal Advisory',            desc:'Strategic legal opinion, compliance advice, and client counseling for all types of matters.',    href:'/contact' },
  { icon: BookOpen,title:'Constitutional Practice',   desc:'Writ petitions, fundamental rights, PILs, and constitutional interpretation matters.',          href:'/practice-areas/constitutional-law' },
  { icon: Globe,   title:'Corporate Advisory',        desc:'Business agreements, startup legal support, compliance, contracts, and commercial disputes.',    href:'/practice-areas/corporate-commercial' },
  { icon: GraduationCap, title:'Student Mentorship',  desc:'Internship guidance, moot court support, bar act notes, judgment analysis, career counseling.',  href:'/students' },
  { icon: Search,  title:'RTI & Human Rights',        desc:'RTI applications, human rights complaints, public grievance, and administrative justice.',        href:'/practice-areas/rti-human-rights' },
];

export default function Services() {
  return (
    <main className="overflow-x-hidden">
      <section className="relative py-20 px-4 overflow-hidden bg-[#0C1018]">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(201,168,76,0.07),transparent_60%)] pointer-events-none"/>
        <div className="container mx-auto relative z-10">
          <p className="tag">What We Do</p>
          <h1 className="section-title mt-3">Legal Services</h1>
          <p className="muted text-lg mt-5 max-w-3xl">Strategic Litigation · Legal Research · Drafting · Constitutional Practice · Corporate Advisory · Legal Intelligence</p>
        </div>
      </section>
      <section className="section">
        <div className="container px-4 mx-auto grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {services.map(({ icon: Icon, title, desc, href }) => (
            <Link key={title} href={href} className="card-link">
              <div className="w-12 h-12 rounded-2xl bg-[rgba(201,168,76,0.1)] flex items-center justify-center mb-4">
                <Icon size={22} className="text-[var(--gold)]"/>
              </div>
              <h3 className="font-display text-lg font-semibold text-[var(--gold)]">{title}</h3>
              <p className="text-[var(--muted2)] text-sm mt-2 leading-relaxed">{desc}</p>
              <span className="text-[var(--gold)] text-xs mt-4 inline-flex items-center gap-0.5 font-semibold">Explore <ChevronRight size={10}/></span>
            </Link>
          ))}
        </div>
      </section>
      <section className="section-sm bg-[#0C1018] px-4">
        <div className="container mx-auto text-center">
          <h2 className="font-display text-3xl font-bold">Ready to get started?</h2>
          <p className="muted mt-3">First consultation is free. Contact us via WhatsApp or fill the contact form.</p>
          <div className="flex flex-wrap gap-3 justify-center mt-6">
            <a href="https://wa.me/919971950371" target="_blank" className="btn-gold"><MessageCircle size={14}/> WhatsApp Now</a>
            <Link href="/contact" className="btn-outline">Contact Us <ArrowRight size={14}/></Link>
          </div>
        </div>
      </section>
    </main>
  );
}
