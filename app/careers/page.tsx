import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ApplySection from "../components/ApplySection";
import HiringProcess from "../components/HiringProcess";
import Navbar from "../components/Navbar";
import OpenPositions from "../components/OpenPositions";
import WorkingAtRizviz from "../components/WorkingAtRizviz";
import careerHero from "../images/career-hero.png";

export const metadata: Metadata = {
  title: "Careers | Rizviz",
};

export default function CareersPage() {
  return (
    <main className="relative">
      <Navbar />
      <section className="relative isolate flex min-h-[78vh] w-full items-center overflow-hidden bg-brand-navy">
        <Image
          src={careerHero}
          alt="The Rizviz office entrance at night"
          fill
          priority
          sizes="100vw"
          className="-z-20 object-cover object-[75%_top]"
        />
        {/* Navy shade behind the text on the left and the navbar on top, so
            both stay readable over the photo. */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-brand-navy/85 via-brand-navy/45 to-transparent to-70%" />
        <div className="absolute inset-x-0 top-0 -z-10 h-40 bg-gradient-to-b from-brand-navy/80 to-transparent" />

        <div className="mx-auto flex w-full max-w-7xl flex-col items-start px-6 py-24 text-left sm:px-10">
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-brand-sky">
            Career
          </p>
          <h1 className="max-w-3xl text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
            Build what’s next.
            <br />
            <span className="text-brand-ice">Grow with RIZVIZ.</span>
          </h1>
          <Link
            href="#open-roles"
            className="mt-10 inline-block rounded-full border-2 border-brand-blue bg-brand-blue px-8 py-3.5 font-semibold text-white transition-colors duration-500 ease-in-out hover:bg-transparent"
          >
            View Open Roles
          </Link>
        </div>
      </section>

      <OpenPositions />

      <WorkingAtRizviz />

      <HiringProcess />

      <ApplySection />
    </main>
  );
}
