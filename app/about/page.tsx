import type { Metadata } from "next";
import AboutHero3D from "../components/AboutHero3D";
import Navbar from "../components/Navbar";
import ContactCta from "../components/ContactCta";
import Leadership from "../components/Leadership";
import ReachFlags from "../components/ReachFlags";
import WhoWeAreVisual from "../components/WhoWeAreVisual";

export const metadata: Metadata = {
  title: "About | Rizviz",
};

export default function AboutPage() {
  return (
    <main className="relative">
      <Navbar tone="light" />

      {/* One backdrop for the whole page: a white hero, a quick change to
          blue across the join with "Who we are", then glowing navy all the
          way to the last section. */}
      <div className="relative overflow-hidden bg-brand-navy">
        <section className="relative isolate flex min-h-[34rem] w-full items-end bg-white lg:min-h-[44rem] lg:items-center">
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
          {/* The 3D scene fills the hero and melts into the background at
              the bottom, so the next section follows on without a seam. */}
          <div
            className="absolute inset-0"
            style={{
              // Fades in several soft steps, so there is no visible edge.
              maskImage:
                "linear-gradient(to bottom, black 0%, black 68%, rgba(0,0,0,0.7) 78%, rgba(0,0,0,0.35) 88%, rgba(0,0,0,0.1) 95%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(to bottom, black 0%, black 68%, rgba(0,0,0,0.7) 78%, rgba(0,0,0,0.35) 88%, rgba(0,0,0,0.1) 95%, transparent 100%)",
            }}
          >
            <AboutHero3D />
          </div>
          {/* A soft blue wash over the text side keeps the words readable. */}
          <div
            aria-hidden
            style={{
              // The wash is gone well before the hero ends, in soft steps,
              // so it never leaves a lighter band against the deepening blue.
              maskImage:
                "linear-gradient(to bottom, black 0%, black 40%, rgba(0,0,0,0.6) 52%, rgba(0,0,0,0.25) 63%, rgba(0,0,0,0.07) 72%, transparent 80%)",
              WebkitMaskImage:
                "linear-gradient(to bottom, black 0%, black 40%, rgba(0,0,0,0.6) 52%, rgba(0,0,0,0.25) 63%, rgba(0,0,0,0.07) 72%, transparent 80%)",
            }}
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(214,235,250,0)_0%,rgba(214,235,250,0)_46%,rgba(214,235,250,0.85)_58%,rgba(214,235,250,0.85)_72%,rgba(214,235,250,0)_92%)] lg:bg-[linear-gradient(90deg,rgba(207,230,247,0.96)_0%,rgba(207,230,247,0.88)_26%,rgba(207,230,247,0.5)_44%,rgba(207,230,247,0)_62%)]"
          />

          <div className="relative mx-auto w-full max-w-7xl px-6 pb-40 pt-[21rem] sm:px-10 lg:pb-24 lg:pt-32">
            <div className="max-w-xl text-left">
              <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-brand-blue">
                About Rizviz
              </p>
              <h1 className="text-4xl font-bold leading-tight text-brand-navy sm:text-5xl lg:text-6xl">
                The people behind
                <br />
                <span className="bg-gradient-to-r from-brand-blue to-brand-sky bg-clip-text text-transparent">
                  your technology.
                </span>
              </h1>
            </div>
          </div>
        </section>

        {/* The change to blue starts in the last sixth of the hero and is done
            about halfway down "Who we are". The marker has no height; the band
            hangs 8rem above it and 46rem below, easing gently into the navy. */}
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
            pooling down both sides and no edges between the sections. */}
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
                "radial-gradient(1100px 600px at 40% 100%, rgba(40,91,122,0.34), transparent 75%)",
              ].join(", "),
              maskImage:
                "linear-gradient(to bottom, transparent 0px, black 600px)",
              WebkitMaskImage:
                "linear-gradient(to bottom, transparent 0px, black 600px)",
            }}
          />

          <section
            id="who-we-are"
            className="relative w-full pb-28 pt-16 sm:pb-44 sm:pt-24"
          >
            <div className="mx-auto max-w-7xl px-6 sm:px-10">
              {/* Two columns: the heading and both paragraphs stacked on the
                left, and the screen filling the full height of the right. */}
              <div className="grid gap-10 md:grid-cols-2 md:items-stretch md:gap-16">
                <div className="max-w-xl">
                  <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-brand-ice">
                    Who we are
                  </p>
                  <h2 className="text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-5xl">
                    Technical depth.
                    <br />A practical approach.
                  </h2>
                  <p className="mt-6 text-sm leading-relaxed text-white/90 sm:text-base">
                    Rizviz is a technology company developing software,
                    intelligent applications, and enterprise solutions around
                    real business needs. Our expertise spans AI, data, cloud
                    infrastructure, and application development, allowing us to
                    connect different parts of a business through technology.
                  </p>
                  <p className="mt-5 text-sm leading-relaxed text-white/90 sm:text-base">
                    Our engineers, developers, and specialists work across
                    disciplines and closely with clients. We take time to
                    understand how your business operates, define what the
                    solution needs to achieve, and keep that purpose central
                    throughout development.
                  </p>
                </div>

                <div className="min-h-[24rem]">
                  <WhoWeAreVisual />
                </div>
              </div>
            </div>
          </section>

          <section
            id="our-reach"
            className="relative isolate flex w-full items-center overflow-hidden md:min-h-[46rem]"
          >
            {/* The two flags hang from the top on the right, toned into the theme. */}
            <ReachFlags />

            <div className="mx-auto w-full max-w-7xl px-6 pb-28 pt-[28rem] sm:px-10 md:py-44">
              <div className="max-w-3xl md:max-w-[min(42rem,calc(62vw_-_5rem))]">
                <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-brand-sky">
                  Our Reach
                </p>
                <h2 className="text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
                  Local roots.
                  <br />
                  International experience.
                </h2>
                <p className="mt-6 text-base leading-relaxed text-brand-ice/90">
                  Rizviz works with organizations in{" "}
                  <span className="font-semibold">Pakistan</span> and the{" "}
                  <span className="font-semibold">United States</span>, bringing
                  technical expertise and a collaborative approach to every
                  engagement.
                </p>
                <p className="mt-5 text-base leading-relaxed text-brand-ice/90">
                  Our US-based clients include{" "}
                  <span className="font-semibold">FedPoint</span>,{" "}
                  <span className="font-semibold">HoopoeLabs</span>,{" "}
                  <span className="font-semibold">iCloud Technologies</span>,{" "}
                  <span className="font-semibold">Silmun</span>,{" "}
                  <span className="font-semibold">FedCrew</span>, and{" "}
                  <span className="font-semibold">FSR</span>. In{" "}
                  <span className="font-semibold">Pakistan</span>, we have
                  worked with established institutions including{" "}
                  <span className="font-semibold">TDCP</span> and{" "}
                  <span className="font-semibold">Jinnah Hospital</span>,
                  supporting technology needs across different sectors.
                </p>
              </div>
            </div>
          </section>

          <Leadership />
        </div>
      </div>

      <ContactCta />
    </main>
  );
}
