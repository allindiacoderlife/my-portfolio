export const CertificateSchema = {
  title: { type: String, required: true },
  issuer: { type: String, required: true },
  date: { type: String, required: true },
  description: { type: String, required: true },
  credentialId: { type: String },
  skills: [{ type: String }], // Array of skills
  verifyLink: { type: String },
  image: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
};

export const validateCertificate = (certificate) => {
  const errors = [];
  
  if (!certificate.title || certificate.title.trim() === '') {
    errors.push('Title is required');
  }
  
  if (!certificate.issuer || certificate.issuer.trim() === '') {
    errors.push('Issuer is required');
  }
  
  if (!certificate.date || certificate.date.trim() === '') {
    errors.push('Date is required');
  }
  
  if (!certificate.description || certificate.description.trim() === '') {
    errors.push('Description is required');
  }
  
  // Validate URLs if provided
  if (certificate.verifyLink && !isValidUrl(certificate.verifyLink)) {
    errors.push('Invalid verification URL');
  }
  
  if (certificate.image && !isValidUrl(certificate.image)) {
    errors.push('Invalid image URL');
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

// Helper function to process certificate data before saving
export const processCertificateData = (formData) => {
  const processed = { ...formData };
  
  // Ensure skills is an array
  if (!Array.isArray(processed.skills)) {
    processed.skills = [];
  }
  
  // Add timestamps
  const now = new Date();
  if (!processed.createdAt) {
    processed.createdAt = now;
  }
  processed.updatedAt = now;
  
  return processed;
};
