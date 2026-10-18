import Image from "next/image";
import Link from "next/link";
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
  { label: "Mobile App Development", href: "/services/mobile-app-development" },
  { label: "Website Development", href: "/services/website-development" },
];

const offices = [
  "Faisal Town, Lahore",
  "Johar Town, Lahore",
  "Jubilee Town, Lahore",
  "Bahria Town, Lahore",
];

const emails = ["info@rizviz.com.pk", "hr@rizviz.com.pk"];

const linkClass =
  "text-sm text-brand-ice/70 transition-colors duration-300 hover:text-brand-sky";
const headingClass =
  "text-xs font-semibold uppercase tracking-widest text-brand-sky";

export default function Footer() {
  return (
    <footer className="w-full border-t border-white/10 bg-brand-navy">
      <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:px-10">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1.2fr_1fr] md:gap-10">
          <div className="max-w-xs">
            <Link href="/" aria-label="Rizviz home" className="inline-block">
              <Image
                src={logo}
                alt="Rizviz"
                sizes="120px"
                className="h-9 w-auto"
              />
            </Link>
            <p className="mt-5 text-sm leading-relaxed text-brand-ice/70">
              Technology built around business. Software, AI, data, and cloud
              solutions for real business needs.
            </p>
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
                <li key={office} className="text-sm text-brand-ice/70">
                  {office}
                </li>
              ))}
            </ul>

            <h2 className={`${headingClass} mt-8`}>Contact</h2>
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

        <div className="mt-14 border-t border-white/10 pt-6">
          <p className="text-xs text-brand-ice/50">
            © <CopyrightYear /> Rizviz. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
