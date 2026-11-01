"use client";

import { useState, type FormEvent } from "react";
import { submitForm } from "./submitForm";

// The newsletter sign-up in the footer: one email field and a button. The address is sent to the
// info inbox like the site's other forms.
export default function NewsletterForm({ tone }: { tone: "light" | "dark" }) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState("");
  const light = tone === "light";

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setError("");
    setStatus("sending");
    const failure = await submitForm("newsletter", new FormData(form));
    if (failure) {
      setError(failure);
      setStatus("idle");
      return;
    }
    form.reset();
    setStatus("sent");
  }

  if (status === "sent") {
    return (
      <p
        role="status"
        className={`mt-5 text-sm font-medium leading-relaxed ${light ? "text-brand-navy" : "text-white"}`}
      >
        Thank you for subscribing.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="mt-5">
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <input
        id="newsletter-email"
        name="email"
        type="email"
        required
        placeholder="Your email address"
        className={`h-11 w-full rounded-xl border bg-transparent px-4 text-sm outline-none transition-colors duration-300 ${
          light
            ? "border-brand-navy/25 text-brand-navy placeholder:text-brand-navy/50 hover:border-brand-navy/50 focus:border-brand-navy focus:ring-2 focus:ring-brand-navy/15"
            : "border-white/25 text-white placeholder:text-brand-ice/50 hover:border-white/50 focus:border-brand-sky focus:ring-2 focus:ring-brand-sky/25"
        }`}
      />
      {error && (
        <p role="alert" className={`mt-2 text-xs font-medium ${light ? "text-red-600" : "text-red-300"}`}>
          {error}
        </p>
      )}
      <button
        type="submit"
        disabled={status === "sending"}
        className="glass-navy btn-glow mt-3 inline-block rounded-full px-7 py-2.5 text-sm font-semibold text-white disabled:opacity-60"
      >
        {status === "sending" ? "Subscribing…" : "Subscribe"}
      </button>
    </form>
  );
}
