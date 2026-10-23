import type { Metadata } from "next";
import Link from "next/link";
import ApplySection from "../components/ApplySection";
import CareerHero3D from "../components/CareerHero3D";
import HiringProcess from "../components/HiringProcess";
import Navbar from "../components/Navbar";
import OpenPositions from "../components/OpenPositions";

export const metadata: Metadata = {
  title: "Careers | Rizviz",
};

export default function CareersPage() {
  return (
    <main className="relative">
      <Navbar tone="light" />
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

          {/* The scene fills the hero and melts into the page below. */}
          <div
            className="absolute inset-0"
            style={{
              maskImage:
                "linear-gradient(to bottom, black 0%, black 72%, rgba(0,0,0,0.6) 84%, rgba(0,0,0,0.2) 94%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(to bottom, black 0%, black 72%, rgba(0,0,0,0.6) 84%, rgba(0,0,0,0.2) 94%, transparent 100%)",
            }}
          >
            <CareerHero3D />
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
              <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-brand-blue">
                Career
              </p>
              <h1 className="text-4xl font-bold leading-tight text-brand-navy sm:text-5xl lg:text-6xl">
                Build what’s next.
                <br />
                <span className="bg-gradient-to-r from-brand-blue to-brand-sky bg-clip-text text-transparent">
                  Grow with RIZVIZ.
                </span>
              </h1>
              <Link
                href="#open-roles"
                className="mt-10 inline-block rounded-full border-2 border-brand-blue bg-brand-blue px-8 py-3.5 font-semibold text-white transition-colors duration-500 ease-in-out hover:bg-transparent hover:text-brand-blue"
              >
                View Open Roles
              </Link>
            </div>
          </div>
        </section>
        {/* The change to blue starts in the last sixth of the hero, then eases
          into navy. */}
        <div aria-hidden className="relative z-[1] h-0">
          <div
            className="pointer-events-none absolute inset-x-0 -top-32 h-[54.5rem]"
            style={{
              background:
                "linear-gradient(180deg, rgba(255,255,255,0) 0px, rgba(234,244,252,0.6) 40px, rgba(205,229,246,0.9) 80px, #9cc6e8 115px, #5f9fd0 160px, #3a82b8 215px, #2a6aa0 270px, #1d5a92 330px, #184d80 380px, #143f68 450px, #113455 520px, #0f2b45 590px, #0d2439 660px, #0c2032 730px, #0b1e2e 800px, #0b1d2d 870px)",
            }}
          />
        </div>

        {/* Glowing navy for the rest of the page, with blue light down the sides. */}
        <div className="relative z-[2]">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background: [
                "linear-gradient(0deg, #0b1d2d 0px, transparent 240px)",
                "radial-gradient(900px 700px at 100% 6%, rgba(112,199,244,0.16), transparent 70%)",
                "radial-gradient(900px 800px at 0% 28%, rgba(50,159,224,0.22), transparent 70%)",
                "radial-gradient(900px 800px at 100% 52%, rgba(50,159,224,0.24), transparent 70%)",
                "radial-gradient(900px 800px at 0% 78%, rgba(112,199,244,0.18), transparent 70%)",
              ].join(", "),
              maskImage:
                "linear-gradient(to bottom, transparent 0px, black 600px)",
              WebkitMaskImage:
                "linear-gradient(to bottom, transparent 0px, black 600px)",
            }}
          />
          <OpenPositions />

          <HiringProcess />

          <ApplySection />
        </div>
      </div>{" "}
    </main>
  );
}
