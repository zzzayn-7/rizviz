import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import ContactButton from "./ContactButton";
import type { ReactNode } from "react";

type Props = {
  // On a page whose backdrop is already navy (the AI / ML page): no section
  // backgrounds of its own, white text, and glass cards.
  dark?: boolean;
  // "What we help you achieve": text on the left, a picture or a graphic on
  // the right.
  achieve: {
    label: string;
    headline: string[]; // one entry per line
    body: string;
    image?: StaticImageData;
    imageAlt?: string;
    visual?: ReactNode;
  };
  // "What we deliver": the text stays put while the cards scroll past.
  deliver: {
    label: string;
    headline: string;
    intro: string;
    items: { title: string; description: string }[];
  };
  // "Featured project": a navy section with a link to the project.
  featured: {
    label: string;
    projectName?: string;
    // Show the project name under the headline instead of above it.
    projectNameBelow?: boolean;
    headline: ReactNode;
    body?: string;
    cta: string;
    // A page address, or "contact" to open the contact form.
    href: string;
    image?: StaticImageData;
    imageAlt?: string;
    // A tall phone screenshot: shown narrower so it does not tower over the text.
    imagePortrait?: boolean;
  };
};

const eyebrow = "mb-4 text-xs font-semibold uppercase tracking-widest";
const heading = "text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl";

export default function ServiceDetail({
  dark = false,
  achieve,
  deliver,
  featured,
}: Props) {
  return (
    <>
      {/* What we help you achieve */}
      <section
        className={
          dark
            ? "w-full pb-28 pt-16 sm:pb-44 sm:pt-24"
            : "w-full bg-white py-16 sm:py-24"
        }
      >
        <div
          className={`mx-auto grid max-w-7xl gap-12 px-6 sm:px-10 md:grid-cols-[1.1fr_1fr] md:gap-16 ${
            achieve.visual ? "md:items-stretch" : "items-center"
          }`}
        >
          <div>
            <p
              className={`${eyebrow} ${dark ? "text-brand-ice" : "text-brand-blue"}`}
            >
              {achieve.label}
            </p>
            <h2
              className={`${heading} ${dark ? "text-white" : "text-brand-navy"}`}
            >
              {achieve.headline.map((line, i) => (
                <span key={line}>
                  {i > 0 && <br />}
                  {line}
                </span>
              ))}
            </h2>
            <p
              className={`mt-6 text-base leading-relaxed sm:text-lg ${dark ? "text-white/90" : "text-brand-slate"}`}
            >
              {achieve.body}
            </p>
          </div>

          {achieve.visual ? (
            <div className="min-h-[24rem]">{achieve.visual}</div>
          ) : (
            achieve.image && (
              // The frame clips the image so it can zoom slightly on hover.
              <div className="group overflow-hidden rounded-3xl shadow-xl ring-1 ring-brand-navy/10">
                <Image
                  src={achieve.image}
                  alt={achieve.imageAlt ?? ""}
                  sizes="(min-width: 768px) 45vw, 100vw"
                  className="h-auto w-full object-cover"
                />
              </div>
            )
          )}
        </div>
      </section>

      {/* What we deliver: the text stays put on the left while the cards
          scroll past on the right, from the center of the page to the right
          margin. */}
      <section
        className={
          dark ? "w-full py-16 sm:py-28" : "w-full bg-[#F2F8FC] py-16 sm:py-24"
        }
      >
        <div className="mx-auto grid max-w-7xl gap-12 px-6 sm:px-10 md:grid-cols-2 md:gap-16">
          <div className="max-w-md md:sticky md:top-32 md:self-start">
            <p
              className={`${eyebrow} ${dark ? "text-brand-sky" : "text-brand-blue"}`}
            >
              {deliver.label}
            </p>
            <h2
              className={`${heading} ${dark ? "text-white" : "text-brand-navy"}`}
            >
              {deliver.headline}
            </h2>
            <p
              className={`mt-6 text-base leading-relaxed sm:text-lg ${dark ? "text-brand-ice/85" : "text-brand-slate"}`}
            >
              {deliver.intro}
            </p>
          </div>

          <ul className="flex flex-col gap-6 md:gap-8">
            {deliver.items.map((item, i) => (
              <li key={item.title}>
                <article
                  className={`flex min-h-[13rem] items-start gap-6 rounded-2xl border p-7 transition-all duration-300 hover:border-brand-sky sm:gap-8 sm:p-9 ${
                    dark
                      ? "border-white/15 bg-white/[0.06] backdrop-blur-md hover:bg-white/[0.1]"
                      : "border-[#D3DFE9] bg-white hover:shadow-lg"
                  }`}
                >
                  <span className="text-4xl font-semibold leading-none text-brand-sky">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3
                      className={`text-xl font-semibold sm:text-2xl ${dark ? "text-white" : "text-brand-navy"}`}
                    >
                      {item.title}
                    </h3>
                    <p
                      className={`mt-3 text-base leading-relaxed ${dark ? "text-brand-ice/80" : "text-brand-slate"}`}
                    >
                      {item.description}
                    </p>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Featured project */}
      <section
        className={
          dark
            ? "w-full pb-24 pt-16 sm:pb-32 sm:pt-28"
            : "w-full bg-brand-navy py-16 sm:py-24"
        }
      >
        <div
          className={`mx-auto grid max-w-7xl items-center gap-12 px-6 sm:px-10 md:gap-16 ${
            featured.image ? "md:grid-cols-2" : ""
          }`}
        >
          <div className={featured.image ? undefined : "max-w-3xl"}>
            <p className={`${eyebrow} text-brand-sky`}>{featured.label}</p>
            {featured.projectName && !featured.projectNameBelow && (
              <p className="text-lg font-semibold text-brand-ice">
                {featured.projectName}
              </p>
            )}
            <h2
              className={`${heading} text-white ${featured.projectName ? "mt-3" : ""}`}
            >
              {featured.headline}
            </h2>
            {featured.projectName && featured.projectNameBelow && (
              <p className="mt-4 text-lg font-semibold text-brand-ice">
                {featured.projectName}
              </p>
            )}
            {featured.body && (
              <p className="mt-6 text-base leading-relaxed text-brand-ice/90 sm:text-lg">
                {featured.body}
              </p>
            )}
            {featured.href === "contact" ? (
              <ContactButton className="mt-10 inline-block rounded-full border-2 border-brand-blue bg-brand-blue px-8 py-3.5 font-semibold text-white transition-colors duration-500 ease-in-out hover:bg-transparent">
                {featured.cta}
              </ContactButton>
            ) : (
              <Link
                href={featured.href}
                className="mt-10 inline-block rounded-full border-2 border-brand-blue bg-brand-blue px-8 py-3.5 font-semibold text-white transition-colors duration-500 ease-in-out hover:bg-transparent"
              >
                {featured.cta}
              </Link>
            )}
          </div>

          {featured.image && (
            <div
              className={`group overflow-hidden rounded-3xl shadow-2xl ring-1 ring-white/10 ${
                featured.imagePortrait ? "mx-auto w-full max-w-[17rem]" : ""
              }`}
            >
              <Image
                src={featured.image}
                alt={featured.imageAlt ?? ""}
                sizes="(min-width: 768px) 50vw, 100vw"
                className="h-auto w-full object-cover"
              />
            </div>
          )}
        </div>
      </section>
    </>
  );
}
