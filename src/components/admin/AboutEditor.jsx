"use client";
import React, { useState, useEffect } from "react";
import { BiUser, BiSave, BiRefresh, BiCheck } from "react-icons/bi";

export default function AboutEditor() {
  const [formData, setFormData] = useState({
    name: "",
    greeting: "Hey mate! I'm",
    role: "Full-Stack Developer",
    roleSubtitle: "Ctrl + C De V eloper 😎",
    email: "",
    address: "",
    phone: "",
    nationality: "India",
    birthDate: "2005-02-10",
    gender: "Male",
    degree: "",
    institution: "",
    story: "",
    resumeUrl: "/resume.pdf",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const fetchAbout = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/about");
      const data = await res.json();
      if (data.success && data.about) {
        setFormData(prev => ({ ...prev, ...data.about }));
      }
    } catch (err) {
      setErrorMsg("Failed to fetch profile: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAbout();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setSuccessMsg("");
    setErrorMsg("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      setSuccessMsg("");
      setErrorMsg("");

      const res = await fetch("/api/about", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSuccessMsg("About and Profile details updated successfully!");
        setTimeout(() => setSuccessMsg(""), 4000);
      } else {
        setErrorMsg(data.error || "Failed to update profile");
      }
    } catch (err) {
      setErrorMsg("Network error: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[350px]">
        <div className="w-8 h-8 border-2 border-[#CBACF9] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-2xl bg-black/25 border border-white/10 backdrop-blur-md">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <BiUser className="text-[#fbbf24]" />
            About & Profile Content Editor
          </h2>
          <p className="text-gray-400 text-sm mt-1">
            Dynamically update biographical details, story narratives, and credentials.
          </p>
        </div>
        <button
          onClick={fetchAbout}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/10 text-sm transition-colors"
        >
          <BiRefresh /> Refresh
        </button>
      </div>

      {successMsg && (
        <div className="p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 flex items-center gap-2 text-sm">
          <BiCheck className="text-lg" />
          <span>{successMsg}</span>
        </div>
      )}

      {errorMsg && (
        <div className="p-4 rounded-xl bg-red-500/15 border border-red-500/30 text-red-300 text-sm">
          {errorMsg}
        </div>
      )}

      {/* Editor Form */}
      <form onSubmit={handleSubmit} className="p-6 rounded-2xl bg-black/25 border border-white/10 backdrop-blur-md space-y-6">
        {/* Basic Info */}
        <div>
          <h3 className="text-base font-semibold text-white mb-4 pb-2 border-b border-white/10">
            Personal Identity & Headline
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="feild-label">Full Name</label>
              <input
                type="text"
                name="name"
                className="field-input field-input-focus"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="feild-label">Role / Title</label>
              <input
                type="text"
                name="role"
                className="field-input field-input-focus"
                value={formData.role}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="feild-label">Greeting Line</label>
              <input
                type="text"
                name="greeting"
                className="field-input field-input-focus"
                value={formData.greeting}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="feild-label">Role Subtitle / Badges</label>
              <input
                type="text"
                name="roleSubtitle"
                className="field-input field-input-focus"
                value={formData.roleSubtitle}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* Profile Card Attributes */}
        <div>
          <h3 className="text-base font-semibold text-white mb-4 pb-2 border-b border-white/10">
            Profile Card Attributes (#Dev-101)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="feild-label">Email</label>
              <input
                type="email"
                name="email"
                className="field-input field-input-focus"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="feild-label">Phone</label>
              <input
                type="text"
                name="phone"
                className="field-input field-input-focus"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="feild-label">Address / Location</label>
              <input
                type="text"
                name="address"
                className="field-input field-input-focus"
                value={formData.address}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="feild-label">Nationality</label>
              <input
                type="text"
                name="nationality"
                className="field-input field-input-focus"
                value={formData.nationality}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="feild-label">Birth Date (YYYY-MM-DD for dynamic age)</label>
              <input
                type="date"
                name="birthDate"
                className="field-input field-input-focus"
                value={formData.birthDate}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="feild-label">Gender</label>
              <input
                type="text"
                name="gender"
                className="field-input field-input-focus"
                value={formData.gender}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* Education & Bio Narrative */}
        <div>
          <h3 className="text-base font-semibold text-white mb-4 pb-2 border-b border-white/10">
            Education & Journey Narrative
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="feild-label">Academic Degree</label>
              <input
                type="text"
                name="degree"
                className="field-input field-input-focus"
                value={formData.degree}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="feild-label">Institution</label>
              <input
                type="text"
                name="institution"
                className="field-input field-input-focus"
                value={formData.institution}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label className="feild-label">How it all started (Story Narrative)</label>
            <textarea
              name="story"
              rows="5"
              className="field-input field-input-focus"
              value={formData.story}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Save Button */}
        <div className="pt-4 border-t border-white/10 flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#CBACF9] text-black font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            <BiSave className="text-lg" />
            {saving ? "Saving Changes..." : "Save Profile"}
          </button>
        </div>
      </form>
    </div>
  );
}
