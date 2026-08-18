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
      <nav className="mb-10 font-display text-sm text-base-content/60">
        <Link href="/projects" className="link link-primary no-underline">
          Projects
        </Link>
        <span className="mx-1">/</span>
        <span className="text-base-content/60">{project.project_name}</span>
      </nav>
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        <div className="order-2 flex items-center justify-center px-0 lg:order-1">
          <ProjectImageModal
            src={project.project_image}
            alt={project.project_name}
          />
        </div>
        <div className="order-1 space-y-4 md:space-y-6 lg:order-2">
          <div className="space-y-2">
            <h1 className="font-display text-2xl font-semibold capitalize md:text-4xl">
              {project.project_name}
            </h1>
            <div className="flex flex-wrap gap-1.5">
              {project.project_tag.map((tag) => (
                <span className="badge badge-outline badge-sm border-gray-200 bg-gray-50 text-gray-600" key={tag}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <p className="font-thai text-base font-normal leading-7 text-base-content/70 md:text-lg">
            {project.project_description}
          </p>
          <div>
            <p className="font-display text-lg font-semibold mb-1">
              {responsibilitiesLabel}
            </p>
            <ul className="list-inside list-disc indent-2 font-thai text-sm font-normal leading-6 text-base-content/80 sm:indent-3 sm:text-[17px] sm:leading-7.5">
              {project.keyResponsibilities.map((keyResponsibility) => (
                <li key={keyResponsibility}>{keyResponsibility}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-display text-lg font-semibold mb-1">
              Technologies Used
            </p>
            <ul className="list-inside list-disc indent-2 font-thai text-sm font-normal leading-6 text-base-content/80 sm:indent-3 sm:text-[17px] sm:leading-7.5">
              {project.technologies_used.map((technology) => (
                <li key={technology}>
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
