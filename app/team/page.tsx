'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Users, Mail, Phone, Linkedin, Award, Scale, X, MessageCircle,
  RefreshCw, ChevronRight, ArrowRight, BadgeCheck, Briefcase
} from 'lucide-react';

interface TeamMember {
  _id: string; name: string; designation: string; specialization: string;
  bio: string; qualification: string; experience: string; photo: string;
  email: string; phone: string; linkedin: string; barCouncilId: string;
  featured: boolean;
}

export default function TeamPage() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<TeamMember | null>(null);

  useEffect(() => {
    fetch('/api/team')
      .then(r => r.json())
      .then(d => setMembers(Array.isArray(d) ? d : []))
      .catch(() => setMembers([]))
      .finally(() => setLoading(false));
  }, []);

  const featured = members.filter(m => m.featured);
  const regular = members.filter(m => !m.featured);

  return (
    <main className="overflow-x-hidden">
      {/* Hero */}
      <section className="relative py-20 px-4 overflow-hidden bg-[#0C1018]">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(201,168,76,0.07),transparent_60%)] pointer-events-none"/>
        <div className="container mx-auto relative z-10">
          <p className="tag">Our People</p>
          <h1 className="section-title mt-3">Advocate Team</h1>
          <p className="muted text-lg mt-5 max-w-3xl">
            Meet the legal professionals behind NyayaSutra — a team committed to research-based litigation,
            ethical practice, and client-focused legal support across courts in India.
          </p>
        </div>
      </section>

      {loading ? (
        <div className="section text-center">
          <RefreshCw size={24} className="animate-spin inline text-[var(--muted2)]"/>
        </div>
      ) : members.length === 0 ? (
        <section className="section">
          <div className="container mx-auto px-4 text-center py-10">
            <Users size={40} className="text-[var(--muted2)] mx-auto mb-4 opacity-30"/>
            <p className="muted">Team profiles will appear here shortly.</p>
          </div>
        </section>
      ) : (
        <>
          {/* Featured Members (Founder, Senior Partners) */}
          {featured.length > 0 && (
            <section className="section">
              <div className="container px-4 mx-auto">
                <div className="flex items-center gap-4 mb-8">
                  <p className="tag">Leadership</p>
                  <div className="flex-1 h-px bg-[rgba(201,168,76,0.15)]"/>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  {featured.map(m => (
                    <div key={m._id} className="card flex flex-col sm:flex-row gap-5">
                      <div className="w-full sm:w-36 h-44 sm:h-auto rounded-2xl overflow-hidden bg-[#101520] shrink-0 border border-[rgba(201,168,76,0.18)]">
                        {m.photo
                          ? <img src={m.photo} alt={m.name} className="w-full h-full object-cover object-top"/>
                          : <div className="w-full h-full flex items-center justify-center"><Users size={28} className="text-[var(--muted2)] opacity-40"/></div>}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <BadgeCheck size={14} className="text-[var(--gold)] shrink-0"/>
                          <h3 className="font-display text-xl font-bold">{m.name}</h3>
                        </div>
                        <p className="text-[var(--gold)] text-sm font-semibold mt-0.5">{m.designation}</p>
                        {m.specialization && <p className="text-[var(--muted2)] text-xs mt-1">{m.specialization}</p>}
                        {m.bio && <p className="text-[var(--muted)] text-sm mt-3 leading-relaxed line-clamp-3">{m.bio}</p>}
                        <button onClick={() => setSelected(m)} className="text-[var(--gold)] text-xs font-semibold inline-flex items-center gap-1 mt-4">
                          View Full Profile <ChevronRight size={11}/>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Regular Team Grid */}
          {regular.length > 0 && (
            <section className={`section ${featured.length > 0 ? 'bg-[#0C1018]' : ''}`}>
              <div className="container px-4 mx-auto">
                <div className="flex items-center gap-4 mb-8">
                  <p className="tag">Our Team</p>
                  <div className="flex-1 h-px bg-[rgba(201,168,76,0.15)]"/>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                  {regular.map(m => (
                    <button key={m._id} onClick={() => setSelected(m)} className="card-link text-left">
                      <div className="aspect-[4/5] rounded-xl overflow-hidden bg-[#101520] mb-4 border border-[rgba(201,168,76,0.12)]">
                        {m.photo
                          ? <img src={m.photo} alt={m.name} className="w-full h-full object-cover object-top"/>
                          : <div className="w-full h-full flex items-center justify-center"><Users size={28} className="text-[var(--muted2)] opacity-40"/></div>}
                      </div>
                      <h3 className="font-display text-lg font-semibold leading-tight">{m.name}</h3>
                      <p className="text-[var(--gold)] text-xs font-semibold mt-1">{m.designation}</p>
                      {m.specialization && <p className="text-[var(--muted2)] text-xs mt-1.5 line-clamp-2">{m.specialization}</p>}
                      <span className="text-[var(--gold)] text-xs mt-3 inline-flex items-center gap-0.5 font-semibold">View Profile <ChevronRight size={10}/></span>
                    </button>
                  ))}
                </div>
              </div>
            </section>
          )}
        </>
      )}

      {/* CTA */}
      <section className="section-sm px-4">
        <div className="container mx-auto text-center">
          <h2 className="font-display text-2xl sm:text-3xl font-bold">Want to consult our team?</h2>
          <p className="muted mt-3">First consultation is free — reach out today.</p>
          <div className="flex flex-wrap gap-3 justify-center mt-6">
            <a href="https://wa.me/919971950371" target="_blank" className="btn-gold"><MessageCircle size={14}/> WhatsApp Now</a>
            <Link href="/contact" className="btn-outline">Book Consultation <ArrowRight size={14}/></Link>
          </div>
        </div>
      </section>

      {/* Profile Modal */}
      {selected && (
        <div className="fixed inset-0 z-[300] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <div className="glass-dark rounded-3xl max-w-lg w-full max-h-[85vh] overflow-y-auto relative" onClick={e => e.stopPropagation()}>
            <button onClick={() => setSelected(null)} className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[rgba(255,255,255,0.08)] flex items-center justify-center text-white hover:bg-[rgba(255,255,255,0.15)] transition-colors z-10">
              <X size={16}/>
            </button>
            <div className="p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row gap-5 items-start">
                <div className="w-28 h-28 rounded-2xl overflow-hidden bg-[#101520] shrink-0 border-2 border-[rgba(201,168,76,0.25)] mx-auto sm:mx-0">
                  {selected.photo
                    ? <img src={selected.photo} alt={selected.name} className="w-full h-full object-cover object-top"/>
                    : <div className="w-full h-full flex items-center justify-center"><Users size={32} className="text-[var(--muted2)] opacity-40"/></div>}
                </div>
                <div className="text-center sm:text-left">
                  <h2 className="font-display text-2xl font-bold">{selected.name}</h2>
                  <p className="text-[var(--gold)] font-semibold text-sm mt-1">{selected.designation}</p>
                  {selected.experience && (
                    <p className="text-[var(--muted2)] text-xs mt-1 flex items-center justify-center sm:justify-start gap-1">
                      <Briefcase size={11}/> {selected.experience} Experience
                    </p>
                  )}
                </div>
              </div>

              {selected.specialization && (
                <div className="mt-5">
                  <p className="text-[10px] text-[var(--gold)] uppercase tracking-wider font-bold mb-1.5">Specialization</p>
                  <p className="text-sm text-[var(--muted)]">{selected.specialization}</p>
                </div>
              )}

              {selected.qualification && (
                <div className="mt-4">
                  <p className="text-[10px] text-[var(--gold)] uppercase tracking-wider font-bold mb-1.5">Qualification</p>
                  <p className="text-sm text-[var(--muted)]">{selected.qualification}</p>
                </div>
              )}

              {selected.bio && (
                <div className="mt-4">
                  <p className="text-[10px] text-[var(--gold)] uppercase tracking-wider font-bold mb-1.5">About</p>
                  <p className="text-sm text-[var(--muted)] leading-relaxed">{selected.bio}</p>
                </div>
              )}

              {selected.barCouncilId && (
                <div className="mt-4 flex items-center gap-2 text-xs text-[var(--muted2)]">
                  <Scale size={12} className="text-[var(--gold)]"/> Bar Council ID: {selected.barCouncilId}
                </div>
              )}

              {/* Contact Links */}
              <div className="flex flex-wrap gap-2 mt-6 pt-5 border-t border-[rgba(201,168,76,0.12)]">
                {selected.email && (
                  <a href={`mailto:${selected.email}`} className="btn-outline text-xs py-2 px-3"><Mail size={12}/> Email</a>
                )}
                {selected.phone && (
                  <a href={`tel:${selected.phone}`} className="btn-outline text-xs py-2 px-3"><Phone size={12}/> Call</a>
                )}
                {selected.linkedin && (
                  <a href={selected.linkedin} target="_blank" className="btn-outline text-xs py-2 px-3"><Linkedin size={12}/> LinkedIn</a>
                )}
                <a href="https://wa.me/919971950371" target="_blank" className="btn-gold text-xs py-2 px-3 ml-auto">
                  <MessageCircle size={12}/> WhatsApp Consult
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
