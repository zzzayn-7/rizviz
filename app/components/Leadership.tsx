const directors = [
  { name: "Syed Adnan Saeed", role: "Chief Executive Officer" },
  { name: "Syed Imran Saeed", role: "Chief Finance Officer" },
  { name: "Syed Faraz Mehdi", role: "Chief Operations Officer" },
  { name: "Syed Jibran Zaidi", role: "Director Operations" },
  { name: "Hussain Adnan", role: "Head IT" },
  { name: "Hassan Adnan", role: "Head Engineering" },
];

function Avatar() {
  return (
    <div className="glass-navy flex h-28 w-28 items-center justify-center rounded-full sm:h-32 sm:w-32">
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden
        className="h-16 w-16 text-brand-ice sm:h-20 sm:w-20"
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
      className="relative w-full overflow-hidden py-24 sm:py-40"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 sm:px-10 md:grid-cols-[minmax(0,1fr)_auto] md:gap-16">
        <div className="max-w-md text-left">
          <h2 className="text-5xl font-extrabold leading-none tracking-tight text-brand-navy sm:text-6xl lg:text-7xl">
            Our Core Leadership
          </h2>
          <p className="mt-8 text-base leading-relaxed text-brand-navy/80 sm:text-lg">
            Meet the people guiding Rizviz’s direction, supporting its team, and
            shaping its long-term growth.
          </p>
        </div>

        {/* The people sit close together on the right. */}
        <ul className="grid grid-cols-2 gap-x-10 gap-y-10 sm:grid-cols-3 md:justify-self-end">
          {directors.map((d) => (
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
    </section>
  );
}
