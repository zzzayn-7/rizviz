"use client";

import { useRef } from "react";

type Industry = {
  name: string;
  description: string;
  art: 0 | 1 | 2 | 3 | 4;
};

const industries: Industry[] = [
  {
    name: "Finance & Accounting",
    description:
      "Systems that automate reporting, reconciliation, and approvals, so finance teams get accurate numbers faster.",
    art: 0,
  },
  {
    name: "Technology & digital",
    description:
      "Software, cloud, and AI engineering for teams that build, run, and scale digital products.",
    art: 1,
  },
  {
    name: "Sales & Marketing",
    description:
      "Tools that connect leads, campaigns, and customer data, helping teams reach and keep their customers.",
    art: 2,
  },
  {
    name: "Operations & Administration",
    description:
      "Workflow and process systems that cut manual handoffs and keep daily operations running smoothly.",
    art: 3,
  },
  {
    name: "Healthcare",
    description:
      "Secure, dependable systems for records, scheduling, and billing, built around how clinical teams work.",
    art: 4,
  },
];

// Soft, glassy shapes at the foot of each card, drawn in the site's navy, steel, blue and grey. Each
// card gets its own: flowing waves, rings, a peak, ripples and overlapping discs.
function Art({ kind }: { kind: Industry["art"] }) {
  const id = `ind-art-${kind}`;
  return (
    <svg
      aria-hidden
      viewBox="0 0 400 230"
      preserveAspectRatio="xMidYMax slice"
      className="absolute inset-x-0 bottom-0 h-[44%] w-full transition duration-500"
    >
      <defs>
        <linearGradient id={`${id}-a`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#b5e5ff" stopOpacity="0.9" />
          <stop offset="0.5" stopColor="#329fe0" stopOpacity="0.65" />
          <stop offset="1" stopColor="#285b7a" stopOpacity="0.9" />
        </linearGradient>
        <linearGradient id={`${id}-b`} x1="1" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#dbe6ee" stopOpacity="0.9" />
          <stop offset="0.55" stopColor="#8fa6b8" stopOpacity="0.7" />
          <stop offset="1" stopColor="#285b7a" stopOpacity="0.85" />
        </linearGradient>
        <linearGradient id={`${id}-c`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#285b7a" stopOpacity="0.85" />
          <stop offset="1" stopColor="#0b1d2d" stopOpacity="1" />
        </linearGradient>
        <radialGradient id={`${id}-r`} cx="0.35" cy="0.3" r="0.9">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="0.45" stopColor="#8fc9ee" stopOpacity="0.7" />
          <stop offset="1" stopColor="#285b7a" stopOpacity="0.9" />
        </radialGradient>
      </defs>

      {kind === 0 && (
        <>
          <path
            d="M0 120 C60 70 125 95 190 118 S320 150 400 80 L400 230 L0 230Z"
            fill={`url(#${id}-b)`}
          />
          <path
            d="M0 150 C70 100 140 125 210 145 S335 172 400 118 L400 230 L0 230Z"
            fill={`url(#${id}-a)`}
          />
          <path
            d="M0 185 C80 150 160 170 240 180 S350 195 400 168 L400 230 L0 230Z"
            fill={`url(#${id}-c)`}
          />
          <path
            d="M0 150 C70 100 140 125 210 145 S335 172 400 118"
            fill="none"
            stroke="#fff"
            strokeOpacity="0.7"
            strokeWidth="1.5"
          />
        </>
      )}

      {kind === 1 && (
        <>
          {[210, 165, 120, 78, 38].map((r, i) => (
            <circle
              key={r}
              cx="200"
              cy="250"
              r={r}
              fill={`url(#${id}-${i % 2 ? "b" : "a"})`}
              stroke="#fff"
              strokeOpacity="0.6"
              strokeWidth="1.5"
            />
          ))}
        </>
      )}

      {kind === 2 && (
        <>
          <path
            d="M0 230 C40 160 70 110 130 128 C180 142 195 70 255 48 C320 26 345 120 400 92 L400 230Z"
            fill={`url(#${id}-b)`}
          />
          <path
            d="M0 230 C60 190 110 150 170 168 C225 184 250 120 310 118 C355 116 380 150 400 140 L400 230Z"
            fill={`url(#${id}-a)`}
          />
          <path
            d="M0 230 C90 205 170 215 250 200 S360 190 400 205 L400 230Z"
            fill={`url(#${id}-c)`}
          />
          <path
            d="M130 128 C180 142 195 70 255 48 C320 26 345 120 400 92"
            fill="none"
            stroke="#fff"
            strokeOpacity="0.75"
            strokeWidth="1.5"
          />
        </>
      )}

      {kind === 3 && (
        <>
          <path
            d="M0 110 C50 140 110 90 170 100 S290 150 400 100 L400 230 L0 230Z"
            fill={`url(#${id}-a)`}
          />
          <path
            d="M0 145 C60 170 120 125 190 138 S310 180 400 135 L400 230 L0 230Z"
            fill={`url(#${id}-b)`}
          />
          <path
            d="M0 180 C70 200 140 165 215 175 S330 205 400 172 L400 230 L0 230Z"
            fill={`url(#${id}-c)`}
          />
          <path
            d="M0 145 C60 170 120 125 190 138 S310 180 400 135"
            fill="none"
            stroke="#fff"
            strokeOpacity="0.7"
            strokeWidth="1.5"
          />
        </>
      )}

      {kind === 4 && (
        <>
          <circle cx="120" cy="190" r="95" fill={`url(#${id}-b)`} />
          <circle cx="265" cy="165" r="115" fill={`url(#${id}-r)`} />
          <circle cx="355" cy="215" r="80" fill={`url(#${id}-c)`} />
          <circle
            cx="265"
            cy="165"
            r="115"
            fill="none"
            stroke="#fff"
            strokeOpacity="0.7"
            strokeWidth="1.5"
          />
          <circle
            cx="120"
            cy="190"
            r="95"
            fill="none"
            stroke="#fff"
            strokeOpacity="0.5"
            strokeWidth="1.5"
          />
        </>
      )}
    </svg>
  );
}

function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={`h-4 w-4 ${className}`}
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

// "Industries we serve": a row of cards that slides sideways, each with a short line about how Rizviz
// helps that field and a soft shape at its foot.
export default function Industries() {
  const row = useRef<HTMLUListElement>(null);
  const slide = (direction: 1 | -1) => {
    const el = row.current;
    if (!el) return;
    const card = el.querySelector("li");
    const step = (card?.getBoundingClientRect().width ?? 340) + 30;
    el.scrollBy({ left: direction * step, behavior: "smooth" });
  };

  return (
    <section id="industries" className="relative w-full pb-0 pt-20 sm:pt-28">
      <div className="mx-auto flex max-w-7xl items-end justify-between gap-6 px-6 sm:px-10">
        <h2 className="text-4xl font-medium leading-[1.08] tracking-tight text-brand-navy shine-heading sm:text-5xl lg:text-6xl">
          Industries we serve
        </h2>
        {/* the arrows that slide the row sit at the top right */}
        <div className="flex shrink-0 gap-3 pb-1">
          {([-1, 1] as const).map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => slide(d)}
              aria-label={d === 1 ? "Next industries" : "Previous industries"}
              className="glass-navy btn-glow flex h-11 w-11 items-center justify-center rounded-full text-white"
            >
              <Arrow className={d === -1 ? "rotate-180" : ""} />
            </button>
          ))}
        </div>
      </div>

      {/* The row starts on the page's left line and runs off the right edge, so the next card peeks in. */}
      <ul
        ref={row}
        // the padding above and below leaves room for the cards' shadows: a scrolling row clips anything
        // outside its box, which would otherwise show as a faint edge across the page
        className="industries-row -mb-8 mt-4 flex snap-x snap-mandatory gap-[30px] overflow-x-auto pb-24 pr-6 pt-10 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {industries.map((item) => (
          <li
            key={item.name}
            // The same colour as the page behind it, told apart only by its edge and shadow. On hover it
            // frosts over into navy glass, and the shape at its foot blurs behind it.
            className="group relative flex min-h-[29rem] w-[min(82vw,21.5rem)] shrink-0 snap-start flex-col overflow-hidden rounded-3xl border border-brand-navy/15 bg-transparent shadow-[0_24px_50px_-30px_rgba(11,29,45,0.35)] transition-shadow duration-500 hover:shadow-[0_30px_60px_-24px_rgba(11,29,45,0.6)]"
          >
            <Art kind={item.art} />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-0 backdrop-blur-[5px] transition-opacity duration-500 ease-out group-hover:opacity-100"
              style={{
                background:
                  "linear-gradient(165deg, rgba(11,29,45,0.86) 0%, rgba(11,29,45,0.74) 55%, rgba(14,38,58,0.62) 100%)",
              }}
            />
            <div className="relative z-10 flex flex-col p-8">
              <h3 className="min-h-[4.6rem] text-[1.75rem] font-medium leading-[1.15] text-brand-navy transition-colors duration-500 group-hover:text-white">
                {item.name}
              </h3>
              <p className="mt-4 min-h-[8.5rem] text-base leading-relaxed text-brand-navy/80 transition-colors duration-500 group-hover:text-brand-ice/90">
                {item.description}
              </p>
            </div>
          </li>
        ))}
      </ul>

    </section>
  );
}
