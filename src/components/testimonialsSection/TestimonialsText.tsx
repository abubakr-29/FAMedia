"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register plugins
gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function TestimonialsText() {
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
        className="font-antonio text-4xl text-stone-200 md:text-5xl mb-4"
      >
        Testimonials
      </h2>
      <p
        ref={subtitleRef}
        className="font-inter text-stone-300 max-w-2xl mx-auto text-base md:text-lg"
      >
        Results That Speak for Themselves Our clients have seen up to a 45%
        increase in engagement and a 35% boost in conversions after working with
        us.
      </p>
    </div>
  );
}
