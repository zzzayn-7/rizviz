// The round navy placeholder shown in place of a person's photo.
export default function PersonAvatar({ size = "md" }: { size?: "md" | "sm" }) {
  return (
    <div
      className={`glass-navy flex shrink-0 items-center justify-center rounded-full ${
        size === "sm" ? "h-20 w-20" : "h-28 w-28 sm:h-32 sm:w-32"
      }`}
    >
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden
        className={`text-brand-ice ${
          size === "sm" ? "h-12 w-12" : "h-16 w-16 sm:h-20 sm:w-20"
        }`}
      >
        <circle cx="12" cy="8.25" r="3.5" />
        <path d="M5 19.25c0-3.1 2.7-5.25 7-5.25s7 2.15 7 5.25c0 .55-.45 1-1 1H6c-.55 0-1-.45-1-1Z" />
      </svg>
    </div>
  );
}
