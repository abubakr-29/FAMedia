"use client";

import { useEffect, useSyncExternalStore } from "react";
import { useLenis } from "lenis/react";
import Preloader from "@/components/Preloader";
import { PRELOADER_STORAGE_KEY as STORAGE_KEY } from "@/lib/preloader";

// --- tiny external store: "should the intro be skipped?" -------------------
let seenInMemory = false;
const listeners = new Set<() => void>();

function shouldSkip(): boolean {
  if (seenInMemory) return true;
  try {
    return (
      sessionStorage.getItem(STORAGE_KEY) === "1" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  } catch {
    return false;
  }
}

function markSeen() {
  seenInMemory = true;
  try {
    sessionStorage.setItem(STORAGE_KEY, "1");
  } catch {}
  document.documentElement.dataset.skipPreloader = "1";
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

/**
 * Plays the intro animation as an overlay ON TOP of the page — once per
 * browser session. The page content is always server-rendered underneath,
 * so search engines and AI crawlers see the full page.
 */
export default function PreloaderGate() {
  // Server snapshot = "show"; the client corrects it right after hydration.
  const skip = useSyncExternalStore(subscribe, shouldSkip, () => false);
  const show = !skip;
  const lenis = useLenis();

  // Hard cap: on slow devices the animation can lag behind real time —
  // never keep a visitor waiting more than 3.5s.
  useEffect(() => {
    if (!show) return;
    const t = setTimeout(markSeen, 3500);
    return () => clearTimeout(t);
  }, [show]);

  // Lock scrolling while the overlay is visible.
  useEffect(() => {
    if (!lenis) return;
    if (show) lenis.stop();
    else lenis.start();
  }, [lenis, show]);

  if (!show) return null;

  return (
    <div id="fa-preloader">
      <Preloader onComplete={markSeen} />
    </div>
  );
}
