import PersonAvatar from "./PersonAvatar";

const board = [
  { name: "Zaid Azhar", role: "Head of HR" },
  { name: "Atif Anwar", role: "Head of Software Services" },
  { name: "Kaleem Hafeez", role: "Manager Administration" },
  { name: "Umar Shareef", role: "Head of Cybersecurity" },
  { name: "Feroze Abbas", role: "Head of Sales and Marketing" },
  { name: "Hasnain Gillani", role: "Head of Business Development" },
];

// One run of the people. The track holds two identical runs and slides by half its width, so the
// loop has no join. The right padding equals the gap, which keeps the spacing even across the join.
function Group({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul className="flex shrink-0 gap-10 pr-10" aria-hidden={hidden}>
      {board.map((p) => (
        <li
          key={p.name}
          className="flex w-44 shrink-0 flex-col items-center text-center sm:w-48"
        >
          <PersonAvatar />
          <h3 className="mt-4 text-base font-semibold text-brand-navy">
            {p.name}
          </h3>
          <p className="mt-1 text-sm font-medium text-brand-steel">{p.role}</p>
        </li>
      ))}
    </ul>
  );
}

// The heading and a line on the left; on the right half, the board members drift sideways across
// the page's own background. It pauses when pointed at. For people who prefer less motion it stops
// and the row scrolls by hand instead.
export default function Board() {
  return (
    <section
      id="board"
      className="relative w-full overflow-clip pb-24 pt-8 sm:pb-40 sm:pt-0"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 sm:px-10 md:grid-cols-2 md:gap-16">
        <div className="max-w-md text-left">
          <h2 className="text-4xl font-medium leading-[1.08] tracking-tight text-brand-navy shine-heading sm:text-5xl lg:text-6xl">
            Our Board
          </h2>
          <p className="mt-8 text-base leading-relaxed text-brand-navy/80 sm:text-lg">
            Meet the heads of Rizviz’s key functions, bringing experience across
            software, security, sales, and administration to the company’s
            decisions.
          </p>
        </div>

        {/* dir="ltr" so the row always slides the same way, even when the page is read right to left */}
        <div
          dir="ltr"
          className="group min-w-0 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] motion-reduce:overflow-x-auto"
        >
          <div className="flex w-max animate-marquee-x group-hover:[animation-play-state:paused] motion-reduce:animate-none">
            <Group />
            <Group hidden />
          </div>
        </div>
      </div>
    </section>
  );
}
