"use client";
import Login from '@/components/admin/Login';
import PatternBackground from '@/components/ui/PatternBackground';
import React, { useState, useEffect } from 'react';
import { poiret_one } from "@/lib/fonts";
import { 
  BiLogOut, 
  BiPlus, 
  BiListUl, 
  BiGridAlt, 
  BiWrench, 
  BiUser, 
  BiEnvelope,
  BiHome
} from "react-icons/bi";
import { 
  DynamicAddProject, 
  DynamicProjectList, 
  DynamicDashboardStats,
  DynamicSkillsManager,
  DynamicAboutEditor,
  DynamicMessagesInbox
} from '@/lib/dynamic-imports';
import { Link } from 'react-router-dom';

const Admin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [messageCount, setMessageCount] = useState(0);

  // Check persisted session on mount
  useEffect(() => {
    const savedAuth = sessionStorage.getItem('portfolio_admin_auth');
    if (savedAuth === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  // Fetch count of contact messages
  useEffect(() => {
    if (isLoggedIn) {
      fetch('/api/messages')
        .then(res => res.json())
        .then(data => {
          if (data.success && Array.isArray(data.messages)) {
            setMessageCount(data.messages.length);
          }
        })
        .catch(() => {});
    }
  }, [isLoggedIn, activeTab]);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    sessionStorage.setItem('portfolio_admin_auth', 'true');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    sessionStorage.removeItem('portfolio_admin_auth');
    setActiveTab('overview');
  };

  const navTabs = [
    { id: 'overview', label: 'Overview', icon: BiGridAlt },
    { id: 'list-project', label: 'Projects', icon: BiListUl },
    { id: 'add-project', label: 'Add Project', icon: BiPlus },
    { id: 'skills', label: 'Skills', icon: BiWrench },
    { id: 'about', label: 'Profile & Bio', icon: BiUser },
    { id: 'messages', label: 'Inquiries', icon: BiEnvelope, badge: messageCount },
  ];

  const AdminDashboard = () => (
    <div className="relative min-h-[100vh] w-full flex flex-col items-center px-3 sm:px-6 py-8">
      {/* Top Navbar */}
      <div className="flex flex-col lg:flex-row items-center justify-between w-full max-w-6xl mb-8 gap-4 p-4 rounded-2xl bg-black/40 border border-white/10 backdrop-blur-md">
        <div className="flex items-center gap-4 w-full lg:w-auto justify-between lg:justify-start">
          <div className="flex items-center gap-3">
            <span className={`${poiret_one.className} text-2xl font-bold text-white tracking-wider`}>
              CMS Portal
            </span>
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#CBACF9]/20 text-[#CBACF9] border border-[#CBACF9]/30">
              Admin
            </span>
          </div>

          <Link
            to="/"
            target="_blank"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-gray-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors"
          >
            <BiHome />
            <span>View Site</span>
          </Link>
        </div>
        
        {/* Tab Navigation Menu */}
        <div className="flex flex-wrap items-center justify-center gap-1 bg-black/50 p-1.5 rounded-xl border border-white/10 max-w-full overflow-x-auto">
          {navTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-all relative ${
                  isActive
                    ? 'bg-[#CBACF9]/20 text-[#CBACF9] border border-[#CBACF9]/40 shadow-sm'
                    : 'text-gray-400 hover:text-gray-200 hover:bg-white/5 border border-transparent'
                }`}
              >
                <Icon className="text-sm" />
                <span>{tab.label}</span>
                {typeof tab.badge === 'number' && tab.badge > 0 && (
                  <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] bg-[#CBACF9] text-black font-bold">
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Logout Action */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs text-gray-300 hover:text-red-300 transition-colors bg-white/5 hover:bg-red-500/10 border border-white/10 hover:border-red-500/30 rounded-lg shrink-0"
        >
          <BiLogOut />
          <span>Logout</span>
        </button>
      </div>

      {/* Dynamic Tab Views */}
      <div className="w-full max-w-6xl">
        {activeTab === 'overview' && (
          <DynamicDashboardStats onNavigateTab={(tab) => setActiveTab(tab)} />
        )}
        {activeTab === 'list-project' && <DynamicProjectList />}
        {activeTab === 'add-project' && (
          <DynamicAddProject onLogout={handleLogout} />
        )}
        {activeTab === 'skills' && <DynamicSkillsManager />}
        {activeTab === 'about' && <DynamicAboutEditor />}
        {activeTab === 'messages' && <DynamicMessagesInbox />}
      </div>

      <footer
        className={`${poiret_one.className} mt-16 w-full flex justify-center gap-2 opacity-[70%] text-sm`}
      >
        &copy;<span>{new Date().getFullYear()} Chirag Saxena — Admin CMS Engine</span>
      </footer>
    </div>
  );

  return (
    <main className="relative flex min-h-screen flex-col items-center overflow-x-hidden bg-[#090D16]">
      <PatternBackground />
      {isLoggedIn ? (
        <AdminDashboard />
      ) : (
        <Login onLoginSuccess={handleLoginSuccess} />
      )}
    </main>
  );
};

export default Admin;