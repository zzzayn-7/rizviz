"use client";

import { useEffect } from "react";
import { LANGUAGES, type LangCode } from "../i18n/languages";
import { initLanguage, useLanguage } from "../i18n/store";

type Dict = { t: Record<string, string>; a: Record<string, string> };

// One dictionary per language, fetched the first time that language is chosen.
const loaders: Partial<Record<LangCode, () => Promise<Dict>>> = {
  "en-GB": () => import("../i18n/dict/en-GB.json").then((m) => m.default as Dict),
  de: () => import("../i18n/dict/de.json").then((m) => m.default as Dict),
  es: () => import("../i18n/dict/es.json").then((m) => m.default as Dict),
  fr: () => import("../i18n/dict/fr.json").then((m) => m.default as Dict),
  ja: () => import("../i18n/dict/ja.json").then((m) => m.default as Dict),
  ar: () => import("../i18n/dict/ar.json").then((m) => m.default as Dict),
  zh: () => import("../i18n/dict/zh.json").then((m) => m.default as Dict),
};

const ATTRS = ["placeholder"] as const;
const SKIP = new Set(["SCRIPT", "STYLE", "NOSCRIPT", "TEXTAREA", "CODE"]);

// What the page said before translation, and what this file last wrote, per text node or attribute.
// Comparing the two tells a text React has changed (a new English sentence) from our own edit.
const original = new WeakMap<Node, string>();
const written = new WeakMap<Node, string>();
const attrOriginal = new WeakMap<Element, Record<string, string>>();
const attrWritten = new WeakMap<Element, Record<string, string>>();
const touched = new Set<Text>();
const touchedEls = new Set<Element>();

const normalise = (s: string) => s.replace(/\s+/g, " ").trim();

function lookup(dict: Dict | null, source: string, attr: boolean) {
  if (!dict) return source;
  const lead = source.match(/^\s*/)?.[0] ?? "";
  const tail = source.match(/\s*$/)?.[0] ?? "";
  const core = normalise(source);
  const hit = (attr ? dict.a : dict.t)[core];
  return hit === undefined ? source : lead + hit + tail;
}

// Attributes (a placeholder) are translated even on a textarea, whose text is not; only translate="no"
// keeps them as they are.
function optedOut(el: Element | null) {
  for (let e = el; e; e = e.parentElement) {
    if (e.getAttribute("translate") === "no") return true;
  }
  return false;
}

function skippable(el: Element | null) {
  for (let e = el; e; e = e.parentElement) {
    if (SKIP.has(e.tagName) || e.getAttribute("translate") === "no") return true;
  }
  return false;
}

// Text that React has not yet hydrated must not be touched: React would find a different sentence from
// the one the server sent and throw the whole section away. An element React owns carries a hidden
// "__reactFiber$" key once it has been claimed, so anything without one is left for a later pass.
const deferred = new Set<Node>();

function hydrated(el: Element | null) {
  if (!el) return false;
  for (const k in el) if (k.startsWith("__reactFiber$")) return true;
  return false;
}

function applyText(node: Text, dict: Dict | null) {
  if (!node.data.trim() || !/\p{L}/u.test(node.data) || skippable(node.parentElement)) return;
  if (dict && !hydrated(node.parentElement)) {
    deferred.add(node);
    return;
  }
  deferred.delete(node);
  const now = node.data;
  const source = written.has(node) && written.get(node) === now ? (original.get(node) ?? now) : now;
  original.set(node, source);
  const next = lookup(dict, source, false);
  if (next !== now) node.data = next;
  written.set(node, next);
  touched.add(node);
}

function applyAttrs(el: Element, dict: Dict | null) {
  if (dict && !hydrated(el)) {
    deferred.add(el);
    return;
  }
  for (const name of ATTRS) {
    const now = el.getAttribute(name);
    if (!now) continue;
    const orig = attrOriginal.get(el) ?? {};
    const wr = attrWritten.get(el) ?? {};
    const source = wr[name] === now ? (orig[name] ?? now) : now;
    orig[name] = source;
    const next = lookup(dict, source, true);
    if (next !== now) el.setAttribute(name, next);
    wr[name] = next;
    attrOriginal.set(el, orig);
    attrWritten.set(el, wr);
    touchedEls.add(el);
  }
}

function walk(root: Node, dict: Dict | null) {
  if (root.nodeType === Node.TEXT_NODE) return applyText(root as Text, dict);
  if (root.nodeType !== Node.ELEMENT_NODE) return;
  const el = root as Element;
  if (optedOut(el)) return;
  applyAttrs(el, dict);
  el.querySelectorAll(`[${ATTRS.join("],[")}]`).forEach((e) => {
    if (!optedOut(e)) applyAttrs(e, dict);
  });
  const w = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
  let n: Node | null;
  while ((n = w.nextNode())) applyText(n as Text, dict);
}

function restore() {
  touched.forEach((n) => {
    const src = original.get(n);
    if (src !== undefined && n.isConnected && n.data === written.get(n)) n.data = src;
  });
  touchedEls.forEach((el) => {
    const orig = attrOriginal.get(el);
    const wr = attrWritten.get(el);
    if (!orig || !wr || !el.isConnected) return;
    for (const name of ATTRS) {
      if (orig[name] !== undefined && el.getAttribute(name) === wr[name]) {
        el.setAttribute(name, orig[name]);
      }
    }
  });
  touched.clear();
  touchedEls.clear();
}

// Waits until the page has loaded and the browser has gone quiet, which in practice is when React has
// finished hydrating. Changing text before then would clash with React starting up.
let quiet: Promise<void> | null = null;
function whenQuiet() {
  quiet ??= new Promise<void>((resolve) => {
    const idle =
      window.requestIdleCallback ??
      ((cb: IdleRequestCallback) =>
        window.setTimeout(() => cb({ didTimeout: false, timeRemaining: () => 50 }), 60));
    let calm = 0;
    const tick = () =>
      idle(
        (d) => {
          calm = d.timeRemaining() > 10 ? calm + 1 : 0;
          const loaded = document.readyState === "complete" && performance.now() > 1200;
          if ((loaded && calm >= 2) || performance.now() > 4000) resolve();
          else tick();
        },
        { timeout: 300 },
      );
    tick();
  });
  return quiet;
}

// Mounted once in the layout. It sets the language from the saved choice (or the browser), and
// translates the text of the page, and anything that appears later, from the dictionary of that
// language. English (US) is the page as written, so choosing it puts everything back.
export default function PageTranslator() {
  const lang = useLanguage();

  useEffect(() => {
    let live = true;
    whenQuiet().then(() => live && initLanguage());
    return () => {
      live = false;
    };
  }, []);

  useEffect(() => {
    const info = LANGUAGES.find((l) => l.code === lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = info?.rtl ? "rtl" : "ltr";

    const load = loaders[lang];
    let observer: MutationObserver | null = null;
    let cancelled = false;
    let frame = 0;
    let retry = 0;

    const start = (dict: Dict | null) => {
      if (cancelled) return;
      if (!dict) {
        restore();
        return;
      }
      walk(document.body, dict);
      // anything React had not hydrated yet is tried again until it has
      let tries = 0;
      retry = window.setInterval(() => {
        if (deferred.size === 0 || ++tries > 40) {
          window.clearInterval(retry);
          return;
        }
        [...deferred].forEach((n) => (n.isConnected ? walk(n, dict) : deferred.delete(n)));
      }, 400);
      const pending = new Set<Node>();
      observer = new MutationObserver((records) => {
        for (const r of records) {
          if (r.type === "childList") r.addedNodes.forEach((n) => pending.add(n));
          else if (r.type === "characterData") pending.add(r.target);
          else if (r.type === "attributes") pending.add(r.target);
        }
        if (!frame) {
          frame = requestAnimationFrame(() => {
            frame = 0;
            const batch = [...pending];
            pending.clear();
            batch.forEach((n) => n.isConnected && walk(n, dict));
          });
        }
      });
      observer.observe(document.body, {
        childList: true,
        subtree: true,
        characterData: true,
        attributes: true,
        attributeFilter: [...ATTRS],
      });
    };

    restore();
    if (load) Promise.all([load(), whenQuiet()]).then(([dict]) => start(dict));
    else start(null);

    return () => {
      cancelled = true;
      observer?.disconnect();
      if (frame) cancelAnimationFrame(frame);
      window.clearInterval(retry);
    };
  }, [lang]);

  return null;
}
