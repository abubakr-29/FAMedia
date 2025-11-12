"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Register plugins
gsap.registerPlugin(useGSAP, ScrollTrigger);

interface CountUpProps {
  end: number;
  duration?: number;
  suffix?: string;
  trigger?: boolean;
}

function CountUp({
  end,
  duration = 1.2,
  suffix = "",
  trigger = false,
}: CountUpProps) {
  const [count, setCount] = useState<number | string>(0);
  const ref = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (!trigger) return;

    const start = 0;
    let startTimestamp: number | null = null;
    const isInt = Number.isInteger(end);

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min(
        (timestamp - startTimestamp) / (duration * 1000),
        1
      );
      const value = isInt
        ? Math.floor(progress * (end - start) + start)
        : (progress * (end - start) + start).toFixed(1);
      setCount(value);
      if (progress < 1) ref.current = requestAnimationFrame(step);
      else setCount(isInt ? end : end.toFixed(1));
    };

    ref.current = requestAnimationFrame(step);
    return () => {
      if (ref.current) cancelAnimationFrame(ref.current);
    };
  }, [trigger, end, duration]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

interface InformationItem {
  value: number | string;
  suffix?: string;
  text: string;
  subtext: string;
  animate: boolean;
}

const information: InformationItem[] = [
  {
    value: 10,
    suffix: "+",
    text: "Projects Delivered",
    subtext: "Custom-built websites for real businesses",
    animate: true,
  },
  {
    value: 100,
    suffix: "%",
    text: "Custom Code",
    subtext: "No templates, no fluff. Real development.",
    animate: true,
  },
  {
    value: "Built for Scale",
    text: "",
    subtext: "Ready to implement AI & automations",
    animate: false,
  },
];

export default function SubHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [triggered, setTriggered] = useState(false);

  useGSAP(
    () => {
      const items = gsap.utils.toArray<HTMLElement>(".info-item");

      gsap.from(items, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          once: true,
          onEnter: () => setTriggered(true),
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="w-full px-0 md:px-4 flex flex-col lg:flex-row justify-center items-center my-20"
    >
      <div className="flex flex-col sm:flex-row w-full max-w-5xl justify-between items-center text-center gap-8 sm:gap-0">
        {information.map((info, index) => (
          <div
            key={index}
            className="info-item font-inter flex flex-col items-center w-full relative px-4"
          >
            <p
              className={`font-antonio text-stone-200 text-2xl md:text-3xl font-bold mb-1 ${
                index === 2 ? "uppercase" : ""
              }`}
            >
              {info.animate && typeof info.value === "number" ? (
                <CountUp
                  end={info.value}
                  suffix={info.suffix}
                  trigger={triggered}
                />
              ) : (
                info.value
              )}
            </p>
            <p className="text-stone-300 text-base font-semibold mb-1 uppercase tracking-wide">
              {info.text}
            </p>
            <p className="text-stone-400 text-xs sm:text-sm md:text-md leading-snug">
              {info.subtext}
            </p>

            {index < information.length - 1 && (
              <span className="hidden sm:block absolute right-0 top-1/2 -translate-y-1/2 h-12 border-r-2 border-[#54d265]" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
