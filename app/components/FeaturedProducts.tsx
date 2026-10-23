import Link from "next/link";
import RobotProjector from "./RobotProjector";
import { products } from "./productsData";

// The three products featured on the home page, in this order.
const featured = ["Intellotrade", "SkinClin", "GetInsuredAI"]
  .map((name) => products.find((p) => p.name === name))
  .filter((p) => p !== undefined);

// The home page's product section: the heading and headline on the left, the
// description on the right, and the cycling product card below.
export default function FeaturedProducts() {
  return (
    <section id="products" className="relative w-full py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <div className="grid gap-6 md:grid-cols-2 md:gap-16">
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-brand-sky">
              Featured Products
            </p>
            <h2 className="text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-5xl">
              Our expertise,
              <br />
              <span className="text-brand-ice">put to work.</span>
            </h2>
          </div>

          <div className="md:pt-9">
            <p className="text-base leading-relaxed text-brand-ice/80 sm:text-lg">
              Explore products built by Rizviz to address real business needs.
              Our engineers, developers, and AI specialists combine technical
              expertise with thoughtful design to turn complex requirements into
              practical, intuitive applications.
            </p>
            <Link
              href="/products"
              className="mt-8 inline-block rounded-full border-2 border-brand-blue bg-brand-blue px-8 py-3.5 font-semibold text-white transition-colors duration-500 ease-in-out hover:bg-transparent"
            >
              View more
            </Link>
          </div>
        </div>

        <div className="mt-12 sm:mt-16">
          <RobotProjector items={featured} />
        </div>
      </div>
    </section>
  );
}
