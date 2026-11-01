"use client";

import { useSyncExternalStore } from "react";
import { DEFAULT_LANGUAGE, detectLanguage, isLangCode, type LangCode } from "./languages";

const KEY = "rizviz-language";
let current: LangCode = DEFAULT_LANGUAGE;
const listeners = new Set<() => void>();

const notify = () => listeners.forEach((l) => l());

// Called once, in the browser, after the page has loaded: the saved choice, or else the browser's own
// language.
export function initLanguage() {
  let saved: string | null = null;
  try {
    saved = localStorage.getItem(KEY);
  } catch {
    // private window or blocked storage: fall back to detection
  }
  const next = isLangCode(saved) ? saved : detectLanguage();
  if (next !== current) {
    current = next;
    notify();
  }
}

export function setLanguage(code: LangCode) {
  current = code;
  try {
    localStorage.setItem(KEY, code);
  } catch {
    // the choice still applies for this visit
  }
  notify();
}

export function useLanguage(): LangCode {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    () => current,
    () => DEFAULT_LANGUAGE,
  );
}
