"use client";

import { useEffect, useState } from "react";
import { useLenis } from "lenis/react";
import Preloader from "@/components/Preloader";

// Persists across client-side navigations so the intro plays once per visit.
let preloaderShown = false;

/**
 * Plays the intro animation as an overlay ON TOP of the page.
 * The page content itself is always server-rendered underneath, so search
 * engines and AI crawlers (which often don't execute JS) see the full page.
 */
export default function PreloaderGate() {
  // True on the server and first load; false on later client-side visits.
  const [show, setShow] = useState(() => !preloaderShown);
  const lenis = useLenis();

  // Lock scrolling while the overlay is visible.
  useEffect(() => {
    if (!lenis) return;
    if (show) lenis.stop();
    else lenis.start();
  }, [lenis, show]);

  if (!show) return null;

  return (
    <div id="fa-preloader">
      <noscript>
        <style>{`#fa-preloader{display:none}`}</style>
      </noscript>
      <Preloader
        onComplete={() => {
          preloaderShown = true;
          setShow(false);
        }}
      />
    </div>
  );
}
