"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import LanguageSwitcher from "./LanguageSwitcher";
import { servicesMenu } from "./servicesMenu";

const tabs = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "" },
  { label: "Products", href: "/products" },
  { label: "Careers", href: "/careers" },
];

// Once you scroll down out of a page's hero, the real navbar is left behind. Two round buttons pop in at
// the top right instead: a menu (three lines) that opens a small bar of the navbar's tabs to its left,
// and the language flag.
export default function FloatingNav() {
  const pathname = usePathname();
  const [shown, setShown] = useState(false);
  const [open, setOpen] = useState(false);
  const [services, setServices] = useState(false);
  const root = useRef<HTMLDivElement>(null);

  // Shown when the first section of the page (its hero) has scrolled away.
  useEffect(() => {
    const check = () => {
      const hero = document.querySelector("main section");
      setShown(!!hero && hero.getBoundingClientRect().bottom <= 80);
    };
    check();
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    return () => {
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, [pathname]);

  useEffect(() => {
    if (!shown) {
      setOpen(false);
      setServices(false);
    }
  }, [shown]);

  useEffect(() => {
    setOpen(false);
    setServices(false);
  }, [pathname]);

  // Closing the bar closes the services list too, so it opens fresh next time.
  useEffect(() => {
    if (!open) setServices(false);
  }, [open]);

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

  const pop = `transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
    shown ? "scale-100 opacity-100" : "pointer-events-none scale-0 opacity-0"
  }`;
  const stagger = (ms: number) => ({ transitionDelay: shown ? `${ms}ms` : "0ms" });

  const tabClass =
    "btn-glow block whitespace-nowrap rounded-full px-3.5 py-1.5 text-sm font-medium text-white/90";

  return (
    <div
      ref={root}
      inert={!shown}
      className="fixed right-4 top-4 z-40 flex items-start gap-3 sm:right-6 sm:top-5"
    >
      {/* The menu button, with its bar of tabs growing out to the left. */}
      <div className={`relative ${pop}`} style={stagger(0)}>
        <button
          type="button"
          aria-label="Menu"
          aria-expanded={open}
          aria-controls="floating-tabs"
          onClick={() => setOpen((o) => !o)}
          className="glass-navy btn-glow flex h-11 w-11 items-center justify-center rounded-full text-white"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden
            className="h-5 w-5"
          >
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        </button>

        <nav
          id="floating-tabs"
          aria-label="Pages"
          inert={!open}
          className={`glass-navy absolute right-0 top-full mt-3 flex origin-top-right flex-col gap-0.5 rounded-3xl p-1.5 transition-all duration-300 ease-out md:right-full md:top-0 md:mr-3 md:mt-0 md:origin-right md:flex-row md:items-center md:rounded-full ${
            open
              ? "scale-100 opacity-100"
              : "pointer-events-none scale-50 opacity-0"
          }`}
        >
          {tabs.map((t) =>
            t.href ? (
              <Link
                key={t.href}
                href={t.href}
                onClick={() => setOpen(false)}
                className={`${tabClass} ${pathname === t.href ? "bg-white/15 text-white" : ""}`}
              >
                {t.label}
              </Link>
            ) : (
              <div key={t.label} className="relative">
                <button
                  type="button"
                  aria-expanded={services}
                  onClick={() => setServices((s) => !s)}
                  className={`${tabClass} flex w-full items-center gap-1.5 ${pathname.startsWith("/services") ? "bg-white/15 text-white" : ""}`}
                >
                  {t.label}
                  <svg
                    viewBox="0 0 20 20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                    className={`h-4 w-4 transition-transform duration-300 ${services ? "rotate-180" : ""}`}
                  >
                    <path d="m5 7.5 5 5 5-5" />
                  </svg>
                </button>
                {/* On a phone the services unfold under the tab; from md up they open as a panel. */}
                <ul
                  inert={!services}
                  className={`flex-col gap-0.5 pl-3 md:hidden ${services ? "flex" : "hidden"}`}
                >
                  {servicesMenu.map((s) => (
                    <li key={s.href}>
                      <Link
                        href={s.href}
                        onClick={() => setOpen(false)}
                        className={`${tabClass} !rounded-xl !text-[0.8rem]`}
                      >
                        {s.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ),
          )}
        </nav>

        {/* The services panel: the navbar's, in the same ice-blue white with navy glowing in from the
            corners and white cards, only smaller. */}
        <div
          id="floating-services"
          inert={!(open && services)}
          className={`absolute right-0 top-full mt-3.5 hidden w-[27rem] origin-top-right transition-all duration-300 ease-out md:block ${
            open && services
              ? "translate-y-0 scale-100 opacity-100"
              : "pointer-events-none -translate-y-2 scale-95 opacity-0"
          }`}
        >
          <div className="relative overflow-hidden rounded-2xl border border-brand-navy/15 bg-[#f4faff] shadow-[0_24px_60px_-18px_rgba(11,29,45,0.5)]">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                background: [
                  "radial-gradient(55% 70% at 100% 6%, rgba(11,29,45,0.2), transparent 70%)",
                  "radial-gradient(50% 70% at 0% 94%, rgba(11,29,45,0.2), transparent 70%)",
                  "linear-gradient(180deg, #f4faff 0%, #e4f2fc 100%)",
                ].join(", "),
              }}
            />
            <div className="relative p-5">
              <h2 className="text-base font-bold text-brand-navy">Our Services</h2>
              <p className="mt-1 text-xs text-brand-navy/75">
                Engineering solutions, solving real business challenges.
              </p>
              <ul className="mt-4 grid auto-rows-fr grid-cols-2 gap-2.5 border-t border-brand-navy/15 pt-4">
                {servicesMenu.map((s) => (
                  <li key={s.href} className="h-full">
                    <Link
                      href={s.href}
                      onClick={() => setOpen(false)}
                      className="flex h-full flex-col rounded-lg border border-brand-navy/20 bg-[#f4faff] px-3.5 py-3 shadow-[0_6px_16px_-10px_rgba(11,29,45,0.3)] transition duration-300 hover:-translate-y-0.5 hover:border-brand-navy/40 hover:shadow-[0_10px_22px_-12px_rgba(11,29,45,0.5)]"
                    >
                      <span className="block text-[0.8rem] font-semibold leading-snug text-brand-navy">
                        {s.name}
                      </span>
                      <span className="mt-0.5 block text-[0.7rem] leading-snug text-brand-navy/75">
                        {s.blurb}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className={pop} style={stagger(90)}>
        <LanguageSwitcher tone="light" />
      </div>
    </div>
  );
}
