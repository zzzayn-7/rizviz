import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import cl1 from "../images/cl1.png";
import cl2 from "../images/cl2.png";
import cl3 from "../images/cl3.png";
import cl4 from "../images/cl4.png";
import cl6 from "../images/cl6.png";
import cl7 from "../images/cl7.png";
import cl8 from "../images/cl8.png";
import cl9 from "../images/cl9.png";
import cl10 from "../images/cl10.png";
import cl11 from "../images/cl11.png";

type Logo = {
  src: StaticImageData;
  alt: string;
  // Round, square-ish logos are limited by height, wide ones by width.
  round?: boolean;
  // A white logo (FedPoint, Silmun) would vanish on a light tile, so its tile is navy.
  dark?: boolean;
};

// Nine clients in a 3 x 3 grid of tiles, every logo in its own colours. The navy tiles hold the
// white logos.
const logos: Logo[] = [
  { src: cl7, alt: "FedPoint Solutions", dark: true },
  { src: cl4, alt: "FSR Consulting LLC DBA Cirrus Systems" },
  { src: cl3, alt: "iCloud" },
  { src: cl1, alt: "Jinnah Hospital Lahore", round: true },
  { src: cl8, alt: "Silmun", dark: true },
  { src: cl2, alt: "The Tourism Development Corporation of Punjab Ltd.", round: true },
  { src: cl9, alt: "Annur" },
  { src: cl10, alt: "Decimal Shift" },
  { src: cl11, alt: "Trans Global Services", dark: true },
];

export default function Clients() {
  return (
    <section
      id="clients"
      className="relative isolate w-full py-20 sm:py-24 md:py-0"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 sm:px-10 md:min-h-[38rem] md:grid-cols-[0.9fr_1.1fr] md:gap-16">
        <div>
          <h2 className="max-w-xl text-4xl font-medium leading-[1.08] tracking-tight text-brand-navy shine-heading sm:text-5xl lg:text-6xl">
            Trusted by the organizations we build for.
          </h2>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-brand-navy/80 sm:text-lg">
            Across healthcare, tourism, and technology, teams rely on Rizviz to
            build digital solutions that fit the way they work, and to see them
            through from the first idea to long-term support.
          </p>
          <Link
            href="/about#our-reach"
            className="glass-navy btn-glow mt-8 inline-block rounded-full px-8 py-3.5 font-semibold text-white"
          >
            View all clients
          </Link>
        </div>

        <ul className="grid grid-cols-3 gap-3 sm:gap-4">
          {logos.map((logo) => (
            <li
              key={logo.alt}
              className={`group flex aspect-[1.3/1] items-center justify-center rounded-2xl p-4 transition duration-300 hover:-translate-y-1 sm:p-6 ${
                logo.dark
                  ? "glass-navy"
                  : "tile-lines border border-brand-navy/15 bg-transparent hover:border-brand-navy/30"
              }`}
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                sizes="200px"
                className={`h-auto w-auto object-contain transition-transform duration-500 group-hover:scale-105 ${
                  logo.round
                    ? "max-h-[62%] max-w-[62%]"
                    : "max-h-[40%] max-w-[78%]"
                }`}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
