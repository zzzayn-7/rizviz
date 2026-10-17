import Image from "next/image";
import heroImage from "./images/home-hero.png";
import aboutImage from "./images/about.png";
import Navbar from "./components/Navbar";
import Capabilities from "./components/Capabilities";
import Clients from "./components/Clients";
import FeaturedProducts from "./components/FeaturedProducts";

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <section className="relative isolate flex min-h-screen w-full items-center overflow-hidden bg-brand-navy">
        <Image
          src={heroImage}
          alt=""
          fill
          priority
          sizes="100vw"
          className="-z-10 object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-brand-navy/50 via-brand-navy/20 to-transparent" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-l from-brand-navy/50 via-brand-navy/20 to-transparent" />

        <div className="mx-auto flex w-full max-w-7xl flex-col items-center px-6 py-24 text-center sm:px-10">
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-brand-sky">
            Welcome to Rizviz
          </p>
          <h1 className="max-w-3xl text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
            Technology built around
            <br />
            <span className="text-brand-ice">business.</span>
          </h1>
          <a
            href="#capabilities"
            className="mt-10 inline-block rounded-full border-2 border-brand-blue bg-brand-blue px-8 py-3.5 font-semibold text-white transition-colors duration-500 ease-in-out hover:bg-transparent"
          >
            Explore our capabilities
          </a>
        </div>
      </section>

      <section
        id="about"
        className="relative isolate flex w-full items-center overflow-hidden bg-brand-navy"
      >
        <Image
          src={aboutImage}
          alt=""
          sizes="(min-width: 768px) 50vw, 100vw"
          style={{
            maskImage:
              "linear-gradient(to right, transparent, black 70%), linear-gradient(to bottom, transparent, black 40%, black 60%, transparent)",
            maskComposite: "intersect",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black 70%), linear-gradient(to bottom, transparent, black 40%, black 60%, transparent)",
            WebkitMaskComposite: "source-in",
          }}
          className="absolute right-0 top-0 -z-10 h-full w-full object-cover opacity-30 md:w-1/2 md:opacity-100"
        />

        <div className="mx-auto w-full max-w-7xl px-6 py-20 sm:px-10 md:py-24">
          <div className="max-w-xl">
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-brand-sky">
              Who we are
            </p>
            <h2 className="text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
              Built on expertise.
            </h2>
            <p className="mt-6 text-base leading-relaxed text-brand-ice/90">
              Rizviz brings together expertise in software, AI, data, and cloud
              technologies to build practical digital solutions. We work closely
              with your team to understand your operations and develop systems
              that support the way you work. Our engineers, developers, and
              technology specialists collaborate across disciplines to bring each
              solution to life.
            </p>
            <a
              href="/about"
              className="mt-10 inline-block rounded-full border-2 border-brand-blue bg-brand-blue px-8 py-3.5 font-semibold text-white transition-colors duration-500 ease-in-out hover:bg-transparent"
            >
              More about us
            </a>
          </div>
        </div>
      </section>

      <Clients />

      <Capabilities />

      <FeaturedProducts />
    </main>
  );
}
