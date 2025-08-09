import Navbar from "@/components/Navbar";
import { Spotlight } from "@/components/ui/Spotlight";
import Hero from "@/components/Hero.jsx";
import PatternBackground from "@/components/ui/PatternBackground";
import ScrollIndicator from "@/components/ui/ScrollIndicator";
import dynamic from "next/dynamic";
import { Suspense } from "react";

// Lazy load components that are not immediately visible
const About = dynamic(() => import("@/components/About"), {
  loading: () => <div className="min-h-screen flex items-center justify-center"><div className="animate-pulse bg-gray-800 h-96 w-full max-w-4xl rounded-lg"></div></div>
});

const Biography = dynamic(() => import("@/components/Biography"), {
  loading: () => <div className="min-h-screen flex items-center justify-center"><div className="animate-pulse bg-gray-800 h-96 w-full max-w-4xl rounded-lg"></div></div>
});

const TechnicalSkills = dynamic(() => import("@/components/TechnicalSkills"), {
  loading: () => <div className="min-h-screen flex items-center justify-center"><div className="animate-pulse bg-gray-800 h-96 w-full max-w-4xl rounded-lg"></div></div>
});

const ProjectSection = dynamic(() => import("@/components/ProjectSection"), {
  loading: () => <div className="min-h-screen flex items-center justify-center"><div className="animate-pulse bg-gray-800 h-96 w-full max-w-4xl rounded-lg"></div></div>
});

const Certificate = dynamic(() => import("@/components/Certificate"), {
  loading: () => <div className="min-h-screen flex items-center justify-center"><div className="animate-pulse bg-gray-800 h-96 w-full max-w-4xl rounded-lg"></div></div>
});

const Contact = dynamic(() => import("@/components/Contact"), {
  loading: () => <div className="min-h-screen flex items-center justify-center"><div className="animate-pulse bg-gray-800 h-96 w-full max-w-4xl rounded-lg"></div></div>
});
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
