"use client";
import React from "react";
import { montserrat_alternates, morona } from "@/lib/fonts";
import { projects } from "@/lib/utils";
import Card from "@/components/Card"
const ProjectSection = () => {
  return (
    <div
      id="projects"
      className="relative w-screen min-h-[100vh] flex flex-col items-center justify-center py-10 md:py-20 md:pb-20 lg:pt-[80px] xl:mt-20 gap-8"
    >
      <div className={`flex flex-col items-center text-2xl`}>
        <span className={`opacity-80 font-normal ${morona.className}`}>
          collection of my
        </span>
        <h1 className={`text-4xl md:text-4xl font-medium`}>recent projects</h1>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 md:auto-rows-[30rem]">
        {projects.map((project, index) => (
          <div key={index} >
           <Card title={project.title} des={project.description} img={project.thumbnail} tech={project.techs} link={project.link}/>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectSection;
