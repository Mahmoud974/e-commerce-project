/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: [
      "images.unsplash.com",
      "lh3.googleusercontent.com",
      "pejotrvfcsqfdakpnqil.supabase.co",
      "platform-lookaside.fbsbx.com",
      "*",
    ],
  },
};

module.exports = nextConfig;
