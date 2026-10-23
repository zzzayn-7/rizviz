import Image from "next/image";
import type { ReactNode } from "react";
import ctaImage from "../images/cta.png";
import ContactButton from "./ContactButton";

// The closing call to action. A photograph of a meeting fills the section, under a navy-to-white change. It starts out navy, like the section above it,
// and from about a third of the way down turns steadily lighter blue; the footer below
// carries the change on until the page is completely white.
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
      className="relative isolate flex w-full items-start justify-center overflow-hidden"
    >
      <Image
        src={ctaImage}
        alt=""
        fill
        sizes="100vw"
        className="-z-20 object-cover object-center"
      />
      {/* The navy-to-white change lies over the photograph: solid navy at the
          top to meet the section above, clear enough in between for the room
          to show through, and solid again at the bottom where the footer
          carries the change on to white. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(180deg, rgba(11,29,45,1) 0%, rgba(11,29,45,0.92) 12%, rgba(12,34,53,0.82) 28%, rgba(16,48,78,0.72) 45%, rgba(21,66,109,0.68) 60%, rgba(28,88,143,0.74) 74%, rgba(38,101,156,0.86) 86%, rgba(51,120,174,0.96) 94%, rgba(74,142,194,1) 100%)",
        }}
      />
      <div className="relative isolate mx-auto flex w-full max-w-3xl flex-col items-center px-6 pb-20 pt-24 text-center sm:px-10 md:pb-24 md:pt-32">
        {/* A very light blur behind the words only, feathered at its edges so
            no box shows, to keep them easy to read over the photograph. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 -z-10 bottom-16 top-20 backdrop-blur-[3px] md:bottom-20 md:top-28"
          style={{
            maskImage:
              "radial-gradient(closest-side, black 55%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(closest-side, black 55%, transparent 100%)",
          }}
        />
        <h2 className="text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-5xl">
          {headline}
        </h2>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-brand-ice/90 sm:text-lg">
          {body}
        </p>
        {actions ?? (
          <ContactButton className="mt-10 inline-block rounded-full border-2 border-white bg-white px-8 py-3.5 font-semibold text-brand-navy transition-colors duration-500 ease-in-out hover:bg-transparent hover:text-white">
            {button}
          </ContactButton>
        )}
      </div>{" "}
    </section>
  );
}
