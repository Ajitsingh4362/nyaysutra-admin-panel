'use client';
import { useState, useEffect } from 'react';
import { X, MessageCircle } from 'lucide-react';
import Link from 'next/link';

export default function VisitorPopup() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => {
      if (!sessionStorage.getItem('popup_seen')) { setShow(true); sessionStorage.setItem('popup_seen','1'); }
    }, 4000);
    return () => clearTimeout(t);
  }, []);
  if (!show) return null;
  return (
    <div className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="glass-dark rounded-3xl p-6 sm:p-8 w-full max-w-sm relative">
        <button onClick={() => setShow(false)} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[rgba(255,255,255,0.06)] flex items-center justify-center text-[var(--muted2)] hover:text-white transition-colors"><X size={14}/></button>
        <div className="w-12 h-12 rounded-2xl bg-[rgba(201,168,76,0.12)] flex items-center justify-center mb-4">
          <span className="text-2xl">⚖️</span>
        </div>
        <h3 className="font-display text-xl font-bold text-[var(--gold)]">NyayaSutra</h3>
        <p className="font-display text-lg font-semibold mt-1">Welcome to Legal Intelligence</p>
        <p className="text-[var(--muted2)] text-sm mt-2 leading-relaxed">Get expert legal consultation from Adv. A.K. Tripathi. First consultation is free.</p>
        <div className="flex flex-col gap-2 mt-5">
          <a href="https://wa.me/919971950371" target="_blank" className="btn-gold w-full justify-center text-sm"><MessageCircle size={13}/> WhatsApp for Free Consult</a>
          <Link href="/practice-areas" onClick={() => setShow(false)} className="btn-outline w-full justify-center text-sm">Explore Services</Link>
        </div>
      </div>
    </div>
  );
}
