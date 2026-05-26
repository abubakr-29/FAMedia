"use client";

import { useRef } from "react";
import Link from "next/link";
import { BsRobot } from "react-icons/bs";
import { MessageSquare, Zap, Users, Clock } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const stats = [
  {
    icon: <Clock className="h-5 w-5 text-[#54d265]" />,
    label: "24/7 availability",
    value: "Always On",
  },
  {
    icon: <Zap className="h-5 w-5 text-[#54d265]" />,
    label: "Instant replies",
    value: "< 1s response",
  },
  {
    icon: <Users className="h-5 w-5 text-[#54d265]" />,
    label: "Lead capture built-in",
    value: "Auto collect",
  },
];

// Fake chat bubbles for the mock conversation UI
const chatBubbles = [
  { role: "user", text: "Do you offer free consultations?" },
  {
    role: "bot",
    text: "Yes! We offer a free 30-minute strategy call. Would you like to book one?",
  },
  { role: "user", text: "What's your pricing?" },
  {
    role: "bot",
    text: "Our plans start at ₹1,499/month. I can send you the full breakdown — what's your email?",
  },
];

export default function ChatbotPromo() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          end: "top 30%",
          scrub: 1.5,
        },
      });

      tl.fromTo(
        headingRef.current,
        { autoAlpha: 0, y: 40 },
        { autoAlpha: 1, y: 0, duration: 0.6, ease: "power3.out" },
      )
        .fromTo(
          subRef.current,
          { autoAlpha: 0, y: 20 },
          { autoAlpha: 1, y: 0, duration: 0.5, ease: "power2.out" },
          "-=0.3",
        )
        .fromTo(
          statsRef.current,
          { autoAlpha: 0, y: 20 },
          { autoAlpha: 1, y: 0, duration: 0.5, ease: "power2.out" },
          "-=0.2",
        )
        .fromTo(
          chatRef.current,
          { autoAlpha: 0, scale: 0.94 },
          { autoAlpha: 1, scale: 1, duration: 0.6, ease: "power2.out" },
          "-=0.3",
        )
        .fromTo(
          ctaRef.current,
          { autoAlpha: 0, y: 16 },
          { autoAlpha: 1, y: 0, duration: 0.4, ease: "power2.out" },
          "-=0.2",
        );

      // Glow pulse
      gsap.to(glowRef.current, {
        opacity: 0.35,
        scale: 1.08,
        duration: 2.5,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="chatbot"
      className="py-20 px-4 lg:px-24 relative overflow-hidden"
    >
      {/* Background glow */}
      <div
        ref={glowRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-20 pointer-events-none"
        style={{
          background: "radial-gradient(circle, #54d265 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* LEFT — Copy */}
        <div className="space-y-8">
          {/* Label */}
          <div className="inline-flex items-center gap-2 bg-[#54d26515] border border-[#54d26530] rounded-full px-4 py-1.5">
            <BsRobot className="h-4 w-4 text-[#54d265]" />
            <span className="text-xs font-inter uppercase tracking-widest text-[#54d265]">
              New — AI Chatbot
            </span>
          </div>

          {/* Heading */}
          <h2
            ref={headingRef}
            className="font-antonio font-bold uppercase text-4xl sm:text-5xl lg:text-6xl leading-tight text-stone-100"
          >
            Your Website
            <br />
            <span className="text-[#54d265]">Talks Back</span>
          </h2>

          {/* Subtext */}
          <p
            ref={subRef}
            className="font-inter text-stone-400 text-base sm:text-lg max-w-md leading-relaxed"
          >
            Drop few lines of code. Your site starts answering questions,
            capturing leads, and booking calls — while you sleep.
          </p>

          {/* Stats row */}
          <div ref={statsRef} className="grid grid-cols-3 gap-4">
            {stats.map((s) => (
              <div
                key={s.label}
                className="bg-[#141414] border border-neutral-800 rounded-xl p-3 flex flex-col gap-2"
              >
                {s.icon}
                <p className="font-antonio text-lg text-stone-100 leading-none">
                  {s.value}
                </p>
                <p className="font-inter text-xs text-stone-500 leading-tight">
                  {s.label}
                </p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div
            ref={ctaRef}
            className="flex flex-wrap items-center gap-4 relative z-10"
          >
            <Link
              href="https://chatbot.famedia.co.in"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor-text="Try It"
              className="p-[3px] relative group cursor-pointer inline-block pointer-events-auto"
            >
              <div className="absolute inset-0 bg-linear-to-r from-[#54d265] to-[#2d9f42] rounded-lg transition duration-500 pointer-events-none" />
              <div className="px-6 py-2.5 text-sm bg-black rounded-md relative text-white tracking-tight transition duration-500 group-hover:bg-transparent group-hover:text-black font-inter font-medium">
                Try It Free →
              </div>
            </Link>
            <Link
              href="https://chatbot.famedia.co.in"
              target="_blank"
              rel="noopener noreferrer"
              className="font-inter text-sm text-stone-400 hover:text-[#54d265] transition-colors duration-300 underline underline-offset-4 pointer-events-auto"
            >
              See how it works
            </Link>
          </div>
        </div>

        {/* RIGHT — Chat UI mockup */}
        <div ref={chatRef} className="flex justify-center lg:justify-end">
          <div className="w-full max-w-sm">
            {/* Widget chrome */}
            <div className="bg-[#111111] border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="bg-[#141414] border-b border-neutral-800 px-4 py-3 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#54d26520] border border-[#54d26540] flex items-center justify-center">
                  <BsRobot className="h-4 w-4 text-[#54d265]" />
                </div>
                <div>
                  <p className="font-inter text-sm font-semibold text-stone-100">
                    FA Assistant
                  </p>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#54d265] inline-block" />
                    <p className="font-inter text-xs text-stone-500">
                      Online now
                    </p>
                  </div>
                </div>
                <div className="ml-auto flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-neutral-700" />
                  <div className="w-2.5 h-2.5 rounded-full bg-neutral-700" />
                  <div className="w-2.5 h-2.5 rounded-full bg-neutral-700" />
                </div>
              </div>

              {/* Messages */}
              <div className="p-4 space-y-3 min-h-[260px]">
                {/* Welcome */}
                <div className="flex items-start gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#54d26520] border border-[#54d26440] flex items-center justify-center shrink-0 mt-0.5">
                    <BsRobot className="h-3 w-3 text-[#54d265]" />
                  </div>
                  <div className="bg-[#1a1a1a] border border-neutral-800 rounded-2xl rounded-tl-sm px-3 py-2 max-w-[80%]">
                    <p className="font-inter text-xs text-stone-300 leading-relaxed">
                      Hey! 👋 How can I help you today?
                    </p>
                  </div>
                </div>

                {chatBubbles.map((b, i) => (
                  <div
                    key={i}
                    className={`flex ${b.role === "user" ? "justify-end" : "items-start gap-2"}`}
                  >
                    {b.role === "bot" && (
                      <div className="w-6 h-6 rounded-full bg-[#54d26520] border border-[#54d26440] flex items-center justify-center shrink-0 mt-0.5">
                        <BsRobot className="h-3 w-3 text-[#54d265]" />
                      </div>
                    )}
                    <div
                      className={`rounded-2xl px-3 py-2 max-w-[80%] ${
                        b.role === "user"
                          ? "bg-[#54d265] rounded-tr-sm"
                          : "bg-[#1a1a1a] border border-neutral-800 rounded-tl-sm"
                      }`}
                    >
                      <p
                        className={`font-inter text-xs leading-relaxed ${
                          b.role === "user"
                            ? "text-black font-medium"
                            : "text-stone-300"
                        }`}
                      >
                        {b.text}
                      </p>
                    </div>
                  </div>
                ))}

                {/* Typing indicator */}
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#54d26520] border border-[#54d26440] flex items-center justify-center shrink-0">
                    <BsRobot className="h-3 w-3 text-[#54d265]" />
                  </div>
                  <div className="bg-[#1a1a1a] border border-neutral-800 rounded-2xl rounded-tl-sm px-4 py-3 flex gap-1 items-center">
                    <span
                      className="w-1.5 h-1.5 rounded-full bg-stone-500 animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    />
                    <span
                      className="w-1.5 h-1.5 rounded-full bg-stone-500 animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    />
                    <span
                      className="w-1.5 h-1.5 rounded-full bg-stone-500 animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    />
                  </div>
                </div>
              </div>

              {/* Input bar */}
              <div className="border-t border-neutral-800 px-4 py-3 flex gap-2 items-center">
                <div className="flex-1 bg-[#1a1a1a] border border-neutral-800 rounded-xl px-3 py-2">
                  <p className="font-inter text-xs text-stone-600">
                    Type a message...
                  </p>
                </div>
                <button className="w-8 h-8 rounded-xl bg-[#54d265] flex items-center justify-center shrink-0 cursor-default">
                  <MessageSquare className="h-3.5 w-3.5 text-black" />
                </button>
              </div>

              {/* Powered by */}
              <div className="border-t border-neutral-800 py-2 text-center">
                <p className="font-inter text-[10px] text-stone-600">
                  Powered by <span className="text-[#54d265]">FA Media</span>
                </p>
              </div>
            </div>

            {/* Embed snippet teaser */}
            <div className="mt-4 bg-[#0d1a0f] border border-[#54d26530] rounded-xl px-4 py-3">
              <p className="font-inter text-[10px] text-stone-500 mb-1.5 uppercase tracking-widest">
                Few lines of code
              </p>
              <pre className="font-mono text-xs text-[#54d265] leading-relaxed whitespace-pre-wrap">
                {`<script
  src="https://widget.famedia.co.in/chatbot-widget.iife.js"
  data-api-key="YOUR_API_KEY"
  data-color="#1A56DB">
</script>`}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
