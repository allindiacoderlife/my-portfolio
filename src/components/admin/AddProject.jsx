"use client";
import React, { useState } from 'react';
import { FancyButtonAlt } from "@/components/ui/FancyButton";
import { CiSaveUp2 } from "react-icons/ci";
import ImageUpload from "@/components/ui/ImageUpload";
import TechnologySelector from "@/components/ui/TechnologySelector";
import { processProjectData } from "@/lib/projectSchema";

const AddProject = ({ onLogout }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    detailedDescription: "",
    technologies: "",
    features: [],
    category: "",
    githubUrl: "",
    liveUrl: "",
    thumbnail: "",
  });
  const [featureInput, setFeatureInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (imageUrl, imageData) => {
    setFormData({ ...formData, thumbnail: imageUrl });
  };

  const handleTechnologyChange = (technologies) => {
    setFormData({ ...formData, technologies });
  };

  const addFeature = () => {
    if (featureInput.trim() && !formData.features.includes(featureInput.trim())) {
      setFormData({ 
        ...formData, 
        features: [...formData.features, featureInput.trim()] 
      });
      setFeatureInput("");
    }
  };

  const removeFeature = (index) => {
    setFormData({
      ...formData,
      features: formData.features.filter((_, i) => i !== index)
    });
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addFeature();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Process the form data before sending
      const processedData = processProjectData(formData);
      
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(processedData),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Project added successfully!");
        setFormData({
          title: "",
          description: "",
          detailedDescription: "",
          technologies: "",
          features: [],
          category: "",
          githubUrl: "",
          liveUrl: "",
          thumbnail: "",
        });
        setFeatureInput("");
      } else {
        alert("Error adding project: " + (data.error || 'Unknown error'));
        if (data.details) {
          console.error('Validation errors:', data.details);
        }
      }
    } catch (error) {
      alert("Error adding project: " + error.message);
      console.error('Network error:', error);
    }

    setIsLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center max-w-2xl w-full p-5 mx-auto border border-white/10 rounded-2xl bg-black/20 backdrop-blur-sm">
      <div className="flex flex-col items-start w-full gap-5 mb-10">
        <h2 className="text-heading">Add New Project</h2>
        <p className="font-normal text-neutral-400">
          Fill in the details below to add a new project to your portfolio
        </p>
      </div>

      <form className="w-full" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
          <div>
            <label htmlFor="title" className="feild-label">
              Project Title
            </label>
            <input
              id="title"
              name="title"
              type="text"
              className="field-input field-input-focus"
              placeholder="My Awesome Project"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          
          <div>
            <label htmlFor="category" className="feild-label">
              Project Category
            </label>
            <select
              id="category"
              name="category"
              className="field-input field-input-focus"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">Select Category</option>
              <option value="E-Commerce">E-Commerce</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Business">Business</option>
              <option value="Finance">Finance</option>
              <option value="Education">Education</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Social">Social</option>
              <option value="Productivity">Productivity</option>
              <option value="Games">Games</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        <div className="mb-5">
          <label htmlFor="technologies" className="feild-label">
            Technologies Used
          </label>
          <TechnologySelector
            selectedTechs={formData.technologies}
            onTechChange={handleTechnologyChange}
          />
        </div>

        <div className="mb-5">
          <label className="feild-label">
            Project Thumbnail
          </label>
          <ImageUpload
            onImageUpload={handleImageUpload}
            currentImage={formData.thumbnail}
            folder="/portfolio/thumbnails"
            placeholder="Upload project thumbnail"
          />
        </div>

        <div className="mb-5">
          <label htmlFor="description" className="feild-label">
            Short Description
          </label>
          <textarea
            id="description"
            name="description"
            rows="2"
            className="field-input field-input-focus"
            placeholder="A brief description for project cards..."
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-5">
          <label htmlFor="detailedDescription" className="feild-label">
            Detailed Description
          </label>
          <textarea
            id="detailedDescription"
            name="detailedDescription"
            rows="4"
            className="field-input field-input-focus"
            placeholder="A comprehensive description of your project, its purpose, and what makes it special..."
            value={formData.detailedDescription}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-5">
          <label className="feild-label">
            Project Features
          </label>
          <div className="space-y-3">
            <div className="flex gap-2">
              <input
                type="text"
                className="field-input field-input-focus flex-1"
                placeholder="Add a feature (e.g., User Authentication)"
                value={featureInput}
                onChange={(e) => setFeatureInput(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <button
                type="button"
                onClick={addFeature}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Add
              </button>
            </div>
            {formData.features.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm text-gray-400">Features added:</p>
                <div className="flex flex-wrap gap-2">
                  {formData.features.map((feature, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-gray-700 text-white rounded-full text-sm"
                    >
                      {feature}
                      <button
                        type="button"
                        onClick={() => removeFeature(index)}
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
          <div>
            <label htmlFor="githubUrl" className="feild-label">
              GitHub URL
            </label>
            <input
              id="githubUrl"
              name="githubUrl"
              type="url"
              className="field-input field-input-focus"
              placeholder="https://github.com/username/repo"
              value={formData.githubUrl}
              onChange={handleChange}
            />
          </div>
          
          <div>
            <label htmlFor="liveUrl" className="feild-label">
              Live Demo URL
            </label>
            <input
              id="liveUrl"
              name="liveUrl"
              type="url"
              className="field-input field-input-focus"
              placeholder="https://myproject.com"
              value={formData.liveUrl}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="mb-5">
          <label htmlFor="thumbnail" className="feild-label">
            Or Enter Thumbnail URL Manually
          </label>
          <input
            id="thumbnail"
            name="thumbnail"
            type="url"
            className="field-input field-input-focus"
            placeholder="https://example.com/image.jpg (optional if uploaded above)"
            value={formData.thumbnail}
            onChange={handleChange}
          />
          <p className="text-xs text-gray-500 mt-1">
            You can either upload an image above or enter a URL manually
          </p>
        </div>

        <div className="justify-center flex mt-8">
          <FancyButtonAlt 
            title={!isLoading ? "Add Project" : "Adding Project..."} 
            icon={<CiSaveUp2 />} 
          />
        </div>
      </form>
    </div>
  );
};

export default AddProject;
