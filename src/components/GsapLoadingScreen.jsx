"use client";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { poiret_one, stretch } from "@/lib/fonts";

export default function GsapLoadingScreen({ onComplete }) {
  const [isVisible, setIsVisible] = useState(true);
  const containerRef = useRef(null);
  const counterRef = useRef(null);
  const progressBarRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const panelsRef = useRef([]);

  useEffect(() => {
    // Disable scrolling while loading
    document.body.style.overflow = "hidden";
    if (typeof window !== "undefined" && window.__lenis) {
      window.__lenis.stop();
    }

    const ctx = gsap.context(() => {
      const counterObj = { val: 0 };
      const tl = gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = "unset";
          if (typeof window !== "undefined" && window.__lenis) {
            window.__lenis.start();
          }
          setIsVisible(false);
          if (onComplete) onComplete();
        },
      });

      // 1. Initial State
      gsap.set(progressBarRef.current, { scaleX: 0, transformOrigin: "left center" });
      gsap.set(titleRef.current, { y: 30, opacity: 0 });
      gsap.set(subtitleRef.current, { y: 20, opacity: 0 });
      gsap.set(counterRef.current, { opacity: 0, scale: 0.8 });

      // 2. Entrance Animation
      tl.to([titleRef.current, subtitleRef.current, counterRef.current], {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.15,
        ease: "power3.out",
      })
      // 3. Counter and Progress Bar Animation
      .to(
        counterObj,
        {
          val: 100,
          duration: 1.4,
          ease: "power2.inOut",
          onUpdate: () => {
            if (counterRef.current) {
              const formatted = Math.floor(counterObj.val).toString().padStart(2, "0");
              counterRef.current.innerText = `${formatted}%`;
            }
          },
        },
        "-=0.3"
      )
      .to(
        progressBarRef.current,
        {
          scaleX: 1,
          duration: 1.4,
          ease: "power2.inOut",
        },
        "<"
      )
      // 4. Content Exit Animation
      .to([titleRef.current, subtitleRef.current, counterRef.current, progressBarRef.current.parentElement], {
        opacity: 0,
        y: -30,
        filter: "blur(6px)",
        duration: 0.45,
        stagger: 0.08,
        ease: "power3.in",
      })
      // 5. Sliding Curtain Panels Reveal (Multi-layer stagger reveal)
      .to(panelsRef.current, {
        yPercent: -100,
        duration: 0.85,
        stagger: 0.08,
        ease: "power4.inOut",
      }, "-=0.1");

    }, containerRef);

    return () => {
      ctx.revert();
      document.body.style.overflow = "unset";
      if (typeof window !== "undefined" && window.__lenis) {
        window.__lenis.start();
      }
    };
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100000] pointer-events-auto flex items-center justify-center overflow-hidden select-none"
    >
      {/* 3 Curtain Panels for Staggered Slide Exit */}
      <div className="absolute inset-0 flex w-full h-full pointer-events-none">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            ref={(el) => (panelsRef.current[i] = el)}
            className="flex-1 h-full bg-[#05060F] border-r border-white/[0.04] last:border-r-0 relative"
          >
            {/* Ambient Purple Glow inside panels */}
            <div className="absolute inset-0 bg-gradient-to-b from-purple-900/10 via-transparent to-black/40 pointer-events-none" />
          </div>
        ))}
      </div>

      {/* Center Branding & Progress Content */}
      <div className="relative z-10 flex flex-col items-center justify-center px-6 max-w-xl w-full text-center">
        {/* Name / Title */}
        <div className="overflow-hidden mb-2">
          <h1
            ref={titleRef}
            className={`${stretch.className} text-3xl sm:text-5xl md:text-6xl font-bold text-white tracking-wider`}
          >
            CHIRAG SAXENA
          </h1>
        </div>

        {/* Subtitle */}
        <div className="overflow-hidden mb-8">
          <p
            ref={subtitleRef}
            className={`${poiret_one.className} text-sm sm:text-base text-[#CBACF9] tracking-[0.3em] uppercase`}
          >
            Full-Stack Creative Developer
          </p>
        </div>

        {/* Counter Percent */}
        <div className="mb-4">
          <span
            ref={counterRef}
            className="font-mono text-4xl sm:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-[#CBACF9] to-purple-300 tracking-tight"
          >
            00%
          </span>
        </div>

        {/* Progress Bar Container */}
        <div className="w-64 sm:w-80 h-[3px] bg-white/10 rounded-full overflow-hidden p-[0.5px]">
          <div
            ref={progressBarRef}
            className="w-full h-full bg-gradient-to-r from-purple-500 via-[#CBACF9] to-indigo-400 rounded-full shadow-[0_0_15px_#CBACF9]"
          />
        </div>

        {/* Status text */}
        <div className="mt-4 flex items-center gap-2 text-[11px] text-gray-500 font-mono tracking-widest uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-[#CBACF9] animate-ping" />
          <span>System Initializing</span>
        </div>
      </div>
    </div>
  );
}
