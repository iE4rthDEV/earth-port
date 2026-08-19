import Link from "next/link";
import Image from "next/image";
import { notFound, redirect } from "next/navigation";
import { FiArrowLeft } from "react-icons/fi";
import {
  getProjectById,
  getProjectBySlug,
  getProjects,
} from "@/lib/projects";
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
    <div className="mx-auto w-full max-w-(--container-page) px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-8">
      <nav
        aria-label="Back to projects"
        className="mb-6 lg:mb-8"
      >
        <Link
          href="/projects"
          className="btn btn-ghost btn-sm gap-1.5 rounded-field px-3 font-display text-sm font-normal text-base-content/70 hover:bg-base-200 hover:text-primary"
        >
          <FiArrowLeft aria-hidden="true" className="size-4" /> Projects
        </Link>
      </nav>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,9fr)_minmax(0,11fr)] lg:items-start lg:gap-x-10">
        <div className="order-1 w-full lg:order-0 lg:col-start-1 lg:row-start-1 lg:max-w-md">
          <Image
            src={project.project_image}
            alt={project.project_name}
            width={1080}
            height={1080}
            loading="eager"
            sizes="(max-width: 1023px) calc(100vw - 2rem), 32rem"
            className="h-auto w-full rounded-box border border-base-300 object-contain object-top shadow-lg"
          />
        </div>

        <div className="order-2 space-y-6 lg:order-0 lg:col-start-2 lg:row-start-1">
          <div className="space-y-3">
            <h1 className="text-project-title font-display font-semibold leading-tight capitalize">
              {project.project_name}
            </h1>
            <div className="flex flex-wrap gap-2">
              {project.project_tag.map((tag) => (
                <TechBadge key={tag} tag={tag} size="sm" />
              ))}
            </div>
          </div>

          <div data-project-description>
            <p className="font-thai text-base leading-7 text-base-content/75 sm:text-lg sm:leading-8">
              {project.project_description}
            </p>
          </div>

          <section
            data-project-responsibilities
            aria-labelledby="responsibilities-heading"
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
