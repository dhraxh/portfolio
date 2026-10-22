import { portfolio } from "@/data/portfolio";
import ProjectCard from "./ProjectCard";
import Reveal from "./Reveal";
import { Section } from "./ui";

export default function Projects() {
  return (
    <Section id="projects" eyebrow="03 — Projects" title="Things I've built">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {portfolio.projects.map((project, i) => (
          <Reveal key={project.title} delay={i * 0.08} className="flex">
            <ProjectCard project={project} index={i} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
