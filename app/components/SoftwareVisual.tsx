"use client";

import type { CSSProperties } from "react";
import GlassShell from "./GlassShell";

// Two software scenes: requirements turning into working code and a connected
// app, then separate systems joined together through an API.
const SCENES = [
  { id: "build", label: "Custom software" },
  { id: "api", label: "API integration" },
] as const;

const delay = (s: number): CSSProperties => ({ animationDelay: `${s}s` });
const W = "#ffffff";
const GLASS = "rgba(255,255,255,0.14)";
const FONT = "ui-sans-serif, system-ui";
const icon = {
  fill: "none",
  stroke: W,
  strokeWidth: 6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

function Defs() {
  return (
    <defs>
      <linearGradient id="sw-line" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="rgba(255,255,255,0.5)" />
        <stop offset="1" stopColor={W} />
      </linearGradient>
      <radialGradient id="sw-glow" cx="50%" cy="50%" r="50%">
        <stop offset="0" stopColor={W} stopOpacity="0.4" />
        <stop offset="1" stopColor={W} stopOpacity="0" />
      </radialGradient>
    </defs>
  );
}

const rows: [number, number][][] = [
  [
    [0, 110],
    [130, 220],
  ],
  [
    [40, 190],
    [250, 100],
  ],
  [[40, 300]],
  [
    [40, 150],
    [210, 130],
  ],
  [[0, 90]],
];

const MODULES = ["Finance", "Sales", "Inventory", "Reports"];

function BuildScene() {
  return (
    <svg
      viewBox="0 0 1200 900"
      preserveAspectRatio="xMidYMid meet"
      className="wv-scene block h-full w-full"
      role="img"
      aria-label="Code turning into a working application"
    >
      <Defs />
      <circle cx="600" cy="400" r="440" fill="url(#sw-glow)" />

      {/* The code */}
      <g className="wv-rise" style={delay(0.2)}>
        <rect
          x="70"
          y="60"
          width="500"
          height="420"
          rx="30"
          fill={GLASS}
          stroke={W}
          strokeOpacity="0.75"
          strokeWidth="3"
        />
        <path
          d="M70 90a30 30 0 0 1 30-30h440a30 30 0 0 1 30 30v40H70z"
          fill="rgba(255,255,255,0.2)"
        />
        {[0, 1, 2].map((i) => (
          <circle
            key={i}
            cx={106 + i * 26}
            cy="96"
            r="7"
            fill={W}
            opacity="0.7"
          />
        ))}
        <text
          x="540"
          y="104"
          textAnchor="end"
          fontSize="22"
          fill={W}
          opacity="0.8"
          fontFamily="ui-monospace, monospace"
        >
          app.tsx
        </text>
        {rows.map((row, r) => (
          <g key={r} transform={`translate(110 ${170 + r * 56})`}>
            {row.map(([ox, w], i) => (
              <rect
                key={i}
                x={ox}
                width={w}
                height="18"
                rx="9"
                fill={W}
                opacity={i % 2 ? 0.55 : 0.9}
                className="wv-type"
                style={delay(0.5 + r * 0.3 + i * 0.1)}
              />
            ))}
          </g>
        ))}
      </g>

      {/* Light from the code to the app */}
      <path
        d="M570 270 H650"
        stroke={W}
        strokeOpacity="0.35"
        strokeWidth="3"
        strokeDasharray="4 8"
        fill="none"
      />
      <path
        d="M570 270 H650"
        pathLength={100}
        stroke="url(#sw-line)"
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
        className="hw-pulse"
      />

      {/* The application */}
      <g className="wv-rise" style={delay(1.2)}>
        <rect
          x="650"
          y="60"
          width="480"
          height="420"
          rx="30"
          fill={GLASS}
          stroke={W}
          strokeOpacity="0.75"
          strokeWidth="3"
        />
        <path
          d="M650 90a30 30 0 0 1 30-30h420a30 30 0 0 1 30 30v40H650z"
          fill="rgba(255,255,255,0.2)"
        />
        <text
          x="690"
          y="106"
          fontSize="26"
          fontWeight="700"
          fill={W}
          fontFamily={FONT}
        >
          Your application
        </text>
        {MODULES.map((m, i) => (
          <g key={m} className="wv-pop" style={delay(1.6 + i * 0.25)}>
            <g
              transform={`translate(${690 + (i % 2) * 210} ${170 + Math.floor(i / 2) * 150})`}
            >
              <rect
                width="190"
                height="120"
                rx="22"
                fill="rgba(255,255,255,0.16)"
                stroke={W}
                strokeOpacity="0.7"
                strokeWidth="2.5"
              />
              <text
                x="95"
                y="68"
                textAnchor="middle"
                fontSize="26"
                fontWeight="700"
                fill={W}
                fontFamily={FONT}
              >
                {m}
              </text>
              <rect
                x="45"
                y="84"
                width="100"
                height="10"
                rx="5"
                fill={W}
                opacity="0.45"
              />
            </g>
          </g>
        ))}
      </g>

      {/* From idea to launch */}
      <g className="wv-rise" style={delay(2.4)}>
        <rect
          x="70"
          y="540"
          width="1060"
          height="270"
          rx="30"
          fill={GLASS}
          stroke={W}
          strokeOpacity="0.7"
          strokeWidth="3"
        />
        {["Plan", "Develop", "Test", "Launch"].map((t, i) => (
          <g key={t} transform={`translate(${130 + i * 250} 610)`}>
            <circle
              cx="30"
              cy="30"
              r="30"
              fill={i < 3 ? "none" : W}
              stroke={W}
              strokeWidth="4"
            />
            <path
              d="M16 31 l10 10 l20 -22"
              stroke={i < 3 ? W : "#1d7fe0"}
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            <text
              x="80"
              y="42"
              fontSize="28"
              fontWeight="700"
              fill={W}
              fontFamily={FONT}
            >
              {t}
            </text>
          </g>
        ))}
        <rect
          x="130"
          y="720"
          width="940"
          height="22"
          rx="11"
          fill={W}
          opacity="0.22"
        />
        <rect
          x="130"
          y="720"
          width="940"
          height="22"
          rx="11"
          fill={W}
          className="wv-type"
          style={{ animationDuration: "2.4s", animationDelay: "2.8s" }}
        />
        <text
          x="130"
          y="780"
          fontSize="24"
          fill={W}
          opacity="0.85"
          fontFamily={FONT}
        >
          Built around your processes
        </text>
      </g>
    </svg>
  );
}

const SYSTEMS = [
  { n: "CRM", x: 70, y: 90 },
  { n: "Billing", x: 70, y: 380 },
  { n: "Stock", x: 830, y: 90 },
  { n: "Reports", x: 830, y: 380 },
];

function ApiScene() {
  return (
    <svg
      viewBox="0 0 1200 900"
      preserveAspectRatio="xMidYMid meet"
      className="wv-scene block h-full w-full"
      role="img"
      aria-label="Separate systems connected through an API"
    >
      <Defs />
      <circle cx="600" cy="400" r="440" fill="url(#sw-glow)" />

      {SYSTEMS.map((s, i) => {
        const left = s.x < 600;
        const x1 = left ? s.x + 300 : s.x;
        const d = `M${x1} ${s.y + 100} C ${left ? x1 + 90 : x1 - 90} ${s.y + 100}, ${left ? 470 : 730} 400, ${left ? 500 : 700} 400`;
        return (
          <g key={s.n}>
            <path
              d={d}
              stroke={W}
              strokeOpacity="0.35"
              strokeWidth="3"
              strokeDasharray="4 8"
              fill="none"
            />
            <path
              d={d}
              pathLength={100}
              stroke="url(#sw-line)"
              strokeWidth="6"
              strokeLinecap="round"
              fill="none"
              className="hw-pulse"
              style={delay(-i * 0.9)}
            />
          </g>
        );
      })}

      {SYSTEMS.map((s, i) => (
        <g key={s.n} className="wv-rise" style={delay(0.2 + i * 0.25)}>
          <g transform={`translate(${s.x} ${s.y})`}>
            <rect
              width="300"
              height="200"
              rx="30"
              fill={GLASS}
              stroke={W}
              strokeOpacity="0.75"
              strokeWidth="3"
            />
            <text
              x="150"
              y="86"
              textAnchor="middle"
              fontSize="32"
              fontWeight="700"
              fill={W}
              fontFamily={FONT}
            >
              {s.n}
            </text>
            <rect
              x="60"
              y="116"
              width="180"
              height="12"
              rx="6"
              fill={W}
              opacity="0.5"
            />
            <rect
              x="90"
              y="142"
              width="120"
              height="12"
              rx="6"
              fill={W}
              opacity="0.3"
            />
          </g>
        </g>
      ))}

      {/* The API in the middle */}
      <g className="wv-pop" style={delay(1.0)}>
        <circle
          cx="600"
          cy="400"
          r="108"
          fill="none"
          stroke={W}
          strokeOpacity="0.6"
          strokeWidth="3"
          className="hw-ping"
        />
        <circle
          cx="600"
          cy="400"
          r="84"
          fill={GLASS}
          stroke={W}
          strokeWidth="4"
        />
        <text
          x="600"
          y="420"
          textAnchor="middle"
          fontSize="56"
          fontWeight="800"
          fill={W}
          fontFamily={FONT}
        >
          API
        </text>
      </g>

      {/* The result */}
      <g className="wv-rise" style={delay(1.8)}>
        <rect
          x="70"
          y="650"
          width="1060"
          height="160"
          rx="30"
          fill={GLASS}
          stroke={W}
          strokeOpacity="0.7"
          strokeWidth="3"
        />
        {["Shared data", "Less manual work", "One view"].map((t, i) => (
          <g key={t} transform={`translate(${120 + i * 340} 700)`}>
            <path d="M0 50 l16 -18 l14 11 l20 -25" {...icon} strokeWidth="7" />
            <text
              x="66"
              y="54"
              fontSize="27"
              fontWeight="700"
              fill={W}
              fontFamily={FONT}
            >
              {t}
            </text>
          </g>
        ))}
      </g>
    </svg>
  );
}

export default function SoftwareVisual() {
  return (
    <GlassShell
      scenes={SCENES}
      render={(i) =>
        i === 0 ? <BuildScene key="build" /> : <ApiScene key="api" />
      }
    />
  );
}
