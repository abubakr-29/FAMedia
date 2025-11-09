"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

// Register plugin
gsap.registerPlugin(useGSAP);

const MarqueeSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const marqueeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imageRefs = useRef<(HTMLImageElement | null)[]>([]);
  const touchStartY = useRef(0);

  const marqueeItems = [
    { text: "Beyond Website We Build Brand", id: 1 },
    { text: "Beyond Website We Build Brand", id: 2 },
    { text: "Beyond Website We Build Brand", id: 3 },
    { text: "Beyond Website We Build Brand", id: 4 },
    { text: "Beyond Website We Build Brand", id: 5 },
  ];

  useGSAP(
    () => {
      const handleWheel = (dets: WheelEvent) => {
        if (dets.deltaY > 0) {
          // Scrolling down - move left
          gsap.to(".marquee", {
            x: "-200%",
            duration: 5,
            repeat: -1,
            ease: "none",
          });

          gsap.to(".marquee-img", {
            rotate: 180,
          });
        } else {
          // Scrolling up - move right
          gsap.to(".marquee", {
            x: "0%",
            duration: 5,
            repeat: -1,
            ease: "none",
          });

          gsap.to(".marquee-img", {
            rotate: 0,
          });
        }
      };

      const handleTouchStart = (e: TouchEvent) => {
        touchStartY.current = e.touches[0].clientY;
      };

      const handleTouchMove = (e: TouchEvent) => {
        const touchY = e.touches[0].clientY;
        const delta = touchStartY.current - touchY;

        if (Math.abs(delta) > 5) {
          if (delta > 0) {
            // Swiping up (scrolling down) - move left
            gsap.to(".marquee", {
              x: "-200%",
              duration: 5,
              repeat: -1,
              ease: "none",
            });

            gsap.to(".marquee-img", {
              rotate: 180,
            });
          } else {
            // Swiping down (scrolling up) - move right
            gsap.to(".marquee", {
              x: "0%",
              duration: 5,
              repeat: -1,
              ease: "none",
            });

            gsap.to(".marquee-img", {
              rotate: 0,
            });
          }
          touchStartY.current = touchY;
        }
      };

      window.addEventListener("wheel", handleWheel);
      window.addEventListener("touchstart", handleTouchStart, {
        passive: true,
      });
      window.addEventListener("touchmove", handleTouchMove, { passive: true });

      return () => {
        window.removeEventListener("wheel", handleWheel);
        window.removeEventListener("touchstart", handleTouchStart);
        window.removeEventListener("touchmove", handleTouchMove);
      };
    },
    { scope: containerRef }
  );

  return (
    <div className="font-inter w-full flex flex-col">
      <div ref={containerRef} className="w-full flex items-center">
        <div className="bg-[#54d265] w-full flex py-[4vw] overflow-hidden">
          {marqueeItems.map((item, index) => (
            <div
              key={item.id}
              ref={(el) => {
                marqueeRefs.current[index] = el;
              }}
              className="marquee flex items-center gap-[3vw] px-[1.5vw] shrink-0 -translate-x-full"
            >
              <h1 className="text-[4vw] text-black font-bold whitespace-nowrap">
                {item.text}
              </h1>
              <Image
                ref={(el) => {
                  imageRefs.current[index] = el;
                }}
                src="/arrow-br.svg"
                alt="Arrow"
                width={64}
                height={64}
                className="marquee-img h-[4vw] w-auto"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MarqueeSection;
