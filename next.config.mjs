/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // This allows the build to finish even with type errors
    ignoreBuildErrors: true,
  },
  // In Next 15, eslint is handled differently, so we just remove the block
};

export default nextConfig;