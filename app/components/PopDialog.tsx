"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  type ReactNode,
} from "react";

const OPEN_MS = 480;
const CLOSE_MS = 300;

// Where the button that opened the dialog is on screen (viewport coordinates).
export type Origin = { x: number; y: number };

const CloseContext = createContext<() => void>(() => {});

// A button, placed inside a PopDialog, that closes it with the shrinking
// motion.
export function PopDialogClose({
  className,
  style,
  children,
}: {
  className?: string;
  style?: React.CSSProperties;
  children: ReactNode;
}) {
  const close = useContext(CloseContext);
  return (
    <button type="button" onClick={close} style={style} className={className}>
      {children}
    </button>
  );
}

// A modal dialog that grows out of the button that opened it and shrinks back
// into it. Mount it to open; `onClose` is called once it has closed.
export default function PopDialog({
  origin,
  onClose,
  labelledBy,
  width = "34rem",
  children,
}: {
  origin: Origin;
  onClose: () => void;
  labelledBy: string;
  width?: string;
  children: ReactNode;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closing = useRef(false);

  // How far the dialog's center is from the button, so it can start from
  // (and return to) the button's position.
  function offsetFromOrigin() {
    const rect = dialogRef.current!.getBoundingClientRect();
    return {
      x: origin.x - (rect.left + rect.width / 2),
      y: origin.y - (rect.top + rect.height / 2),
    };
  }

  const reducedMotion = () =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // A native dialog gives Esc, focus handling and the backdrop; the page
  // behind it is kept from scrolling while it is open.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (!dialog.open) dialog.showModal();
    document.body.style.overflow = "hidden";

    if (!reducedMotion()) {
      const { x, y } = offsetFromOrigin();
      dialog.animate(
        [
          { transform: `translate(${x}px, ${y}px) scale(0.12)`, opacity: 0 },
          { transform: "none", opacity: 1 },
        ],
        { duration: OPEN_MS, easing: "cubic-bezier(0.22, 1, 0.36, 1)" },
      );
      dialog.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: OPEN_MS,
        pseudoElement: "::backdrop",
      });
    }
    return () => {
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Shrinks back into the button, then closes for real.
  function requestClose() {
    const dialog = dialogRef.current;
    if (!dialog || closing.current) return;
    closing.current = true;
    if (reducedMotion()) {
      dialog.close();
      return;
    }
    const { x, y } = offsetFromOrigin();
    const shrink = dialog.animate(
      [
        { transform: "none", opacity: 1 },
        { transform: `translate(${x}px, ${y}px) scale(0.12)`, opacity: 0 },
      ],
      { duration: CLOSE_MS, easing: "ease-in", fill: "forwards" },
    );
    dialog.animate([{ opacity: 1 }, { opacity: 0 }], {
      duration: CLOSE_MS,
      fill: "forwards",
      pseudoElement: "::backdrop",
    });
    shrink.finished.then(
      () => dialog.close(),
      () => dialog.close(),
    );
  }

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onCancel={(e) => {
        // Esc: shrink back instead of vanishing.
        e.preventDefault();
        requestClose();
      }}
      onClick={(e) => {
        if (e.target === dialogRef.current) requestClose();
      }}
      aria-labelledby={labelledBy}
      style={{ width: `min(${width}, calc(100% - 2rem))` }}
      className="m-auto max-h-[calc(100%-2rem)] overflow-y-auto rounded-2xl bg-white p-0 shadow-2xl backdrop:bg-brand-navy/60 backdrop:backdrop-blur-sm"
    >
      <div className="relative p-6 sm:p-10">
        <button
          type="button"
          onClick={requestClose}
          aria-label="Close"
          className="absolute right-4 top-4 z-10 rounded-full border border-[#D3DFE9] px-3 py-1.5 text-brand-slate transition-colors hover:border-brand-sky hover:text-brand-navy sm:right-6 sm:top-6"
        >
          ✕
        </button>
        <CloseContext.Provider value={requestClose}>
          {children}
        </CloseContext.Provider>
      </div>
    </dialog>
  );
}
