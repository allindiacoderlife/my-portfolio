"use client";
import { stretch, montserrat_alternates } from "@/lib/fonts";
import { useEffect, useState, memo } from "react";

const Loading = memo(() => {
  const [messageIndex, setMessageIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const messages = [
    "Initializing...",
    "Loading components...",
    "Fetching data...",
    "Almost ready...",
  ];

  useEffect(() => {
    const messageInterval = setInterval(() => {
      setMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, 1000);

    // Simulate loading progress
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) return 100;
        return prev + Math.random() * 15;
      });
    }, 200);

    return () => {
      clearInterval(messageInterval);
      clearInterval(progressInterval);
    };
  }, [messages.length]);

  return (
    <div className="min-w-full min-h-[100vh] bg-gradient-to-br from-black via-gray-900 to-black flex flex-col items-center justify-center gap-6 text-center">
      {/* Animated Logo */}
      <div className="relative">
        <svg
          className="w-48 h-24 animate-pulse"
          viewBox="0 0 180 100"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#CBACF9" />
              <stop offset="50%" stopColor="#A855F7" />
              <stop offset="100%" stopColor="#CBACF9" />
            </linearGradient>
          </defs>
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dy=".35em"
            className={`${stretch.className} text-2xl md:text-4xl`}
            fill="url(#textGradient)"
            stroke="#CBACF9"
            strokeWidth="0.5"
          >
            Portfolio
          </text>
        </svg>
        
        {/* Spinning loader */}
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-64 h-1 bg-gray-800 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${Math.min(progress, 100)}%` }}
        ></div>
      </div>

      {/* Loading message */}
      <p className={`${montserrat_alternates.className} text-base text-gray-300 animate-fade-in`}>
        {messages[messageIndex]}
      </p>

      {/* Progress percentage */}
      <p className="text-sm text-gray-500">
        {Math.min(Math.round(progress), 100)}%
      </p>
    </div>
  );
});

Loading.displayName = 'Loading';

export default Loading;
