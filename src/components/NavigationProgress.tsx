"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";

/**
 * Slim brand-green progress bar shown while moving between pages.
 * Starts on internal link clicks, completes when the new URL has rendered.
 * Drives the DOM directly (no React state) so it never re-renders the app.
 */
export default function NavigationProgress() {
  const barRef = useRef<HTMLDivElement>(null);
  const trickleRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const progressRef = useRef(0);
  const activeRef = useRef(false);
  const finishRef = useRef<() => void>(() => {});

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const url = `${pathname}?${searchParams.toString()}`;

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    const clearTimers = () => {
      if (trickleRef.current) clearInterval(trickleRef.current);
      trickleRef.current = null;
      timeoutsRef.current.forEach(clearTimeout);
      timeoutsRef.current = [];
    };

    const set = (value: number) => {
      progressRef.current = value;
      bar.style.transform = `scaleX(${value})`;
    };

    const start = () => {
      clearTimers();
      activeRef.current = true;
      bar.style.transition = "none";
      bar.style.opacity = "1";
      set(0);
      // Force layout so the jump to 0 isn't animated.
      void bar.offsetWidth;
      bar.style.transition = "transform 200ms ease-out, opacity 300ms ease";
      set(0.15);
      trickleRef.current = setInterval(() => {
        const p = progressRef.current;
        // Slow down as we approach 90% — never "finishes" on its own.
        set(Math.min(p + (0.9 - p) * 0.1, 0.9));
      }, 200);
      // Safety net: never hang forever.
      timeoutsRef.current.push(setTimeout(finish, 10000));
    };

    function finish() {
      if (!activeRef.current || !bar) return;
      activeRef.current = false;
      clearTimers();
      set(1);
      timeoutsRef.current.push(
        setTimeout(() => {
          bar.style.opacity = "0";
        }, 200),
        setTimeout(() => {
          bar.style.transition = "none";
          set(0);
        }, 550)
      );
    }

    const onClick = (e: MouseEvent) => {
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey)
        return;

      const anchor = (e.target as Element)?.closest?.("a[href]");
      if (!(anchor instanceof HTMLAnchorElement)) return;
      if (anchor.target && anchor.target !== "_self") return;
      if (anchor.hasAttribute("download")) return;

      const next = new URL(anchor.href, window.location.href);
      if (next.origin !== window.location.origin) return;

      const current = window.location;
      // Same page (incl. in-page #anchors) → nothing to load.
      if (next.pathname === current.pathname && next.search === current.search)
        return;

      start();
    };

    // Expose finish to the URL-change effect below.
    finishRef.current = finish;

    document.addEventListener("click", onClick, true);
    return () => {
      document.removeEventListener("click", onClick, true);
      clearTimers();
    };
  }, []);

  // New URL rendered → complete the bar.
  useEffect(() => {
    finishRef.current();
  }, [url]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-10000 h-[1.5px]"
    >
      <div
        ref={barRef}
        className="h-full w-full origin-left bg-[#54d265] shadow-[0_0_6px_#54d265]"
        style={{ transform: "scaleX(0)", opacity: 0 }}
      />
    </div>
  );
}
