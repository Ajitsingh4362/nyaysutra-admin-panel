'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Facebook, Instagram, Linkedin, Youtube, Twitter } from 'lucide-react';
import { useState, useEffect } from 'react';
import LanguageSwitcher from './LanguageSwitcher';

const nav = [
  { href: '/',               label: 'Home' },
  { href: '/about',          label: 'About' },
  { href: '/team',           label: 'Team' },
  { href: '/practice-areas', label: 'Practice Areas' },
  { href: '/courts',         label: 'Courts' },
  { href: '/students',       label: 'Students' },
  { href: '/gallery',        label: 'Gallery' },
  { href: '/blog',           label: 'Blog' },
  { href: '/contact',        label: 'Contact' },
];

const socials = [
  { icon: Facebook,  href: 'https://www.facebook.com/share/1CjgsCYHCE/',        label: 'Facebook'  },
  { icon: Instagram, href: 'https://www.instagram.com/advtripathi334/',          label: 'Instagram' },
  { icon: Linkedin,  href: 'https://www.linkedin.com/in/akhileshkumartripathi', label: 'LinkedIn'  },
  { icon: Youtube,   href: 'https://youtube.com',                                label: 'YouTube'   },
  { icon: Twitter,   href: 'https://twitter.com',                                label: 'Twitter'   },
];

export default function Navbar() {
  const [open, setOpen]       = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // hide on admin pages
  if (pathname?.startsWith('/admin')) return null;

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname?.startsWith(href);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300
        ${scrolled
          ? 'bg-[#07090F]/98 shadow-[0_4px_40px_rgba(0,0,0,0.55)]'
          : 'bg-[#07090F]/95'}
        backdrop-blur-xl border-b border-[rgba(201,168,76,0.12)]`}
    >
      <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-5 flex items-center justify-between h-20 gap-3">

        {/* ── Logo ── */}
        <Link href="/" className="shrink-0 flex items-center bg-transparent" aria-label="NyayaSutra Home">
         <Image
  src="/logo-transparent.png"
  alt="NyayaSutra — Legal Intelligence"
  width={210}
  height={70}
  className="h-12 sm:h-14 w-auto object-contain"
  priority
/>
        </Link>

        {/* ── Desktop Nav ── */}
        <nav className="hidden xl:flex items-center gap-4 xl:gap-5 flex-1 justify-center" aria-label="Main navigation">
          {nav.map(({ href, label }) => (
            <Link
              key={href} href={href}
              className={`text-[11px] font-semibold uppercase tracking-[0.09em] transition-colors whitespace-nowrap
                ${isActive(href) ? 'text-[var(--gold)]' : 'text-[rgba(245,240,232,0.7)] hover:text-[var(--gold)]'}`}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* ── Desktop: socials + lang ── */}
        <div className="hidden xl:flex items-center gap-2.5 shrink-0">
          {socials.map(({ icon: Icon, href, label }) => (
            <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}
              className="text-[rgba(197,187,171,0.5)] hover:text-[var(--gold)] transition-colors">
              <Icon size={14} />
            </a>
          ))}
          <div className="w-px h-4 bg-[rgba(201,168,76,0.2)] mx-1" />
          <LanguageSwitcher />
        </div>

        {/* ── Mobile hamburger ── */}
        <button
          className="xl:hidden p-2 text-[var(--ivory)] shrink-0"
          onClick={() => setOpen(v => !v)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* ── Mobile drawer ── */}
      {open && (
        <div className="xl:hidden bg-[#07090F] border-t border-[rgba(201,168,76,0.1)] px-4 py-4 max-h-[80vh] overflow-y-auto">
          <nav className="flex flex-col gap-0.5 mb-4" aria-label="Mobile navigation">
            {nav.map(({ href, label }) => (
              <Link
                key={href} href={href}
                className={`px-4 py-3 rounded-xl text-sm font-medium transition-colors
                  ${isActive(href)
                    ? 'bg-[rgba(201,168,76,0.12)] text-[var(--gold)]'
                    : 'text-[rgba(245,240,232,0.75)] hover:text-[var(--gold)] hover:bg-[rgba(201,168,76,0.06)]'}`}
              >
                {label}
              </Link>
            ))}
          </nav>
          <div className="border-t border-[rgba(201,168,76,0.1)] pt-4 flex items-center justify-between gap-3 flex-wrap">
            <div className="flex gap-3 flex-wrap">
              {socials.map(({ icon: Icon, href, label }) => (
                <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}
                  className="text-[rgba(197,187,171,0.55)] hover:text-[var(--gold)] transition-colors">
                  <Icon size={18} />
                </a>
              ))}
            </div>
            <LanguageSwitcher />
          </div>
        </div>
      )}
    </header>
  );
}
