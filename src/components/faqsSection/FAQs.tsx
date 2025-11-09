"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register plugins
gsap.registerPlugin(useGSAP, ScrollTrigger);

interface FAQ {
  id: string;
  question: string;
  answer: string;
}

const faqData: FAQ[] = [
  {
    id: "item-1",
    question: "What services does FA Media offer?",
    answer:
      "FA Media provides custom web development services including landing pages, portfolio websites, personal brand sites, hosting, and automation solutions. We also offer AI chatbot integrations and business automation tailored to your needs.",
  },
  {
    id: "item-2",
    question: "How long does it take to build a website?",
    answer:
      "Timelines vary based on the project scope. Simple landing pages are typically delivered within 3–5 days, while complete websites can take 1–2 weeks. We provide a detailed timeline after the initial consultation.",
  },
  {
    id: "item-3",
    question: "Do you provide ongoing support and maintenance?",
    answer:
      "Yes, we offer optional maintenance plans that include updates, backups, performance monitoring, and security patches to ensure your website stays optimized and secure.",
  },
  {
    id: "item-4",
    question: "Can you help with design, branding, or content?",
    answer:
      "Yes! While development is our core focus, we help refine your layout, visuals, and basic content. For deep branding or copy, we can refer trusted creatives or collaborate with yours.",
  },
  {
    id: "item-5",
    question: "Why choose FA Media over other agencies?",
    answer:
      "We combine technical excellence with business-focused strategy. Our sites are fast, mobile-first, SEO-ready, and built to convert — all with personal attention from a passionate team that treats your project like their own.",
  },
];

export default function FAQs() {
  const [openId, setOpenId] = useState<string | null>(null);
  const containerRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const iconRefs = useRef<(HTMLDivElement | null)[]>([]);

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
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: titleRef.current,
              start: "top 80%",
              end: "top 40%",
              scrub: 2,
            },
          }
        );
      }
    },
    { scope: containerRef }
  );

  const toggleFAQ = (id: string, index: number) => {
    const content = contentRefs.current[index];
    const icon = iconRefs.current[index];

    if (openId === id) {
      // Close
      if (content) {
        gsap.to(content, {
          height: 0,
          opacity: 0,
          duration: 0.4,
          ease: "power2.inOut",
        });
      }
      if (icon) {
        gsap.to(icon, {
          rotation: 0,
          duration: 0.3,
          ease: "power2.out",
        });
      }
      setOpenId(null);
    } else {
      // Close previously open item
      if (openId) {
        const prevIndex = faqData.findIndex((faq) => faq.id === openId);
        const prevContent = contentRefs.current[prevIndex];
        const prevIcon = iconRefs.current[prevIndex];
        if (prevContent) {
          gsap.to(prevContent, {
            height: 0,
            opacity: 0,
            duration: 0.4,
            ease: "power2.inOut",
          });
        }
        if (prevIcon) {
          gsap.to(prevIcon, {
            rotation: 0,
            duration: 0.3,
            ease: "power2.out",
          });
        }
      }

      // Open new item
      if (content) {
        gsap.set(content, { height: "auto", opacity: 1 });
        gsap.from(content, {
          height: 0,
          opacity: 0,
          duration: 0.4,
          ease: "power2.inOut",
        });
      }
      if (icon) {
        gsap.to(icon, {
          rotation: 180,
          duration: 0.3,
          ease: "power2.out",
        });
      }
      setOpenId(id);
    }
  };

  return (
    <section
      ref={containerRef}
      className="font-inter py-20 px-4 max-w-4xl mx-auto"
    >
      <div ref={titleRef} className="text-center mb-12 opacity-0">
        <h2 className="font-antonio text-4xl lg:text-5xl text-stone-200">
          FA<span className="text-[#54d265]">Qs</span>
        </h2>
        <p className="mt-4 text-stone-300 text-base md:text-lg">
          Everything you need to know about our services
        </p>
      </div>

      <div className="space-y-3">
        {faqData.map((faq, index) => (
          <div
            key={faq.id}
            className="bg-linear-to-br from-[#1a1a1a] to-[#0f0f0f] rounded-2xl border border-stone-700/50 hover:border-stone-600 transition-colors overflow-hidden"
          >
            <button
              onClick={() => toggleFAQ(faq.id, index)}
              className="w-full text-left py-6 px-6 flex items-center justify-between gap-4 group cursor-pointer"
            >
              <span className="text-stone-300 text-sm md:text-base font-medium group-hover:text-white transition-colors leading-relaxed">
                {faq.question}
              </span>
              <div
                ref={(el) => {
                  iconRefs.current[index] = el;
                }}
                className="shrink-0 w-8 h-8 rounded-full bg-stone-800/50 flex items-center justify-center group-hover:bg-stone-700/50 transition-colors"
              >
                <svg
                  className="w-5 h-5 text-stone-400 group-hover:text-stone-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </button>
            <div
              ref={(el) => {
                contentRefs.current[index] = el;
              }}
              className="overflow-hidden h-0 opacity-0"
            >
              <div className="px-6 pb-6 text-sm md:text-base text-stone-400 leading-relaxed">
                {faq.answer}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
