import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import "@/styles/global.css";
import SmoothScroll from "@/components/SmoothScroll";
import PerformanceMonitor from "@/components/ui/PerformanceMonitor";
import ServiceWorkerRegistration from "@/components/ui/ServiceWorkerRegistration";

// Lazy load page components
const Home = React.lazy(() => import('./app/page.jsx'));
const Admin = React.lazy(() => import('./app/admin/page.jsx'));

export default function App() {
  const isDev = process.env.NODE_ENV === 'development';

  return (
    <BrowserRouter>
      <SmoothScroll />
      <ServiceWorkerRegistration />
      {isDev && <PerformanceMonitor />}
      
      <React.Suspense fallback={<div className="min-h-screen w-full bg-gray-900 animate-pulse" />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
          {/* Catch-all redirects to home */}
          <Route path="*" element={<Home />} />
        </Routes>
      </React.Suspense>
    </BrowserRouter>
  );
}
