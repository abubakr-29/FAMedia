import AboutUsLeft from "./AboutUsLeft";
import AboutUsRight from "./AboutUsRight";
import AboutUsTop from "./AboutUsTop";

export default function AboutUsMain() {
  return (
    <section className="py-16 px-4" id="about">
      <AboutUsTop />
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12 items-start mt-10">
        <div className="flex-1 my-auto">
          <AboutUsLeft />
        </div>

        <div className="flex-1 ">
          <AboutUsRight />
        </div>
      </div>
    </section>
  );
}
