import Image, { type StaticImageData } from "next/image";
import ContactCta from "./ContactCta";
import Navbar from "./Navbar";

// Shared layout for the individual service pages: navbar plus a hero the
// same size as the About hero. Services without a hero image yet get a plain
// navy hero. A service can instead give a `scene`, a 3D picture for a light
// hero in the style of the Home and About pages.
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
  // A scene that fills a light hero; it replaces the picture and navy hero.
  scene?: React.ReactNode;
  // The closing call to action under a scene hero: its line and its button.
  cta?: { headline: string; button: string };
  // Sections shown below the hero.
  children?: React.ReactNode;
}) {
  if (scene) {
    return (
      <main className="relative">
        <Navbar tone="light" />
        {/* One backdrop for the whole page: a white hero, a quick change to
            blue across the join with the first section, then glowing navy to
            the end. */}
        <div className="relative overflow-x-clip bg-brand-navy">
          <section className="relative isolate flex min-h-[34rem] w-full items-end overflow-hidden bg-white lg:min-h-[44rem] lg:items-center">
            {/* Pale blue light in the corners and a faint dot grid. */}
            <div
              aria-hidden
              className="absolute inset-0 -z-10"
              style={{
                background: [
                  "radial-gradient(55% 60% at 88% 10%, rgba(112,199,244,0.34), transparent 70%)",
                  "radial-gradient(45% 50% at 6% 30%, rgba(181,229,255,0.45), transparent 70%)",
                ].join(", "),
              }}
            />
            <div
              aria-hidden
              className="absolute inset-0 -z-10 opacity-60"
              style={{
                backgroundImage:
                  "radial-gradient(rgba(40,91,122,0.16) 1px, transparent 1.4px)",
                backgroundSize: "28px 28px",
                maskImage:
                  "radial-gradient(70% 65% at 70% 40%, black, transparent 80%)",
                WebkitMaskImage:
                  "radial-gradient(70% 65% at 70% 40%, black, transparent 80%)",
              }}
            />

            {/* The scene fills the hero and melts into the page at the bottom. */}
            <div
              className="absolute inset-0"
              style={{
                maskImage:
                  "linear-gradient(to bottom, black 0%, black 72%, rgba(0,0,0,0.6) 84%, rgba(0,0,0,0.2) 94%, transparent 100%)",
                WebkitMaskImage:
                  "linear-gradient(to bottom, black 0%, black 72%, rgba(0,0,0,0.6) 84%, rgba(0,0,0,0.2) 94%, transparent 100%)",
              }}
            >
              {scene}
            </div>
            {/* A soft blue wash over the text side keeps the words readable. */}
            <div
              aria-hidden
              style={{
                maskImage:
                  "linear-gradient(to bottom, black 0%, black 40%, rgba(0,0,0,0.6) 52%, rgba(0,0,0,0.25) 63%, rgba(0,0,0,0.07) 72%, transparent 80%)",
                WebkitMaskImage:
                  "linear-gradient(to bottom, black 0%, black 40%, rgba(0,0,0,0.6) 52%, rgba(0,0,0,0.25) 63%, rgba(0,0,0,0.07) 72%, transparent 80%)",
              }}
              className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(214,235,250,0)_0%,rgba(214,235,250,0)_46%,rgba(214,235,250,0.85)_58%,rgba(214,235,250,0.85)_72%,rgba(214,235,250,0)_92%)] lg:bg-[linear-gradient(90deg,rgba(207,230,247,0.96)_0%,rgba(207,230,247,0.88)_26%,rgba(207,230,247,0.5)_44%,rgba(207,230,247,0)_62%)]"
            />

            <div className="relative mx-auto w-full max-w-7xl px-6 pb-40 pt-[21rem] sm:px-10 lg:pb-24 lg:pt-32">
              <div className="max-w-xl text-left">
                <p className="mb-4 flex items-center gap-2.5 text-xs font-semibold uppercase tracking-widest text-brand-blue">
                  <span>Our Services</span>
                  <span aria-hidden className="text-sm">
                    →
                  </span>
                  <span aria-current="page">{name}</span>
                </p>
                <h1 className="text-balance text-4xl font-bold leading-tight text-brand-navy sm:text-5xl lg:text-6xl">
                  {typeof headline === "string" ? (
                    headline
                  ) : (
                    <>
                      {headline[0]}
                      <br />
                      <span className="bg-gradient-to-r from-brand-blue to-brand-sky bg-clip-text text-transparent">
                        {headline[1]}
                      </span>
                    </>
                  )}
                </h1>
              </div>
            </div>
          </section>

          {/* The change to blue starts in the last sixth of the hero and is done
            about halfway down the first section, then eases into navy. */}
          <div aria-hidden className="relative z-[1] h-0">
            <div
              className="pointer-events-none absolute inset-x-0 -top-32 h-[54.5rem]"
              style={{
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0) 0px, rgba(234,244,252,0.6) 40px, rgba(205,229,246,0.9) 80px, #9cc6e8 115px, #5f9fd0 160px, #3a82b8 215px, #2a6aa0 270px, #1d5a92 330px, #184d80 380px, #143f68 450px, #113455 520px, #0f2b45 590px, #0d2439 660px, #0c2032 730px, #0b1e2e 800px, #0b1d2d 870px)",
              }}
            />
          </div>

          {/* Everything below the hero shares this glowing navy, with blue light
            pooling down both sides. */}
          <div className="relative z-[2]">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                background: [
                  "linear-gradient(0deg, #0b1d2d 0px, transparent 240px)",
                  "radial-gradient(900px 700px at 100% 12%, rgba(112,199,244,0.16), transparent 70%)",
                  "radial-gradient(900px 800px at 0% 30%, rgba(50,159,224,0.22), transparent 70%)",
                  "radial-gradient(900px 800px at 100% 48%, rgba(50,159,224,0.24), transparent 70%)",
                  "radial-gradient(900px 800px at 0% 68%, rgba(112,199,244,0.18), transparent 70%)",
                  "radial-gradient(1000px 700px at 100% 88%, rgba(50,159,224,0.2), transparent 70%)",
                ].join(", "),
                maskImage:
                  "linear-gradient(to bottom, transparent 0px, black 600px)",
                WebkitMaskImage:
                  "linear-gradient(to bottom, transparent 0px, black 600px)",
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
