'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Facebook, Instagram, Linkedin, Youtube, Twitter, ShieldCheck, GraduationCap } from 'lucide-react';
import { useState, useEffect } from 'react';
import LanguageSwitcher from './LanguageSwitcher';

const nav = [
  { href: '/',               label: 'Home' },
  { href: '/about',          label: 'About' },
  { href: '/team',           label: 'Team' },
  { href: '/practice-areas', label: 'Practice Areas' },
  { href: '/courts',         label: 'Courts' },
  { href: '/courses',        label: 'Courses' },
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
          ? 'bg-gradient-to-r from-[#3D0E14]/98 via-[#2A090F]/98 to-[#3D0E14]/98 shadow-[0_4px_30px_rgba(0,0,0,0.35)]'
          : 'bg-gradient-to-r from-[#3D0E14]/95 via-[#2A090F]/95 to-[#3D0E14]/95'}
        backdrop-blur-xl border-b border-[rgba(201,168,76,0.22)]`}
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
        <nav className="hidden min-[900px]:flex items-center gap-3 lg:gap-4 xl:gap-5 flex-1 justify-center" aria-label="Main navigation">
          {nav.map(({ href, label }) => (
            <Link
              key={href} href={href}
              className={`text-[11px] font-semibold uppercase tracking-[0.09em] transition-colors whitespace-nowrap
                ${isActive(href)
                  ? 'text-[#E8C468]'
                  : 'text-[#D9B8A8] hover:text-[#E8C468]'}`}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* ── Desktop: quick links + lang ── */}
        <div className="hidden min-[900px]:flex items-center gap-3 shrink-0">
          <Link
            href="/verify"
            className="flex items-center gap-1.5 text-[11px] font-semibold whitespace-nowrap text-[#E8C468] hover:text-[#F5E6D3]"
          >
            <ShieldCheck size={13} />
            Verify Certificate
          </Link>
          <Link
            href="/students/dashboard"
            className="flex items-center gap-1.5 text-[11px] font-semibold whitespace-nowrap text-[#E8C468] hover:text-[#F5E6D3]"
          >
            <GraduationCap size={13} />
            My Courses
          </Link>
          <div className="w-px h-4 bg-[rgba(201,168,76,0.25)]" />
          <LanguageSwitcher />
        </div>

        {/* ── Mobile hamburger ── */}
        <button
          className="min-[900px]:hidden p-2 shrink-0 text-[#E8C468]"
          onClick={() => setOpen(v => !v)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* ── Mobile drawer ── */}
      {open && (
        <div className="min-[900px]:hidden px-4 py-4 max-h-[80vh] overflow-y-auto border-t bg-[#2A090F] border-[rgba(201,168,76,0.2)]">
          <nav className="flex flex-col gap-0.5 mb-2" aria-label="Mobile navigation">
            {nav.map(({ href, label }) => (
              <Link
                key={href} href={href}
                className={`px-4 py-3 rounded-xl text-sm font-medium transition-colors
                  ${isActive(href)
                    ? 'bg-[rgba(201,168,76,0.16)] text-[#E8C468]'
                    : 'text-[#D9B8A8] hover:text-[#E8C468] hover:bg-[rgba(201,168,76,0.08)]'}`}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Utility link — not a primary nav item, so kept out of the main desktop menu */}
          <Link
            href="/verify"
            className="flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm font-medium transition-colors mb-2 text-[#E8C468] bg-[rgba(201,168,76,0.1)] hover:bg-[rgba(201,168,76,0.18)]"
          >
            <ShieldCheck size={16} className="shrink-0" />
            Verify a Certificate
          </Link>

          <Link
            href="/students/dashboard"
            className="flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm font-medium transition-colors mb-4 text-[#E8C468] bg-[rgba(201,168,76,0.1)] hover:bg-[rgba(201,168,76,0.18)]"
          >
            <GraduationCap size={16} className="shrink-0" />
            My Courses / Student Login
          </Link>

          <div className="border-t pt-4 flex items-center justify-between gap-3 flex-wrap border-[rgba(201,168,76,0.2)]">
            <div className="flex gap-3 flex-wrap">
              {socials.map(({ icon: Icon, href, label }) => (
                <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}
                  className="text-[#D9B8A8]/70 hover:text-[#E8C468] transition-colors">
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
