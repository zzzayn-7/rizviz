import Image from "next/image";
import flags from "../images/reach-flags.png";
import scene from "../images/reach-scene.jpg";

// The flags from the photograph, on the right of "Our Reach", as a rectangle
// of the photo's own background (sky, white building, trees) that fades into
// the page's navy on its left, top and bottom, the way the call to action's
// photo does. The text sits over the navy side, so the photo reads as the
// background of the section. Both the photo and the flags are toned into the
// blues of the site.
//
// Everything is sized from the height of the stage (cqh units), so the cut-out
// flags sit exactly over the same pixels of the photograph at any screen size.
// The cut-out is the part of the photo from x 170 to 990 and y 112 to 1300; the
// scene is the whole photo with 420px of sky added above it, 260px of ground
// below and 140px more on the left.
const UNIT = 0.075; // cqh per photo pixel
const FLAGS_TOP = 4; // cqh from the top of the stage to the cut-out
const FLAGS_RIGHT = 3; // cqh from the right edge to the cut-out

const FADE_SIDE =
  "linear-gradient(90deg, transparent 0%, transparent 7%, rgba(0,0,0,0.25) 18%, rgba(0,0,0,0.65) 31%, black 45%)";
const FADE_EDGES =
  "linear-gradient(180deg, transparent 0%, black 16%, black 80%, transparent 100%)";

export default function ReachFlags() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute right-0 top-0 -z-10 h-[26rem] w-full md:h-full"
      style={{ containerType: "size" }}
    >
      {/* Two masks, one for the side and one for the top and bottom, applied
          to nested layers so they multiply. */}
      <div
        className="absolute right-0 top-0 h-full"
        style={{
          width: `${1226 * UNIT}cqh`,
          maxWidth: "100%",
          maskImage: FADE_EDGES,
          WebkitMaskImage: FADE_EDGES,
        }}
      >
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ maskImage: FADE_SIDE, WebkitMaskImage: FADE_SIDE }}
        >
          <Image
            src={scene}
            alt=""
            sizes="50vw"
            className="absolute max-w-none opacity-90"
            style={{
              width: `${1226 * UNIT}cqh`,
              height: `${2128 * UNIT}cqh`,
              top: `${FLAGS_TOP - 532 * UNIT}cqh`,
              right: `${FLAGS_RIGHT - 96 * UNIT}cqh`,
            }}
          />
          <Image
            src={flags}
            alt=""
            sizes="24rem"
            className="absolute max-w-none"
            style={{
              right: `${FLAGS_RIGHT}cqh`,
              top: `${FLAGS_TOP}cqh`,
              height: `${1188 * UNIT}cqh`,
              width: `${820 * UNIT}cqh`,
            }}
          />
          {/* A little navy over the whole picture, so it sits back behind the
              words like the call to action's photograph. */}
          <div
            className="absolute inset-0"
            style={{ background: "rgba(11,29,45,0.1)" }}
          />
        </div>
      </div>
    </div>
  );
}
