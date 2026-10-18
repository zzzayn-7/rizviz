"use client";

import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { useEffect, useState, type ReactNode } from "react";
import EdgeShade from "./EdgeShade";
import prj1 from "../images/prj1.png";
import prj1Img from "../images/prj1-img.png.jpeg";
import prj2 from "../images/prj2.png";
import prj2Img from "../images/prj2-img.png";
import prj3 from "../images/prj3.png";
import prj3Img from "../images/prj3-img.png";

type Product = {
  name: string;
  description: ReactNode;
  logo?: StaticImageData;
  // Where the artwork sits inside the logo file ([left, top, right, bottom] in
  // percent). The empty margin around it is cropped so every logo lines up
  // with the text and shows at the same height.
  logoBox?: [number, number, number, number];
  // Screenshot covering the upper half of the card.
  image?: StaticImageData;
};

// Placeholder products: replace with the confirmed ones (keep exactly three to
// match the three segments of the dial).
const products: Product[] = [
  {
    name: "Intellotrade",
    logo: prj1,
    logoBox: [3, 10.5, 97, 91.5],
    image: prj1Img,
    description: (
      <>
        AI-powered trade intelligence{" "}
        <strong className="font-semibold">Web Application</strong> for the
        Pakistan–US corridor. Explore tariff information, HS code guidance, and
        shipping routes to make more informed cross-border trade decisions.
      </>
    ),
  },
  {
    name: "SkinClin",
    logo: prj2,
    logoBox: [8.3, 9.5, 100, 92],
    image: prj2Img,
    description: (
      <>
        An AI-powered skin analysis{" "}
        <strong className="font-semibold">Mobile Application</strong> providing
        personalized insights to identify skin concerns and support smarter
        skincare decisions.
      </>
    ),
  },
  {
    name: "GetInsuredAI",
    logo: prj3,
    logoBox: [1, 30, 98, 72],
    image: prj3Img,
    description: (
      <>
        GetInsuredAI connects underwriting, policy issuance, and claims
        processing in one AI-powered life insurance{" "}
        <strong className="font-semibold">Web Application</strong>. It helps
        insurers reduce manual work, make informed decisions, and deliver a
        smoother policyholder experience.
      </>
    ),
  },
];

const INTERVAL_MS = 7000;
// The dial fades in this long before a switch and out this long after it.
const WHEEL_FADE_MS = 1000;

// Each segment spans 120 degrees. Segment 0 starts in the visible quadrant of
// the dial (bottom-left of its center, angle measured clockwise from +x).
const SEGMENT = 360 / products.length;
const VISIBLE_MID = 135;
const LABEL_RADIUS = 30; // percent of the dial's diameter

// Selector arcs wrap around the dial's visible quarter, filling it from the
// card's top edge (180 degrees) down to its right edge (90 degrees), with a
// small gap between arcs. Coordinates are in a 100 x 100 ring viewBox.
const ARC_START = 177;
const ARC_SPAN = 23;
const ARC_GAP = 7.5;
const ARC_RADIUS = 47;

function arcPath(index: number) {
  const from = ARC_START - index * (ARC_SPAN + ARC_GAP);
  const point = (deg: number) => {
    const rad = (deg * Math.PI) / 180;
    return `${50 + ARC_RADIUS * Math.cos(rad)} ${50 + ARC_RADIUS * Math.sin(rad)}`;
  };
  return `M ${point(from)} A ${ARC_RADIUS} ${ARC_RADIUS} 0 0 0 ${point(from - ARC_SPAN)}`;
}

// Position of a slide in the swing: 0 is on screen, 1 waits one segment
// behind, and the last one is the one that just left (it turns the same way
// as the dial).
function slideAngle(index: number, step: number) {
  const r =
    (((index - step) % products.length) + products.length) % products.length;
  return { r, angle: r === products.length - 1 ? -SEGMENT : r * SEGMENT };
}

function labelPosition(index: number) {
  const rad = ((VISIBLE_MID + index * SEGMENT) * Math.PI) / 180;
  return {
    left: `${50 + LABEL_RADIUS * Math.cos(rad)}%`,
    top: `${50 + LABEL_RADIUS * Math.sin(rad)}%`,
  };
}

function Logo({ product }: { product: Product }) {
  const logo = product.logo!;
  const [l, t, r, b] = product.logoBox ?? [0, 0, 100, 100];
  const w = r - l;
  const h = b - t;
  return (
    <div
      className="relative h-11 self-start overflow-hidden sm:h-16"
      style={{ aspectRatio: (w * logo.width) / (h * logo.height) }}
    >
      <Image
        src={logo}
        alt={product.name}
        sizes="320px"
        className="absolute max-w-none"
        style={{
          width: `${10000 / w}%`,
          height: `${10000 / h}%`,
          left: `${(-l * 100) / w}%`,
          top: `${(-t * 100) / h}%`,
        }}
      />
    </div>
  );
}

export default function FeaturedProducts() {
  // Counts forward forever so the dial always turns the same way.
  const [step, setStep] = useState(0);
  const count = products.length;
  const [paused, setPaused] = useState(false);
  const [wheelShown, setWheelShown] = useState(false);
  const [wheelHovered, setWheelHovered] = useState(false);
  const wheelVisible = wheelShown || wheelHovered;
  const active = step % count;

  // Depending on `step` restarts the timer whenever the slide changes, so a
  // manual selection always gets its full seven seconds. Hovering the card
  // holds the current slide; leaving it starts a fresh countdown. The dial
  // fades out once the switch has finished turning, stays hidden, and fades
  // back in one second before the next switch.
  useEffect(() => {
    if (paused) return;
    const timers = [
      setTimeout(() => setWheelShown(false), WHEEL_FADE_MS),
      setTimeout(() => setWheelShown(true), INTERVAL_MS - WHEEL_FADE_MS),
      setTimeout(() => setStep((s) => s + 1), INTERVAL_MS),
    ];
    return () => timers.forEach(clearTimeout);
  }, [step, paused]);

  const select = (index: number) =>
    setStep((s) => s + ((index - (s % count) + count) % count));

  return (
    <section
      id="products"
      className="relative isolate w-full overflow-hidden bg-white py-20 sm:py-24"
    >
      <EdgeShade />
      <div className="mx-auto flex max-w-[90rem] flex-col gap-12 px-6 sm:px-10 md:flex-row md:items-center md:gap-16 lg:px-16">
        <div className="md:flex-1">
          <div className="max-w-xl">
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-brand-blue">
              Featured Products
            </p>
            <h2 className="text-3xl font-semibold leading-tight text-brand-navy sm:text-4xl lg:text-5xl">
              Our expertise, put to work.
            </h2>
            <p className="mt-6 text-base leading-relaxed text-brand-slate sm:text-lg">
              Explore products built by Rizviz to address real business needs.
              Our engineers, developers, and AI specialists combine technical
              expertise with thoughtful design to turn complex requirements into
              practical, intuitive applications.
            </p>
            <Link
              href="/products"
              className="mt-10 inline-block rounded-full border-2 border-brand-blue bg-brand-blue px-8 py-3.5 font-semibold text-white transition-colors duration-500 ease-in-out hover:bg-transparent hover:text-brand-blue"
            >
              View more
            </Link>
          </div>
        </div>

        <div className="md:w-[55%]">
          <div
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            className="relative h-[32rem] overflow-hidden rounded-3xl bg-brand-ice/40 ring-1 ring-brand-navy/10 md:h-[36rem]"
          >
            {/* Slides share the dial's center (the card's top-right corner) and
                turn with it, so the old project swings out as the next one
                swings in. A slide only animates when it is moving onto or off
                the screen; the others are repositioned out of sight. */}
            {products.map((p, i) => {
              const { r, angle } = slideAngle(i, step);
              const animated = r === 0 || r === products.length - 1;
              return (
                <div
                  key={p.name}
                  aria-hidden={i !== active}
                  style={{
                    transform: `rotate(${angle}deg)`,
                    transformOrigin: "100% 0",
                  }}
                  className={`absolute inset-0 flex flex-col p-6 sm:p-10 ${
                    animated
                      ? "transition-transform duration-1000 ease-in-out"
                      : ""
                  }`}
                >
                  {p.image && (
                    <div className="absolute inset-x-3 top-3 flex h-[calc(50%-0.75rem)] items-center justify-center lg:h-[calc(54%-0.75rem)] xl:h-[calc(58%-0.75rem)]">
                      {/* Shown whole (never cropped), like a screenshot laid
                          on the card with a small gap to its edges. */}
                      <Image
                        src={p.image}
                        alt={`${p.name} website`}
                        sizes="(min-width: 768px) 50vw, 100vw"
                        className="h-auto max-h-full w-auto max-w-full rounded-xl shadow-lg ring-1 ring-brand-navy/10"
                      />
                    </div>
                  )}
                  <div className="mt-auto flex flex-col gap-4">
                    {p.logo && <Logo product={p} />}
                    <p className="text-sm leading-relaxed text-brand-slate sm:text-base">
                      {p.description}
                    </p>
                  </div>
                </div>
              );
            })}

            {/* Hovering the corner where the dial sits brings it back. */}
            <div
              onMouseEnter={() => setWheelHovered(true)}
              onMouseLeave={() => setWheelHovered(false)}
              className="absolute right-0 top-0 h-36 w-36 sm:h-40 sm:w-40 md:h-48 md:w-48"
            />

            {/* The dial and its selector arcs sit above the slides (and any
                screenshot) and are only shown around a switch. */}
            <div
              style={{ transitionDuration: `${WHEEL_FADE_MS}ms` }}
              className={`pointer-events-none absolute inset-0 transition-opacity ease-in-out ${
                wheelVisible ? "opacity-100" : "opacity-0"
              }`}
            >
              {/* Dial: a full circle centered on the card's top-right corner,
                  so only its bottom-left quarter is visible. Turning it by one
                  segment brings the next number into view. */}
              <div className="absolute right-0 top-0 h-56 w-56 translate-x-1/2 -translate-y-1/2 sm:h-64 sm:w-64 md:h-80 md:w-80">
                <div
                  className="relative h-full w-full rounded-full bg-brand-navy transition-transform duration-1000 ease-in-out"
                  style={{ transform: `rotate(${-step * SEGMENT}deg)` }}
                >
                  {products.map((p, i) => (
                    <span
                      key={p.name}
                      style={{
                        transform: `rotate(${VISIBLE_MID + (i + 0.5) * SEGMENT}deg)`,
                      }}
                      className="absolute left-1/2 top-1/2 h-px w-1/2 origin-left bg-brand-steel"
                    />
                  ))}

                  {products.map((p, i) => (
                    <span
                      key={p.name}
                      style={labelPosition(i)}
                      className="absolute -translate-x-1/2 -translate-y-1/2"
                    >
                      {/* Counter-rotate so the numbers stay upright. */}
                      <span
                        style={{ transform: `rotate(${step * SEGMENT}deg)` }}
                        className={`block text-xl font-semibold transition-[transform,color] duration-1000 ease-in-out sm:text-2xl md:text-3xl ${
                          i === active ? "text-brand-sky" : "text-brand-steel"
                        }`}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Selector: bold arcs wrapped around the dial. */}
              <svg
                viewBox="0 0 100 100"
                onMouseEnter={() => setWheelHovered(true)}
                onMouseLeave={() => setWheelHovered(false)}
                className="pointer-events-none absolute right-0 top-0 h-[18rem] w-[18rem] translate-x-1/2 -translate-y-1/2 sm:h-[20rem] sm:w-[20rem] md:h-[24rem] md:w-[24rem]"
              >
                {products.map((p, i) => (
                  <g
                    key={p.name}
                    role="button"
                    tabIndex={0}
                    aria-label={`Show ${p.name}`}
                    aria-current={i === active}
                    onClick={() => select(i)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") select(i);
                    }}
                    style={{ pointerEvents: wheelVisible ? "stroke" : "none" }}
                    className="group cursor-pointer outline-none"
                  >
                    {/* Wider invisible stroke so the arc is easy to hit. */}
                    <path
                      d={arcPath(i)}
                      fill="none"
                      stroke="transparent"
                      strokeWidth={9}
                      strokeLinecap="round"
                    />
                    <path
                      d={arcPath(i)}
                      fill="none"
                      strokeWidth={3}
                      strokeLinecap="round"
                      className={`transition-colors duration-500 ${
                        i === active
                          ? "stroke-brand-navy"
                          : "stroke-brand-navy/30 group-hover:stroke-brand-navy/50"
                      }`}
                    />
                  </g>
                ))}
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
