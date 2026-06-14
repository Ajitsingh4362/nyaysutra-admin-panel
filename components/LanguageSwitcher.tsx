'use client';
import { useEffect, useState, useRef } from 'react';
import { Globe, ChevronDown } from 'lucide-react';

const languages = [
  { code:'en',    flag:'🇬🇧', name:'English',   native:'English' },
  { code:'hi',    flag:'🇮🇳', name:'Hindi',     native:'हिन्दी' },
  { code:'bn',    flag:'🇮🇳', name:'Bengali',   native:'বাংলা' },
  { code:'mr',    flag:'🇮🇳', name:'Marathi',   native:'मराठी' },
  { code:'ta',    flag:'🇮🇳', name:'Tamil',     native:'தமிழ்' },
  { code:'te',    flag:'🇮🇳', name:'Telugu',    native:'తెలుగు' },
  { code:'gu',    flag:'🇮🇳', name:'Gujarati',  native:'ગુજરાતી' },
  { code:'pa',    flag:'🇮🇳', name:'Punjabi',   native:'ਪੰਜਾਬੀ' },
  { code:'ur',    flag:'🇵🇰', name:'Urdu',      native:'اردو' },
  { code:'ar',    flag:'🇸🇦', name:'Arabic',    native:'العربية' },
  { code:'fr',    flag:'🇫🇷', name:'French',    native:'Français' },
  { code:'de',    flag:'🇩🇪', name:'German',    native:'Deutsch' },
  { code:'es',    flag:'🇪🇸', name:'Spanish',   native:'Español' },
  { code:'ru',    flag:'🇷🇺', name:'Russian',   native:'Русский' },
  { code:'zh-CN', flag:'🇨🇳', name:'Chinese',   native:'中文' },
  { code:'ja',    flag:'🇯🇵', name:'Japanese',  native:'日本語' },
  { code:'ko',    flag:'🇰🇷', name:'Korean',    native:'한국어' },
  { code:'ne',    flag:'🇳🇵', name:'Nepali',    native:'नेपाली' },
];

declare global { interface Window { googleTranslateElementInit?: () => void; google?: any; } }

export default function LanguageSwitcher() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(languages[0]);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Inject hidden translate element
    if (!document.getElementById('google_translate_element')) {
      const el = document.createElement('div');
      el.id = 'google_translate_element';
      el.style.cssText = 'display:none!important;visibility:hidden;position:absolute;';
      document.body.appendChild(el);
    }
    window.googleTranslateElementInit = () => {
      try {
        new window.google.translate.TranslateElement({ pageLanguage:'en', autoDisplay:false }, 'google_translate_element');
      } catch {}
    };
    if (!document.getElementById('google-translate-script')) {
      const s = document.createElement('script');
      s.id = 'google-translate-script';
      s.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      s.async = true;
      document.body.appendChild(s);
    }
    // Fix body top offset from Google Translate
    const obs = new MutationObserver(() => { document.body.style.top = '0px'; });
    obs.observe(document.body, { attributes: true, attributeFilter: ['style'] });

    const close = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener('mousedown', close);
    return () => { document.removeEventListener('mousedown', close); obs.disconnect(); };
  }, []);

  const changeLang = (lang: typeof languages[0]) => {
    setSelected(lang);
    setOpen(false);
    // Try Google Translate combo
    const tryChange = (attempts = 0) => {
      const combo = document.querySelector<HTMLSelectElement>('.goog-te-combo');
      if (combo) {
        combo.value = lang.code;
        combo.dispatchEvent(new Event('change'));
      } else if (attempts < 10) {
        setTimeout(() => tryChange(attempts + 1), 300);
      }
    };
    tryChange();
    // Also try cookie method
    document.cookie = `googtrans=/en/${lang.code}; path=/`;
  };

  return (
    <div ref={ref} className="relative">
      <button onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-[rgba(201,168,76,0.22)] bg-[rgba(201,168,76,0.05)] hover:border-[rgba(201,168,76,0.45)] hover:bg-[rgba(201,168,76,0.1)] transition-all text-sm text-[var(--ivory)]">
        <Globe size={13} className="text-[var(--gold)]"/>
        <span className="text-base leading-none">{selected.flag}</span>
        <span className="hidden sm:inline text-[11px] font-medium max-w-[60px] truncate">{selected.native}</span>
        <ChevronDown size={11} className={`text-[var(--gold)] transition-transform shrink-0 ${open ? 'rotate-180' : ''}`}/>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-52 bg-[#0C1018] border border-[rgba(201,168,76,0.18)] rounded-2xl shadow-2xl overflow-hidden z-[200] max-h-72 overflow-y-auto">
          {languages.map(lang => (
            <button key={lang.code} onClick={() => changeLang(lang)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 text-left text-sm transition-colors hover:bg-[rgba(201,168,76,0.08)] ${selected.code === lang.code ? 'bg-[rgba(201,168,76,0.1)] text-[var(--gold)]' : 'text-[var(--muted2)]'}`}>
              <span className="text-lg leading-none">{lang.flag}</span>
              <div>
                <div className="text-[11px] font-semibold text-[var(--ivory)]">{lang.name}</div>
                <div className="text-[10px] text-[var(--muted2)]">{lang.native}</div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
