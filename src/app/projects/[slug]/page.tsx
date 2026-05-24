import { Pill } from "@mantine/core";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import {
  getProjectById,
  getProjectBySlug,
  getProjects,
} from "@/lib/projects";
import ProjectImageModal from "@/components/ui/ProjectImageModal";
import ProjectLinks from "@/components/ui/ProjectLinks";
import { formatResponsibilities } from "@/types/project";

export const generateStaticParams = () => {
  return getProjects().map((project) => ({
    slug: project.slug,
  }));
};

interface ProjectDetailPageProps {
  params: Promise<{ slug: string }>;
}

const ProjectDetailPage = async ({ params }: ProjectDetailPageProps) => {
  const { slug } = await params;
  const projectBySlug = getProjectBySlug(slug);

  if (!projectBySlug) {
    const projectById = getProjectById(slug);
    if (projectById) {
      redirect(`/projects/${projectById.slug}`);
    }
    notFound();
  }

  const project = projectBySlug;
  const responsibilitiesLabel = formatResponsibilities(
    project.project_responsibilities
  );

  return (
    <div className="container mx-auto px-4 py-6 sm:px-6 sm:py-8">
      <nav className="mb-10 font-Outfit text-sm text-text-muted">
        <Link href="/projects" className="link-accent">
          Projects
        </Link>
        <span className="mx-2">/</span>
        <span className="text-stone-800">{project.project_name}</span>
      </nav>
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        <div className="order-2 flex items-center justify-center px-0 lg:order-1">
          <ProjectImageModal
            src={project.project_image}
            alt={project.project_name}
          />
        </div>
        <div className="order-1 space-y-4 md:space-y-6 lg:order-2">
          <div className="space-y-2 sm:space-y-3">
            <h1 className="font-Outfit text-2xl font-medium capitalize md:text-4xl">
              {project.project_name}
            </h1>
            <div className="flex flex-wrap gap-1">
              {project.project_tag.map((tag) => (
                <Pill key={tag}>
                  {tag}
                </Pill>
              ))}
            </div>
          </div>
          <p className="font-Kanit text-base font-light leading-relaxed text-stone-600 md:text-lg">
            {project.project_description}
          </p>
          <div>
            <p className="font-Outfit text-lg font-medium">
              {responsibilitiesLabel}
            </p>
            <ul className="list-inside list-disc indent-2 font-Kanit text-sm font-light sm:indent-3 sm:text-base">
              {project.keyResponsibilities.map((keyResponsibility) => (
                <li key={keyResponsibility}>{keyResponsibility}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-Outfit text-lg font-semibold">
              Technologies Used
            </p>
            <ul className="list-inside list-disc indent-3 text-sm sm:indent-5 sm:text-base">
              {project.technologies_used.map((technology) => (
                <li className="font-light " key={technology}>
                  {technology}
                </li>
              ))}
            </ul>
          </div>
          <ProjectLinks
            liveUrl={project.live_url}
            githubUrl={project.github_url}
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailPage;
