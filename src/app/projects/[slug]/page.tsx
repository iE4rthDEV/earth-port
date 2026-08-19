import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import {
  getProjectById,
  getProjectBySlug,
  getProjects,
} from "@/lib/projects";
import ProjectImageModal from "@/components/ui/ProjectImageModal";
import ProjectLinks from "@/components/ui/ProjectLinks";
import TechBadge from "@/components/ui/TechBadge";
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
    project.project_responsibilities,
  );

  return (
    <div className="mx-auto w-full max-w-(--container-page) px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-16">
      <nav
        aria-label="Breadcrumb"
        className="mb-8 font-display text-sm text-base-content/60 lg:mb-10"
      >
        <Link href="/projects" className="link link-primary no-underline">
          Projects
        </Link>
        <span className="mx-1">/</span>
        <span className="text-base-content/60">{project.project_name}</span>
      </nav>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:content-start lg:gap-x-12 lg:gap-y-6">
        <div className="space-y-3 lg:col-start-2 lg:row-start-1">
          <h1 className="text-page-title text-balance font-display font-semibold leading-tight capitalize">
            {project.project_name}
          </h1>
          <div className="flex flex-wrap gap-2">
            {project.project_tag.map((tag) => (
              <TechBadge key={tag} tag={tag} size="sm" />
            ))}
          </div>
        </div>

        <div className="lg:col-start-1 lg:row-start-1 lg:row-span-5 lg:self-start">
          <ProjectImageModal
            src={project.project_image}
            alt={project.project_name}
          />
        </div>

        <div
          data-project-description
          className="lg:col-start-2 lg:row-start-2"
        >
          <p className="max-w-measure font-thai text-base leading-7 text-base-content/75 sm:text-lg sm:leading-8">
            {project.project_description}
          </p>
        </div>

        <section
          data-project-responsibilities
          aria-labelledby="responsibilities-heading"
          className="lg:col-start-2 lg:row-start-3"
        >
          <h2
            id="responsibilities-heading"
            className="mb-2 font-display text-lg font-semibold"
          >
            {responsibilitiesLabel}
          </h2>
          <ul className="list-outside list-disc space-y-2 ps-5 font-thai text-base leading-7 text-base-content/80">
            {project.keyResponsibilities.map((keyResponsibility) => (
              <li key={keyResponsibility}>{keyResponsibility}</li>
            ))}
          </ul>
        </section>

        <section
          data-project-technologies
          aria-labelledby="technologies-used-heading"
          className="lg:col-start-2 lg:row-start-4"
        >
          <h2
            id="technologies-used-heading"
            className="mb-2 font-display text-lg font-semibold"
          >
            Technologies Used
          </h2>
          <ul className="list-outside list-disc space-y-2 ps-5 font-thai text-base leading-7 text-base-content/80">
            {project.technologies_used.map((technology) => (
              <li key={technology}>{technology}</li>
            ))}
          </ul>
        </section>

        <div className="lg:col-start-2 lg:row-start-5">
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
