"use client";

import Image from "next/image";
import { useState } from "react";
import DemoRequestDialog, { type Origin } from "./DemoRequestDialog";
import { placeholders, products } from "./productsData";

export default function ProductCards() {
  // The product whose demo request form is open, if any.
  // and where its button is, so the form can grow out of it.
  const [demoFor, setDemoFor] = useState<{
    product: string;
    origin: Origin;
  } | null>(null);

  return (
    <section
      id="portfolio"
      className="relative w-full pb-24 pt-8 sm:pb-32 sm:pt-12"
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
                <article className="flex h-full flex-col rounded-3xl border border-white/10 bg-gradient-to-br from-[#12304a]/95 to-[#0b1d2d]/95 p-5 shadow-[0_30px_70px_-30px_rgba(50,159,224,0.6)] transition-colors duration-300 hover:border-brand-sky/40 sm:p-6">
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

                  {/* Opens the demo request form for this product. The
                      wrapper pushes it to the bottom, so the buttons line up
                      across cards of different heights. */}
                  <div className="mt-auto pt-8">
                    <button
                      type="button"
                      onClick={(event) => {
                        const rect =
                          event.currentTarget.getBoundingClientRect();
                        setDemoFor({
                          product: name,
                          origin: {
                            x: rect.left + rect.width / 2,
                            y: rect.top + rect.height / 2,
                          },
                        });
                      }}
                      className="inline-block rounded-full border-2 border-brand-blue bg-brand-blue px-7 py-3 text-sm font-semibold text-white transition-colors duration-500 ease-in-out hover:bg-transparent"
                    >
                      Request a demo
                    </button>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      </div>

      {demoFor && (
        <DemoRequestDialog
          key={demoFor.product}
          product={demoFor.product}
          origin={demoFor.origin}
          onClose={() => setDemoFor(null)}
        />
      )}
    </section>
  );
}
