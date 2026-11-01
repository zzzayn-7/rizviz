export type LangCode = "en-US" | "en-GB" | "de" | "es" | "fr" | "ja" | "ar" | "zh";

export const LANGUAGES: { code: LangCode; label: string; rtl?: boolean }[] = [
  { code: "en-US", label: "English (US)" },
  { code: "en-GB", label: "English (UK)" },
  { code: "de", label: "Deutsch" },
  { code: "es", label: "Español" },
  { code: "fr", label: "Français" },
  { code: "ja", label: "日本語" },
  { code: "ar", label: "العربية", rtl: true },
  { code: "zh", label: "中文" },
];

// The page's own text is American English; every other language is a dictionary of those sentences.
export const DEFAULT_LANGUAGE: LangCode = "en-US";

export function isLangCode(value: string | null | undefined): value is LangCode {
  return LANGUAGES.some((l) => l.code === value);
}

// Picks a language from the browser's own settings, for a first visit.
export function detectLanguage(): LangCode {
  const tags = navigator.languages?.length ? navigator.languages : [navigator.language];
  for (const raw of tags) {
    const tag = raw.toLowerCase();
    if (tag === "en-us") return "en-US";
    if (tag.startsWith("en")) return "en-GB";
    const base = tag.split("-")[0];
    const hit = LANGUAGES.find((l) => l.code === base);
    if (hit) return hit.code;
  }
  return DEFAULT_LANGUAGE;
}
