import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Removed agent browsing pages
      {
        source: "/agent-details",
        destination: "/",
        permanent: true,
      },
      {
        source: "/agent-details/:path*",
        destination: "/",
        permanent: true,
      },
      {
        source: "/property-agent/:path*",
        destination: "/",
        permanent: true,
      },
      {
        source: "/agency",
        destination: "/",
        permanent: true,
      },
      {
        source: "/agency/:path*",
        destination: "/",
        permanent: true,
      },
      {
        source: "/pricing",
        destination: "/",
        permanent: true,
      },
      {
        source: "/pricing/:path*",
        destination: "/",
        permanent: true,
      },
      {
        source: "/faq",
        destination: "/",
        permanent: true,
      },
      {
        source: "/faq/:path*",
        destination: "/",
        permanent: true,
      },
      // Title-aligned slug fixes (old → new)
      {
        source:
          "/blog/10-essential-legal-documents-to-check-before-buying-a-plot-in-Hyderabad",
        destination:
          "/blog/10-essential-legal-documents-to-check-before-buying-a-plot-in-hyderabad",
        permanent: true,
      },
      {
        source: "/blog/verify-land-records-telangana-dharani-registration-portal",
        destination:
          "/blog/how-to-verify-land-records-on-the-telangana-dharani-registration-portal",
        permanent: true,
      },
      {
        source:
          "/blog/impact-of-regional-ring-road-rrr-on-hyderabad-farmland-prices",
        destination:
          "/blog/impact-of-the-regional-ring-road-rrr-on-hyderabad-farmland-prices",
        permanent: true,
      },
      {
        source: "/blog/top-10-areas-to-buy-property-in-kuala-lumpur",
        destination: "/blog/can-non-farmers-buy-agricultural-land-in-telangana",
        permanent: true,
      },
      // Legacy Malaysia slugs → title-matched India articles
      {
        source: "/blog/best-places-to-buy-property-in-Selangor",
        destination:
          "/blog/top-5-high-growth-land-investment-corridors-around-hyderabad",
        permanent: true,
      },
      {
        source: "/blog/best-places-to-buy-property-in-selangor-2026",
        destination:
          "/blog/impact-of-the-regional-ring-road-rrr-on-hyderabad-farmland-prices",
        permanent: true,
      },
      {
        source: "/blog/complete-guide-to-buying-your-first-home-in-malaysia",
        destination:
          "/blog/why-west-hyderabad-shankarpally-to-sadashivpet-is-the-next-realty-hotspot",
        permanent: true,
      },
      {
        source: "/blog/how-much-salary-do-you-need-to-buy-a-house-in-malaysia",
        destination:
          "/blog/complete-guide-to-buying-managed-farmland-and-weekend-farmhouses",
        permanent: true,
      },
      {
        source: "/blog/hidden-costs-when-buying-a-property-in-malaysia",
        destination:
          "/blog/top-5-high-growth-land-investment-corridors-around-visakhapatnam",
        permanent: true,
      },
    ];
  },
  images: {
    domains: [
      "propertyla-upload-bucket-2026.s3.ap-southeast-2.amazonaws.com",
      "propertyla-server-production.up.railway.app",
    ],
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
