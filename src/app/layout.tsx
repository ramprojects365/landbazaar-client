import type { Metadata } from "next";
import { Geist, Geist_Mono, Plus_Jakarta_Sans } from "next/font/google";

import "slick-carousel/slick/slick.css";
import "swiper/css/bundle";
import "./globals.scss";
import RootProviders from "./RootProviders";

const siteUrl = "https://landway.com/";
const siteTitle =
  "LandWay India | Buy & Sell Lands and Plots";
const siteDescription =
  "LandWay is India's premier platform for buying and selling lands, plots, agricultural land, and farmland. Connect with verified sellers and find your perfect plot.";
const siteLogo =
  "https://landway.com/assets/img/logo/logo-icon-blue.png";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://landway.com"),

  title: {
    default: siteTitle,
    template: "%s | LandWay",
  },

  description: siteDescription,

  applicationName: "LandWay",

  keywords: [
    "LandWay",
    "India land",
    "India plots",
    "agricultural land India",
    "farmland India",
    "land for sale India",
    "plots for sale India",
    "buy land India",
    "sell land India",
    "Telangana land",
    "Hyderabad plots",
  ],

  authors: [{ name: "LandWay" }],
  creator: "LandWay",
  publisher: "LandWay",

  alternates: {
    canonical: siteUrl,
  },

  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: siteUrl,
    siteName: "LandWay",
    images: [
      {
        url: siteLogo,
        width: 512,
        height: 512,
        alt: "LandWay Logo",
      },
    ],
    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: [siteLogo],
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "LandWay",
    alternateName: ["LandWay India", "LandWay Land & Plots"],
    url: siteUrl,
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "LandWay",
    url: siteUrl,
    logo: siteLogo,
  };

  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className={`${plusJakartaSans.variable} ${geistSans.variable} ${geistMono.variable}`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />

        <RootProviders>{children}</RootProviders>
      </body>
    </html>
  );
}
