
import type {NextConfig} from 'next';
import withPWAInit from 'next-pwa';

const isDev = process.env.NODE_ENV === 'development';

const withPWA = withPWAInit({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: isDev,
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/api\.mapbox\.com\/.*/i,
      handler: 'CacheFirst',
      options: {
        cacheName: 'mapbox-api-cache',
        expiration: {
          maxEntries: 100,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
        },
        cacheableResponse: {
          statuses: [0, 200],
        },
      },
    },
    {
      urlPattern: /.*\.(?:png|jpg|jpeg|svg|gif)/i,
      handler: 'CacheFirst',
      options: {
        cacheName: 'image-cache',
        expiration: {
          maxEntries: 60,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
        },
      },
    },
     {
      urlPattern: ({url}) => {
        const isSameOrigin = self.origin === url.origin
        if (!isSameOrigin) return false
        const pathname = url.pathname
        // Exclude specific admin and api paths
        if (pathname.startsWith('/admin')) return false
        if (pathname.startsWith('/api')) return false
        return true
      },
      handler: 'NetworkFirst',
      options: {
        cacheName: 'pages-cache',
        expiration: {
          maxEntries: 50,
          maxAgeSeconds: 24 * 60 * 60, // 24 hours
        },
         networkTimeoutSeconds: 4,
      },
    },
  ],
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
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      }
    ],
  },
};

// Only apply PWA wrapper when not using Turbopack
const finalConfig = process.env.TURBOPACK ? nextConfig : withPWA(nextConfig);

export default finalConfig;
