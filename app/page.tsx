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
      <Navbar tone="dark" />
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
            <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
              Technology built around{" "}
              <span className="text-brand-ice">business.</span>
            </h1>
            <a
              href="#capabilities"
              className="mt-10 inline-block rounded-full border-2 border-brand-sky/40 bg-brand-navy px-8 py-3.5 font-semibold text-white transition-colors duration-500 ease-in-out hover:border-brand-ice hover:bg-brand-steel"
            >
              Explore our capabilities
            </a>
          </div>
        </section>

        <section
          id="about"
          className="relative isolate z-[2] w-full overflow-hidden"
        >
          {/* Ice-blue white page, with navy glowing in from both sides. It fades to navy at the top, where it meets the
            dark hero, and runs straight on into the next section below. */}
          <div
            aria-hidden
            className="absolute inset-0 -z-10"
            style={{
              background: [
                "linear-gradient(180deg, #0b1d2d 0%, transparent 10%)",
                "radial-gradient(650px 520px at 0% 38%, rgba(11,29,45,0.22), transparent 70%)",
                "radial-gradient(650px 520px at 100% 45%, rgba(11,29,45,0.22), transparent 70%)",
                "linear-gradient(180deg, #f4faff 0%, #e4f2fc 100%)",
              ].join(", "),
            }}
          />
          <div className="mx-auto grid max-w-7xl px-6 sm:px-10 md:min-h-[44rem] md:grid-cols-2">
            <div className="flex flex-col justify-center py-16 md:py-24 md:pr-8">
              <h2 className="text-5xl font-extrabold leading-none tracking-tight text-brand-navy sm:text-6xl lg:text-7xl">
                Who we are
              </h2>
              <p className="mt-8 text-sm leading-relaxed text-brand-navy/80 sm:text-base">
                Rizviz brings together expertise in software, AI, data, and
                cloud technologies to build practical digital solutions. We work
                closely with your team to understand your operations and develop
                systems that support the way you work. Our engineers,
                developers, and technology specialists collaborate across
                disciplines to bring each solution to life.
              </p>
              <Link
                href="/about"
                className="glass-navy mt-8 inline-block self-start rounded-full px-8 py-3.5 font-semibold text-white transition duration-500 ease-in-out hover:brightness-125"
              >
                More about us
              </Link>
            </div>

            <div className="pb-16 md:py-10">
              <AboutShowcase />
            </div>
          </div>
        </section>
      </div>

      {/* Clients, Capabilities, Featured Products and How We Work share one continuous backdrop:
          the same ice-blue white as "Who we are", with navy glowing in from alternating sides, running
          straight on from the section above and fading to navy at the bottom, where the closing call to
          action begins. */}
      <div className="relative isolate">
        <div
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{
            background: [
              "linear-gradient(0deg, #0b1d2d 0px, transparent 200px)",
              "radial-gradient(800px 700px at 0% 8%, rgba(11,29,45,0.2), transparent 70%)",
              "radial-gradient(800px 700px at 100% 22%, rgba(11,29,45,0.2), transparent 70%)",
              "radial-gradient(800px 700px at 0% 40%, rgba(11,29,45,0.2), transparent 70%)",
              "radial-gradient(800px 700px at 100% 58%, rgba(11,29,45,0.2), transparent 70%)",
              "radial-gradient(800px 700px at 0% 76%, rgba(11,29,45,0.2), transparent 70%)",
              "radial-gradient(800px 700px at 100% 92%, rgba(11,29,45,0.2), transparent 70%)",
              "linear-gradient(180deg, #e4f2fc 0%, #f4faff 50%, #e4f2fc 100%)",
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
