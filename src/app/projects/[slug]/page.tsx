import Image from "next/image";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { FiChevronLeft } from "react-icons/fi";
import ProjectLinks from "@/components/ui/ProjectLinks";
import TechBadge from "@/components/ui/TechBadge";
import { PROJECTS } from "@/data/projects";
import { getDictionary } from "@/i18n/dictionaries";
import { getRequestLocale } from "@/i18n/server";
import {
  getProjectById,
  getProjectBySlug,
  getProjectPath,
} from "@/lib/projects";
import { formatResponsibilities } from "@/types/project";

interface ProjectDetailPageProps {
  params: Promise<{ slug: string }>;
}

export const generateStaticParams = () =>
  PROJECTS.map((project) => ({ slug: project.slug }));

const ProjectDetailPage = async ({ params }: ProjectDetailPageProps) => {
  const { slug } = await params;
  const locale = await getRequestLocale();
  const dictionary = await getDictionary(locale);
  const projectBySlug = getProjectBySlug(slug, locale);

  if (!projectBySlug) {
    const projectById = getProjectById(slug, locale);
    if (projectById) redirect(getProjectPath(projectById));
    notFound();
  }

  const project = projectBySlug;
  const responsibilitiesLabel = formatResponsibilities(
    project.projectRoles,
  );

  return (
    <div className="mx-auto w-full max-w-(--container-page) px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-8">
      <nav aria-label={dictionary.projectDetail.backLabel} className="mb-4 lg:mb-6">
        <Link
          href="/projects"
          className="btn btn-soft btn-primary btn-sm -ml-2 gap-1.5 rounded-field border-0 bg-transparent px-2 font-display text-sm font-medium text-base-content/70 hover:text-primary"
        >
          <FiChevronLeft aria-hidden="true" className="size-4" />
          {dictionary.projectDetail.backToProjects}
        </Link>
      </nav>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,9fr)_minmax(0,11fr)] lg:items-start lg:gap-x-10">
        <div className="order-1 w-full lg:order-0 lg:col-start-1 lg:row-start-1 lg:max-w-md">
          <Image
            src={project.projectImage}
            alt={`${dictionary.projectDetail.projectImageAlt}: ${project.projectName}`}
            width={1080}
            height={1080}
            loading="eager"
            sizes="(max-width: 1023px) calc(100vw - 2rem), 32rem"
            className="h-auto w-full rounded-box border border-base-300 object-contain object-top shadow-lg"
          />
        </div>

        <div className="order-2 space-y-6 lg:order-0 lg:col-start-2 lg:row-start-1">
          <div className="space-y-3">
            <h1 className="text-[calc(var(--text-project-title)-2px)] font-display font-semibold leading-tight capitalize">
              {project.projectName}
            </h1>
            <div className="flex flex-wrap gap-1">
              {project.projectTags.map((tag) => (
                <TechBadge key={tag} tag={tag} size="sm" compact />
              ))}
            </div>
          </div>

          <div data-project-description>
            <p className="font-thai text-base leading-7 text-base-content/75 sm:text-lg sm:leading-8">
              {project.projectDescription}
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
              {project.keyResponsibilities.map((responsibility) => (
                <li key={responsibility}>{responsibility}</li>
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
              {dictionary.projectDetail.technologiesUsed}
            </h2>
            <ul className="list-outside list-disc space-y-2 ps-5 font-thai text-base leading-7 text-base-content/80">
              {project.technologiesUsed.map((technology) => (
                <li key={technology}>{technology}</li>
              ))}
            </ul>
          </section>

          <ProjectLinks
            liveUrl={project.liveUrl}
            githubUrl={project.githubUrl}
            copy={dictionary.projectDetail}
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailPage;
