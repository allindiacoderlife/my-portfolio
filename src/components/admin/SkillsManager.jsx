"use client";
import React, { useState, useEffect } from "react";
import { BiTrash, BiPlus, BiWrench, BiRefresh } from "react-icons/bi";
import ImageUpload from "@/components/ui/ImageUpload";

export default function SkillsManager() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState("all");

  const [formData, setFormData] = useState({
    name: "",
    img: "/assets/StackLogos/react.png",
    category: "frontend",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchSkills = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/skills");
      const data = await res.json();
      if (data.success) {
        setSkills(data.skills || []);
      } else {
        setError(data.error || "Failed to fetch skills");
      }
    } catch (err) {
      setError("Network error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const handleAddSkill = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return alert("Skill name is required");

    try {
      setIsSubmitting(true);
      const res = await fetch("/api/skills", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        alert("Skill added successfully!");
        setFormData({
          name: "",
          img: "/assets/StackLogos/react.png",
          category: formData.category,
        });
        fetchSkills();
      } else {
        alert("Error adding skill: " + (data.error || "Unknown error"));
      }
    } catch (err) {
      alert("Error adding skill: " + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteSkill = async (id, name) => {
    if (!confirm(`Are you sure you want to delete "${name}"?`)) return;

    try {
      const res = await fetch(`/api/skills/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (res.ok && data.success) {
        setSkills(prev => prev.filter(s => s._id !== id));
      } else {
        alert("Error deleting skill: " + (data.error || "Unknown error"));
      }
    } catch (err) {
      alert("Error deleting skill: " + err.message);
    }
  };

  const categories = [
    { key: "all", label: "All Skills" },
    { key: "frontend", label: "Frontend" },
    { key: "backend", label: "Backend" },
    { key: "database", label: "Database" },
    { key: "other", label: "Tools / Other" },
  ];

  const filteredSkills = activeCategory === "all" 
    ? skills 
    : skills.filter(s => s.category?.toLowerCase() === activeCategory);

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-2xl bg-black/25 border border-white/10 backdrop-blur-md">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <BiWrench className="text-[#34d399]" />
            Skills & Technologies Management
          </h2>
          <p className="text-gray-400 text-sm mt-1">
            Configure dynamic technical proficiencies for marquee animated rows.
          </p>
        </div>
        <button
          onClick={fetchSkills}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/10 text-sm transition-colors"
        >
          <BiRefresh /> Refresh
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Add Skill Form */}
        <div className="lg:col-span-1 p-6 rounded-2xl bg-black/25 border border-white/10 backdrop-blur-md h-fit space-y-5">
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <BiPlus className="text-[#CBACF9]" />
            Add New Skill
          </h3>

          <form onSubmit={handleAddSkill} className="space-y-4">
            <div>
              <label className="feild-label">Skill Name</label>
              <input
                type="text"
                className="field-input field-input-focus"
                placeholder="e.g. Next.js, Docker, GraphQL"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="feild-label">Category</label>
              <select
                className="field-input field-input-focus"
                value={formData.category}
                onChange={e => setFormData({ ...formData, category: e.target.value })}
              >
                <option value="frontend">Frontend</option>
                <option value="backend">Backend</option>
                <option value="database">Database</option>
                <option value="other">Tools / Other</option>
              </select>
            </div>

            <div>
              <label className="feild-label">Skill Icon / Logo URL</label>
              <input
                type="text"
                className="field-input field-input-focus"
                placeholder="/assets/StackLogos/react.png or image URL"
                value={formData.img}
                onChange={e => setFormData({ ...formData, img: e.target.value })}
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                You can upload a custom logo below or paste an image URL.
              </p>
            </div>

            <div>
              <label className="feild-label">Or Upload Logo</label>
              <ImageUpload
                onImageUpload={(url) => setFormData({ ...formData, img: url })}
                currentImage={formData.img}
                placeholder="Upload skill icon"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-4 py-2.5 px-4 rounded-xl bg-[#CBACF9] text-black font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {isSubmitting ? "Adding..." : "Add Skill"}
            </button>
          </form>
        </div>

        {/* Existing Skills List */}
        <div className="lg:col-span-2 space-y-5">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2 p-1.5 rounded-xl bg-black/20 border border-white/10 w-fit">
            {categories.map(c => (
              <button
                key={c.key}
                onClick={() => setActiveCategory(c.key)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  activeCategory === c.key
                    ? "bg-[#CBACF9]/20 text-[#CBACF9] border border-[#CBACF9]/30"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {c.label} ({c.key === "all" ? skills.length : skills.filter(s => s.category?.toLowerCase() === c.key).length})
              </button>
            ))}
          </div>

          {loading ? (
            <div className="flex items-center justify-center min-h-[300px]">
              <div className="w-8 h-8 border-2 border-[#CBACF9] border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : error ? (
            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-300 text-sm">
              {error}
            </div>
          ) : filteredSkills.length === 0 ? (
            <div className="p-8 text-center text-gray-500 bg-black/20 border border-white/5 rounded-2xl">
              No skills found in this category.
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3.5">
              {filteredSkills.map(skill => (
                <div
                  key={skill._id}
                  className="p-3.5 rounded-xl bg-black/30 border border-white/10 hover:border-white/20 transition-all flex items-center justify-between group"
                >
                  <div className="flex items-center gap-2.5 overflow-hidden">
                    <img
                      src={skill.img}
                      alt={skill.name}
                      className="w-7 h-7 object-contain opacity-80"
                      onError={e => { e.target.style.display = 'none'; }}
                    />
                    <div className="truncate">
                      <span className="text-sm font-medium text-white block truncate">
                        {skill.name}
                      </span>
                      <span className="text-[10px] text-gray-400 uppercase tracking-wider block">
                        {skill.category}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleDeleteSkill(skill._id, skill.name)}
                    className="opacity-0 group-hover:opacity-100 p-1.5 rounded-md hover:bg-red-500/20 text-red-400 transition-opacity"
                    title="Delete skill"
                  >
                    <BiTrash className="text-sm" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
