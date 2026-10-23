"use client";

import { useEffect, useId, useRef, useState } from "react";

// A drop-down that replaces the browser's own list, so it can match the form
// it sits in. The list opens with a soft fade and rise; the option under the
// pointer keeps the list's colour and is picked out by a bright outline, and
// the chosen one carries a tick.
//
// It still takes part in the form: a hidden input carries the value under
// `name`, and with `required` it stops the form from being sent while empty.
const tones = {
  dark: {
    button:
      "h-10 rounded-lg border border-white/15 bg-white/[0.06] px-4 text-sm text-white focus-visible:border-brand-sky focus-visible:ring-2 focus-visible:ring-brand-sky/25 data-[open=true]:border-brand-sky",
    placeholder: "text-brand-ice/40",
    chevron: "text-brand-ice/70",
    panel:
      "border border-white/15 bg-[#0e2336] shadow-[0_24px_60px_-12px_rgba(0,0,0,0.65),0_0_40px_-10px_rgba(50,159,224,0.35)]",
    option:
      "text-white/90 hover:text-white ring-transparent hover:ring-brand-sky data-[active=true]:ring-brand-sky",
    selected: "text-brand-sky",
    tick: "text-brand-sky",
  },
  light: {
    button:
      "h-11 rounded-lg border border-[#D3DFE9] bg-white px-4 text-sm text-brand-navy focus-visible:border-brand-blue focus-visible:ring-2 focus-visible:ring-brand-blue/20 data-[open=true]:border-brand-blue",
    placeholder: "text-brand-slate/60",
    chevron: "text-brand-slate",
    panel:
      "border border-[#D3DFE9] bg-white shadow-[0_24px_60px_-16px_rgba(11,29,45,0.35)]",
    option:
      "text-brand-navy ring-transparent hover:ring-brand-blue data-[active=true]:ring-brand-blue",
    selected: "text-brand-blue",
    tick: "text-brand-blue",
  },
} as const;

export default function Dropdown({
  id,
  name,
  options,
  value,
  onChange,
  placeholder,
  required,
  tone = "dark",
}: {
  id?: string;
  name: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  required?: boolean;
  tone?: keyof typeof tones;
}) {
  const t = tones[tone];
  const auto = useId();
  const listId = `${id ?? auto}-list`;
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const root = useRef<HTMLDivElement>(null);
  const list = useRef<HTMLUListElement>(null);

  // Close when the pointer or focus goes elsewhere.
  useEffect(() => {
    if (!open) return;
    const away = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", away);
    return () => document.removeEventListener("pointerdown", away);
  }, [open]);

  // Keep the option the keyboard is on in view.
  useEffect(() => {
    if (!open || active < 0) return;
    list.current?.children[active]?.scrollIntoView({ block: "nearest" });
  }, [active, open]);

  const show = () => {
    setActive(Math.max(0, options.indexOf(value)));
    setOpen(true);
  };
  const choose = (option: string) => {
    onChange(option);
    setOpen(false);
  };

  return (
    <div ref={root} className="relative">
      {/* Carries the value into the form, and makes "required" work. */}
      <input
        name={name}
        value={value}
        required={required}
        tabIndex={-1}
        aria-hidden
        readOnly
        className="pointer-events-none absolute inset-0 h-full w-full opacity-0"
      />
      <button
        id={id}
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        data-open={open}
        onClick={() => (open ? setOpen(false) : show())}
        onKeyDown={(e) => {
          if (e.key === "Escape") setOpen(false);
          else if (e.key === "ArrowDown" || e.key === "ArrowUp") {
            e.preventDefault();
            if (!open) return show();
            setActive((i) =>
              e.key === "ArrowDown"
                ? Math.min(options.length - 1, i + 1)
                : Math.max(0, i - 1),
            );
          } else if ((e.key === "Enter" || e.key === " ") && open) {
            e.preventDefault();
            if (active >= 0) choose(options[active]);
          }
        }}
        className={`flex w-full items-center justify-between gap-3 text-left outline-none transition-[border-color,box-shadow] duration-300 ${t.button}`}
      >
        <span className={`truncate ${value ? "" : t.placeholder}`}>
          {value || placeholder}
        </span>
        <svg
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
          className={`h-4 w-4 shrink-0 transition-transform duration-300 ${t.chevron} ${open ? "rotate-180" : ""}`}
        >
          <path d="m5 7.5 5 5 5-5" />
        </svg>
      </button>

      <ul
        ref={list}
        id={listId}
        role="listbox"
        aria-hidden={!open}
        className={`absolute inset-x-0 top-full z-30 mt-2 max-h-64 origin-top overflow-y-auto rounded-xl p-1.5 transition-all duration-200 ease-out ${t.panel} ${
          open
            ? "translate-y-0 scale-100 opacity-100"
            : "pointer-events-none -translate-y-1 scale-[0.97] opacity-0"
        }`}
      >
        {options.map((option, i) => {
          const chosen = option === value;
          return (
            <li
              key={option}
              role="option"
              aria-selected={chosen}
              data-active={i === active}
              onPointerEnter={() => setActive(i)}
              onClick={() => choose(option)}
              className={`flex cursor-pointer items-center justify-between gap-3 rounded-lg px-3.5 py-2.5 text-sm font-medium ring-1 transition-[box-shadow,color] duration-200 ${t.option} ${
                chosen ? t.selected : ""
              }`}
            >
              {option}
              <svg
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
                className={`h-4 w-4 shrink-0 transition-opacity duration-200 ${t.tick} ${chosen ? "opacity-100" : "opacity-0"}`}
              >
                <path d="m4.5 10.5 3.5 3.5 7.5-8" />
              </svg>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
