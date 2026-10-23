"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent,
} from "react";

type Step = {
  number: string;
  title: string;
  description: string;
};

// The first step is the middle circle; the other four gather round it.
const steps: Step[] = [
  {
    number: "01",
    title: "Understand",
    description: "We clarify your goals, requirements, and project priorities.",
  },
  {
    number: "02",
    title: "Develop",
    description: "We build your solution and refine it with your feedback.",
  },
  {
    number: "03",
    title: "Test",
    description:
      "We verify functionality, performance, and usability before launch.",
  },
  {
    number: "04",
    title: "Deploy",
    description: "We launch the solution and guide your team through handover.",
  },
  {
    number: "05",
    title: "Maintain",
    description:
      "We resolve issues and provide updates through ongoing support.",
  },
];

// The four outer circles are not alike: each has its own size, and sits at
// its own angle (degrees, clockwise from the right) so the cluster looks
// scattered. 02 is smaller and a little lower, 04 is similar and a little
// higher, 03 and 05 match.
const OUTER = [
  { size: 11.5, angle: 205 }, // 02 - top left, nudged down
  { size: 13, angle: 305 }, // 03 - top right
  { size: 12, angle: 20 }, // 04 - right, nudged up
  { size: 13, angle: 125 }, // 05 - bottom left
].map((o) => ({
  ...o,
  dir: [
    Math.cos((o.angle * Math.PI) / 180),
    Math.sin((o.angle * Math.PI) / 180),
  ] as [number, number],
}));

// Sizes and distances are in `u` (1.15rem on wide screens). A distance is
// measured between circle centers.
const CENTER = 16;
const touch = (size: number) => (CENTER + size) / 2; // circles just touching
const distance = (size: number) => ({
  far: 44, // where it arrives from
  tucked: touch(size) - size * 0.1, // 10% of it tucked behind the middle one
  rest: touch(size) + 1.5, // the spacing it settles at
  nudge: touch(size) + 2.1, // pushed out a touch during the pop
});

// 0 nothing yet, 1 middle circle in, 2 the four arrive and tuck behind it,
// 3 they ease out to their spacing, 4 the pop, 5 at rest.
type Stage = 0 | 1 | 2 | 3 | 4 | 5;
const AT: [Stage, number][] = [
  [1, 0],
  [2, 650],
  [3, 1800],
  [4, 2700],
  [5, 3000],
];

function outerStyle(
  stage: Stage,
  dir: [number, number],
  size: number,
): CSSProperties {
  const d = distance(size);
  const dist =
    stage <= 1
      ? d.far
      : stage === 2
        ? d.tucked
        : stage === 4
          ? d.nudge
          : d.rest;
  const transition =
    stage === 2
      ? "transform 1050ms cubic-bezier(0.22, 1, 0.36, 1), opacity 500ms ease-out"
      : stage === 3
        ? "transform 800ms cubic-bezier(0.45, 0, 0.2, 1)"
        : stage === 4
          ? "transform 260ms cubic-bezier(0.2, 0.7, 0.3, 1)"
          : stage === 5
            ? "transform 650ms cubic-bezier(0.4, 0, 0.2, 1)"
            : "none";
  return {
    transform: `translate(calc(var(--u) * ${(dir[0] * dist).toFixed(3)}), calc(var(--u) * ${(dir[1] * dist).toFixed(3)}))`,
    opacity: stage >= 2 ? 1 : 0,
    transition,
  };
}

function centerStyle(stage: Stage): CSSProperties {
  return {
    transform: `scale(${stage === 0 ? 0.7 : stage === 4 ? 1.045 : 1})`,
    opacity: stage >= 1 ? 1 : 0,
    transition:
      stage === 1
        ? "transform 800ms cubic-bezier(0.22, 1, 0.36, 1), opacity 600ms ease-out"
        : stage === 4
          ? "transform 260ms cubic-bezier(0.2, 0.7, 0.3, 1)"
          : stage === 5
            ? "transform 650ms cubic-bezier(0.4, 0, 0.2, 1)"
            : "none",
  };
}

// Paint dropped into water: while the pointer is over a circle, soft blobs of
// colour spread out from it and chase the pointer, each one lagging further
// behind the last, so the colour swirls after the cursor. When the pointer
// leaves, the colour slowly dissolves.
const PAINT = [
  { rgb: "112,199,244", follow: 0.16, alpha: 0.85, radius: 0.34 },
  { rgb: "50,159,224", follow: 0.085, alpha: 0.7, radius: 0.4 },
  { rgb: "72,214,190", follow: 0.05, alpha: 0.55, radius: 0.44 },
];

function usePaint() {
  const layer = useRef<HTMLDivElement>(null);
  const state = useRef({
    tx: 50,
    ty: 50,
    spread: 0,
    want: 0,
    raf: 0,
    blobs: PAINT.map(() => ({ x: 50, y: 50 })),
  });

  const frame = () => {
    const st = state.current;
    const el = layer.current;
    if (!el) return;
    st.spread += (st.want - st.spread) * (st.want ? 0.07 : 0.035);
    const stops: string[] = [];
    PAINT.forEach((p, i) => {
      const b = st.blobs[i];
      b.x += (st.tx - b.x) * p.follow;
      b.y += (st.ty - b.y) * p.follow;
      const r = (p.radius * 100 * (0.35 + st.spread * 0.65)).toFixed(1);
      stops.push(
        `radial-gradient(circle at ${b.x.toFixed(1)}% ${b.y.toFixed(1)}%, rgba(${p.rgb},${p.alpha}) 0%, rgba(${p.rgb},${(p.alpha * 0.45).toFixed(2)}) ${(+r * 0.5).toFixed(1)}%, transparent ${r}%)`,
      );
    });
    el.style.background = stops.join(", ");
    el.style.opacity = Math.min(1, st.spread * 1.4).toFixed(3);
    if (st.want || st.spread > 0.005) {
      st.raf = requestAnimationFrame(frame);
    } else {
      st.raf = 0;
      el.style.opacity = "0";
    }
  };

  const aim = (event: PointerEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const st = state.current;
    st.tx = ((event.clientX - rect.left) / rect.width) * 100;
    st.ty = ((event.clientY - rect.top) / rect.height) * 100;
  };

  const handlers = {
    onPointerEnter: (event: PointerEvent<HTMLElement>) => {
      const st = state.current;
      aim(event);
      // A fresh drop of paint starts where the pointer came in.
      if (st.spread < 0.02)
        st.blobs.forEach((b) => ((b.x = st.tx), (b.y = st.ty)));
      st.want = 1;
      if (!st.raf) st.raf = requestAnimationFrame(frame);
    },
    onPointerMove: aim,
    onPointerLeave: () => {
      state.current.want = 0;
    },
  };

  useEffect(() => {
    const st = state.current;
    return () => cancelAnimationFrame(st.raf);
  }, []);

  return { layer, handlers };
}

function Bubble({
  step,
  size,
  float,
  floatSeconds,
  floatDelay,
}: {
  step: Step;
  // Diameter in `u`, so the text and padding can scale with the circle.
  size: number;
  float: boolean;
  floatSeconds: number;
  floatDelay: number;
}) {
  const { layer, handlers } = usePaint();
  const big = size >= 15;
  const small = size < 12.5;
  return (
    <div
      {...handlers}
      style={{
        animationDuration: `${floatSeconds}s`,
        animationDelay: `${floatDelay}s`,
        padding: `calc(var(--u) * ${(size * 0.19).toFixed(2)})`,
      }}
      className={`relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-full border border-white/20 bg-gradient-to-br from-brand-sky/[0.26] via-brand-blue/[0.12] to-white/[0.03] text-center shadow-[0_0_60px_-10px_rgba(50,159,224,0.5),inset_0_0_40px_rgba(181,229,255,0.09)] backdrop-blur-sm motion-reduce:animate-none ${
        float ? "animate-bob" : ""
      }`}
    >
      {/* The paint: sits under the text and is clipped to the circle. */}
      <div
        ref={layer}
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 blur-xl"
      />
      <span
        className={`relative bg-gradient-to-b from-white to-brand-sky bg-clip-text font-bold leading-none text-transparent ${
          big ? "text-5xl" : small ? "text-3xl" : "text-4xl"
        }`}
      >
        {step.number}
      </span>
      <h3
        className={`relative mt-2 font-semibold text-white ${
          big ? "text-xl" : small ? "text-base" : "text-lg"
        }`}
      >
        {step.title}
      </h3>
      <p
        className={`relative mt-1.5 leading-snug text-brand-ice/85 ${
          small ? "text-[0.8rem]" : "text-[0.86rem]"
        }`}
      >
        {step.description}
      </p>
    </div>
  );
}

export default function HowWeWork() {
  const ref = useRef<HTMLElement>(null);
  const [stage, setStage] = useState<Stage>(0);

  // Play the sequence once, the first time the section is on screen.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const timers: number[] = [];
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        if (reduce) {
          setStage(5);
          return;
        }
        for (const [s, ms] of AT) {
          timers.push(window.setTimeout(() => setStage(s), ms));
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      timers.forEach(window.clearTimeout);
    };
  }, []);

  const float = stage >= 5;
  const [first, ...others] = steps;

  return (
    <section
      ref={ref}
      id="how-we-work"
      className="relative w-full py-20 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <div className="grid items-center gap-14 lg:grid-cols-[40%_60%] lg:gap-6">
          <div className="max-w-md">
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-brand-sky">
              How We Work
            </p>
            <h2 className="text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-5xl">
              From understanding to delivery.
            </h2>
          </div>

          {/* Wide screens: the circles gather round the middle one. */}
          <div
            className="relative hidden lg:block"
            style={
              {
                "--u": "1.15rem",
                height: "calc(var(--u) * 40)",
              } as CSSProperties
            }
          >
            <div
              style={{
                width: "calc(var(--u) * 16)",
                height: "calc(var(--u) * 16)",
                marginLeft: "calc(var(--u) * -8)",
                marginTop: "calc(var(--u) * -8)",
                ...centerStyle(stage),
              }}
              className="absolute left-1/2 top-1/2 z-10"
            >
              <Bubble
                step={first}
                size={CENTER}
                float={float}
                floatSeconds={7.2}
                floatDelay={0}
              />
            </div>

            {others.map((step, i) => {
              const o = OUTER[i];
              return (
                <div
                  key={step.number}
                  style={{
                    width: `calc(var(--u) * ${o.size})`,
                    height: `calc(var(--u) * ${o.size})`,
                    marginLeft: `calc(var(--u) * ${-o.size / 2})`,
                    marginTop: `calc(var(--u) * ${-o.size / 2})`,
                    ...outerStyle(stage, o.dir, o.size),
                  }}
                  className="absolute left-1/2 top-1/2 z-0"
                >
                  <Bubble
                    step={step}
                    size={o.size}
                    float={float}
                    floatSeconds={5.8 + i * 0.9}
                    floatDelay={-i * 1.7}
                  />
                </div>
              );
            })}
          </div>

          {/* Phones and tablets: a simple stack. */}
          <ol
            style={{ "--u": "1.1rem" } as CSSProperties}
            className="flex flex-col items-center gap-8 lg:hidden"
          >
            {steps.map((step) => (
              <li
                key={step.number}
                className={`h-[calc(var(--u)*14)] w-[calc(var(--u)*14)] list-none transition-all duration-1000 ease-out ${
                  stage >= 1 ? "scale-100 opacity-100" : "scale-75 opacity-0"
                }`}
              >
                <Bubble
                  step={step}
                  size={13}
                  float={stage >= 5}
                  floatSeconds={6.5}
                  floatDelay={0}
                />
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
