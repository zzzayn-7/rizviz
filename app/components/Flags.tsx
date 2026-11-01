import type { LangCode } from "../i18n/languages";

// Simple round flags, drawn in SVG so they look the same on every system (flag emoji do not show on
// Windows). Each is drawn on a 3:2 sheet and cropped to the circle.
function Sheet({ children }: { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 36 24"
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full"
      aria-hidden
    >
      {children}
    </svg>
  );
}

const flags: Record<LangCode, React.ReactNode> = {
  "en-US": (
    <Sheet>
      <rect width="36" height="24" fill="#fff" />
      {[0, 2, 4, 6, 8, 10, 12].map((i) => (
        <rect key={i} y={(i * 24) / 13} width="36" height={24 / 13} fill="#b22234" />
      ))}
      <rect width="15" height={(7 * 24) / 13} fill="#3c3b6e" />
      {[0, 1, 2, 3].flatMap((r) =>
        [0, 1, 2, 3].map((c) => (
          <circle key={`${r}${c}`} cx={2 + c * 3.6} cy={2 + r * 2.7} r="0.6" fill="#fff" />
        )),
      )}
    </Sheet>
  ),
  "en-GB": (
    <Sheet>
      <rect width="36" height="24" fill="#012169" />
      <path d="M0 0 36 24M36 0 0 24" stroke="#fff" strokeWidth="4.5" />
      <path d="M0 0 36 24M36 0 0 24" stroke="#c8102e" strokeWidth="1.8" />
      <path d="M18 0v24M0 12h36" stroke="#fff" strokeWidth="7" />
      <path d="M18 0v24M0 12h36" stroke="#c8102e" strokeWidth="4" />
    </Sheet>
  ),
  de: (
    <Sheet>
      <rect width="36" height="8" fill="#000" />
      <rect y="8" width="36" height="8" fill="#dd0000" />
      <rect y="16" width="36" height="8" fill="#ffce00" />
    </Sheet>
  ),
  es: (
    <Sheet>
      <rect width="36" height="24" fill="#aa151b" />
      <rect y="6" width="36" height="12" fill="#f1bf00" />
    </Sheet>
  ),
  fr: (
    <Sheet>
      <rect width="12" height="24" fill="#0055a4" />
      <rect x="12" width="12" height="24" fill="#fff" />
      <rect x="24" width="12" height="24" fill="#ef4135" />
    </Sheet>
  ),
  ja: (
    <Sheet>
      <rect width="36" height="24" fill="#fff" />
      <circle cx="18" cy="12" r="7" fill="#bc002d" />
    </Sheet>
  ),
  ar: (
    <Sheet>
      <rect width="36" height="24" fill="#006c35" />
      <rect x="9" y="8" width="18" height="2.4" rx="1.2" fill="#fff" />
      <rect x="11" y="12" width="14" height="1.4" rx="0.7" fill="#fff" />
      <rect x="10" y="16" width="16" height="1.2" rx="0.6" fill="#fff" />
    </Sheet>
  ),
  zh: (
    <Sheet>
      <rect width="36" height="24" fill="#de2910" />
      <polygon
        points="7,3 8.6,7.7 13.5,7.7 9.6,10.6 11.1,15.3 7,12.4 2.9,15.3 4.4,10.6 0.5,7.7 5.4,7.7"
        fill="#ffde00"
      />
      {[
        [15, 3.5],
        [17.5, 6.5],
        [17.5, 10.5],
        [15, 13.5],
      ].map(([x, y]) => (
        <circle key={`${x}${y}`} cx={x} cy={y} r="1.1" fill="#ffde00" />
      ))}
    </Sheet>
  ),
};

export default function Flag({ code, className = "h-6 w-6" }: { code: LangCode; className?: string }) {
  return (
    <span
      className={`inline-block shrink-0 overflow-hidden rounded-full ring-1 ring-black/10 ${className}`}
    >
      {flags[code]}
    </span>
  );
}
