"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import type { Product } from "./productsData";
import Robot3D from "./Robot3D";

// The robot reads on its phone for 2 seconds, looks up, and a product is
// shown for 7 seconds. Then it goes back to its phone and the next product
// follows, round and round.
const READ_MS = 2000;
const WATCH_MS = 7000;
// The product is swapped just after the card has faded out.
const SWAP_MS = 700;

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

export default function RobotProjector({ items }: { items: Product[] }) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);
  const [looking, setLooking] = useState(false);
  const [index, setIndex] = useState(0);

  // Begin once the scene scrolls into view.
  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [reduced]);

  // The loop: reading -> looking up (card shown) -> reading -> ...
  useEffect(() => {
    if (!started || reduced) return;
    const id = window.setTimeout(
      () => setLooking((l) => !l),
      looking ? WATCH_MS : READ_MS,
    );
    return () => window.clearTimeout(id);
  }, [started, looking, reduced]);

  // Once the card has faded out, line up the next product.
  const hasShown = useRef(false);
  useEffect(() => {
    if (looking) {
      hasShown.current = true;
      return;
    }
    if (!hasShown.current) return;
    const id = window.setTimeout(
      () => setIndex((i) => (i + 1) % items.length),
      SWAP_MS,
    );
    return () => window.clearTimeout(id);
  }, [looking, items.length]);

  const shown = reduced || looking;

  return (
    <div
      ref={ref}
      className="grid items-end gap-6 md:grid-cols-[11rem_1fr] md:gap-8"
    >
      {/* The robot, standing at the bottom left */}
      <Robot3D
        looking={shown}
        still={reduced}
        className="mx-auto h-64 w-40 md:h-72 md:w-44"
      />

      {/* The product it is looking at. Every product sits in the same grid
          cell and only the current one is visible, so the card is always as
          tall as the tallest one and nothing moves when the product changes. */}
      <article
        aria-live="polite"
        style={{
          transitionDelay: shown ? "350ms" : "0ms",
          transformOrigin: "left bottom",
        }}
        className={`grid overflow-hidden rounded-3xl glass-navy transition-all duration-700 ease-out motion-reduce:transition-none ${
          shown
            ? "translate-x-0 scale-100 opacity-100 blur-0"
            : "-translate-x-8 scale-[0.85] opacity-0 blur-sm"
        }`}
      >
        {items.map((product, i) => (
          <ProductFace
            key={product.name ?? i}
            product={product}
            number={i + 1}
            active={i === index}
          />
        ))}
      </article>
    </div>
  );
}

// One product's card: its number and name at the top left (30% of the card),
// the full picture from the middle to the right edge, the description under
// the name, and the key features in a row along the bottom.
function ProductFace({
  product,
  number,
  active,
}: {
  product: Product;
  number: number;
  active: boolean;
}) {
  const name = product.name ?? "Product";
  return (
    <div
      aria-hidden={!active}
      className={`col-start-1 row-start-1 flex flex-col p-6 sm:p-8 ${
        active ? "visible" : "invisible"
      }`}
    >
      <div className="grid flex-1 gap-6 md:grid-cols-2 md:gap-10">
        <div className="flex flex-col">
          <div className="md:w-[60%]">
            <p className="bg-gradient-to-b from-brand-ice to-brand-blue/60 bg-clip-text text-6xl font-bold leading-none tracking-tight text-transparent sm:text-7xl">
              {String(number).padStart(2, "0")}
            </p>
            <h3 className="mt-3 text-2xl font-semibold leading-tight text-white">
              {name}
            </h3>
            <div className="mt-4 h-0.5 w-12 rounded-full bg-brand-sky" />
          </div>
          <p className="mt-5 text-sm leading-relaxed text-brand-ice/80 sm:text-base">
            {product.description}
          </p>
        </div>

        {/* The whole picture, never cropped, in a frame of fixed height. */}
        <div className="relative h-56 overflow-hidden rounded-2xl bg-[#E8F0F7] ring-1 ring-white/15 sm:h-72 md:h-[19rem]">
          {product.screenshot && (
            <Image
              src={product.screenshot}
              alt={product.screenshotAlt ?? `${name} screenshot`}
              fill
              sizes="(min-width: 768px) 45vw, 100vw"
              className="object-contain p-1.5"
            />
          )}
        </div>
      </div>

      <ul className="mt-6 grid gap-3 border-t border-white/10 pt-5 sm:grid-cols-3">
        {product.features?.map((feature, i) => (
          <li key={feature} className="flex items-center gap-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-brand-sky/40 bg-brand-sky/10 text-xs font-semibold text-brand-sky">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="text-sm font-medium leading-snug text-brand-ice">
              {feature}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
