"use client";

import Image, { type StaticImageData } from "next/image";
import { useEffect, useRef, useState } from "react";
import s1 from "../images/p5-s3-1.png";
import s2 from "../images/p5-s3-2.png";
import s3 from "../images/p5-s3-3.png";
import s4 from "../images/p5-s3-4.png";

type Step = {
  title: string;
  image: StaticImageData;
  alt: string;
};

const steps: Step[] = [
  {
    title: "Apply",
    image: s1,
    alt: "A candidate applying for a role on a laptop",
  },
  {
    title: "Application Review",
    image: s2,
    alt: "A reviewer reading a candidate's CV",
  },
  {
    title: "Interviews",
    image: s3,
    alt: "Two colleagues talking through a technical interview",
  },
  {
    title: "Joining the Team",
    image: s4,
    alt: "A manager handing a new hire their offer letter",
  },
];

// Path geometry (px). The path starts low at the left margin and runs right,
// up, right, down, right, up, right, so the four horizontal runs alternate
// low / high. Each run has a checkpoint in its center.
const HEIGHT = 380;
const HIGH_Y = 120;
const LOW_Y = 270;
const RISE = LOW_Y - HIGH_Y;
const LINE = 2;

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
  level,
  active,
  register,
}: {
  step: Step;
  index: number;
  level: "high" | "low";
  active: boolean;
  register: (index: number, el: HTMLElement | null) => void;
}) {
  // Checkpoints on the low run show their picture above and heading below;
  // the high run is the other way round.
  const imageUp = level === "low";
  const ease = "cubic-bezier(0.34, 1.56, 0.64, 1)";

  return (
    <div
      className="absolute h-0 w-0"
      style={{
        left: `${index * 25 + 12.5}%`,
        top: level === "low" ? LOW_Y : HIGH_Y,
      }}
    >
      <span
        ref={(el) => register(index, el)}
        className={`absolute left-0 top-0 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-brand-blue transition-all duration-500 ${
          active
            ? "scale-110 bg-brand-blue shadow-[0_0_14px_rgba(50,159,224,0.6)]"
            : "bg-white"
        }`}
      />

      <div
        className={`absolute left-0 -translate-x-1/2 ${
          imageUp ? "bottom-4" : "top-4"
        }`}
      >
        <div
          style={{ transitionTimingFunction: ease }}
          className={`w-24 overflow-hidden rounded-xl shadow-lg ring-1 ring-brand-navy/10 transition-all duration-500 lg:w-28 ${
            imageUp ? "origin-bottom" : "origin-top"
          } ${active ? "scale-100 opacity-100" : "scale-50 opacity-0"}`}
        >
          <Image
            src={step.image}
            alt={step.alt}
            sizes="112px"
            className="aspect-[2/3] w-full object-cover"
          />
        </div>
      </div>

      <h3
        style={{ transitionDelay: active ? "150ms" : "0ms" }}
        className={`absolute left-0 w-48 -translate-x-1/2 text-center text-lg font-semibold text-brand-navy transition-all duration-500 lg:w-56 ${
          imageUp ? "top-6" : "bottom-6"
        } ${
          active
            ? "translate-y-0 opacity-100"
            : imageUp
              ? "-translate-y-2 opacity-0"
              : "translate-y-2 opacity-0"
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
        className="absolute left-0 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-brand-blue bg-brand-blue"
      />
      <Image
        src={step.image}
        alt={step.alt}
        sizes="88px"
        className="aspect-[2/3] w-22 shrink-0 rounded-xl object-cover shadow-md ring-1 ring-brand-navy/10"
      />
      <h3 className="text-lg font-semibold text-brand-navy">{step.title}</h3>
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
    <section id="hiring-process" className="w-full bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <div className="max-w-2xl text-left">
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-brand-blue">
            Our Hiring Process
          </p>
          <h2 className="text-3xl font-semibold leading-tight text-brand-navy sm:text-4xl lg:text-5xl">
            Your next steps.
          </h2>
        </div>

        {/* Wide screens: the path is always in place; each checkpoint shows
            its picture and heading when scrolled to. */}
        <div
          style={{ height: HEIGHT }}
          className="relative mt-8 hidden md:block"
        >
          {[
            line("0%", LOW_Y - LINE / 2, "25%", LINE),
            line("calc(25% - 1px)", HIGH_Y, LINE, RISE),
            line("25%", HIGH_Y - LINE / 2, "25%", LINE),
            line("calc(50% - 1px)", HIGH_Y, LINE, RISE),
            line("50%", LOW_Y - LINE / 2, "25%", LINE),
            line("calc(75% - 1px)", HIGH_Y, LINE, RISE),
            line("75%", HIGH_Y - LINE / 2, "25%", LINE),
          ].map((style, i) => (
            <div
              key={i}
              aria-hidden
              className="absolute bg-brand-blue"
              style={style}
            />
          ))}

          {steps.map((step, i) => (
            <Checkpoint
              key={step.title}
              step={step}
              index={i}
              level={i % 2 === 0 ? "low" : "high"}
              active={revealed[i]}
              register={register}
            />
          ))}
        </div>

        {/* Phones: a simple vertical list. */}
        <ol className="relative mt-10 ml-2 border-l-2 border-brand-blue md:hidden">
          {steps.map((step, i) => (
            <MobileStep key={step.title} step={step} index={i} />
          ))}
        </ol>
      </div>
    </section>
  );
}
