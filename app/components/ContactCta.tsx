import Image from "next/image";
import ctaImage from "../images/cta.png";
import ContactButton from "./ContactButton";

export default function ContactCta() {
  return (
    <section
      id="contact-cta"
      className="relative isolate flex w-full items-center overflow-hidden bg-white"
    >
      <Image
        src={ctaImage}
        alt=""
        fill
        sizes="100vw"
        className="-z-10 object-cover object-top"
      />

      <div className="mx-auto flex w-full max-w-3xl flex-col items-center px-6 py-16 text-center sm:px-10 md:py-20">
        <h2 className="text-3xl font-semibold leading-tight text-brand-navy sm:text-4xl lg:text-5xl">
          Let’s discuss your project.
        </h2>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-brand-slate sm:text-lg">
          Tell us what you’re planning. We’ll help you define the next steps.
        </p>
        <ContactButton className="mt-10 inline-block rounded-full border-2 border-brand-blue bg-brand-blue px-8 py-3.5 font-semibold text-white transition-colors duration-500 ease-in-out hover:bg-transparent hover:text-brand-blue">
          Start a conversation
        </ContactButton>
      </div>
    </section>
  );
}
