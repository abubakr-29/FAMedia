"use client";

import { useState, useEffect, useCallback, useRef } from "react";

interface Testimonial {
  feedback: string;
  name: string;
  title: string;
}

const testimonials: Testimonial[] = [
  {
    feedback:
      "FA Media turned our vision into a digital masterpiece. The design captures our aesthetic and speaks directly to our clients.",
    name: "— Md Hafiz",
    title: "Founder, MH Interiors",
  },
  {
    feedback:
      "Clean, professional, and easy to navigate — our new site does it all. FA Media delivered a site that builds trust and brings in calls.",
    name: "— Steve",
    title: "Owner, Steve Roofing Handyman Services",
  },
  {
    feedback:
      "Our new website feels like a punch of energy — bold, fast, and on-brand. FA Media understood the gym vibe better than we did.",
    name: "— Zakir Hossain",
    title: "Founder, The Combat Gym",
  },
  {
    feedback:
      "From browsing to checkout, the user experience is flawless. FA Media nailed the look and feel of a pet-loving brand.",
    name: "— Team Furry Friend",
    title: "Dog E-commerce Brand",
  },
];

export default function AllTestimonials() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [windowWidth, setWindowWidth] = useState<number>(
    typeof window !== "undefined" ? window.innerWidth : 0
  );
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const carouselRef = useRef<HTMLDivElement | null>(null);

  // Minimum swipe distance (in px)
  const minSwipeDistance: number = 50;

  const getCardsToShow = useCallback((): number => {
    if (windowWidth >= 1024) return 3;
    if (windowWidth >= 768) return 2;
    return 1;
  }, [windowWidth]);

  useEffect(() => {
    const handleResize = (): void => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextTestimonial = useCallback((): void => {
    setCurrentIndex((prevIndex) => {
      const maxIndex = testimonials.length - getCardsToShow();
      return prevIndex >= maxIndex ? 0 : prevIndex + 1;
    });
  }, [getCardsToShow]);

  useEffect(() => {
    const timer = setInterval(() => {
      nextTestimonial();
    }, 5000);

    return () => clearInterval(timer);
  }, [nextTestimonial]);

  const onTouchStart = (e: React.TouchEvent<HTMLDivElement>): void => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent<HTMLDivElement>): void => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = (): void => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextTestimonial();
    }
    if (isRightSwipe) {
      previousTestimonial();
    }
  };

  const previousTestimonial = (): void => {
    setCurrentIndex((prevIndex) => {
      const maxIndex = testimonials.length - getCardsToShow();
      return prevIndex <= 0 ? maxIndex : prevIndex - 1;
    });
  };

  const goToSlide = (index: number): void => {
    const maxIndex = testimonials.length - getCardsToShow();
    if (index > maxIndex) {
      setCurrentIndex(maxIndex);
    } else {
      setCurrentIndex(index);
    }
  };

  const getActiveClass = (index: number): string => {
    const cardsToShow = getCardsToShow();
    if (cardsToShow === 1) {
      return currentIndex === index ? "active" : "";
    }
    return index >= currentIndex && index < currentIndex + cardsToShow
      ? "active"
      : "";
  };

  return (
    <div className="rounded-md flex flex-col antialiased items-center justify-center relative overflow-hidden">
      <div
        ref={carouselRef}
        className="relative w-full overflow-hidden"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${
              (currentIndex * 100) / getCardsToShow()
            }%)`,
          }}
        >
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`shrink-0 w-full md:w-1/2 lg:w-1/3 px-4 transition-all duration-500 ${getActiveClass(
                index
              )}`}
            >
              <div className="bg-[#1a1a1a] border border-stone-700 rounded-2xl p-6 shadow-lg wrap-break-word overflow-hidden">
                <p className="text-sm leading-[1.6] font-normal text-stone-300 mb-4 wrap-break-word">
                  {testimonial.feedback}
                </p>
                <div className="relative z-20 mt-6 flex flex-row items-center">
                  <span className="flex flex-col gap-1">
                    <span className="text-sm leading-[1.6] font-normal text-stone-400">
                      {testimonial.name}
                    </span>
                    <span className="text-sm leading-[1.6] font-normal text-stone-400">
                      {testimonial.title}
                    </span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-4 mt-8">
          <button
            className="bg-white/10 border-2 border-white/30 shadow-lg rounded-full w-12 h-12 flex items-center justify-center hover:bg-white/20 hover:scale-110 transition-all duration-500 focus:outline-none focus:ring-2 focus:ring-white cursor-pointer"
            onClick={previousTestimonial}
            aria-label="Previous testimonial"
          >
            <svg
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-white"
              viewBox="0 0 24 24"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            className="bg-white/10 border-2 border-white/30 shadow-lg rounded-full w-12 h-12 flex items-center justify-center hover:bg-white/20 hover:scale-110 transition-all duration-500 focus:outline-none focus:ring-2 focus:ring-white cursor-pointer"
            onClick={nextTestimonial}
            aria-label="Next testimonial"
          >
            <svg
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-white"
              viewBox="0 0 24 24"
            >
              <path d="M9 6l6 6-6 6" />
            </svg>
          </button>
        </div>

        <div className="flex justify-center gap-2 mt-6 py-2">
          {Array.from({
            length: Math.ceil(testimonials.length / getCardsToShow()),
          }).map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full border border-white/30 transition-all duration-500 focus:outline-none focus:ring-2 focus:ring-white cursor-pointer ${
                Math.floor(currentIndex / getCardsToShow()) === index
                  ? "bg-white scale-125 shadow-lg"
                  : "bg-white/30"
              }`}
              onClick={() => goToSlide(index * getCardsToShow())}
              aria-label={`Go to testimonial group ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
