export const ProjectSchema = {
  title: { type: String, required: true },
  description: { type: String, required: true },
  detailedDescription: { type: String, required: true },
  technologies: { type: String, required: true }, // Comma-separated string
  techStack: [{ type: String }], // Array of technology names
  features: [{ type: String }], // Array of features
  thumbnail: { type: String, required: true },
  githubUrl: { type: String },
  githubLink: { type: String }, // Alternative field name for compatibility
  liveUrl: { type: String },
  liveDemo: { type: String }, // Alternative field name for compatibility
  category: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
};

export const validateProject = (project) => {
  const errors = [];
  
  if (!project.title || project.title.trim() === '') {
    errors.push('Title is required');
  }
  
  if (!project.description || project.description.trim() === '') {
    errors.push('Description is required');
  }
  
  if (!project.detailedDescription || project.detailedDescription.trim() === '') {
    errors.push('Detailed description is required');
  }
  
  if (!project.technologies || project.technologies.trim() === '') {
    errors.push('Technologies are required');
  }
  
  if (!project.category || project.category.trim() === '') {
    errors.push('Category is required');
  }
  
  if (!project.thumbnail || project.thumbnail.trim() === '') {
    errors.push('Thumbnail is required');
  }
  
  // Validate URLs if provided
  const githubUrl = project.githubUrl || project.githubLink;
  if (githubUrl && !isValidUrl(githubUrl)) {
    errors.push('Invalid GitHub URL');
  }
  
  const liveUrl = project.liveUrl || project.liveDemo;
  if (liveUrl && !isValidUrl(liveUrl)) {
    errors.push('Invalid Live URL');
  }
  
  if (project.thumbnail && !isValidUrl(project.thumbnail)) {
    errors.push('Invalid Thumbnail URL');
  }
  
  return errors;
};

const isValidUrl = (string) => {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
};

// Helper function to process form data before saving
export const processProjectData = (formData) => {
  const processed = { ...formData };
  
  // Convert technologies string to techStack array if needed
  if (processed.technologies && typeof processed.technologies === 'string') {
    processed.techStack = processed.technologies
      .split(',')
      .map(tech => tech.trim())
      .filter(tech => tech.length > 0);
  }
  
  // Ensure features is an array
  if (!Array.isArray(processed.features)) {
    processed.features = [];
  }
  
  // Set both URL fields for compatibility
  if (processed.githubUrl) {
    processed.githubLink = processed.githubUrl;
  }
  if (processed.liveUrl) {
    processed.liveDemo = processed.liveUrl;
  }
  
  // Add timestamps
  const now = new Date();
  if (!processed.createdAt) {
    processed.createdAt = now;
  }
  processed.updatedAt = now;
  
  return processed;
};
