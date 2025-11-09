"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register plugins
gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function ProjectsText() {
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
        className="font-antonio mt-16 text-stone-200 text-center text-4xl md:text-5xl tracking-tight"
      >
        Projects
      </h2>
      <p
        ref={subtitleRef}
        className="font-inter mt-5 mb-15 text-stone-300 text-center max-w-2xl mx-auto leading-relaxed tracking-tighter text-base md:text-lg"
      >
        We have worked on a variety of web development projects, ranging from
        responsive websites for small businesses to full-stack applications and
        complex front-end interfaces.
      </p>
    </div>
  );
}
