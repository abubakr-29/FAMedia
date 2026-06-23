import AboutUsLeft from "./AboutUsLeft";
import AboutUsRight from "./AboutUsRight";
import AboutUsTop from "./AboutUsTop";

export default function AboutUsMain() {
  return (
    <section className="py-16 px-4" id="about">
      <AboutUsTop />
      <div className="max-w-4xl mx-auto mt-10 flex flex-col">
        <AboutUsLeft />
        <AboutUsRight />
      </div>
    </section>
  );
}
