"use client";

import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register plugins
gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function SolutionText() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

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

    if (imgRef.current) {
      tl.fromTo(
        imgRef.current,
        { autoAlpha: 0, scale: 0.7 },
        { autoAlpha: 1, scale: 1, duration: 0.5, ease: "power2.out" },
        0.2
      );
    }
  });

  return (
    <div ref={containerRef} className="font-inter text-center">
      <h2
        ref={titleRef}
        className="font-antonio text-3xl tracking-tighter mb-10 lg:mb-6 md:text-5xl text-stone-200"
      >
        Our Solution: A Website That{" "}
        <span className="text-[#54d265]">Wins</span>
      </h2>
      <p
        ref={subtitleRef}
        className="text-lg sm:text-xl text-stone-300 sm:leading-relaxed tracking-tighter"
      >
        At FA Media, we turn these problems into opportunities with a proven,{" "}
        <br className="hidden md:block" /> personalized process. Here&apos;s how
        we do it:
      </p>
      <Image
        src="/whychooseus/arrow.webp"
        alt="Arrow"
        width={250}
        height={250}
        ref={imgRef}
        className="mx-auto hidden lg:block"
      />
    </div>
  );
}
