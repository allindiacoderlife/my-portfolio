import {
  FaFacebook,
  FaGithub,
  FaLinkedinIn,
  FaTiktok,
  FaYoutube,
} from "react-icons/fa6";
import { AiFillInstagram } from "react-icons/ai";
import { Color } from "three";
import { color } from "motion";
import { link } from "fs";
import { store } from "@/lib/store";


export const navItems = [
  {
    name: "Home",
    link: "hero",
  },
  {
    name: "About",
    link: "about",
  },
  {
    name: "Projects",
    link: "projects",
  },
  {
    name: "Certificates",
    link: "certificates",
  },
  {
    name: "Contact",
    link: "contact",
  },
];

export const contacts = [
  {
    name: "Mail",
    link: "mailto:chiragsaxena728@gmail.com",
  },
  {
    name: "LinkedIn",
    link: "https://www.linkedin.com/in/chirag-saxena-8a8805290/",
  },
  {
    name: "Instagram",
    link: "https://www.instagram.com/chiragsa5/",
  },
  {
    name: "Facebook",
    link: "https://www.facebook.com/share/16Bz2JmvkX/",
  },
];

export const socials = [
  {
    name: "Github",
    Icon: FaGithub,
    color: "#171515",
    link: "https://github.com/allindiacoderlife",
  },
  {
    name: "YouTube",
    Icon: FaYoutube,
    color: "#FF0000",
    link: "https://www.youtube.com/@allindiacoderlife4606",
  },
  {
    name: "Instagram",
    Icon: AiFillInstagram,
    color: "#E1306C",
    link: "https://www.instagram.com/chiragsa5/",
  },
  {
    name: "LinkedIn",
    Icon: FaLinkedinIn,
    color: "#0077B5",
    link: "https://www.linkedin.com/in/chirag-saxena-8a8805290/",
  },
  {
    name: "Facebook",
    Icon: FaFacebook,
    color: "#1877F2",
    link: "https://www.facebook.com/share/16Bz2JmvkX/",
  },
];

export const FrontEndSkills = [
  {
    name: "React",
    img: `${store.basePath}/assets/StackLogos/react.png`,
  },
  {
    name: "Sass",
    img: `${store.basePath}/assets/StackLogos/sass.png`,
  },
  {
    name: "Figma",
    img: `${store.basePath}/assets/StackLogos/figma.png`,
  },
  {
    name: "Tailwind",
    img: `${store.basePath}/assets/StackLogos/tailwind.png`,
  },
  {
    name: "Solid",
    img: `${store.basePath}/assets/StackLogos/solidjs.png`,
  },
  {
    name: "Astro",
    img: `${store.basePath}/assets/StackLogos/astro.png`,
  },
];
export const BackEndSkills = [
  {
    name: "Node",
    img: `${store.basePath}/assets/StackLogos/node.png`,
  },
  {
    name: "Express",
    img: `${store.basePath}/assets/StackLogos/express.png`,
  },
  {
    name: "Next",
    img: `${store.basePath}/assets/StackLogos/next.png`,
  },
  {
    name: "Firebase",
    img: `${store.basePath}/assets/StackLogos/firebase.png`,
  },
  {
    name: "Strapi",
    img: `${store.basePath}/assets/StackLogos/strapi.png`,
  },
];
export const dbSkills = [
  {
    name: "Postgres",
    img: `${store.basePath}/assets/StackLogos/postgres.png`,
  },
  {
    name: "MySQL",
    img: `${store.basePath}/assets/StackLogos/mysql.png`,
  },
  {
    name: "Mongo DB",
    img: `${store.basePath}/assets/StackLogos/mongo.png`,
  },
  {
    name: "Cloud Firestore",
    img: `${store.basePath}/assets/StackLogos/firestore.png`,
  },
  {
    name: "Supabase",
    img: `${store.basePath}/assets/StackLogos/supabase.png`,
  },
];
export const otherSkills = [
  {
    name: "Git",
    img: `${store.basePath}/assets/StackLogos/git.png`,
  },
  {
    name: "AWS",
    img: `${store.basePath}/assets/StackLogos/aws.png`,
  },
  {
    name: "Google Cloud",
    img: `${store.basePath}/assets/StackLogos/gcp.png`,
  },
  {
    name: "Spline 3D",
    img: `${store.basePath}/assets/StackLogos/spline.png`,
  },
  {
    name: "Photoshop",
    img: `${store.basePath}/assets/StackLogos/photoshop.png`,
  },
];

export const projects = [
  {
    title: "La Ultimate Collection",
    techs: [
      `${store.basePath}/assets/StackLogos/astro.png`,
      `${store.basePath}/assets/StackLogos/sass.png`,
      `${store.basePath}/assets/StackLogos/next.png`,
      `${store.basePath}/assets/StackLogos/supabase.png`
    ],
    thumbnail: `${store.basePath}/assets/ProjectThumbnails/LUC.png`,
    description: "E-Commerce App",
    link: "https://la-ultimate-collection.vercel.app/",
    detailedDescription: "A comprehensive e-commerce platform built with modern web technologies. Features include user authentication, product catalog, shopping cart, payment integration, and admin dashboard.",
    features: [
      "User Authentication & Authorization",
      "Product Catalog with Search & Filters",
      "Shopping Cart & Wishlist",
      "Secure Payment Integration",
      "Admin Dashboard",
      "Responsive Design",
      "Real-time Inventory Management"
    ],
    techStack: ["Astro", "Sass", "Next.js", "Supabase", "Stripe API"],
    githubLink: "https://github.com/allindiacoderlife/la-ultimate-collection",
    liveDemo: "https://la-ultimate-collection.vercel.app/",
    category: "E-Commerce"
  },
  {
    title: "Movilla",
    techs: [
      `${store.basePath}/assets/StackLogos/react.png`,
      `${store.basePath}/assets/StackLogos/sass.png`,
      `${store.basePath}/assets/StackLogos/firebase.png`,
    ],
    thumbnail: `${store.basePath}/assets/ProjectThumbnails/movilla.png`,
    description: "Movie/TV streaming web-app featuring TMDB",
    link: "https://movilla.vercel.app/",
    detailedDescription: "A feature-rich movie and TV show streaming platform that provides users with comprehensive entertainment content. Built with React and powered by TMDB API for real-time movie data.",
    features: [
      "Browse Movies & TV Shows",
      "Search & Advanced Filtering",
      "User Ratings & Reviews",
      "Watchlist Management",
      "Trailer Integration",
      "Responsive Mobile Design",
      "Real-time Data from TMDB API"
    ],
    techStack: ["React", "Sass", "Firebase", "TMDB API", "React Router"],
    githubLink: "https://github.com/allindiacoderlife/movilla",
    liveDemo: "https://movilla.vercel.app/",
    category: "Entertainment"
  },
  {
    title: "Revo.Wallet",
    techs: [
      `${store.basePath}/assets/StackLogos/html.png`,
      `${store.basePath}/assets/StackLogos/sass.png`,
      `${store.basePath}/assets/StackLogos/js.png`
    ],
    thumbnail: `${store.basePath}/assets/ProjectThumbnails/revo.png`,
    description: "FinTech SaaS Landing Page",
    link: "https://revo-wallet.vercel.app/",
    detailedDescription: "A modern and sleek landing page for a FinTech SaaS platform. Features smooth animations, responsive design, and compelling call-to-actions to convert visitors into customers.",
    features: [
      "Responsive Landing Page Design",
      "Smooth CSS Animations",
      "Interactive Elements",
      "Modern UI/UX Design",
      "Performance Optimized",
      "Cross-browser Compatibility",
      "SEO Optimized"
    ],
    techStack: ["HTML5", "Sass", "JavaScript", "CSS Animations"],
    githubLink: "https://github.com/allindiacoderlife/revo-wallet",
    liveDemo: "https://revo-wallet.vercel.app/",
    category: "Landing Page"
  },
  {
    title: "Omini",
    techs: [`${store.basePath}/assets/StackLogos/react.png`,`${store.basePath}/assets/StackLogos/sass.png`],
    thumbnail: `${store.basePath}/assets/ProjectThumbnails/omini.png`,
    description: "GPT-4o LLM - Landing Page",
    link: "https://omini.vercel.app/",
    detailedDescription: "A sophisticated landing page for GPT-4o LLM platform showcasing AI capabilities and features. Built with React and modern design principles to highlight the power of artificial intelligence.",
    features: [
      "AI-powered Interface Design",
      "Interactive Demonstrations",
      "Responsive Layout",
      "Modern UI Components",
      "Performance Optimized",
      "Accessibility Features",
      "SEO Friendly"
    ],
    techStack: ["React", "Sass", "JavaScript", "CSS3"],
    githubLink: "https://github.com/allindiacoderlife/omini",
    liveDemo: "https://omini.vercel.app/",
    category: "AI/ML"
  },
  {
    title: "Zenchat",
    techs: [
      `${store.basePath}/assets/StackLogos/next.png`,
      `${store.basePath}/assets/StackLogos/react.png`,
      `${store.basePath}/assets/StackLogos/sass.png`,
      `${store.basePath}/assets/StackLogos/firebase.png`,
    ],
    thumbnail: `${store.basePath}/assets/ProjectThumbnails/z-chat.png`,
    description: "chat app",
    link: "https://zenchat.vercel.app/",
    detailedDescription: "A real-time chat application built with Next.js and Firebase. Features include instant messaging, user authentication, file sharing, and a clean, intuitive interface for seamless communication.",
    features: [
      "Real-time Messaging",
      "User Authentication",
      "File & Image Sharing",
      "Emoji Support",
      "Online Status Indicators",
      "Message History",
      "Responsive Design"
    ],
    techStack: ["Next.js", "React", "Sass", "Firebase", "Firestore"],
    githubLink: "https://github.com/allindiacoderlife/zenchat",
    liveDemo: "https://zenchat.vercel.app/",
    category: "Social"
  },
  {
    title: "Infinity-Readers Club",
    techs: [
      `${store.basePath}/assets/StackLogos/solidjs.png`,
      `${store.basePath}/assets/StackLogos/sass.png`,
      `${store.basePath}/assets/StackLogos/supabase.png`,
      `${store.basePath}/assets/StackLogos/firebase.png`,
    ],
    thumbnail: `${store.basePath}/assets/ProjectThumbnails/e-book.png`,
    description: "E-book web-app",
    link: "https://infinity-readers-club.vercel.app/",
    detailedDescription: "A comprehensive e-book platform that brings readers together in a digital library. Features book discovery, reading progress tracking, community discussions, and personalized recommendations.",
    features: [
      "Digital Library Management",
      "Reading Progress Tracking",
      "Book Recommendations",
      "Community Features",
      "Search & Filter System",
      "User Reviews & Ratings",
      "Responsive Reading Interface"
    ],
    techStack: ["SolidJS", "Sass", "Supabase", "Firebase"],
    githubLink: "https://github.com/allindiacoderlife/infinity-readers-club",
    liveDemo: "https://infinity-readers-club.vercel.app/",
    category: "Education"
  },
];

export const certificates = [
  {
    title: "Full Stack Web Development",
    issuer: "freeCodeCamp",
    date: "2024",
    description: "Comprehensive course covering HTML, CSS, JavaScript, React, Node.js, and MongoDB",
    image: `${store.basePath}/assets/certificates/fullstack-cert.svg`, // placeholder path
    credentialId: "fcc-cert-001",
    skills: ["React", "Node.js", "MongoDB", "Express.js", "HTML", "CSS", "JavaScript"],
    verifyLink: "https://www.freecodecamp.org/certification/example/responsive-web-design"
  },
  {
    title: "React Developer Certification",
    issuer: "Meta",
    date: "2024",
    description: "Advanced React concepts including hooks, context, state management, and testing",
    image: `${store.basePath}/assets/certificates/react-cert.jpg`, // placeholder path
    credentialId: "meta-react-001",
    skills: ["React", "Redux", "React Testing Library", "JavaScript", "TypeScript"],
    verifyLink: "https://www.coursera.org/account/accomplishments/certificate/example"
  },
  {
    title: "JavaScript Algorithms and Data Structures",
    issuer: "freeCodeCamp",
    date: "2023",
    description: "Comprehensive study of algorithms, data structures, and problem-solving techniques",
    image: `${store.basePath}/assets/certificates/js-algorithms-cert.jpg`, // placeholder path
    credentialId: "fcc-js-001",
    skills: ["JavaScript", "Algorithms", "Data Structures", "Problem Solving"],
    verifyLink: "https://www.freecodecamp.org/certification/example/javascript-algorithms-and-data-structures"
  },
  {
    title: "AWS Cloud Practitioner",
    issuer: "Amazon Web Services",
    date: "2024",
    description: "Foundational knowledge of AWS cloud services and best practices",
    image: `${store.basePath}/assets/certificates/aws-cert.jpg`, // placeholder path
    credentialId: "aws-cp-001",
    skills: ["AWS", "Cloud Computing", "EC2", "S3", "Lambda"],
    verifyLink: "https://aws.amazon.com/verification"
  },
  {
    title: "MongoDB Developer Certification",
    issuer: "MongoDB University",
    date: "2023",
    description: "Database design, querying, indexing, and MongoDB best practices",
    image: `${store.basePath}/assets/certificates/mongodb-cert.jpg`, // placeholder path
    credentialId: "mongo-dev-001",
    skills: ["MongoDB", "Database Design", "Aggregation", "Indexing"],
    verifyLink: "https://university.mongodb.com/certification"
  },
  {
    title: "UI/UX Design Fundamentals",
    issuer: "Google",
    date: "2023",
    description: "User experience design principles, prototyping, and user research methods",
    image: `${store.basePath}/assets/certificates/ux-cert.jpg`, // placeholder path
    credentialId: "google-ux-001",
    skills: ["UI/UX Design", "Figma", "Prototyping", "User Research"],
    verifyLink: "https://coursera.org/verify/google-ux"
  }
];
