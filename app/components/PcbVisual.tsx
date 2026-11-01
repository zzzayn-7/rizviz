// A navy glass card for the PCB Engineering page: a stylised board with traces and pads, and the four
// stages a board goes through underneath it.
const STAGES = ["Schematic", "Layout", "Prototype", "Production"];

// Traces on a 240 x 130 board, drawn with right-angle bends like a real layout.
const TRACES = [
  "M20 30 H70 V60 H110",
  "M20 60 H50 V95 H110",
  "M20 100 H40",
  "M130 45 H170 V25 H220",
  "M130 65 H200 V80 H220",
  "M130 90 H160 V110 H220",
  "M70 120 V95",
];
const PADS: [number, number][] = [
  [20, 30],
  [20, 60],
  [20, 100],
  [220, 25],
  [220, 80],
  [220, 110],
  [110, 60],
  [110, 95],
  [130, 45],
  [130, 65],
  [130, 90],
];

export default function PcbVisual() {
  return (
    <div className="glass-navy relative flex h-full min-h-[22rem] flex-col justify-between gap-6 rounded-3xl p-6 text-white sm:p-8">
      <div>
        <p className="inline-block rounded-full border border-white/40 bg-white/[0.12] px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-widest sm:px-4 sm:text-xs">
          Board design flow
        </p>

        <svg
          viewBox="0 0 240 130"
          className="mt-6 h-auto w-full"
          fill="none"
          aria-hidden
        >
          {/* the board and its chip */}
          <rect x="4" y="4" width="232" height="122" rx="10" fill="rgb(255 255 255 / 0.05)" stroke="rgb(181 229 255 / 0.5)" />
          <rect x="108" y="40" width="26" height="62" rx="3" fill="rgb(112 199 244 / 0.18)" stroke="rgb(181 229 255 / 0.9)" />
          {TRACES.map((d, i) => (
            <path
              key={d}
              d={d}
              stroke="rgb(112 199 244)"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              pathLength={1}
              strokeDasharray={1}
              className="animate-fade-up"
              style={{ animationDelay: `${0.12 * i}s`, strokeDashoffset: 0 }}
            />
          ))}
          {PADS.map(([x, y]) => (
            <circle key={`${x}-${y}`} cx={x} cy={y} r="2.6" fill="rgb(181 229 255)" />
          ))}
        </svg>
      </div>

      <ol className="grid grid-cols-4 gap-2">
        {STAGES.map((s, i) => (
          <li key={s} className="flex flex-col items-center gap-2 text-center">
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/40 bg-white/[0.1] text-xs font-semibold text-brand-ice">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="text-xs font-medium text-brand-ice sm:text-sm">{s}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
