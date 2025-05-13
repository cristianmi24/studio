
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
      {
        protocol: 'https',
        hostname: 'www.yarquitectura.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'pbs.twimg.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'media.licdn.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'repositorio.unicordoba.edu.co',
        port: '',
        pathname: '/**',
      }
    ],
  },
  experimental: {
    allowedDevOrigins: [
      'https://9000-idx-studio-1745855071708.cluster-joak5ukfbnbyqspg4tewa33d24.cloudworkstations.dev',
    ],
  },
};

// Wrap the config with the plugin
export default withNextIntl(nextConfig);

