import { montserrat_alternates, morona } from "@/lib/fonts";
import { projects } from "@/lib/utils";
import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";

function Projects() {
  return (
    <div
      id="projects"
      className="relative w-screen min-h-[100vh] flex flex-col items-center justify-center py-10 md:py-20 md:pb-20 lg:pt-[80px] xl:mt-20 gap-8"
    >
      <div className={`flex flex-col items-center text-2xl`}>
        <span className={`opacity-80 font-normal ${morona.className}`}>
          collection of my
        </span>
        <h1 className={`text-4xl md:text-4xl font-medium`}>recent projects</h1>
      </div>

      <div className="relative flex items-center w-full h-[50vh] md:h-[70vh] lg:h-[80vh] translate-y-[-20px] overflow-hidden">
        <div className="absolute overflow-hidden left-0 w-full h-full before:absolute before:content-[''] before:top-[-1px] before:left-[50%] before:-translate-x-[50%] before:w-[110%] before:h-[30%] before:rounded-[100%] before:translate-y-[-70%] before:bg-[#09130f] before:z-10 after:absolute after:content-[''] after:bottom-[-1px] after:left-[50%] after:-translate-x-[50%] after:w-[110%] after:h-[30%] after:rounded-[100%] after:translate-y-[70%] after:bg-[#09130f] after:z-10"></div>

        <div
          className="relative flex items-center w-full h-full gap-[5%] overflow-x-scroll"
          style={{
            scrollSnapType: "x mandatory",
          }}
        >
          <div></div>

          {projects.map((project, index) => (
            <div
              key={index}
              className="relative min-w-[100%] h-full bg-[#CBACF9] snap-center flex flex-col items-center pt-14 md:pt-[100px] px-2 md:px-4"
            >
              <Link href="https://github.com/creativeambition" target="_blank">
                <div
                  className={`group relative flex items-center gap-2 md:gap-4 text-2xl md:text-5xl lg:text-6xl text-black/[80%] font-bold ${montserrat_alternates.className} font-bold`}
                >
                  {project.title}
                  <div className="size-[20px] md:size-[30px] text-xl md:text-2xl group-hover:translate-x-3 group-hover:-translate-y-3 group-hover:-rotate-[35deg] transition-transform">
                    <FaArrowRightLong />
                  </div>
                </div>
              </Link>

              <span className="text-base text-black/[80%] mt-2 max-w-[90%] md:max-w-[65%] lg:max-w-[28%] text-center font-medium">
                {project.description}
              </span>

              <div className="flex mt-4 mb-5 justify-center gap-4">
                {project.techs.map((tech, id) => (
                  <div
                    key={id}
                    className="size-[40px] md:size-[50px]"
                    style={{
                      backgroundImage: `url(${tech})`,
                      backgroundPosition: "center",
                      backgroundSize: "contain",
                      backgroundRepeat: "no-repeat",
                    }}
                  ></div>
                ))}
              </div>

              <div
                className="flex-1 flex items-center justify-center w-full lg:w-[60%]"
                style={{
                  backgroundImage: `url(${project.thumbnail})`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                  backgroundPosition: "top",
                }}
              ></div>
            </div>
          ))}

          <div></div>
        </div>
      </div>

      <HScrollIndicator />
    </div>
  );
}

export default Projects;

function HScrollIndicator() {
  return (
    <div className="absolute bottom-20 flex flex-col items-center gap-4 mt-4 select-none pointer-events-none">
      <div className="flex items-center gap-3">
        <div className="h-[1px] w-16 bg-gradient-to-r from-transparent via-[#CBACF9] to-transparent animate-slide-right" />
        <span className="text-xs uppercase tracking-wider text-white/60">
          scroll
        </span>
        <div className="h-[1px] w-16 bg-gradient-to-r from-transparent via-[#CBACF9] to-transparent animate-slide-left" />
      </div>
      <div className="flex gap-2">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="h-1.5 w-1.5 rounded-full bg-[#CBACF9]/30 animate-pulse"
            style={{ animationDelay: `${i * 200}ms` }}
          />
        ))}
      </div>
    </div>
  );
}
