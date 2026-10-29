"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import logo from "../images/logo.png";
import CopyrightYear from "./CopyrightYear";

const company = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Products", href: "/products" },
  { label: "Careers", href: "/careers" },
];

const services = [
  { label: "AI / ML", href: "/services/ai-ml" },
  { label: "DevOps", href: "/services/devops" },
  { label: "Data Engineering", href: "/services/data-engineering" },
  { label: "ServiceNow", href: "/services/servicenow" },
  { label: "Software Development", href: "/services/software-development" },
  { label: "App Development", href: "/services/mobile-app-development" },
  { label: "Website Development", href: "/services/website-development" },
];

const offices = [
  "Faisal Town, Lahore",
  "Johar Town, Lahore",
  "Jubilee Town, Lahore",
  "Bahria Town, Lahore",
];

const socials = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/share/18jiyRZdgv/",
    path: "M14 8.5V6.9c0-.8.2-1.4 1.4-1.4H17V2.3C16.700 2.300 15.700 2.200 14.600 2.200 12.100 2.200 10.400 3.700 10.400 6.500v2H7.500v3.300h2.900V21.800H14V11.800h2.700L17.100 8.500H14Z",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/_rizvizinternational?psln=bHk2OXB3bG81cHR6",
    stroke: true,
    path: "M7.500 3h9A4.500 4.500 0 0 1 21 7.500v9a4.500 4.500 0 0 1-4.500 4.500h-9A4.500 4.500 0 0 1 3 16.500v-9A4.500 4.500 0 0 1 7.500 3ZM12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8ZM17.300 6.700h.01",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/rizviz-international-impex/",
    path: "M5.200 3.500a1.900 1.900 0 1 1 0 3.800 1.900 1.900 0 0 1 0-3.800ZM3.500 9h3.400v11.500H3.500V9Zm5.500 0h3.200v1.600h.05c.45-.85 1.550-1.750 3.200-1.750 3.400 0 4.050 2.250 4.050 5.150v6.500h-3.400v-5.800c0-1.400-.03-3.150-1.900-3.150-1.900 0-2.200 1.500-2.200 3.050v5.900H9V9Z",
  },
];

const phone = { label: "0327 0800639", href: "tel:+923270800639" };

const emails = ["info@rizviz.com.pk", "careers@rizviz.com.pk"];

// The pages that end with the closing call to action. On these the page turns
// from navy to white through the CTA and the top of the footer, so the footer
// is light. Every other page keeps the navy footer.
const PAGES_WITH_CTA = ["/", "/about", "/products"];

const themes = {
  light: {
    footer: "relative w-full",
    inner: "pt-32 sm:pt-36",
    link: "text-brand-slate hover:text-brand-blue",
    social:
      "border-brand-navy/15 text-brand-slate hover:border-brand-blue hover:text-brand-blue",
    heading: "text-brand-blue",
    text: "text-brand-slate",
    muted: "text-brand-slate/70",
    rule: "border-brand-navy/10",
  },
  dark: {
    footer: "w-full border-t border-white/10 bg-brand-navy",
    inner: "pt-16",
    link: "text-brand-ice/70 hover:text-brand-sky",
    social:
      "border-white/15 text-brand-ice/70 hover:border-brand-sky hover:text-brand-sky",
    heading: "text-brand-sky",
    text: "text-brand-ice/70",
    muted: "text-brand-ice/50",
    rule: "border-white/10",
  },
};

// White at 38% of the footer's height, and navy-to-white before it, picking up
// the blue the CTA ends on.
const LIGHT_BACKGROUND =
  "linear-gradient(180deg, #4a8ec2 0.0%, #68a5d4 3.8%, #93c0e4 7.6%, #b4d5ef 11.4%, #d0e6f7 15.2%, #dfeffa 19.0%, #ecf5fc 22.8%, #f4f9fd 26.6%, #fafcfe 30.4%, #fefeff 34.2%, #ffffff 38.0%, #ffffff 100%)";

// For a page with no call to action above the footer (Careers): the navy of the
// page turns into the white footer within the first 240px, by the same steps of
// blue used elsewhere on the site.
const FROM_NAVY_PX = 240;
const FROM_NAVY_BACKGROUND = (() => {
  const palette = [
    "#0b1d2d",
    "#0d2439",
    "#113455",
    "#143f68",
    "#184d80",
    "#1d5a92",
    "#2a6aa0",
    "#3a82b8",
    "#5f9fd0",
    "#9cc6e8",
    "#cde5f6",
    "#eaf4fc",
    "#ffffff",
  ].map((c) => [1, 3, 5].map((i) => parseInt(c.slice(i, i + 2), 16)));
  const at = (t: number) => {
    const e = t * t * (3 - 2 * t);
    const x = e * (palette.length - 1);
    const i = Math.min(Math.floor(x), palette.length - 2);
    const a = palette[i];
    const b = palette[i + 1];
    return (
      "#" +
      a
        .map((v, k) =>
          Math.round(v + (b[k] - v) * (x - i))
            .toString(16)
            .padStart(2, "0"),
        )
        .join("")
    );
  };
  const stops = Array.from({ length: 13 }, (_, n) => {
    const p = n / 12;
    return `${at(p)} ${Math.round(p * FROM_NAVY_PX)}px`;
  });
  return `linear-gradient(180deg, ${stops.join(", ")}, #ffffff 100%)`;
})();

export default function Footer() {
  const pathname = usePathname();
  const fromNavy = pathname === "/careers";
  const t =
    themes[
      PAGES_WITH_CTA.includes(pathname) ||
      pathname.startsWith("/services/") ||
      fromNavy
        ? "light"
        : "dark"
    ];
  const linkClass = `text-sm transition-colors duration-300 ${t.link}`;
  const headingClass = `text-xs font-semibold uppercase tracking-widest ${t.heading}`;

  return (
    <footer
      className={t.footer}
      style={
        t === themes.light
          ? { background: fromNavy ? FROM_NAVY_BACKGROUND : LIGHT_BACKGROUND }
          : undefined
      }
    >
      <div
        className={`mx-auto max-w-7xl px-6 pb-8 sm:px-10 ${fromNavy ? "pt-64" : t.inner}`}
      >
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.25fr_0.65fr_1.05fr_1fr_1.2fr] lg:gap-8">
          <div className="max-w-xs">
            <Link href="/" aria-label="Rizviz home" className="inline-block">
              <Image
                src={logo}
                alt="Rizviz"
                sizes="260px"
                className="h-14 w-auto"
              />
            </Link>
            <p className={`mt-5 text-sm leading-relaxed ${t.text}`}>
              Technology built around business. Software, AI, data, and cloud
              solutions for real business needs.
            </p>
            <ul className="mt-6 flex gap-3">
              {socials.map((x) => (
                <li key={x.label}>
                  <a
                    href={x.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Rizviz on ${x.label}`}
                    className={`flex h-10 w-10 items-center justify-center rounded-full border transition-colors duration-300 ${t.social}`}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      aria-hidden
                      className="h-[1.15rem] w-[1.15rem]"
                      fill={x.stroke ? "none" : "currentColor"}
                      stroke={x.stroke ? "currentColor" : "none"}
                      strokeWidth={1.8}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d={x.path} />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label="Company">
            <h2 className={headingClass}>Company</h2>
            <ul className="mt-5 space-y-3">
              {company.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={linkClass}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Services">
            <h2 className={headingClass}>Services</h2>
            <ul className="mt-5 space-y-3">
              {services.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={linkClass}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className={headingClass}>Our offices</h2>
            <ul className="mt-5 space-y-3">
              {offices.map((office) => (
                <li key={office} className={`text-sm ${t.text}`}>
                  {office}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className={headingClass}>Contact us</h2>
            <ul className="mt-5 space-y-3">
              <li>
                <a href={phone.href} className={linkClass}>
                  {phone.label}
                </a>
              </li>
            </ul>

            <h2 className={`${headingClass} mt-8`}>Email us</h2>
            <ul className="mt-5 space-y-3">
              {emails.map((email) => (
                <li key={email}>
                  <a href={`mailto:${email}`} className={linkClass}>
                    {email}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className={`mt-14 border-t pt-6 ${t.rule}`}>
          <p className={`text-xs ${t.muted}`}>
            © <CopyrightYear /> Rizviz. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
