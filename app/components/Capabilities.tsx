"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

type Service = {
  name: string;
  slug: string;
  // The service page, when its address differs from the slug.
  page?: string;
  orbit: 0 | 1 | 2;
  angle: number; // degrees, 0 = the point of the orbit furthest from the screen edge
  headline: string;
  description: string;
};

const services: Service[] = [
  {
    name: "AI / ML",
    slug: "ai-ml",
    orbit: 0,
    angle: 0,
    headline: "Intelligence That Works",
    description:
      "Intelligent applications that turn data into predictions, insights, and automation.",
  },
  {
    name: "DevOps",
    slug: "devops",
    orbit: 1,
    angle: -62,
    headline: "Deliver Faster. Operate Reliably.",
    description:
      "Automated delivery pipelines and reliable cloud infrastructure for your applications.",
  },
  {
    name: "ServiceNow",
    slug: "servicenow",
    orbit: 1,
    angle: 62,
    headline: "Simplify Everyday Workflows",
    description:
      "Platform implementation, customization, and integrations that simplify enterprise workflows.",
  },
  {
    name: "Data Engineering",
    slug: "data-engineering",
    orbit: 2,
    angle: -62,
    headline: "Turn Data Into Decisions",
    description:
      "Data pipelines and platforms that make business information accessible and usable.",
  },
  {
    name: "Software Development",
    slug: "software-development",
    orbit: 2,
    angle: -22,
    headline: "Built Around Your Business",
    description:
      "Custom software designed around your business processes and requirements.",
  },
  {
    name: "Mobile App Development",
    slug: "app-development",
    page: "mobile-app-development",
    orbit: 2,
    angle: 22,
    headline: "Your Business, Within Reach",
    description:
      "Mobile applications with intuitive interfaces and dependable functionality.",
  },
  {
    name: "Web Development",
    slug: "website-development",
    orbit: 2,
    angle: 62,
    headline: "Make Every Visit Count",
    description:
      "Responsive websites built for usability, performance, and your brand.",
  },
];

// Orbit geometry in SVG units (viewBox 640 x 840). Orbits share a center on
// the right edge, so only their left halves are visible.
const VIEW_W = 640;
const VIEW_H = 840;
const CX = VIEW_W - 40;
const CY = VIEW_H / 2;
const RADII = [150, 270, 390];

// Viewport heights of scroll needed to move to the next service.
const STEP_VH = 45;

function pointOn(service: Service) {
  const rad = (service.angle * Math.PI) / 180;
  const r = RADII[service.orbit];
  return { x: CX - r * Math.cos(rad), y: CY + r * Math.sin(rad) };
}

export default function Capabilities() {
  const wrapRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  // Which way the skip button points. It flips to "up" on reaching the last
  // service and back to "down" on reaching the first, and keeps its direction
  // for the services in between.
  const [pointsUp, setPointsUp] = useState(false);
  const count = services.length;

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const el = wrapRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const scrollable = el.offsetHeight - window.innerHeight;
      const progress = Math.min(1, Math.max(0, -rect.top / scrollable));
      const index = Math.min(count - 1, Math.floor(progress * count));
      setActive(index);
      if (index === count - 1) setPointsUp(true);
      else if (index === 0) setPointsUp(false);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [count]);

  // Scroll position is the single source of truth, so clicking a service
  // scrolls to the matching point instead of setting state directly.
  const goTo = useCallback(
    (index: number) => {
      const el = wrapRef.current;
      if (!el) return;
      const top = el.getBoundingClientRect().top + window.scrollY;
      const scrollable = el.offsetHeight - window.innerHeight;
      window.scrollTo({
        top: top + ((index + 0.5) / count) * scrollable,
        behavior: "smooth",
      });
    },
    [count],
  );

  const skip = useCallback(() => {
    const el = wrapRef.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: top + el.offsetHeight, behavior: "smooth" });
  }, []);

  // From the last service the same button leads back up, past the start of
  // the section, so the animation is skipped in that direction too.
  const skipUp = useCallback(() => {
    const el = wrapRef.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({
      top: Math.max(0, top - window.innerHeight),
      behavior: "smooth",
    });
  }, []);

  const current = services[active];

  return (
    <section
      id="capabilities"
      ref={wrapRef}
      style={{ height: `calc(100vh + ${count * STEP_VH}vh)` }}
      className="relative w-full"
    >
      <div className="sticky top-0 flex h-screen flex-col overflow-hidden">
        <div className="flex min-h-0 flex-1 flex-col pt-6 md:flex-row-reverse md:items-center md:pt-0">
          {/* Orbits */}
          <div className="flex shrink-0 items-center justify-end md:w-[45%]">
            <div
              className="relative h-[40vh] md:h-[90vh]"
              style={{ aspectRatio: `${VIEW_W} / ${VIEW_H}` }}
            >
              <svg
                viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
                className="absolute inset-0 h-full w-full"
                aria-hidden
              >
                {RADII.map((r, i) => {
                  const isActive = current.orbit === i;
                  return (
                    <circle
                      key={r}
                      cx={CX}
                      cy={CY}
                      r={r}
                      fill="none"
                      strokeWidth={isActive ? 2.5 : 1.5}
                      className={`transition-all duration-700 ${
                        isActive
                          ? "stroke-brand-navy"
                          : "stroke-brand-navy/25"
                      }`}
                    />
                  );
                })}
              </svg>

              {services.map((s, i) => {
                const { x, y } = pointOn(s);
                const isActive = i === active;
                return (
                  <button
                    key={s.slug}
                    type="button"
                    onClick={() => goTo(i)}
                    aria-pressed={isActive}
                    style={{
                      left: `${(x / VIEW_W) * 100}%`,
                      top: `${(y / VIEW_H) * 100}%`,
                      transform: "translate(calc(-100% + 7px), -50%)",
                    }}
                    className="absolute flex flex-row-reverse items-center gap-2 whitespace-nowrap"
                  >
                    <span
                      className={`block shrink-0 rounded-full transition-all duration-500 ${
                        isActive
                          ? "h-4 w-4 translate-x-[1px] border-2 border-brand-ice bg-brand-navy shadow-[0_0_10px_rgba(11,29,45,0.45)]"
                          : "h-3.5 w-3.5 bg-brand-navy/70"
                      }`}
                    />
                    <span
                      className={`rounded-full border px-3 py-1 text-[11px] transition-colors duration-500 sm:text-sm ${
                        isActive
                          ? "glass-navy font-medium text-white"
                          : "border-brand-navy/20 bg-white/50 text-brand-navy backdrop-blur-md hover:border-brand-navy/50"
                      }`}
                    >
                      {s.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Details */}
          <div className="page-left-edge flex flex-1 flex-col justify-center px-6 pb-8 sm:px-10 md:pb-0 md:pr-12">
            <h2 className="mb-8 text-5xl font-extrabold leading-none tracking-tight text-brand-navy sm:text-6xl md:mb-10 lg:text-7xl">
              Our Capabilities
            </h2>
            <div key={current.slug} className="max-w-2xl animate-fade-up">
              <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-brand-steel sm:text-sm">
                {current.name}
              </p>
              <h3 className="text-3xl font-semibold leading-tight text-brand-navy sm:text-4xl lg:text-5xl">
                {current.headline}
              </h3>
              <p className="mt-5 text-base leading-relaxed text-brand-navy/75 sm:text-lg">
                {current.description}
              </p>
              <Link
                href={`/services/${current.page ?? current.slug}`}
                className="glass-navy mt-8 inline-block rounded-full px-8 py-3 font-semibold text-white transition duration-500 ease-in-out hover:brightness-125"
              >
                Explore more
              </Link>
            </div>

            <button
              type="button"
              onClick={pointsUp ? skipUp : skip}
              aria-label={
                pointsUp ? "Back above capabilities" : "Skip capabilities"
              }
              className="mt-12 flex h-12 w-12 items-center justify-center glass-navy rounded-full text-xl text-white transition duration-500 ease-in-out hover:brightness-125 md:mt-16"
            >
              <span
                aria-hidden
                className={`transition-transform duration-500 ${
                  pointsUp ? "rotate-180" : ""
                }`}
              >
                ↓
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
