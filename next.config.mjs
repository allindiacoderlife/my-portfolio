/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/my-portfolio',
  output: 'export',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
