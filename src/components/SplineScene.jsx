import { sacramento } from "@/lib/fonts";
import { useState } from "react";

export default function SplineScene() {
  const [showFallback, setShowFallback] = useState(true);

  return (
    <div className="absolute top-[100vh] -translate-y-[35%] w-full h-[100vh]">
      <div
        className={`${sacramento.className} flex gap-4 absolute left-8 md:left-12 lg:left-28 top-8 rotate-6 pointer-events-none z-10`}
      >
        <h1 className={`text-4xl md:text-5xl text-white`}>
          the ultimate <b className="text-[#61cc9c]">dev</b> <br /> keyboard
          workflow
        </h1>

        <img
          src="/assets/noodle_arrow.svg"
          alt="noodle-arrow"
          width={100}
          height={100}
          className="w-[100px] translate-y-[10px] translate-x-[-20px]"
        />
      </div>

      {/* Fallback design instead of 3D scene */}
      <div className="w-full h-full bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center relative overflow-hidden">
        {/* Animated background grid */}
        <div className="absolute inset-0 opacity-20">
          <div className="grid grid-cols-12 gap-4 h-full">
            {[...Array(48)].map((_, i) => (
              <div
                key={i}
                className="bg-purple-500/10 rounded animate-pulse"
                style={{
                  animationDelay: `${i * 0.1}s`,
                  animationDuration: `${2 + (i % 3)}s`
                }}
              />
            ))}
          </div>
        </div>

        {/* Central content */}
        <div className="relative z-10 text-center space-y-6 p-8">
          <div className="relative">
            {/* Keyboard illustration */}
            <div className="bg-gray-800 rounded-lg p-6 shadow-2xl border border-gray-600 max-w-md mx-auto">
              <div className="grid grid-cols-12 gap-1 mb-3">
                {[...Array(12)].map((_, i) => (
                  <div
                    key={i}
                    className={`h-8 rounded ${
                      i === 5 || i === 6 ? 'bg-purple-500' : 'bg-gray-600'
                    } ${i === 5 || i === 6 ? 'animate-pulse' : ''}`}
                  />
                ))}
              </div>
              <div className="grid grid-cols-10 gap-1 mb-3">
                {[...Array(10)].map((_, i) => (
                  <div
                    key={i}
                    className={`h-8 rounded ${
                      i === 4 || i === 5 ? 'bg-green-500' : 'bg-gray-600'
                    } ${i === 4 || i === 5 ? 'animate-pulse' : ''}`}
                  />
                ))}
              </div>
              <div className="h-8 bg-gray-600 rounded mx-8"></div>
            </div>
            
            {/* Floating code snippets */}
            <div className="absolute -top-4 -right-4 bg-black/80 text-green-400 text-xs p-2 rounded font-mono animate-bounce">
              &lt;code /&gt;
            </div>
            <div className="absolute -bottom-4 -left-4 bg-black/80 text-blue-400 text-xs p-2 rounded font-mono animate-bounce" style={{ animationDelay: '0.5s' }}>
              function()
            </div>
          </div>

          <div className="text-white">
            <p className="text-lg opacity-80">
              Optimized development environment
            </p>
            <p className="text-sm text-gray-400 mt-2">
              Built for speed and efficiency
            </p>
          </div>
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-purple-400 rounded-full animate-ping"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
