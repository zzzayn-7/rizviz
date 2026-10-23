import Image from "next/image";
import flags from "../images/reach-flags.png";
import scene from "../images/reach-scene.jpg";

// The flags from the photograph on the right of "Our Reach", standing in a
// complete half-oval cut from the photograph's own background (sky, white
// building, trees). It covers about a third of the page width, and its flat side is the edge of the page.
// Both the photo and the flags are toned into the blues of the site.
//
// Everything is sized from the height of the stage (cqh units), so the cut-out
// flags sit exactly over the same pixels of the photograph at any screen size.
// The cut-out is the part of the photo from x 170 to 990 and y 112 to 1300; the
// scene is the whole photo with 420px of sky added above it and
// 260px of ground below and 140px more on the left.
const UNIT = 0.068; // cqh per photo pixel: the poles are about 70% of the height
const FLAGS_TOP = 14; // cqh from the top of the stage to the cut-out
const FLAGS_RIGHT = 2; // cqh from the right edge to the cut-out

export default function ReachFlags() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute right-0 top-6 -z-10 h-[22rem] w-full md:inset-y-10 md:h-auto"
      style={{ containerType: "size" }}
    >
      <div
        className="absolute right-0 top-0 h-full w-[76cqh] overflow-hidden md:w-[min(35%,76cqh)] shadow-[0_0_0_1px_rgba(112,199,244,0.3),0_0_70px_4px_rgba(50,159,224,0.25)]"
        style={{ borderRadius: "100% 0 0 100% / 50% 0 0 50%" }}
      >
        <Image
          src={scene}
          alt=""
          sizes="40rem"
          className="absolute max-w-none opacity-85"
          style={{
            width: `${1226 * UNIT}cqh`,
            height: `${2128 * UNIT}cqh`,
            top: `${FLAGS_TOP - 532 * UNIT}cqh`,
            right: `${FLAGS_RIGHT - 96 * UNIT}cqh`,
          }}
        />
        {/* Darkens the curved edge a little so it settles into the page. */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(11,29,45,0.55) 0%, rgba(11,29,45,0.15) 40%, transparent 65%)",
          }}
        />
      </div>
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
    </div>
  );
}
