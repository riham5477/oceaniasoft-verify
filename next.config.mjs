/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  // This forces Vercel to include the data folder in the build
  outputFileTracingIncludes: {
    '/verify/[id]': ['./data/**/*'],
  },
};

export default nextConfig;