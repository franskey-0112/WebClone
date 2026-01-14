/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: false, // 尝试禁用 SWC 压缩以排除编译问题
}

module.exports = nextConfig
