"use client";
import React, { useState, useEffect } from 'react';
import { poiret_one } from "@/lib/fonts";
import { BiEdit, BiTrash, BiLinkExternal, BiLogoGithub } from "react-icons/bi";
import { getTechIcon } from '@/lib/technologies';

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/projects');
      const data = await response.json();

      if (response.ok) {
        setProjects(data.projects);
      } else {
        setError(data.error || 'Failed to fetch projects');
      }
    } catch (error) {
      setError('Network error: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (projectId) => {
    if (!confirm('Are you sure you want to delete this project?')) {
      return;
    }

    try {
      const response = await fetch(`/api/projects/${projectId}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (response.ok) {
        alert('Project deleted successfully!');
        // Remove the deleted project from the list
        setProjects(projects.filter(project => project._id !== projectId));
      } else {
        alert('Error deleting project: ' + (data.error || 'Unknown error'));
      }
    } catch (error) {
      alert('Error deleting project: ' + error.message);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-gray-300">Loading projects...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-red-400">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-5">
      <div className="flex items-center justify-between mb-8">
        <span className={`${poiret_one.className} text-2xl text-gray-300`}>
          All Projects ({projects.length})
        </span>
        <button
          onClick={fetchProjects}
          className="px-4 py-2 text-sm text-gray-300 hover:text-white transition-colors border border-white/10 rounded-lg hover:border-white/20"
        >
          Refresh
        </button>
      </div>

      {projects.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-400">No projects found. Add your first project!</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <div
              key={project._id}
              className="border border-white/10 rounded-xl bg-black/20 backdrop-blur-sm p-5 hover:border-white/20 transition-colors"
            >
              {/* Project Thumbnail */}
              {project.thumbnail && (
                <div className="mb-4 rounded-lg overflow-hidden">
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                </div>
              )}

              {/* Project Info */}
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2">
                  {project.title}
                </h3>
                <p className="text-gray-400 text-sm mb-3 line-clamp-3">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-3">
                  {project.technologies.split(',').map((tech, index) => {
                    const techName = tech.trim();
                    const iconPath = getTechIcon(techName);
                    return (
                      <div
                        key={index}
                        className="flex items-center gap-1 px-2 py-1 text-xs bg-white/10 rounded text-gray-300"
                      >
                        {iconPath && (
                          <img
                            src={iconPath}
                            alt={techName}
                            className="w-4 h-4 object-contain"
                            onError={(e) => {
                              e.target.style.display = 'none';
                            }}
                          />
                        )}
                        <span>{techName}</span>
                      </div>
                    );
                  })}
                </div>
                <p className="text-xs text-gray-500">
                  Created: {formatDate(project.createdAt)}
                </p>
              </div>

              {/* Project Links */}
              <div className="flex items-center gap-2 mb-4">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 px-3 py-1 text-sm text-gray-300 hover:text-white transition-colors border border-white/10 rounded hover:border-white/20"
                  >
                    <BiLogoGithub />
                    GitHub
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 px-3 py-1 text-sm text-gray-300 hover:text-white transition-colors border border-white/10 rounded hover:border-white/20"
                  >
                    <BiLinkExternal />
                    Live
                  </a>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleDelete(project._id)}
                  className="flex items-center gap-1 px-3 py-1 text-sm text-red-400 hover:text-red-300 transition-colors border border-red-400/20 rounded hover:border-red-400/40"
                >
                  <BiTrash />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectList;
