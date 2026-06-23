"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
        end: "top 30%",
        scrub: 2,
      },
    });

    tl.fromTo(
      titleRef.current,
      { autoAlpha: 0, y: -30 },
      { autoAlpha: 1, y: 0, duration: 0.6, ease: "power2.out" },
      0,
    );

    tl.fromTo(
      subtitleRef.current,
      { autoAlpha: 0, y: 20 },
      { autoAlpha: 1, y: 0, duration: 0.6, ease: "power2.out" },
      0.25,
    );
  });

  return (
    <div ref={containerRef} className="text-center max-w-2xl mx-auto mb-16">
      <h2
        ref={titleRef}
        className="font-antonio text-4xl md:text-5xl tracking-tight mb-5 text-stone-200"
      >
        Meet the <span className="text-[#54d265]">Founders</span>
      </h2>
      <p
        ref={subtitleRef}
        className="font-inter text-lg text-stone-400 leading-relaxed tracking-tight"
      >
        We&apos;re a trio passionate about building beautiful, high-performing
        digital experiences. At FA Media, we combine creativity, technology, and
        strategy to help brands grow and shine online.
      </p>
    </div>
  );
}
