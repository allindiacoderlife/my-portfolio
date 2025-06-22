"use client";
import Lenis from "lenis";
import { useEffect } from "react";

const SmoothScroll = () => {
  useEffect(() => {
    const lenis = new Lenis();

    lenis.on("scroll", () => {});

    let animationFrameId;

    function RAF(time) {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(RAF);
    }

    animationFrameId = requestAnimationFrame(RAF);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);
  return <></>;
};

export default SmoothScroll;
