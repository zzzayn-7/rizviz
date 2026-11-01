// A navy glass card for the Business Development page: a sales funnel that narrows from the first
// contact to a signed agreement, with the three things the service brings below it.
const STAGES = [
  { label: "Leads", width: 100 },
  { label: "Qualified", width: 74 },
  { label: "Proposals", width: 50 },
  { label: "Won", width: 30 },
];
const GAINS = ["More leads", "Clearer pipeline", "Stronger partnerships"];

export default function BusinessVisual() {
  return (
    <div className="glass-navy relative flex h-full min-h-[22rem] flex-col justify-between gap-8 rounded-3xl p-6 text-white sm:p-8">
      <div>
        <p className="inline-block rounded-full border border-white/40 bg-white/[0.12] px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-widest sm:px-4 sm:text-xs">
          Growth pipeline
        </p>

        <ul className="mt-8 space-y-5">
          {STAGES.map((s, i) => (
            <li key={s.label} className="flex items-center gap-4">
              <span className="w-24 shrink-0 text-sm font-medium text-brand-ice sm:w-28">
                {s.label}
              </span>
              <span className="h-3 flex-1 rounded-full bg-white/10">
                <span
                  className="animate-fade-up block h-full rounded-full bg-gradient-to-r from-brand-sky to-brand-ice"
                  style={{ width: `${s.width}%`, animationDelay: `${0.15 * i}s` }}
                />
              </span>
            </li>
          ))}
        </ul>
      </div>

      <ul className="flex flex-wrap gap-2">
        {GAINS.map((g) => (
          <li
            key={g}
            className="rounded-full border border-white/30 bg-white/[0.08] px-3.5 py-1.5 text-xs font-medium text-brand-ice sm:text-sm"
          >
            {g}
          </li>
        ))}
      </ul>
    </div>
  );
}
