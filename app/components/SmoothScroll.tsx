"use client";

import { useEffect } from "react";

// Slows the mouse wheel down and eases it. One notch of a wheel normally throws the page about 100px at
// once; here it moves a little over half of that, and the page glides to its stop instead of jumping.
// Touch, the keyboard and the scrollbar still work as the browser does them, and so do inner scrolling
// areas (a dialog, a list). Not used for visitors who ask for less motion.
const SPEED = 0.55; // share of the wheel's own distance
const EASE = 0.1; // how much of the remaining distance is covered each frame

function canScrollInside(start: EventTarget | null, deltaY: number) {
  let el = start instanceof Element ? start : null;
  while (el && el !== document.body && el !== document.documentElement) {
    const { overflowY } = getComputedStyle(el);
    if (
      (overflowY === "auto" || overflowY === "scroll") &&
      el.scrollHeight > el.clientHeight
    ) {
      const atTop = el.scrollTop <= 0 && deltaY < 0;
      const atBottom =
        el.scrollTop + el.clientHeight >= el.scrollHeight - 1 && deltaY > 0;
      if (!atTop && !atBottom) return true;
    }
    el = el.parentElement;
  }
  return false;
}

export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let target = window.scrollY;
    let current = window.scrollY;
    let lastSet = window.scrollY;
    let frame = 0;

    const max = () =>
      document.documentElement.scrollHeight - window.innerHeight;

    const step = () => {
      frame = 0;
      current += (target - current) * EASE;
      if (Math.abs(target - current) < 0.5) current = target;
      lastSet = current;
      // "instant" because the page's own smooth-scrolling would otherwise ease a second time
      window.scrollTo({ top: current, behavior: "instant" });
      if (current !== target) frame = requestAnimationFrame(step);
    };

    const onWheel = (e: WheelEvent) => {
      if (e.ctrlKey || e.defaultPrevented) return; // pinch-zoom, or someone else is handling it
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return; // sideways swipes
      if (document.body.style.overflow === "hidden") return; // a dialog is open
      if (canScrollInside(e.target, e.deltaY)) return;

      const unit = e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? window.innerHeight : 1;
      e.preventDefault();
      target = Math.min(max(), Math.max(0, target + e.deltaY * unit * SPEED));
      if (!frame) frame = requestAnimationFrame(step);
    };

    // If the page was moved some other way (scrollbar, keyboard, a link to a section), follow it.
    const onScroll = () => {
      if (Math.abs(window.scrollY - lastSet) > 2) {
        target = current = lastSet = window.scrollY;
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
