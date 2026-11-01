"use client";

import { useEffect, useState, type ReactNode } from "react";

// The blue-glass screen the service pages show their animated graphics on. It
// swaps between its scenes every five seconds, with tabs to choose one by hand.
const SWITCH_MS = 5000;

export default function GlassShell({
  scenes,
  render,
}: {
  scenes: readonly { id: string; label: string }[];
  render: (index: number) => ReactNode;
}) {
  const [index, setIndex] = useState(0);

  // Choosing a scene by hand restarts the five seconds.
  useEffect(() => {
    const id = window.setTimeout(
      () => setIndex((i) => (i + 1) % scenes.length),
      SWITCH_MS,
    );
    return () => window.clearTimeout(id);
  }, [index, scenes.length]);

  return (
    // A pane of blue glass, with everything drawn on it in white.
    <div className="relative isolate flex h-full min-h-[22rem] flex-col overflow-hidden glass-navy rounded-3xl p-3 sm:p-4">

      <div className="mb-2 flex shrink-0 items-center justify-between gap-4 sm:mb-3">
        <p className="rounded-full border border-white/40 bg-white/[0.14] px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-widest text-white sm:px-4 sm:text-xs">
          {scenes[index].label}
        </p>
        <div
          className="flex items-center gap-2"
          role="tablist"
          aria-label="Visual"
        >
          {scenes.map((s, i) => (
            <button
              key={s.id}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={s.label}
              onClick={() => setIndex(i)}
              className="group py-2"
            >
              <span className="relative block h-1.5 w-10 overflow-hidden rounded-full bg-white/30">
                {i === index && (
                  <span
                    key={index}
                    style={{
                      animation: `wv-timer ${SWITCH_MS}ms linear forwards`,
                    }}
                    className="absolute inset-y-0 left-0 w-full origin-left bg-white motion-reduce:animate-none"
                  />
                )}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="min-h-0 flex-1">{render(index)}</div>
    </div>
  );
}
