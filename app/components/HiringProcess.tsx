"use client";

import { useEffect, useRef, useState } from "react";

type IconName = "apply" | "review" | "interview" | "join";

type Step = {
  title: string;
  icon: IconName;
};

const steps: Step[] = [
  { title: "Apply", icon: "apply" },
  { title: "Application Review", icon: "review" },
  { title: "Interviews", icon: "interview" },
  { title: "Joining the Team", icon: "join" },
];

// One picture for each stage: a paper plane sending your application, a
// magnifier over your CV, two people talking, and a new colleague welcomed
// with a tick.
function StepIcon({ name, className }: { name: IconName; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={className}
    >
      {name === "apply" && (
        <>
          <path d="m22 2-7 20-4-9-9-4Z" />
          <path d="M22 2 11 13" />
        </>
      )}
      {name === "review" && (
        <>
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
          <path d="M14 2v6h6" />
          <circle cx="11.5" cy="14.5" r="2.5" />
          <path d="M13.3 16.3 15 18" />
        </>
      )}
      {name === "interview" && (
        <>
          <path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2Z" />
          <path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1" />
        </>
      )}
      {name === "join" && (
        <>
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="m16 11 2 2 4-4" />
        </>
      )}
    </svg>
  );
}
// Path geometry (px). The road is a staircase climbing to the right: each step is a flat run with a
// checkpoint in its center, and a vertical riser lifts the road to the next step.
const HEIGHT = 560;
const LOW_Y = 500;
const RISE = 110;
const LINE = 2;
const stepY = (index: number) => LOW_Y - index * RISE;

// Which steps have already been revealed. These live outside the component,
// so leaving the page and coming back keeps them shown; a reload resets them.
const revealedSteps: boolean[] = steps.map(() => false);
const revealedMobile: boolean[] = steps.map(() => false);

// A step is revealed once its checkpoint is scrolled to; the checkpoints
// appear one at a time, in order, with a short beat between them.
const REVEAL_GAP_MS = 500;
const TRIGGER = 0.88; // fraction of the screen height

function Checkpoint({
  step,
  index,
  active,
  register,
}: {
  step: Step;
  index: number;
  active: boolean;
  register: (index: number, el: HTMLElement | null) => void;
}) {
  // Every checkpoint shows its icon above the road and its heading below it.
  const ease = "cubic-bezier(0.34, 1.56, 0.64, 1)";

  return (
    <div
      className="absolute h-0 w-0"
      style={{
        left: `${index * 25 + 12.5}%`,
        top: stepY(index),
      }}
    >
      <span
        ref={(el) => register(index, el)}
        className={`absolute left-0 top-0 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-brand-navy transition-all duration-500 ${
          active
            ? "scale-110 bg-brand-navy shadow-[0_0_12px_rgba(11,29,45,0.45)]"
            : "bg-white"
        }`}
      />

      <div
        className="absolute bottom-9 left-0 -translate-x-1/2"
      >
        <div
          style={{ transitionTimingFunction: ease }}
          className={`glass-navy flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-full text-brand-ice transition-all duration-500 lg:h-20 lg:w-20 origin-bottom ${active ? "scale-100 opacity-100" : "scale-50 opacity-0"}`}
        >
          <StepIcon name={step.icon} className="h-8 w-8 lg:h-9 lg:w-9" />
        </div>
      </div>
      <h3
        style={{ transitionDelay: active ? "150ms" : "0ms" }}
        className={`absolute left-0 top-7 w-40 -translate-x-1/2 text-center text-lg font-semibold text-brand-navy transition-all duration-500 lg:w-44 ${
          active ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"
        }`}
      >
        {step.title}
      </h3>
    </div>
  );
}

function MobileStep({ step, index }: { step: Step; index: number }) {
  const ref = useRef<HTMLLIElement>(null);
  const [shown, setShown] = useState(revealedMobile[index]);

  useEffect(() => {
    const el = ref.current;
    if (!el || revealedMobile[index]) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          revealedMobile[index] = true;
          setShown(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [index]);

  return (
    <li
      ref={ref}
      className={`relative flex items-center gap-4 pb-10 pl-8 transition-all duration-700 ease-out last:pb-0 ${
        shown ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      }`}
    >
      <span
        aria-hidden
        className="absolute left-0 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-brand-navy bg-brand-navy"
      />
      <span className="glass-navy flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-brand-ice">
        <StepIcon name={step.icon} className="h-6 w-6" />
      </span>
      <h3 className="text-lg font-semibold text-brand-navy">{step.title}</h3>{" "}
    </li>
  );
}

const line = (
  left: string,
  top: number,
  width: string | number,
  height: string | number,
): React.CSSProperties => ({ left, top, width, height });

export default function HiringProcess() {
  const [revealed, setRevealed] = useState<boolean[]>(() => [...revealedSteps]);
  const checkpoints = useRef<(HTMLElement | null)[]>([]);
  const register = (index: number, el: HTMLElement | null) => {
    checkpoints.current[index] = el;
  };

  useEffect(() => {
    let frame = 0;
    let timer = 0;
    let lastReveal = -Infinity;

    const check = () => {
      frame = 0;
      const next = revealedSteps.indexOf(false);
      if (next === -1) return;
      const el = checkpoints.current[next];
      // Hidden on phones, where the list handles itself.
      if (!el || el.offsetParent === null) return;
      if (el.getBoundingClientRect().top > window.innerHeight * TRIGGER) return;

      const wait = lastReveal + REVEAL_GAP_MS - performance.now();
      if (wait > 0) {
        window.clearTimeout(timer);
        timer = window.setTimeout(check, wait);
        return;
      }
      lastReveal = performance.now();
      revealedSteps[next] = true;
      setRevealed([...revealedSteps]);
      // The next checkpoint may already be in view as well.
      window.clearTimeout(timer);
      timer = window.setTimeout(check, REVEAL_GAP_MS);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(check);
    };

    check();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.clearTimeout(timer);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section id="hiring-process" className="relative w-full py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <div className="grid items-center gap-10 md:grid-cols-[minmax(0,0.34fr)_minmax(0,0.66fr)] md:gap-6 lg:gap-12">
          {/* The heading sits on the left, about halfway down the staircase. */}
          <div className="text-left">
            <h2 className="text-5xl font-extrabold leading-none tracking-tight text-brand-navy sm:text-6xl lg:text-7xl">
              Our Hiring Process
            </h2>
          </div>

          {/* Wide screens: the staircase is always in place; each checkpoint shows its picture and
              heading when scrolled to. */}
          <div
            style={{ height: HEIGHT }}
            className="relative hidden md:block"
          >
            {steps.flatMap((_, i) => {
              const y = stepY(i);
              const run = line(`${i * 25}%`, y - LINE / 2, "25%", LINE);
              const riser =
                i < steps.length - 1
                  ? line(`calc(${(i + 1) * 25}% - 1px)`, stepY(i + 1) - LINE / 2, LINE, RISE + LINE)
                  : null;
              return [run, riser].filter(Boolean) as React.CSSProperties[];
            }).map((style, i) => (
              <div
                key={i}
                aria-hidden
                className="absolute bg-brand-navy"
                style={style}
              />
            ))}

            {steps.map((step, i) => (
              <Checkpoint
                key={step.title}
                step={step}
                index={i}
                active={revealed[i]}
                register={register}
              />
            ))}
          </div>
        </div>

        {/* Phones: a simple vertical list. */}
        <ol className="relative mt-10 ml-2 border-l-2 border-brand-navy/60 md:hidden">
          {steps.map((step, i) => (
            <MobileStep key={step.title} step={step} index={i} />
          ))}
        </ol>
      </div>
    </section>
  );
}
