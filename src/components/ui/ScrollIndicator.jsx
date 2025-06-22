"use client";

import { sacramento } from "@/lib/fonts";
import { useEffect, useState } from "react";

function ScrollIndicator() {
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    const scrollIndicator = document.querySelector(".scroll-indicator");

    function update() {
      var scrollTop = window.scrollY;
      var scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      var scrollPercentage = (scrollTop / scrollHeight) * 100;
      scrollIndicator.style.height = `${scrollPercentage}%`;
      setPercentage(Math.ceil(scrollPercentage));
    }

    update();

    window.addEventListener("scroll", () => {
      update();
    });
  }, []);

  return (
    <div className="hidden z-20 md:flex fixed right-8 top-[50%] translate-y-[-50%] w-1 h-[80vh] bg-[#CBACF9]/[0.04] before:absolute before:w-full before:aspect-[1/2] before:top-0 before:border before:border-b-0 after:absolute after:w-full after:aspect-[1/2] after:bottom-0 after:border after:border-t-0">
      <div
        className="scroll-indicator absolute w-full h-[0%] top-0 rounded-full"
        style={{
          backgroundImage: "linear-gradient(transparent, #CBACF9)",
          transition: ".3s ease",
        }}
      ></div>
      <span
        className={`${sacramento.className} absolute top-[101%] font-semibold left-[50%] translate-x-[-50%]`}
      >
        {percentage}%
      </span>
    </div>
  );
}

export default ScrollIndicator;
