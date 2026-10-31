// A quiet, slow-moving layer for the ice-blue pages: a faint grid of dots, and soft navy and steel-blue
// light that drifts about very slowly. Everything is drawn
// with gradients and only moved with transforms, so it costs the page almost nothing. It sits above
// the page colour and below the content, and stands still for people who prefer less motion.
const ORBS = [
  { top: "4%", left: "-8%", size: 760, rgb: "11,29,45", alpha: 0.13, anim: "lively-drift-a" },
  { top: "16%", left: "62%", size: 680, rgb: "40,91,122", alpha: 0.12, anim: "lively-drift-b" },
  { top: "34%", left: "-10%", size: 700, rgb: "40,91,122", alpha: 0.11, anim: "lively-drift-b" },
  { top: "52%", left: "66%", size: 760, rgb: "11,29,45", alpha: 0.12, anim: "lively-drift-a" },
  { top: "70%", left: "-6%", size: 680, rgb: "11,29,45", alpha: 0.11, anim: "lively-drift-b" },
  { top: "86%", left: "60%", size: 720, rgb: "40,91,122", alpha: 0.12, anim: "lively-drift-a" },
];

export default function LivelyBackdrop({ behind = false }: { behind?: boolean }) {
  return (
    <div
      aria-hidden
      // `behind` is for a backdrop that sits at -z-10 itself: this layer goes there too, just after it
      className={`pointer-events-none absolute inset-0 overflow-hidden motion-reduce:[&_*]:animate-none ${
        behind ? "-z-10" : ""
      }`}
    >
      {/* fine dots, fading out towards the middle of the page so the words stay clean */}
      <div
        className="absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(11,29,45,0.22) 1px, transparent 1.4px)",
          backgroundSize: "30px 30px",
          maskImage:
            "linear-gradient(90deg, black 0%, transparent 32%, transparent 68%, black 100%)",
          WebkitMaskImage:
            "linear-gradient(90deg, black 0%, transparent 32%, transparent 68%, black 100%)",
        }}
      />

      {ORBS.map((o, i) => (
        <div
          key={i}
          className={`absolute rounded-full ${o.anim}`}
          style={{
            top: o.top,
            left: o.left,
            width: o.size,
            height: o.size,
            background: `radial-gradient(circle at center, rgba(${o.rgb},${o.alpha}) 0%, rgba(${o.rgb},${(o.alpha * 0.45).toFixed(3)}) 38%, transparent 70%)`,
            animationDelay: `${-i * 7}s`,
          }}
        />
      ))}
    </div>
  );
}
