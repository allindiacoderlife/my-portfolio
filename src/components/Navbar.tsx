"use client";
import { montserrat_alternates } from "@/lib/fonts";
import { navItems } from "@/lib/utils";
import { Link } from "react-scroll";

function Navbar() {
  return (
    <div className="fixed z-50 top-4 w-[90vw] sm:w-max bg-[#000000]/75 backdrop-blur-md border border-white/[0.1] p-4 sm:px-8 rounded-lg flex justify-center">
      <div
        className={`${montserrat_alternates.className} flex flex-1 justify-around text-sm sm:gap-10`}
      >
        {navItems.map((nav: { name: string; link: string }, id) => {
          return (
            <Link key={id} to={nav.link} smooth={true} duration={600}>
              <span
                className={`opacity-80 cursor-pointer hover:text-[#CBACF9] hover:opacity-100`}
              >
                {nav.name}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Navbar;
