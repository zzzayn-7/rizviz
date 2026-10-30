import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import ContactCta from "../components/ContactCta";
import ProductCards from "../components/ProductCards";
import ProductsCtaActions from "../components/ProductsCtaActions";
import Image from "next/image";
import heroSkyline from "../images/hero-skyline.png";

export const metadata: Metadata = {
  title: "Products | Rizviz",
};

export default function ProductsPage() {
  return (
    <main className="relative">
      <Navbar tone="dark" />
      <div className="relative overflow-x-clip bg-brand-navy">
        <section className="relative isolate flex min-h-screen w-full items-center overflow-hidden bg-brand-navy">
          {/* The night skyline, drawn closer than on the home page so the towers rise higher and the
              water takes less of the frame. */}
          <Image
            src={heroSkyline}
            alt=""
            fill
            priority
            sizes="100vw"
            className="-z-10 origin-bottom scale-125 object-cover object-bottom"
          />
          {/* A soft dark wash behind the words keeps them easy to read. */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10"
            style={{
              background: [
                "radial-gradient(55% 55% at 50% 46%, rgba(5,10,18,0.6), transparent 72%)",
                "radial-gradient(700px 600px at 100% 30%, rgba(50,159,224,0.2), transparent 70%)",
                "radial-gradient(800px 700px at 0% 85%, rgba(112,199,244,0.16), transparent 70%)",
              ].join(", "),
            }}
          />

          <div className="relative mx-auto flex w-full max-w-4xl flex-col items-center px-6 pb-32 pt-32 text-center sm:px-10 lg:pb-40">
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-brand-ice">
              Our Products
            </p>
            <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
              Our expertise.
              <br />
              <span className="text-brand-ice">Built into products.</span>
            </h1>
          </div>
        </section>

        {/* Everything below the hero shares the ice-blue white page, with navy glowing in from
            alternating sides and fading to navy at the bottom where the call to action begins. */}
        <div className="relative z-[2]">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background: [
                "linear-gradient(0deg, #0b1d2d 0px, transparent 200px)",
                "radial-gradient(800px 700px at 0% 12%, rgba(11,29,45,0.2), transparent 70%)",
                "radial-gradient(800px 700px at 100% 40%, rgba(11,29,45,0.2), transparent 70%)",
                "radial-gradient(800px 700px at 0% 68%, rgba(11,29,45,0.2), transparent 70%)",
                "radial-gradient(800px 700px at 100% 92%, rgba(11,29,45,0.2), transparent 70%)",
                "linear-gradient(180deg, #f4faff 0%, #e4f2fc 50%, #f4faff 100%)",
              ].join(", "),
            }}
          />
          <ProductCards />
        </div>
      </div>
      <ContactCta
        headline={
          <>
            Explore our products.{" "}
            <span className="text-brand-ice">Build your next idea.</span>
          </>
        }
        body="See an existing product in action or talk to our team about developing something new."
        actions={<ProductsCtaActions />}
      />
    </main>
  );
}
