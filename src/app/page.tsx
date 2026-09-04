import Hero from "@/components/sections/Hero";
import MyExperiences from "@/components/sections/MyExperiences";
import ProjectsGrid from "@/components/sections/ProjectsGrid";
import TechStack from "@/components/sections/TechStack";
import { getDictionary } from "@/i18n/dictionaries";
import { getRequestLocale } from "@/i18n/server";
import { getExperiences } from "@/lib/experiences";

const HomePage = async () => {
  const locale = await getRequestLocale();
  const dictionary = await getDictionary(locale);
  const experiences = getExperiences(locale);

  return (
    <>
      <Hero copy={dictionary.home} />
      <TechStack heading={dictionary.home.technologiesHeading} />
      <ProjectsGrid
        locale={locale}
        heading={dictionary.home.projectsHeading}
        highlight={dictionary.home.projectsHighlight}
        cardCopy={dictionary.projects}
      />
      <MyExperiences
        experiences={experiences}
        heading={dictionary.home.experiencesHeading}
        cardCopy={{
          showDetails: dictionary.home.showDetails,
          hideDetails: dictionary.home.hideDetails,
          opensNewTab: dictionary.common.opensNewTab,
        }}
      />
    </>
  );
};

export default HomePage;
