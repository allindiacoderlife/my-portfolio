"use client";
import React, { useState, useEffect } from "react";
import { BiEnvelope, BiTrash, BiMailSend, BiRefresh, BiTime } from "react-icons/bi";

export default function MessagesInbox() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/messages");
      const data = await res.json();
      if (data.success) {
        setMessages(data.messages || []);
      } else {
        setError(data.error || "Failed to fetch messages");
      }
    } catch (err) {
      setError("Network error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this inquiry?")) return;
    try {
      const res = await fetch(`/api/messages/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (res.ok && data.success) {
        setMessages(prev => prev.filter(m => m._id !== id));
      } else {
        alert("Error deleting message: " + (data.error || "Unknown error"));
      }
    } catch (err) {
      alert("Error deleting message: " + err.message);
    }
  };

  const formatDate = (isoStr) => {
    if (!isoStr) return "";
    try {
      return new Date(isoStr).toLocaleString();
    } catch (e) {
      return isoStr;
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-2xl bg-black/25 border border-white/10 backdrop-blur-md">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <BiEnvelope className="text-[#fbbf24]" />
            Client Inquiries & Contact Messages
          </h2>
          <p className="text-gray-400 text-sm mt-1">
            Real-time messages submitted through the frontend contact form.
          </p>
        </div>
        <button
          onClick={fetchMessages}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/10 text-sm transition-colors"
        >
          <BiRefresh /> Refresh
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center min-h-[300px]">
          <div className="w-8 h-8 border-2 border-[#CBACF9] border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : error ? (
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-300 text-sm">
          {error}
        </div>
      ) : messages.length === 0 ? (
        <div className="p-12 text-center text-gray-500 bg-black/20 border border-white/5 rounded-2xl space-y-2">
          <BiEnvelope className="mx-auto text-4xl opacity-40" />
          <p className="text-base text-gray-300">No contact messages yet</p>
          <p className="text-xs text-gray-500">
            Messages sent through your contact section will appear here automatically.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg._id}
              className="p-5 rounded-2xl bg-black/30 border border-white/10 hover:border-white/20 transition-all space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-white/5">
                <div>
                  <h3 className="text-base font-semibold text-white">{msg.name}</h3>
                  <a
                    href={`mailto:${msg.email}`}
                    className="text-xs text-[#CBACF9] hover:underline"
                  >
                    {msg.email}
                  </a>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs text-gray-500 flex items-center gap-1">
                    <BiTime />
                    {formatDate(msg.createdAt)}
                  </span>
                  <a
                    href={`mailto:${msg.email}?subject=Reply to your inquiry on Chirag's Portfolio`}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border border-blue-500/30 text-xs transition-colors"
                  >
                    <BiMailSend /> Reply
                  </a>
                  <button
                    onClick={() => handleDelete(msg._id)}
                    className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 text-xs transition-colors"
                    title="Delete message"
                  >
                    <BiTrash />
                  </button>
                </div>
              </div>

              <p className="text-sm text-gray-300 whitespace-pre-wrap leading-relaxed">
                {msg.message}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
