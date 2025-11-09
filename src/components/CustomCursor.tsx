"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

// Register plugin
gsap.registerPlugin(useGSAP);

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(true); // Default to true to avoid flash

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      const mobile =
        /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) ||
        window.innerWidth < 1024; // Also check screen width
      setIsMobile(mobile);
    };

    checkMobile();

    // Recheck on resize
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Handle cursor animation with useGSAP
  useGSAP(() => {
    if (isMobile) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    // Track mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      const rect = cursor.getBoundingClientRect();

      // Check if cursor has text (is in badge mode)
      const hasText = cursor.innerHTML.length > 0;

      gsap.to(cursor, {
        x: e.clientX - rect.width / 2,
        y: hasText ? e.clientY - rect.height / 2 - 20 : e.clientY - 6,
        duration: 0.6,
        ease: "power2.out",
      });
    };

    // Handle cursor interactions with elements
    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      // Ensure target is an HTMLElement
      if (!target || !(target instanceof HTMLElement)) return;

      // Check if element has data-cursor attribute
      const cursorText = target.getAttribute("data-cursor-text");

      if (cursorText) {
        cursor.innerHTML = cursorText;
        gsap.to(cursor, {
          scale: 1,
          backgroundColor: "#54d265",
          color: "#000",
          padding: "4px 10px",
          borderRadius: "18px",
          height: "auto",
          width: "auto",
          duration: 0.3,
          ease: "power2.out",
          onComplete: () => {
            // After animation completes, get the actual size and reposition
            const rect = cursor.getBoundingClientRect();
            gsap.set(cursor, {
              x: e.clientX - rect.width / 2,
              y: e.clientY - rect.height / 2 - 20, // 20px above cursor
            });
          },
        });
      }
    };

    const handleMouseLeave = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      // Ensure target is an HTMLElement before calling hasAttribute
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

    // Add event listeners
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseenter", handleMouseEnter, true);
    document.addEventListener("mouseleave", handleMouseLeave, true);

    // Cleanup is handled automatically by useGSAP
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseenter", handleMouseEnter, true);
      document.removeEventListener("mouseleave", handleMouseLeave, true);
    };
  }, [isMobile]);

  // Don't render anything on mobile
  if (isMobile) return null;

  return (
    <div
      ref={cursorRef}
      className="fixed font-inter h-3 w-3 bg-[#54d265] rounded-full pointer-events-none flex items-center justify-center text-center whitespace-nowrap uppercase"
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
