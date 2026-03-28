"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

// Register plugin
gsap.registerPlugin(useGSAP);

const MarqueeSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const touchStartY = useRef(0);
  const marqueeTweenRef = useRef<gsap.core.Tween | null>(null);
  const settleTweenRef = useRef<gsap.core.Tween | null>(null);

  const marqueeItems = [
    { text: "Beyond Website We Build Brand", id: 1 },
    { text: "Beyond Website We Build Brand", id: 2 },
    { text: "Beyond Website We Build Brand", id: 3 },
    { text: "Beyond Website We Build Brand", id: 4 },
    { text: "Beyond Website We Build Brand", id: 5 },
  ];

  useGSAP(
    () => {
      const track = trackRef.current;
      const container = containerRef.current;
      if (!track || !container) return;

      let rafId = 0;
      let queuedDelta = 0;
      let lastScrollY = window.scrollY;

      marqueeTweenRef.current = gsap.to(track, {
        xPercent: -50,
        duration: 18,
        ease: "none",
        repeat: -1,
      });

      const setMarqueeMotion = (delta: number) => {
        const direction = delta > 0 ? 1 : -1;
        const speed = gsap.utils.clamp(0.9, 3, Math.abs(delta) / 55 + 1);

        if (marqueeTweenRef.current) {
          gsap.to(marqueeTweenRef.current, {
            timeScale: direction * speed,
            duration: 0.35,
            overwrite: true,
          });
        }

        gsap.to(".marquee-img", {
          rotate: direction > 0 ? 180 : 0,
          duration: 0.25,
          ease: "power2.out",
          overwrite: true,
        });

        settleTweenRef.current?.kill();
        settleTweenRef.current = gsap.delayedCall(0.4, () => {
          if (!marqueeTweenRef.current) return;
          gsap.to(marqueeTweenRef.current, {
            timeScale: direction,
            duration: 0.6,
            ease: "power2.out",
          });
        });
      };

      const queueMotionUpdate = (delta: number) => {
        if (!delta) return;
        queuedDelta = delta;

        if (rafId) return;
        rafId = window.requestAnimationFrame(() => {
          setMarqueeMotion(queuedDelta);
          queuedDelta = 0;
          rafId = 0;
        });
      };

      const handleWheel = (dets: WheelEvent) => {
        if (dets.deltaY === 0) {
          return;
        }

        queueMotionUpdate(dets.deltaY);
      };

      const handleScroll = () => {
        const currentScrollY = window.scrollY;
        const delta = currentScrollY - lastScrollY;
        lastScrollY = currentScrollY;

        if (Math.abs(delta) < 1) return;
        queueMotionUpdate(delta * 8);
      };

      const handleTouchStart = (e: TouchEvent) => {
        touchStartY.current = e.touches[0].clientY;
      };

      const handleTouchMove = (e: TouchEvent) => {
        const touchY = e.touches[0].clientY;
        const delta = touchStartY.current - touchY;

        if (Math.abs(delta) > 6) {
          queueMotionUpdate(delta * 4);
          touchStartY.current = touchY;
        }
      };

      window.addEventListener("wheel", handleWheel, { passive: true });
      window.addEventListener("scroll", handleScroll, { passive: true });
      window.addEventListener("touchstart", handleTouchStart, {
        passive: true,
      });
      window.addEventListener("touchmove", handleTouchMove, {
        passive: true,
      });

      return () => {
        window.removeEventListener("wheel", handleWheel);
        window.removeEventListener("scroll", handleScroll);
        window.removeEventListener("touchstart", handleTouchStart);
        window.removeEventListener("touchmove", handleTouchMove);
        if (rafId) {
          window.cancelAnimationFrame(rafId);
        }
        settleTweenRef.current?.kill();
        marqueeTweenRef.current?.kill();
      };
    },
    { scope: containerRef }
  );

  return (
    <div className="font-inter w-full flex flex-col">
      <div ref={containerRef} className="w-full flex items-center">
        <div className="bg-[#54d265] w-full py-[4vw] overflow-hidden">
          <div
            ref={trackRef}
            className="flex w-max will-change-transform"
            aria-label="Moving brand marquee"
          >
            {[...marqueeItems, ...marqueeItems].map((item, index) => (
              <div
                key={`${item.id}-${index}`}
                className="marquee flex items-center gap-[3vw] px-[1.5vw] shrink-0"
              >
                <h1 className="text-[4vw] text-black font-bold whitespace-nowrap">
                  {item.text}
                </h1>
                <Image
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
    </div>
  );
};

export default MarqueeSection;
