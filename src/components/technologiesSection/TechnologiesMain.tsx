"use client";

import { useRef } from "react";
import Image from "next/image";
import { RiNextjsLine } from "react-icons/ri";
import { BiLogoPostgresql } from "react-icons/bi";
import { RiTailwindCssFill } from "react-icons/ri";
import { FaNodeJs } from "react-icons/fa6";
import { RiReactjsLine } from "react-icons/ri";
import { SiMongodb } from "react-icons/si";
import { BiLogoTypescript } from "react-icons/bi";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register plugins
gsap.registerPlugin(useGSAP, ScrollTrigger);

interface Technology {
  icon: React.ReactNode;
  duration: number;
  color?: string;
}

export default function TechnologiesMain() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const iconsContainerRef = useRef<HTMLDivElement>(null);
  const iconRefs = useRef<(HTMLDivElement | null)[]>([]);

  const technologies: Technology[] = [
    {
      icon: <RiNextjsLine className="text-7xl text-[#FFFFFF]" />,
      duration: 3.5,
    },
    {
      icon: <RiReactjsLine className="text-7xl text-[#61DAFB]" />,
      duration: 2.5,
    },
    {
      icon: <SiMongodb className="text-7xl text-[#13AA52]" />,
      duration: 5,
    },
    {
      icon: <RiTailwindCssFill className="text-7xl text-[#38BDF8]" />,
      duration: 2,
    },
    {
      icon: <FaNodeJs className="text-7xl text-[#43853d]" />,
      duration: 6,
    },
    {
      icon: <BiLogoPostgresql className="text-7xl text-[#336791]" />,
      duration: 4,
    },
    {
      icon: (
        <Image
          src="/figmalogo.webp"
          alt="Figma Logo"
          width={50}
          height={50}
          style={{ width: "auto", height: "60px" }}
        />
      ),
      duration: 3,
    },
    {
      icon: <BiLogoTypescript className="text-7xl text-[#3178C6]" />,
      duration: 4,
    },
  ];

  useGSAP(
    () => {
      // Animate title
      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current,
          {
            autoAlpha: 0,
            y: -50,
          },
          {
            autoAlpha: 1,
            y: 0,
            duration: 1.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: titleRef.current,
              start: "top 80%",
              end: "top 30%",
              scrub: 2,
            },
          }
        );
      }

      // Animate icons container
      if (iconsContainerRef.current) {
        gsap.fromTo(
          iconsContainerRef.current,
          {
            autoAlpha: 0,
            scale: 0.9,
          },
          {
            autoAlpha: 1,
            scale: 1,
            duration: 1.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: iconsContainerRef.current,
              start: "top 80%",
              end: "top 30%",
              scrub: 1,
            },
          }
        );
      }

      // Animate individual icons with floating effect
      iconRefs.current.forEach((icon, i) => {
        if (icon) {
          gsap.to(icon, {
            y: -10,
            duration: technologies[i].duration,
            ease: "linear",
            repeat: -1,
            yoyo: true,
          });
        }
      });
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="pb-14 px-4">
      <h2
        ref={titleRef}
        className="font-antonio my-16 text-center text-4xl md:text-5xl opacity-0 text-stone-200"
      >
        Technologies
      </h2>
      <div
        ref={iconsContainerRef}
        className="flex flex-wrap items-center justify-center gap-4 opacity-0"
      >
        {technologies.map((tech, i) => (
          <div
            key={i}
            ref={(el) => {
              iconRefs.current[i] = el;
            }}
            className="p-4"
          >
            {tech.icon}
          </div>
        ))}
      </div>
    </div>
  );
}
