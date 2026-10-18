import type { Metadata } from "next";
import Image from "next/image";
import Navbar from "../components/Navbar";
import servicesHero from "../images/services-hero.png";

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
    </main>
  );
}
