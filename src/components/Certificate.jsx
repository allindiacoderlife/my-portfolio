"use client";
import React, { useState, useEffect } from 'react';
import { montserrat_alternates, morona } from "@/lib/fonts";
import { certificates as defaultCertificates } from "@/lib/utils";
import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card";
import { FaExternalLinkAlt, FaCalendarAlt, FaCertificate, FaCheck } from "react-icons/fa";
import { motion } from "framer-motion";

const Certificate = () => {
  const [certificateList, setCertificateList] = useState(defaultCertificates);
  const [selectedCertificate, setSelectedCertificate] = useState(null);

  useEffect(() => {
    fetch('/api/certificates')
      .then(res => res.json())
      .then(data => {
        if (data.success && Array.isArray(data.certificates) && data.certificates.length > 0) {
          setCertificateList(data.certificates);
        }
      })
      .catch(err => {
        console.warn('Using default certificates fallback:', err.message);
      });
  }, []);

  useEffect(() => {
    if (selectedCertificate) {
      document.body.style.overflow = 'hidden';
      if (typeof window !== 'undefined' && window.__lenis) {
        window.__lenis.stop();
      }
      return () => {
        document.body.style.overflow = 'unset';
        if (typeof window !== 'undefined' && window.__lenis) {
          window.__lenis.start();
        }
      };
    } else {
      document.body.style.overflow = 'unset';
      if (typeof window !== 'undefined' && window.__lenis) {
        window.__lenis.start();
      }
    }
  }, [selectedCertificate]);

  return (
    <div
      id="certificates"
      className="relative w-screen min-h-[100vh] flex flex-col items-center justify-center py-10 md:py-16 lg:py-20 px-4 gap-6 md:gap-8 lg:gap-12"
    >
      {/* Header Section */}
      <div className={`flex flex-col items-center text-2xl z-10 max-w-4xl text-center`}>
        <span className={`opacity-80 font-normal ${morona.className} text-lg md:text-xl`}>
          showcase of my
        </span>
        <h1 className={`text-3xl md:text-4xl lg:text-5xl font-medium mb-3 md:mb-4`}>Certificates</h1>
        <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-2xl">
          Professional certifications and achievements in web development, cloud computing, and design
        </p>
      </div>

      {/* Certificates Marquee */}
      <div className="w-full overflow-hidden relative">
        <div className="flex animate-marquee hover:pause-marquee gap-6 md:gap-8">
          {/* First set of certificates */}
          {certificateList.map((cert, index) => (
            <motion.div
              key={`first-${index}`}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex-shrink-0 w-80 md:w-96" // Fixed width for consistent sizing
            >
              <CardContainer className="inter-var h-full">
                <CardBody className="bg-black relative group/card hover:shadow-2xl hover:shadow-[#CBACF9]/[0.3] border border-white/[0.2] w-full h-[500px] rounded-xl p-4 md:p-6 flex flex-col">
                  {/* Certificate Header */}
                  <CardItem
                    translateZ="50"
                    className="text-lg md:text-xl font-bold text-white mb-2"
                  >
                    {cert.title}
                  </CardItem>
                  
                  <CardItem
                    as="p"
                    translateZ="60"
                    className="text-neutral-300 text-sm mb-4"
                  >
                    {cert.description}
                  </CardItem>

                  {/* Issuer and Date */}
                  <CardItem
                    translateZ="40"
                    className="flex items-center justify-between mb-4"
                  >
                    <div className="flex items-center gap-2">
                      <FaCertificate className="text-blue-500 text-sm" />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {cert.issuer}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaCalendarAlt className="text-green-500 text-sm" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {cert.date}
                      </span>
                    </div>
                  </CardItem>

                  {/* Certificate Image Placeholder */}
                  <CardItem translateZ="100" className="w-full mb-3 md:mb-4 flex-grow">
                    <div className="w-full h-40 md:h-48 bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 rounded-lg flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                        <div className="text-center text-white">
                          <FaCertificate className="text-3xl md:text-4xl mb-2 mx-auto" />
                          <p className="text-base md:text-lg font-bold">{cert.title}</p>
                          <p className="text-xs md:text-sm opacity-90">{cert.issuer}</p>
                        </div>
                      </div>
                      {/* Decorative elements */}
                      <div className="absolute top-3 md:top-4 right-3 md:right-4 w-6 md:w-8 h-6 md:h-8 border-2 border-white/30 rounded-full"></div>
                      <div className="absolute bottom-3 md:bottom-4 left-3 md:left-4 w-5 md:w-6 h-5 md:h-6 border-2 border-white/30 rounded-full"></div>
                    </div>
                  </CardItem>

                  {/* Skills */}
                  <CardItem translateZ="20" className="mb-3 md:mb-4">
                    <div className="flex flex-wrap gap-1.5 md:gap-2">
                      {cert.skills.slice(0, 4).map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                      {cert.skills.length > 4 && (
                        <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs rounded-full">
                          +{cert.skills.length - 4} more
                        </span>
                      )}
                    </div>
                  </CardItem>

                  {/* Actions */}
                  <div className="flex justify-between items-center gap-2 mt-auto">
                    <CardItem
                      translateZ={20}
                      as="a"
                      href={cert.verifyLink}
                      target="_blank"
                      className="px-3 md:px-4 py-2 rounded-xl text-xs font-normal dark:text-white bg-black dark:bg-white text-white flex items-center gap-1.5 md:gap-2 hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
                    >
                      <FaExternalLinkAlt className="text-xs" />
                      Verify
                    </CardItem>
                    
                    <CardItem
                      translateZ={20}
                      as="button"
                      onClick={() => setSelectedCertificate(cert)}
                      className="px-3 md:px-4 py-2 rounded-xl bg-transparent border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 text-xs hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                      Details
                    </CardItem>
                  </div>

                  {/* Credential ID */}
                  <CardItem translateZ="10" className="mt-2 md:mt-3">
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                      ID: {cert.credentialId}
                    </p>
                  </CardItem>
                </CardBody>
              </CardContainer>
            </motion.div>
          ))}
          
          {/* Duplicate set for infinite scroll */}
          {certificateList.map((cert, index) => (
            <motion.div
              key={`second-${index}`}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex-shrink-0 w-80 md:w-96" // Fixed width for consistent sizing
            >
              <CardContainer className="inter-var h-full">
                <CardBody className="bg-black relative group/card hover:shadow-2xl hover:shadow-[#CBACF9]/[0.3] border border-white/[0.2] w-full h-[500px] rounded-xl p-4 md:p-6 flex flex-col">
                  {/* Certificate Header */}
                  <CardItem
                    translateZ="50"
                    className="text-lg md:text-xl font-bold text-white mb-2"
                  >
                    {cert.title}
                  </CardItem>
                  
                  <CardItem
                    as="p"
                    translateZ="60"
                    className="text-neutral-300 text-sm mb-4"
                  >
                    {cert.description}
                  </CardItem>

                  {/* Issuer and Date */}
                  <CardItem
                    translateZ="40"
                    className="flex items-center justify-between mb-4"
                  >
                    <div className="flex items-center gap-2">
                      <FaCertificate className="text-blue-500 text-sm" />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {cert.issuer}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaCalendarAlt className="text-green-500 text-sm" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {cert.date}
                      </span>
                    </div>
                  </CardItem>

                  {/* Certificate Image Placeholder */}
                  <CardItem translateZ="100" className="w-full mb-3 md:mb-4 flex-grow">
                    <div className="w-full h-40 md:h-48 bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 rounded-lg flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                        <div className="text-center text-white">
                          <FaCertificate className="text-3xl md:text-4xl mb-2 mx-auto" />
                          <p className="text-base md:text-lg font-bold">{cert.title}</p>
                          <p className="text-xs md:text-sm opacity-90">{cert.issuer}</p>
                        </div>
                      </div>
                      {/* Decorative elements */}
                      <div className="absolute top-3 md:top-4 right-3 md:right-4 w-6 md:w-8 h-6 md:h-8 border-2 border-white/30 rounded-full"></div>
                      <div className="absolute bottom-3 md:bottom-4 left-3 md:left-4 w-5 md:w-6 h-5 md:h-6 border-2 border-white/30 rounded-full"></div>
                    </div>
                  </CardItem>

                  {/* Skills */}
                  <CardItem translateZ="20" className="mb-3 md:mb-4">
                    <div className="flex flex-wrap gap-1.5 md:gap-2">
                      {cert.skills.slice(0, 4).map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                      {cert.skills.length > 4 && (
                        <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs rounded-full">
                          +{cert.skills.length - 4} more
                        </span>
                      )}
                    </div>
                  </CardItem>

                  {/* Actions */}
                  <div className="flex justify-between items-center gap-2 mt-auto">
                    <CardItem
                      translateZ={20}
                      as="a"
                      href={cert.verifyLink}
                      target="_blank"
                      className="px-3 md:px-4 py-2 rounded-xl text-xs font-normal dark:text-white bg-black dark:bg-white text-white flex items-center gap-1.5 md:gap-2 hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
                    >
                      <FaExternalLinkAlt className="text-xs" />
                      Verify
                    </CardItem>
                    
                    <CardItem
                      translateZ={20}
                      as="button"
                      onClick={() => setSelectedCertificate(cert)}
                      className="px-3 md:px-4 py-2 rounded-xl bg-transparent border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 text-xs hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                      Details
                    </CardItem>
                  </div>

                  {/* Credential ID */}
                  <CardItem translateZ="10" className="mt-2 md:mt-3">
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                      ID: {cert.credentialId}
                    </p>
                  </CardItem>
                </CardBody>
              </CardContainer>
            </motion.div>
          ))}
        </div>
      </div>      {/* Certificate Modal */}
      {selectedCertificate && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          data-lenis-prevent="true"
          onWheel={(e) => e.stopPropagation()}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white dark:bg-gray-900 rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto overscroll-contain"
            data-lenis-prevent="true"
            onWheel={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {selectedCertificate.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {selectedCertificate.issuer} • {selectedCertificate.date}
                </p>
              </div>
              <button
                onClick={() => setSelectedCertificate(null)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-2xl"
              >
                ×
              </button>
            </div>

            <div className="mb-6">
              <div className="w-full h-64 bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 rounded-lg flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                  <div className="text-center text-white">
                    <FaCertificate className="text-6xl mb-4 mx-auto" />
                    <p className="text-2xl font-bold">{selectedCertificate.title}</p>
                    <p className="text-lg opacity-90">{selectedCertificate.issuer}</p>
                    <p className="text-sm opacity-75 mt-2">{selectedCertificate.date}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Description</h4>
                <p className="text-gray-600 dark:text-gray-400">{selectedCertificate.description}</p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Skills Covered</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {selectedCertificate.skills.map((skill, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <FaCheck className="text-green-500 text-sm" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Credential ID</p>
                    <p className="font-mono text-sm text-gray-900 dark:text-white">{selectedCertificate.credentialId}</p>
                  </div>
                  <a
                    href={selectedCertificate.verifyLink}
                    target="_blank"
                    className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2 transition-colors"
                  >
                    <FaExternalLinkAlt className="text-sm" />
                    Verify Certificate
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
};

export default Certificate;