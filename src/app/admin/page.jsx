"use client";
import Login from '@/components/admin/Login'
import PatternBackground from '@/components/ui/PatternBackground'
import React, { useState } from 'react'
import { poiret_one } from "@/lib/fonts";
import { BiLogOut, BiPlus, BiListUl, BiCertification } from "react-icons/bi";
import { 
  DynamicAddProject, 
  DynamicAddCertificate, 
  DynamicProjectList, 
  DynamicCertificateList 
} from '@/lib/dynamic-imports';

const Admin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('add-project'); // 'add-project', 'list-project', 'add-cert', 'list-cert'

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setActiveTab('add-project'); // Reset to add project tab when logging out
  };

  const AdminDashboard = () => (
    <div className="relative min-h-[100vh] flex flex-col items-center px-4 py-10">
      {/* Header with tabs and logout */}
      <div className="flex items-center justify-between w-full max-w-6xl mb-8">
        <div className="flex items-center gap-6">
          <span className={`${poiret_one.className} text-2xl text-gray-300`}>
            Admin Portal
          </span>
          
          {/* Tab Navigation */}
          <div className="flex bg-black/20 backdrop-blur-sm border border-white/10 rounded-lg overflow-hidden">
            <button
              onClick={() => setActiveTab('add-project')}
              className={`flex items-center gap-2 px-4 py-2 text-sm transition-colors ${
                activeTab === 'add-project'
                  ? 'bg-white/10 text-white'
                  : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              <BiPlus />
              Add Project
            </button>
            <button
              onClick={() => setActiveTab('list-project')}
              className={`flex items-center gap-2 px-4 py-2 text-sm transition-colors ${
                activeTab === 'list-project'
                  ? 'bg-white/10 text-white'
                  : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              <BiListUl />
              View Projects
            </button>
            <button
              onClick={() => setActiveTab('add-cert')}
              className={`flex items-center gap-2 px-4 py-2 text-sm transition-colors ${
                activeTab === 'add-cert'
                  ? 'bg-white/10 text-white'
                  : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              <BiCertification />
              Add Certificate
            </button>
            <button
              onClick={() => setActiveTab('list-cert')}
              className={`flex items-center gap-2 px-4 py-2 text-sm transition-colors ${
                activeTab === 'list-cert'
                  ? 'bg-white/10 text-white'
                  : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              <BiListUl />
              View Certificates
            </button>
          </div>
        </div>
        
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:text-white transition-colors border border-white/10 rounded-lg hover:border-white/20"
        >
          <BiLogOut />
          Logout
        </button>
      </div>

      {/* Tab Content */}
      <div className="w-full">
        {activeTab === 'add-project' && <DynamicAddProject onLogout={handleLogout} />}
        {activeTab === 'list-project' && <DynamicProjectList />}
        {activeTab === 'add-cert' && <DynamicAddCertificate onLogout={handleLogout} />}
        {activeTab === 'list-cert' && <DynamicCertificateList />}
      </div>

      <footer
        className={`${poiret_one.className} mt-10 w-full flex justify-center gap-2 opacity-[70%]`}
      >
        &copy;<span>2025 Chirag. All rights reserved.</span>
      </footer>
    </div>
  );

  return (
    <main className="relative flex min-h-screen flex-col items-center overflow-x-hidden">
      <PatternBackground/>
      {isLoggedIn ? (
        <AdminDashboard />
      ) : (
        <Login onLoginSuccess={handleLoginSuccess} />
      )}
    </main>
  )
}

export default Admin