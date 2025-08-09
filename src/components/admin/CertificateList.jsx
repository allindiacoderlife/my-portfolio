"use client";
import React, { useState, useEffect } from 'react';
import { FaTrash, FaEye, FaExternalLinkAlt, FaCertificate } from 'react-icons/fa';
import { motion } from 'framer-motion';

const CertificateList = () => {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCertificates();
  }, []);

  const fetchCertificates = async () => {
    try {
      const response = await fetch('/api/certificates');
      const data = await response.json();
      
      if (data.success) {
        setCertificates(data.certificates);
      } else {
        setError('Failed to fetch certificates');
      }
    } catch (err) {
      setError('Network error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteCertificate = async (certificate) => {
    // Get the ID (either _id from MongoDB or id from mock data)
    const certificateId = certificate._id || certificate.id;
    
    if (!confirm('Are you sure you want to delete this certificate?')) {
      return;
    }

    try {
      const response = await fetch(`/api/certificates?id=${certificateId}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (data.success) {
        setCertificates(certificates.filter(cert => 
          (cert._id || cert.id) !== certificateId
        ));
        alert('Certificate deleted successfully');
      } else {
        alert('Error deleting certificate: ' + data.error);
      }
    } catch (err) {
      alert('Network error: ' + err.message);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#CBACF9]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-400 p-8">
        <p>Error: {error}</p>
        <button 
          onClick={fetchCertificates}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Certificate Management</h2>
          <p className="text-gray-400">Manage your certificates and achievements</p>
        </div>
        <div className="text-sm text-gray-400">
          Total: {certificates.length} certificate{certificates.length !== 1 ? 's' : ''}
        </div>
      </div>

      {certificates.length === 0 ? (
        <div className="text-center py-12">
          <FaCertificate className="mx-auto text-4xl text-gray-400 mb-4" />
          <p className="text-gray-400 text-lg">No certificates found</p>
          <p className="text-gray-500 text-sm mt-2">
            Add your first certificate using the "Add Certificate" tab
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((certificate, index) => (
            <motion.div
              key={certificate._id || certificate.id || index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-white/20 transition-all duration-300"
            >
              {/* Certificate Image */}
              <div className="w-full h-40 bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 rounded-lg mb-4 flex items-center justify-center relative overflow-hidden">
                {certificate.image ? (
                  <img
                    src={certificate.image}
                    alt={certificate.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-center text-white">
                    <FaCertificate className="text-3xl mb-2 mx-auto" />
                    <p className="text-sm font-medium">{certificate.title}</p>
                  </div>
                )}
              </div>

              {/* Certificate Info */}
              <div className="space-y-3">
                <div>
                  <h3 className="text-lg font-semibold text-white line-clamp-2">
                    {certificate.title}
                  </h3>
                  <p className="text-[#CBACF9] text-sm">{certificate.issuer}</p>
                  <p className="text-gray-400 text-xs">{certificate.date}</p>
                </div>

                <p className="text-gray-300 text-sm line-clamp-3">
                  {certificate.description}
                </p>

                {certificate.skills && certificate.skills.length > 0 && (
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Skills:</p>
                    <div className="flex flex-wrap gap-1">
                      {certificate.skills.slice(0, 3).map((skill, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-700 text-white text-xs rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                      {certificate.skills.length > 3 && (
                        <span className="px-2 py-1 bg-gray-600 text-gray-300 text-xs rounded-full">
                          +{certificate.skills.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {certificate.credentialId && (
                  <p className="text-xs text-gray-400">
                    ID: {certificate.credentialId}
                  </p>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-2 mt-4 pt-4 border-t border-white/10">
                {certificate.verifyLink && (
                  <a
                    href={certificate.verifyLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white text-xs rounded-lg transition-colors"
                  >
                    <FaExternalLinkAlt className="text-xs" />
                    Verify
                  </a>
                )}
                
                <button
                  onClick={() => deleteCertificate(certificate)}
                  className="flex items-center gap-1 px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs rounded-lg transition-colors ml-auto"
                >
                  <FaTrash className="text-xs" />
                  Delete
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CertificateList;
