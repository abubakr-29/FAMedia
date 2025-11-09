"use client";

import Link from "next/link";
import LiquidEther from "./LiquidEther";
import { useState } from "react";
import Image from "next/image";

export default function Hero() {
  const [hoveredTestimonial, setHoveredTestimonial] = useState<number | null>(
    null
  );

  return (
    <section
      id="hero"
      style={{ width: "100%", height: "100vh", position: "relative" }}
    >
      <LiquidEther
        colors={["#FFFFFF", "#F8F9FA", "#E8F4F8"]}
        mouseForce={25}
        cursorSize={100}
        isViscous={false}
        viscous={30}
        iterationsViscous={32}
        iterationsPoisson={32}
        resolution={0.5}
        isBounce={false}
        autoDemo={true}
        autoSpeed={0.5}
        autoIntensity={2.2}
        takeoverDuration={0.25}
        autoResumeDelay={3000}
        autoRampDuration={0.6}
      />

      <style jsx>{`
        @keyframes slow-bounce {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }
        .animate-slow-bounce {
          animation: slow-bounce 3s ease-in-out infinite;
        }
      `}</style>

      {/* Floating Testimonial 1 - Bottom Left */}
      <div
        className="hidden lg:block absolute bottom-45 left-40 z-10 animate-slow-bounce cursor-pointer"
        onMouseEnter={() => setHoveredTestimonial(1)}
        onMouseLeave={() => setHoveredTestimonial(null)}
      >
        <div className="relative">
          {/* Logo */}
          <Image
            src="/thecombatgymlogo.webp"
            alt="The Combat Gym Logo"
            width={55}
            height={55}
          />

          {/* Testimonial Card */}
          <div
            className={`absolute bottom-full left-0 mb-4 w-64 bg-[#F8F9FA] rounded-2xl shadow-xl p-4 transition-all duration-300 ${
              hoveredTestimonial === 1
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-2 pointer-events-none"
            }`}
          >
            <p className="font-inter text-xs text-black leading-relaxed">
              Our new website feels like a punch of energy — bold, fast, and
              on-brand. FA Media understood the gym vibe better than we did.
            </p>
          </div>
        </div>
      </div>

      {/* Floating Testimonial 2 - Top Right */}
      <div
        className="hidden lg:block absolute top-55 right-50 z-10 animate-slow-bounce cursor-pointer"
        onMouseEnter={() => setHoveredTestimonial(2)}
        onMouseLeave={() => setHoveredTestimonial(null)}
      >
        <div className="relative">
          {/* Logo */}
          <Image
            src="/mhinteriorslogo.webp"
            alt="MH Interiors Logo"
            width={55}
            height={55}
          />

          {/* Testimonial Card */}
          <div
            className={`absolute top-full right-0 mt-4 w-64 bg-[#F8F9FA] rounded-2xl shadow-xl p-4 transition-all duration-300 ${
              hoveredTestimonial === 2
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-2 pointer-events-none"
            }`}
          >
            <p className="font-inter text-xs text-black leading-relaxed">
              FA Media turned our vision into a digital masterpiece. The design
              captures our aesthetic and speaks directly to our clients.
            </p>
          </div>
        </div>
      </div>

      {/* Content Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none space-y-6 px-4">
        <p className="uppercase text-stone-200 tracking-widest text-xs sm:text-sm md:text-base">
          Grow your brand. Own your voice.
        </p>
        <h1 className="uppercase font-antonio font-bold tracking-tigther sm:tracking-normal text-3xl sm:text-4xl md:text-6xl lg:text-7xl leading-tight text-[#54d265] text-center">
          Beyond Website <br className="hidden md:block" /> We Build Brand
        </h1>
        <p className="text-sm sm:text-base md:text-lg text-stone-200 max-w-xl">
          You focus on your growth. FA Media will handle everything
          <br className="hidden md:block" />- design, copy, and strategy.
        </p>
        <Link
          href={"https://calendly.com/famediacoin"}
          className="p-[3px] relative group cursor-pointer inline-block pointer-events-auto"
          target="_blank"
          rel="noopener noreferrer"
          data-cursor-text="Click Me"
        >
          <div className="absolute inset-0 bg-linear-to-r from-[#54d265] to-[#2d9f42] rounded-lg transition duration-500" />
          <div className="px-4 sm:px-6 py-2 text-sm sm:text-lg bg-white rounded-md relative text-black transition duration-500 group-hover:bg-transparent group-hover:text-white">
            BOOK A CALL NOW
          </div>
        </Link>
      </div>
    </section>
  );
}
