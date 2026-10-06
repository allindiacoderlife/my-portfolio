"use client";
import React, { useState, useEffect } from "react";
import { 
  BiFolder, 
  BiWrench, 
  BiEnvelope, 
  BiServer, 
  BiRefresh, 
  BiPlusCircle,
  BiCheckCircle,
  BiTrendingUp
} from "react-icons/bi";

export default function DashboardStats({ onNavigateTab }) {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/stats");
      const data = await res.json();
      if (data.success) {
        setStats(data.stats);
      } else {
        setError(data.error || "Failed to load dashboard metrics");
      }
    } catch (err) {
      setError("Network error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[350px] gap-3">
        <div className="w-10 h-10 border-2 border-[#CBACF9] border-t-transparent rounded-full animate-spin"></div>
        <span className="text-gray-400 text-sm">Gathering portfolio analytics...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-red-500/10 border border-red-500/20 rounded-xl text-center text-red-300">
        <p>{error}</p>
        <button
          onClick={fetchStats}
          className="mt-4 px-4 py-1.5 bg-red-600/30 hover:bg-red-600/50 rounded-lg text-sm text-white"
        >
          Try Again
        </button>
      </div>
    );
  }

  const statCards = [
    {
      title: "Total Projects",
      count: stats?.projects || 0,
      icon: BiFolder,
      color: "from-purple-500/20 to-purple-800/10",
      accent: "#CBACF9",
      targetTab: "list-project",
      actionLabel: "View Projects",
    },
    {
      title: "Skills Configured",
      count: stats?.skills || 0,
      icon: BiWrench,
      color: "from-emerald-500/20 to-emerald-800/10",
      accent: "#34d399",
      targetTab: "skills",
      actionLabel: "Manage Skills",
    },
    {
      title: "Inquiries Received",
      count: stats?.messages || 0,
      icon: BiEnvelope,
      color: "from-amber-500/20 to-amber-800/10",
      accent: "#fbbf24",
      targetTab: "messages",
      actionLabel: "View Inbox",
    },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8 animate-fadeIn">
      {/* Top Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-900/30 via-black/40 to-black/60 border border-white/10 backdrop-blur-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            System Control Dashboard
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#CBACF9]/20 text-[#CBACF9] border border-[#CBACF9]/30">
              Live CMS
            </span>
          </h2>
          <p className="text-gray-400 text-sm mt-1">
            Dynamic content management engine serving real-time portfolio data.
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/40 border border-white/10 text-xs text-gray-300">
            <BiServer className={stats?.dbConnected ? "text-emerald-400" : "text-amber-400"} />
            <span>
              {stats?.dbConnected ? "MongoDB Active" : "In-Memory Fallback"}
            </span>
          </div>

          <button
            onClick={fetchStats}
            title="Refresh stats"
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/10 transition-colors"
          >
            <BiRefresh className="text-lg" />
          </button>
        </div>
      </div>

      {/* Metric Cards Grid - 3 cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {statCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div
              key={idx}
              className={`p-5 rounded-2xl bg-gradient-to-br ${card.color} border border-white/10 backdrop-blur-sm relative overflow-hidden group hover:border-white/20 transition-all duration-300`}
            >
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-sm font-medium">{card.title}</span>
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center bg-black/40 border border-white/10"
                  style={{ color: card.accent }}
                >
                  <Icon className="text-xl" />
                </div>
              </div>

              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-white tracking-tight">
                  {card.count}
                </span>
                <span className="text-xs text-gray-400">items</span>
              </div>

              <div className="mt-5 pt-4 border-t border-white/10 flex justify-between items-center">
                <button
                  onClick={() => onNavigateTab(card.targetTab)}
                  className="text-xs font-medium hover:underline flex items-center gap-1 transition-colors"
                  style={{ color: card.accent }}
                >
                  {card.actionLabel} &rarr;
                </button>
                <BiTrendingUp className="text-gray-500 text-sm opacity-50" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Launchpad & Shortcuts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-black/25 border border-white/10 backdrop-blur-md space-y-4">
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <BiPlusCircle className="text-[#CBACF9]" />
            Quick Actions
          </h3>
          <div className="flex flex-col gap-2.5">
            <button
              onClick={() => onNavigateTab("add-project")}
              className="w-full text-left px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-[#CBACF9]/30 text-sm text-gray-200 hover:text-white transition-all flex items-center justify-between"
            >
              <span>Publish New Project</span>
              <span className="text-xs text-gray-500">+ Project</span>
            </button>
            <button
              onClick={() => onNavigateTab("skills")}
              className="w-full text-left px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-[#34d399]/30 text-sm text-gray-200 hover:text-white transition-all flex items-center justify-between"
            >
              <span>Add Tech Skill</span>
              <span className="text-xs text-gray-500">+ Skill</span>
            </button>
            <button
              onClick={() => onNavigateTab("about")}
              className="w-full text-left px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-[#fbbf24]/30 text-sm text-gray-200 hover:text-white transition-all flex items-center justify-between"
            >
              <span>Edit Bio & Profile</span>
              <span className="text-xs text-gray-500">Edit Info</span>
            </button>
            <button
              onClick={() => onNavigateTab("messages")}
              className="w-full text-left px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-amber-400/30 text-sm text-gray-200 hover:text-white transition-all flex items-center justify-between"
            >
              <span>View Client Inquiries</span>
              <span className="text-xs text-gray-500">Inbox</span>
            </button>
          </div>
        </div>

        {/* Dynamic Integration Status */}
        <div className="md:col-span-2 p-6 rounded-2xl bg-black/25 border border-white/10 backdrop-blur-md space-y-4">
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <BiCheckCircle className="text-emerald-400" />
            Frontend REST API Binding Status
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between">
              <div>
                <span className="font-medium text-white block">Projects API</span>
                <span className="text-xs text-gray-400 font-mono">/api/projects</span>
              </div>
              <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Connected
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between">
              <div>
                <span className="font-medium text-white block">Technical Skills API</span>
                <span className="text-xs text-gray-400 font-mono">/api/skills</span>
              </div>
              <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Connected
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between">
              <div>
                <span className="font-medium text-white block">About & Profile API</span>
                <span className="text-xs text-gray-400 font-mono">/api/about</span>
              </div>
              <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Connected
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between">
              <div>
                <span className="font-medium text-white block">Contact Form & Inquiries</span>
                <span className="text-xs text-gray-400 font-mono">/api/contact & /api/messages</span>
              </div>
              <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Connected
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
