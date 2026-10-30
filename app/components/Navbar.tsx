"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import logoMark from "../images/logo-mark.png";
import ContactButton from "./ContactButton";
import { servicesMenu } from "./servicesMenu";

const links = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
];

const linksAfterServices = [
  { label: "Products", href: "/products" },
  { label: "Careers", href: "/careers" },
];

const linkTone = {
  dark: "text-white/90 hover:text-brand-sky",
  // For pages whose top is light, such as the home page.
  light: "text-brand-navy/80 hover:text-brand-blue",
};

function Chevron({
  open,
  className = "",
}: {
  open: boolean;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={`h-4 w-4 transition-transform duration-300 ${open ? "rotate-180" : ""} ${className}`}
    >
      <path d="m5 7.5 5 5 5-5" />
    </svg>
  );
}

export default function Navbar({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState(false);
  const [mobileServices, setMobileServices] = useState(false);
  const contactClass =
    tone === "dark"
      ? "border-brand-sky/40 bg-brand-navy text-white hover:border-brand-ice hover:bg-brand-steel"
      : "border-transparent bg-origin-border bg-[linear-gradient(90deg,#3a7f80_0%,#0b1d2d_12%,#0b1d2d_66%,#285b7a_93%,#3a7f80_100%)] text-white hover:brightness-150";
  const linkClass = `text-sm font-medium transition-colors duration-300 ${linkTone[tone]}`;

  return (
    <header
      className="absolute inset-x-0 top-0 z-20"
      // The menu opens on hover and closes when the pointer leaves the header
      // or the menu; it also toggles on click and closes on Escape.
      onMouseLeave={() => setMenu(false)}
      onKeyDown={(e) => {
        if (e.key === "Escape") setMenu(false);
      }}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 sm:px-10 md:grid md:grid-cols-[1fr_auto_1fr]">
        <Link
          href="/"
          aria-label="Rizviz home"
          className="group relative inline-block justify-self-start"
        >
          <Image
            src={logoMark}
            alt="Rizviz"
            priority
            sizes="160px"
            quality={100}
            className="h-11 w-auto md:h-14"
          />
          {/* On hover a light swells up inside the symbol. The overlay is cut to the symbol's own
              shape, so nothing glows outside it. */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100 group-focus-visible:opacity-100"
            style={{
              backgroundImage:
                "radial-gradient(circle at 62% 38%, rgba(190,250,255,0.95) 0%, rgba(90,225,235,0.6) 32%, rgba(40,170,200,0.15) 62%, transparent 80%)",
              WebkitMaskImage: `url(${logoMark.src})`,
              maskImage: `url(${logoMark.src})`,
              WebkitMaskSize: "100% 100%",
              maskSize: "100% 100%",
              WebkitMaskRepeat: "no-repeat",
              maskRepeat: "no-repeat",
              mixBlendMode: "screen",
            }}
          />
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onMouseEnter={() => setMenu(false)}
              className={linkClass}
            >
              {l.label}
            </Link>
          ))}

          <button
            type="button"
            aria-haspopup="true"
            aria-expanded={menu}
            aria-controls="services-menu"
            onMouseEnter={() => setMenu(true)}
            onClick={() => setMenu((m) => !m)}
            className={`flex items-center gap-1.5 ${linkClass}`}
          >
            Services
            <Chevron open={menu} />
          </button>

          {linksAfterServices.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onMouseEnter={() => setMenu(false)}
              className={linkClass}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <ContactButton
          className={`hidden rounded-full border-2 px-6 py-2.5 text-sm font-semibold transition duration-500 ease-in-out md:inline-block md:justify-self-end ${contactClass}`}
        >
          Contact Us
        </ContactButton>

        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
          className={`text-2xl md:hidden ${tone === "light" ? "text-brand-navy" : "text-white"}`}
        >
          {open ? "✕" : "☰"}
        </button>
      </nav>

      {/* The services menu: a wide panel under the navbar, in the same ice-blue white as the pages, with
          navy glowing in from the sides. */}
      <div
        id="services-menu"
        inert={!menu}
        className={`absolute inset-x-0 top-full hidden px-4 pt-1 transition-all duration-300 ease-out md:block ${
          menu
            ? "translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-2 opacity-0"
        }`}
      >
        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl border border-brand-navy/15 bg-[#f4faff] shadow-[0_30px_80px_-20px_rgba(11,29,45,0.45)]">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background: [
                "radial-gradient(55% 80% at 100% 8%, rgba(11,29,45,0.2), transparent 70%)",
                "radial-gradient(50% 80% at 0% 92%, rgba(11,29,45,0.2), transparent 70%)",
                "linear-gradient(180deg, #f4faff 0%, #e4f2fc 100%)",
              ].join(", "),
            }}
          />

          <div className="relative grid grid-cols-[12rem_1fr] gap-8 p-8">
            <div>
              <div className="flex items-center justify-between rounded-xl border border-brand-navy/20 bg-[#f4faff] px-4 py-2.5 text-xs font-semibold text-brand-navy shadow-[0_6px_20px_-10px_rgba(11,29,45,0.3)]">
                All services
                <svg
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                  className="h-4 w-4 text-brand-navy"
                >
                  <path d="m7.5 5 5 5-5 5" />
                </svg>
              </div>
            </div>

            <div className="border-l border-brand-navy/15 pl-8">
              <h2 className="text-xl font-bold text-brand-navy">Our Services</h2>
              <p className="mt-2 text-sm text-brand-navy/75">
                Engineering solutions, solving real business challenges.
              </p>

              <div className="mt-5 border-t border-brand-navy/15 pt-6">
                <ul className="grid auto-rows-fr grid-cols-3 gap-4">
                  {servicesMenu.map((s) => (
                    <li key={s.href} className="h-full">
                      <Link
                        href={s.href}
                        onClick={() => setMenu(false)}
                        className="group flex h-full flex-col rounded-xl border border-brand-navy/20 bg-[#f4faff] p-5 shadow-[0_6px_20px_-10px_rgba(11,29,45,0.3)] transition duration-300 hover:-translate-y-0.5 hover:border-brand-navy/40 hover:shadow-[0_12px_28px_-12px_rgba(11,29,45,0.5)]"
                      >
                        <span className="block text-sm font-semibold leading-snug text-brand-navy">
                          {s.name}
                        </span>
                        <span className="mt-1 block text-xs leading-relaxed text-brand-navy/75">
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
      </div>

      {open && (
        <div className="mx-4 rounded-2xl bg-brand-navy/95 p-6 backdrop-blur md:hidden">
          <ul className="flex flex-col gap-4">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="text-white/90 hover:text-brand-sky"
                >
                  {l.label}
                </Link>
              </li>
            ))}

            <li>
              <button
                type="button"
                aria-expanded={mobileServices}
                onClick={() => setMobileServices((s) => !s)}
                className="flex items-center gap-1.5 text-white/90 hover:text-brand-sky"
              >
                Services
                <Chevron open={mobileServices} />
              </button>
              {mobileServices && (
                <ul className="mt-3 flex flex-col gap-3 border-l border-white/15 pl-4">
                  {servicesMenu.map((s) => (
                    <li key={s.href}>
                      <Link
                        href={s.href}
                        onClick={() => setOpen(false)}
                        className="text-sm text-brand-ice/80 hover:text-brand-sky"
                      >
                        {s.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>

            {linksAfterServices.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="text-white/90 hover:text-brand-sky"
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <ContactButton
                onClick={() => setOpen(false)}
                className={`inline-block rounded-full border-2 px-6 py-2.5 text-sm font-semibold transition duration-500 ease-in-out ${contactClass}`}
              >
                Contact Us
              </ContactButton>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
