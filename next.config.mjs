import withNextIntl from "next-intl/plugin";

export default withNextIntl("./i18n.ts")({
  // Optimize image loading
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "mv-ksa.cloudhosta.com",
      },
    ],
    // Enable image optimization
    unoptimized: false,
    // Set reasonable image cache duration
    minimumCacheTTL: 60,
    // Limit maximum image dimensions
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
  },

  // Performance optimizations
  experimental: {
    // Enable optimizations for third party scripts
    optimizePackageImports: ["next-intl"],
  },

  // Build optimizations
  compress: true, // Enable compression
  poweredByHeader: false, // Remove X-Powered-By header

  eslint: {
    ignoreDuringBuilds: true,
  },

  // Cache optimization
  onDemandEntries: {
    // How long should unused pages be kept in memory
    maxInactiveAge: 60 * 1000,
    // Number of pages that should be kept simultaneously without being disposed
    pagesBufferLength: 5,
  },
});
