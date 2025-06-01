import withNextIntl from "next-intl/plugin";

export default withNextIntl("./i18n.ts")({
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'backend.awareness-profiling.com'
      }
    ]
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // async rewrites() {
  //   return [
  //     {
  //       source: '/api/:path*',
  //       destination: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/:path*`,
  //     },
  //   ];
  // },
});
