import Image, { type StaticImageData } from "next/image";
import cl1 from "../images/cl1.png";
import cl2 from "../images/cl2.png";
import cl3 from "../images/cl3.png";
import cl4 from "../images/cl4.png";
import cl5 from "../images/cl5.png";
import cl6 from "../images/cl6.png";
import cl7 from "../images/cl7.png";
import cl8 from "../images/cl8.png";
import cl9 from "../images/cl9.png";
import cl10 from "../images/cl10.png";

type Logo = {
  src: StaticImageData;
  alt: string;
  className?: string;
};

// Add new client logos (images named cl<number>.png) to the shorter column.
const columns: { logos: Logo[]; reverse: boolean }[] = [
  {
    reverse: false,
    logos: [
      { src: cl1, alt: "Jinnah Hospital Lahore" },
      { src: cl3, alt: "iCloud" },
      { src: cl5, alt: "The Crew" },
      { src: cl7, alt: "FedPoint Solutions" },
      { src: cl9, alt: "Annur" },
    ],
  },
  {
    reverse: true,
    logos: [
      { src: cl2, alt: "The Tourism Development Corporation of Punjab Ltd." },
      { src: cl4, alt: "FSR Consulting LLC DBA Cirrus Systems" },
      { src: cl6, alt: "Hoopoe Labs Inc" },
      {
        src: cl8,
        alt: "Silmun",
        className: "scale-[1.5]",
      },
      { src: cl10, alt: "Decimal Shift" },
    ],
  },
];

// Repeat each column's logos so one group is taller than the section; the
// track holds two identical groups and slides by half its height to loop.
const REPEATS = 3;

function Group({ logos, hidden = false }: { logos: Logo[]; hidden?: boolean }) {
  return (
    <ul className="flex shrink-0 flex-col" aria-hidden={hidden}>
      {Array.from({ length: REPEATS }).flatMap((_, r) =>
        logos.map((logo) => (
          <li
            key={`${r}-${logo.alt}`}
            className="flex h-28 items-center justify-center px-4 sm:h-32"
          >
            <Image
              src={logo.src}
              alt={hidden ? "" : logo.alt}
              sizes="200px"
              className={`h-auto max-h-10 w-auto max-w-[70%] object-contain brightness-0 invert sm:max-h-12 ${logo.className ?? ""}`}
            />
          </li>
        )),
      )}
    </ul>
  );
}

export default function Clients() {
  return (
    <section
      id="clients"
      className="relative isolate w-full overflow-hidden py-20 sm:py-24 md:py-0"
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-12 px-6 sm:px-10 md:min-h-[38rem] md:flex-row md:items-center md:gap-0">
        <div className="md:flex-1 md:pr-10">
          <div className="max-w-xl">
            <h2 className="text-5xl font-extrabold leading-none tracking-tight text-brand-navy sm:text-6xl lg:text-7xl">
              Our Clients
            </h2>
            <p className="mt-8 text-base leading-relaxed text-brand-navy/80 sm:text-lg">
              Organizations across healthcare, tourism, and technology rely on
              Rizviz to build digital solutions that fit the way they work.
            </p>
          </div>
        </div>

        {/* Same size and place as before. Two frosted navy glass panels, one per
            scroller, come out of a navy slab on the right. The logos are drawn
            in white so they stay readable on the dark glass. */}
        <div className="group relative flex h-[30rem] items-stretch md:mr-[4%] md:h-[34rem] md:w-[38%]">
          <div
            aria-hidden
            className="absolute inset-y-8 right-0 w-[40%] rounded-[2rem] bg-gradient-to-b from-brand-steel via-brand-navy/90 to-brand-navy shadow-[0_0_60px_rgba(11,29,45,0.35)]"
          />
          {columns.map((col, i) => (
            <div
              key={i}
              className={`relative z-10 min-w-0 flex-1 glass-navy overflow-hidden rounded-[2rem] ${
                i === 0 ? "mr-3" : "mr-[16%]"
              }`}
            >
              <div className="h-full overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_18%,black_82%,transparent)]">
                <div
                  className={`flex animate-marquee-y flex-col group-hover:[animation-play-state:paused] ${
                    col.reverse ? "[animation-direction:reverse]" : ""
                  }`}
                >
                  <Group logos={col.logos} />
                  <Group logos={col.logos} hidden />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
