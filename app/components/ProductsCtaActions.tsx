"use client";

import { useState } from "react";
import ContactButton from "./ContactButton";
import DemoRequestDialog, { type Origin } from "./DemoRequestDialog";

// The two buttons that close the Products page: a demo request, with the
// product chosen in the form, and the site's contact form for a new idea.
export default function ProductsCtaActions() {
  const [origin, setOrigin] = useState<Origin | null>(null);

  return (
    <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
      <button
        type="button"
        onClick={(event) => {
          const rect = event.currentTarget.getBoundingClientRect();
          setOrigin({
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2,
          });
        }}
        className="inline-block rounded-full border-2 border-white bg-white px-8 py-3.5 font-semibold text-brand-navy transition-colors duration-500 ease-in-out hover:bg-transparent hover:text-white"
      >
        Request a Demo
      </button>
      <ContactButton className="inline-block rounded-full border-2 border-white px-8 py-3.5 font-semibold text-white transition-colors duration-500 ease-in-out hover:bg-white hover:text-brand-navy">
        Discuss Your Idea
      </ContactButton>

      {origin && (
        <DemoRequestDialog origin={origin} onClose={() => setOrigin(null)} />
      )}
    </div>
  );
}
