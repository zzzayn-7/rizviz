"use client";

import { useEffect, useState, type CSSProperties } from "react";

// A tall blue-glass screen, in the style of the home page's About graphic,
// that alternates between two scenes every four seconds: software and mobile
// apps, then business scaling.
const SWITCH_MS = 4000;

const SCENES = [
  { id: "software", label: "Software & mobile apps" },
  { id: "scaling", label: "Business scaling" },
] as const;

const delay = (s: number): CSSProperties => ({ animationDelay: `${s}s` });

// Reused gradients, defined once for both scenes.
function Defs() {
  return (
    <defs>
      <linearGradient id="wv-bar" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#ffffff" />
        <stop offset="1" stopColor="rgba(255,255,255,0.45)" />
      </linearGradient>
      <linearGradient id="wv-line" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="rgba(255,255,255,0.55)" />
        <stop offset="1" stopColor="#ffffff" />
      </linearGradient>
      <linearGradient id="wv-card" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="rgba(255,255,255,0.3)" />
        <stop offset="1" stopColor="rgba(255,255,255,0.08)" />
      </linearGradient>
      <radialGradient id="wv-glow" cx="50%" cy="50%" r="50%">
        <stop offset="0" stopColor="rgba(255,255,255,0.55)" stopOpacity="0.4" />
        <stop offset="1" stopColor="rgba(255,255,255,0.55)" stopOpacity="0" />
      </radialGradient>
    </defs>
  );
}

function Phone({ x, y, variant }: { x: number; y: number; variant: 0 | 1 }) {
  const heights = [40, 70, 55, 100, 120];
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect
        width="190"
        height="360"
        rx="34"
        fill="rgba(255,255,255,0.14)"
        stroke="#fff"
        strokeOpacity="0.85"
        strokeWidth="3"
      />
      <rect
        x="62"
        y="12"
        width="66"
        height="9"
        rx="4.5"
        fill="#fff"
        opacity="0.4"
      />
      <rect
        x="16"
        y="38"
        width="158"
        height="306"
        rx="20"
        fill="url(#wv-card)"
      />
      <rect
        x="30"
        y="54"
        width="70"
        height="10"
        rx="5"
        fill="#ffffff"
        opacity="0.9"
      />
      <rect x="30" y="72" width="44" height="7" rx="3.5" fill="#ffffff" />
      {variant === 0 ? (
        <>
          <rect
            x="30"
            y="100"
            width="130"
            height="80"
            rx="14"
            fill="rgba(255,255,255,0.55)"
            opacity="0.9"
            className="wv-pop"
            style={delay(1.0)}
          />
          <rect x="44" y="118" width="60" height="9" rx="4.5" fill="#ffffff" />
          <rect
            x="44"
            y="136"
            width="90"
            height="7"
            rx="3.5"
            fill="#ffffff"
            opacity="0.7"
          />
          <rect
            x="44"
            y="156"
            width="50"
            height="14"
            rx="7"
            fill="#fff"
            opacity="0.35"
          />
          {[0, 1, 2].map((i) => (
            <rect
              key={i}
              x="30"
              y={198 + i * 36}
              width="130"
              height="28"
              rx="10"
              fill="#ffffff"
              opacity="0.16"
              className="wv-rise"
              style={delay(1.2 + i * 0.15)}
            />
          ))}
        </>
      ) : (
        <>
          {heights.map((h, i) => (
            <rect
              key={i}
              x={34 + i * 25}
              y={250 - h}
              width="16"
              height={h}
              rx="5"
              fill="url(#wv-bar)"
              className="wv-bar"
              style={delay(1.1 + i * 0.12)}
            />
          ))}
          <rect
            x="30"
            y="268"
            width="130"
            height="30"
            rx="10"
            fill="#ffffff"
            opacity="0.16"
            className="wv-rise"
            style={delay(1.8)}
          />
        </>
      )}
      <rect
        x="30"
        y="312"
        width="130"
        height="18"
        rx="9"
        fill="#fff"
        opacity="0.25"
      />
      {[0, 1, 2].map((i) => (
        <circle
          key={i}
          cx={62 + i * 33}
          cy="321"
          r="5"
          fill={i === 0 ? "#ffffff" : "rgba(255,255,255,0.5)"}
        />
      ))}
    </g>
  );
}

function SoftwareScene() {
  const rows: [number, number, string][][] = [
    [
      [0, 130, "#ffffff"],
      [150, 330, "#ffffff"],
      [500, 120, "rgba(255,255,255,0.55)"],
    ],
    [
      [44, 220, "rgba(255,255,255,0.55)"],
      [284, 120, "#ffffff"],
      [424, 300, "#ffffff"],
    ],
    [
      [44, 380, "#ffffff"],
      [444, 200, "rgba(255,255,255,0.55)"],
    ],
    [
      [44, 180, "#ffffff"],
      [244, 400, "#ffffff"],
    ],
    [
      [44, 300, "#ffffff"],
      [364, 180, "#ffffff"],
      [564, 90, "rgba(255,255,255,0.55)"],
    ],
    [[0, 100, "#ffffff"]],
  ];
  const phoneX = [170, 505, 840];
  return (
    <svg
      viewBox="0 0 1200 900"
      preserveAspectRatio="xMidYMid meet"
      className="wv-scene block h-full w-full"
      role="img"
      aria-label="Software and mobile apps"
    >
      <Defs />
      <circle cx="600" cy="640" r="420" fill="url(#wv-glow)" />

      {/* Code window */}
      <g>
        <rect
          x="70"
          y="50"
          width="1060"
          height="390"
          rx="26"
          fill="rgba(255,255,255,0.12)"
          stroke="#fff"
          strokeOpacity="0.75"
          strokeWidth="3"
        />
        <path
          d="M70 76a26 26 0 0 1 26-26h1008a26 26 0 0 1 26 26v40H70z"
          fill="rgba(255,255,255,0.2)"
        />
        {["rgba(255,255,255,0.55)", "#ffffff", "rgba(255,255,255,0.6)"].map(
          (c, i) => (
            <circle key={c} cx={110 + i * 28} cy="84" r="8" fill={c} />
          ),
        )}
        <text
          x="990"
          y="92"
          fontSize="22"
          fill="#ffffff"
          opacity="0.8"
          fontFamily="ui-monospace, monospace"
        >
          app.tsx
        </text>
        {rows.map((row, r) => (
          <g key={r} transform={`translate(130 ${148 + r * 46})`}>
            {row.map(([ox, w, fill], i) => (
              <rect
                key={i}
                x={ox}
                y="0"
                width={w}
                height="18"
                rx="9"
                fill={fill}
                className="wv-type"
                style={delay(0.35 + r * 0.32 + i * 0.1)}
              />
            ))}
          </g>
        ))}
        <rect
          x="130"
          y="402"
          width="12"
          height="22"
          rx="2"
          fill="#ffffff"
          style={{ animation: "hw-caret 1s steps(1) infinite" }}
        />
      </g>

      {/* Light running from the code down to each phone */}
      {phoneX.map((x, i) => (
        <g key={x}>
          <path
            d={`M${x + 95} 440 V510`}
            stroke="rgba(255,255,255,0.45)"
            strokeWidth="3"
            fill="none"
            strokeDasharray="4 8"
          />
          <path
            d={`M${x + 95} 440 V510`}
            pathLength={100}
            stroke="url(#wv-line)"
            strokeWidth="5"
            strokeLinecap="round"
            fill="none"
            className="hw-pulse"
            style={delay(-i * 0.9)}
          />
        </g>
      ))}

      {/* Phones */}
      {phoneX.map((x, i) => (
        <g key={x} className="wv-bob" style={delay(-i * 1.8)}>
          <Phone x={x} y={510} variant={i === 1 ? 1 : 0} />
        </g>
      ))}
    </svg>
  );
}

function ScalingScene() {
  const stages = ["Start", "Build", "Launch", "Grow", "Scale"];
  const heights = [110, 200, 290, 390, 500];
  const x0 = 110;
  const step = 200;
  const base = 700;
  const pts = heights.map(
    (h, i) => [x0 + i * step + 50, base - h - 34] as const,
  );
  const path = `M${pts[0][0]} ${pts[0][1]} C ${pts[1][0] - 60} ${pts[0][1] - 10}, ${pts[1][0] - 60} ${pts[1][1]}, ${pts[1][0]} ${pts[1][1]} S ${pts[2][0] - 60} ${pts[2][1]}, ${pts[2][0]} ${pts[2][1]} S ${pts[3][0] - 60} ${pts[3][1]}, ${pts[3][0]} ${pts[3][1]} S ${pts[4][0] - 60} ${pts[4][1]}, ${pts[4][0]} ${pts[4][1]}`;
  const chips = ["Efficiency", "Reach", "Revenue"];
  return (
    <svg
      viewBox="0 0 1200 900"
      preserveAspectRatio="xMidYMid meet"
      className="wv-scene block h-full w-full"
      role="img"
      aria-label="Business scaling"
    >
      <Defs />
      <circle cx="700" cy="380" r="420" fill="url(#wv-glow)" />

      {/* Gridlines */}
      {[0, 1, 2, 3, 4].map((i) => (
        <line
          key={i}
          x1="80"
          x2="1120"
          y1={160 + i * 130}
          y2={160 + i * 130}
          stroke="#ffffff"
          strokeOpacity="0.14"
          strokeWidth="2"
        />
      ))}
      <line
        x1="80"
        x2="1120"
        y1={base + 2}
        y2={base + 2}
        stroke="#ffffff"
        strokeOpacity="0.5"
        strokeWidth="3"
      />

      {/* Bars that climb stage by stage */}
      {heights.map((h, i) => (
        <g key={stages[i]}>
          <rect
            x={x0 + i * step}
            y={base - h}
            width="100"
            height={h}
            rx="14"
            fill="url(#wv-bar)"
            className="wv-bar"
            style={delay(0.25 + i * 0.2)}
          />
          <text
            x={x0 + i * step + 50}
            y={base + 46}
            textAnchor="middle"
            fontSize="28"
            fontWeight="600"
            fill="#ffffff"
            opacity="0.9"
            fontFamily="ui-sans-serif, system-ui"
          >
            {stages[i]}
          </text>
        </g>
      ))}

      {/* The growth line draws itself over the bars */}
      <path
        d={path}
        pathLength={1}
        stroke="url(#wv-line)"
        strokeWidth="9"
        strokeLinecap="round"
        fill="none"
        className="wv-draw"
      />
      {pts.map(([x, y], i) => (
        <circle
          key={i}
          cx={x}
          cy={y}
          r="12"
          fill="#ffffff"
          stroke="rgba(255,255,255,0.55)"
          strokeWidth="5"
          className="wv-pop"
          style={delay(0.7 + i * 0.32)}
        />
      ))}

      {/* What scales */}
      {chips.map((c, i) => (
        <g key={c} className="wv-rise" style={delay(1.2 + i * 0.25)}>
          <rect
            x={80 + i * 350}
            y="790"
            width="320"
            height="84"
            rx="24"
            fill="rgba(255,255,255,0.14)"
            stroke="#ffffff"
            strokeOpacity="0.6"
            strokeWidth="3"
          />
          <path
            d={`M${120 + i * 350} 836 l16 -18 l14 11 l20 -25`}
            stroke="#ffffff"
            strokeWidth="7"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <text
            x={198 + i * 350}
            y="844"
            fontSize="32"
            fontWeight="700"
            fill="#ffffff"
            fontFamily="ui-sans-serif, system-ui"
          >
            {c}
          </text>
        </g>
      ))}
    </svg>
  );
}

export default function WhoWeAreVisual() {
  const [index, setIndex] = useState(0);

  // Every four seconds, move to the other scene. Choosing one by hand
  // restarts the four seconds.
  useEffect(() => {
    const id = window.setTimeout(
      () => setIndex((i) => (i + 1) % SCENES.length),
      SWITCH_MS,
    );
    return () => window.clearTimeout(id);
  }, [index]);

  return (
    // A pane of blue glass: frosted, lit from the top-left, with everything
    // drawn on it in white. It fills the height of its column.
    <div className="relative isolate flex h-full min-h-[22rem] flex-col overflow-hidden rounded-3xl border border-white/45 bg-[rgba(110,185,242,0.36)] p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.65),inset_0_0_60px_rgba(255,255,255,0.1),0_24px_60px_-20px_rgba(8,50,100,0.35)] backdrop-blur-2xl sm:p-4">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background: [
            "linear-gradient(125deg, rgba(255,255,255,0.38) 0%, rgba(255,255,255,0.08) 34%, rgba(255,255,255,0) 52%, rgba(255,255,255,0.14) 100%)",
            "radial-gradient(60% 60% at 80% 85%, rgba(255,255,255,0.16), transparent 70%)",
            "radial-gradient(50% 50% at 10% 8%, rgba(255,255,255,0.28), transparent 70%)",
          ].join(", "),
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.12]"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(70% 70% at 60% 60%, black, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(70% 70% at 60% 60%, black, transparent 80%)",
        }}
      />
      <div className="mb-2 flex shrink-0 items-center justify-between gap-4 sm:mb-3">
        <p className="rounded-full border border-white/40 bg-white/[0.14] px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-widest text-white sm:px-4 sm:text-xs">
          {SCENES[index].label}
        </p>
        <div
          className="flex items-center gap-2"
          role="tablist"
          aria-label="Visual"
        >
          {SCENES.map((s, i) => (
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

      <div className="min-h-0 flex-1">
        {index === 0 ? (
          <SoftwareScene key="software" />
        ) : (
          <ScalingScene key="scaling" />
        )}
      </div>
    </div>
  );
}
