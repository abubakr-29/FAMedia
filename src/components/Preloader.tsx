"use client";

import { useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

interface PreloaderProps {
  onComplete?: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const wavePathRef = useRef<SVGPathElement>(null);
  const loadingTextRef = useRef<SVGTextElement>(null);
  const [isComplete, setIsComplete] = useState(false);

  // Function to create wave path
  const createWavePath = (y: number, phase: number = 0): string => {
    const amplitude = 25;
    const wave1 = y + Math.sin(phase) * amplitude;
    const wave2 = y + Math.sin(phase + Math.PI * 0.5) * amplitude;
    const wave3 = y + Math.sin(phase + Math.PI) * amplitude;

    return `M0,${wave1} Q100,${wave2} 200,${wave3} T400,${wave1} Q500,${wave2} 600,${wave3} T800,${wave1} L800,900 L0,900 Z`;
  };

  useGSAP(
    () => {
      const tl = gsap.timeline({
        onComplete: () => {
          setIsComplete(true);
          onComplete?.();
        },
      });

      // Show loading text immediately
      tl.to(loadingTextRef.current, {
        opacity: 1,
        duration: 0.3,
        delay: 0,
      });

      // Animate liquid filling from bottom to top with continuous wave
      tl.to(
        {},
        {
          duration: 7,
          onUpdate: function () {
            const progress = this.progress();
            const y = 500 - progress * 500;
            const phase = progress * Math.PI * 8;
            const wavePath = createWavePath(y, phase);
            wavePathRef.current?.setAttribute("d", wavePath);
          },
          ease: "power2.inOut",
        },
        "+=0.1"
      );

      // Update loading percentage from 0 to 100
      tl.to(
        {},
        {
          duration: 2,
          onUpdate: function () {
            const progress = Math.round(this.progress() * 100);
            if (loadingTextRef.current) {
              loadingTextRef.current.textContent = `loading... ${progress} %`;
            }
          },
        },
        "-=4"
      );

      // Fade out loading text
      tl.to(
        loadingTextRef.current,
        {
          opacity: 0,
          duration: 0.3,
        },
        "-=0.3"
      );

      // Zoom out and fade the text smoothly
      tl.to(
        svgRef.current,
        {
          scale: 3,
          opacity: 0,
          duration: 1.5,
          ease: "power2.inOut",
        },
        "-=0.1"
      );
    },
    { scope: containerRef }
  );

  // Hide preloader after animation completes
  if (isComplete) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-9999 flex items-center justify-center bg-[#0a0a0a]"
    >
      <svg
        ref={svgRef}
        viewBox="0 0 800 400"
        className="w-full max-w-[90vw] h-auto px-4 sm:w-[800px] sm:h-[400px] flex flex-col"
      >
        <defs>
          <clipPath id="liquidClip">
            <path
              ref={wavePathRef}
              d="M0,500 Q200,480 400,500 T800,500 L800,900 L0,900 Z"
              fill="white"
            />
          </clipPath>

          <filter id="goo">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="10"
              result="blur"
            />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
              result="goo"
            />
          </filter>
        </defs>

        {/* Background text (gray fill) */}
        <text
          x="400"
          y="250"
          textAnchor="middle"
          className="fill-[#333] stroke-none text-[180px] font-inter"
          fontWeight="900"
        >
          FA Media
        </text>

        {/* Filled text (with liquid clip) */}
        <text
          x="400"
          y="250"
          textAnchor="middle"
          className="fill-white stroke-none text-[180px] font-inter"
          style={{ clipPath: "url(#liquidClip)" }}
          fontWeight="900"
        >
          FA Media
        </text>

        <text
          ref={loadingTextRef}
          x="99.9%"
          y="68%"
          textAnchor="end"
          className="text-sm font-light opacity-0 font-inter"
          fill="white"
        >
          loading... 0 %
        </text>
      </svg>
    </div>
  );
}
