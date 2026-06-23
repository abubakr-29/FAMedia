"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const founders = [
  {
    name: "Faraz Khan",
    role: "Founder & Designer",
    image: "/FarazKhan_Profile.webp",
    linkedin: "https://www.linkedin.com/in/-faraz-khan-/",
    bio: "Faraz is building FA Media to fix how businesses exist online. Most agencies build pretty things — FA Media builds systems that grow companies. As Founder & Creative Director, he oversees strategy and ensures every project combines design, technology, and marketing with purpose.",
    reverse: false,
  },
  {
    name: "MD. Mustaffa Aman",
    role: "Co-Founder & Marketing Strategist",
    image: "/MustaffaAman_Profile.webp",
    linkedin: "https://www.instagram.com/aman.mustaffa/",
    bio: "Aman is the connective tissue between ideas and outcomes. With an instinct for positioning and a natural ability to read rooms and win people over, he drives FA Media's growth strategy, client relationships, and brand narrative — turning vision into momentum.",
    reverse: true,
  },
  {
    name: "Abu Bakr Ahmed",
    role: "Co-Founder & Full Stack Developer",
    image: "/AbuBakrAhmed_Profile.webp",
    linkedin: "https://www.linkedin.com/in/abu-bakr-ahmed-01a9532bb/",
    bio: "Abu Bakr handles the engineering at FA Media. Full stack across React, Node.js, PostgreSQL, and MongoDB — he builds backends that hold and frontends that perform. Quietly expanding into AI/ML on the side.",
    reverse: false,
  },
];

function FounderCard({
  founder,
  index,
}: {
  founder: (typeof founders)[0];
  index: number;
}) {
  const rowRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: rowRef.current,
        start: "top 82%",
        end: "top 35%",
        scrub: 2,
      },
    });

    tl.fromTo(
      imageRef.current,
      { autoAlpha: 0, x: founder.reverse ? 60 : -60 },
      { autoAlpha: 1, x: 0, duration: 0.7, ease: "power2.out" },
      0,
    );

    tl.fromTo(
      textRef.current,
      { autoAlpha: 0, x: founder.reverse ? -60 : 60 },
      { autoAlpha: 1, x: 0, duration: 0.7, ease: "power2.out" },
      0.15,
    );
  });

  return (
    <div
      ref={rowRef}
      className={`flex flex-col md:flex-row ${
        founder.reverse ? "md:flex-row-reverse" : ""
      } items-center gap-8 md:gap-12`}
    >
      {/* Image side */}
      <div ref={imageRef} className="shrink-0">
        <Link
          href={founder.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor-text="See More"
          className="block group relative"
        >
          <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-2xl overflow-hidden border border-stone-800 group-hover:border-[#54d265] transition-colors duration-300">
            <Image
              src={founder.image}
              alt={founder.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          {/* Green accent bar */}
          <div className="absolute -bottom-3 left-4 right-4 h-0.5 bg-[#54d265] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </Link>
      </div>

      {/* Text side */}
      <div
        ref={textRef}
        className={`flex-1 border-l-2 border-[#54d265] pl-6 ${
          founder.reverse
            ? "md:border-l-0 md:border-r-2 md:pl-0 md:pr-6 md:text-right"
            : ""
        }`}
      >
        <span className="font-inter text-xs text-[#54d265] tracking-widest uppercase mb-1 block">
          0{index + 1}
        </span>
        <h3 className="font-antonio text-2xl md:text-3xl text-stone-100 mb-1">
          {founder.name}
        </h3>
        <p className="font-inter text-sm text-[#54d265] mb-3">{founder.role}</p>
        <p className="font-inter text-sm text-stone-400 leading-relaxed">
          {founder.bio}
        </p>
      </div>
    </div>
  );
}

export default function AboutUsRight() {
  return (
    <div className="font-inter flex flex-col gap-14 md:gap-16">
      {founders.map((founder, i) => (
        <FounderCard key={founder.name} founder={founder} index={i} />
      ))}
    </div>
  );
}
