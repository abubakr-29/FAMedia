"use client";

import { useEffect, useState, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const lenisRef = useRef<Lenis | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) =>
        t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
      lenis.destroy();
    };
  }, []);

  useGSAP(
    () => {
      if (isHovered) {
        gsap.to(buttonRef.current, {
          scale: 1.1,
          duration: 0.3,
          ease: "power2.out",
        });
        gsap.to(".arrow-svg", {
          y: -2,
          duration: 0.3,
          ease: "power2.out",
        });
      } else {
        gsap.to(buttonRef.current, {
          scale: 1,
          duration: 0.3,
          ease: "power2.out",
        });
        gsap.to(".arrow-svg", {
          y: 0,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    },
    { dependencies: [isHovered], scope: buttonRef }
  );

  const scrollToTop = () => {
    lenisRef.current?.scrollTo(0, {
      duration: 1.5,
      easing: (t) =>
        t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
    });
  };

  return (
    <button
      ref={buttonRef}
      onClick={scrollToTop}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`fixed bottom-8 left-8 z-50 w-10 h-10 rounded-tl-2xl rounded-tr-lg rounded-br-2xl bg-[#54d265] flex items-center justify-center transition-opacity duration-300 cursor-pointer ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      style={{
        boxShadow: "0 4px 12px rgba(84, 210, 101, 0.3)",
      }}
      aria-label="Back to top"
    >
      <svg
        className="arrow-svg w-5 h-5"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 19V5M12 5L5 12M12 5L19 12"
          stroke="#0a0a0a"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
};

export default BackToTop;
