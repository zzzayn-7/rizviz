"use client";

import { useEffect, useRef, useState } from "react";
import { LANGUAGES } from "../i18n/languages";
import { setLanguage, useLanguage } from "../i18n/store";
import Flag from "./Flags";

// A transparent circle holding the flag of the current language. It opens a list of the languages the
// site can be read in; choosing one translates the whole page and is remembered for next time.
export default function LanguageSwitcher({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const lang = useLanguage();
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const away = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false);
    };
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", away);
    document.addEventListener("keydown", key);
    return () => {
      document.removeEventListener("pointerdown", away);
      document.removeEventListener("keydown", key);
    };
  }, [open]);

  return (
    <div ref={root} className="relative" translate="no">
      <button
        type="button"
        aria-label="Language"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className={`flex h-11 w-11 items-center justify-center rounded-full transition-colors duration-300 ${
          tone === "dark"
            ? "border border-white/40 bg-transparent hover:border-white/80"
            : "border border-brand-navy/30 bg-transparent hover:border-brand-navy/70"
        }`}
      >
        <Flag code={lang} className="h-7 w-7" />
      </button>

      <ul
        role="listbox"
        aria-hidden={!open}
        inert={!open}
        className={`absolute right-0 top-full z-30 mt-2 w-48 origin-top-right rounded-xl border border-brand-navy/15 bg-[#f4faff] p-1.5 shadow-[0_24px_60px_-16px_rgba(11,29,45,0.45)] transition-all duration-200 ease-out ${
          open
            ? "translate-y-0 scale-100 opacity-100"
            : "pointer-events-none -translate-y-1 scale-95 opacity-0"
        }`}
      >
        {LANGUAGES.map((l) => {
          const chosen = l.code === lang;
          return (
            <li key={l.code} role="option" aria-selected={chosen}>
              <button
                type="button"
                onClick={() => {
                  setLanguage(l.code);
                  setOpen(false);
                }}
                className={`flex w-full items-center gap-3 rounded-lg px-2.5 py-1.5 text-left text-sm transition-colors duration-200 ${
                  chosen
                    ? "bg-brand-navy/[0.06] font-semibold text-brand-blue"
                    : "text-brand-navy hover:bg-brand-navy/[0.05]"
                }`}
              >
                <Flag code={l.code} className="h-6 w-6" />
                <span lang={l.code} className={l.code === "ar" ? "text-base" : undefined}>
                  {l.label}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
