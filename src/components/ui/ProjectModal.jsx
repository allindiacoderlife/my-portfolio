"use client";
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaTimes, FaGithub, FaExternalLinkAlt, FaCheckCircle } from 'react-icons/fa';
import { montserrat_alternates } from "@/lib/fonts";

const ProjectModal = ({ project, isOpen, onClose }) => {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      
      // Add escape key handler
      const handleEscape = (e) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };
      
      document.addEventListener('keydown', handleEscape);
      
      return () => {
        document.removeEventListener('keydown', handleEscape);
      };
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup function to restore scroll when component unmounts
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!project || !isOpen) return null;

  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 50
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: 50,
      transition: {
        duration: 0.2
      }
    }
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 overflow-hidden"
      variants={backdropVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <motion.div
        className="relative w-full max-w-4xl max-h-[90vh] bg-[#0F0F23] border border-white/10 rounded-2xl flex flex-col overflow-hidden"
        variants={modalVariants}
        onClick={(e) => e.stopPropagation()}
      >
            {/* Header - Fixed */}
            <div className="flex-shrink-0 bg-[#0F0F23] border-b border-white/10 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className={`text-2xl md:text-3xl font-bold text-white ${montserrat_alternates.className}`}>
                    {project.title}
                  </h2>
                  <p className="text-[#CBACF9] mt-1">{project.category}</p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <FaTimes className="text-white text-xl" />
                </button>
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-8">
              {/* Project Image */}
              <div className="relative h-64 md:h-80 rounded-xl overflow-hidden">
                <div
                  className="w-full h-full"
                  style={{
                    backgroundImage: `url(${project.thumbnail})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat"
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>

              {/* Description */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-3">About This Project</h3>
                <p className="text-gray-300 leading-relaxed">
                  {project.detailedDescription || project.description}
                </p>
              </div>

              {/* Features */}
              {project.features && (
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">Key Features</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {project.features.map((feature, index) => (
                      <motion.div
                        key={index}
                        className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/10"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <FaCheckCircle className="text-[#CBACF9] text-sm flex-shrink-0" />
                        <span className="text-gray-300 text-sm">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tech Stack */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Technology Stack</h3>
                <div className="flex flex-wrap gap-4">
                  {project.techs && project.techs.map((tech, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10"
                    >
                      <div
                        className="w-6 h-6"
                        style={{
                          backgroundImage: `url(${tech})`,
                          backgroundSize: "contain",
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "center"
                        }}
                      />
                      {project.techStack && project.techStack[index] && (
                        <span className="text-gray-300 text-sm">{project.techStack[index]}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-white/10">
                <motion.a
                  href={project.liveDemo || project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 px-6 py-3 bg-[#CBACF9] text-black font-semibold rounded-lg hover:bg-[#CBACF9]/90 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FaExternalLinkAlt />
                  View Live Demo
                </motion.a>
                
                {project.githubLink && (
                  <motion.a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 px-6 py-3 bg-white/10 text-white font-semibold rounded-lg hover:bg-white/20 transition-colors border border-white/20"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <FaGithub />
                    View Source Code
                  </motion.a>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
  );
};

export default ProjectModal;
