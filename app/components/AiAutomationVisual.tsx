"use client";

import { useEffect, useState, type CSSProperties } from "react";

// A tall blue-glass screen, in the style of the About page's graphic, that
// alternates between two scenes every five seconds: work flowing through an AI
// automation, then an AI assistant answering a question.
const SWITCH_MS = 5000;

const SCENES = [
  { id: "automation", label: "AI workflow automation" },
  { id: "assistant", label: "AI assistant" },
] as const;

const delay = (s: number): CSSProperties => ({ animationDelay: `${s}s` });

const W = "#ffffff";
const GLASS = "rgba(255,255,255,0.14)";

function Defs() {
  return (
    <defs>
      <linearGradient id="av-line" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="rgba(255,255,255,0.5)" />
        <stop offset="1" stopColor={W} />
      </linearGradient>
      <linearGradient id="av-bar" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor={W} />
        <stop offset="1" stopColor="rgba(255,255,255,0.45)" />
      </linearGradient>
      <radialGradient id="av-glow" cx="50%" cy="50%" r="50%">
        <stop offset="0" stopColor={W} stopOpacity="0.4" />
        <stop offset="1" stopColor={W} stopOpacity="0" />
      </radialGradient>
    </defs>
  );
}

// A task coming in, or a result going out.
function Card({
  x,
  y,
  d,
  done,
  label,
  children,
}: {
  x: number;
  y: number;
  d: number;
  done?: boolean;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <g className="wv-rise" style={delay(d)}>
      <g transform={`translate(${x} ${y})`}>
        <rect
          width="300"
          height="130"
          rx="28"
          fill={GLASS}
          stroke={W}
          strokeOpacity="0.75"
          strokeWidth="3"
        />
        <g transform="translate(34 34)">{children}</g>
        <text
          x="124"
          y="62"
          fontSize="30"
          fontWeight="700"
          fill={W}
          fontFamily="ui-sans-serif, system-ui"
        >
          {label}
        </text>
        {done ? (
          <text
            x="124"
            y="102"
            fontSize="24"
            fill={W}
            opacity="0.85"
            fontFamily="ui-sans-serif, system-ui"
          >
            Completed
          </text>
        ) : (
          <>
            <rect
              x="124"
              y="84"
              width="130"
              height="12"
              rx="6"
              fill={W}
              opacity="0.55"
            />
            <rect
              x="124"
              y="104"
              width="84"
              height="12"
              rx="6"
              fill={W}
              opacity="0.3"
            />
          </>
        )}
      </g>
    </g>
  );
}

function AutomationScene() {
  const ys = [90, 310, 530];
  const tasks = ["Emails", "Invoices", "Requests"];
  const results = ["Sorted", "Processed", "Answered"];
  return (
    <svg
      viewBox="0 0 1200 900"
      preserveAspectRatio="xMidYMid meet"
      className="wv-scene block h-full w-full"
      role="img"
      aria-label="Work flowing through an AI automation"
    >
      <Defs />
      <circle cx="600" cy="400" r="420" fill="url(#av-glow)" />

      {/* Incoming work */}
      {ys.map((y, i) => (
        <Card key={tasks[i]} x={60} y={y} d={0.2 + i * 0.2} label={tasks[i]}>
          {i === 0 && (
            <g
              fill="none"
              stroke={W}
              strokeWidth="5"
              strokeLinejoin="round"
              strokeLinecap="round"
            >
              <rect width="62" height="46" rx="8" y="8" />
              <path d="M2 14 l29 22 l29 -22" />
            </g>
          )}
          {i === 1 && (
            <g
              fill="none"
              stroke={W}
              strokeWidth="5"
              strokeLinejoin="round"
              strokeLinecap="round"
            >
              <rect x="6" width="50" height="62" rx="8" />
              <path d="M18 20h26M18 32h26M18 44h16" />
            </g>
          )}
          {i === 2 && (
            <g
              fill="none"
              stroke={W}
              strokeWidth="5"
              strokeLinejoin="round"
              strokeLinecap="round"
            >
              <path d="M6 6h52a6 6 0 0 1 6 6v30a6 6 0 0 1-6 6H30l-14 12V48H6a6 6 0 0 1-6-6V12a6 6 0 0 1 6-6z" />
            </g>
          )}
        </Card>
      ))}

      {/* Light running in and out */}
      {ys.map((y, i) => (
        <g key={y}>
          <path
            d={`M360 ${y + 65} C 430 ${y + 65}, 440 400, 490 400`}
            stroke={W}
            strokeOpacity="0.35"
            strokeWidth="3"
            strokeDasharray="4 8"
            fill="none"
          />
          <path
            d={`M360 ${y + 65} C 430 ${y + 65}, 440 400, 490 400`}
            pathLength={100}
            stroke="url(#av-line)"
            strokeWidth="6"
            strokeLinecap="round"
            fill="none"
            className="hw-pulse"
            style={delay(-i * 1.1)}
          />
          <path
            d={`M710 400 C 760 400, 770 ${y + 65}, 840 ${y + 65}`}
            stroke={W}
            strokeOpacity="0.35"
            strokeWidth="3"
            strokeDasharray="4 8"
            fill="none"
          />
          <path
            d={`M710 400 C 760 400, 770 ${y + 65}, 840 ${y + 65}`}
            pathLength={100}
            stroke="url(#av-line)"
            strokeWidth="6"
            strokeLinecap="round"
            fill="none"
            className="hw-pulse"
            style={delay(-i * 1.1 - 0.6)}
          />
        </g>
      ))}

      {/* The AI at the centre */}
      <g className="wv-pop" style={delay(0.9)}>
        <circle
          cx="600"
          cy="400"
          r="130"
          fill="none"
          stroke={W}
          strokeOpacity="0.6"
          strokeWidth="3"
          className="hw-ping"
        />
        <circle
          cx="600"
          cy="400"
          r="130"
          fill="none"
          stroke={W}
          strokeOpacity="0.6"
          strokeWidth="3"
          className="hw-ping"
          style={delay(1.4)}
        />
        {[-70, -35, 0, 35, 70].map((o) => (
          <g key={o} fill={W} opacity="0.7">
            <rect x={600 + o - 5} y="262" width="10" height="26" rx="4" />
            <rect x={600 + o - 5} y="512" width="10" height="26" rx="4" />
            <rect x="462" y={400 + o - 5} width="26" height="10" rx="4" />
            <rect x="712" y={400 + o - 5} width="26" height="10" rx="4" />
          </g>
        ))}
        <rect
          x="490"
          y="290"
          width="220"
          height="220"
          rx="48"
          fill={GLASS}
          stroke={W}
          strokeWidth="4"
        />
        <rect
          x="510"
          y="310"
          width="180"
          height="180"
          rx="34"
          fill="rgba(255,255,255,0.12)"
          className="hw-core"
        />
        <text
          x="600"
          y="432"
          textAnchor="middle"
          fontSize="108"
          fontWeight="800"
          fill={W}
          fontFamily="ui-sans-serif, system-ui"
        >
          AI
        </text>
      </g>

      {/* Finished work */}
      {ys.map((y, i) => (
        <Card
          key={results[i]}
          x={840}
          y={y}
          d={1.4 + i * 0.2}
          done
          label={results[i]}
        >
          <g fill="none" stroke={W} strokeWidth="5" strokeLinecap="round">
            <circle cx="31" cy="31" r="28" />
            <path d="M18 32 l9 9 l19 -20" strokeLinejoin="round" />
          </g>
        </Card>
      ))}

      {/* What it adds up to */}
      <g className="wv-rise" style={delay(2.2)}>
        <rect
          x="60"
          y="740"
          width="1080"
          height="110"
          rx="30"
          fill={GLASS}
          stroke={W}
          strokeOpacity="0.6"
          strokeWidth="3"
        />
        {["Hours saved", "Fewer errors", "Faster answers"].map((t, i) => (
          <g key={t} transform={`translate(${110 + i * 350} 770)`}>
            <path
              d="M0 40 l16 -18 l14 11 l20 -25"
              stroke={W}
              strokeWidth="7"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            <text
              x="76"
              y="46"
              fontSize="32"
              fontWeight="700"
              fill={W}
              fontFamily="ui-sans-serif, system-ui"
            >
              {t}
            </text>
          </g>
        ))}
      </g>
    </svg>
  );
}

function AssistantScene() {
  return (
    <svg
      viewBox="0 0 1200 900"
      preserveAspectRatio="xMidYMid meet"
      className="wv-scene block h-full w-full"
      role="img"
      aria-label="An AI assistant answering a question"
    >
      <Defs />
      <circle cx="420" cy="460" r="440" fill="url(#av-glow)" />

      {/* The chat */}
      <rect
        x="60"
        y="60"
        width="700"
        height="780"
        rx="34"
        fill={GLASS}
        stroke={W}
        strokeOpacity="0.75"
        strokeWidth="3"
      />
      <path
        d="M60 94a34 34 0 0 1 34-34h632a34 34 0 0 1 34 34v56H60z"
        fill="rgba(255,255,255,0.2)"
      />
      <circle cx="112" cy="105" r="22" fill="none" stroke={W} strokeWidth="4" />
      <text
        x="112"
        y="113"
        textAnchor="middle"
        fontSize="22"
        fontWeight="800"
        fill={W}
        fontFamily="ui-sans-serif, system-ui"
      >
        AI
      </text>
      <text
        x="150"
        y="114"
        fontSize="28"
        fontWeight="700"
        fill={W}
        fontFamily="ui-sans-serif, system-ui"
      >
        Rizviz assistant
      </text>
      <circle cx="700" cy="105" r="9" fill={W} className="hw-blink" />

      {/* A question */}
      <g className="wv-rise" style={delay(0.3)}>
        <rect
          x="290"
          y="190"
          width="430"
          height="110"
          rx="30"
          fill="rgba(255,255,255,0.28)"
          stroke={W}
          strokeOpacity="0.8"
          strokeWidth="3"
        />
        {[
          [330, 120],
          [330, 80],
        ].map(([x, w], i) => (
          <rect
            key={i}
            x={x}
            y={228 + i * 28}
            width={w * 2.6 > 340 ? 340 : w * 2.6}
            height="14"
            rx="7"
            fill={W}
            className="wv-type"
            style={delay(0.7 + i * 0.4)}
          />
        ))}
      </g>

      {/* The assistant thinks, then answers */}
      <g className="wv-rise" style={delay(1.4)}>
        <circle
          cx="116"
          cy="372"
          r="30"
          fill="none"
          stroke={W}
          strokeWidth="4"
        />
        <text
          x="116"
          y="383"
          textAnchor="middle"
          fontSize="28"
          fontWeight="800"
          fill={W}
          fontFamily="ui-sans-serif, system-ui"
        >
          AI
        </text>
        <g className="wv-gone" style={delay(2.5)}>
          <rect
            x="170"
            y="330"
            width="130"
            height="84"
            rx="30"
            fill={GLASS}
            stroke={W}
            strokeOpacity="0.7"
            strokeWidth="3"
          />
          {[0, 1, 2].map((i) => (
            <circle
              key={i}
              cx={210 + i * 36}
              cy="372"
              r="8"
              fill={W}
              className="hw-blink"
              style={delay(i * 0.3)}
            />
          ))}
        </g>
      </g>
      <g className="wv-rise" style={delay(2.6)}>
        <rect
          x="170"
          y="330"
          width="500"
          height="250"
          rx="30"
          fill="rgba(255,255,255,0.22)"
          stroke={W}
          strokeOpacity="0.8"
          strokeWidth="3"
        />
        <rect
          x="204"
          y="364"
          width="300"
          height="16"
          rx="8"
          fill={W}
          className="wv-type"
          style={delay(2.8)}
        />
        <rect
          x="204"
          y="396"
          width="400"
          height="14"
          rx="7"
          fill={W}
          opacity="0.7"
          className="wv-type"
          style={delay(3.0)}
        />
        <rect
          x="204"
          y="424"
          width="350"
          height="14"
          rx="7"
          fill={W}
          opacity="0.7"
          className="wv-type"
          style={delay(3.2)}
        />
        {[44, 70, 100, 130].map((h, i) => (
          <rect
            key={h}
            x={204 + i * 44}
            y={555 - h}
            width="26"
            height={h}
            rx="7"
            fill="url(#av-bar)"
            className="wv-bar"
            style={delay(3.4 + i * 0.12)}
          />
        ))}
        <path
          d="M400 540 L440 500 L480 520 L560 450"
          stroke={W}
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          pathLength={1}
          className="wv-draw"
          style={delay(3.4)}
        />
      </g>

      {/* The input */}
      <rect
        x="100"
        y="720"
        width="620"
        height="76"
        rx="38"
        fill="rgba(255,255,255,0.12)"
        stroke={W}
        strokeOpacity="0.6"
        strokeWidth="3"
      />
      <rect
        x="140"
        y="750"
        width="220"
        height="14"
        rx="7"
        fill={W}
        opacity="0.5"
      />
      <circle cx="676" cy="758" r="26" fill={W} />
      <path
        d="M666 758 h20 m-8 -8 l8 8 l-8 8"
        stroke="#1d7fe0"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* How well it is doing */}
      <g className="wv-rise" style={delay(1.0)}>
        <rect
          x="820"
          y="60"
          width="320"
          height="360"
          rx="34"
          fill={GLASS}
          stroke={W}
          strokeOpacity="0.75"
          strokeWidth="3"
        />
        <text
          x="980"
          y="124"
          textAnchor="middle"
          fontSize="28"
          fontWeight="700"
          fill={W}
          fontFamily="ui-sans-serif, system-ui"
        >
          Accuracy
        </text>
        <circle
          cx="980"
          cy="250"
          r="90"
          fill="none"
          stroke={W}
          strokeOpacity="0.25"
          strokeWidth="16"
        />
        <circle
          cx="980"
          cy="250"
          r="90"
          fill="none"
          stroke={W}
          strokeWidth="16"
          strokeLinecap="round"
          pathLength={1}
          className="wv-draw"
          style={{
            strokeDasharray: 1,
            strokeDashoffset: 0.04,
            transform: "rotate(-90deg)",
            transformOrigin: "980px 250px",
            animationDelay: "1.4s",
          }}
        />
        <text
          x="980"
          y="268"
          textAnchor="middle"
          fontSize="54"
          fontWeight="800"
          fill={W}
          fontFamily="ui-sans-serif, system-ui"
        >
          98%
        </text>
        <text
          x="980"
          y="378"
          textAnchor="middle"
          fontSize="24"
          fill={W}
          opacity="0.8"
          fontFamily="ui-sans-serif, system-ui"
        >
          on real questions
        </text>
      </g>
      <g className="wv-rise" style={delay(1.6)}>
        <rect
          x="820"
          y="460"
          width="320"
          height="380"
          rx="34"
          fill={GLASS}
          stroke={W}
          strokeOpacity="0.75"
          strokeWidth="3"
        />
        <text
          x="980"
          y="524"
          textAnchor="middle"
          fontSize="28"
          fontWeight="700"
          fill={W}
          fontFamily="ui-sans-serif, system-ui"
        >
          Response time
        </text>
        {[250, 190, 140, 90, 50].map((h, i) => (
          <rect
            key={h}
            x={868 + i * 52}
            y={790 - h}
            width="34"
            height={h}
            rx="9"
            fill="url(#av-bar)"
            className="wv-bar"
            style={delay(2 + i * 0.14)}
          />
        ))}
        <line
          x1="856"
          x2="1104"
          y1="792"
          y2="792"
          stroke={W}
          strokeOpacity="0.5"
          strokeWidth="3"
        />
      </g>
    </svg>
  );
}

export default function AiAutomationVisual() {
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
          <AutomationScene key="automation" />
        ) : (
          <AssistantScene key="assistant" />
        )}
      </div>
    </div>
  );
}
