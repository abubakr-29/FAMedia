"use client";

import { useState } from "react";
import Preloader from "@/components/Preloader";
import AboutUsMain from "@/components/aboutUsSection/AboutUsMain";
import Contact from "@/components/contactSection/Contact";
import FAQs from "@/components/faqsSection/FAQs";
import Hero from "@/components/heroSection/Hero";
import SubHero from "@/components/heroSection/SubHero";
import ProjectsMain from "@/components/projectsSection/ProjectsMain";
import ServicesMain from "@/components/servicesSection/ServicesMain";
import SolutionMain from "@/components/solutionSection/SolutionMain";
import TechnologiesMain from "@/components/technologiesSection/TechnologiesMain";
import TestimonialsMain from "@/components/testimonialsSection/TestimonialsMain";
import WhyChooseUsMain from "@/components/whyChooseUsSection/WhyChooseUsMain";

export default function Home() {
  // Initialize state based on sessionStorage (only runs once on mount)
  const [showPreloader, setShowPreloader] = useState(() => {
    // This function only runs once during initial render
    if (typeof window !== "undefined") {
      return !sessionStorage.getItem("preloaderShown");
    }
    return true; // Default to true on server-side
  });

  const handlePreloaderComplete = () => {
    // Mark preloader as shown in this session
    if (typeof window !== "undefined") {
      sessionStorage.setItem("preloaderShown", "true");
    }
    setShowPreloader(false);
  };

  return (
    <>
      {showPreloader && <Preloader onComplete={handlePreloaderComplete} />}

      {!showPreloader && (
        <main>
          <Hero />
          <div className="container mx-auto overflow-hidden">
            <SubHero />
            <WhyChooseUsMain />
            <SolutionMain />
            <AboutUsMain />
            <TechnologiesMain />
            <ServicesMain />
            <ProjectsMain />
            <TestimonialsMain />
            <Contact />
            <FAQs />
          </div>
        </main>
      )}
    </>
  );
}
