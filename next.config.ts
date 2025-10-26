/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',  // allows all external HTTPS images
      },
    ],
  },
};

module.exports = nextConfig;
