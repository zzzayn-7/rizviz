// A soft band of navy fading in along all four edges of a section; where two
// edges meet the corners come out slightly darker. The middle stays clear.
// The section using it needs `relative isolate overflow-hidden`.
const band = (direction: string, size: number) =>
  `linear-gradient(${direction}, rgba(11,29,45,0.6) 0px, rgba(11,29,45,0.32) ${size * 0.25}px, rgba(11,29,45,0.14) ${size * 0.5}px, rgba(11,29,45,0.04) ${size * 0.78}px, rgba(11,29,45,0) ${size}px)`;

const background = [
  band("to bottom", 110),
  band("to top", 110),
  band("to right", 140),
  band("to left", 140),
].join(", ");

export default function EdgeShade() {
  return (
    <div
      aria-hidden
      className="absolute inset-0 -z-10"
      style={{ background }}
    />
  );
}
