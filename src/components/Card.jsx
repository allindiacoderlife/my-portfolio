"use client"
import React from 'react'
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { FaEye, FaExternalLinkAlt } from "react-icons/fa";

const Card = ({ title, des, img, tech, link, project, onViewDetails }) => {
  return (
    <CardContainer className="inter-var">
      <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-[#CBACF9]/[0.5] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border ">
        <CardItem
          translateZ="50"
          className="text-xl font-bold text-neutral-600 dark:text-white cursor-pointer hover:text-[#CBACF9] transition-colors"
          onClick={onViewDetails}
        >
          {title}
        </CardItem>
        <CardItem
          as="p"
          translateZ="60"
          className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
        >
          {des}
        </CardItem>
        <CardItem translateZ="100" className="w-full mt-4">
          <div 
            onClick={onViewDetails}
            className="cursor-pointer group relative overflow-hidden rounded-xl"
          >
            <img
              src={img}
              height="1000"
              width="1000"
              className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl transition-transform duration-300 group-hover:scale-105"
              alt="thumbnail"
            />
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
              <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                <FaEye className="text-black text-sm" />
                <span className="text-black text-sm font-medium">View Details</span>
              </div>
            </div>
          </div>
        </CardItem>
        <div className="flex justify-between items-center mt-20">
          <div className='flex'>
            {tech.map((item, index) => (
              <CardItem
                translateZ={20}
                key={index}
                className="border border-white/[.2] rounded-full bg-black lg:w-10 lg:h-10 w-8 h-8 flex justify-center items-center"
                style={
                  {
                    transform: `translateX(-${5 * index + 2}px)`,
                  }
                }
              >
                <img src={item} alt={item} className="p-2"/>
              </CardItem>
            ))}
          </div>
          
          <div className="flex gap-2">
            {/* View Details Button */}
            {onViewDetails && (
              <CardItem
                translateZ={20}
                as="button"
                onClick={onViewDetails}
                className="px-3 py-2 rounded-xl text-xs font-normal dark:text-white bg-white/10 hover:bg-white/20 transition-colors flex items-center gap-1 border border-white/20"
              >
                <FaEye className="text-xs" />
                Details
              </CardItem>
            )}
            
            {/* Live Demo Button */}
            <CardItem
              translateZ={20}
              as="a"
              href={link}
              target="__blank"
              className="px-3 py-2 rounded-xl text-xs font-normal dark:text-white bg-[#CBACF9] text-black hover:bg-[#CBACF9]/90 transition-colors flex items-center gap-1"
            >
              <FaExternalLinkAlt className="text-xs" />
              Live Demo
            </CardItem>
          </div>
        </div>
      </CardBody>
    </CardContainer>
  )
}

export default Card