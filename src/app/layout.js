import "@/styles/global.css";
import { poppins } from "@/lib/fonts";
import SmoothScroll from "@/components/SmoothScroll";
import PerformanceMonitor from "@/components/ui/PerformanceMonitor";
import ServiceWorkerRegistration from "@/components/ui/ServiceWorkerRegistration";

export const metadata = {
  title: "Chirag Saxena - Full Stack Developer Portfolio",
  description: "Professional portfolio of Chirag Saxena - Full Stack Developer specializing in React, Next.js, Node.js, and modern web technologies. View projects, skills, and experience.",
  keywords: "Chirag Saxena, Full Stack Developer, React, Next.js, Node.js, JavaScript, Portfolio, Web Developer",
  authors: [{ name: "Chirag Saxena" }],
  creator: "Chirag Saxena",
  publisher: "Chirag Saxena",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://your-domain.com",
    title: "Chirag Saxena - Full Stack Developer Portfolio",
    description: "Professional portfolio showcasing full stack development projects and skills",
    siteName: "Chirag Saxena Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Chirag Saxena - Full Stack Developer Portfolio",
    description: "Professional portfolio showcasing full stack development projects and skills",
    creator: "@chiragsa5",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="lenis">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preload" href="/assets/me.jpg" as="image" />
        <link rel="preload" href="/assets/profile.jpg" as="image" />
        <meta name="theme-color" content="#030412" />
        <meta name="color-scheme" content="dark" />
      </head>
      <body className={`${poppins.className} antialiased`}>
        <SmoothScroll />
        <ServiceWorkerRegistration />
        {process.env.NODE_ENV === 'development' && <PerformanceMonitor />}
        {children}
      </body>
    </html>
  );
}
