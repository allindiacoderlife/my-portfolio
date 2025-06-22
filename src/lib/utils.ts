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
  },
  {
    title: "Omini",
    techs: [`${store.basePath}/assets/StackLogos/react.png`,`${store.basePath}/assets/StackLogos/sass.png`],
    thumbnail: `${store.basePath}/assets/ProjectThumbnails/omini.png`,
    description: "GPT-4o LLM - Landing Page",
    link: "https://omini.vercel.app/",
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
  },
];
