import type { Metadata } from "next";
import Image from "next/image";
import Navbar from "../components/Navbar";
import Leadership from "../components/Leadership";
import aboutHero from "../images/about-hero.png";
import whoWeAre from "../images/p2-s1.png";
import reach from "../images/p2-s2.png";

export const metadata: Metadata = {
  title: "About | Rizviz",
};

export default function AboutPage() {
  return (
    <main className="relative">
      <Navbar />
      <section className="relative isolate flex min-h-[78vh] w-full items-center overflow-hidden bg-brand-navy">
        <Image
          src={aboutHero}
          alt=""
          fill
          priority
          sizes="100vw"
          className="-z-20 object-cover object-[75%_bottom]"
        />
        {/* Navy shade over the whole image, lifting around the people so
            they stay clear and deepening gradually towards the edges. */}
        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(ellipse 55% 65% at 68% 57%, rgba(11,29,45,0) 0%, rgba(11,29,45,0.25) 45%, rgba(11,29,45,0.7) 80%, rgba(11,29,45,0.85) 100%)",
          }}
        />

        {/* A light black vignette over the navy, only at the edges and corners. */}
        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(ellipse farthest-corner at 50% 50%, rgba(0,0,0,0) 55%, rgba(0,0,0,0.15) 78%, rgba(0,0,0,0.4) 100%)",
          }}
        />

        <div className="mx-auto flex w-full max-w-7xl flex-col items-start px-6 py-24 text-left sm:px-10">
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-brand-sky">
            About Rizviz
          </p>
          <h1 className="max-w-3xl text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
            The people behind
            <br />
            <span className="text-brand-ice">your technology.</span>
          </h1>
        </div>
      </section>

      <section
        id="who-we-are"
        className="relative isolate w-full overflow-hidden bg-white py-20 sm:py-24"
      >
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 sm:px-10 md:grid-cols-2 md:gap-16">
          <div className="max-w-xl">
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-brand-blue">
              Who we are
            </p>
            <h2 className="text-3xl font-semibold leading-tight text-brand-navy sm:text-4xl lg:text-5xl">
              Technical depth.
              <br />A practical approach.
            </h2>
            <p className="mt-6 text-base leading-relaxed text-brand-slate sm:text-lg">
              Rizviz is a technology company developing software, intelligent
              applications, and enterprise solutions around real business needs.
              Our expertise spans AI, data, cloud infrastructure, and
              application development, allowing us to connect different parts of
              a business through technology.
            </p>
            <p className="mt-5 text-base leading-relaxed text-brand-slate sm:text-lg">
              Our engineers, developers, and specialists work across disciplines
              and closely with clients. We take time to understand how your
              business operates, define what the solution needs to achieve, and
              keep that purpose central throughout development.
            </p>
          </div>

          {/* The frame clips the image so it can zoom slightly on hover. */}
          <div className="group overflow-hidden rounded-3xl shadow-xl ring-1 ring-brand-navy/10">
            <Image
              src={whoWeAre}
              alt="Rizviz engineers working at their desks"
              sizes="(min-width: 768px) 50vw, 100vw"
              className="h-auto w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
          </div>
        </div>
      </section>

      <section
        id="our-reach"
        className="relative isolate flex w-full items-center overflow-hidden bg-brand-navy"
      >
        {/* The navy of the section carries over the picture's right edge and
            fades out gradually as it moves across the image. */}
        <Image
          src={reach}
          alt="The American and Pakistani flags outside a white building"
          sizes="(min-width: 768px) 35vw, 100vw"
          style={{
            maskImage: "linear-gradient(to left, transparent, black 16%)",
            WebkitMaskImage: "linear-gradient(to left, transparent, black 16%)",
          }}
          className="absolute left-0 top-0 -z-10 h-full w-full object-cover object-[50%_10%] opacity-30 md:w-[35%] md:opacity-100"
        />

        <div className="mx-auto w-full max-w-7xl px-6 py-20 sm:px-10 md:py-28">
          <div className="max-w-3xl md:ml-auto md:max-w-[min(48rem,calc(65vw_-_5rem))]">
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
              <span className="font-semibold">Pakistan</span>, we have worked
              with established institutions including{" "}
              <span className="font-semibold">TDCP</span> and{" "}
              <span className="font-semibold">Jinnah Hospital</span>, supporting
              technology needs across different sectors.
            </p>
          </div>
        </div>
      </section>

      <Leadership />
    </main>
  );
}
