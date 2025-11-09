import ServicesText from "./ServicesText";
import AllServices from "./AllServices";

export default function ServicesMain() {
  return (
    <section className="py-16 px-4 lg:px-24" id="services">
      <div className="text-center mb-12">
        <ServicesText />
      </div>
      <div>
        <AllServices />
      </div>
    </section>
  );
}
