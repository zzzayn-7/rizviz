import { Suspense } from "react";
import ApplyForm from "./ApplyForm";

export default function ApplySection() {
  return (
    <section id="apply" className="w-full bg-[#F2F8FC] py-16 sm:py-20">
      <div className="mx-auto max-w-2xl px-6 sm:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-brand-blue">
            Apply
          </p>
          <h2 className="text-2xl font-semibold leading-tight text-brand-navy sm:text-3xl lg:text-4xl">
            Send us your application.
          </h2>
        </div>

        <div className="mt-8 rounded-2xl border border-[#D3DFE9] bg-white p-5 shadow-lg sm:mt-10 sm:p-8">
          <Suspense>
            <ApplyForm />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
