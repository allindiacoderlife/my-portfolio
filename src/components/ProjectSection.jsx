"use client";
import React, { useState } from "react";
import { montserrat_alternates, morona } from "@/lib/fonts";
import { projects } from "@/lib/utils";
import Card from "@/components/Card";
import { DynamicProjectModal } from "@/lib/dynamic-imports";
import { AnimatePresence } from "framer-motion";

const ProjectSection = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProject(null), 300);
  };
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
           <Card 
             title={project.title} 
             des={project.description} 
             img={project.thumbnail} 
             tech={project.techs} 
             link={project.link}
             project={project}
             onViewDetails={() => openModal(project)}
           />
          </div>
        ))}
      </div>
      
      {/* Project Details Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <DynamicProjectModal 
            project={selectedProject}
            isOpen={isModalOpen}
            onClose={closeModal}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProjectSection;
