import { Suspense } from "react";
import ApplyForm from "./ApplyForm";

export default function ApplySection() {
  return (
    <section
      id="apply"
      className="relative w-full pb-24 pt-12 sm:pb-32 sm:pt-16"
    >
      <div className="mx-auto grid max-w-7xl items-start gap-10 px-6 sm:px-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)] lg:gap-16">
        {/* The heading stays in view on the left while the form is filled in. */}
        <div className="text-left lg:sticky lg:top-28">
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-brand-ice">
            Apply
          </p>
          <h2 className="text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-5xl">
            Send us your <span className="text-brand-ice">application.</span>
          </h2>
        </div>

        <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-[#12304a]/95 to-[#0b1d2d]/95 p-5 shadow-[0_30px_70px_-30px_rgba(50,159,224,0.6)] sm:p-6">
          <Suspense>
            <ApplyForm />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
