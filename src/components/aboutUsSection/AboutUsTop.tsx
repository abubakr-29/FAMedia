"use client";

import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register plugins
gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function AboutUsTop() {
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
    <div
      ref={containerRef}
      className="font-inter w-full max-w-5xl mx-auto flex flex-col items-center justify-center text-center py-20"
    >
      <h2
        ref={titleRef}
        className="font-antonio text-stone-200 text-4xl tracking-tight sm:tracking-tighter mb-8 lg:mb-6 md:text-5xl"
      >
        About Us
      </h2>
      <div
        ref={subtitleRef}
        className="text-base sm:text-xl text-stone-300 sm:leading-relaxed tracking-tight sm:tracking-tighter space-y-8 max-w-4xl mx-auto px-4"
      >
        <p className="leading-relaxed">
          At FA Media, we solve a common challenge — websites that may look
          great, but fail to convert. Many sites struggle with low conversions,
          unclear messaging, and no strategy, leaving founders, creators, and
          personal brands frustrated. We&apos;re here to help change that.
        </p>
        <p className="leading-relaxed">
          Our goal is to create conversion-driven websites that engage visitors
          and build trust. We use conversion psychology, brand storytelling,
          strategic design, and custom development to craft online experiences
          that aim to drive better results. We focus on giving you a website
          that works harder for your goals.
        </p>
        <p className="mb-12">
          Ready to improve your online presence? Let&apos;s get started.
        </p>
        <Link
          href={"#"}
          data-cursor-text="Click Me"
          className="inline-block bg-white rounded-full py-4 px-8 text-base text-black tracking-wide hover:bg-white/70 transition-all duration-500 cursor-pointer"
        >
          Get in Touch
        </Link>
      </div>
    </div>
  );
}
