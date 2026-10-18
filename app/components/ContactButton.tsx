"use client";

import type { ReactNode } from "react";
import type { Origin } from "./PopDialog";

// Fired by every "Contact" button; ContactDialogHost listens for it.
export const CONTACT_EVENT = "open-contact-form";

// A button that opens the site-wide contact form, which grows out of it.
export default function ContactButton({
  className,
  onClick,
  children,
}: {
  className?: string;
  onClick?: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      className={className}
      onClick={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const origin: Origin = {
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
        };
        window.dispatchEvent(
          new CustomEvent(CONTACT_EVENT, { detail: origin }),
        );
        onClick?.();
      }}
    >
      {children}
    </button>
  );
}
