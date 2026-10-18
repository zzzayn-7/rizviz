import type { Metadata } from "next";
import Image from "next/image";
import Navbar from "../components/Navbar";
import ProductCards from "../components/ProductCards";
import productsHero from "../images/products-hero.png";
import portfolio from "../images/products.png";

export const metadata: Metadata = {
  title: "Products | Rizviz",
};

export default function ProductsPage() {
  return (
    <main className="relative">
      <Navbar />
      <section className="relative isolate flex min-h-[78vh] w-full items-center overflow-hidden bg-brand-navy">
        <Image
          src={productsHero}
          alt="Glowing dashboard and phone screens above a city skyline at night"
          fill
          priority
          sizes="100vw"
          className="-z-10 object-cover object-[75%_center]"
        />
        {/* Navy shade behind the text on the left and the navbar on top, so
            both stay readable over the picture. */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-brand-navy/85 via-brand-navy/50 to-transparent to-75%" />
        <div className="absolute inset-x-0 top-0 -z-10 h-40 bg-gradient-to-b from-brand-navy/70 to-transparent" />

        <div className="mx-auto flex w-full max-w-7xl flex-col items-start px-6 py-24 text-left sm:px-10">
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-brand-sky">
            Our Products
          </p>
          <h1 className="max-w-3xl text-balance text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
            Our expertise.
            <br />
            <span className="text-brand-ice">Built into products.</span>
          </h1>
        </div>
      </section>

      <section id="our-portfolio" className="w-full bg-white py-16 sm:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 sm:px-10 md:grid-cols-[1.1fr_1fr] md:gap-16">
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-brand-blue">
              Our Product Portfolio
            </p>
            <h2 className="text-3xl font-semibold leading-tight text-brand-navy sm:text-4xl lg:text-5xl">
              Practical solutions.
              <br />
              Thoughtfully built.
            </h2>
            <p className="mt-6 text-base leading-relaxed text-brand-slate sm:text-lg">
              Explore products that bring Rizviz’s expertise in software, AI,
              and data into everyday use—helping businesses manage operations,
              connect information, and simplify complex tasks.
            </p>
          </div>

          {/* The frame clips the image so it can zoom slightly on hover. */}
          <div className="group overflow-hidden rounded-3xl shadow-xl ring-1 ring-brand-navy/10">
            <Image
              src={portfolio}
              alt="Glass dashboard, phone and chart icons showing business data"
              sizes="(min-width: 768px) 45vw, 100vw"
              className="h-auto w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
          </div>
        </div>
      </section>

      <ProductCards />
    </main>
  );
}
