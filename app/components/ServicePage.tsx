import Image, { type StaticImageData } from "next/image";
import heroSkyline from "../images/hero-skyline.png";
import ContactCta from "./ContactCta";
import Navbar from "./Navbar";

// Shared layout for the individual service pages: navbar plus a hero the
// same size as the About hero. Services without a hero image yet get a plain
// navy hero. A service can instead give a `scene`, which gives it the night
// skyline hero and the ice-blue page of the Home and About pages.
export default function ServicePage({
  name,
  headline,
  hero,
  heroAlt = "",
  scene,
  cta,
  children,
}: {
  // Shown as the small label above the headline.
  name: string;
  // One line, or two: the second is shown in the lighter blue.
  headline: string | [string, string];
  hero?: StaticImageData;
  heroAlt?: string;
  // Marks a page that uses the skyline hero; it replaces the picture and navy hero.
  scene?: React.ReactNode;
  // The closing call to action under a scene hero: its line and its button.
  cta?: { headline: string; button: string };
  // Sections shown below the hero.
  children?: React.ReactNode;
}) {
  if (scene) {
    return (
      <main className="relative">
        <Navbar tone="dark" />
        {/* One backdrop for the whole page: the night skyline hero, then the ice-blue white page with
            navy glowing in from alternating sides. */}
        <div className="relative overflow-x-clip bg-brand-navy">
          <section className="relative isolate flex min-h-screen w-full items-center overflow-hidden bg-brand-navy">
            {/* The same night skyline as the other pages. */}
            <Image
              src={heroSkyline}
              alt=""
              fill
              priority
              sizes="100vw"
              className="-z-10 object-cover object-bottom"
            />
            {/* A soft dark wash behind the words keeps them easy to read. */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 -z-10"
              style={{
                background: [
                  "radial-gradient(55% 55% at 50% 46%, rgba(5,10,18,0.6), transparent 72%)",
                  "radial-gradient(700px 600px at 0% 30%, rgba(50,159,224,0.2), transparent 70%)",
                  "radial-gradient(800px 700px at 100% 85%, rgba(112,199,244,0.16), transparent 70%)",
                ].join(", "),
              }}
            />

            <div className="relative mx-auto flex w-full max-w-4xl flex-col items-center px-6 pb-32 pt-32 text-center sm:px-10 lg:pb-40">
              <p className="mb-4 flex items-center gap-2.5 text-xs font-semibold uppercase tracking-widest text-brand-ice">
                <span>Our Services</span>
                <span aria-hidden className="text-sm">
                  →
                </span>
                <span aria-current="page">{name}</span>
              </p>
              <h1 className="text-balance text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
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

          {/* Everything below the hero shares the ice-blue white page, with navy glowing in from
              alternating sides and fading to navy at the bottom where the call to action begins. */}
          <div className="relative z-[2]">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                background: [
                  "linear-gradient(0deg, #0b1d2d 0px, transparent 200px)",
                  "radial-gradient(800px 700px at 0% 10%, rgba(11,29,45,0.2), transparent 70%)",
                  "radial-gradient(800px 700px at 100% 36%, rgba(11,29,45,0.2), transparent 70%)",
                  "radial-gradient(800px 700px at 0% 62%, rgba(11,29,45,0.2), transparent 70%)",
                  "radial-gradient(800px 700px at 100% 88%, rgba(11,29,45,0.2), transparent 70%)",
                  "linear-gradient(180deg, #f4faff 0%, #e4f2fc 50%, #f4faff 100%)",
                ].join(", "),
              }}
            />
            {children}
          </div>
        </div>
        {cta && <ContactCta headline={cta.headline} button={cta.button} />}
      </main>
    );
  }

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
          <p className="mb-4 flex items-center gap-2.5 text-xs font-semibold uppercase tracking-widest text-brand-sky">
            <span>Our Services</span>
            <span aria-hidden className="text-sm">
              →
            </span>
            <span aria-current="page">{name}</span>
          </p>
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
