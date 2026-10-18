"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";

const inputClass =
  "w-full rounded-lg border border-[#D3DFE9] bg-white px-4 text-sm text-brand-navy outline-none transition-colors duration-300 placeholder:text-brand-slate/60 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20";

const labelClass = "block text-sm font-medium text-brand-navy";

const OPEN_MS = 480;
const CLOSE_MS = 300;

// Where the button that opened the form is on screen (viewport coordinates).
export type Origin = { x: number; y: number };

// A pop-up form for requesting a demo of one product. Mount it when a product
// is chosen; it grows out of the button that was clicked, and calls `onClose`
// once it has shrunk back into it.
export default function DemoRequestDialog({
  product,
  origin,
  onClose,
}: {
  product: string;
  origin: Origin;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closing = useRef(false);
  const [status, setStatus] = useState<"idle" | "sending" | "leaving" | "sent">(
    "idle",
  );

  // How far the dialog's center is from the button, so it can start from
  // (and return to) the button's position.
  function offsetFromOrigin() {
    const rect = dialogRef.current!.getBoundingClientRect();
    return {
      x: origin.x - (rect.left + rect.width / 2),
      y: origin.y - (rect.top + rect.height / 2),
    };
  }

  const reducedMotion = () =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // A native dialog gives Esc, focus handling and the backdrop; the page
  // behind it is kept from scrolling while it is open.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (!dialog.open) dialog.showModal();
    document.body.style.overflow = "hidden";

    if (!reducedMotion()) {
      const { x, y } = offsetFromOrigin();
      dialog.animate(
        [
          { transform: `translate(${x}px, ${y}px) scale(0.12)`, opacity: 0 },
          { transform: "none", opacity: 1 },
        ],
        { duration: OPEN_MS, easing: "cubic-bezier(0.22, 1, 0.36, 1)" },
      );
      dialog.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: OPEN_MS,
        pseudoElement: "::backdrop",
      });
    }
    return () => {
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Shrinks back into the button, then closes for real.
  function requestClose() {
    const dialog = dialogRef.current;
    if (!dialog || closing.current) return;
    closing.current = true;
    if (reducedMotion()) {
      dialog.close();
      return;
    }
    const { x, y } = offsetFromOrigin();
    const shrink = dialog.animate(
      [
        { transform: "none", opacity: 1 },
        { transform: `translate(${x}px, ${y}px) scale(0.12)`, opacity: 0 },
      ],
      { duration: CLOSE_MS, easing: "ease-in", fill: "forwards" },
    );
    dialog.animate([{ opacity: 1 }, { opacity: 0 }], {
      duration: CLOSE_MS,
      fill: "forwards",
      pseudoElement: "::backdrop",
    });
    shrink.finished.then(
      () => dialog.close(),
      () => dialog.close(),
    );
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    // TODO: send `new FormData(event.currentTarget)` to the sales inbox or CRM.
    // Nothing is delivered anywhere yet.
    await new Promise((resolve) => setTimeout(resolve, 600));
    // The form fades away before the confirmation takes its place.
    setStatus("leaving");
    await new Promise((resolve) =>
      setTimeout(resolve, reducedMotion() ? 0 : 250),
    );
    setStatus("sent");
  }

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onCancel={(e) => {
        // Esc: shrink back instead of vanishing.
        e.preventDefault();
        requestClose();
      }}
      onClick={(e) => {
        if (e.target === dialogRef.current) requestClose();
      }}
      aria-labelledby="demo-title"
      className="m-auto max-h-[calc(100%-2rem)] w-[min(34rem,calc(100%-2rem))] overflow-y-auto rounded-2xl bg-white p-0 shadow-2xl backdrop:bg-brand-navy/60 backdrop:backdrop-blur-sm"
    >
      <div className="relative p-6 sm:p-10">
        <button
          type="button"
          onClick={requestClose}
          aria-label="Close"
          className="absolute right-4 top-4 z-10 rounded-full border border-[#D3DFE9] px-3 py-1.5 text-brand-slate transition-colors hover:border-brand-sky hover:text-brand-navy sm:right-6 sm:top-6"
        >
          ✕
        </button>

        {status === "sent" ? (
          <div className="py-6 text-center">
            <span className="animate-pop-in mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-blue/10 text-brand-blue">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
                className="h-9 w-9"
              >
                <path
                  d="M5 12.5l4.5 4.5L19 7.5"
                  strokeDasharray={26}
                  className="animate-tick"
                />
              </svg>
            </span>
            <h2
              id="demo-title"
              style={{ animationDelay: "0.45s" }}
              className="animate-fade-up mt-6 text-2xl font-semibold text-brand-navy sm:text-3xl"
            >
              Your demo request is received.
            </h2>
            <p
              style={{ animationDelay: "0.6s" }}
              className="animate-fade-up mx-auto mt-4 max-w-sm text-base leading-relaxed text-brand-slate"
            >
              Our team will contact you to learn about your requirements and
              arrange a walkthrough.
            </p>
            <button
              type="button"
              onClick={requestClose}
              style={{ animationDelay: "0.75s" }}
              className="animate-fade-up mt-8 rounded-full border-2 border-brand-blue bg-brand-blue px-8 py-2.5 text-sm font-semibold text-white transition-colors duration-500 ease-in-out hover:bg-transparent hover:text-brand-blue"
            >
              Close
            </button>
          </div>
        ) : (
          <form
            onSubmit={onSubmit}
            className={`grid gap-5 transition-opacity duration-300 ${
              status === "leaving" ? "opacity-0" : "opacity-100"
            }`}
          >
            <div className="pr-12">
              <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-brand-blue">
                Request a demo
              </p>
              <h2
                id="demo-title"
                className="text-2xl font-semibold text-brand-navy sm:text-3xl"
              >
                {product}
              </h2>
            </div>

            <input type="hidden" name="product" value={product} />

            <div>
              <label htmlFor="demo-name" className={labelClass}>
                Name<span className="text-brand-blue"> *</span>
              </label>
              <input
                id="demo-name"
                name="name"
                required
                placeholder="e.g. Alex Johnson"
                className={`${inputClass} mt-1.5 h-11`}
              />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="demo-phone" className={labelClass}>
                  Phone number
                </label>
                <input
                  id="demo-phone"
                  name="phone"
                  type="tel"
                  placeholder="+92 300 0000000"
                  className={`${inputClass} mt-1.5 h-11`}
                />
              </div>
              <div>
                <label htmlFor="demo-email" className={labelClass}>
                  Email<span className="text-brand-blue"> *</span>
                </label>
                <input
                  id="demo-email"
                  name="email"
                  type="email"
                  required
                  placeholder="alex@example.com"
                  className={`${inputClass} mt-1.5 h-11`}
                />
              </div>
            </div>

            <div>
              <label htmlFor="demo-info" className={labelClass}>
                Additional information
              </label>
              <textarea
                id="demo-info"
                name="info"
                rows={4}
                placeholder="Tell us about your business and what you would like to see in the demo…"
                className={`${inputClass} mt-1.5 resize-y py-3`}
              />
            </div>

            <button
              type="submit"
              disabled={status !== "idle"}
              className="mt-2 w-full rounded-full border-2 border-brand-blue bg-brand-blue px-8 py-3 font-semibold text-white transition-colors duration-500 ease-in-out hover:bg-transparent hover:text-brand-blue disabled:opacity-60"
            >
              {status === "idle" ? "Submit" : "Submitting…"}
            </button>
          </form>
        )}
      </div>
    </dialog>
  );
}
