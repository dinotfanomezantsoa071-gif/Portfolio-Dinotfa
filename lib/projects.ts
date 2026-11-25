import { projects } from "@/data/projects";
import type { Project } from "@/types";

export function getAllProjects(): Project[] {
  return projects;
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

/** Navigation circulaire : le précédent du premier est le dernier. */
export function getAdjacentProjects(
  slug: string,
): { previous: Project; next: Project } | null {
  const index = projects.findIndex((project) => project.slug === slug);
  if (index === -1) {
    return null;
  }
  const total = projects.length;
  return {
    previous: projects[(index - 1 + total) % total],
    next: projects[(index + 1) % total],
  };
}