"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

// Heights of the rising bars, as a percent of the chart area. The last one is
// the highlighted result.
const BARS = [24, 36, 48, 60, 72, 90];

const cardClass =
  "glass-navy animate-float rounded-3xl p-4 motion-reduce:animate-none sm:p-5";

// An outline icon with no background, drawn in the cards' light blue.
function CardIcon({ children }: { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className="h-10 w-10 text-brand-sky sm:h-11 sm:w-11"
    >
      {children}
    </svg>
  );
}

// A dark "growth" scene for the About section: bars that rise one after
// another, an arrow drawing itself upward, and floating glass cards.
export default function AboutShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  // Play the entrance once, when the scene first scrolls into view.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const enter = (delay: number): CSSProperties => ({
    transitionDelay: shown ? `${delay}ms` : "0ms",
  });
  const rise = (visible: boolean) =>
    visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0";

  return (
    <div
      ref={ref}
      className="relative isolate h-[30rem] w-full overflow-hidden sm:h-[34rem] md:h-full md:min-h-[34rem]"
    >
      {/* No panel behind the scene: it sits straight on the page, with only a
          faint grid and a soft glow under the bars. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(55% 40% at 72% 68%, rgba(11,29,45,0.12), transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(11,29,45,1) 1px, transparent 1px), linear-gradient(90deg, rgba(11,29,45,1) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(60% 45% at 60% 50%, black, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(60% 45% at 60% 50%, black, transparent 80%)",
        }}
      />

      {/* The baseline the bars stand on */}
      <div
        aria-hidden
        className="absolute inset-x-[4%] bottom-0 h-px bg-gradient-to-r from-transparent via-brand-navy/40 to-transparent"
      />

      {/* Rising bars */}
      <div className="absolute inset-x-[7%] bottom-0 top-[34%] flex items-end gap-[3%]">
        {BARS.map((h, i) => {
          const last = i === BARS.length - 1;
          return (
            // The outer box never moves, so the cursor can't slip off the bar as it lifts.
            <div key={h} style={{ height: `${h}%` }} className="group flex-1">
              <div className="h-full transition-transform duration-500 ease-out group-hover:-translate-y-2 motion-reduce:transition-none">
                <div
                  style={{
                    transformOrigin: "bottom",
                    transform: shown ? "scaleY(1)" : "scaleY(0)",
                    transitionDelay: shown ? `${i * 120}ms` : "0ms",
                    // The last bar starts breathing once it has finished rising.
                    animationDelay: last ? `${i * 120 + 1000}ms` : undefined,
                  }}
                  className={`h-full rounded-t-2xl border border-b-0 transition-transform duration-[900ms] ease-out motion-reduce:transition-none ${
                    last
                      ? `${shown ? "animate-bar-glow motion-reduce:animate-none " : ""}border-brand-navy/40 bg-gradient-to-b from-brand-navy via-brand-steel/80 to-brand-steel/20 shadow-[0_0_10px_rgba(11,29,45,0.08)]`
                      : "border-brand-navy/15 bg-gradient-to-b from-brand-navy/30 to-brand-navy/[0.05]"
                  }`}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Growth arrow */}
      <svg
        aria-hidden
        viewBox="0 0 400 260"
        className="absolute left-[46%] top-[14%] w-[48%]"
        fill="none"
      >
        <defs>
          <linearGradient id="arrow-grad" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0" stopColor="#285b7a" stopOpacity="0" />
            <stop offset="0.5" stopColor="#285b7a" />
            <stop offset="1" stopColor="#0b1d2d" />
          </linearGradient>
        </defs>
        <path
          d="M10 240 C 110 225, 230 170, 320 80"
          stroke="url(#arrow-grad)"
          strokeWidth="4"
          strokeLinecap="round"
          pathLength={1}
          strokeDasharray={1}
          style={{
            strokeDashoffset: shown ? 0 : 1,
            transition: "stroke-dashoffset 1600ms ease-out 700ms",
          }}
        />
        <path
          d="M287 89 L320 80 L311 113"
          stroke="#0b1d2d"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            opacity: shown ? 1 : 0,
            transition: "opacity 400ms ease-out 2000ms",
          }}
        />
      </svg>

      {/* Floating cards */}
      <div
        style={enter(500)}
        className={`absolute left-[4%] top-[8%] w-[44%] max-w-[15rem] transition-all duration-700 ease-out motion-reduce:transition-none ${rise(shown)}`}
      >
        <div className={cardClass}>
          <CardIcon>
            <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
            <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
            <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
            <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
          </CardIcon>
          <p className="mt-3 text-base font-semibold leading-snug text-white sm:text-lg">
            Empower your business with Rizviz
          </p>
          <p className="mt-1 text-xs leading-relaxed text-brand-ice/70 sm:text-sm">
            Practical solutions, built with your team.
          </p>
        </div>
      </div>
    </div>
  );
}
