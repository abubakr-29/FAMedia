"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ContactForm from "./ContactForm";

// Register plugins
gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const formContainerRef = useRef<HTMLDivElement>(null);
  const infoContainerRef = useRef<HTMLDivElement>(null);
  const illustrationRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "top 20%",
          scrub: 2,
        },
      });

      // Animate title
      if (titleRef.current) {
        tl.fromTo(
          titleRef.current,
          { autoAlpha: 0, y: -50 },
          { autoAlpha: 1, y: 0, duration: 0.6, ease: "power2.out" },
          0
        );
      }

      // Animate subtitle
      if (subtitleRef.current) {
        tl.fromTo(
          subtitleRef.current,
          { autoAlpha: 0, y: -30 },
          { autoAlpha: 1, y: 0, duration: 0.6, ease: "power2.out" },
          0.1
        );
      }

      // Animate form container
      if (formContainerRef.current) {
        tl.fromTo(
          formContainerRef.current,
          { autoAlpha: 0, x: -50 },
          { autoAlpha: 1, x: 0, duration: 0.8, ease: "power2.out" },
          0.2
        );
      }

      // Animate info container
      if (infoContainerRef.current) {
        tl.fromTo(
          infoContainerRef.current,
          { autoAlpha: 0, x: 50 },
          { autoAlpha: 1, x: 0, duration: 0.8, ease: "power2.out" },
          0.3
        );
      }

      // Animate illustration
      if (illustrationRef.current) {
        gsap.to(illustrationRef.current, {
          y: -20,
          duration: 2,
          ease: "power1.inOut",
          repeat: -1,
          yoyo: true,
        });
      }
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="font-inter py-20 mx-4 px-4 relative overflow-hidden bg-linear-to-b from-black via-[#0a0a0a] to-black rounded-3xl"
      id="contact"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2
            ref={titleRef}
            className="font-antonio text-4xl md:text-5xl font-bold mb-4 text-stone-200"
          >
            Let&apos;s <span className="text-[#54d265]">Connect</span>
          </h2>
          <p
            ref={subtitleRef}
            className="text-stone-300 text-lg max-w-2xl mx-auto opacity-0"
          >
            Got a project or idea in mind? Drop a message — we&apos;re just a
            few clicks away!
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Form Container */}
          <div
            ref={formContainerRef}
            className="bg-linear-to-br from-[#1a1a1a] to-[#0f0f0f] rounded-3xl p-8 md:p-10 border border-stone-800/50 shadow-2xl opacity-0"
          >
            <h3 className="text-2xl font-semibold text-stone-300 mb-6">
              Get In Touch
            </h3>
            <ContactForm />
          </div>

          {/* Info Container */}
          <div ref={infoContainerRef} className="space-y-8 opacity-0">
            {/* Illustration */}
            <div ref={illustrationRef} className="flex justify-center mb-8">
              <div className="relative">
                <div className="absolute inset-0 bg-linear-to-r from-green-500/20 to-lime-500/20 rounded-full blur-2xl" />
                <div className="relative bg-linear-to-br from-[#54d265] to-[#2d9f42] rounded-full p-12 w-64 h-64 flex items-center justify-center">
                  <svg
                    className="w-32 h-32 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              {/* Email */}
              <div className="flex items-center gap-4 p-4 bg-linear-to-r from-stone-900/50 to-transparent rounded-xl border border-stone-800/30 hover:border-stone-700/50 transition-all duration-300 group">
                <div className="shrink-0 w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center text-stone-300 group-hover:scale-110 transition-transform">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="#54d269"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <a
                  href="mailto:support@famedia.co.in"
                  className="text-stone-300 hover:text-white transition-colors"
                >
                  support@famedia.co.in
                </a>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-4 p-4 bg-linear-to-r from-stone-900/50 to-transparent rounded-xl border border-stone-800/30 hover:border-stone-700/50 transition-all duration-300 group">
                <div className="shrink-0 w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center text-stone-300 group-hover:scale-110 transition-transform">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="#54d269"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <a
                  href="tel:+919007873303"
                  className="text-stone-300 hover:text-white transition-colors"
                >
                  +91 90078 73303
                </a>
              </div>

              {/* Location */}
              <div className="flex items-center gap-4 p-4 bg-linear-to-r from-stone-900/50 to-transparent rounded-xl border border-stone-800/30 hover:border-stone-700/50 transition-all duration-300 group">
                <div className="shrink-0 w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center text-stone-300 group-hover:scale-110 transition-transform">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="#54d269"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <span className="text-stone-300">Kolkata, India</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
