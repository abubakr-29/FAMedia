"use client";

import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register plugins
gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function WhyChooseUsTop() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const firstSubtitleRef = useRef<HTMLParagraphElement>(null);
  const secondSubtitleRef = useRef<HTMLParagraphElement>(null);
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

    if (firstSubtitleRef.current) {
      tl.fromTo(
        firstSubtitleRef.current,
        { autoAlpha: 0, y: -30 },
        { autoAlpha: 1, y: 0, duration: 0.6, ease: "power2.out" },
        0.1
      );
    }

    if (secondSubtitleRef.current) {
      tl.fromTo(
        secondSubtitleRef.current,
        { autoAlpha: 0, y: -30 },
        { autoAlpha: 1, y: 0, duration: 0.6, ease: "power2.out" },
        0.2
      );
    }

    if (imgRef.current) {
      tl.fromTo(
        imgRef.current,
        { autoAlpha: 0, scale: 0.7 },
        { autoAlpha: 1, scale: 1, duration: 0.5, ease: "power2.out" },
        0.3
      );
    }
  });

  return (
    <div ref={containerRef} className="font-inter text-center">
      <h2
        ref={titleRef}
        className="font-antonio text-4xl tracking-tighter mb-10 lg:mb-6 md:text-5xl font-special text-stone-200 uppercase"
      >
        Is That You? Facing the{" "}
        <span className="text-[#54d265]">Same Problem?</span>
      </h2>
      <p
        ref={firstSubtitleRef}
        className="text-stone-300 tracking-wide sm:tracking-wider text-xl sm:text-2xl mb-10 mt-12"
      >
        The Problems Holding Your Website Back
      </p>
      <p
        ref={secondSubtitleRef}
        className="text-lg sm:text-xl text-stone-400 sm:leading-relaxed tracking-tighter"
      >
        Your online presence should work as hard as you do, but these
        <br className="hidden md:block" /> common issues might be standing in
        your way:
      </p>
      <Image
        src="/whychooseus/sad.webp"
        alt="Sad stick figure illustration"
        width={250}
        height={250}
        className="mx-auto mt-2"
        ref={imgRef}
        style={{ width: "auto", height: "210px" }}
      />
    </div>
  );
}
