"use client";

import { useSyncExternalStore } from "react";

const noSubscribe = () => () => {};

// The year updates by itself. The page is built ahead of time, so the server
// copy says 2026; the visitor's browser then swaps in the current year.
export default function CopyrightYear() {
  const year = useSyncExternalStore(
    noSubscribe,
    () => new Date().getFullYear(),
    () => 2026,
  );
  return <>{year}</>;
}
