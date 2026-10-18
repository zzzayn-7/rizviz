"use client";

import type { ReactNode } from "react";
import { APPLY_EVENT, type ApplyDetail } from "./ApplyForm";

// Slides down to the application form and fills in what the job card says.
export default function ApplyButton({
  detail,
  className,
  children,
}: {
  detail: ApplyDetail;
  className?: string;
  children: ReactNode;
}) {
  return (
    <a
      href="#apply"
      className={className}
      onClick={(event) => {
        event.preventDefault();
        window.dispatchEvent(new CustomEvent(APPLY_EVENT, { detail }));
        document
          .getElementById("apply")
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      }}
    >
      {children}
    </a>
  );
}
