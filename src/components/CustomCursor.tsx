"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

// Register plugin
gsap.registerPlugin(useGSAP);

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const checkMobile = () => {
      const mobile =
        /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) ||
        window.innerWidth < 1024;
      setIsMobile(mobile);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useGSAP(() => {
    if (isMobile) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };

      // Check if cursor has text (is in badge mode)
      const hasText = cursor.innerHTML.length > 0;
      const rect = cursor.getBoundingClientRect();

      gsap.to(cursor, {
        x: e.clientX - rect.width / 2,
        y: hasText ? e.clientY - rect.height / 2 - 20 : e.clientY - 6,
        duration: 0.7,
        ease: "power2.out",
      });
    };

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target || !(target instanceof HTMLElement)) return;

      const cursorText = target.getAttribute("data-cursor-text");

      if (cursorText) {
        // Set text immediately but invisible to measure size
        cursor.innerHTML = cursorText;
        cursor.style.visibility = "hidden";
        cursor.style.padding = "4px 10px";
        cursor.style.height = "auto";
        cursor.style.width = "auto";
        cursor.style.borderRadius = "18px";

        // Force layout recalculation and get the new dimensions
        void cursor.offsetHeight;
        const rect = cursor.getBoundingClientRect();

        // Position cursor at the final location before making it visible
        gsap.set(cursor, {
          x: mousePos.current.x - rect.width / 2,
          y: mousePos.current.y - rect.height / 2 - 20,
        });

        // Make visible again
        cursor.style.visibility = "visible";

        // Now animate the appearance
        gsap.fromTo(
          cursor,
          {
            scale: 0.5,
            opacity: 0,
          },
          {
            scale: 1,
            opacity: 1,
            backgroundColor: "#54d265",
            color: "#000",
            duration: 0.3,
            ease: "power2.out",
          }
        );
      }
    };

    const handleMouseLeave = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target || !(target instanceof HTMLElement)) return;

      if (target.hasAttribute("data-cursor-text")) {
        cursor.innerHTML = "";
        gsap.to(cursor, {
          scale: 1,
          backgroundColor: "#54d265",
          color: "#000",
          padding: "0px",
          borderRadius: "50%",
          height: "12px",
          width: "12px",
          duration: 0.3,
          ease: "power2.out",
        });
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseenter", handleMouseEnter, true);
    document.addEventListener("mouseleave", handleMouseLeave, true);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseenter", handleMouseEnter, true);
      document.removeEventListener("mouseleave", handleMouseLeave, true);
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <div
      ref={cursorRef}
      className="fixed font-inter h-2.5 w-2.5 bg-[#54d265] rounded-full pointer-events-none flex items-center justify-center text-center whitespace-nowrap uppercase"
      style={{
        left: 0,
        top: 0,
        fontSize: "16px",
        zIndex: 9999,
      }}
    />
  );
};

export default CustomCursor;
