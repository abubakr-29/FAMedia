import AllTestimonials from "./AllTestimonials";
import TestimonialsText from "./TestimonialsText";

export default function TestimonialsMain() {
  return (
    <section className="py-12 px-4 md:px-10" id="testimonials">
      <div className="text-center mb-16">
        <TestimonialsText />
      </div>
      <div>
        <AllTestimonials />
      </div>
    </section>
  );
}
