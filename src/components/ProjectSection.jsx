"use client";
import React, { useState, useEffect } from "react";
import { montserrat_alternates, morona } from "@/lib/fonts";
import { projects as defaultProjects } from "@/lib/utils";
import Card from "@/components/Card";
import { DynamicProjectModal } from "@/lib/dynamic-imports";
import { AnimatePresence } from "framer-motion";

const ProjectSection = () => {
  const [projectList, setProjectList] = useState(defaultProjects);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => {
        if (data.projects && Array.isArray(data.projects) && data.projects.length > 0) {
          setProjectList(data.projects);
        }
      })
      .catch((err) => {
        console.warn("Using default projects fallback:", err.message);
      });
  }, []);

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
        {projectList.map((project, index) => (
          <div key={project._id || index} >
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
