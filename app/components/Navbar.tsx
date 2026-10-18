"use client";

import Link from "next/link";
import { useState } from "react";

const links = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
];

const linksAfterServices = [
  { label: "Applications", href: "/applications" },
  { label: "Careers", href: "/careers" },
];

const linkClass =
  "text-sm font-medium text-white/90 transition-colors duration-300 hover:text-brand-sky";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="absolute inset-x-0 top-0 z-20">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 sm:px-10 md:grid md:grid-cols-[1fr_auto_1fr]">
        <Link href="/" className="text-xl font-bold text-white">
          Rizviz
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className={linkClass}>
              {l.label}
            </Link>
          ))}

          <Link href="/services" className={linkClass}>
            Services
          </Link>

          {linksAfterServices.map((l) => (
            <Link key={l.href} href={l.href} className={linkClass}>
              {l.label}
            </Link>
          ))}
        </div>

        <Link
          href="/contact"
          className="hidden rounded-full border-2 border-brand-blue bg-brand-blue px-6 py-2.5 text-sm font-semibold text-white transition-colors duration-500 ease-in-out hover:bg-transparent md:inline-block md:justify-self-end"
        >
          Contact Us
        </Link>

        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
          className="text-2xl text-white md:hidden"
        >
          {open ? "✕" : "☰"}
        </button>
      </nav>

      {open && (
        <div className="mx-4 rounded-2xl bg-brand-navy/95 p-6 backdrop-blur md:hidden">
          <ul className="flex flex-col gap-4">
            {[
              ...links,
              { label: "Services", href: "/services" },
              ...linksAfterServices,
            ].map((l) => (
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
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="inline-block rounded-full border-2 border-brand-blue bg-brand-blue px-6 py-2.5 text-sm font-semibold text-white transition-colors duration-500 ease-in-out hover:bg-transparent"
              >
                Contact Us
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
