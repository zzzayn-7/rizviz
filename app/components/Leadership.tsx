import PersonAvatar from "./PersonAvatar";

// Six cards in a grid of three columns, all the same size. The chairman comes first.
const team = [
  { name: "Syed Adnan Saeed", role: "Chief Executive Officer" },
  { name: "Syed Imran Saeed", role: "Chief Finance Officer" },
  { name: "Syed Faraz Mehdi", role: "Chief Operating Officer" },
  { name: "Syed Jibran Zaidi", role: "Director Operations" },
  { name: "Hussain Adnan", role: "Head of IT" },
  { name: "Hassan Adnan", role: "Head of Engineering" },
];

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

        <ul className="grid grid-cols-3 gap-x-6 gap-y-10 sm:gap-x-10 md:justify-self-end">
          {team.map((p) => (
            <li
              key={p.name}
              className="flex w-28 flex-col items-center text-center sm:w-40"
            >
              <PersonAvatar />
              <h3 className="mt-4 text-base font-semibold text-brand-navy">
                {p.name}
              </h3>
              <p className="mt-1 text-sm font-medium text-brand-steel">
                {p.role}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
