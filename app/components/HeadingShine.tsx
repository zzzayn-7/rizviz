"use client";

import { useEffect } from "react";

// Lets the light slide across the section headings as the page scrolls. Each heading ("shine-heading")
// gets a position from where it is on the screen: as it rises up the window the shine travels across it
// from left to right (twice), and as you scroll back up it travels back from right to left.
const DURATION = 1000;
// One paused animation per heading, whose position is moved by hand. It is used instead of setting a
// style on the heading, because a heading rendered by the server must keep exactly its own attributes
// until React has hydrated it, or React reports a mismatch.
const players = new WeakMap<HTMLElement, Animation>();

function playerFor(el: HTMLElement) {
  let player = players.get(el);
  if (!player) {
    player = el.animate(
      [
        { backgroundPosition: "110% 0, 0 0" },
        { backgroundPosition: "-30% 0, 0 0" },
      ],
      { duration: DURATION, fill: "both", easing: "linear" },
    );
    player.pause();
    players.set(el, player);
  }
  return player;
}

export default function HeadingShine() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const vh = window.innerHeight;
      document.querySelectorAll<HTMLElement>(".shine-heading").forEach((el) => {
        const { top, height } = el.getBoundingClientRect();
        if (top > vh || top + height < 0) return;
        // 0 when the heading enters at the bottom of the screen, 1 when it leaves at the top
        const t = 1 - (top + height / 2) / vh;
        // the light crosses the heading twice on its way up the screen
        const lap = (((t * 2) % 1) + 1) % 1;
        playerFor(el).currentTime = lap * DURATION;
      });
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
