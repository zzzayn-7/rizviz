import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import Navbar from "./Navbar";

// Shared layout for the individual service pages: navbar plus a hero the
// same size as the About hero. Services without a hero image yet get a plain
// navy hero.
export default function ServicePage({
  name,
  headline,
  hero,
  heroAlt = "",
  children,
}: {
  // Shown as the small label above the headline.
  name: string;
  // One line, or two: the second is shown in the lighter blue.
  headline: string | [string, string];
  hero?: StaticImageData;
  heroAlt?: string;
  // Sections shown below the hero.
  children?: React.ReactNode;
}) {
  return (
    <main className="relative">
      <Navbar />
      <section className="relative isolate flex min-h-[78vh] w-full items-center overflow-hidden bg-brand-navy">
        {hero && (
          <Image
            src={hero}
            alt={heroAlt}
            fill
            priority
            sizes="100vw"
            className="-z-10 object-cover object-[75%_center]"
          />
        )}

        {/* Navy shade behind the text on the left and the navbar on top, so
            both stay readable over the picture. */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-brand-navy/85 via-brand-navy/50 to-transparent to-75%" />
        <div className="absolute inset-x-0 top-0 -z-10 h-40 bg-gradient-to-b from-brand-navy/70 to-transparent" />

        <div className="mx-auto flex w-full max-w-7xl flex-col items-start px-6 py-24 text-left sm:px-10">
          <nav
            aria-label="Breadcrumb"
            className="mb-4 flex items-center gap-2.5 text-xs font-semibold uppercase tracking-widest text-brand-sky"
          >
            <Link
              href="/services"
              className="transition-colors duration-300 hover:text-white"
            >
              Our Services
            </Link>
            <span aria-hidden className="text-sm">
              →
            </span>
            <span aria-current="page">{name}</span>
          </nav>
          <h1 className="max-w-3xl text-balance text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
            {typeof headline === "string" ? (
              headline
            ) : (
              <>
                {headline[0]}
                <br />
                <span className="text-brand-ice">{headline[1]}</span>
              </>
            )}
          </h1>
        </div>
      </section>

      {children}
    </main>
  );
}
