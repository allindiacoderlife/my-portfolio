"use client";
import React, { useState, useEffect } from 'react';
import { poiret_one } from "@/lib/fonts";
import { BiEdit, BiTrash, BiLinkExternal, BiLogoGithub, BiX, BiSave } from "react-icons/bi";
import { getTechIcon } from '@/lib/technologies';
import ImageUpload from "@/components/ui/ImageUpload";
import TechnologySelector from "@/components/ui/TechnologySelector";

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingProject, setEditingProject] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/projects');
      const data = await response.json();

      if (response.ok) {
        setProjects(data.projects || []);
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
        setProjects(projects.filter(project => project._id !== projectId));
      } else {
        alert('Error deleting project: ' + (data.error || 'Unknown error'));
      }
    } catch (error) {
      alert('Error deleting project: ' + error.message);
    }
  };

  const handleEditClick = (project) => {
    setEditingProject({ ...project });
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    if (!editingProject) return;

    try {
      setIsUpdating(true);
      const res = await fetch(`/api/projects/${editingProject._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingProject),
      });
      const data = await res.json();
      if (res.ok) {
        alert('Project updated successfully!');
        setEditingProject(null);
        fetchProjects();
      } else {
        alert('Error updating project: ' + (data.error || 'Unknown error'));
      }
    } catch (err) {
      alert('Error updating project: ' + err.message);
    } finally {
      setIsUpdating(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-8 h-8 border-2 border-[#CBACF9] border-t-transparent rounded-full animate-spin"></div>
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
    <div className="w-full max-w-6xl mx-auto p-5 animate-fadeIn">
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
              className="border border-white/10 rounded-xl bg-black/20 backdrop-blur-sm p-5 hover:border-white/20 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Project Thumbnail */}
                {project.thumbnail && (
                  <div className="mb-4 rounded-lg overflow-hidden h-44 bg-black/40">
                    <img
                      src={project.thumbnail}
                      alt={project.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  </div>
                )}

                {/* Project Info */}
                <div className="mb-4">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="text-lg font-semibold text-white line-clamp-1">
                      {project.title}
                    </h3>
                    {project.category && (
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-white/10 text-gray-300 shrink-0">
                        {project.category}
                      </span>
                    )}
                  </div>

                  <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {(project.technologies || '').split(',').map((tech, index) => {
                      const techName = tech.trim();
                      if (!techName) return null;
                      const iconPath = getTechIcon(techName);
                      return (
                        <div
                          key={index}
                          className="flex items-center gap-1 px-2 py-0.5 text-xs bg-white/10 rounded text-gray-300"
                        >
                          {iconPath && (
                            <img
                              src={iconPath}
                              alt={techName}
                              className="w-3.5 h-3.5 object-contain"
                              onError={(e) => { e.target.style.display = 'none'; }}
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
              </div>

              {/* Project Links & Actions */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  {(project.githubUrl || project.githubLink) && (
                    <a
                      href={project.githubUrl || project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 px-2.5 py-1 text-xs text-gray-300 hover:text-white transition-colors border border-white/10 rounded hover:border-white/20"
                    >
                      <BiLogoGithub /> GitHub
                    </a>
                  )}
                  {(project.liveUrl || project.liveDemo || project.link) && (
                    <a
                      href={project.liveUrl || project.liveDemo || project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 px-2.5 py-1 text-xs text-gray-300 hover:text-white transition-colors border border-white/10 rounded hover:border-white/20"
                    >
                      <BiLinkExternal /> Live
                    </a>
                  )}
                </div>

                <div className="flex items-center gap-2 pt-3 border-t border-white/10">
                  <button
                    onClick={() => handleEditClick(project)}
                    className="flex-1 flex items-center justify-center gap-1 px-3 py-1.5 text-xs text-[#CBACF9] hover:bg-[#CBACF9]/10 transition-colors border border-[#CBACF9]/30 rounded-lg"
                  >
                    <BiEdit /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(project._id)}
                    className="flex items-center justify-center gap-1 px-3 py-1.5 text-xs text-red-400 hover:bg-red-500/10 transition-colors border border-red-500/30 rounded-lg"
                  >
                    <BiTrash /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Project Modal */}
      {editingProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-[#0f172a] border border-white/20 rounded-2xl p-6 shadow-2xl max-h-[90vh] overflow-y-auto my-8">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
              <h3 className="text-xl font-bold text-white">Edit Project</h3>
              <button
                onClick={() => setEditingProject(null)}
                className="text-gray-400 hover:text-white text-2xl"
              >
                <BiX />
              </button>
            </div>

            <form onSubmit={handleUpdateSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="feild-label">Title</label>
                  <input
                    type="text"
                    className="field-input field-input-focus"
                    value={editingProject.title || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="feild-label">Category</label>
                  <select
                    className="field-input field-input-focus"
                    value={editingProject.category || 'Other'}
                    onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value })}
                  >
                    <option value="Healthcare">Healthcare</option>
                    <option value="E-Commerce">E-Commerce</option>
                    <option value="Finance">Finance</option>
                    <option value="Education">Education</option>
                    <option value="Productivity">Productivity</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="feild-label">Technologies (comma separated)</label>
                <input
                  type="text"
                  className="field-input field-input-focus"
                  value={editingProject.technologies || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, technologies: e.target.value })}
                />
              </div>

              <div>
                <label className="feild-label">Thumbnail URL or Upload</label>
                <input
                  type="text"
                  className="field-input field-input-focus mb-2"
                  value={editingProject.thumbnail || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, thumbnail: e.target.value })}
                />
                <ImageUpload
                  onImageUpload={(url) => setEditingProject({ ...editingProject, thumbnail: url })}
                  currentImage={editingProject.thumbnail}
                  placeholder="Upload new thumbnail"
                />
              </div>

              <div>
                <label className="feild-label">Short Description</label>
                <textarea
                  rows="2"
                  className="field-input field-input-focus"
                  value={editingProject.description || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="feild-label">Detailed Description</label>
                <textarea
                  rows="4"
                  className="field-input field-input-focus"
                  value={editingProject.detailedDescription || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, detailedDescription: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="feild-label">GitHub URL</label>
                  <input
                    type="url"
                    className="field-input field-input-focus"
                    value={editingProject.githubUrl || editingProject.githubLink || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, githubUrl: e.target.value, githubLink: e.target.value })}
                  />
                </div>
                <div>
                  <label className="feild-label">Live Demo URL</label>
                  <input
                    type="url"
                    className="field-input field-input-focus"
                    value={editingProject.liveUrl || editingProject.liveDemo || editingProject.link || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, liveUrl: e.target.value, liveDemo: e.target.value, link: e.target.value })}
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setEditingProject(null)}
                  className="px-4 py-2 rounded-lg bg-white/10 text-gray-300 hover:text-white text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUpdating}
                  className="flex items-center gap-2 px-5 py-2 rounded-lg bg-[#CBACF9] text-black font-semibold text-sm hover:opacity-90 disabled:opacity-50"
                >
                  <BiSave /> {isUpdating ? 'Saving...' : 'Update Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectList;
