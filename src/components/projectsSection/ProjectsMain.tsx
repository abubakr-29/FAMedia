import ProjectsText from "./ProjectsText";
import AllProjects from "./AllProjects";

export default function ProjectsMain() {
  return (
    <section className="pb-14 px-4" id="projects">
      <ProjectsText />
      <AllProjects />
    </section>
  );
}
