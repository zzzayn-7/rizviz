"use client";

import { useEffect, useState, type CSSProperties } from "react";

// A blue-glass screen, like the other service pages, that alternates between
// two ServiceNow scenes every five seconds: an employee request moving from
// submission to resolution, then a service portal with its catalogue and
// dashboard.
const SWITCH_MS = 5000;

const SCENES = [
  { id: "workflow", label: "Request to resolution" },
  { id: "portal", label: "Service portal" },
] as const;

const delay = (s: number): CSSProperties => ({ animationDelay: `${s}s` });

const W = "#ffffff";
const GLASS = "rgba(255,255,255,0.14)";
const FONT = "ui-sans-serif, system-ui";

function Defs() {
  return (
    <defs>
      <linearGradient id="sn-line" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="rgba(255,255,255,0.5)" />
        <stop offset="1" stopColor={W} />
      </linearGradient>
      <linearGradient id="sn-bar" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor={W} />
        <stop offset="1" stopColor="rgba(255,255,255,0.45)" />
      </linearGradient>
      <radialGradient id="sn-glow" cx="50%" cy="50%" r="50%">
        <stop offset="0" stopColor={W} stopOpacity="0.4" />
        <stop offset="1" stopColor={W} stopOpacity="0" />
      </radialGradient>
    </defs>
  );
}

const icon = {
  fill: "none",
  stroke: W,
  strokeWidth: 6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

const STEPS = ["Request", "Route", "Approve", "Resolve"];

function WorkflowScene() {
  const x0 = 70;
  const step = 300;
  return (
    <svg
      viewBox="0 0 1200 900"
      preserveAspectRatio="xMidYMid meet"
      className="wv-scene block h-full w-full"
      role="img"
      aria-label="An employee request moving through a workflow to resolution"
    >
      <Defs />
      <circle cx="600" cy="380" r="440" fill="url(#sn-glow)" />

      {/* The request */}
      <g className="wv-rise" style={delay(0.2)}>
        <rect
          x="70"
          y="60"
          width="1060"
          height="150"
          rx="30"
          fill={GLASS}
          stroke={W}
          strokeOpacity="0.75"
          strokeWidth="3"
        />
        <g transform="translate(110 92)" {...icon}>
          <rect width="64" height="86" rx="10" />
          <path d="M16 26h32M16 44h32M16 62h20" />
        </g>
        <text
          x="210"
          y="122"
          fontSize="30"
          fontWeight="700"
          fill={W}
          fontFamily={FONT}
        >
          New laptop request
        </text>
        <text
          x="210"
          y="166"
          fontSize="24"
          fill={W}
          opacity="0.8"
          fontFamily={FONT}
        >
          REQ-1042 · Raised by an employee
        </text>
        <rect
          x="900"
          y="104"
          width="190"
          height="52"
          rx="26"
          fill="rgba(255,255,255,0.22)"
          stroke={W}
          strokeOpacity="0.7"
          strokeWidth="2"
        />
        <text
          x="995"
          y="139"
          textAnchor="middle"
          fontSize="24"
          fontWeight="700"
          fill={W}
          fontFamily={FONT}
        >
          In progress
        </text>
      </g>

      {/* The steps it goes through */}
      <line
        x1={x0 + 90}
        x2={x0 + 3 * step + 90}
        y1="400"
        y2="400"
        stroke={W}
        strokeOpacity="0.35"
        strokeWidth="4"
        strokeDasharray="4 10"
      />
      <path
        d={`M${x0 + 90} 400 H${x0 + 3 * step + 90}`}
        pathLength={100}
        stroke="url(#sn-line)"
        strokeWidth="8"
        strokeLinecap="round"
        fill="none"
        className="hw-pulse"
      />
      {STEPS.map((s, i) => (
        <g key={s} className="wv-rise" style={delay(0.6 + i * 0.3)}>
          <g transform={`translate(${x0 + i * step} 320)`}>
            <rect
              width="180"
              height="170"
              rx="30"
              fill={GLASS}
              stroke={W}
              strokeOpacity="0.8"
              strokeWidth="3"
            />
            <g transform="translate(60 26)" {...icon}>
              {i === 0 && <path d="M6 14h48v30H22l-12 12V44H6z" />}
              {i === 1 && (
                <path d="M10 8v18a10 10 0 0 0 10 10h28M40 24l12 12-12 12" />
              )}
              {i === 2 && (
                <path d="M30 6l20 8v14c0 14-9 24-20 28C19 52 10 42 10 28V14zM20 30l8 8 14-16" />
              )}
              {i === 3 && <path d="M8 34l16 16L52 12" />}
            </g>
            <text
              x="90"
              y="140"
              textAnchor="middle"
              fontSize="27"
              fontWeight="700"
              fill={W}
              fontFamily={FONT}
            >
              {s}
            </text>
            <circle
              cx="164"
              cy="16"
              r="15"
              fill="#fff"
              className="wv-pop"
              style={delay(1.2 + i * 0.4)}
            />
            <path
              d="M157 16 l5 5 l9 -11"
              stroke="#1d7fe0"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              className="wv-pop"
              style={delay(1.2 + i * 0.4)}
            />
          </g>
        </g>
      ))}

      {/* Who has it, and how long it took */}
      <g className="wv-rise" style={delay(2.2)}>
        <rect
          x="70"
          y="560"
          width="520"
          height="250"
          rx="30"
          fill={GLASS}
          stroke={W}
          strokeOpacity="0.7"
          strokeWidth="3"
        />
        <text
          x="110"
          y="618"
          fontSize="28"
          fontWeight="700"
          fill={W}
          fontFamily={FONT}
        >
          Assigned to
        </text>
        {["IT Support", "Line Manager", "Procurement"].map((t, i) => (
          <g key={t} transform={`translate(110 ${648 + i * 50})`}>
            <circle
              cx="16"
              cy="16"
              r="14"
              fill="none"
              stroke={W}
              strokeWidth="3"
            />
            <path
              d="M9 18 l5 5 l10 -12"
              stroke={W}
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            <text x="48" y="25" fontSize="25" fill={W} fontFamily={FONT}>
              {t}
            </text>
          </g>
        ))}
      </g>
      <g className="wv-rise" style={delay(2.6)}>
        <rect
          x="620"
          y="560"
          width="510"
          height="250"
          rx="30"
          fill={GLASS}
          stroke={W}
          strokeOpacity="0.7"
          strokeWidth="3"
        />
        <text
          x="660"
          y="618"
          fontSize="28"
          fontWeight="700"
          fill={W}
          fontFamily={FONT}
        >
          Progress
        </text>
        <rect
          x="660"
          y="650"
          width="430"
          height="22"
          rx="11"
          fill={W}
          opacity="0.22"
        />
        <rect
          x="660"
          y="650"
          width="430"
          height="22"
          rx="11"
          fill={W}
          className="wv-type"
          style={{ animationDuration: "2.2s", animationDelay: "2.8s" }}
        />
        <text
          x="660"
          y="722"
          fontSize="25"
          fill={W}
          opacity="0.85"
          fontFamily={FONT}
        >
          Every step tracked
        </text>
        <text
          x="660"
          y="764"
          fontSize="25"
          fill={W}
          opacity="0.85"
          fontFamily={FONT}
        >
          Employee kept informed
        </text>
      </g>
    </svg>
  );
}

const TILES = [
  "Request access",
  "Order equipment",
  "Report an issue",
  "Ask HR",
];

function PortalScene() {
  return (
    <svg
      viewBox="0 0 1200 900"
      preserveAspectRatio="xMidYMid meet"
      className="wv-scene block h-full w-full"
      role="img"
      aria-label="A service portal with a catalogue and a dashboard"
    >
      <Defs />
      <circle cx="560" cy="420" r="440" fill="url(#sn-glow)" />

      {/* The portal */}
      <g className="wv-rise" style={delay(0.2)}>
        <rect
          x="70"
          y="60"
          width="1060"
          height="480"
          rx="34"
          fill={GLASS}
          stroke={W}
          strokeOpacity="0.75"
          strokeWidth="3"
        />
        <path
          d="M70 94a34 34 0 0 1 34-34h992a34 34 0 0 1 34 34v62H70z"
          fill="rgba(255,255,255,0.2)"
        />
        <text
          x="120"
          y="121"
          fontSize="28"
          fontWeight="700"
          fill={W}
          fontFamily={FONT}
        >
          Employee service portal
        </text>
        <rect
          x="760"
          y="92"
          width="320"
          height="42"
          rx="21"
          fill="rgba(255,255,255,0.18)"
          stroke={W}
          strokeOpacity="0.5"
          strokeWidth="2"
        />
        <text
          x="790"
          y="121"
          fontSize="22"
          fill={W}
          opacity="0.75"
          fontFamily={FONT}
        >
          Search services…
        </text>
      </g>
      {TILES.map((t, i) => (
        <g key={t} className="wv-rise" style={delay(0.6 + i * 0.25)}>
          <g
            transform={`translate(${120 + (i % 2) * 500} ${200 + Math.floor(i / 2) * 150})`}
          >
            <rect
              width="460"
              height="120"
              rx="26"
              fill="rgba(255,255,255,0.12)"
              stroke={W}
              strokeOpacity="0.6"
              strokeWidth="2.5"
            />
            <g transform="translate(34 28)" {...icon}>
              {i === 0 && (
                <path d="M30 6a14 14 0 1 1-12 21L4 42v10h10v-8h8v-8h8l4-4" />
              )}
              {i === 1 && (
                <path d="M6 14l24-8 24 8v26L30 52 6 40zM6 14l24 10 24-10M30 24v28" />
              )}
              {i === 2 && <path d="M30 6L4 52h52zM30 24v14M30 45v1" />}
              {i === 3 && <path d="M8 12h44v28H26l-12 12V40H8z" />}
            </g>
            <text
              x="110"
              y="72"
              fontSize="28"
              fontWeight="700"
              fill={W}
              fontFamily={FONT}
            >
              {t}
            </text>
          </g>
        </g>
      ))}

      {/* The dashboard behind it */}
      {[
        { l: "Open requests", v: "24" },
        { l: "Resolved today", v: "61" },
        { l: "Avg. response", v: "2h" },
      ].map((k, i) => (
        <g key={k.l} className="wv-rise" style={delay(1.8 + i * 0.25)}>
          <g transform={`translate(${70 + i * 360} 580)`}>
            <rect
              width="340"
              height="130"
              rx="28"
              fill={GLASS}
              stroke={W}
              strokeOpacity="0.7"
              strokeWidth="3"
            />
            <text
              x="30"
              y="52"
              fontSize="25"
              fill={W}
              opacity="0.85"
              fontFamily={FONT}
            >
              {k.l}
            </text>
            <text
              x="30"
              y="108"
              fontSize="52"
              fontWeight="800"
              fill={W}
              fontFamily={FONT}
            >
              {k.v}
            </text>
          </g>
        </g>
      ))}
      <g className="wv-rise" style={delay(2.6)}>
        <rect
          x="70"
          y="740"
          width="1060"
          height="90"
          rx="28"
          fill={GLASS}
          stroke={W}
          strokeOpacity="0.6"
          strokeWidth="3"
        />
        {[40, 62, 50, 80, 66, 90, 74].map((h, i) => (
          <rect
            key={i}
            x={110 + i * 34}
            y={812 - h * 0.6}
            width="20"
            height={h * 0.6}
            rx="6"
            fill="url(#sn-bar)"
            className="wv-bar"
            style={delay(2.8 + i * 0.1)}
          />
        ))}
        <text
          x="400"
          y="796"
          fontSize="27"
          fontWeight="700"
          fill={W}
          fontFamily={FONT}
        >
          One place for every request
        </text>
      </g>
    </svg>
  );
}

export default function ServiceNowVisual() {
  const [index, setIndex] = useState(0);

  // Every five seconds, move to the other scene. Choosing one by hand
  // restarts the five seconds.
  useEffect(() => {
    const id = window.setTimeout(
      () => setIndex((i) => (i + 1) % SCENES.length),
      SWITCH_MS,
    );
    return () => window.clearTimeout(id);
  }, [index]);

  return (
    // A pane of blue glass, with everything drawn on it in white.
    <div className="relative isolate flex h-full min-h-[22rem] flex-col overflow-hidden glass-navy rounded-3xl p-3 sm:p-4">
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
          <WorkflowScene key="workflow" />
        ) : (
          <PortalScene key="portal" />
        )}
      </div>
    </div>
  );
}
