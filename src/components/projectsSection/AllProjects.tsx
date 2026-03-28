"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Image from "next/image";
import Link from "next/link";
import { client } from "@/sanity/client";

interface Project {
  _id: string;
  title: string;
  subtitle: string;
  image: string;
  description: string;
  technologies: string[];
  link: string;
}

const PROJECTS_QUERY = `*[_type == "project"] | order(coalesce(order, 9999) asc, _createdAt desc) {
  _id,
  title,
  subtitle,
  "image": image.asset->url,
  description,
  technologies,
  link
}`;

const options = { next: { revalidate: 30 } };

export default function AllProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchProjects = async () => {
      try {
        const data = await client.fetch<Project[]>(PROJECTS_QUERY, {}, options);
        if (isMounted) {
          setProjects(data ?? []);
          setLoadError(false);
        }
      } catch {
        if (isMounted) {
          setProjects([]);
          setLoadError(true);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchProjects();

    return () => {
      isMounted = false;
    };
  }, []);

  if (isLoading) {
    return (
      <div className="font-inter w-full max-w-[1400px] mx-auto px-4 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="h-[600px] sm:h-[620px] bg-stone-950 rounded-xl border border-stone-800 p-4 sm:p-6 animate-pulse"
            >
              <div className="h-60 w-full rounded-lg bg-stone-900" />
              <div className="mt-6 h-6 w-3/4 rounded bg-stone-900" />
              <div className="mt-3 h-4 w-1/2 rounded bg-stone-900" />
              <div className="mt-4 h-4 w-full rounded bg-stone-900" />
              <div className="mt-2 h-4 w-11/12 rounded bg-stone-900" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!projects.length) {
    return (
      <div className="font-inter w-full max-w-[1400px] mx-auto px-4">
        <div className="bg-stone-950 border border-stone-800 rounded-xl py-16 px-6 text-center">
          <h3 className="text-stone-200 text-2xl font-semibold mb-3">
            No projects available
          </h3>
          <p className="text-stone-400 max-w-xl mx-auto">
            {loadError
              ? "We could not load projects from Sanity right now. Please try again shortly."
              : "Your project section is connected to Sanity, but no project documents are published yet."}
          </p>
        </div>
      </div>
    );
  }

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
        loop={projects.length > 1}
        autoplay={
          projects.length > 1
            ? { delay: 3000, disableOnInteraction: false }
            : false
        }
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
        {projects.map((project) => (
          <SwiperSlide key={project._id}>
            <div className="flex flex-col h-[600px] sm:h-[620px] bg-stone-950 rounded-xl border border-stone-700 p-4 sm:p-6 shadow-lg">
              <div className="w-full flex justify-center mb-6">
                {project.image ? (
                  <Image
                    src={project.image}
                    width={300}
                    height={300}
                    alt={project.title}
                    className="rounded-lg object-cover w-full"
                  />
                ) : (
                  <div className="rounded-lg bg-stone-900 w-full h-[300px] flex items-center justify-center text-stone-500 text-sm">
                    No image available
                  </div>
                )}
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
                {project.technologies?.map((tech, index) => (
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
