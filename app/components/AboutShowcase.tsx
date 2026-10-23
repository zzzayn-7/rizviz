"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

// Heights of the rising bars, as a percent of the chart area. The last one is
// the highlighted result.
const BARS = [24, 36, 48, 60, 72, 90];

const cardClass =
  "animate-float rounded-3xl border border-brand-sky/30 bg-white/[0.1] p-4 shadow-xl backdrop-blur-md motion-reduce:animate-none sm:p-5";

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
      className="relative isolate h-[32rem] w-full overflow-hidden sm:h-[34rem] md:h-full md:min-h-[36rem]"
    >
      {/* No panel behind the scene: it sits straight on the page, with only a
          faint grid and a soft glow under the bars. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(55% 40% at 72% 68%, rgba(50,159,224,0.2), transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(181,229,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(181,229,255,1) 1px, transparent 1px)",
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
        className="absolute inset-x-[4%] bottom-0 h-px bg-gradient-to-r from-transparent via-brand-sky/60 to-transparent shadow-[0_0_14px_2px_rgba(112,199,244,0.35)]"
      />

      {/* Rising bars */}
      <div className="absolute inset-x-[7%] bottom-0 top-[34%] flex items-end gap-[3%]">
        {BARS.map((h, i) => {
          const last = i === BARS.length - 1;
          return (
            <div
              key={h}
              style={{
                height: `${h}%`,
                transformOrigin: "bottom",
                transform: shown ? "scaleY(1)" : "scaleY(0)",
                transitionDelay: shown ? `${i * 120}ms` : "0ms",
                // The last bar starts breathing once it has finished rising.
                animationDelay: last ? `${i * 120 + 1000}ms` : undefined,
              }}
              className={`flex-1 rounded-t-2xl border border-b-0 transition-transform duration-[900ms] ease-out motion-reduce:transition-none ${
                last
                  ? `${shown ? "animate-bar-glow motion-reduce:animate-none " : ""}border-brand-sky/60 bg-gradient-to-b from-brand-blue via-brand-blue/70 to-brand-blue/10 shadow-[0_0_36px_rgba(50,159,224,0.35)]`
                  : "border-white/20 bg-gradient-to-b from-white/[0.24] to-white/[0.04]"
              }`}
            />
          );
        })}
      </div>

      {/* Growth arrow */}
      <svg
        aria-hidden
        viewBox="0 0 400 260"
        className="absolute left-[18%] top-[14%] w-[52%]"
        fill="none"
      >
        <defs>
          <linearGradient id="arrow-grad" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0" stopColor="#285b7a" stopOpacity="0" />
            <stop offset="0.5" stopColor="#329fe0" />
            <stop offset="1" stopColor="#b5e5ff" />
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
          stroke="#b5e5ff"
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
            <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />
            <path d="m13 8 3-3 3 3" />
          </CardIcon>
          <p className="mt-3 text-base font-semibold leading-snug text-white sm:text-lg">
            Software, AI, data &amp; cloud
          </p>
          <p className="mt-1 text-xs leading-relaxed text-brand-ice/70 sm:text-sm">
            Digital solutions for your business.
          </p>
        </div>
      </div>

      <div
        style={enter(800)}
        className={`absolute right-[3%] top-[36%] w-[50%] max-w-[17rem] transition-all duration-700 ease-out sm:top-[8%] sm:w-[42%] motion-reduce:transition-none ${rise(shown)}`}
      >
        <div className={`${cardClass} [animation-delay:-3s]`}>
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
