'use client';
import { MessageCircle, X } from 'lucide-react';
import { useState } from 'react';

export default function WhatsAppFloat() {
  const [tip, setTip] = useState(true);
  return (
    <div className="fixed right-4 sm:right-6 bottom-5 sm:bottom-7 z-50 flex items-end gap-2">
      {tip && (
        <div className="glass rounded-2xl px-4 py-3 text-sm max-w-[180px] sm:max-w-[210px]">
          <button onClick={() => setTip(false)} className="float-right ml-2 text-[var(--muted2)] hover:text-white transition-colors"><X size={11}/></button>
          <p className="font-semibold text-[var(--gold)] text-xs mb-0.5">Free Consultation</p>
          <p className="text-[var(--muted2)] text-xs leading-snug">Chat with Adv. A.K. Tripathi on WhatsApp</p>
        </div>
      )}
      <a href="https://wa.me/919971950371" target="_blank"
        className="w-14 h-14 bg-gradient-to-br from-[#25D366] to-[#128C7E] text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform wa-pulse shrink-0"
        aria-label="WhatsApp Consultation">
        <MessageCircle size={26} fill="white" strokeWidth={1.5}/>
      </a>
    </div>
  );
}
