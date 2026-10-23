import Image from "next/image";
import icon from "../icon.png";

// Light blues on white: the base circuit traces, the bright accents and the
// deeper tones used for text.
const BASE = "#d3e6f4";
const SKY = "#70c7f4";
const BLUE = "#329fe0";
const STEEL = "#285b7a";

// Circuit traces between the chip and everything around it. Each one carries
// a pulse of light along it, over and over. Paths are in the 800 x 640 box.
const TRACES: {
  d: string;
  delay: number;
  seconds: number;
  node: [number, number];
}[] = [
  { d: "M290 150 H340 V245", delay: 0, seconds: 3.2, node: [340, 245] },
  { d: "M460 245 V100 H560", delay: -1.1, seconds: 3.6, node: [560, 100] },
  { d: "M475 340 H520 V450 H530", delay: -2.2, seconds: 3.4, node: [530, 450] },
  { d: "M325 340 H262 V485 H205", delay: -0.6, seconds: 3.8, node: [205, 485] },
  { d: "M400 395 V470 H360 V575", delay: -1.7, seconds: 4.2, node: [360, 575] },
  { d: "M440 395 V525 H505", delay: -2.8, seconds: 3.5, node: [505, 525] },
  { d: "M475 290 H600 V250 H710", delay: -0.3, seconds: 4.0, node: [710, 250] },
  { d: "M325 290 H150 V275", delay: -1.4, seconds: 3.3, node: [150, 275] },
];

// Little tokens that rise through the scene and fade: code, binary, hex.
const TOKENS: { t: string; left: string; top: string; delay: number }[] = [
  { t: "</>", left: "6%", top: "58%", delay: 0 },
  { t: "01101", left: "20%", top: "86%", delay: -3 },
  { t: "{ }", left: "44%", top: "8%", delay: -5.5 },
  { t: "0x1F", left: "86%", top: "34%", delay: -1.5 },
  { t: "fn()", left: "62%", top: "90%", delay: -7 },
  { t: "1010", left: "92%", top: "72%", delay: -4 },
  { t: "=>", left: "34%", top: "70%", delay: -6 },
];

const CODE_LINES: { x: number; w: number; fill: string }[][] = [
  [
    { x: 0, w: 26, fill: BLUE },
    { x: 32, w: 56, fill: STEEL },
    { x: 94, w: 30, fill: SKY },
  ],
  [
    { x: 14, w: 40, fill: SKY },
    { x: 60, w: 22, fill: STEEL },
    { x: 88, w: 50, fill: BLUE },
  ],
  [
    { x: 14, w: 62, fill: STEEL },
    { x: 82, w: 34, fill: SKY },
  ],
  [
    { x: 14, w: 28, fill: BLUE },
    { x: 48, w: 70, fill: STEEL },
  ],
  [{ x: 0, w: 18, fill: BLUE }],
];

export default function HeroScene() {
  const pinsTop = [345, 372, 400, 428, 455];
  return (
    <div className="relative mx-auto w-full max-w-[46rem]" aria-hidden>
      <svg viewBox="0 0 800 640" fill="none" className="block h-auto w-full">
        <defs>
          <linearGradient id="hero-chip" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#ffffff" />
            <stop offset="1" stopColor="#e3f1fb" />
          </linearGradient>
          <linearGradient id="hero-pulse" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor={SKY} />
            <stop offset="1" stopColor={BLUE} />
          </linearGradient>
          <filter id="hero-shadow" x="-20%" y="-20%" width="140%" height="150%">
            <feDropShadow
              dx="0"
              dy="10"
              stdDeviation="14"
              floodColor="#285b7a"
              floodOpacity="0.16"
            />
          </filter>
          <radialGradient id="hero-halo" cx="50%" cy="50%" r="50%">
            <stop offset="0" stopColor={SKY} stopOpacity="0.35" />
            <stop offset="1" stopColor={SKY} stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Glow behind the chip */}
        <circle
          cx="400"
          cy="320"
          r="230"
          fill="url(#hero-halo)"
          className="hw-core"
        />

        {/* Traces: the still line, then the light running along it */}
        {TRACES.map((tr) => (
          <g key={tr.d}>
            <path
              d={tr.d}
              stroke={BASE}
              strokeWidth="3"
              strokeLinejoin="round"
            />
            <path
              d={tr.d}
              pathLength={100}
              stroke="url(#hero-pulse)"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="hw-pulse"
              style={{
                animationDuration: `${tr.seconds}s`,
                animationDelay: `${tr.delay}s`,
              }}
            />
            <circle
              cx={tr.node[0]}
              cy={tr.node[1]}
              r="5"
              fill="#fff"
              stroke={BLUE}
              strokeWidth="2.5"
            />
            <circle
              cx={tr.node[0]}
              cy={tr.node[1]}
              r="5"
              stroke={SKY}
              strokeWidth="2"
              className="hw-ping"
              style={{ animationDelay: `${tr.delay}s` }}
            />
          </g>
        ))}

        {/* Data packets running from the code window into the chip */}
        {[0, 1.6, 3.2].map((begin) => (
          <rect
            key={begin}
            x="-5"
            y="-5"
            width="10"
            height="10"
            rx="2.5"
            fill={BLUE}
          >
            <animateMotion
              dur="4.8s"
              begin={`${begin}s`}
              repeatCount="indefinite"
              path="M290 150 H340 V245"
              keyPoints="0;1"
              keyTimes="0;1"
              calcMode="linear"
            />
            <animate
              attributeName="opacity"
              values="0;1;1;0"
              keyTimes="0;0.1;0.85;1"
              dur="4.8s"
              begin={`${begin}s`}
              repeatCount="indefinite"
            />
          </rect>
        ))}

        {/* The chip */}
        <g filter="url(#hero-shadow)">
          {pinsTop.map((x) => (
            <g key={x}>
              <rect x={x - 3} y="236" width="6" height="12" rx="2" fill={SKY} />
              <rect x={x - 3} y="392" width="6" height="12" rx="2" fill={SKY} />
            </g>
          ))}
          {[270, 297, 325, 353].map((y) => (
            <g key={y}>
              <rect x="316" y={y - 3} width="12" height="6" rx="2" fill={SKY} />
              <rect x="472" y={y - 3} width="12" height="6" rx="2" fill={SKY} />
            </g>
          ))}
          <rect
            x="326"
            y="246"
            width="148"
            height="148"
            rx="22"
            fill="url(#hero-chip)"
            stroke={BLUE}
            strokeWidth="2.5"
          />
          <rect
            x="342"
            y="262"
            width="116"
            height="116"
            rx="14"
            stroke={SKY}
            strokeWidth="1.5"
            strokeDasharray="4 6"
          />
        </g>

        {/* Code window (software) */}
        <g className="hw-float" style={{ animationDelay: "-2s" }}>
          <g filter="url(#hero-shadow)">
            <rect
              x="20"
              y="40"
              width="270"
              height="190"
              rx="16"
              fill="#fff"
              stroke={BASE}
            />
          </g>
          <path
            d="M20 56a16 16 0 0 1 16-16h238a16 16 0 0 1 16 16v22H20z"
            fill="#eef6fc"
          />
          {[0, 1, 2].map((i) => (
            <circle
              key={i}
              cx={42 + i * 16}
              cy="59"
              r="4.5"
              fill={i === 0 ? BLUE : i === 1 ? SKY : BASE}
            />
          ))}
          <text
            x="236"
            y="63"
            fontSize="11"
            fill={STEEL}
            fontFamily="ui-monospace, monospace"
            opacity="0.8"
          >
            app.ts
          </text>
          {CODE_LINES.map((line, row) => (
            <g key={row} transform={`translate(40 ${100 + row * 24})`}>
              {line.map((tok, i) => (
                <rect
                  key={i}
                  x={tok.x}
                  y="0"
                  width={tok.w * 1.5}
                  height="9"
                  rx="4.5"
                  fill={tok.fill}
                  className="hw-type"
                  style={{
                    animationDelay: `${row * 0.55 + i * 0.18}s`,
                    transformOrigin: "left center",
                  }}
                />
              ))}
            </g>
          ))}
          <rect
            x="40"
            y="212"
            width="8"
            height="12"
            rx="1.5"
            fill={BLUE}
            className="hw-caret"
          />
        </g>

        {/* Build status (software) */}
        <g className="hw-float" style={{ animationDelay: "-4.5s" }}>
          <g filter="url(#hero-shadow)">
            <rect
              x="560"
              y="64"
              width="200"
              height="72"
              rx="36"
              fill="#fff"
              stroke={BASE}
            />
          </g>
          <circle cx="598" cy="100" r="17" fill="#e3f1fb" />
          <path
            d="M589 100l6 6 11-12"
            stroke={BLUE}
            strokeWidth="3.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="hw-blink"
          />
          <text
            x="628"
            y="96"
            fontSize="15"
            fontWeight="700"
            fill={STEEL}
            fontFamily="ui-sans-serif, system-ui"
          >
            Build passing
          </text>
          <text
            x="628"
            y="115"
            fontSize="12"
            fill={BLUE}
            fontFamily="ui-monospace, monospace"
          >
            deploy · live
          </text>
        </g>

        {/* Dashboard (software): bars that rise and fall, a ring that fills */}
        <g className="hw-float" style={{ animationDelay: "-1s" }}>
          <g filter="url(#hero-shadow)">
            <rect
              x="530"
              y="400"
              width="250"
              height="200"
              rx="18"
              fill="#fff"
              stroke={BASE}
            />
          </g>
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <rect
              key={i}
              x={556 + i * 24}
              y="440"
              width="14"
              height="100"
              rx="5"
              fill={i % 2 ? SKY : BLUE}
              className="hw-bar"
              style={{
                animationDelay: `${-i * 0.55}s`,
                animationDuration: `${2.6 + (i % 3) * 0.6}s`,
              }}
            />
          ))}
          <g transform="translate(722 505)">
            <circle r="24" stroke={BASE} strokeWidth="7" />
            <circle
              r="24"
              stroke={BLUE}
              strokeWidth="7"
              strokeLinecap="round"
              pathLength={100}
              strokeDasharray="100"
              transform="rotate(-90)"
              className="hw-ring"
            />
          </g>
        </g>

        {/* Memory module (hardware) */}
        <g className="hw-float" style={{ animationDelay: "-3.2s" }}>
          <g filter="url(#hero-shadow)">
            <rect
              x="40"
              y="450"
              width="165"
              height="70"
              rx="10"
              fill="#fff"
              stroke={BASE}
            />
          </g>
          {[0, 1, 2, 3].map((i) => (
            <g key={i}>
              <rect
                x={58 + i * 36}
                y="466"
                width="26"
                height="26"
                rx="5"
                fill="#e3f1fb"
                stroke={SKY}
              />
              <rect
                x={64 + i * 36}
                y="472"
                width="14"
                height="14"
                rx="3"
                fill={BLUE}
                className="hw-blink"
                style={{ animationDelay: `${i * 0.45}s` }}
              />
            </g>
          ))}
          {Array.from({ length: 12 }).map((_, i) => (
            <rect
              key={i}
              x={54 + i * 12}
              y="506"
              width="7"
              height="10"
              rx="1.5"
              fill={SKY}
            />
          ))}
        </g>
      </svg>

      {/* The Rizviz R on the chip */}
      <Image
        src={icon}
        alt=""
        width={96}
        height={96}
        priority
        className="pointer-events-none absolute left-1/2 top-1/2 h-[9%] w-auto -translate-x-1/2 -translate-y-1/2"
        style={{ filter: "drop-shadow(0 4px 10px rgba(50,159,224,0.35))" }}
      />

      {/* Tokens drifting up through the scene */}
      {TOKENS.map((tk) => (
        <span
          key={tk.t}
          style={{ left: tk.left, top: tk.top, animationDelay: `${tk.delay}s` }}
          className="hw-drift pointer-events-none absolute font-mono text-xs font-semibold text-brand-blue/70 sm:text-sm"
        >
          {tk.t}
        </span>
      ))}
    </div>
  );
}
