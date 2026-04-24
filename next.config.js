/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/bfhl',
        destination: '/api/bfhl',
      },
    ];
  },
};
module.exports = nextConfig;
