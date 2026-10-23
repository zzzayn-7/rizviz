"use client";

import { useState, type FormEvent } from "react";
import PopDialog, { PopDialogClose, type Origin } from "./PopDialog";
import Dropdown from "./Dropdown";
import { submitForm } from "./submitForm";

const inputClass =
  "h-12 w-full rounded-xl border border-[#D3DFE9] bg-white px-4 text-sm text-brand-navy outline-none transition-colors duration-300 placeholder:text-brand-slate/60 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20";

const labelClass = "block text-sm font-medium text-brand-navy";

// Placeholder choices: replace with the real departments.
const DEPARTMENTS = [
  "Sales & Business Development",
  "Careers",
  "Partnerships",
  "General Inquiries",
];

function Field({
  label,
  name,
  placeholder,
  type = "text",
  required,
  className,
}: {
  label: string;
  name: string;
  placeholder: string;
  type?: string;
  required?: boolean;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={`contact-${name}`} className={labelClass}>
        {label}
        {required && <span className="text-brand-blue"> *</span>}
      </label>
      <input
        id={`contact-${name}`}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className={`${inputClass} mt-1.5`}
      />
    </div>
  );
}

// The site-wide contact form. It opens from any "Contact" button, growing out
// of that button, and shrinks back into it when closed.
export default function ContactDialog({
  origin,
  onClose,
}: {
  origin: Origin;
  onClose: () => void;
}) {
  const [status, setStatus] = useState<"idle" | "sending" | "leaving" | "sent">(
    "idle",
  );
  const [department, setDepartment] = useState("");
  const [error, setError] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setStatus("sending");
    const failure = await submitForm(
      "contact",
      new FormData(event.currentTarget),
    );
    if (failure) {
      setError(failure);
      setStatus("idle");
      return;
    }
    // The form fades away before the confirmation takes its place.
    setStatus("leaving");
    await new Promise((resolve) => setTimeout(resolve, 250));
    setStatus("sent");
  }

  return (
    <PopDialog
      origin={origin}
      onClose={onClose}
      labelledBy="contact-title"
      width="40rem"
    >
      {status === "sent" ? (
        <div className="py-8 text-center">
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
            id="contact-title"
            style={{ animationDelay: "0.45s" }}
            className="animate-fade-up mt-6 text-2xl font-semibold text-brand-navy sm:text-3xl"
          >
            Your message is received.
          </h2>
          <p
            style={{ animationDelay: "0.6s" }}
            className="animate-fade-up mx-auto mt-4 max-w-sm text-base leading-relaxed text-brand-slate"
          >
            Our team will get back to you shortly.
          </p>
          <PopDialogClose
            style={{ animationDelay: "0.75s" }}
            className="animate-fade-up mt-8 rounded-full border-2 border-brand-blue bg-brand-blue px-8 py-2.5 text-sm font-semibold text-white transition-colors duration-500 ease-in-out hover:bg-transparent hover:text-brand-blue"
          >
            Close
          </PopDialogClose>
        </div>
      ) : (
        <form
          onSubmit={onSubmit}
          className={`grid gap-5 transition-opacity duration-300 sm:grid-cols-2 ${
            status === "leaving" ? "opacity-0" : "opacity-100"
          }`}
        >
          <div className="pr-12 sm:col-span-2">
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-brand-blue">
              Contact Us
            </p>
            <h2
              id="contact-title"
              className="text-2xl font-semibold text-brand-navy sm:text-3xl"
            >
              Let’s discuss your next step.
            </h2>
          </div>

          <Field
            label="First name"
            name="firstName"
            placeholder="Enter your first name"
            required
          />
          <Field
            label="Last name"
            name="lastName"
            placeholder="Enter your last name"
            required
          />
          <Field
            label="Email"
            name="email"
            type="email"
            placeholder="Enter a valid company email"
            required
          />
          <Field
            label="Company name"
            name="company"
            placeholder="Enter the name of your company"
          />
          <Field
            label="Phone number"
            name="phone"
            type="tel"
            placeholder="Enter a valid phone number with appropriate country code"
            required
            className="sm:col-span-2"
          />
          <Field
            label="Country/Region"
            name="country"
            placeholder="Enter your country of residence"
            required
            className="sm:col-span-2"
          />

          <div className="sm:col-span-2">
            <label htmlFor="contact-department" className={labelClass}>
              Which department would you like to connect with?
              <span className="text-brand-blue"> *</span>
            </label>
            <div className="mt-1.5">
              <Dropdown
                id="contact-department"
                name="department"
                options={DEPARTMENTS}
                value={department}
                onChange={setDepartment}
                placeholder="Please Select"
                required
                tone="light"
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="contact-message" className={labelClass}>
              Message
            </label>
            <textarea
              id="contact-message"
              name="message"
              rows={5}
              placeholder="Please enter your query in detail"
              className={`${inputClass} mt-1.5 h-auto resize-y py-3`}
            />
          </div>

          {error && (
            <p
              role="alert"
              className="text-sm font-medium text-red-600 sm:col-span-2"
            >
              {error}
            </p>
          )}

          <div className="sm:col-span-2">
            <button
              type="submit"
              disabled={status !== "idle"}
              className="h-12 w-full rounded-full border-2 border-brand-blue bg-brand-blue px-8 font-semibold text-white transition-colors duration-500 ease-in-out hover:bg-transparent hover:text-brand-blue disabled:opacity-60"
            >
              {status === "idle" ? "Submit" : "Submitting…"}
            </button>
          </div>
        </form>
      )}
    </PopDialog>
  );
}
