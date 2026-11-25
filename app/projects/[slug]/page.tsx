import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectDetails } from "@/components/projects/ProjectDetails";
import { PageTransition } from "@/components/providers/PageTransition";
import {
  getAdjacentProjects,
  getAllProjects,
  getProjectBySlug,
} from "@/lib/projects";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

/** Seuls les slugs de data/projects.ts existent : tout autre chemin renvoie une 404. */
export const dynamicParams = false;

export function generateStaticParams(): { slug: string }[] {
  return getAllProjects().map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {};
  }

  const description = project.description.fr;

  return {
    title: project.title,
    description,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      type: "article",
      url: `/projects/${project.slug}`,
      siteName: "Dinot",
      title: `${project.title} | Dinot`,
      description,
      locale: "fr_FR",
      alternateLocale: ["en_US"],
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  const adjacent = getAdjacentProjects(slug);

  if (!project || !adjacent) {
    notFound();
  }

  return (
    <PageTransition>
      <main id="main-content">
        <ProjectDetails
          project={project}
          previous={adjacent.previous}
          next={adjacent.next}
        />
      </main>
    </PageTransition>
  );
}