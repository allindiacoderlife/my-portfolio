import Navbar from "@/components/Navbar";
import { Spotlight } from "@/components/ui/Spotlight";
import Hero from "@/components/Hero.jsx";
import PatternBackground from "@/components/ui/PatternBackground";
import ScrollIndicator from "@/components/ui/ScrollIndicator";
import React, { Suspense } from "react";

// Lazy load components that are not immediately visible
const About = React.lazy(() => import("@/components/About"));
const Biography = React.lazy(() => import("@/components/Biography"));
const TechnicalSkills = React.lazy(() => import("@/components/TechnicalSkills"));
const ProjectSection = React.lazy(() => import("@/components/ProjectSection"));
const Certificate = React.lazy(() => import("@/components/Certificate"));
const Contact = React.lazy(() => import("@/components/Contact"));
export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center overflow-x-hidden">
      <Navbar />
      <PatternBackground />
      <Spotlight className="-top-8 -left-12 h-[500px] md:h-[700px] md:left-40 lg:left-64" />
      <Spotlight
        className="top-16 -left-16 h-[450px] md:h-[600px] md:-left-8"
        fill="#CBACF9"
      />
      <ScrollIndicator />
      <Hero />
      
      <Suspense fallback={<div className="min-h-screen w-full bg-gray-900 animate-pulse" />}>
        <About />
      </Suspense>
      
      <Suspense fallback={<div className="min-h-screen w-full bg-gray-900 animate-pulse" />}>
        <Biography />
      </Suspense>
      
      <Suspense fallback={<div className="min-h-screen w-full bg-gray-900 animate-pulse" />}>
        <TechnicalSkills />
      </Suspense>
      
      <Suspense fallback={<div className="min-h-screen w-full bg-gray-900 animate-pulse" />}>
        <ProjectSection />
      </Suspense>
      
      <Suspense fallback={<div className="min-h-screen w-full bg-gray-900 animate-pulse" />}>
        <Certificate />
      </Suspense>
      
      <Suspense fallback={<div className="min-h-screen w-full bg-gray-900 animate-pulse" />}>
        <Contact />
      </Suspense>
    </main>
  );
}
