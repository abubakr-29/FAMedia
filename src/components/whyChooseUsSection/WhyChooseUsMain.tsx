import WhyChooseUsBottom from "./WhyChooseUsBottom";
import WhyChooseUsBottomSM from "./WhyChooseUsBottomSM";
import WhyChooseUsTop from "./WhyChooseUsTop";

export default function WhyChooseUsMain() {
  return (
    <section className="pb-20 pt:8 px-4 sm:pt-10" id="why-choose-us">
      <div className="mx-auto">
        <WhyChooseUsTop />
        <div className="hidden lg:block">
          <WhyChooseUsBottom />
        </div>
        <div className="block lg:hidden">
          <WhyChooseUsBottomSM />
        </div>
      </div>
    </section>
  );
}
