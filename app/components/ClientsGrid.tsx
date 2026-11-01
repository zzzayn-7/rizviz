import Image, { type StaticImageData } from "next/image";
import cl1 from "../images/cl1.png";
import cl2 from "../images/cl2.png";
import cl3 from "../images/cl3.png";
import cl4 from "../images/cl4.png";
import cl6 from "../images/cl6.png";
import cl7 from "../images/cl7.png";
import cl8 from "../images/cl8.png";
import cl9 from "../images/cl9.png";
import cl10 from "../images/cl10.png";

type Logo = {
  src: StaticImageData;
  alt: string;
  // Round, square-ish logos are limited by height, wide ones by width.
  round?: boolean;
};

// Nine clients, three to a row. The light logos (FedPoint, Silmun) are spread out, so each sits next
// to darker ones. Logos are shown in their own colours.
const logos: Logo[] = [
  { src: cl7, alt: "FedPoint Solutions" },
  { src: cl6, alt: "Hoopoe Labs Inc" },
  { src: cl3, alt: "iCloud" },
  { src: cl1, alt: "Jinnah Hospital Lahore", round: true },
  { src: cl8, alt: "Silmun" },
  { src: cl2, alt: "The Tourism Development Corporation of Punjab Ltd.", round: true },
  { src: cl9, alt: "Annur" },
  { src: cl10, alt: "Decimal Shift" },
  { src: cl4, alt: "FSR Consulting LLC DBA Cirrus Systems" },
];

const LINE = "bg-white/80";

// The lines of the grid reach a little past the cells on every side, the way a drawn table does:
// one horizontal line at the top of each row (and the bottom edge), one vertical line at the left of
// each column (and the right edge).
function Lines() {
  const ticks = [0, 1, 2, 3];
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      {ticks.map((i) => (
        <span
          key={`h${i}`}
          className={`absolute -left-8 -right-8 h-px ${LINE}`}
          style={{ top: `calc(${(i / 3) * 100}% - 0.5px)` }}
        />
      ))}
      {ticks.map((i) => (
        <span
          key={`v${i}`}
          className={`absolute -bottom-8 -top-8 w-px ${LINE}`}
          style={{ left: `calc(${(i / 3) * 100}% - 0.5px)` }}
        />
      ))}
    </div>
  );
}

export default function ClientsGrid() {
  return (
    <section
      id="clients"
      className="relative isolate w-full py-20 sm:py-24 md:py-0"
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-14 px-6 sm:px-10 md:min-h-[38rem] md:flex-row md:items-center md:gap-0">
        <div className="md:flex-1 md:pr-10">
          <div className="max-w-xl">
            <h2 className="text-4xl font-medium leading-[1.08] tracking-tight text-brand-navy shine-heading sm:text-5xl lg:text-6xl">
              Our Clients
            </h2>
            <p className="mt-8 text-base leading-relaxed text-brand-navy/80 sm:text-lg">
              Organizations across healthcare, tourism, and technology rely on
              Rizviz to build digital solutions that fit the way they work.
            </p>
          </div>
        </div>

        {/* The logos sit in a drawn grid of thin white lines, over a soft navy glow so the lines show
            on the light page. */}
        <div className="relative my-10 w-full md:my-16 md:mr-[2%] md:w-[46%]">
          <div
            aria-hidden
            className="absolute -inset-14 rounded-[4rem] bg-brand-navy opacity-90 blur-3xl"
          />
          <div
            aria-hidden
            className="absolute -inset-5 rounded-[3rem] bg-[#0d2336] opacity-95 blur-xl"
          />

          <div className="relative grid grid-cols-3">
            <Lines />
            {logos.map((logo) => (
              <div
                key={logo.alt}
                className="group relative flex aspect-[1.2/1] items-center justify-center p-4 sm:p-6"
              >
                <div
                  aria-hidden
                  className="absolute inset-px bg-white/0 transition-colors duration-500 group-hover:bg-white/[0.06]"
                />
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  sizes="200px"
                  className={`relative h-auto w-auto object-contain brightness-[1.2] saturate-125 transition-transform duration-500 group-hover:scale-105 ${
                    logo.round
                      ? "max-h-[62%] max-w-[62%]"
                      : "max-h-[40%] max-w-[82%]"
                  }`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
