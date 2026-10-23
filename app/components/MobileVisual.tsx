"use client";

import type { CSSProperties } from "react";
import GlassShell from "./GlassShell";

// Two mobile scenes: an app's key screens, then the app connected to the
// systems behind it.
const SCENES = [
  { id: "app", label: "App experience" },
  { id: "backend", label: "Backend & APIs" },
] as const;

const delay = (s: number): CSSProperties => ({ animationDelay: `${s}s` });
const W = "#ffffff";
const GLASS = "rgba(255,255,255,0.14)";
const FONT = "ui-sans-serif, system-ui";

function Defs() {
  return (
    <defs>
      <linearGradient id="mb-line" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="rgba(255,255,255,0.5)" />
        <stop offset="1" stopColor={W} />
      </linearGradient>
      <linearGradient id="mb-bar" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor={W} />
        <stop offset="1" stopColor="rgba(255,255,255,0.45)" />
      </linearGradient>
      <radialGradient id="mb-glow" cx="50%" cy="50%" r="50%">
        <stop offset="0" stopColor={W} stopOpacity="0.4" />
        <stop offset="1" stopColor={W} stopOpacity="0" />
      </radialGradient>
    </defs>
  );
}

function Phone({
  x,
  y,
  children,
}: {
  x: number;
  y: number;
  children: React.ReactNode;
}) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect
        width="300"
        height="560"
        rx="46"
        fill={GLASS}
        stroke={W}
        strokeOpacity="0.85"
        strokeWidth="3.5"
      />
      <rect
        x="110"
        y="18"
        width="80"
        height="10"
        rx="5"
        fill={W}
        opacity="0.5"
      />
      <rect
        x="110"
        y="536"
        width="80"
        height="6"
        rx="3"
        fill={W}
        opacity="0.5"
      />
      {children}
    </g>
  );
}

function AppScene() {
  return (
    <svg
      viewBox="0 0 1200 900"
      preserveAspectRatio="xMidYMid meet"
      className="wv-scene block h-full w-full"
      role="img"
      aria-label="Three screens of a mobile app"
    >
      <Defs />
      <circle cx="600" cy="400" r="440" fill="url(#mb-glow)" />

      {/* Sign in */}
      <g className="wv-rise" style={delay(0.2)}>
        <g className="wv-bob">
          <Phone x={70} y={80}>
            <circle
              cx="150"
              cy="130"
              r="44"
              fill="none"
              stroke={W}
              strokeWidth="5"
            />
            <path
              d="M130 130 l14 14 l26 -30"
              stroke={W}
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            <text
              x="150"
              y="230"
              textAnchor="middle"
              fontSize="30"
              fontWeight="800"
              fill={W}
              fontFamily={FONT}
            >
              Welcome back
            </text>
            <rect
              x="40"
              y="270"
              width="220"
              height="52"
              rx="26"
              fill="rgba(255,255,255,0.16)"
              stroke={W}
              strokeOpacity="0.6"
              strokeWidth="2"
            />
            <rect
              x="40"
              y="340"
              width="220"
              height="52"
              rx="26"
              fill="rgba(255,255,255,0.16)"
              stroke={W}
              strokeOpacity="0.6"
              strokeWidth="2"
            />
            <rect x="40" y="430" width="220" height="56" rx="28" fill={W} />
            <text
              x="150"
              y="466"
              textAnchor="middle"
              fontSize="24"
              fontWeight="700"
              fill="#1d7fe0"
              fontFamily={FONT}
            >
              Sign in
            </text>
          </Phone>
        </g>
      </g>

      {/* Home */}
      <g className="wv-rise" style={delay(0.6)}>
        <g className="wv-bob" style={delay(-1.8)}>
          <Phone x={450} y={40}>
            <text
              x="30"
              y="90"
              fontSize="30"
              fontWeight="800"
              fill={W}
              fontFamily={FONT}
            >
              Dashboard
            </text>
            <rect
              x="30"
              y="120"
              width="240"
              height="120"
              rx="24"
              fill="rgba(255,255,255,0.2)"
              stroke={W}
              strokeOpacity="0.7"
              strokeWidth="2.5"
            />
            {[40, 70, 55, 90, 75].map((h, i) => (
              <rect
                key={i}
                x={54 + i * 44}
                y={226 - h}
                width="26"
                height={h}
                rx="7"
                fill="url(#mb-bar)"
                className="wv-bar"
                style={delay(1.0 + i * 0.12)}
              />
            ))}
            {[0, 1, 2].map((i) => (
              <g key={i} transform={`translate(30 ${270 + i * 78})`}>
                <rect
                  width="240"
                  height="62"
                  rx="18"
                  fill="rgba(255,255,255,0.12)"
                  stroke={W}
                  strokeOpacity="0.5"
                  strokeWidth="2"
                />
                <circle
                  cx="34"
                  cy="31"
                  r="14"
                  fill="none"
                  stroke={W}
                  strokeWidth="3"
                />
                <rect
                  x="64"
                  y="20"
                  width="120"
                  height="10"
                  rx="5"
                  fill={W}
                  opacity="0.7"
                />
                <rect
                  x="64"
                  y="38"
                  width="80"
                  height="8"
                  rx="4"
                  fill={W}
                  opacity="0.4"
                />
              </g>
            ))}
          </Phone>
        </g>
      </g>

      {/* Scan */}
      <g className="wv-rise" style={delay(1.0)}>
        <g className="wv-bob" style={delay(-3.6)}>
          <Phone x={830} y={80}>
            <text
              x="150"
              y="90"
              textAnchor="middle"
              fontSize="30"
              fontWeight="800"
              fill={W}
              fontFamily={FONT}
            >
              Scan
            </text>
            <rect
              x="50"
              y="130"
              width="200"
              height="200"
              rx="28"
              fill="none"
              stroke={W}
              strokeWidth="4"
              strokeDasharray="30 18"
            />
            <rect
              x="70"
              y="228"
              width="160"
              height="4"
              rx="2"
              fill={W}
              className="hw-blink"
            />
            <text
              x="150"
              y="388"
              textAnchor="middle"
              fontSize="24"
              fill={W}
              opacity="0.85"
              fontFamily={FONT}
            >
              Analysing…
            </text>
            <rect
              x="60"
              y="410"
              width="180"
              height="14"
              rx="7"
              fill={W}
              opacity="0.22"
            />
            <rect
              x="60"
              y="410"
              width="180"
              height="14"
              rx="7"
              fill={W}
              className="wv-type"
              style={{ animationDuration: "2.6s", animationDelay: "1.4s" }}
            />
            <rect
              x="40"
              y="450"
              width="220"
              height="56"
              rx="28"
              fill="rgba(255,255,255,0.2)"
              stroke={W}
              strokeOpacity="0.7"
              strokeWidth="2.5"
            />
            <text
              x="150"
              y="486"
              textAnchor="middle"
              fontSize="24"
              fontWeight="700"
              fill={W}
              fontFamily={FONT}
            >
              View result
            </text>
          </Phone>
        </g>
      </g>

      <g className="wv-rise" style={delay(1.8)}>
        <rect
          x="70"
          y="680"
          width="1060"
          height="130"
          rx="30"
          fill={GLASS}
          stroke={W}
          strokeOpacity="0.7"
          strokeWidth="3"
        />
        {["Clear interface", "iOS & Android", "Everyday ready"].map((t, i) => (
          <g key={t} transform={`translate(${120 + i * 340} 722)`}>
            <path
              d="M0 48 l16 -18 l14 11 l20 -25"
              stroke={W}
              strokeWidth="7"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            <text
              x="66"
              y="52"
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

const BACKENDS = [
  { n: "Accounts", y: 90 },
  { n: "Database", y: 340 },
  { n: "Payments", y: 590 },
];

function BackendScene() {
  return (
    <svg
      viewBox="0 0 1200 900"
      preserveAspectRatio="xMidYMid meet"
      className="wv-scene block h-full w-full"
      role="img"
      aria-label="A mobile app connected to the systems behind it"
    >
      <Defs />
      <circle cx="600" cy="420" r="440" fill="url(#mb-glow)" />

      <g className="wv-rise" style={delay(0.2)}>
        <g className="wv-bob">
          <g transform="translate(90 120)">
            <rect
              width="250"
              height="470"
              rx="40"
              fill={GLASS}
              stroke={W}
              strokeOpacity="0.85"
              strokeWidth="3.5"
            />
            <rect
              x="90"
              y="16"
              width="70"
              height="9"
              rx="4.5"
              fill={W}
              opacity="0.5"
            />
            <text
              x="125"
              y="100"
              textAnchor="middle"
              fontSize="28"
              fontWeight="800"
              fill={W}
              fontFamily={FONT}
            >
              Your app
            </text>
            {[0, 1, 2].map((i) => (
              <rect
                key={i}
                x="30"
                y={140 + i * 80}
                width="190"
                height="56"
                rx="18"
                fill="rgba(255,255,255,0.16)"
                stroke={W}
                strokeOpacity="0.55"
                strokeWidth="2"
              />
            ))}
          </g>
        </g>
      </g>

      {BACKENDS.map((b, i) => {
        const d = `M340 355 C 440 355, 470 ${b.y + 80}, 540 ${b.y + 80}`;
        return (
          <g key={b.n}>
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
              stroke="url(#mb-line)"
              strokeWidth="6"
              strokeLinecap="round"
              fill="none"
              className="hw-pulse"
              style={delay(-i * 1.1)}
            />
          </g>
        );
      })}

      {BACKENDS.map((b, i) => (
        <g key={b.n} className="wv-rise" style={delay(0.8 + i * 0.3)}>
          <g transform={`translate(540 ${b.y})`}>
            <rect
              width="590"
              height="160"
              rx="30"
              fill={GLASS}
              stroke={W}
              strokeOpacity="0.75"
              strokeWidth="3"
            />
            <g
              transform="translate(40 44)"
              fill="none"
              stroke={W}
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {i === 0 && (
                <>
                  <circle cx="36" cy="22" r="18" />
                  <path d="M4 72c0-18 14-28 32-28s32 10 32 28" />
                </>
              )}
              {i === 1 && (
                <>
                  <ellipse cx="36" cy="14" rx="32" ry="12" />
                  <path d="M4 14v44c0 7 14 12 32 12s32-5 32-12V14M4 36c0 7 14 12 32 12s32-5 32-12" />
                </>
              )}
              {i === 2 && (
                <>
                  <rect x="2" y="12" width="68" height="48" rx="10" />
                  <path d="M2 30h68M16 48h16" />
                </>
              )}
            </g>
            <text
              x="150"
              y="74"
              fontSize="32"
              fontWeight="700"
              fill={W}
              fontFamily={FONT}
            >
              {b.n}
            </text>
            <rect
              x="150"
              y="96"
              width="220"
              height="12"
              rx="6"
              fill={W}
              opacity="0.5"
            />
            <rect
              x="150"
              y="120"
              width="140"
              height="12"
              rx="6"
              fill={W}
              opacity="0.3"
            />
            <g className="wv-pop" style={delay(1.6 + i * 0.3)}>
              <circle cx="530" cy="80" r="22" fill={W} />
              <path
                d="M520 80 l7 7 l13 -16"
                stroke="#1d7fe0"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </g>
          </g>
        </g>
      ))}
    </svg>
  );
}

export default function MobileVisual() {
  return (
    <GlassShell
      scenes={SCENES}
      render={(i) =>
        i === 0 ? <AppScene key="app" /> : <BackendScene key="backend" />
      }
    />
  );
}
