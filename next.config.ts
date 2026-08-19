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
      {
        source: "/property-advisor",
        destination: "/services",
        permanent: true,
      },
      {
        source: "/property-advisor/:path*",
        destination: "/services",
        permanent: true,
      },
      {
        source: "/home-loan",
        destination: "/services",
        permanent: true,
      },
      {
        source: "/home-loan/:path*",
        destination: "/services",
        permanent: true,
      },
      {
        source: "/interior-design",
        destination: "/services",
        permanent: true,
      },
      {
        source: "/interior-design/:path*",
        destination: "/services",
        permanent: true,
      },
      // Dedicated sitelink URLs
      {
        source: "/terms-and-conditions",
        destination: "/terms",
        permanent: true,
      },
      {
        source: "/services/legal-verification",
        destination: "/legal-verification",
        permanent: true,
      },
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
      // Legacy Malaysia slugs → closest India land articles
      {
        source: "/blog/Stamp-Duty-in-Malaysia-Property",
        destination:
          "/blog/how-to-get-a-plot-loan-bank-eligibility-and-interest-rates",
        permanent: true,
      },
      {
        source: "/blog/best-areas-to-buy-property-in-selangor",
        destination:
          "/blog/top-5-high-growth-land-investment-corridors-around-hyderabad",
        permanent: true,
      },
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
        source: "/blog/top-townships-in-kajang-cheras-and-puchong",
        destination:
          "/blog/why-west-hyderabad-shankarpally-to-sadashivpet-is-the-next-realty-hotspot",
        permanent: true,
      },
      {
        source: "/blog/top-condo-projects-near-klcc",
        destination:
          "/blog/complete-guide-to-buying-managed-farmland-and-weekend-farmhouses",
        permanent: true,
      },
      {
        source: "/blog/best-new-property-launches-in-malaysia",
        destination:
          "/blog/top-5-high-growth-land-investment-corridors-around-visakhapatnam",
        permanent: true,
      },
      {
        source: "/blog/freehold-vs-leasehold-property-in-malaysia",
        destination:
          "/blog/can-non-farmers-buy-agricultural-land-in-telangana",
        permanent: true,
      },
      {
        source: "/blog/how-to-sell-your-house-faster-in-malaysia",
        destination:
          "/blog/10-essential-legal-documents-to-check-before-buying-a-plot-in-Hyderabad",
        permanent: true,
      },
      {
        source: "/blog/understanding-spa-sale-and-purchase-agreement",
        destination:
          "/blog/hmda-vs-dtcp-vs-rera-whats-the-difference-and-which-is-safer",
        permanent: true,
      },
      {
        source: "/blog/property-investment-guide-for-beginners",
        destination:
          "/blog/top-5-high-growth-land-investment-corridors-around-hyderabad",
        permanent: true,
      },
      {
        source: "/blog/how-to-increase-your-property-value-before-selling",
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
      // Legacy Malaysia location pages → India land cities
      {
        source: "/properties/kuala-lumpur",
        destination: "/properties/hyderabad",
        permanent: true,
      },
      {
        source: "/properties/selangor",
        destination: "/properties/telangana",
        permanent: true,
      },
      {
        source: "/properties/penang",
        destination: "/properties/visakhapatnam",
        permanent: true,
      },
      {
        source: "/properties/johor",
        destination: "/properties/andhra-pradesh",
        permanent: true,
      },
      {
        source: "/properties/perak",
        destination: "/properties/india",
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
    minimumCacheTTL: 86400,
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
