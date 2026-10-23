"use client";

import type { CSSProperties } from "react";
import GlassShell from "./GlassShell";

// Two website scenes: a page that adapts from desktop to phone, then a
// content editor where a team updates a page and publishes it.
const SCENES = [
  { id: "responsive", label: "Responsive design" },
  { id: "cms", label: "Content management" },
] as const;

const delay = (s: number): CSSProperties => ({ animationDelay: `${s}s` });
const W = "#ffffff";
const GLASS = "rgba(255,255,255,0.14)";
const FONT = "ui-sans-serif, system-ui";

function Defs() {
  return (
    <defs>
      <linearGradient id="wb-bar" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor={W} />
        <stop offset="1" stopColor="rgba(255,255,255,0.45)" />
      </linearGradient>
      <radialGradient id="wb-glow" cx="50%" cy="50%" r="50%">
        <stop offset="0" stopColor={W} stopOpacity="0.4" />
        <stop offset="1" stopColor={W} stopOpacity="0" />
      </radialGradient>
    </defs>
  );
}

function ResponsiveScene() {
  return (
    <svg
      viewBox="0 0 1200 900"
      preserveAspectRatio="xMidYMid meet"
      className="wv-scene block h-full w-full"
      role="img"
      aria-label="A website adapting from desktop to phone"
    >
      <Defs />
      <circle cx="560" cy="420" r="440" fill="url(#wb-glow)" />

      {/* The desktop site */}
      <g className="wv-rise" style={delay(0.2)}>
        <rect
          x="70"
          y="60"
          width="730"
          height="520"
          rx="30"
          fill={GLASS}
          stroke={W}
          strokeOpacity="0.75"
          strokeWidth="3"
        />
        <path
          d="M70 90a30 30 0 0 1 30-30h670a30 30 0 0 1 30 30v44H70z"
          fill="rgba(255,255,255,0.2)"
        />
        {[0, 1, 2].map((i) => (
          <circle
            key={i}
            cx={108 + i * 26}
            cy="97"
            r="7"
            fill={W}
            opacity="0.7"
          />
        ))}
        <rect
          x="230"
          y="82"
          width="400"
          height="30"
          rx="15"
          fill="rgba(255,255,255,0.2)"
        />
        <text
          x="430"
          y="104"
          textAnchor="middle"
          fontSize="20"
          fill={W}
          opacity="0.8"
          fontFamily={FONT}
        >
          yourbusiness.com
        </text>
        {/* nav */}
        {[0, 1, 2, 3].map((i) => (
          <rect
            key={i}
            x={440 + i * 80}
            y="164"
            width="56"
            height="10"
            rx="5"
            fill={W}
            opacity="0.55"
          />
        ))}
        <rect
          x="110"
          y="156"
          width="70"
          height="24"
          rx="8"
          fill={W}
          opacity="0.9"
        />
        {/* hero */}
        <text
          x="110"
          y="270"
          fontSize="44"
          fontWeight="800"
          fill={W}
          fontFamily={FONT}
        >
          Your business,
        </text>
        <text
          x="110"
          y="324"
          fontSize="44"
          fontWeight="800"
          fill={W}
          fontFamily={FONT}
        >
          clearly online.
        </text>
        <rect
          x="110"
          y="352"
          width="300"
          height="12"
          rx="6"
          fill={W}
          opacity="0.5"
        />
        <rect
          x="110"
          y="378"
          width="220"
          height="12"
          rx="6"
          fill={W}
          opacity="0.35"
        />
        <rect x="110" y="414" width="170" height="48" rx="24" fill={W} />
        <text
          x="195"
          y="446"
          textAnchor="middle"
          fontSize="22"
          fontWeight="700"
          fill="#1d7fe0"
          fontFamily={FONT}
        >
          Get in touch
        </text>
        <circle
          cx="620"
          cy="320"
          r="100"
          fill="rgba(255,255,255,0.14)"
          stroke={W}
          strokeOpacity="0.6"
          strokeWidth="3"
        />
        <path
          d="M520 320h200M620 220c-50 60-50 140 0 200M620 220c50 60 50 140 0 200"
          stroke={W}
          strokeOpacity="0.7"
          strokeWidth="3"
          fill="none"
        />
        {/* cards */}
        {[0, 1, 2].map((i) => (
          <g key={i} transform={`translate(${110 + i * 220} 490)`}>
            <rect
              width="200"
              height="60"
              rx="16"
              fill="rgba(255,255,255,0.14)"
              stroke={W}
              strokeOpacity="0.5"
              strokeWidth="2"
            />
            <rect
              x="20"
              y="22"
              width="110"
              height="10"
              rx="5"
              fill={W}
              opacity="0.6"
            />
          </g>
        ))}
      </g>

      {/* The same site on a phone */}
      <g className="wv-rise" style={delay(1.2)}>
        <g className="wv-bob">
          <rect
            x="860"
            y="120"
            width="270"
            height="520"
            rx="44"
            fill={GLASS}
            stroke={W}
            strokeOpacity="0.85"
            strokeWidth="3.5"
          />
          <rect
            x="960"
            y="140"
            width="70"
            height="10"
            rx="5"
            fill={W}
            opacity="0.5"
          />
          <rect
            x="890"
            y="180"
            width="60"
            height="22"
            rx="7"
            fill={W}
            opacity="0.9"
          />
          <rect
            x="1070"
            y="186"
            width="30"
            height="10"
            rx="5"
            fill={W}
            opacity="0.6"
          />
          <text
            x="890"
            y="270"
            fontSize="32"
            fontWeight="800"
            fill={W}
            fontFamily={FONT}
          >
            Your business,
          </text>
          <text
            x="890"
            y="312"
            fontSize="32"
            fontWeight="800"
            fill={W}
            fontFamily={FONT}
          >
            clearly online.
          </text>
          <rect
            x="890"
            y="340"
            width="190"
            height="10"
            rx="5"
            fill={W}
            opacity="0.5"
          />
          <rect
            x="890"
            y="366"
            width="140"
            height="10"
            rx="5"
            fill={W}
            opacity="0.35"
          />
          <rect x="890" y="404" width="150" height="44" rx="22" fill={W} />
          <text
            x="965"
            y="434"
            textAnchor="middle"
            fontSize="20"
            fontWeight="700"
            fill="#1d7fe0"
            fontFamily={FONT}
          >
            Get in touch
          </text>
          <rect
            x="890"
            y="480"
            width="210"
            height="60"
            rx="16"
            fill="rgba(255,255,255,0.14)"
            stroke={W}
            strokeOpacity="0.5"
            strokeWidth="2"
          />
          <rect
            x="890"
            y="556"
            width="210"
            height="60"
            rx="16"
            fill="rgba(255,255,255,0.14)"
            stroke={W}
            strokeOpacity="0.5"
            strokeWidth="2"
          />
        </g>
      </g>

      {/* What it adds up to */}
      <g className="wv-rise" style={delay(2.0)}>
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
        {["Clear navigation", "Every screen size", "Fast loading"].map(
          (t, i) => (
            <g key={t} transform={`translate(${120 + i * 340} 702)`}>
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
          ),
        )}
      </g>
    </svg>
  );
}

const PAGES = ["Home", "Services", "About", "Contact"];

function CmsScene() {
  return (
    <svg
      viewBox="0 0 1200 900"
      preserveAspectRatio="xMidYMid meet"
      className="wv-scene block h-full w-full"
      role="img"
      aria-label="A team updating a page and publishing it"
    >
      <Defs />
      <circle cx="600" cy="420" r="440" fill="url(#wb-glow)" />

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
          d="M70 94a34 34 0 0 1 34-34h992a34 34 0 0 1 34 34v56H70z"
          fill="rgba(255,255,255,0.2)"
        />
        <text
          x="120"
          y="117"
          fontSize="28"
          fontWeight="700"
          fill={W}
          fontFamily={FONT}
        >
          Content editor
        </text>
        <rect x="880" y="82" width="200" height="46" rx="23" fill={W} />
        <text
          x="980"
          y="113"
          textAnchor="middle"
          fontSize="24"
          fontWeight="700"
          fill="#1d7fe0"
          fontFamily={FONT}
        >
          Publish
        </text>
      </g>

      {/* Pages */}
      {PAGES.map((p, i) => (
        <g key={p} className="wv-rise" style={delay(0.5 + i * 0.2)}>
          <g transform={`translate(110 ${190 + i * 90})`}>
            <rect
              width="250"
              height="68"
              rx="20"
              fill={i === 0 ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.1)"}
              stroke={W}
              strokeOpacity={i === 0 ? 0.9 : 0.5}
              strokeWidth="2.5"
            />
            <text
              x="32"
              y="44"
              fontSize="26"
              fontWeight="700"
              fill={W}
              fontFamily={FONT}
            >
              {p}
            </text>
          </g>
        </g>
      ))}

      {/* The page being edited */}
      <g className="wv-rise" style={delay(0.9)}>
        <rect
          x="400"
          y="190"
          width="690"
          height="430"
          rx="26"
          fill="rgba(255,255,255,0.1)"
          stroke={W}
          strokeOpacity="0.55"
          strokeWidth="2.5"
        />
        <text
          x="440"
          y="250"
          fontSize="26"
          fill={W}
          opacity="0.8"
          fontFamily={FONT}
        >
          Headline
        </text>
        <rect
          x="440"
          y="270"
          width="610"
          height="56"
          rx="16"
          fill="rgba(255,255,255,0.16)"
          stroke={W}
          strokeOpacity="0.6"
          strokeWidth="2"
        />
        <rect
          x="460"
          y="290"
          width="340"
          height="16"
          rx="8"
          fill={W}
          className="wv-type"
          style={delay(1.4)}
        />
        <text
          x="440"
          y="378"
          fontSize="26"
          fill={W}
          opacity="0.8"
          fontFamily={FONT}
        >
          Text
        </text>
        <rect
          x="440"
          y="398"
          width="610"
          height="130"
          rx="16"
          fill="rgba(255,255,255,0.16)"
          stroke={W}
          strokeOpacity="0.6"
          strokeWidth="2"
        />
        <rect
          x="460"
          y="424"
          width="500"
          height="14"
          rx="7"
          fill={W}
          opacity="0.7"
          className="wv-type"
          style={delay(2.0)}
        />
        <rect
          x="460"
          y="454"
          width="420"
          height="14"
          rx="7"
          fill={W}
          opacity="0.7"
          className="wv-type"
          style={delay(2.3)}
        />
        <rect
          x="460"
          y="484"
          width="300"
          height="14"
          rx="7"
          fill={W}
          opacity="0.7"
          className="wv-type"
          style={delay(2.6)}
        />
        <g className="wv-pop" style={delay(3.0)}>
          <circle cx="470" cy="578" r="17" fill={W} />
          <path
            d="M462 578 l6 6 l11 -13"
            stroke="#1d7fe0"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <text x="500" y="587" fontSize="25" fill={W} fontFamily={FONT}>
            Saved and live
          </text>
        </g>
      </g>

      <g className="wv-rise" style={delay(2.2)}>
        <rect
          x="70"
          y="700"
          width="1060"
          height="110"
          rx="28"
          fill={GLASS}
          stroke={W}
          strokeOpacity="0.6"
          strokeWidth="3"
        />
        {["Easy updates", "No developer needed", "Always current"].map(
          (t, i) => (
            <g key={t} transform={`translate(${110 + i * 350} 730)`}>
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
                fontSize="26"
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

export default function WebsiteVisual() {
  return (
    <GlassShell
      scenes={SCENES}
      render={(i) =>
        i === 0 ? <ResponsiveScene key="responsive" /> : <CmsScene key="cms" />
      }
    />
  );
}
