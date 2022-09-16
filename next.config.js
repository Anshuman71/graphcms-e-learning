/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["uploads.eu1.boldvideo.io", "image.mux.com"],
  },
};

module.exports = nextConfig;