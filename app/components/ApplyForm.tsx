"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";

const MAX_CV_BYTES = 5 * 1024 * 1024;

// Fired by the "Apply now" buttons on the job cards.
export const APPLY_EVENT = "apply-for-role";
export type ApplyDetail = { role: string; gender?: string; roleType?: string };

const inputClass =
  "h-11 w-full rounded-lg border border-[#D3DFE9] bg-white px-4 text-sm text-brand-navy outline-none transition-colors duration-300 placeholder:text-brand-slate/60 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20";

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
        className="block text-sm font-medium text-brand-navy"
      >
        {label}
        {required && <span className="text-brand-blue"> *</span>}
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
        className="block text-sm font-medium text-brand-navy"
      >
        {label}
      </label>
      <div className="relative mt-1.5">
        <select
          id={name}
          name={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`${inputClass} appearance-none pr-10 [&:has(option[value='']:checked)]:text-brand-slate/60`}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <span
          aria-hidden
          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs text-brand-slate"
        >
          ▾
        </span>
      </div>
    </div>
  );
}

const GENDERS = ["Male", "Female"];
const LOCATIONS = [
  "Faisal Town, Lahore",
  "Johar Town, Lahore",
  "Jubilee Town, Lahore",
  "Bahria Town, Lahore",
];

export default function ApplyForm() {
  const roleParam = useSearchParams().get("role") ?? "";
  const [desiredRole, setDesiredRole] = useState(roleParam);
  const [gender, setGender] = useState("");
  const [roleType, setRoleType] = useState("");
  const [location, setLocation] = useState("");
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
    // TODO: send `data` to the hiring inbox or applicant system. Nothing is
    // delivered anywhere yet.
    await new Promise((resolve) => setTimeout(resolve, 600));
    setStatus("sent");
    form.reset();
    setFileName("");
    setDesiredRole("");
    setGender("");
    setRoleType("");
    setLocation("");
  }

  if (status === "sent") {
    return (
      <div className="py-10 text-center">
        <h2 className="text-2xl font-semibold text-brand-navy sm:text-3xl">
          Thank you for applying.
        </h2>
        <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-brand-slate">
          We’ve received your application and our team will be in touch.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-8 font-medium text-brand-blue transition-colors duration-300 hover:text-brand-navy"
        >
          Submit another application
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-x-6 gap-y-5 sm:grid-cols-2">
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
      <Select
        label="Preferred location"
        name="location"
        placeholder="Select a location"
        options={LOCATIONS}
        value={location}
        onChange={setLocation}
      />
      <Field
        label="Role type"
        name="roleType"
        placeholder="Onsite, Remote or Hybrid"
        value={roleType}
        onChange={setRoleType}
      />

      <div className="sm:col-span-2">
        <label
          htmlFor="cv"
          className="block text-sm font-medium text-brand-navy"
        >
          CV upload<span className="text-brand-blue"> *</span>
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
          <span className="pointer-events-none rounded-full border border-brand-slate/40 px-4 py-1 text-xs font-semibold text-brand-slate transition-colors peer-hover:border-brand-blue peer-hover:text-brand-blue">
            Choose File
          </span>
          <span
            className={`pointer-events-none min-w-0 truncate ${
              fileName ? "text-brand-navy" : "text-brand-slate/60"
            }`}
          >
            {fileName || "No file chosen"}
          </span>
        </div>
        <p className="mt-1.5 text-xs text-brand-slate">
          PDF or Word, up to 5 MB.
        </p>
      </div>

      <div className="sm:col-span-2">
        <label
          htmlFor="info"
          className="block text-sm font-medium text-brand-navy"
        >
          Additional information
        </label>
        <textarea
          id="info"
          name="info"
          rows={3}
          placeholder="Tell us more about your career goals, salary expectations, or availability…"
          className={`${inputClass} mt-1.5 h-auto resize-y py-3`}
        />
      </div>

      <div className="sm:col-span-2">
        {error && (
          <p role="alert" className="mb-4 text-sm font-medium text-red-600">
            {error}
          </p>
        )}
        <button
          type="submit"
          disabled={status === "sending"}
          className="rounded-full border-2 border-brand-blue bg-brand-blue px-8 py-2.5 text-sm font-semibold text-white transition-colors duration-500 ease-in-out hover:bg-transparent hover:text-brand-blue disabled:opacity-60"
        >
          {status === "sending" ? "Sending…" : "Submit Application"}
        </button>
      </div>
    </form>
  );
}
