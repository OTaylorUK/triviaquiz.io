/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
images: {
  domains: ['images.prismic.io', 'triviaquiz.cdn.prismic.io']
},
}

module.exports = nextConfig

// const withBundleAnalyzer = require('@next/bundle-analyzer')({
//   enabled: process.env.ANALYZE === 'true',
//   // reactStrictMode: true,
// })
// module.exports = withBundleAnalyzer({})


