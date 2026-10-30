"use client";

import Image from "next/image";
import { placeholders, products } from "./productsData";

export default function ProductCards() {
  return (
    <section
      id="portfolio"
      className="relative w-full pb-28 pt-20 sm:pb-40 sm:pt-28"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <ul className="grid gap-8 lg:grid-cols-2">
          {products.map((product, i) => {
            const name = product.name ?? placeholders.name;
            const empty = {
              name: !product.name,
              description: !product.description,
            };
            const muted = "text-brand-ice/40";

            return (
              <li key={i}>
                <article className="glass-navy flex h-full flex-col rounded-3xl p-5 transition duration-300 hover:-translate-y-1 sm:p-6">
                  {/* Large product screenshot */}
                  <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-[#E8F0F7] ring-1 ring-white/15">
                    {product.screenshot ? (
                      <Image
                        src={product.screenshot}
                        alt={product.screenshotAlt ?? `${name} screenshot`}
                        fill
                        sizes="(min-width: 1024px) 560px, 100vw"
                        className={
                          product.screenshotPortrait
                            ? "object-contain py-4"
                            : "object-cover object-top"
                        }
                      />
                    ) : (
                      <span className="absolute inset-0 flex items-center justify-center text-sm font-medium text-brand-ice/40">
                        Product screenshot
                      </span>
                    )}
                  </div>

                  {/* Product name */}
                  <div className="mt-6">
                    <h3
                      className={`text-2xl font-semibold ${
                        empty.name ? muted : "text-white"
                      }`}
                    >
                      {name}
                    </h3>
                  </div>

                  {/* What it does and who it helps */}
                  <p
                    className={`mt-4 text-base leading-relaxed ${
                      empty.description ? muted : "text-brand-ice/80"
                    }`}
                  >
                    {product.description ?? placeholders.description}
                  </p>

                  {/* Three short key features */}
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {(product.features ?? placeholders.features).map(
                      (feature) => (
                        <li
                          key={feature}
                          className={`rounded-full border border-brand-sky/40 bg-brand-sky/10 px-4 py-1.5 text-sm font-medium ${
                            product.features ? "text-brand-ice" : muted
                          }`}
                        >
                          {feature}
                        </li>
                      ),
                    )}
                  </ul>
                </article>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
