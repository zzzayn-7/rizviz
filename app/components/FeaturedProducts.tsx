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
        <div className="grid gap-8 md:grid-cols-2 md:gap-16">
          {/* the heading on the left, with the button right under it */}
          <div>
            <h2 className="text-4xl font-medium leading-[1.08] tracking-tight text-brand-navy shine-heading sm:text-5xl lg:text-6xl">
              Featured Products
            </h2>
            <Link
              href="/products"
              className="glass-navy btn-glow mt-8 inline-block rounded-full px-8 py-3.5 font-semibold text-white"
            >
              View more
            </Link>
          </div>

          {/* the paragraph on the right */}
          <div className="md:pt-3">
            <p className="text-base leading-relaxed text-brand-navy/80 sm:text-lg">
              Explore products built by Rizviz to address real business needs.
              Our engineers, developers, and AI specialists combine technical
              expertise with thoughtful design to turn complex requirements into
              practical, intuitive applications.
            </p>
          </div>
        </div>

        <div className="mt-12 sm:mt-16">
          <RobotProjector items={featured} />
        </div>
      </div>
    </section>
  );
}
