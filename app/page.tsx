import Link from "next/link";
import HeroScene3D from "./components/HeroScene3D";
import AboutShowcase from "./components/AboutShowcase";
import Navbar from "./components/Navbar";
import Capabilities from "./components/Capabilities";
import Clients from "./components/Clients";
import FeaturedProducts from "./components/FeaturedProducts";
import HowWeWork from "./components/HowWeWork";
import ContactCta from "./components/ContactCta";

export default function Home() {
  return (
    <main className="relative">
      <Navbar tone="light" />
      <div className="relative overflow-hidden bg-brand-navy">
        <section className="relative isolate flex min-h-screen w-full items-center overflow-hidden bg-white">
          {/* White, with pale blue light in the corners and a faint dot grid. */}
          <div
            aria-hidden
            className="absolute inset-0 -z-10"
            style={{
              background: [
                "radial-gradient(60% 70% at 88% 18%, rgba(112,199,244,0.32), transparent 70%)",
                "radial-gradient(50% 60% at 10% 100%, rgba(181,229,255,0.45), transparent 70%)",
                "radial-gradient(40% 40% at 55% 0%, rgba(50,159,224,0.10), transparent 70%)",
              ].join(", "),
            }}
          />
          <div
            aria-hidden
            className="absolute inset-0 -z-10 opacity-60"
            style={{
              backgroundImage:
                "radial-gradient(rgba(40,91,122,0.18) 1px, transparent 1.4px)",
              backgroundSize: "28px 28px",
              maskImage:
                "radial-gradient(75% 85% at 70% 45%, black, transparent 80%)",
              WebkitMaskImage:
                "radial-gradient(75% 85% at 70% 45%, black, transparent 80%)",
            }}
          />

          {/* The 3D scene fills the whole hero. */}
          <HeroScene3D />
          {/* A soft blue wash over the text side, so the words stay easy to
            read over the scene. */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(214,235,250,0.55)_0%,rgba(214,235,250,0.9)_30%,rgba(214,235,250,0.9)_58%,rgba(214,235,250,0)_80%)] lg:bg-[linear-gradient(90deg,rgba(207,230,247,0.96)_0%,rgba(207,230,247,0.88)_26%,rgba(207,230,247,0.55)_44%,rgba(207,230,247,0)_62%)]"
          />

          <div className="relative mx-auto grid w-full max-w-7xl items-center gap-10 px-6 pb-24 pt-32 sm:px-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-6 lg:pb-28">
            <div className="max-w-xl text-left">
              <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-brand-blue">
                Welcome to Rizviz
              </p>
              <h1 className="text-4xl font-bold leading-tight text-brand-navy sm:text-5xl lg:text-6xl">
                Technology built around{" "}
                <span className="bg-gradient-to-r from-brand-blue to-brand-sky bg-clip-text text-transparent">
                  business.
                </span>
              </h1>
              <p className="mt-6 max-w-md text-base leading-relaxed text-brand-slate sm:text-lg">
                Hardware and software working as one: engineered, connected and
                built around the way you run your business.
              </p>
              <a
                href="#capabilities"
                className="mt-10 inline-block rounded-full border-2 border-brand-blue bg-brand-blue px-8 py-3.5 font-semibold text-white transition-colors duration-500 ease-in-out hover:bg-transparent hover:text-brand-blue"
              >
                Explore our capabilities
              </a>
            </div>

            <div aria-hidden className="hidden min-h-[28rem] lg:block" />
          </div>
        </section>

        {/* The colour change straddles the join: it starts in the last sixth of
          the hero and finishes about halfway down "Who we are", quickly and
          smoothly, after which the page stays navy. The marker has no height;
          the band hangs 10rem above it and 20rem below. */}
        <div aria-hidden className="relative z-[1] h-0">
          <div
            className="pointer-events-none absolute inset-x-0 -top-40 h-[54.5rem]"
            style={{
              background:
                "linear-gradient(180deg, rgba(255,255,255,0) 0px, rgba(234,244,252,0.6) 40px, rgba(205,229,246,0.9) 80px, #9cc6e8 115px, #5f9fd0 160px, #3a82b8 215px, #2a6aa0 270px, #1d5a92 330px, #184d80 380px, #143f68 450px, #113455 520px, #0f2b45 590px, #0d2439 660px, #0c2032 730px, #0b1e2e 800px, #0b1d2d 870px)",
            }}
          />
        </div>

        <section
          id="about"
          className="relative isolate z-[2] w-full overflow-hidden"
        >
          {/* A touch of the same side glow used further down the page, so this
            section reads as part of it and not a separate block. */}
          <div
            aria-hidden
            className="absolute inset-0 -z-10"
            style={{
              background: [
                "linear-gradient(0deg, #0b1d2d 0%, transparent 22%)",
                "radial-gradient(700px 600px at 0% 30%, rgba(50,159,224,0.2), transparent 70%)",
                "radial-gradient(800px 700px at 100% 85%, rgba(112,199,244,0.16), transparent 70%)",
              ].join(", "),
            }}
          />
          <div className="grid md:min-h-[40rem] md:grid-cols-[30%_70%]">
            <div className="flex flex-col justify-center px-6 py-16 sm:px-10 md:py-24 md:pl-[clamp(2.5rem,calc((100vw-80rem)/2+2.5rem),7.5rem)] md:pr-8">
              <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-brand-ice">
                Who we are
              </p>
              <h2 className="text-3xl font-bold leading-tight text-white sm:text-4xl">
                Expertise that moves your{" "}
                <span className="text-brand-ice">business forward.</span>
              </h2>
              <p className="mt-6 text-sm leading-relaxed text-brand-ice/90 sm:text-base">
                Rizviz brings together expertise in software, AI, data, and
                cloud technologies to build practical digital solutions. We work
                closely with your team to understand your operations and develop
                systems that support the way you work. Our engineers,
                developers, and technology specialists collaborate across
                disciplines to bring each solution to life.
              </p>
              <Link
                href="/about"
                className="mt-8 inline-block self-start rounded-full border-2 border-brand-blue bg-brand-blue px-8 py-3.5 font-semibold text-white transition-colors duration-500 ease-in-out hover:bg-transparent"
              >
                More about us
              </Link>
            </div>

            <div className="px-6 pb-16 sm:px-10 md:p-0 md:py-10">
              <AboutShowcase />
            </div>
          </div>
        </section>
      </div>

      {/* Clients, Capabilities, Featured Products and How We Work share one continuous backdrop:
          navy with soft blue light pooling down both sides, ending at the closing call to action. */}
      <div className="relative isolate">
        <div
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{
            background: [
              "linear-gradient(0deg, #0b1d2d 0px, transparent 240px)",
              "linear-gradient(180deg, #0b1d2d 0px, transparent 240px)",
              "radial-gradient(900px 700px at 0% 6%, rgba(50,159,224,0.26), transparent 70%)",
              "radial-gradient(900px 800px at 100% 18%, rgba(112,199,244,0.22), transparent 70%)",
              "radial-gradient(900px 800px at 0% 36%, rgba(50,159,224,0.24), transparent 70%)",
              "radial-gradient(900px 800px at 100% 54%, rgba(50,159,224,0.26), transparent 70%)",
              "radial-gradient(900px 800px at 0% 72%, rgba(112,199,244,0.22), transparent 70%)",
              "radial-gradient(1100px 700px at 50% 96%, rgba(40,91,122,0.4), transparent 75%)",
              "linear-gradient(180deg, #0b1d2d, #0b1d2d)",
            ].join(", "),
          }}
        />
        <Clients />

        <Capabilities />

        <FeaturedProducts />

        <HowWeWork />
      </div>

      <ContactCta />
    </main>
  );
}
