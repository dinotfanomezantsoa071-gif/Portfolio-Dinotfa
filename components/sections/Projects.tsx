"use client";

import { ProjectCard } from "@/components/projects/ProjectCard";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useLanguage } from "@/lib/language";
import { getAllProjects } from "@/lib/projects";

export function Projects() {
  const { t } = useLanguage();
  const projects = getAllProjects();

  return (
    <section
      id="projects"
      aria-labelledby="projects-title"
      className="section-y"
    >
      <div className="container-page">
        <SectionHeading
          id="projects-title"
          title={t.projects.title}
          subtitle={t.projects.subtitle}
        />

        <ul className="flex flex-col gap-8 lg:gap-10">
          {projects.map((project, index) => (
            <li key={project.id}>
              <Reveal>
                <ProjectCard project={project} index={index} />
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}