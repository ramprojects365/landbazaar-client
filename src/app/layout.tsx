import type { Metadata } from "next";
import { Geist, Geist_Mono, Plus_Jakarta_Sans } from "next/font/google";

import "slick-carousel/slick/slick.css";
import "swiper/css/bundle";
import "./globals.scss";
import RootProviders from "./RootProviders";

const siteUrl = "https://propertyla.com.my/";
const siteTitle =
  "PropertyLa Malaysia Real Estate | Buy, Rent & Discover Property";
const siteDescription =
  "PropertyLa is a Malaysia real estate platform for condos, houses, apartments, rental homes, subsale homes and verified property agents.";
const siteLogo =
  "https://propertyla.com.my/assets/img/logo/logo-icon-blue.png";

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
  metadataBase: new URL("https://propertyla.com.my"),

  title: {
    default: siteTitle,
    template: "%s | PropertyLa",
  },

  description: siteDescription,

  applicationName: "PropertyLa",

  keywords: [
    "PropertyLa",
    "Malaysia real estate",
    "Malaysia property",
    "condos Malaysia",
    "houses Malaysia",
    "apartments Malaysia",
    "property for rent Malaysia",
    "property for sale Malaysia",
  ],

  authors: [{ name: "PropertyLa" }],
  creator: "PropertyLa",
  publisher: "PropertyLa",

  alternates: {
    canonical: siteUrl,
  },

  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: siteUrl,
    siteName: "PropertyLa",
    images: [
      {
        url: siteLogo,
        width: 512,
        height: 512,
        alt: "PropertyLa Logo",
      },
    ],
    locale: "en_MY",
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
    name: "PropertyLa",
    alternateName: ["PropertyLa Malaysia", "PropertyLa Malaysia Real Estate"],
    url: siteUrl,
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "PropertyLa",
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
