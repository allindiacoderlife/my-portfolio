/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/my-portfolio',
  output: 'export',
  distDir: 'dist',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
