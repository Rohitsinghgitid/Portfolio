/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  // Allow serving large static sequence images
  staticPageGenerationTimeout: 120,
};

export default nextConfig;
