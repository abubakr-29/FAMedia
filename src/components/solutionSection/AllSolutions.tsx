"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register plugins
gsap.registerPlugin(useGSAP, ScrollTrigger);

interface Card {
  icon: string;
  title: string;
  desc: string;
}

const cards: Card[] = [
  {
    icon: "/whychooseus/goal.webp",
    title: "We Understand Your Goals",
    desc: "We start by diving deep into your business, vision, and objectives to ensure your website aligns perfectly with what you want to achieve.",
  },
  {
    icon: "/whychooseus/research.webp",
    title: "In-Depth User Research",
    desc: "We study your audience to understand their needs, behaviors, and preferences, creating a website that truly connects with the people you want to reach.",
  },
  {
    icon: "/whychooseus/challenges.webp",
    title: "Pinpoint Your Audience's Challenges",
    desc: "We pinpoint your audience's biggest challenges and address them with clear, positive solutions, turning doubts into confidence and visitors into customers.",
  },
  {
    icon: "/whychooseus/copywriting.webp",
    title: "Excellent Copywriting",
    desc: "Our words don't just inform—they inspire. We craft compelling copy that speaks directly to your audience, driving engagement and action.",
  },
  {
    icon: "/whychooseus/solutions.webp",
    title: "Positive Solutions That Convert",
    desc: "We provide clear, optimistic solutions that turn doubts into confidence, transforming visitors into loyal customers.",
  },
  {
    icon: "/whychooseus/customdevelopment.webp",
    title: "Custom Design & Development",
    desc: "From stunning visuals to seamless functionality, we design and build a fully customized website that's beautiful, user-friendly, and built to perform.",
  },
];

export default function AllSolutions() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      cardRefs.current.forEach((card) => {
        if (card) {
          gsap.fromTo(
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
              scrollTrigger: {
                trigger: card,
                start: "top 80%",
                end: "top 30%",
                scrub: 2,
              },
            }
          );
        }
      });
    },
    { scope: containerRef }
  );

  return (
    <div className="font-inter w-full max-w-5xl mx-auto pt-12 lg:pt-0 px-2">
      <div
        ref={containerRef}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full max-w-md lg:max-w-full mx-auto"
      >
        {cards.map((card, i) => (
          <div
            key={card.title}
            ref={(el) => {
              cardRefs.current[i] = el;
            }}
            className="bg-[#1e1e1e] rounded-2xl p-6 border border-stone-500 flex flex-col shadow-lg opacity-0"
          >
            <div className="flex flex-col sm:flex-row items-center gap-3 mb-2">
              <Image
                src={card.icon}
                alt={card.title}
                width={64}
                height={64}
                className="w-16 sm:w-12"
              />
              <h3 className="text-lg text-stone-200 font-semibold text-center sm:text-left">
                {card.title}
              </h3>
            </div>
            <p className="text-stone-300 text-sm text-center sm:text-left">
              {card.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
