import AllSolutions from "./AllSolutions";
import SolutionText from "./SolutionText";

export default function SolutionMain() {
  return (
    <section
      className="pt-8 max-w-fit lg:max-w-[1200px] mx-auto px-4"
      id="solution"
    >
      <div className="bg-[#1a1a1a] rounded-3xl border border-[#e4e4e4] shadow-2xl py-6 px-4 sm:py-10 sm:px-6 lg:p-8 flex flex-col justify-center items-center broder-2">
        <SolutionText />
        <AllSolutions />
      </div>
    </section>
  );
}
