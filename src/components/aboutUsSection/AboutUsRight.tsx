"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register plugins
gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function AboutUsRight() {
  const containerRef = useRef<HTMLDivElement>(null);
  const farazRef = useRef<HTMLAnchorElement>(null);
  const abuRef = useRef<HTMLAnchorElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        end: "top 20%",
        scrub: 2,
      },
    });

    if (farazRef.current) {
      tl.fromTo(
        farazRef.current,
        { autoAlpha: 0, x: 100 },
        { autoAlpha: 1, x: 0, duration: 0.6, ease: "power2.out" },
        0
      );
    }

    if (abuRef.current) {
      tl.fromTo(
        abuRef.current,
        { autoAlpha: 0, x: 80 },
        { autoAlpha: 1, x: 0, duration: 0.6, ease: "power2.out" },
        0.1
      );
    }
  });

  return (
    <div ref={containerRef} className="font-inter flex flex-col gap-8">
      <Link
        href={"https://www.linkedin.com/in/-faraz-khan-/"}
        target="_blank"
        rel="noopener noreferrer"
        ref={farazRef}
        data-cursor-text={"See More"}
        className="bg-[#1a1a1a] backdrop-blur-sm border border-stone-900 p-6 rounded-3xl shadow-xl "
      >
        <>
          <div className="flex flex-row items-center gap-4">
            <Image
              src={"/FarazKhan_Profile.webp"}
              alt={"Faraz Khan"}
              width={80}
              height={80}
              className="rounded-full object-cover border-3 border-[#54d265]"
            />
            <div>
              <h3 className="text-xl font-semibold text-stone-200">
                Faraz Khan
              </h3>
              <p className="text-sm text-[#54d265]">
                Designer & Frontend Developer
              </p>
            </div>
          </div>
          <p className="text-sm text-stone-300 mt-4">
            Faraz brings clarity to vision through elegant design and seamless
            interfaces. With a sharp eye for UI/UX and mastery in HTML, CSS,
            FIGMA, and frontend development, he creates digital experiences that
            feel as good as they look.
          </p>
        </>
      </Link>

      <Link
        href={"https://www.linkedin.com/in/abu-bakr-ahmed-01a9532bb/"}
        target="_blank"
        rel="noopener noreferrer"
        data-cursor-text={"See More"}
        ref={abuRef}
        className="bg-[#1a1a1a] backdrop-blur-sm border border-stone-900 p-6 rounded-3xl shadow-xl "
      >
        <>
          <div className="flex flex-row items-center gap-4">
            <Image
              src={"/AbuBakrAhmed_Profile.webp"}
              alt={"Abu Bakr Ahmed"}
              width={80}
              height={80}
              className="rounded-full object-cover border-3 border-[#54d265]"
            />
            <div>
              <h3 className="text-xl font-semibold text-stone-200">
                Abu Bakr Ahmed
              </h3>
              <p className="text-sm text-[#54d265]">Full Stack Developer</p>
            </div>
          </div>
          <p className="text-sm text-stone-300 mt-4">
            Abu Bakr turns complexity into clean, scalable solutions.
            Specializing in React, Node.js, PostgreSQL, and MongoDB, he builds
            reliable full-stack systems that are fast, secure, and built to
            grow.
          </p>
        </>
      </Link>
    </div>
  );
}
