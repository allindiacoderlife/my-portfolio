import React, { Suspense } from "react";

// Custom dynamic loader to mimic next/dynamic in standard React
const dynamic = (importFunc, options = {}) => {
  const LazyComponent = React.lazy(importFunc);
  const LoadingComponent = options.loading || (() => null);

  return function DynamicComponent(props) {
    return (
      <Suspense fallback={<LoadingComponent />}>
        <LazyComponent {...props} />
      </Suspense>
    );
  };
};

// Game component - heavy 3D component, load when needed
export const DynamicGame = dynamic(() => import("../components/Game"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[300px] flex items-center justify-center bg-black/20 rounded-lg">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
    </div>
  ),
});

// Spline component - heavy 3D component, load when needed
export const DynamicSplineScene = dynamic(() => import("../components/SplineScene"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[100vh] flex items-center justify-center bg-black/20">
      <div className="flex flex-col items-center space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
        <p className="text-gray-400 animate-pulse">Loading 3D Scene...</p>
      </div>
    </div>
  ),
});

// Astronaut component - heavy 3D component, load when needed
export const DynamicAstronaut = dynamic(() => import("../components/Astronaut"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="animate-bounce text-gray-400">Loading astronaut...</div>
    </div>
  ),
});

// Interactive background - can be loaded progressively
export const DynamicInteractiveGradientBg = dynamic(
  () =>
    import("../components/ui/InteractiveGradientBg").then(
      (mod) => mod.InteractiveGradientBg
    ),
  {
    ssr: false,
    loading: () => null,
  }
);

// Project Modal - load when needed
export const DynamicProjectModal = dynamic(() => import("../components/ui/ProjectModal"), {
  ssr: false,
  loading: () => (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
    </div>
  ),
});

// Certificate component - can be lazy loaded
export const DynamicCertificate = dynamic(() => import("../components/Certificate"), {
  loading: () => (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-pulse bg-gray-800 h-96 w-full max-w-6xl rounded-lg"></div>
    </div>
  ),
});

// Admin components - only load when needed
export const DynamicAddProject = dynamic(() => import("../components/admin/AddProject"), {
  loading: () => (
    <div className="w-full max-w-2xl mx-auto p-8 bg-black/20 rounded-lg animate-pulse">
      <div className="h-8 bg-gray-700 rounded mb-4"></div>
      <div className="space-y-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-12 bg-gray-700 rounded"></div>
        ))}
      </div>
    </div>
  ),
});

export const DynamicAddCertificate = dynamic(() => import("../components/admin/AddCertificate"), {
  loading: () => (
    <div className="w-full max-w-2xl mx-auto p-8 bg-black/20 rounded-lg animate-pulse">
      <div className="h-8 bg-gray-700 rounded mb-4"></div>
      <div className="space-y-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-12 bg-gray-700 rounded"></div>
        ))}
      </div>
    </div>
  ),
});

export const DynamicProjectList = dynamic(() => import("../components/admin/ProjectList"), {
  loading: () => (
    <div className="w-full p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-64 bg-gray-800 rounded-lg animate-pulse"></div>
        ))}
      </div>
    </div>
  ),
});

export const DynamicCertificateList = dynamic(() => import("../components/admin/CertificateList"), {
  loading: () => (
    <div className="w-full p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-64 bg-gray-800 rounded-lg animate-pulse"></div>
        ))}
      </div>
    </div>
  ),
});
