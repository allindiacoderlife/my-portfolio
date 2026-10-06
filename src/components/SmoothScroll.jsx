"use client";
import Lenis from "lenis";
import { useEffect } from "react";

const SmoothScroll = () => {
  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: false,
    });

    // Expose lenis instance globally so modals can pause/resume scrolling
    window.__lenis = lenis;

    lenis.on("scroll", () => {});

    let animationFrameId;

    function RAF(time) {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(RAF);
    }

    animationFrameId = requestAnimationFrame(RAF);

    return () => {
      cancelAnimationFrame(animationFrameId);
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);
  return <></>;
};

export default SmoothScroll;
