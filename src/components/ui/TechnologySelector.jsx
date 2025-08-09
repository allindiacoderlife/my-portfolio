"use client";
import React, { useState } from 'react';
import { BiX } from 'react-icons/bi';
import { techOptions, getTechIcon } from '@/lib/technologies';

const categories = ['All', 'Frontend', 'Backend', 'Database', 'Cloud', 'Tools'];

const TechnologySelector = ({ selectedTechs = [], onTechChange, className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  // Parse selected technologies from string format
  const selectedTechsArray = typeof selectedTechs === 'string' 
    ? selectedTechs.split(',').map(tech => tech.trim()).filter(Boolean)
    : selectedTechs;

  const filteredTechs = techOptions.filter(tech => {
    const categoryMatch = activeCategory === 'All' || tech.category === activeCategory;
    const searchMatch = tech.name.toLowerCase().includes(searchTerm.toLowerCase());
    return categoryMatch && searchMatch;
  });

  const handleTechToggle = (techName) => {
    let updatedTechs;
    if (selectedTechsArray.includes(techName)) {
      updatedTechs = selectedTechsArray.filter(tech => tech !== techName);
    } else {
      updatedTechs = [...selectedTechsArray, techName];
    }
    
    // Convert back to string format for form compatibility
    const techString = updatedTechs.join(', ');
    onTechChange(techString);
  };

  const removeTech = (techName) => {
    const updatedTechs = selectedTechsArray.filter(tech => tech !== techName);
    const techString = updatedTechs.join(', ');
    onTechChange(techString);
  };

  const getTechIcon = (techName) => {
    const tech = techOptions.find(t => t.name === techName);
    return tech ? tech.icon : null;
  };

  return (
    <div className={`relative ${className}`}>
      {/* Selected Technologies Display */}
      {selectedTechsArray.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {selectedTechsArray.map((tech) => (
            <div
              key={tech}
              className="flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-sm"
            >
              {getTechIcon(tech) && (
                <img
                  src={getTechIcon(tech)}
                  alt={tech}
                  className="w-4 h-4 object-contain"
                />
              )}
              <span>{tech}</span>
              <button
                type="button"
                onClick={() => removeTech(tech)}
                className="text-red-400 hover:text-red-300 ml-1"
              >
                <BiX size={14} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Selector Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-3 py-2 text-left border border-white/10 rounded-md bg-white/10 hover:border-white/20 transition-colors flex items-center justify-between"
      >
        <span className="text-gray-300">
          {selectedTechsArray.length > 0 
            ? `${selectedTechsArray.length} technologies selected`
            : 'Select technologies...'
          }
        </span>
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Panel */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-black/90 border border-white/10 rounded-lg backdrop-blur-sm max-h-96 overflow-hidden">
          {/* Search Input */}
          <div className="p-3 border-b border-white/10">
            <input
              type="text"
              placeholder="Search technologies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded text-sm focus:outline-none focus:border-white/30"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex overflow-x-auto p-2 border-b border-white/10">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`px-3 py-1 text-sm rounded whitespace-nowrap mr-2 transition-colors ${
                  activeCategory === category
                    ? 'bg-white/20 text-white'
                    : 'text-gray-400 hover:text-gray-300'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Technology Grid */}
          <div className="max-h-64 overflow-y-auto p-3">
            <div className="grid grid-cols-2 gap-2">
              {filteredTechs.map((tech) => (
                <button
                  key={tech.name}
                  type="button"
                  onClick={() => handleTechToggle(tech.name)}
                  className={`flex items-center gap-2 p-2 rounded text-sm transition-colors ${
                    selectedTechsArray.includes(tech.name)
                      ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                      : 'hover:bg-white/10 text-gray-300'
                  }`}
                >
                  <img
                    src={tech.icon}
                    alt={tech.name}
                    className="w-5 h-5 object-contain"
                  />
                  <span>{tech.name}</span>
                </button>
              ))}
            </div>
            
            {filteredTechs.length === 0 && (
              <div className="text-center text-gray-500 py-4">
                No technologies found
              </div>
            )}
          </div>
        </div>
      )}

      {/* Backdrop to close dropdown */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default TechnologySelector;
