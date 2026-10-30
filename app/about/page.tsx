import type { Metadata } from "next";
import Image from "next/image";
import heroSkyline from "../images/hero-skyline.png";
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
      <Navbar tone="dark" />

      {/* One backdrop for the whole page: the night skyline hero, which sinks into navy, then glowing
          navy all the way to the last section. */}
      <div className="relative overflow-hidden bg-brand-navy">
        <section className="relative isolate flex min-h-screen w-full items-center bg-brand-navy">
          {/* The same night skyline as the home page, mirrored so the tall towers frame the other side. */}
          <Image
            src={heroSkyline}
            alt=""
            fill
            priority
            sizes="100vw"
            className="-z-10 -scale-x-100 object-cover object-bottom"
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
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-brand-ice">
              About Rizviz
            </p>
            <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
              The people behind
              <br />
              <span className="text-brand-ice">your technology.</span>
            </h1>
          </div>
        </section>

        {/* Everything below the hero shares one ice-blue white page, with navy glowing in from alternating
            sides, fading to navy at the very bottom where the closing call to action begins. */}
        <div className="relative z-[2]">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background: [
                "linear-gradient(0deg, #0b1d2d 0px, transparent 200px)",
                "radial-gradient(800px 700px at 0% 10%, rgba(11,29,45,0.2), transparent 70%)",
                "radial-gradient(800px 700px at 100% 30%, rgba(11,29,45,0.2), transparent 70%)",
                "radial-gradient(800px 700px at 0% 52%, rgba(11,29,45,0.2), transparent 70%)",
                "radial-gradient(800px 700px at 100% 74%, rgba(11,29,45,0.2), transparent 70%)",
                "radial-gradient(800px 700px at 0% 94%, rgba(11,29,45,0.2), transparent 70%)",
                "linear-gradient(180deg, #f4faff 0%, #e4f2fc 50%, #f4faff 100%)",
              ].join(", "),
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
                  <h2 className="text-5xl font-extrabold leading-none tracking-tight text-brand-navy sm:text-6xl lg:text-7xl">
                    Who we are
                  </h2>
                  <p className="mt-8 text-sm leading-relaxed text-brand-navy/80 sm:text-base">
                    Rizviz is a technology company developing software,
                    intelligent applications, and enterprise solutions around
                    real business needs. Our expertise spans AI, data, cloud
                    infrastructure, and application development, allowing us to
                    connect different parts of a business through technology.
                  </p>
                  <p className="mt-5 text-sm leading-relaxed text-brand-navy/80 sm:text-base">
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
                <h2 className="text-5xl font-extrabold leading-none tracking-tight text-brand-navy sm:text-6xl lg:text-7xl">
                  Our Reach
                </h2>
                <p className="mt-8 text-base leading-relaxed text-brand-navy/80">
                  Rizviz works with organizations in{" "}
                  <span className="font-semibold">Pakistan</span> and the{" "}
                  <span className="font-semibold">United States</span>, bringing
                  technical expertise and a collaborative approach to every
                  engagement.
                </p>
                <p className="mt-5 text-base leading-relaxed text-brand-navy/80">
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
