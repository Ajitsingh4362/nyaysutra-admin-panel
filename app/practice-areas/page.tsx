'use client';
import Link from 'next/link';
import { ChevronRight, ArrowRight, MessageCircle } from 'lucide-react';
import { practiceData } from './data';
import FadeInSection from '@/components/motion/FadeInSection';
import { StaggerGroup, StaggerItem } from '@/components/motion/StaggerGroup';
import TiltCard from '@/components/motion/TiltCard';

const categories = {
  'Apex & High Courts': ['supreme-court','high-court','district-court'],
  'Core Litigation': ['criminal-law','civil-law','family-matrimonial','pocso-sensitive'],
  'Specialized Practice': ['corporate-commercial','arbitration-adr','constitutional-law','international-law'],
  'Digital & Public Law': ['cyber-law','rti-human-rights','consumer-tribunal','legal-research'],
};

export default function PracticeAreas() {
  return (
    <main className="overflow-x-hidden">
      {/* Hero */}
      <section className="relative py-20 px-4 overflow-hidden bg-[#0C1018]">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(201,168,76,0.07),transparent_60%)] pointer-events-none"/>
        <div className="container mx-auto relative z-10">
          <p className="tag">Comprehensive Legal Coverage</p>
          <h1 className="section-title mt-3">Our Practice Areas</h1>
          <p className="muted text-lg mt-5 max-w-3xl">
            NyayaSutra — Strategic Litigation · Legal Research · Drafting · Constitutional Practice · Corporate Advisory · Legal Intelligence. From the Supreme Court to District Courts — comprehensive legal coverage across all major practice areas.
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="section">
        <div className="container px-4 mx-auto">
          {Object.entries(categories).map(([catName, slugs]) => {
            const areas = slugs.map(s => practiceData.find(p => p.slug === s)).filter(Boolean) as typeof practiceData;
            return (
              <div key={catName} className="mb-14">
                <FadeInSection className="flex items-center gap-4 mb-6">
                  <p className="tag">{catName}</p>
                  <div className="flex-1 h-px bg-[rgba(201,168,76,0.15)]"/>
                </FadeInSection>
                <StaggerGroup className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3" stagger={0.04}>
                  {areas.map(area => {
                    const Icon = area.icon;
                    return (
                      <StaggerItem key={area.slug}>
                        <TiltCard className="h-full">
                          <Link href={`/practice-areas/${area.slug}`} className="pa-card h-full block">
                            <div className="pa-icon mb-3">
                              <Icon size={19} className="text-[var(--gold2)]"/>
                            </div>
                            <h3 className="font-semibold text-sm leading-tight">{area.title}</h3>
                            <p className="text-[var(--muted2)] text-xs mt-1.5 leading-snug line-clamp-2 hidden sm:block">{area.tagline}</p>
                            <span className="text-[var(--gold2)] text-xs mt-3 inline-flex items-center gap-0.5 font-semibold">Explore <ChevronRight size={10}/></span>
                          </Link>
                        </TiltCard>
                      </StaggerItem>
                    );
                  })}
                </StaggerGroup>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="section-sm bg-[#0C1018] px-4">
        <div className="container mx-auto text-center">
          <h2 className="font-display text-3xl font-bold">Not sure which area covers your case?</h2>
          <p className="muted mt-3">Talk to Adv. A.K. Tripathi for a free first consultation.</p>
          <div className="flex flex-wrap gap-4 justify-center mt-6">
            <a href="https://wa.me/919971950371" target="_blank" className="btn-gold"><MessageCircle size={14}/> WhatsApp Now</a>
            <Link href="/contact" className="btn-outline">Book Consultation <ArrowRight size={14}/></Link>
          </div>
        </div>
      </section>
    </main>
  );
}
