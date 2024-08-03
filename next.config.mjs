/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "rqcoa3ubmzn9qpsj.public.blob.vercel-storage.com",
      },
      {
        hostname: "1jedr0gmdjpyvxth.public.blob.vercel-storage.com",
      },
    ],
  },
};

export default nextConfig;