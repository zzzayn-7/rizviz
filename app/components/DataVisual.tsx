"use client";

import { useEffect, useState, type CSSProperties } from "react";

// A blue-glass screen, like the AI / ML and DevOps ones, that alternates
// between two data scenes every five seconds: sources flowing through
// pipelines into a warehouse, then messy data being cleaned and checked.
const SWITCH_MS = 5000;

const SCENES = [
  { id: "pipeline", label: "Data pipelines" },
  { id: "quality", label: "Data quality" },
] as const;

const delay = (s: number): CSSProperties => ({ animationDelay: `${s}s` });

const W = "#ffffff";
const GLASS = "rgba(255,255,255,0.14)";
const FONT = "ui-sans-serif, system-ui";

function Defs() {
  return (
    <defs>
      <linearGradient id="dd-line" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="rgba(255,255,255,0.5)" />
        <stop offset="1" stopColor={W} />
      </linearGradient>
      <linearGradient id="dd-bar" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor={W} />
        <stop offset="1" stopColor="rgba(255,255,255,0.45)" />
      </linearGradient>
      <radialGradient id="dd-glow" cx="50%" cy="50%" r="50%">
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

// A cylinder, the usual picture of a database.
function Cylinder({ w, h }: { w: number; h: number }) {
  const ry = h * 0.14;
  return (
    <g {...icon}>
      <ellipse cx={w / 2} cy={ry} rx={w / 2} ry={ry} />
      <path
        d={`M0 ${ry} V${h - ry} A${w / 2} ${ry} 0 0 0 ${w} ${h - ry} V${ry}`}
      />
      <path d={`M0 ${h / 2} A${w / 2} ${ry} 0 0 0 ${w} ${h / 2}`} />
    </g>
  );
}

const SOURCES = [
  { name: "Apps", y: 110 },
  { name: "Databases", y: 300 },
  { name: "Files & APIs", y: 490 },
];

function PipelineScene() {
  return (
    <svg
      viewBox="0 0 1200 900"
      preserveAspectRatio="xMidYMid meet"
      className="wv-scene block h-full w-full"
      role="img"
      aria-label="Data from several sources flowing into a warehouse"
    >
      <Defs />
      <circle cx="600" cy="380" r="440" fill="url(#dd-glow)" />

      {/* Sources */}
      {SOURCES.map((s, i) => (
        <g key={s.name} className="wv-rise" style={delay(0.2 + i * 0.2)}>
          <g transform={`translate(70 ${s.y})`}>
            <rect
              width="300"
              height="130"
              rx="28"
              fill={GLASS}
              stroke={W}
              strokeOpacity="0.75"
              strokeWidth="3"
            />
            <g transform="translate(40 30)">
              {i === 0 && (
                <g {...icon}>
                  <rect x="12" width="44" height="70" rx="10" />
                  <path d="M28 58h12" />
                </g>
              )}
              {i === 1 && (
                <g transform="translate(6 0)">
                  <Cylinder w={52} h={70} />
                </g>
              )}
              {i === 2 && (
                <g {...icon}>
                  <path d="M10 4h30l16 16v46H10z" />
                  <path d="M40 4v16h16" />
                </g>
              )}
            </g>
            <text
              x="126"
              y="75"
              fontSize="26"
              fontWeight="700"
              fill={W}
              fontFamily={FONT}
            >
              {s.name}
            </text>
          </g>
        </g>
      ))}

      {/* Pipelines carrying data across */}
      {SOURCES.map((s, i) => {
        const d = `M370 ${s.y + 65} C 470 ${s.y + 65}, 500 380, 590 380`;
        return (
          <g key={s.name}>
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
              stroke="url(#dd-line)"
              strokeWidth="6"
              strokeLinecap="round"
              fill="none"
              className="hw-pulse"
              style={delay(-i * 1.1)}
            />
          </g>
        );
      })}

      {/* The transform step */}
      <g className="wv-pop" style={delay(0.9)}>
        <circle
          cx="640"
          cy="380"
          r="66"
          fill={GLASS}
          stroke={W}
          strokeWidth="4"
        />
        <circle
          cx="640"
          cy="380"
          r="92"
          fill="none"
          stroke={W}
          strokeOpacity="0.6"
          strokeWidth="3"
          className="hw-ping"
        />
        <g transform="translate(610 350)" {...icon}>
          <path d="M6 14h48M42 4l12 10-12 10" />
          <path d="M54 46H6M18 36L6 46l12 10" />
        </g>
      </g>
      <text
        x="640"
        y="500"
        textAnchor="middle"
        fontSize="26"
        fontWeight="700"
        fill={W}
        fontFamily={FONT}
        opacity="0.9"
      >
        Clean · Transform
      </text>

      <path
        d="M706 380 H 790"
        stroke={W}
        strokeOpacity="0.35"
        strokeWidth="3"
        strokeDasharray="4 8"
        fill="none"
      />
      <path
        d="M706 380 H 790"
        pathLength={100}
        stroke="url(#dd-line)"
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
        className="hw-pulse"
      />

      {/* The warehouse */}
      <g className="wv-rise" style={delay(1.3)}>
        <g transform="translate(800 250)">
          <rect
            width="330"
            height="260"
            rx="34"
            fill={GLASS}
            stroke={W}
            strokeOpacity="0.8"
            strokeWidth="3"
          />
          <g transform="translate(40 50)">
            <Cylinder w={90} h={130} />
          </g>
          <text
            x="170"
            y="118"
            fontSize="27"
            fontWeight="700"
            fill={W}
            fontFamily={FONT}
          >
            Warehouse
          </text>
          <rect
            x="170"
            y="146"
            width="110"
            height="12"
            rx="6"
            fill={W}
            opacity="0.55"
          />
          <rect
            x="170"
            y="170"
            width="70"
            height="12"
            rx="6"
            fill={W}
            opacity="0.3"
          />
        </g>
      </g>

      {/* Reports built on it */}
      <g className="wv-rise" style={delay(1.9)}>
        <rect
          x="70"
          y="680"
          width="1060"
          height="150"
          rx="30"
          fill={GLASS}
          stroke={W}
          strokeOpacity="0.7"
          strokeWidth="3"
        />
        {[70, 120, 90, 150, 110, 170].map((h, i) => (
          <rect
            key={i}
            x={120 + i * 50}
            y={800 - h * 0.6}
            width="30"
            height={h * 0.6}
            rx="8"
            fill="url(#dd-bar)"
            className="wv-bar"
            style={delay(2.2 + i * 0.12)}
          />
        ))}
        {["Reporting", "Analytics", "AI"].map((t, i) => (
          <g key={t} transform={`translate(${440 + i * 260} 724)`}>
            <path
              d="M0 40 l16 -18 l14 11 l20 -25"
              stroke={W}
              strokeWidth="7"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            <text
              x="64"
              y="46"
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

const ROWS = [
  { raw: "J0hn  Smith", clean: "John Smith", note: "Standardised" },
  { raw: "john@mail", clean: "john@mail.com", note: "Fixed format" },
  { raw: "— missing —", clean: "12 Oct 2025", note: "Filled in" },
  { raw: "John Smith", clean: "Duplicate", note: "Removed" },
];

function QualityScene() {
  return (
    <svg
      viewBox="0 0 1200 900"
      preserveAspectRatio="xMidYMid meet"
      className="wv-scene block h-full w-full"
      role="img"
      aria-label="Messy data being cleaned and checked"
    >
      <Defs />
      <circle cx="560" cy="420" r="440" fill="url(#dd-glow)" />

      <g className="wv-rise" style={delay(0.2)}>
        <rect
          x="70"
          y="60"
          width="1060"
          height="600"
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
          y="120"
          fontSize="26"
          fontWeight="700"
          fill={W}
          fontFamily={FONT}
        >
          Incoming
        </text>
        <text
          x="520"
          y="120"
          fontSize="26"
          fontWeight="700"
          fill={W}
          fontFamily={FONT}
        >
          After cleaning
        </text>
        <text
          x="810"
          y="120"
          fontSize="26"
          fontWeight="700"
          fill={W}
          fontFamily={FONT}
        >
          Result
        </text>
      </g>

      {ROWS.map((r, i) => (
        <g key={r.raw + i} className="wv-rise" style={delay(0.6 + i * 0.35)}>
          <g transform={`translate(${110} ${190 + i * 110})`}>
            <rect
              width="960"
              height="80"
              rx="22"
              fill="rgba(255,255,255,0.1)"
              stroke={W}
              strokeOpacity="0.45"
              strokeWidth="2"
            />
            <text
              x="30"
              y="52"
              fontSize="30"
              fill={W}
              opacity="0.65"
              fontFamily={FONT}
              textDecoration="line-through"
            >
              {r.raw}
            </text>
            <path
              d="M330 40h40m-14 -12l14 12-14 12"
              stroke={W}
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            <text
              x="410"
              y="52"
              fontSize="30"
              fontWeight="700"
              fill={W}
              fontFamily={FONT}
            >
              {r.clean}
            </text>
            <g className="wv-pop" style={delay(1.4 + i * 0.35)}>
              <circle cx="700" cy="40" r="17" fill={W} />
              <path
                d="M692 40 l6 6 l11 -13"
                stroke="#1d7fe0"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
              <text x="730" y="49" fontSize="25" fill={W} fontFamily={FONT}>
                {r.note}
              </text>
            </g>
          </g>
        </g>
      ))}

      {/* How clean the data is */}
      <g className="wv-rise" style={delay(2.4)}>
        <rect
          x="70"
          y="700"
          width="1060"
          height="130"
          rx="30"
          fill={GLASS}
          stroke={W}
          strokeOpacity="0.7"
          strokeWidth="3"
        />
        <text
          x="110"
          y="755"
          fontSize="28"
          fontWeight="700"
          fill={W}
          fontFamily={FONT}
        >
          Data quality
        </text>
        <rect
          x="110"
          y="778"
          width="780"
          height="22"
          rx="11"
          fill={W}
          opacity="0.22"
        />
        <rect
          x="110"
          y="778"
          width="780"
          height="22"
          rx="11"
          fill={W}
          className="wv-type"
          style={{ animationDuration: "2.4s", animationDelay: "2.6s" }}
        />
        <text
          x="1090"
          y="800"
          textAnchor="end"
          fontSize="46"
          fontWeight="800"
          fill={W}
          fontFamily={FONT}
        >
          100%
        </text>
      </g>
    </svg>
  );
}

export default function DataVisual() {
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
          <PipelineScene key="pipeline" />
        ) : (
          <QualityScene key="quality" />
        )}
      </div>
    </div>
  );
}
