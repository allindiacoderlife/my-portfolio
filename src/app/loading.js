"use client";
import { stretch, montserrat_alternates } from "@/lib/fonts";
import { useEffect, useState } from "react";

export default function Loading() {
  const [messageIndex, setMessageIndex] = useState(0);

  const messages = [
    "Fetching data...",
    "Almost there...",
    "Downloading resources...",
    "Just a moment...",
  ];

   useEffect(() => {
    const messageInterval = setInterval(() => {
      setMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, 2500);

    return () => {
      clearInterval(messageInterval);
    };
  }, [messages.length]);
  return (
    <div
      className={`min-w-full min-h-[100vh] bg-black flex flex-col items-center justify-center gap-4 text-center`}
    >
      <svg
        className="w-50 h-48 animate-strokeFill"
        viewBox="0 0 180 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dy=".35em"
          className={`${stretch.className} text-3xl md:text-5xl`}
          fill="transparent"
          stroke="#CBACF9"
          strokeWidth="1"
        >
          Loading...
        </text>
      </svg>
      <p className={`${montserrat_alternates.className} text-base`}>{messages[messageIndex]}</p>
    </div>
  );
}
