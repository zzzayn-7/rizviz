"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type Step = {
  number: string;
  title: string;
  description: string;
  icon: ReactNode;
};

const iconProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  className: "h-7 w-7",
  "aria-hidden": true,
} as const;

const steps: Step[] = [
  {
    number: "01",
    title: "Understand",
    description: "Goals, requirements, and scope",
    // Conversation
    icon: (
      <svg {...iconProps}>
        <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.3A8 8 0 1 1 21 12Z" />
        <path d="M8.5 11h7M8.5 14h4" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Develop",
    description: "Design, build, and review",
    // Code
    icon: (
      <svg {...iconProps}>
        <path d="m8 7-5 5 5 5M16 7l5 5-5 5M13.5 5l-3 14" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Deliver",
    description: "Test, launch, and handover",
    // Launch
    icon: (
      <svg {...iconProps}>
        <path d="M12 3c3.5 2 5.5 5.5 5.5 9.5L15 18H9l-2.5-5.5C6.5 8.5 8.5 5 12 3Z" />
        <circle cx="12" cy="10" r="1.6" />
        <path d="m9 18-1.5 3M15 18l1.5 3M7 14l-3 1.5L5 19M17 14l3 1.5L19 19" />
      </svg>
    ),
  },
];

// The breathing starts once the entrance animation has finished.
const BREATHE_DELAY_S = 2.4;

export default function HowWeWork() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  // Play the animation once, the first time the section is on screen.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="how-we-work"
      ref={ref}
      className="w-full bg-[#050D14] py-20"
    >
      <div className="mx-auto max-w-6xl px-6 sm:px-10">
        <div className="text-center">
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-brand-blue">
            How We Work
          </p>
          <h2 className="text-2xl font-semibold leading-tight text-[#F1F5F9] sm:text-3xl lg:text-4xl">
            From understanding to delivery.
          </h2>
        </div>

        <div className="relative mt-16 sm:mt-20">
          {/* Connecting line, from the first circle's center to the last. */}
          <div
            aria-hidden
            className="absolute left-[16.667%] right-[16.667%] top-7 hidden h-px md:block"
          >
            <div
              className="h-full w-full origin-left transition-transform duration-[1400ms] ease-out motion-reduce:transition-none"
              style={{ transform: `scaleX(${visible ? 1 : 0})` }}
            >
              <div
                style={{ animationDelay: `${BREATHE_DELAY_S}s` }}
                className={`h-full w-full bg-brand-steel motion-reduce:animate-none ${
                  visible ? "animate-breathe-line" : ""
                }`}
              />
            </div>
          </div>

          <ol className="grid gap-14 md:grid-cols-3 md:gap-8">
            {steps.map((step, i) => (
              <li
                key={step.number}
                style={{ transitionDelay: visible ? `${300 + i * 450}ms` : "0ms" }}
                className={`flex flex-col items-center text-center transition-all duration-700 ease-out motion-reduce:transition-none ${
                  visible ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
                }`}
              >
                <div
                  style={{ animationDelay: `${BREATHE_DELAY_S}s` }}
                  className={`relative flex h-14 w-14 items-center justify-center rounded-full border border-brand-sky bg-[#050D14] text-brand-sky motion-reduce:animate-none ${
                    visible ? "animate-breathe" : ""
                  }`}
                >
                  {step.icon}
                </div>
                <p className="mt-6 text-sm font-semibold tracking-widest text-brand-sky">
                  {step.number}
                </p>
                <h3 className="mt-2 text-xl font-semibold text-[#F1F5F9]">
                  {step.title}
                </h3>
                <p className="mt-2 max-w-[16rem] text-base leading-relaxed text-[#A8B8C6]">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
