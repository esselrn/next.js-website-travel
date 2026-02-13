import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'sjsmjrxaqvevxapaoihu.supabase.co'
      }
    ]
  }
}

export default nextConfig
