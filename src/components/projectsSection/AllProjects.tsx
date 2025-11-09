"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Image from "next/image";
import Link from "next/link";

interface Project {
  title: string;
  subtitle: string;
  image: string;
  description: string;
  technologies: string[];
  link: string;
}

const PROJECTS: Project[] = [
  {
    title: "The Combat Gym",
    subtitle: "Modern Landing Page",
    image: "/projects/project1.webp",
    description:
      "A high-converting Next.js landing page built under FA Media to elevate The Combat Gym’s online presence.",
    technologies: ["Next.js", "React", "Tailwind CSS", "Framer Motion"],
    link: "https://thecombatgym.in/",
  },
  {
    title: "Cyanide",
    subtitle: "Full-Stack E-Commerce Platform",
    image: "/projects/project8.webp",
    description:
      "A dynamic e-commerce platform for Cyanide with PayPal payments and smooth product management.",
    technologies: [
      "React",
      "Tailwind CSS",
      "Node.js",
      "Express.js",
      "MongoDB",
      "PayPal API",
    ],
    link: "https://e-commerce-ns8f.vercel.app/",
  },
  {
    title: "MH Interiors",
    subtitle: "Interior Design Portfolio Website",
    image: "/projects/project7.webp",
    description:
      "A stylish portfolio for MH Interiors featuring animations and Google Sheets automation via FA Media.",
    technologies: [
      "React.js",
      "Tailwind CSS",
      "Framer Motion",
      "Google Sheets API",
      "Google Cloud Console",
    ],
    link: "https://mh-interiors.in/",
  },
  {
    title: "The Combat Gym",
    subtitle: "Gym Management Web App",
    image: "/projects/project5.webp",
    description:
      "A full-stack app for The Combat Gym to manage students, data, and communication efficiently.",
    technologies: [
      "EJS",
      "CSS3",
      "Bootstrap",
      "Node.js",
      "Express.js",
      "PostgreSQL",
    ],
    link: "https://the-combat-gym.onrender.com/",
  },
  {
    title: "FurryFriends",
    subtitle: "Pet E-Commerce Platform",
    image: "/projects/project3.webp",
    description:
      "An engaging pet e-commerce site for browsing and purchasing purebred dogs securely.",
    technologies: [
      "Node.js",
      "Express.js",
      "PostgreSQL",
      "Stripe API",
      "OAuth",
      "HTML5",
      "CSS3",
    ],
    link: "https://furry-friends-91t1.onrender.com/",
  },
  {
    title: "Abu Bakr Ahmed",
    subtitle: "Developer Portfolio",
    image: "/projects/project6.webp",
    description:
      "A personal portfolio showcasing projects, skills, and experience as a full-stack developer.",
    technologies: ["ReactJs", "Framer Motion", "TailwindCSS"],
    link: "https://abu-bakr-ahmed.vercel.app/",
  },
  {
    title: "Local Roofing",
    subtitle: "Service-Based Website",
    image: "/projects/project4.webp",
    description:
      "A clean static website for a roofing service, highlighting offerings and contact details.",
    technologies: ["HTML5", "CSS3", "JavaScript", "GSAP"],
    link: "https://localroofinghandyman.com/",
  },
  {
    title: "Faraz Khan",
    subtitle: "Copywriter & Designer Portfolio",
    image: "/projects/project2.webp",
    description:
      "A professional portfolio showcasing Faraz Khan's work in copywriting, design, and branding.",
    technologies: ["HTML5", "CSS5", "JavaScript", "Bootstrap"],
    link: "https://farazkhan.onrender.com/",
  },
];

export default function AllProjects() {
  return (
    <div className="font-inter w-full max-w-[1400px] mx-auto px-4 relative">
      <button
        className="swiper-button-prev-custom absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-stone-900/70 hover:bg-stone-800/90 text-stone-300 rounded-full p-2 shadow transition-all duration-300 hidden sm:flex items-center justify-center cursor-pointer"
        aria-label="Previous slide"
      >
        <svg
          width="24"
          height="24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-chevron-left"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>
      <button
        className="swiper-button-next-custom absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-stone-900/70 hover:bg-stone-800/90 text-stone-300 rounded-full p-2 shadow transition-all duration-300 hidden sm:flex items-center justify-center cursor-pointer"
        aria-label="Next slide"
      >
        <svg
          width="24"
          height="24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-chevron-right"
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>
      <Swiper
        modules={[Pagination, Autoplay, Navigation]}
        loop={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{ el: ".custom-swiper-pagination", clickable: true }}
        navigation={{
          prevEl: ".swiper-button-prev-custom",
          nextEl: ".swiper-button-next-custom",
        }}
        spaceBetween={24}
        breakpoints={{
          0: { slidesPerView: 1, spaceBetween: 16 },
          768: { slidesPerView: 2, spaceBetween: 20 },
          1024: { slidesPerView: 3, spaceBetween: 24 },
        }}
      >
        {PROJECTS.map((project, index) => (
          <SwiperSlide key={index}>
            <div className="flex flex-col h-[600px] sm:h-[620px] bg-stone-950 rounded-xl border border-stone-700 p-4 sm:p-6 shadow-lg">
              <div className="w-full flex justify-center mb-6">
                <Image
                  src={project.image}
                  width={300}
                  height={300}
                  alt={project.title}
                  className="rounded-lg object-cover w-full"
                />
              </div>
              <div className="grow">
                <h3 className="font-bold text-lg text-stone-300 mb-2">
                  {project.title}
                </h3>
                <p className="mb-2 font-medium text-sm text-stone-500">
                  {project.subtitle}
                </p>
                <p className="mb-4 text-stone-400 text-sm sm:text-base">
                  {project.description}
                </p>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map((tech, index) => (
                  <span
                    className="rounded bg-stone-900 text-stone-300 p-1.5 text-xs sm:text-sm font-medium"
                    key={index}
                  >
                    {tech}
                  </span>
                ))}
              </div>
              {project.link && (
                <Link
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor-text={"View Live"}
                  className="w-full mt-auto inline-block text-sm sm:text-base px-0 py-2.5 rounded-lg border border-stone-600 text-stone-300 font-semibold text-center hover:bg-stone-800 transition-all duration-500"
                >
                  View Project
                </Link>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="custom-swiper-pagination flex justify-center mt-6" />
    </div>
  );
}
