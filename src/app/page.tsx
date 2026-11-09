import type { Metadata } from "next";
import PreloaderGate from "@/components/PreloaderGate";
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
import ChatbotPromo from "@/components/chatbotSection/ChatbotPromo";
import JsonLd from "@/components/seo/JsonLd";
import { faqData } from "@/data/faqs";
import { faqSchema } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: {
    absolute: "FA Media | Custom Web Design & Development Agency Worldwide",
  },
  alternates: {
    canonical: "/",
    languages: { en: "/", "x-default": "/" },
  },
  openGraph: {
    url: "/",
    type: "website",
    siteName: "FA Media",
    locale: "en_US",
    title: "FA Media | Custom Web Design & Development Agency Worldwide",
    description:
      "Fast, custom-coded websites, landing pages and AI chatbots for brands in the USA, UK, Canada, Australia and India. 100% custom code — no templates.",
  },
};

export default function Home() {
  return (
    <>
      <JsonLd data={faqSchema(faqData)} />
      <PreloaderGate />
      <main>
        <Hero />
        <div className="container mx-auto overflow-hidden">
          <SubHero />
          <WhyChooseUsMain />
          <SolutionMain />
          <AboutUsMain />
          <TechnologiesMain />
          <ServicesMain />
          <ChatbotPromo />
          <ProjectsMain />
          <TestimonialsMain />
          <Contact />
          <FAQs />
        </div>
      </main>
    </>
  );
}
