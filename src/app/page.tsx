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
  return (
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
  );
}
