'use client';
import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ChevronRight, ChevronDown, ChevronUp, MessageCircle } from 'lucide-react';
import { practiceData, SubArea } from '../data';
import FadeInSection from '@/components/motion/FadeInSection';
import { StaggerGroup, StaggerItem } from '@/components/motion/StaggerGroup';
import { motion, AnimatePresence } from 'framer-motion';

export default function PracticeDetail({ params }: { params: { slug: string } }) {
  const area = practiceData.find(a => a.slug === params.slug);
  const [openSub, setOpenSub] = useState<number | null>(null);

  if (!area) return (
    <main className="section overflow-x-hidden">
      <div className="container mx-auto px-4 text-center">
        <h1 className="section-title">Practice Area Not Found</h1>
        <Link href="/practice-areas" className="btn-gold mt-6">Back to Practice Areas</Link>
      </div>
    </main>
  );

  const Icon = area.icon;

  return (
    <main className="overflow-x-hidden">
      {/* Hero */}
      <section className="relative py-16 px-4 bg-[#0C1018] overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(201,168,76,0.07),transparent_60%)] pointer-events-none"/>
        <div className="container mx-auto relative z-10">
          <Link href="/practice-areas" className="inline-flex items-center gap-2 text-sm text-[var(--muted2)] hover:text-[var(--gold)] mb-6 transition-colors">
            <ArrowLeft size={14}/> All Practice Areas
          </Link>
          <div className="flex items-start gap-4 flex-wrap">
            <div className="w-14 h-14 rounded-2xl bg-[rgba(201,168,76,0.12)] flex items-center justify-center shrink-0">
              <Icon size={26} className="text-[var(--gold)]"/>
            </div>
            <div>
              <p className="tag">{area.category}</p>
              <h1 className="section-title mt-2">{area.title}</h1>
              <p className="muted text-base sm:text-lg mt-3 max-w-3xl leading-relaxed">{area.tagline}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section">
        <div className="container px-4 mx-auto grid lg:grid-cols-[1fr_300px] gap-10">
          <div>
            <FadeInSection>
              <p className="muted leading-relaxed text-base">{area.description}</p>
            </FadeInSection>

            {/* Clickable Sub-Areas */}
            <div className="mt-10">
              <h2 className="font-display text-2xl font-bold text-[var(--gold)] mb-5">What We Handle</h2>
              <p className="muted text-sm mb-5">Click any item below to expand detailed information.</p>
              <div className="space-y-2">
                {(area.subAreas as SubArea[]).map((sub, i) => (
                  <div key={i} className="rounded-xl border border-[rgba(201,168,76,0.12)] overflow-hidden bg-[rgba(201,168,76,0.02)] hover:border-[rgba(201,168,76,0.3)] transition-colors">
                    <button
                      onClick={() => setOpenSub(openSub === i ? null : i)}
                      className="w-full flex items-center justify-between p-4 text-left gap-3"
                    >
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <ChevronRight size={14} className={`text-[var(--gold)] shrink-0 transition-transform ${openSub === i ? 'rotate-90' : ''}`}/>
                        <span className="font-semibold text-sm sm:text-base">{sub.name}</span>
                      </div>
                      {openSub === i
                        ? <ChevronUp size={16} className="text-[var(--gold)] shrink-0"/>
                        : <ChevronDown size={16} className="text-[var(--muted2)] shrink-0"/>}
                    </button>
                    <AnimatePresence initial={false}>
                      {openSub === i && (
                        <motion.div
                          key="content"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.28, ease: [0.25, 0.4, 0.25, 1] }}
                          style={{ overflow: 'hidden' }}
                        >
                          <div className="px-5 pb-5 pt-1 border-t border-[rgba(201,168,76,0.1)]">
                            <p className="text-[var(--muted)] text-sm leading-relaxed">{sub.content}</p>
                            <div className="flex gap-3 mt-4">
                              <a href="https://wa.me/919971950371" target="_blank" className="btn-gold text-xs py-2 px-4">
                                <MessageCircle size={12}/> Consult Now
                              </a>
                              <Link href="/contact" className="btn-outline text-xs py-2 px-4">Book Appointment</Link>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>

            {/* Process */}
            {area.process && (
              <div className="mt-10">
                <h2 className="font-display text-2xl font-bold text-[var(--gold)] mb-5">Our Approach</h2>
                <StaggerGroup className="space-y-3" stagger={0.08}>
                  {area.process.map((step, i) => (
                    <StaggerItem key={i}>
                      <div className="flex gap-4 p-4 rounded-xl border border-[rgba(201,168,76,0.12)] bg-[rgba(201,168,76,0.03)]">
                        <div className="w-8 h-8 rounded-full bg-[rgba(201,168,76,0.15)] flex items-center justify-center text-[var(--gold)] font-bold text-sm shrink-0">{i + 1}</div>
                        <div>
                          <h4 className="font-semibold text-sm">{step.title}</h4>
                          <p className="text-[var(--muted2)] text-xs mt-1">{step.desc}</p>
                        </div>
                      </div>
                    </StaggerItem>
                  ))}
                </StaggerGroup>
              </div>
            )}

            {/* Courts */}
            <div className="mt-10">
              <h2 className="font-display text-2xl font-bold text-[var(--gold)] mb-4">Courts We Practice In</h2>
              <div className="flex flex-wrap gap-2">
                {area.courts.map(c => (
                  <span key={c} className="px-3 py-1.5 rounded-xl text-xs border border-[rgba(201,168,76,0.2)] text-[var(--muted)]">{c}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside>
            <div className="card sticky top-24">
              <Icon className="text-[var(--gold)]" size={32}/>
              <h3 className="font-display text-xl font-semibold mt-4">{area.title}</h3>
              <p className="text-[var(--muted2)] text-sm mt-2">{area.tagline}</p>
              <div className="mt-5 space-y-3">
                <a href="https://wa.me/919971950371" target="_blank" className="btn-gold w-full justify-center text-sm">
                  <MessageCircle size={14}/> WhatsApp Consult
                </a>
                <Link href="/contact" className="btn-outline w-full justify-center text-sm">Book Appointment</Link>
              </div>
              <div className="mt-5 pt-4 border-t border-[rgba(201,168,76,0.1)]">
                <p className="text-xs text-[var(--gold)] font-semibold mb-3">Related Areas</p>
                <div className="space-y-2">
                  {area.related.map(r => (
                    <p key={r} className="text-xs text-[var(--muted2)] flex items-center gap-2">
                      <ChevronRight size={10} className="text-[var(--gold)]"/>{r}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
