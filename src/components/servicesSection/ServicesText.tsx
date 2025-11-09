"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register plugins
gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function ServicesText() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        end: "top 20%",
        scrub: 2,
      },
    });

    if (titleRef.current) {
      tl.fromTo(
        titleRef.current,
        { autoAlpha: 0, y: -50 },
        { autoAlpha: 1, y: 0, duration: 0.6, ease: "power2.out" },
        0
      );
    }

    if (subtitleRef.current) {
      tl.fromTo(
        subtitleRef.current,
        { autoAlpha: 0, y: -30 },
        { autoAlpha: 1, y: 0, duration: 0.6, ease: "power2.out" },
        0.1
      );
    }
  });

  return (
    <div ref={containerRef}>
      <h2
        ref={titleRef}
        className="font-antonio text-4xl md:text-5xl tracking-tight"
      >
        Our <span className="text-[#54d265]">Services</span>
      </h2>
      <p
        ref={subtitleRef}
        className="font-inter mt-4 text-stone-300 max-w-2xl mx-auto leading-relaxed tracking-tighter text-base md:text-lg"
      >
        We design digital solutions that are not just functional, but
        beautifully strategic — for startups, creatives, and established brands
        alike.
      </p>
    </div>
  );
}
