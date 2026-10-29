import Link from "next/link";
import Image from "next/image";
import heroSkyline from "./images/hero-skyline.png";
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
          {/* The skyline photo fills the whole hero. */}
          <Image
            src={heroSkyline}
            alt=""
            fill
            priority
            sizes="100vw"
            className="-z-10 object-cover object-bottom"
          />
          {/* The same gradient the "Who we are" section starts with, at 20% so the join feels continuous
            and the words stay easy to read. */}
          <div
            aria-hidden
            className="absolute inset-0 -z-10 opacity-20"
            style={{
              background: [
                "linear-gradient(0deg, #0b1d2d 0%, transparent 22%)",
                "radial-gradient(700px 600px at 0% 30%, rgba(50,159,224,0.2), transparent 70%)",
                "radial-gradient(800px 700px at 100% 85%, rgba(112,199,244,0.16), transparent 70%)",
              ].join(", "),
            }}
          />

          <div className="relative mx-auto flex w-full max-w-4xl flex-col items-center px-6 pb-32 pt-32 text-center sm:px-10 lg:pb-40">
            <h1 className="text-4xl font-bold leading-tight text-[#252B36] sm:text-5xl lg:text-6xl">
              Technology built around{" "}
              <span className="bg-[linear-gradient(90deg,#3a7f80_0%,#0b1d2d_12%,#0b1d2d_66%,#285b7a_93%,#3a7f80_100%)] bg-clip-text text-transparent">
                business.
              </span>
            </h1>
            <a
              href="#capabilities"
              className="mt-10 inline-block rounded-full border-2 border-transparent bg-origin-border bg-[linear-gradient(90deg,#3a7f80_0%,#0b1d2d_12%,#0b1d2d_66%,#285b7a_93%,#3a7f80_100%)] px-8 py-3.5 font-semibold text-white transition duration-500 ease-in-out hover:brightness-150 hover:shadow-lg"
            >
              Explore our capabilities
            </a>
          </div>
        </section>

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
          <div className="grid md:min-h-[44rem] md:grid-cols-2">
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

            <div className="px-6 pb-16 sm:px-10 md:p-0 md:py-10 md:pr-[clamp(2.5rem,calc((100vw-80rem)/2+2.5rem),7.5rem)]">
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
