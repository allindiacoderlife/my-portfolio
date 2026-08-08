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
    title: "MaaCubs Healthcare Ecosystem",
    techs: [
      `${store.basePath}/assets/StackLogos/react.png`,
      `${store.basePath}/assets/StackLogos/tailwind.png`,
      `${store.basePath}/assets/StackLogos/express.png`,
      `${store.basePath}/assets/StackLogos/postgres.png`,
      `${store.basePath}/assets/StackLogos/node.png`,
    ],
    thumbnail: `${store.basePath}/assets/ProjectThumbnails/maacubs.png`,
    description:
      "Digital health platform for pregnancy trackers, pediatric vaccination schedules, and doctor consultations.",
    link: "https://maacubs.com/",
    detailedDescription:
      "A comprehensive digital health ecosystem designed for mothers, infants, and medical professionals. Built as a multi-tier platform, it includes a Flutter mobile application for patients & doctors, a React-based administration control center, and an Express/PostgreSQL API backend. The system automates child immunization tracking following clinical guidelines, milestone progression logs, pregnancy readiness roadmaps, and secure doctor credentials verification.",
    features: [
      "Dynamic App Version Control (Optional/Force update gating screen)",
      "Pediatric Vaccination Scheduling based on IAP Guidelines with mandatory/recommended categorization",
      "Developmental Milestones Checklist & automated developmental progress score generation",
      "Pregnancy Readiness Plan with support for checklist, rich-text, and video learning layouts",
      "Doctor Verification Workflow (Pending -> Approved/Rejected with license review)",
      "Online consultation fee billing powered by Razorpay payment gateway integration",
      "Targeted Push Notification Broadcasts filtered by trimester or baby age groups",
    ],
    techStack: [
      "Flutter",
      "React.js",
      "Node.js",
      "Express.js",
      "Prisma ORM",
      "PostgreSQL",
      "Razorpay",
      "Tailwind CSS",
    ],
    githubLink: "https://github.com/allindiacoderlife/maacubs.git",
    liveDemo: "https://maacubs.com/",
    category: "HealthTech",
  },
  {
    title: "Spylt-GSAP Animation",
    techs: [
      `${store.basePath}/assets/StackLogos/react.png`,
      `${store.basePath}/assets/StackLogos/gsap.jpg`,
      `${store.basePath}/assets/StackLogos/tailwind.png`,
    ],
    thumbnail: `${store.basePath}/assets/ProjectThumbnails/spyly.png`,
    description: "Spylt Website",
    link: "https://spylt-gsap-animation.vercel.app/",
    detailedDescription:
      "A comprehensive e-commerce platform built with modern web technologies. Features include user authentication, product catalog, shopping cart, payment integration, and admin dashboard.",
    features: [
      "User Authentication",
      "Product Catalog",
      "Shopping Cart",
      "Payment Integration",
      "Admin Dashboard",
      "Responsive Design",
      "Real-time Data",
    ],
    techStack: ["React", "GSAP", "Tailwind"],
    githubLink: "https://github.com/allindiacoderlife/Spylt-Gsap-Animation.git",
    liveDemo: "https://spylt-gsap-animation.vercel.app/",
    category: "E-Commerce",
  },
  {
    title: "Insurance Management Platform",
    techs: [
      `${store.basePath}/assets/StackLogos/react.png`,
      `${store.basePath}/assets/StackLogos/tailwind.png`,
      `${store.basePath}/assets/StackLogos/express.png`,
      `${store.basePath}/assets/StackLogos/postgres.png`,
      `${store.basePath}/assets/StackLogos/node.png`,
    ],
    thumbnail: `${store.basePath}/assets/ProjectThumbnails/insurance.png`,
    description:
      "Centralized system to digitize and simplify insurance operations",
    link: "https://insurance-management-platform-alpha.vercel.app",
    detailedDescription:
      "A comprehensive web-based application designed to digitize and simplify the management of insurance operations. It enables insurance companies, agents, and customers to manage policies, claims, premium payments, and related documents from a centralized and secure system.",
    features: [
      "User Roles & Permissions (Admin, Agent, Customer)",
      "Policy Management (Templates, Customer Policies)",
      "Claim Management with Attachment Proof Verification",
      "Premium Tracking & Payment Collection History",
      "Document Management (Identity & Policy Papers)",
      "Reports Dashboard with Metrics Visualizations",
    ],
    techStack: [
      "React 19",
      "Express.js",
      "Prisma ORM",
      "PostgreSQL",
      "Tailwind CSS",
      "Redis",
    ],
    githubLink:
      "https://github.com/allindiacoderlife/Insurance-Management-Platform.git",
    liveDemo: "https://insurance-management-platform-alpha.vercel.app/",
    category: "FinTech",
  },
  {
    title: "Quiz Management Platform",
    techs: [
      `${store.basePath}/assets/StackLogos/react.png`,
      `${store.basePath}/assets/StackLogos/tailwind.png`,
      `${store.basePath}/assets/StackLogos/express.png`,
      `${store.basePath}/assets/StackLogos/postgres.png`,
      `${store.basePath}/assets/StackLogos/node.png`,
    ],
    thumbnail: `${store.basePath}/assets/ProjectThumbnails/quiz.png`,
    description: "Secure role-based online exam & student assessment platform",
    link: "https://quiz-management-online-assessment-p.vercel.app/",
    detailedDescription:
      "A secure, full-stack, role-based online examination and student assessment web application. Designed to manage interactive category-specific quizzes, track student performance, display competitive leaderboards, and prevent client-side answer spoofing through secure backend validation.",
    features: [
      "Role-based authorization (Admin & Student roles)",
      "Email OTP-powered verification & registration logic",
      "Anti-cheat timed quiz engine (server-side scoring & key omission)",
      "Server-side timestamp-validated quiz attempt timers",
      "Comprehensive Admin CRUD dashboard for categories, questions & quizzes",
      "Gamified interactive student leaderboards & scoreboard history",
    ],
    techStack: [
      "React.js",
      "Node.js",
      "Express.js",
      "PostgreSQL",
      "Drizzle ORM",
      "Tailwind CSS",
    ],
    githubLink:
      "https://github.com/allindiacoderlife/Quiz-Management---Online-Assessment-Platform.git",
    liveDemo: "https://quiz-management-online-assessment-p.vercel.app/",
    category: "Education",
  },
  {
    title: "Nimbus Keyboards",
    techs: [
      `${store.basePath}/assets/StackLogos/next.png`,
      `${store.basePath}/assets/StackLogos/react.png`,
      `${store.basePath}/assets/StackLogos/gsap.jpg`,
      `${store.basePath}/assets/StackLogos/tailwind.png`,
    ],
    thumbnail: `${store.basePath}/assets/ProjectThumbnails/nimbus.png`,
    description:
      "High-Performance Mechanical Keyboard Showcase & 3D Customizer",
    link: "https://nimbus-keyboards-dun.vercel.app/",
    detailedDescription:
      "An immersive, 3D e-commerce landing page and customizer experience built for high-end mechanical keyboards. The project blends modern frontend practices, interactive 3D rendering, and headless content management to deliver a premium user experience.",
    features: [
      "Interactive 3D Keyboard Customizer (React Three Fiber)",
      "Mechanical Switch Playground with realistic press animations",
      "Stripe payment gateway pipeline & serverless checkout",
      "Headless CMS integration via Prismic Slices",
      "Cinematic scrolling & camera transitions via GSAP ScrollTrigger",
      "Tactile audio-visual feedback synchronization",
    ],
    techStack: [
      "Next.js",
      "React Three Fiber",
      "GSAP",
      "Prismic CMS",
      "Stripe",
      "Tailwind CSS",
    ],
    githubLink: "https://github.com/allindiacoderlife/nimbus-keyboards.git",
    liveDemo: "https://nimbus-keyboards-dun.vercel.app/",
    category: "E-Commerce",
  },
];

export const certificates = [
  {
    title: "Full Stack Web Development",
    issuer: "freeCodeCamp",
    date: "2024",
    description:
      "Comprehensive course covering HTML, CSS, JavaScript, React, Node.js, and MongoDB",
    image: `${store.basePath}/assets/certificates/fullstack-cert.svg`, // placeholder path
    credentialId: "fcc-cert-001",
    skills: [
      "React",
      "Node.js",
      "MongoDB",
      "Express.js",
      "HTML",
      "CSS",
      "JavaScript",
    ],
    verifyLink:
      "https://www.freecodecamp.org/certification/example/responsive-web-design",
  },
  {
    title: "React Developer Certification",
    issuer: "Meta",
    date: "2024",
    description:
      "Advanced React concepts including hooks, context, state management, and testing",
    image: `${store.basePath}/assets/certificates/react-cert.jpg`, // placeholder path
    credentialId: "meta-react-001",
    skills: [
      "React",
      "Redux",
      "React Testing Library",
      "JavaScript",
      "TypeScript",
    ],
    verifyLink:
      "https://www.coursera.org/account/accomplishments/certificate/example",
  },
  {
    title: "JavaScript Algorithms and Data Structures",
    issuer: "freeCodeCamp",
    date: "2023",
    description:
      "Comprehensive study of algorithms, data structures, and problem-solving techniques",
    image: `${store.basePath}/assets/certificates/js-algorithms-cert.jpg`, // placeholder path
    credentialId: "fcc-js-001",
    skills: ["JavaScript", "Algorithms", "Data Structures", "Problem Solving"],
    verifyLink:
      "https://www.freecodecamp.org/certification/example/javascript-algorithms-and-data-structures",
  },
  {
    title: "AWS Cloud Practitioner",
    issuer: "Amazon Web Services",
    date: "2024",
    description:
      "Foundational knowledge of AWS cloud services and best practices",
    image: `${store.basePath}/assets/certificates/aws-cert.jpg`, // placeholder path
    credentialId: "aws-cp-001",
    skills: ["AWS", "Cloud Computing", "EC2", "S3", "Lambda"],
    verifyLink: "https://aws.amazon.com/verification",
  },
  {
    title: "MongoDB Developer Certification",
    issuer: "MongoDB University",
    date: "2023",
    description:
      "Database design, querying, indexing, and MongoDB best practices",
    image: `${store.basePath}/assets/certificates/mongodb-cert.jpg`, // placeholder path
    credentialId: "mongo-dev-001",
    skills: ["MongoDB", "Database Design", "Aggregation", "Indexing"],
    verifyLink: "https://university.mongodb.com/certification",
  },
  {
    title: "UI/UX Design Fundamentals",
    issuer: "Google",
    date: "2023",
    description:
      "User experience design principles, prototyping, and user research methods",
    image: `${store.basePath}/assets/certificates/ux-cert.jpg`, // placeholder path
    credentialId: "google-ux-001",
    skills: ["UI/UX Design", "Figma", "Prototyping", "User Research"],
    verifyLink: "https://coursera.org/verify/google-ux",
  },
];
