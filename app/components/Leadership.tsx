const founder = { name: "Syed Adnan Saeed", role: "Chairman" };

const team = [
  { name: "Syed Imran Saeed", role: "Chief Finance Officer" },
  { name: "Syed Faraz Mehdi", role: "Chief Operations Officer" },
  { name: "Syed Jibran Zaidi", role: "Director Operations" },
  { name: "Hussain Adnan", role: "Head IT" },
  { name: "Hassan Adnan", role: "Head Engineering" },
  { name: "Zaid Azhar", role: "Head HR" },
];

function Avatar({ large = false }: { large?: boolean }) {
  return (
    <div
      className={`glass-navy flex items-center justify-center rounded-full ${
        large ? "h-32 w-32 sm:h-36 sm:w-36" : "h-28 w-28 sm:h-32 sm:w-32"
      }`}
    >
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden
        className={`text-brand-ice ${large ? "h-[4.5rem] w-[4.5rem] sm:h-20 sm:w-20" : "h-16 w-16 sm:h-20 sm:w-20"}`}
      >
        <circle cx="12" cy="8.25" r="3.5" />
        <path d="M5 19.25c0-3.1 2.7-5.25 7-5.25s7 2.15 7 5.25c0 .55-.45 1-1 1H6c-.55 0-1-.45-1-1Z" />
      </svg>
    </div>
  );
}

export default function Leadership() {
  return (
    <section
      id="leadership"
      className="relative w-full overflow-clip py-24 sm:py-40"
    >
      <div className="mx-auto grid max-w-7xl items-start gap-14 px-6 sm:px-10 md:grid-cols-[minmax(0,1fr)_auto] md:gap-16">
        {/* Like the heading beside the application form: it stays in view while the people scroll past. */}
        <div className="max-w-md text-left md:sticky md:top-28 md:self-start">
          <h2 className="text-4xl font-medium leading-[1.08] tracking-tight text-brand-navy shine-heading sm:text-5xl lg:text-6xl">
            Our Core Leadership
          </h2>
          <p className="mt-8 text-base leading-relaxed text-brand-navy/80 sm:text-lg">
            Meet the people guiding Rizviz’s direction, supporting its team, and
            shaping its long-term growth.
          </p>
        </div>

        {/* On the right, as before: the founder in the middle at the top, and the six below him. */}
        <div className="flex flex-col items-center md:justify-self-end">
          <div className="flex flex-col items-center text-center">
            <Avatar large />
            <h3 className="mt-4 text-lg font-semibold text-brand-navy">
              {founder.name}
            </h3>
            <p className="mt-1 text-sm font-medium text-brand-steel">
              {founder.role}
            </p>
          </div>

          <ul className="mt-12 grid grid-cols-2 gap-x-10 gap-y-10 sm:grid-cols-3">
            {team.map((d) => (
              <li
                key={d.name}
                className="flex w-36 flex-col items-center text-center sm:w-40"
              >
                <Avatar />
                <h3 className="mt-4 text-base font-semibold text-brand-navy">
                  {d.name}
                </h3>
                <p className="mt-1 text-sm font-medium text-brand-steel">
                  {d.role}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
