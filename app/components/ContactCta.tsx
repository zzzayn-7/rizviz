import Image from "next/image";
import type { ReactNode } from "react";
import ctaImage from "../images/cta.png";
import ContactButton from "./ContactButton";

// The closing call to action. A photograph of a meeting fills the section and stays still while the
// page scrolls over it: the picture is fixed to the screen, and the section is a window that only shows
// the part of it that falls inside. No gradient lies over the photograph, only a sheet of flat frosted
// blue glass so the white words stay easy to read.
export default function ContactCta({
  headline = "Let’s discuss your project.",
  body = "Tell us what you’re planning. We’ll help you define the next steps.",
  button = "Start a conversation",
  actions,
}: {
  headline?: ReactNode;
  body?: string;
  button?: string;
  // Replaces the single button, for a section with more than one action.
  actions?: ReactNode;
}) {
  return (
    <section
      id="contact-cta"
      // clip-path makes the section the window that the fixed picture is seen through
      className="relative isolate flex w-full items-start justify-center overflow-hidden [clip-path:inset(0)]"
    >
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-20 h-screen w-full">
        <Image
          src={ctaImage}
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>
      {/* A sheet of frosted blue glass over the photograph: an even blue-navy tint with a light blur and a
          thin bright edge along the top, so the words read clearly. Flat colour, no gradient. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[rgba(18,52,80,0.5)] shadow-[inset_0_1px_0_rgba(181,229,255,0.35)] backdrop-blur-[3px] backdrop-saturate-150"
      />
      <div className="relative isolate mx-auto flex w-full max-w-3xl flex-col items-center px-6 pb-20 pt-24 text-center sm:px-10 md:pb-24 md:pt-32">
        <h2 className="text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-5xl">
          {headline}
        </h2>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-white sm:text-lg">
          {body}
        </p>
        {actions ?? (
          <ContactButton className="btn-glow btn-glow-navy mt-10 inline-block rounded-full bg-white px-8 py-3.5 font-semibold text-brand-navy">
            {button}
          </ContactButton>
        )}
      </div>{" "}
    </section>
  );
}
