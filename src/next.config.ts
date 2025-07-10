import type {NextConfig} from 'next';
import withPWA from 'next-pwa';

const isDev = process.env.NODE_ENV === 'development';

const pwaConfig = withPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: isDev,
});

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

// Only apply PWA wrapper when not using Turbopack
const finalConfig = process.env.TURBOPACK ? nextConfig : pwaConfig(nextConfig);

export default finalConfig;
