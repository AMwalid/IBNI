/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    // Add device sizes for responsive images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    // Add remote patterns if you're loading images from external domains
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'example.com',
      },
      {
        protocol: 'https',
        hostname: 'placeholder.com',
      },
      // Add other domains as needed
    ],
  },
  // Add experimental optimizations
  experimental: {
    optimizePackageImports: ['framer-motion', 'lucide-react'],
  },
  // If you're using the Pages Router (Option 2), you might need:
  // trailingSlash: true,
  allowedDevOrigins: ['192.168.1.5']
}

export default nextConfig



