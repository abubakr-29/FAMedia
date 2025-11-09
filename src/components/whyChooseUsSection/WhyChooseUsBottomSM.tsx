"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register plugins
gsap.registerPlugin(useGSAP, ScrollTrigger);

interface Card {
  title: string;
  desc: string;
}

const cards: Card[] = [
  {
    title: "Old, Boring Website",
    desc: "Your website feels outdated and uninspiring, failing to capture attention or reflect your brand's true potential. Visitors leave before they even get to know you.",
  },
  {
    title: "No Focus on Pain Points",
    desc: "Your website doesn't address your audience's real challenges or offer clear, uplifting solutions. This disconnect keeps visitors from taking action.",
  },
  {
    title: "Generic Templates That Blend In",
    desc: "Using cookie-cutter templates makes your site look like everyone else's. You're not standing out in a crowded market, and your unique value gets lost.",
  },
  {
    title: "Lacking Optimistic Solutions and Impactful Copywriting",
    desc: "Without clear, uplifting solutions and compelling copywriting, your website fails to inspire confidence or motivate visitors to take action.",
  },
];

export default function WhyChooseUsBottomSM() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      cardRefs.current.forEach((card, i) => {
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
              delay: i * 0.15,
              ease: "power2.out",
              scrollTrigger: {
                trigger: card,
                start: "top 80%",
                end: "top 20%",
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
    <div
      ref={containerRef}
      className="font-inter w-full max-w-md mx-auto py-10 flex flex-col gap-6"
    >
      {cards.map((card, i) => (
        <div
          key={card.title}
          ref={(el) => {
            cardRefs.current[i] = el;
          }}
          className="bg-[#1a1a1a] rounded-2xl p-6 border-2 border-[#e4e4e4] flex flex-col items-center shadow-lg opacity-0"
        >
          <div className="flex flex-col items-center gap-2 mb-2">
            <Image
              src={"/whychooseus/sadface.webp"}
              width={40}
              height={40}
              alt="Sad Emoji"
              className="w-10 h-10"
            />
            <h3 className="text-lg text-stone-300 font-semibold text-center">
              {card.title}
            </h3>
          </div>
          <p className="text-stone-400 text-sm text-center">{card.desc}</p>
        </div>
      ))}
    </div>
  );
}
