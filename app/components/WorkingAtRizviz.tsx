"use client";

import Image, { type StaticImageData } from "next/image";
import { useEffect, useRef, useState } from "react";
import p1 from "../images/p5-s2-1.png";
import p2 from "../images/p5-s2-2.png";
import p3 from "../images/p5-s2-3.png";

type Perk = {
  title: string;
  description: string;
  image: StaticImageData;
  alt: string;
  // Keeps the people in frame when the photo is cropped to the card.
  position: string;
};

const perks: Perk[] = [
  {
    title: "Meaningful Projects",
    description:
      "Contribute to applications and systems built around real challenges.",
    image: p1,
    alt: "An engineer reviewing a data dashboard at her desk",
    position: "20% center",
  },
  {
    title: "Cross-Team Collaboration",
    description:
      "Work alongside people with expertise across software, AI, data, and cloud technologies.",
    image: p2,
    alt: "Three colleagues discussing work around a table",
    position: "55% center",
  },
  {
    title: "Shared Learning",
    description:
      "Exchange ideas, explore approaches, and develop your skills through collaborative work.",
    image: p3,
    alt: "Two colleagues working through something together on a laptop",
    position: "65% center",
  },
];

export default function WorkingAtRizviz() {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  // Start the hints once the cards come into view, so the first one is seen.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      id="working-at-rizviz"
      className="w-full bg-brand-navy py-20 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <div className="max-w-2xl text-left">
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-brand-sky">
            Working at Rizviz
          </p>
          <h2 className="text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
            Bring your skills.
            <br />
            Build with a team.
          </h2>
          <p className="mt-6 text-base leading-relaxed text-brand-ice/90 sm:text-lg">
            Join engineers, developers, and technology specialists working on
            practical solutions for real business needs.
          </p>
        </div>

        <ul className="mt-12 grid gap-6 sm:mt-16 md:grid-cols-3">
          {perks.map((perk, i) => (
            <li key={perk.title}>
              <article
                tabIndex={0}
                className="group relative aspect-[5/6] overflow-hidden rounded-2xl outline-none ring-1 ring-white/10 focus-visible:ring-brand-sky"
              >
                <Image
                  src={perk.image}
                  alt={perk.alt}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  style={{ objectPosition: perk.position }}
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 group-focus-visible:scale-105"
                />

                {/* The heading rests at the bottom; on hover the text grows in
                    underneath it, pushing the heading up. */}
                <div className="absolute inset-x-0 bottom-0 bg-brand-navy/80 px-6 py-5 backdrop-blur-sm transition-colors duration-500 group-hover:bg-brand-navy/90 group-focus-visible:bg-brand-navy/90">
                  <h3 className="text-xl font-semibold text-white">
                    {perk.title}
                  </h3>
                  {/* Every 7s a little of the panel opens under the heading,
                      one card after another, hinting at the text below. */}
                  <div
                    aria-hidden
                    style={{ animationDelay: `${i * 0.2}s` }}
                    className={`h-0 group-hover:animate-none group-focus-visible:animate-none motion-reduce:animate-none ${
                      inView ? "animate-peek-gap" : ""
                    }`}
                  />
                  <div className="grid grid-rows-[0fr] opacity-0 transition-all duration-500 ease-out group-hover:grid-rows-[1fr] group-hover:opacity-100 group-focus-visible:grid-rows-[1fr] group-focus-visible:opacity-100 [@media(hover:none)]:grid-rows-[1fr] [@media(hover:none)]:opacity-100">
                    <div className="overflow-hidden">
                      <p className="pt-3 text-sm leading-relaxed text-brand-ice/90 sm:text-base">
                        {perk.description}
                      </p>
                    </div>
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
