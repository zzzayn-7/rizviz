import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import ContactButton from "./ContactButton";
import type { ReactNode } from "react";

type Props = {
  // Kept for the pages that still pass it; every service page now shares the
  // ice-blue page behind it, so it no longer changes anything.
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

// The big extra-bold section title, as on the Home and About pages, with the section's own line
// under it in a smaller navy.
const title =
  "text-5xl font-extrabold leading-none tracking-tight text-brand-navy sm:text-6xl lg:text-7xl";
const subtitle = "mt-8 text-2xl font-semibold leading-snug text-brand-navy sm:text-3xl";
const bodyText = "mt-5 text-base leading-relaxed text-brand-navy/80 sm:text-lg";

export default function ServiceDetail({
  achieve,
  deliver,
  featured,
}: Props) {
  return (
    <>
      {/* What we help you achieve */}
      <section className="relative w-full pb-16 pt-20 sm:pb-24 sm:pt-28">
        <div
          className={`mx-auto grid max-w-7xl gap-12 px-6 sm:px-10 md:grid-cols-[1.1fr_1fr] md:gap-16 ${
            achieve.visual ? "md:items-stretch" : "items-center"
          }`}
        >
          <div>
            <h2 className={title}>{achieve.label}</h2>
            <p className={subtitle}>
              {achieve.headline.map((line, i) => (
                <span key={line}>
                  {i > 0 && <br />}
                  {line}
                </span>
              ))}
            </p>
            <p className={bodyText}>{achieve.body}</p>
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

      {/* What we deliver: the text stays put while the cards scroll past on the right. */}
      <section className="relative w-full py-16 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 sm:px-10 md:grid-cols-2 md:gap-16">
          <div className="max-w-md md:sticky md:top-32 md:self-start">
            <h2 className={title}>{deliver.label}</h2>
            <p className={subtitle}>{deliver.headline}</p>
            <p className={bodyText}>{deliver.intro}</p>
          </div>

          <ul className="flex flex-col gap-6 md:gap-8">
            {deliver.items.map((item, i) => (
              <li key={item.title}>
                <article className="glass-navy flex min-h-[13rem] items-start gap-6 rounded-2xl p-7 transition duration-300 hover:-translate-y-1 sm:gap-8 sm:p-9">
                  <span className="text-4xl font-semibold leading-none text-brand-ice">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-xl font-semibold text-white sm:text-2xl">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-base leading-relaxed text-brand-ice/85">
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
      <section className="relative w-full pb-32 pt-16 sm:pb-52 sm:pt-24">
        <div
          className={`mx-auto grid max-w-7xl items-center gap-12 px-6 sm:px-10 md:gap-16 ${
            featured.image ? "md:grid-cols-2" : ""
          }`}
        >
          <div className={featured.image ? undefined : "max-w-3xl"}>
            <h2 className={title}>{featured.label}</h2>
            {featured.projectName && !featured.projectNameBelow && (
              <p className="mt-8 text-lg font-semibold text-brand-steel">
                {featured.projectName}
              </p>
            )}
            <p className={featured.projectName && !featured.projectNameBelow ? "mt-3 text-2xl font-semibold leading-snug text-brand-navy sm:text-3xl" : subtitle}>
              {featured.headline}
            </p>
            {featured.projectName && featured.projectNameBelow && (
              <p className="mt-4 text-lg font-semibold text-brand-steel">
                {featured.projectName}
              </p>
            )}
            {featured.body && <p className={bodyText}>{featured.body}</p>}
            {featured.href === "contact" ? (
              <ContactButton className="glass-navy mt-10 inline-block rounded-full px-8 py-3.5 font-semibold text-white transition duration-500 ease-in-out hover:brightness-125">
                {featured.cta}
              </ContactButton>
            ) : (
              <Link
                href={featured.href}
                className="glass-navy mt-10 inline-block rounded-full px-8 py-3.5 font-semibold text-white transition duration-500 ease-in-out hover:brightness-125"
              >
                {featured.cta}
              </Link>
            )}
          </div>

          {featured.image && (
            <div
              className={`group overflow-hidden rounded-3xl shadow-2xl ring-1 ring-brand-navy/10 ${
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
