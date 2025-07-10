"use client";
import Image from "next/image";
import { memo, useEffect, useRef, useState } from "react";

const SkillRow = memo(function SkillRow({
  skills,
  reverse,
}: {
  skills: { name: string; img: string }[];
  reverse: boolean;
}) {
  const [mdBreakPoint, setMdBreakPoint] = useState(false);

  const skillsRef = useRef(null);
  const skillCardsRef = useRef([]);

  useEffect(() => {
    const options = {
      root: null,
      threshold: 0,
      rootMargin: "50px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const cards = entry.target.querySelectorAll("#skill-element");
        const playState = entry.isIntersecting ? "running" : "paused";

        cards.forEach((card) => {
          (card as HTMLElement).style.animationPlayState = playState;
        });
      });
    }, options);

    const skillsElement = document.querySelector("#skills");
    if (skillsElement) observer.observe(skillsElement);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      setMdBreakPoint(window.innerWidth > 768);
    });

    resizeObserver.observe(document.documentElement);

    return () => resizeObserver.disconnect();
  }, []);

  let width = mdBreakPoint
    ? `${skills.length * 250}px`
    : `${skills.length * 150}px`;

  return (
    <div
      className={`relative h-[100px] flex items-center overflow-hidden`}
      style={{
        width: `${width}`,
        maskImage: "radial-gradient(circle, black, transparent)",
      }}
    >
      {skills.map((skill: { name: string; img: string }, index: number) => (
        <div
          key={index}
          id="skill-element"
          className={`absolute ${
            reverse
              ? "right-[100%] animate-animateSkillsReverse"
              : "left-[100%] animate-animateSkills"
          } h-[80px] md:h-[100px] w-[150px] md:w-[250px] bg-black rounded-lg border border-white/[50%] flex items-center justify-center transition-all`}
          style={{
            boxShadow: "0 10px 24px -20px #61cc9c",
            animationDelay: `${(index * 30) / skills.length}s`,
          }}
        >
          <Image
            src={skill.img}
            alt={`${skill.name} logo`}
            height={100}
            width={100}
            className="absolute left-2 h-[80%] w-auto object-contain opacity-60"
            loading="lazy"
            sizes="(max-width: 768px) 150px, 250px"
          />
          <h1 className="z-10">{skill.name}</h1>
        </div>
      ))}
    </div>
  );
});

export default SkillRow;
