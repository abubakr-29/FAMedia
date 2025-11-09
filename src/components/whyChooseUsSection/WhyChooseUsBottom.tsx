"use client";

import { useRef, useLayoutEffect, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register the plugins
gsap.registerPlugin(useGSAP, ScrollTrigger);

interface Card {
  title: string;
  desc: string;
  position: string;
  delay: number;
}

interface CenterPoint {
  x: number;
  y: number;
  height: number;
}

interface VerticalLine {
  x: number;
  y1: number;
  y2: number;
}

interface Connector {
  x1: number;
  y: number;
  x2: number;
}

interface LineData {
  verticalLine: VerticalLine;
  connectors: Connector[];
}

const cards: Card[] = [
  {
    title: "Old, Boring Website",
    desc: "Your website feels outdated and uninspiring, failing to capture attention or reflect your brand's true potential. Visitors leave before they even get to know you.",
    position: "top-0 left-0",
    delay: 0.3,
  },
  {
    title: "No Focus on Pain Points",
    desc: "Your website doesn't address your audience's real challenges or offer clear, uplifting solutions. This disconnect keeps visitors from taking action.",
    position: "top-64 left-0",
    delay: 0.4,
  },
  {
    title: "Generic Templates That Blend In",
    desc: "Using cookie-cutter templates makes your site look like everyone else's. You're not standing out in a crowded market, and your unique value gets lost.",
    position: "top-32 right-0",
    delay: 0.5,
  },
  {
    title: "Lacking Optimistic Solutions and Impactful Copywriting",
    desc: "Without clear, uplifting solutions and compelling copywriting, your website fails to inspire confidence or motivate visitors to take action.",
    position: "top-96 right-0",
    delay: 0.6,
  },
];

export default function WhyChooseUsBottom() {
  const leftRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rightRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const verticalLineRef = useRef<SVGLineElement>(null);
  const connectorRefs = useRef<(SVGLineElement | null)[]>([]);

  const [lineData, setLineData] = useState<LineData | null>(null);

  useLayoutEffect(() => {
    const getCenter = (element: HTMLDivElement | null): CenterPoint => {
      if (!element) return { x: 0, y: 0, height: 0 };
      const rect = element.getBoundingClientRect();
      return {
        x: rect.right,
        y: rect.top + rect.height / 2,
        height: rect.height,
      };
    };

    const getRightCenter = (element: HTMLDivElement | null): CenterPoint => {
      if (!element) return { x: 0, y: 0, height: 0 };
      const rect = element.getBoundingClientRect();
      return {
        x: rect.left,
        y: rect.top + rect.height / 2,
        height: rect.height,
      };
    };

    if (!containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const lefts = leftRefs.current.map(getCenter);
    const rights = rightRefs.current.map(getRightCenter);

    const offset = 90;
    const verticalLine: VerticalLine = {
      x: (containerRect.left + containerRect.right) / 2 - containerRect.left,
      y1: lefts[0].y - containerRect.top - offset,
      y2: rights[1].y - containerRect.top + offset,
    };

    const connectors: Connector[] = [
      {
        x1: lefts[0].x - containerRect.left,
        y: lefts[0].y - containerRect.top,
        x2: verticalLine.x,
      },
      {
        x1: lefts[1].x - containerRect.left,
        y: lefts[1].y - containerRect.top,
        x2: verticalLine.x,
      },
      {
        x1: verticalLine.x,
        y: rights[0].y - containerRect.top,
        x2: rights[0].x - containerRect.left,
      },
      {
        x1: verticalLine.x,
        y: rights[1].y - containerRect.top,
        x2: rights[1].x - containerRect.left,
      },
    ];

    setLineData({ verticalLine, connectors });
  }, []);

  // GSAP animations using useGSAP hook with ScrollTrigger
  useGSAP(
    () => {
      if (!lineData) return;

      // Create a timeline for coordinated animations
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          end: "top 20%",
          scrub: 2,
        },
      });

      // Animate vertical line
      if (verticalLineRef.current) {
        tl.fromTo(
          verticalLineRef.current,
          {
            attr: {
              y2: lineData.verticalLine.y1,
            },
          },
          {
            attr: {
              y2: lineData.verticalLine.y2,
            },
            duration: 0.8,
            ease: "power2.inOut",
          },
          0
        );
      }

      // Animate connector lines
      connectorRefs.current.forEach((line, i) => {
        if (line) {
          const connector = lineData.connectors[i];
          tl.fromTo(
            line,
            {
              attr: {
                x2: connector.x1,
              },
            },
            {
              attr: {
                x2: connector.x2,
              },
              duration: 0.5,
              ease: "power2.out",
            },
            0.8 + i * 0.1
          );
        }
      });

      // Animate left cards
      leftRefs.current.forEach((card, i) => {
        if (card) {
          tl.fromTo(
            card,
            {
              autoAlpha: 0,
              scale: 0.9,
            },
            {
              autoAlpha: 1,
              scale: 1,
              duration: 0.5,
              ease: "power2.out",
            },
            cards[i].delay
          );
        }
      });

      // Animate right cards
      rightRefs.current.forEach((card, i) => {
        if (card) {
          tl.fromTo(
            card,
            {
              autoAlpha: 0,
              scale: 0.9,
            },
            {
              autoAlpha: 1,
              scale: 1,
              duration: 0.5,
              ease: "power2.out",
            },
            cards[i + 2].delay
          );
        }
      });
    },
    {
      dependencies: [lineData],
      scope: containerRef,
    }
  );

  return (
    <div
      ref={containerRef}
      className="font-inter relative w-full max-w-[1200px] mx-auto py-20"
      style={{ minHeight: 600 }}
    >
      {lineData && (
        <svg
          className="absolute left-0 top-0 w-full h-full pointer-events-none z-0"
          style={{ overflow: "visible" }}
        >
          <line
            ref={verticalLineRef}
            x1={lineData.verticalLine.x}
            y1={lineData.verticalLine.y1}
            x2={lineData.verticalLine.x}
            y2={lineData.verticalLine.y1}
            stroke="#e4e4e4"
            strokeWidth={2}
          />

          {lineData.connectors.map((c, i) => (
            <line
              key={i}
              ref={(el) => {
                connectorRefs.current[i] = el;
              }}
              x1={c.x1}
              y1={c.y}
              x2={c.x1}
              y2={c.y}
              stroke="#e4e4e4"
              strokeWidth={2}
            />
          ))}
        </svg>
      )}

      <div className="relative h-full">
        <div
          ref={(el) => {
            leftRefs.current[0] = el;
          }}
          className="absolute top-0 left-0 w-[450px] opacity-0"
        >
          <div className="bg-[#1a1a1a] rounded-2xl p-6 border-2 border-[#e4e4e4]">
            <div className="flex items-center gap-3 mb-2">
              <Image
                src={"/whychooseus/sadface.webp"}
                width={40}
                height={40}
                alt="Sad Emoji"
                className="w-10 h-10"
              />
              <h3 className="text-lg text-stone-200 font-semibold">
                {cards[0].title}
              </h3>
            </div>
            <p className="text-stone-300 text-sm">{cards[0].desc}</p>
          </div>
        </div>

        <div
          ref={(el) => {
            leftRefs.current[1] = el;
          }}
          className="absolute top-64 left-0 w-[450px] opacity-0"
        >
          <div className="bg-[#1a1a1a] rounded-2xl p-6 border-2 border-[#e4e4e4]">
            <div className="flex items-center gap-3 mb-2">
              <Image
                src={"/whychooseus/sadface.webp"}
                width={40}
                height={40}
                alt="Sad Emoji"
                className="w-10 h-10"
              />
              <h3 className="text-lg text-stone-200 font-semibold">
                {cards[1].title}
              </h3>
            </div>
            <p className="text-stone-300 text-sm">{cards[1].desc}</p>
          </div>
        </div>

        <div
          ref={(el) => {
            rightRefs.current[0] = el;
          }}
          className="absolute top-32 right-0 w-[450px] opacity-0"
        >
          <div className="bg-[#1a1a1a] rounded-2xl p-6 border-2 border-[#e4e4e4]">
            <div className="flex items-center gap-3 mb-2">
              <Image
                src={"/whychooseus/sadface.webp"}
                width={40}
                height={40}
                alt="Sad Emoji"
                className="w-10 h-10"
              />
              <h3 className="text-lg text-stone-200 font-semibold">
                {cards[2].title}
              </h3>
            </div>
            <p className="text-stone-300 text-sm">{cards[2].desc}</p>
          </div>
        </div>

        <div
          ref={(el) => {
            rightRefs.current[1] = el;
          }}
          className="absolute top-96 right-0 w-[450px] opacity-0"
        >
          <div className="bg-[#1a1a1a] rounded-2xl p-6 border-2 border-[#e4e4e4]">
            <div className="flex items-center gap-3 mb-2">
              <Image
                src={"/whychooseus/sadface.webp"}
                width={40}
                height={40}
                alt="Sad Emoji"
                className="w-10 h-10"
              />
              <h3 className="text-lg text-stone-200 font-semibold">
                {cards[3].title}
              </h3>
            </div>
            <p className="text-stone-300 text-sm">{cards[3].desc}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
