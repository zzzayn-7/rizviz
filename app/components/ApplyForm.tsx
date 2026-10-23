"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";
import Dropdown from "./Dropdown";
import { submitForm } from "./submitForm";

const MAX_CV_BYTES = 5 * 1024 * 1024;

// Fired by the "Apply now" buttons on the job cards.
export const APPLY_EVENT = "apply-for-role";
export type ApplyDetail = { role: string; gender?: string; roleType?: string };

const inputClass =
  "h-10 w-full rounded-lg border border-white/15 bg-white/[0.06] px-4 text-sm text-white outline-none transition-colors duration-300 placeholder:text-brand-ice/40 focus:border-brand-sky focus:ring-2 focus:ring-brand-sky/25 [color-scheme:dark]";

function Field({
  label,
  name,
  placeholder,
  type = "text",
  required,
  value,
  onChange,
  wide,
}: {
  label: string;
  name: string;
  placeholder: string;
  type?: string;
  required?: boolean;
  value?: string;
  onChange?: (value: string) => void;
  wide?: boolean;
}) {
  return (
    <div className={wide ? "sm:col-span-2" : undefined}>
      <label
        htmlFor={name}
        className="block text-sm font-medium text-brand-ice"
      >
        {label}
        {required && <span className="text-brand-sky"> *</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        value={value}
        onChange={onChange && ((e) => onChange(e.target.value))}
        placeholder={placeholder}
        className={`${inputClass} mt-1.5`}
      />
    </div>
  );
}

function Select({
  label,
  name,
  placeholder,
  options,
  value,
  onChange,
}: {
  label: string;
  name: string;
  placeholder: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-sm font-medium text-brand-ice"
      >
        {label}
      </label>
      <div className="mt-1.5">
        <Dropdown
          id={name}
          name={name}
          options={options}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      </div>
    </div>
  );
}

const GENDERS = ["Male", "Female"];

export default function ApplyForm() {
  const roleParam = useSearchParams().get("role") ?? "";
  const [desiredRole, setDesiredRole] = useState(roleParam);
  const [gender, setGender] = useState("");
  const [roleType, setRoleType] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState("");
  const [fileName, setFileName] = useState("");

  useEffect(() => {
    const onApply = (event: Event) => {
      const { role, gender, roleType } = (event as CustomEvent<ApplyDetail>)
        .detail;
      setDesiredRole(role);
      if (gender) setGender(gender);
      if (roleType) setRoleType(roleType);
      setStatus("idle");
    };
    window.addEventListener(APPLY_EVENT, onApply);
    return () => window.removeEventListener(APPLY_EVENT, onApply);
  }, []);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    const cv = data.get("cv");
    if (cv instanceof File && cv.size > MAX_CV_BYTES) {
      setError("Please upload a CV smaller than 5 MB.");
      return;
    }

    setError("");
    setStatus("sending");
    const failure = await submitForm("application", data);
    if (failure) {
      setError(failure);
      setStatus("idle");
      return;
    }
    setStatus("sent");
    form.reset();
    setFileName("");
    setDesiredRole("");
    setGender("");
    setRoleType("");
  }

  if (status === "sent") {
    return (
      <div className="py-10 text-center">
        <h2 className="text-2xl font-semibold text-white sm:text-3xl">
          Thank you for applying.
        </h2>
        <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-brand-ice/80">
          We’ve received your application and our team will be in touch.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-8 font-medium text-brand-sky transition-colors duration-300 hover:text-white"
        >
          Submit another application
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-x-4 gap-y-3.5 sm:grid-cols-2">
      <Field
        label="Full name"
        name="fullName"
        placeholder="e.g. Alex Johnson"
        required
      />
      <Field
        label="Email address"
        name="email"
        type="email"
        placeholder="alex@example.com"
        required
      />
      <Field
        label="Phone number"
        name="phone"
        type="tel"
        placeholder="+92 300 0000000"
      />
      <Select
        label="Gender"
        name="gender"
        placeholder="Select your gender"
        options={GENDERS}
        value={gender}
        onChange={setGender}
      />
      <Field
        label="Current job title"
        name="currentTitle"
        placeholder="e.g. Software Engineer"
      />
      <Field
        label="Desired role"
        name="desiredRole"
        placeholder="e.g. Senior Backend Engineer"
        value={desiredRole}
        onChange={setDesiredRole}
      />
      <Field
        label="Role type"
        name="roleType"
        placeholder="Onsite, Remote or Hybrid"
        value={roleType}
        onChange={setRoleType}
        wide
      />

      <div className="sm:col-span-2">
        <label
          htmlFor="cv"
          className="block text-sm font-medium text-brand-ice"
        >
          CV upload<span className="text-brand-sky"> *</span>
        </label>
        {/* The real input is visually hidden so the box can be laid out by
            hand: the button and file name line up with the other fields. */}
        <div
          className={`${inputClass} relative mt-1.5 flex items-center gap-3 px-2 focus-within:border-brand-blue focus-within:ring-2 focus-within:ring-brand-blue/20`}
        >
          <input
            id="cv"
            name="cv"
            type="file"
            required
            accept=".pdf,.doc,.docx"
            onChange={(e) => setFileName(e.target.files?.[0]?.name ?? "")}
            className="peer absolute inset-0 h-full w-full cursor-pointer opacity-0"
          />
          <span className="pointer-events-none rounded-full border border-white/30 px-4 py-1 text-xs font-semibold text-brand-ice transition-colors peer-hover:border-brand-sky peer-hover:text-white">
            Choose File
          </span>
          <span
            className={`pointer-events-none min-w-0 truncate ${
              fileName ? "text-white" : "text-brand-ice/40"
            }`}
          >
            {fileName || "No file chosen"}
          </span>
        </div>
        <p className="mt-1 text-xs text-brand-ice/60">
          PDF or Word, up to 5 MB.
        </p>
      </div>

      <div className="sm:col-span-2">
        <label
          htmlFor="info"
          className="block text-sm font-medium text-brand-ice"
        >
          Additional information
        </label>
        <textarea
          id="info"
          name="info"
          rows={2}
          placeholder="Tell us more about your career goals, salary expectations, or availability…"
          className={`${inputClass} mt-1.5 h-auto resize-y py-2`}
        />
      </div>

      <div className="sm:col-span-2">
        {error && (
          <p role="alert" className="mb-4 text-sm font-medium text-red-300">
            {error}
          </p>
        )}
        <button
          type="submit"
          disabled={status === "sending"}
          className="rounded-full border-2 border-brand-blue bg-brand-blue px-8 py-2.5 text-sm font-semibold text-white transition-colors duration-500 ease-in-out hover:bg-transparent disabled:opacity-60"
        >
          {status === "sending" ? "Sending…" : "Submit Application"}
        </button>
      </div>
    </form>
  );
}
