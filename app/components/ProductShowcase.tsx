"use client";

import Image from "next/image";
import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
} from "react";
import DemoRequestDialog, { type Origin } from "./DemoRequestDialog";
import type { Product } from "./productsData";

// One loop for each product:
//   the card narrows into a square -> a cube takes its place -> the cube
//   shrinks and spins -> the cube grows big -> it opens out into the next
//   product's card.
const HOLD_MS = 5000;
const NARROW_MS = 650;
const TO_CUBE_MS = 350;
const SHRINK_MS = 900;
const SPIN_MS = 2000;
const PREP_MS = 60;
const GROW_MS = 1000;
const FROM_CUBE_MS = 350;
const WIDEN_MS = 800;

type Phase =
  | "show"
  | "narrow"
  | "toCube"
  | "shrinkCube"
  | "spin"
  | "prep"
  | "growCube"
  | "fromCube"
  | "widen";

const NEXT: Record<Phase, [Phase, number]> = {
  show: ["narrow", HOLD_MS],
  narrow: ["toCube", NARROW_MS],
  toCube: ["shrinkCube", TO_CUBE_MS],
  shrinkCube: ["spin", SHRINK_MS],
  spin: ["prep", SPIN_MS],
  prep: ["growCube", PREP_MS],
  growCube: ["fromCube", GROW_MS],
  fromCube: ["widen", FROM_CUBE_MS],
  widen: ["show", WIDEN_MS],
};

const PERSPECTIVE = 1800;
const CUBE = 112; // px
const HALF = CUBE / 2;
const EASE = "cubic-bezier(0.65, 0, 0.35, 1)";

const reducedQuery = "(prefers-reduced-motion: reduce)";

function useReducedMotion() {
  return useSyncExternalStore(
    (notify) => {
      const query = window.matchMedia(reducedQuery);
      query.addEventListener("change", notify);
      return () => query.removeEventListener("change", notify);
    },
    () => window.matchMedia(reducedQuery).matches,
    () => false,
  );
}

const FACE_TURNS = [
  "rotateY(0deg)",
  "rotateY(90deg)",
  "rotateY(180deg)",
  "rotateY(270deg)",
  "rotateX(90deg)",
  "rotateX(-90deg)",
];

// A glowing network of nodes, drawn on every face of the cube.
function CubeFace() {
  const nodes: [number, number][] = [
    [18, 24],
    [82, 20],
    [88, 60],
    [64, 88],
    [22, 80],
    [8, 52],
  ];
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      aria-hidden
      className="h-full w-full"
    >
      <defs>
        <radialGradient id="cube-core" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#b5e5ff" />
          <stop offset="0.45" stopColor="#329fe0" stopOpacity="0.9" />
          <stop offset="1" stopColor="#329fe0" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="50" cy="50" r="34" stroke="#70c7f4" strokeOpacity="0.18" />
      <circle
        cx="50"
        cy="50"
        r="22"
        stroke="#70c7f4"
        strokeOpacity="0.35"
        strokeDasharray="2 4"
      />
      {nodes.map(([x, y], i) => {
        const [nx, ny] = nodes[(i + 1) % nodes.length];
        return (
          <g key={i}>
            <line
              x1="50"
              y1="50"
              x2={x}
              y2={y}
              stroke="#70c7f4"
              strokeOpacity="0.5"
              vectorEffect="non-scaling-stroke"
            />
            <line
              x1={x}
              y1={y}
              x2={nx}
              y2={ny}
              stroke="#70c7f4"
              strokeOpacity="0.25"
              vectorEffect="non-scaling-stroke"
            />
            <circle cx={x} cy={y} r="2.4" fill="#b5e5ff" />
          </g>
        );
      })}
      <circle cx="50" cy="50" r="22" fill="url(#cube-core)" />
      <circle cx="50" cy="50" r="3.2" fill="#ffffff" />
    </svg>
  );
}

export default function ProductShowcase({ items }: { items: Product[] }) {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("show");
  const [turns, setTurns] = useState(0); // completed half... full spins, x720
  const [box, setBox] = useState({ w: 1200, h: 528 });
  const [demoFor, setDemoFor] = useState<{
    product: string;
    origin: Origin;
  } | null>(null);
  const sceneRef = useRef<HTMLDivElement>(null);

  const count = items.length;

  // The cube grows to the size of the card's shorter side, and the card
  // narrows to that same square, so the two line up.
  useEffect(() => {
    const el = sceneRef.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => {
      setBox({ w: entry.contentRect.width, h: entry.contentRect.height });
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Runs the loop forever. Each phase schedules the next.
  useEffect(() => {
    if (reduced) {
      const id = setInterval(() => setIndex((i) => (i + 1) % count), 7000);
      return () => clearInterval(id);
    }
    const [to, wait] = NEXT[phase];
    const id = setTimeout(() => {
      if (to === "prep") setIndex((i) => (i + 1) % count);
      if (to === "widen") setTurns((t) => t + 1);
      setPhase(to);
    }, wait);
    return () => clearTimeout(id);
  }, [phase, reduced, count]);

  const size = Math.min(box.w, box.h);
  const nx = size / box.w;
  const ny = size / box.h;
  // Scale at which the cube's front face looks exactly `size` wide, allowing
  // for the perspective magnifying the face that is nearest the viewer.
  const bigScale = (size * PERSPECTIVE) / (CUBE * PERSPECTIVE + HALF * size);
  const narrow = `scale(${nx}, ${ny})`;

  const cardStyle: Record<Phase, CSSProperties> = {
    show: { transform: "scale(1, 1)", opacity: 1, transition: "none" },
    widen: {
      transform: "scale(1, 1)",
      opacity: 1,
      transition: `transform ${WIDEN_MS}ms cubic-bezier(0.22, 1, 0.36, 1)`,
    },
    narrow: {
      transform: narrow,
      opacity: 1,
      transition: `transform ${NARROW_MS}ms ${EASE}`,
    },
    toCube: {
      transform: narrow,
      opacity: 0,
      transition: "opacity 300ms ease-in",
    },
    shrinkCube: { transform: narrow, opacity: 0, transition: "none" },
    spin: { transform: narrow, opacity: 0, transition: "none" },
    prep: { transform: narrow, opacity: 0, transition: "none" },
    growCube: { transform: narrow, opacity: 0, transition: "none" },
    fromCube: {
      transform: narrow,
      opacity: 1,
      transition: "opacity 300ms ease-out",
    },
  };

  // The card's contents are only visible while it is full width.
  const contentVisible = phase === "show" || phase === "widen";
  const contentStyle: CSSProperties = {
    opacity: contentVisible ? 1 : 0,
    transition:
      phase === "widen"
        ? "opacity 400ms ease-out 450ms"
        : phase === "narrow"
          ? "opacity 250ms ease-in"
          : "none",
  };

  const cubeScale = `scale(${bigScale})`;
  const cubeStyle: Record<Phase, CSSProperties> = {
    show: { opacity: 0, transform: cubeScale, transition: "none" },
    widen: { opacity: 0, transform: cubeScale, transition: "none" },
    narrow: { opacity: 0, transform: cubeScale, transition: "none" },
    toCube: {
      opacity: 1,
      transform: cubeScale,
      transition: "opacity 300ms ease-out",
    },
    shrinkCube: {
      opacity: 1,
      transform: "scale(1)",
      transition: `transform ${SHRINK_MS}ms ${EASE}`,
    },
    spin: { opacity: 1, transform: "scale(1)", transition: "none" },
    prep: { opacity: 1, transform: "scale(1)", transition: "none" },
    growCube: {
      opacity: 1,
      transform: cubeScale,
      transition: `transform ${GROW_MS}ms ${EASE}`,
    },
    fromCube: {
      opacity: 0,
      transform: cubeScale,
      transition: "opacity 300ms ease-in",
    },
  };

  // The cube lies flat (front face to the viewer) when big, and is tilted and
  // turning when small. `base` is always a whole number of full turns.
  const base = turns * 720;
  const rotation: Record<Phase, { x: number; y: number; ms: number }> = {
    show: { x: 0, y: base, ms: 0 },
    widen: { x: 0, y: base, ms: 0 },
    narrow: { x: 0, y: base, ms: 0 },
    toCube: { x: 0, y: base, ms: 0 },
    shrinkCube: { x: -24, y: base + 30, ms: SHRINK_MS },
    spin: { x: -24, y: base + 390, ms: SPIN_MS },
    prep: { x: -24, y: base + 390, ms: 0 },
    growCube: { x: 0, y: base + 720, ms: GROW_MS },
    fromCube: { x: 0, y: base + 720, ms: 0 },
  };
  const rot = rotation[phase];

  const product = items[index];
  const name = product.name ?? "Product";
  const live = reduced || phase === "show" || phase === "widen";

  return (
    <div>
      <div
        ref={sceneRef}
        className="relative h-[46rem] md:h-[33rem]"
        style={{ perspective: `${PERSPECTIVE}px` }}
      >
        {/* The product card */}
        <article
          aria-hidden={!live}
          style={reduced ? undefined : cardStyle[phase]}
          className={`absolute inset-0 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#12304a]/90 to-[#0b1d2d]/90 shadow-[0_40px_90px_-30px_rgba(50,159,224,0.55)] backdrop-blur-xl ${
            live ? "" : "pointer-events-none"
          }`}
        >
          <div
            style={reduced ? undefined : contentStyle}
            className="grid h-full gap-5 p-5 sm:p-7 md:grid-cols-[1.3fr_1fr] md:gap-8"
          >
            <div className="relative min-h-0 overflow-hidden rounded-2xl bg-[#E8F0F7] ring-1 ring-white/10">
              {product.screenshot && (
                <Image
                  key={name}
                  src={product.screenshot}
                  alt={product.screenshotAlt ?? `${name} screenshot`}
                  fill
                  sizes="(min-width: 768px) 700px, 100vw"
                  className={
                    product.screenshotPortrait
                      ? "object-contain py-4"
                      : "object-cover object-top"
                  }
                />
              )}
            </div>

            <div className="flex min-h-0 flex-col justify-center">
              <p className="text-xs font-semibold uppercase tracking-widest text-brand-sky">
                Product {String(index + 1).padStart(2, "0")} /{" "}
                {String(count).padStart(2, "0")}
              </p>
              <h3 className="mt-3 text-2xl font-semibold leading-tight text-white sm:text-3xl">
                {name}
              </h3>
              <p className="mt-4 line-clamp-4 text-sm leading-relaxed text-brand-ice/80 sm:text-base md:line-clamp-none">
                {product.description}
              </p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {product.features?.map((feature) => (
                  <li
                    key={feature}
                    className="rounded-full border border-white/15 bg-white/[0.06] px-3.5 py-1.5 text-xs font-medium text-brand-ice sm:text-sm"
                  >
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={(event) => {
                  const rect = event.currentTarget.getBoundingClientRect();
                  setDemoFor({
                    product: name,
                    origin: {
                      x: rect.left + rect.width / 2,
                      y: rect.top + rect.height / 2,
                    },
                  });
                }}
                className="mt-7 inline-block self-start rounded-full border-2 border-brand-blue bg-brand-blue px-7 py-3 text-sm font-semibold text-white transition-colors duration-500 ease-in-out hover:bg-transparent"
              >
                Request a demo
              </button>
            </div>
          </div>
        </article>

        {/* The cube the card turns into */}
        {!reduced && (
          <div
            aria-hidden
            style={{
              ...cubeStyle[phase],
              width: CUBE,
              height: CUBE,
              marginLeft: -HALF,
              marginTop: -HALF,
            }}
            className="pointer-events-none absolute left-1/2 top-1/2"
          >
            <div
              style={{
                transformStyle: "preserve-3d",
                transform: `rotateX(${rot.x}deg) rotateY(${rot.y}deg)`,
                transition: rot.ms ? `transform ${rot.ms}ms ${EASE}` : "none",
              }}
              className="relative h-full w-full"
            >
              {FACE_TURNS.map((turn) => (
                <div
                  key={turn}
                  style={{ transform: `${turn} translateZ(${HALF}px)` }}
                  className="absolute inset-0 overflow-hidden rounded-[6px] border border-brand-sky/60 bg-gradient-to-br from-[#12354f]/95 to-[#07121d]/95 shadow-[inset_0_0_26px_rgba(112,199,244,0.3)]"
                >
                  <CubeFace />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {demoFor && (
        <DemoRequestDialog
          key={demoFor.product}
          product={demoFor.product}
          origin={demoFor.origin}
          onClose={() => setDemoFor(null)}
        />
      )}
    </div>
  );
}
