/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  eslint: {
      ignoreDuringBuilds: true,
  }
};

export default nextConfig;
