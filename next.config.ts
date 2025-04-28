import type {NextConfig} from 'next';
import createNextIntlPlugin from 'next-intl/plugin'; // Import the plugin

const withNextIntl = createNextIntlPlugin(); // Initialize the plugin

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
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

// Wrap the config with the plugin
export default withNextIntl(nextConfig);
