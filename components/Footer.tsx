import Image from 'next/image';
import Link from 'next/link';
import { Facebook, Instagram, Linkedin, Youtube, Twitter, Mail, MapPin, Phone, MessageCircle } from 'lucide-react';

const quickLinks = [['/','Home'],['/about','About Us'],['/practice-areas','Practice Areas'],['/courts','Courts & Jurisdiction'],['/students','Students & Internship'],['/gallery','Gallery'],['/blog','Blog'],['/contact','Contact']];
const practiceLinks = ['Supreme Court','High Courts','Criminal Law','Civil Litigation','Family Law','Constitutional Law','Corporate Law','Arbitration & ADR','RTI & Human Rights','Cyber Law'];
const socials = [
  { icon: Facebook,  href:'https://www.facebook.com/share/1CjgsCYHCE/', label:'Facebook',  color:'hover:text-blue-400' },
  { icon: Instagram, href:'https://www.instagram.com/advtripathi334/', label:'Instagram', color:'hover:text-pink-400' },
  { icon: Linkedin,  href:'https://www.linkedin.com/in/akhileshkumartripathi', label:'LinkedIn',  color:'hover:text-blue-400' },
  { icon: Youtube,   href:'https://youtube.com', label:'YouTube',   color:'hover:text-red-400' },
  { icon: Twitter,   href:'https://twitter.com', label:'Twitter',   color:'hover:text-sky-400' },
];

export default function Footer() {
  return (
    <footer className="bg-[#050709] border-t border-[rgba(201,168,76,0.12)]">
      {/* CTA */}
      <div className="border-b border-[rgba(201,168,76,0.1)] py-10 px-4">
        <div className="container mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          <div>
            <p className="tag">Free First Consultation</p>
            <h3 className="font-display text-2xl sm:text-3xl font-bold mt-2">Need Legal Help? Talk to Us Today.</h3>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <a href="https://wa.me/919971950371" target="_blank" className="btn-gold text-sm"><MessageCircle size={14}/> WhatsApp Now</a>
            <Link href="/contact" className="btn-outline text-sm">Book Consultation</Link>
          </div>
        </div>
      </div>

      {/* Main */}
      <div className="container mx-auto px-4 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Brand */}
        <div>
          <Image src="/logo-transparent.png" alt="NyayaSutra" width={180} height={65} className="h-12 w-auto object-contain mb-4"/>
          <p className="text-[var(--muted2)] text-sm leading-relaxed mb-2">NyayaSutra — Legal Intelligence</p>
          <p className="text-[var(--muted2)] text-xs leading-relaxed">Strategic Litigation · Legal Research · Drafting · Constitutional Practice · Corporate Advisory · Legal Intelligence</p>
          <div className="flex gap-3 mt-5">
            {socials.map(({ icon: Icon, href, label, color }) => (
              <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}
                className={`w-9 h-9 rounded-xl border border-[rgba(201,168,76,0.18)] flex items-center justify-center text-[var(--muted2)] ${color} hover:border-[rgba(201,168,76,0.45)] transition-all`}>
                <Icon size={15}/>
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-display text-base text-[var(--gold)] mb-4 font-semibold">Quick Links</h4>
          <div className="space-y-2">
            {quickLinks.map(([href, label]) => (
              <Link key={href} href={href} className="block text-sm text-[var(--muted2)] hover:text-[var(--gold)] transition-colors">{label}</Link>
            ))}
          </div>
        </div>

        {/* Practice Areas */}
        <div>
          <h4 className="font-display text-base text-[var(--gold)] mb-4 font-semibold">Practice Areas</h4>
          <div className="space-y-2">
            {practiceLinks.map(s => (
              <Link key={s} href="/practice-areas" className="block text-sm text-[var(--muted2)] hover:text-[var(--gold)] transition-colors">{s}</Link>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-display text-base text-[var(--gold)] mb-4 font-semibold">Contact</h4>
          <div className="space-y-4">
            <a href="tel:+919971950371" className="flex gap-3 text-sm text-[var(--muted2)] hover:text-[var(--gold)] transition-colors">
              <Phone size={15} className="shrink-0 text-[var(--gold)] mt-0.5"/><span>+91 9971950371</span>
            </a>
            <a href="mailto:nyayasutralegalintelligence@gmail.com" className="flex gap-3 text-sm text-[var(--muted2)] hover:text-[var(--gold)] transition-colors">
              <Mail size={15} className="shrink-0 text-[var(--gold)] mt-0.5"/><span className="break-all">nyayasutralegalintelligence@gmail.com</span>
            </a>
            <div className="flex gap-3 text-sm text-[var(--muted2)]">
              <MapPin size={15} className="shrink-0 text-[var(--gold)] mt-0.5"/>
              <span>Allahabad — Front District Judge Block C, Room No. 28</span>
            </div>
          </div>
          <div className="mt-4 p-3 rounded-xl bg-[rgba(201,168,76,0.06)] border border-[rgba(201,168,76,0.13)]">
            <p className="text-[10px] text-[var(--gold)] font-semibold mb-1">Office Hours</p>
            <p className="text-[10px] text-[var(--muted2)]">Mon – Sat: 10:00 AM – 7:00 PM</p>
            <p className="text-[10px] text-[var(--muted2)]">Sunday: By Appointment Only</p>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-[rgba(201,168,76,0.08)] py-5 px-4">
        <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[11px] text-[var(--muted2)]">© 2026 NyayaSutra — Legal Intelligence. All Rights Reserved. | Adv. A.K. Tripathi</p>
          <div className="flex gap-4 text-[11px] text-[var(--muted2)]">
            <Link href="/contact" className="hover:text-[var(--gold)] transition-colors">Privacy Policy</Link>
            <Link href="/contact" className="hover:text-[var(--gold)] transition-colors">Disclaimer</Link>
            <Link href="/contact" className="hover:text-[var(--gold)] transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
