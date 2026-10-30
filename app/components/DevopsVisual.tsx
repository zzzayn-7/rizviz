"use client";

import { useEffect, useState, type CSSProperties } from "react";

// A blue-glass screen, like the AI / ML one, that alternates between two
// DevOps scenes every five seconds: a delivery pipeline running from code to
// live, then servers and their health in the cloud.
const SWITCH_MS = 5000;

const SCENES = [
  { id: "pipeline", label: "CI/CD pipeline" },
  { id: "cloud", label: "Cloud infrastructure" },
] as const;

const delay = (s: number): CSSProperties => ({ animationDelay: `${s}s` });

const W = "#ffffff";
const GLASS = "rgba(255,255,255,0.14)";
const FONT = "ui-sans-serif, system-ui";

function Defs() {
  return (
    <defs>
      <linearGradient id="dv-line" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="rgba(255,255,255,0.5)" />
        <stop offset="1" stopColor={W} />
      </linearGradient>
      <linearGradient id="dv-bar" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor={W} />
        <stop offset="1" stopColor="rgba(255,255,255,0.45)" />
      </linearGradient>
      <radialGradient id="dv-glow" cx="50%" cy="50%" r="50%">
        <stop offset="0" stopColor={W} stopOpacity="0.4" />
        <stop offset="1" stopColor={W} stopOpacity="0" />
      </radialGradient>
    </defs>
  );
}

const STAGES = ["Code", "Build", "Test", "Deploy", "Monitor"];

function PipelineScene() {
  const x0 = 70;
  const step = 235;
  return (
    <svg
      viewBox="0 0 1200 900"
      preserveAspectRatio="xMidYMid meet"
      className="wv-scene block h-full w-full"
      role="img"
      aria-label="A delivery pipeline from code to live"
    >
      <Defs />
      <circle cx="600" cy="380" r="440" fill="url(#dv-glow)" />

      {/* The pipeline: stages joined by a line that the light runs along */}
      <line
        x1={x0 + 70}
        x2={x0 + 4 * step + 70}
        y1="320"
        y2="320"
        stroke={W}
        strokeOpacity="0.35"
        strokeWidth="4"
        strokeDasharray="4 10"
      />
      <path
        d={`M${x0 + 70} 320 H${x0 + 4 * step + 70}`}
        pathLength={100}
        stroke="url(#dv-line)"
        strokeWidth="8"
        strokeLinecap="round"
        fill="none"
        className="hw-pulse"
      />
      {STAGES.map((s, i) => (
        <g key={s} className="wv-rise" style={delay(0.2 + i * 0.22)}>
          <g transform={`translate(${x0 + i * step} 235)`}>
            <rect
              width="140"
              height="170"
              rx="30"
              fill={GLASS}
              stroke={W}
              strokeOpacity="0.8"
              strokeWidth="3"
            />
            {i === 0 && (
              <g
                transform="translate(20 0)"
                fill="none"
                stroke={W}
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M38 52 L20 72 L38 92" />
                <path d="M62 52 L80 72 L62 92" />
              </g>
            )}
            {i === 1 && (
              <g
                transform="translate(20 0)"
                fill="none"
                stroke={W}
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M50 44 L76 58 V86 L50 100 L24 86 V58 Z" />
                <path d="M24 58 L50 72 L76 58 M50 72 V100" />
              </g>
            )}
            {i === 2 && (
              <g
                transform="translate(20 0)"
                fill="none"
                stroke={W}
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M34 44 H66 M42 44 V68 L26 98 A6 6 0 0 0 31 104 H69 A6 6 0 0 0 74 98 L58 68 V44" />
              </g>
            )}
            {i === 3 && (
              <g
                transform="translate(20 0)"
                fill="none"
                stroke={W}
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M50 102 V50 M30 70 L50 48 L70 70" />
              </g>
            )}
            {i === 4 && (
              <g
                transform="translate(20 0)"
                fill="none"
                stroke={W}
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 74 H34 L44 52 L58 98 L68 74 H82" />
              </g>
            )}
            <text
              x="70"
              y="148"
              textAnchor="middle"
              fontSize="23"
              fontWeight="700"
              fill={W}
              fontFamily={FONT}
            >
              {s}
            </text>
            <circle
              cx="126"
              cy="14"
              r="15"
              fill="#fff"
              className="wv-pop"
              style={delay(1.0 + i * 0.35)}
            />
            <path
              d="M119 14 l5 5 l9 -11"
              stroke="#1d7fe0"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              className="wv-pop"
              style={delay(1.0 + i * 0.35)}
            />
          </g>
        </g>
      ))}

      {/* A release rolling out */}
      <g className="wv-rise" style={delay(1.5)}>
        <rect
          x="70"
          y="470"
          width="1060"
          height="170"
          rx="30"
          fill={GLASS}
          stroke={W}
          strokeOpacity="0.7"
          strokeWidth="3"
        />
        <text
          x="110"
          y="520"
          fontSize="30"
          fontWeight="700"
          fill={W}
          fontFamily={FONT}
        >
          Release v2.4.0
        </text>
        <rect
          x="110"
          y="560"
          width="980"
          height="22"
          rx="11"
          fill={W}
          opacity="0.22"
        />
        <rect
          x="110"
          y="560"
          width="980"
          height="22"
          rx="11"
          fill={W}
          className="wv-type"
          style={{ animationDuration: "3s", animationDelay: "1.6s" }}
        />
        <text
          x="1090"
          y="520"
          textAnchor="end"
          fontSize="26"
          fill={W}
          opacity="0.85"
          fontFamily={FONT}
        >
          Live in minutes
        </text>
        <text
          x="110"
          y="620"
          fontSize="24"
          fill={W}
          opacity="0.8"
          fontFamily={FONT}
        >
          Build passed · 128 tests passed · Rolled out with no downtime
        </text>
      </g>

      {/* What it adds up to */}
      <g className="wv-rise" style={delay(2.2)}>
        <rect
          x="70"
          y="690"
          width="1060"
          height="110"
          rx="30"
          fill={GLASS}
          stroke={W}
          strokeOpacity="0.6"
          strokeWidth="3"
        />
        {["Faster releases", "Fewer failures", "Repeatable setup"].map(
          (t, i) => (
            <g key={t} transform={`translate(${120 + i * 340} 720)`}>
              <path
                d="M0 40 l16 -18 l14 11 l20 -25"
                stroke={W}
                strokeWidth="7"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
              <text
                x="66"
                y="46"
                fontSize="25"
                fontWeight="700"
                fill={W}
                fontFamily={FONT}
              >
                {t}
              </text>
            </g>
          ),
        )}
      </g>
    </svg>
  );
}

function CloudScene() {
  const racks = [0, 1, 2];
  return (
    <svg
      viewBox="0 0 1200 900"
      preserveAspectRatio="xMidYMid meet"
      className="wv-scene block h-full w-full"
      role="img"
      aria-label="Servers and their health in the cloud"
    >
      <Defs />
      <circle cx="400" cy="450" r="440" fill="url(#dv-glow)" />

      {/* A cloud, with light running down to the servers */}
      <g className="wv-pop" style={delay(0.2)}>
        <path
          d="M300 200 a70 70 0 0 1 120 -56 a90 90 0 0 1 170 20 a62 62 0 0 1 -10 124 H330 a62 62 0 0 1 -30 -88 z"
          fill={GLASS}
          stroke={W}
          strokeWidth="4"
          strokeLinejoin="round"
        />
        <text
          x="478"
          y="226"
          textAnchor="middle"
          fontSize="34"
          fontWeight="800"
          fill={W}
          fontFamily={FONT}
        >
          CLOUD
        </text>
      </g>
      {racks.map((r) => (
        <g key={r}>
          <path
            d={`M${150 + r * 290} 470 V400 Q${150 + r * 290} 330 478 330`}
            stroke={W}
            strokeOpacity="0.35"
            strokeWidth="3"
            strokeDasharray="4 8"
            fill="none"
            transform="translate(0 0)"
          />
          <path
            d={`M478 330 Q${150 + r * 290} 330 ${150 + r * 290} 400 V470`}
            pathLength={100}
            stroke="url(#dv-line)"
            strokeWidth="6"
            strokeLinecap="round"
            fill="none"
            className="hw-pulse"
            style={delay(-r * 1.1)}
          />
        </g>
      ))}

      {/* Three servers */}
      {racks.map((r) => (
        <g key={r} className="wv-rise" style={delay(0.6 + r * 0.25)}>
          <g transform={`translate(${r * 290 + 40} 470)`}>
            <rect
              width="220"
              height="330"
              rx="28"
              fill={GLASS}
              stroke={W}
              strokeOpacity="0.8"
              strokeWidth="3"
            />
            {[0, 1, 2, 3].map((u) => (
              <g key={u} transform={`translate(24 ${28 + u * 62})`}>
                <rect
                  width="172"
                  height="48"
                  rx="14"
                  fill="rgba(255,255,255,0.16)"
                  stroke={W}
                  strokeOpacity="0.55"
                  strokeWidth="2"
                />
                <circle
                  cx="24"
                  cy="24"
                  r="7"
                  fill={W}
                  className="hw-blink"
                  style={delay(-(r * 4 + u) * 0.4)}
                />
                <rect
                  x="46"
                  y="18"
                  width="80"
                  height="12"
                  rx="6"
                  fill={W}
                  opacity="0.5"
                />
                <rect
                  x="138"
                  y="18"
                  width="20"
                  height="12"
                  rx="6"
                  fill={W}
                  opacity="0.8"
                />
              </g>
            ))}
          </g>
        </g>
      ))}

      {/* How they are doing */}
      <g className="wv-rise" style={delay(1.2)}>
        <rect
          x="920"
          y="130"
          width="230"
          height="330"
          rx="30"
          fill={GLASS}
          stroke={W}
          strokeOpacity="0.75"
          strokeWidth="3"
        />
        <text
          x="1035"
          y="186"
          textAnchor="middle"
          fontSize="26"
          fontWeight="700"
          fill={W}
          fontFamily={FONT}
        >
          Uptime
        </text>
        <circle
          cx="1035"
          cy="300"
          r="68"
          fill="none"
          stroke={W}
          strokeOpacity="0.25"
          strokeWidth="14"
        />
        <circle
          cx="1035"
          cy="300"
          r="68"
          fill="none"
          stroke={W}
          strokeWidth="14"
          strokeLinecap="round"
          pathLength={1}
          className="wv-draw"
          style={{
            strokeDasharray: 1,
            strokeDashoffset: 0.001,
            transform: "rotate(-90deg)",
            transformOrigin: "1035px 300px",
            animationDelay: "1.4s",
          }}
        />
        <text
          x="1035"
          y="316"
          textAnchor="middle"
          fontSize="32"
          fontWeight="800"
          fill={W}
          fontFamily={FONT}
        >
          99.9%
        </text>
        <text
          x="1035"
          y="420"
          textAnchor="middle"
          fontSize="22"
          fill={W}
          opacity="0.8"
          fontFamily={FONT}
        >
          all systems healthy
        </text>
      </g>
      <g className="wv-rise" style={delay(1.7)}>
        <rect
          x="920"
          y="500"
          width="230"
          height="300"
          rx="30"
          fill={GLASS}
          stroke={W}
          strokeOpacity="0.75"
          strokeWidth="3"
        />
        <text
          x="1035"
          y="556"
          textAnchor="middle"
          fontSize="26"
          fontWeight="700"
          fill={W}
          fontFamily={FONT}
        >
          Load
        </text>
        {[120, 170, 100, 200, 140].map((h, i) => (
          <rect
            key={i}
            x={950 + i * 36}
            y={770 - h}
            width="22"
            height={h}
            rx="7"
            fill="url(#dv-bar)"
            className="wv-bar"
            style={delay(2 + i * 0.14)}
          />
        ))}
        <line
          x1="944"
          x2="1126"
          y1="772"
          y2="772"
          stroke={W}
          strokeOpacity="0.5"
          strokeWidth="3"
        />
      </g>
    </svg>
  );
}

export default function DevopsVisual() {
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
          <CloudScene key="cloud" />
        )}
      </div>
    </div>
  );
}
