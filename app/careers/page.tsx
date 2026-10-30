import type { Metadata } from "next";
import ScrollButton from "../components/ScrollButton";
import ApplySection from "../components/ApplySection";
import Image from "next/image";
import heroSkyline from "../images/hero-skyline.png";
import HiringProcess from "../components/HiringProcess";
import Navbar from "../components/Navbar";
import OpenPositions from "../components/OpenPositions";

export const metadata: Metadata = {
  title: "Careers | Rizviz",
};

export default function CareersPage() {
  return (
    <main className="relative">
      <Navbar tone="dark" />
      <div className="relative overflow-x-clip bg-brand-navy">
        <section className="relative isolate flex min-h-screen w-full items-center overflow-hidden bg-brand-navy">
          {/* The night skyline, mirrored and drawn a little closer, so it differs from the other pages. */}
          <Image
            src={heroSkyline}
            alt=""
            fill
            priority
            sizes="100vw"
            className="-z-10 object-cover object-bottom"
            style={{ transform: "scaleX(-1.12) scaleY(1.12)", transformOrigin: "50% 100%" }}
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
              Career
            </p>
            <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
              Build what’s next.
              <br />
              <span className="text-brand-ice">Grow with RIZVIZ.</span>
            </h1>
            <ScrollButton
              target="open-roles"
              className="mt-10 inline-block rounded-full border-2 border-brand-sky/40 bg-brand-navy px-8 py-3.5 font-semibold text-white transition-colors duration-500 ease-in-out hover:border-brand-ice hover:bg-brand-steel"
            >
              View Open Roles
            </ScrollButton>
          </div>
        </section>

        {/* Everything below the hero shares the ice-blue white page, with navy glowing in from
            alternating sides and fading to navy at the very bottom. */}
        <div className="relative z-[2]">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background: [
                "radial-gradient(800px 700px at 0% 10%, rgba(11,29,45,0.2), transparent 70%)",
                "radial-gradient(800px 700px at 100% 38%, rgba(11,29,45,0.2), transparent 70%)",
                "radial-gradient(800px 700px at 0% 66%, rgba(11,29,45,0.2), transparent 70%)",
                "linear-gradient(180deg, #f4faff 0%, #e4f2fc 50%, #f4faff 100%)",
              ].join(", "),
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
