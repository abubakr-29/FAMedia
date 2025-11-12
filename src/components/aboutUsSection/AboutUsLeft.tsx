"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register plugins
gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function AboutUsLeft() {
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
        { autoAlpha: 0, x: -100 },
        { autoAlpha: 1, x: 0, duration: 0.6, ease: "power2.out" },
        0
      );
    }

    if (subtitleRef.current) {
      tl.fromTo(
        subtitleRef.current,
        { autoAlpha: 0, x: -80 },
        { autoAlpha: 1, x: 0, duration: 0.6, ease: "power2.out" },
        0.3
      );
    }
  });

  return (
    <div ref={containerRef}>
      <h2
        ref={titleRef}
        className="font-antonio text-3xl sm:text-4xl tracking-tight mb-8 text-stone-200 text-center lg:text-left lg:mb-6 md:text-5xl"
      >
        Meet the <span className="text-[#54d265]">Founders</span>
      </h2>
      <p
        ref={subtitleRef}
        className="font-inter text-lg sm:text-xl text-stone-300 text-center lg:text-left sm:leading-relaxed tracking-tight"
      >
        We&apos;re a duo passionate about building beautiful, high-performing
        digital experiences. At FA Media, we combine creativity, technology, and
        strategy to help brands grow and shine online.
      </p>
    </div>
  );
}
