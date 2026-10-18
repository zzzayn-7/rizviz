import type { Metadata } from "next";
import Image from "next/image";
import Navbar from "../components/Navbar";
import ServiceSections from "../components/ServiceSections";
import servicesHero from "../images/services-hero.png";
import connected from "../images/p3-s1.png";

export const metadata: Metadata = {
  title: "Services | Rizviz",
};

export default function ServicesPage() {
  return (
    <main className="relative">
      <Navbar />
      <section className="relative isolate flex min-h-[78vh] w-full items-center overflow-hidden bg-brand-navy">
        <Image
          src={servicesHero}
          alt="An engineer working at a desk with code and dashboards on two monitors"
          fill
          priority
          sizes="100vw"
          className="-z-10 object-cover object-[75%_center]"
        />

        {/* Navy shade behind the text on the left and the navbar on top. */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-brand-navy/85 via-brand-navy/50 to-transparent to-75%" />
        <div className="absolute inset-x-0 top-0 -z-10 h-40 bg-gradient-to-b from-brand-navy/70 to-transparent" />

        <div className="mx-auto flex w-full max-w-7xl flex-col items-start px-6 py-24 text-left sm:px-10">
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-brand-sky">
            Our Services
          </p>
          <h1 className="max-w-5xl text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
            Engineering solutions.
            <br />
            <span className="text-brand-ice">
              Solving real business
              <br />
              challenges.
            </span>
          </h1>
        </div>
      </section>

      <section className="w-full bg-white py-16 sm:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 sm:px-10 md:grid-cols-[1.15fr_1fr] md:gap-16">
          <div>
            <h2 className="text-3xl font-semibold leading-tight text-brand-navy sm:text-4xl lg:text-[2.75rem]">
              Connected expertise.
              <br />
              Comprehensive solutions.
            </h2>
            <p className="mt-6 text-base leading-relaxed text-brand-slate sm:text-lg">
              Rizviz brings together expertise across AI, data, cloud,
              enterprise platforms, and application development. From a focused
              technical requirement to a complete business system, we help
              organizations build, connect, and improve the technology they rely
              on.
            </p>
          </div>

          {/* The frame clips the image so it can zoom slightly on hover. */}
          <div className="group overflow-hidden rounded-3xl shadow-xl ring-1 ring-brand-navy/10">
            <Image
              src={connected}
              alt="A city skyline at night with connected icons for AI, data, DevOps, software, mobile and web"
              sizes="(min-width: 768px) 50vw, 100vw"
              className="h-auto w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
          </div>
        </div>
      </section>

      <ServiceSections />
    </main>
  );
}
