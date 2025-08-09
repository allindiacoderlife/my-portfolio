// Centralized technology icons mapping
export const techIcons = {
  'React': '/assets/StackLogos/react.png',
  'Next.js': '/assets/StackLogos/next.png',
  'JavaScript': '/assets/StackLogos/js.png',
  'HTML': '/assets/StackLogos/html.png',
  'TailwindCSS': '/assets/StackLogos/tailwind.png',
  'Sass': '/assets/StackLogos/sass.png',
  'Node.js': '/assets/StackLogos/node.png',
  'Express.js': '/assets/StackLogos/express.png',
  'MongoDB': '/assets/StackLogos/mongo.png',
  'MySQL': '/assets/StackLogos/mysql.png',
  'PostgreSQL': '/assets/StackLogos/postgres.png',
  'Firebase': '/assets/StackLogos/firebase.png',
  'Firestore': '/assets/StackLogos/firestore.png',
  'Supabase': '/assets/StackLogos/supabase.png',
  'AWS': '/assets/StackLogos/aws.png',
  'GCP': '/assets/StackLogos/gcp.png',
  'Git': '/assets/StackLogos/git.png',
  'Figma': '/assets/StackLogos/figma.png',
  'Photoshop': '/assets/StackLogos/photoshop.png',
  'Jira': '/assets/StackLogos/jira.png',
  'Astro': '/assets/StackLogos/astro.png',
  'SolidJS': '/assets/StackLogos/solidjs.png',
  'Spline': '/assets/StackLogos/spline.png',
  'Strapi': '/assets/StackLogos/strapi.png',
};

// Technology categories for organization
export const techCategories = {
  'Frontend': ['React', 'Next.js', 'JavaScript', 'HTML', 'TailwindCSS', 'Sass', 'Astro', 'SolidJS'],
  'Backend': ['Node.js', 'Express.js', 'Strapi'],
  'Database': ['MongoDB', 'MySQL', 'PostgreSQL', 'Firebase', 'Firestore', 'Supabase'],
  'Cloud': ['AWS', 'GCP'],
  'Tools': ['Git', 'Figma', 'Photoshop', 'Jira', 'Spline'],
};

// Technology options with metadata
export const techOptions = [
  { name: 'React', icon: '/assets/StackLogos/react.png', category: 'Frontend' },
  { name: 'Next.js', icon: '/assets/StackLogos/next.png', category: 'Frontend' },
  { name: 'JavaScript', icon: '/assets/StackLogos/js.png', category: 'Frontend' },
  { name: 'HTML', icon: '/assets/StackLogos/html.png', category: 'Frontend' },
  { name: 'TailwindCSS', icon: '/assets/StackLogos/tailwind.png', category: 'Frontend' },
  { name: 'Sass', icon: '/assets/StackLogos/sass.png', category: 'Frontend' },
  { name: 'Node.js', icon: '/assets/StackLogos/node.png', category: 'Backend' },
  { name: 'Express.js', icon: '/assets/StackLogos/express.png', category: 'Backend' },
  { name: 'MongoDB', icon: '/assets/StackLogos/mongo.png', category: 'Database' },
  { name: 'MySQL', icon: '/assets/StackLogos/mysql.png', category: 'Database' },
  { name: 'PostgreSQL', icon: '/assets/StackLogos/postgres.png', category: 'Database' },
  { name: 'Firebase', icon: '/assets/StackLogos/firebase.png', category: 'Database' },
  { name: 'Firestore', icon: '/assets/StackLogos/firestore.png', category: 'Database' },
  { name: 'Supabase', icon: '/assets/StackLogos/supabase.png', category: 'Database' },
  { name: 'AWS', icon: '/assets/StackLogos/aws.png', category: 'Cloud' },
  { name: 'GCP', icon: '/assets/StackLogos/gcp.png', category: 'Cloud' },
  { name: 'Git', icon: '/assets/StackLogos/git.png', category: 'Tools' },
  { name: 'Figma', icon: '/assets/StackLogos/figma.png', category: 'Tools' },
  { name: 'Photoshop', icon: '/assets/StackLogos/photoshop.png', category: 'Tools' },
  { name: 'Jira', icon: '/assets/StackLogos/jira.png', category: 'Tools' },
  { name: 'Astro', icon: '/assets/StackLogos/astro.png', category: 'Frontend' },
  { name: 'SolidJS', icon: '/assets/StackLogos/solidjs.png', category: 'Frontend' },
  { name: 'Spline', icon: '/assets/StackLogos/spline.png', category: 'Tools' },
  { name: 'Strapi', icon: '/assets/StackLogos/strapi.png', category: 'Backend' },
];

// Utility function to get tech icon by name
export const getTechIcon = (techName) => {
  return techIcons[techName] || null;
};

// Utility function to get tech category
export const getTechCategory = (techName) => {
  for (const [category, techs] of Object.entries(techCategories)) {
    if (techs.includes(techName)) {
      return category;
    }
  }
  return 'Other';
};
