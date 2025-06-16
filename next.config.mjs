import withNextIntl from "next-intl/plugin";

export default withNextIntl("./i18n.ts")({
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'mv-ksa.cloudhosta.com'
      }
    ]
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
});
