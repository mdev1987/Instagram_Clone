/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'i.pravatar.cc',
      'picsum.photos',
      'lh3.googleusercontent.com',
      'firebasestorage.googleapis.com'],
    // remotePatterns: [
    //   {
    //     hostname: '**',
    //   }
    // ]
  },

}

module.exports = nextConfig
