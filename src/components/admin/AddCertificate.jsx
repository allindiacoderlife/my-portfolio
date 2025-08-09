"use client";
import React, { useState } from 'react';
import { FancyButtonAlt } from "@/components/ui/FancyButton";
import { CiSaveUp2 } from "react-icons/ci";
import ImageUpload from "@/components/ui/ImageUpload";
import { processCertificateData } from "@/lib/certificateSchema";

const AddCertificate = ({ onLogout }) => {
  const [formData, setFormData] = useState({
    title: "",
    issuer: "",
    date: "",
    description: "",
    credentialId: "",
    skills: [],
    verifyLink: "",
    image: "",
  });
  const [skillInput, setSkillInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (imageUrl, imageData) => {
    setFormData({ ...formData, image: imageUrl });
  };

  const addSkill = () => {
    if (skillInput.trim() && !formData.skills.includes(skillInput.trim())) {
      setFormData({ 
        ...formData, 
        skills: [...formData.skills, skillInput.trim()] 
      });
      setSkillInput("");
    }
  };

  const removeSkill = (index) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter((_, i) => i !== index)
    });
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Process the form data before sending
      const processedData = processCertificateData(formData);
      
      const response = await fetch('/api/certificates', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(processedData),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Certificate added successfully!");
        setFormData({
          title: "",
          issuer: "",
          date: "",
          description: "",
          credentialId: "",
          skills: [],
          verifyLink: "",
          image: "",
        });
        setSkillInput("");
      } else {
        alert("Error adding certificate: " + (data.error || 'Unknown error'));
        if (data.details) {
          console.error('Validation errors:', data.details);
        }
      }
    } catch (error) {
      alert("Error adding certificate: " + error.message);
      console.error('Network error:', error);
    }

    setIsLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center max-w-2xl w-full p-5 mx-auto border border-white/10 rounded-2xl bg-black/20 backdrop-blur-sm">
      <div className="flex flex-col items-start w-full gap-5 mb-10">
        <h2 className="text-heading">Add New Certificate</h2>
        <p className="font-normal text-neutral-400">
          Fill in the details below to add a new certificate to your portfolio
        </p>
      </div>

      <form className="w-full" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
          <div>
            <label htmlFor="title" className="feild-label">
              Certificate Title
            </label>
            <input
              id="title"
              name="title"
              type="text"
              className="field-input field-input-focus"
              placeholder="Full Stack Web Development"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          
          <div>
            <label htmlFor="issuer" className="feild-label">
              Issuing Organization
            </label>
            <input
              id="issuer"
              name="issuer"
              type="text"
              className="field-input field-input-focus"
              placeholder="freeCodeCamp, Coursera, etc."
              value={formData.issuer}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
          <div>
            <label htmlFor="date" className="feild-label">
              Date Obtained
            </label>
            <input
              id="date"
              name="date"
              type="text"
              className="field-input field-input-focus"
              placeholder="2024 or Jan 2024"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>
          
          <div>
            <label htmlFor="credentialId" className="feild-label">
              Credential ID
            </label>
            <input
              id="credentialId"
              name="credentialId"
              type="text"
              className="field-input field-input-focus"
              placeholder="Certificate ID or number"
              value={formData.credentialId}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="mb-5">
          <label className="feild-label">
            Certificate Image
          </label>
          <ImageUpload
            onImageUpload={handleImageUpload}
            currentImage={formData.image}
            folder="/portfolio/certificates"
            placeholder="Upload certificate image"
          />
        </div>

        <div className="mb-5">
          <label htmlFor="description" className="feild-label">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows="3"
            className="field-input field-input-focus"
            placeholder="Brief description of what this certificate covers..."
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-5">
          <label className="feild-label">
            Skills & Technologies
          </label>
          <div className="space-y-3">
            <div className="flex gap-2">
              <input
                type="text"
                className="field-input field-input-focus flex-1"
                placeholder="Add a skill (e.g., React, JavaScript)"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <button
                type="button"
                onClick={addSkill}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Add
              </button>
            </div>
            {formData.skills.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm text-gray-400">Skills added:</p>
                <div className="flex flex-wrap gap-2">
                  {formData.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-gray-700 text-white rounded-full text-sm"
                    >
                      {skill}
                      <button
                        type="button"
                        onClick={() => removeSkill(index)}
                        className="ml-1 text-red-400 hover:text-red-300"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mb-5">
          <label htmlFor="verifyLink" className="feild-label">
            Verification Link
          </label>
          <input
            id="verifyLink"
            name="verifyLink"
            type="url"
            className="field-input field-input-focus"
            placeholder="https://certificate-verification-url.com"
            value={formData.verifyLink}
            onChange={handleChange}
          />
        </div>

        <div className="mb-5">
          <label htmlFor="image" className="feild-label">
            Or Enter Image URL Manually
          </label>
          <input
            id="image"
            name="image"
            type="url"
            className="field-input field-input-focus"
            placeholder="https://example.com/certificate.jpg (optional if uploaded above)"
            value={formData.image}
            onChange={handleChange}
          />
          <p className="text-xs text-gray-500 mt-1">
            You can either upload an image above or enter a URL manually
          </p>
        </div>

        <div className="justify-center flex mt-8">
          <FancyButtonAlt 
            title={!isLoading ? "Add Certificate" : "Adding Certificate..."} 
            icon={<CiSaveUp2 />} 
          />
        </div>
      </form>
    </div>
  );
};

export default AddCertificate;
