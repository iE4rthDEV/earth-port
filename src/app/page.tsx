import Hero from "@/components/sections/Hero";
import MyExperiences from "@/components/sections/MyExperiences";
import ProjectsGrid from "@/components/sections/ProjectsGrid";
import TechStack from "@/components/sections/TechStack";
import React from "react";

const HomePage = () => {
  return (
    <>
      <Hero />
      <TechStack />
      <ProjectsGrid />
      <MyExperiences />
    </>
  );
};

export default HomePage;
