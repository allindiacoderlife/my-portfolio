import React from 'react'
import { montserrat_alternates, morona } from "@/lib/fonts";
const Certificate = () => {
  return (
    <div
      id="projects"
      className="relative w-screen min-h-[100vh] flex flex-col items-center justify-center py-10 md:py-20 md:pb-20 lg:pt-[80px] xl:mt-20 gap-8"
    >
      <div className={`flex flex-col items-center text-2xl`}>
        <span className={`opacity-80 font-normal ${morona.className}`}>
          collection of my
        </span>
        <h1 className={`text-4xl md:text-4xl font-medium`}>Certificate</h1>

        
      </div>
    </div>
  )
}

export default Certificate