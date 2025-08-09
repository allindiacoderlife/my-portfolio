"use client";
import { useEffect } from 'react';

const PerformanceMonitor = () => {
  useEffect(() => {
    // Monitor Web Vitals
    if (typeof window !== 'undefined') {
      // Core Web Vitals monitoring
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'measure') {
            console.log(`Performance Measure: ${entry.name} - ${entry.duration}ms`);
          }
          
          if (entry.entryType === 'navigation') {
            const navEntry = entry;
            console.log('Page Load Performance:', {
              dns: navEntry.domainLookupEnd - navEntry.domainLookupStart,
              tcp: navEntry.connectEnd - navEntry.connectStart,
              request: navEntry.responseStart - navEntry.requestStart,
              response: navEntry.responseEnd - navEntry.responseStart,
              domContentLoaded: navEntry.domContentLoadedEventEnd - navEntry.navigationStart,
              domComplete: navEntry.domComplete - navEntry.navigationStart,
              loadComplete: navEntry.loadEventEnd - navEntry.navigationStart,
            });
          }
        }
      });

      // Observe different entry types
      observer.observe({ entryTypes: ['measure', 'navigation'] });

      // Clean up observer
      return () => observer.disconnect();
    }
  }, []);

  return null;
};

export default PerformanceMonitor;
