"use client";

import type { ReactNode } from "react";

// A link to a place further down the same page that scrolls there every time it is pressed. A plain
// "#section" link does nothing the second time, once the address already ends in that "#section".
export default function ScrollButton({
  target,
  className,
  children,
}: {
  // the id of the section to scroll to, without the "#"
  target: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <a
      href={`#${target}`}
      className={className}
      onClick={(event) => {
        const el = document.getElementById(target);
        if (!el) return;
        event.preventDefault();
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }}
    >
      {children}
    </a>
  );
}
