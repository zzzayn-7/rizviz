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
          <h2 className="text-5xl font-extrabold leading-none tracking-tight text-brand-navy sm:text-6xl lg:text-7xl">
            Apply
          </h2>
          <p className="mt-8 text-base leading-relaxed text-brand-navy/80 sm:text-lg">
            Send us your application and we will be in touch.
          </p>
        </div>

        <div className="rounded-3xl border border-brand-navy/15 bg-white/[0.12] p-5 shadow-[0_20px_50px_-30px_rgba(11,29,45,0.35)] backdrop-blur-md sm:p-8">
          <Suspense>
            <ApplyForm />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
