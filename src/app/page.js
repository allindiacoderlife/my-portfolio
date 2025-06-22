import Navbar from "@/components/Navbar";
import { Spotlight } from "@/components/ui/Spotlight";
// import Hero from "@/components/Hero.jsx";
import PatternBackground from "@/components/ui/PatternBackground";
// import About from "@/components/About";
// import Biography from "@/components/Biography";
// import ProjectSection from "@/components/ProjectSection";
// import TechnicalSkills from "@/components/TechnicalSkills";
// import Certificate from "@/components/Certificate";
// import Contact from "@/components/Contact";
// import ScrollIndicator from "@/components/ui/ScrollIndicator";
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
      {/* <ScrollIndicator /> */}
      {/* <Hero /> */}
      {/* <About /> */}
      {/* <Biography /> */}
      {/* <TechnicalSkills /> */}
      {/* <ProjectSection /> */}
      {/* <Certificate /> */}
      {/* <Contact /> */}
    </main>
  );
}
