import type { Metadata } from "next";
import { Geist, Geist_Mono, Plus_Jakarta_Sans } from "next/font/google";

import "slick-carousel/slick/slick.css";
import "swiper/css/bundle";
import "./globals.scss";
import RootProviders from "./RootProviders";

const siteUrl = "https://www.dekholand.com";
const siteTitle = "DekhoLand | Buy & Sell Verified Lands and Plots";
const siteDescription =
  "DekhoLand is India’s trusted marketplace for buying and selling verified lands and plots. Discover transparent listings, hassle-free transactions, and your path to verified land ownership.";
const siteImage = "https://www.dekholand.com/assets/img/logo/logo.png";

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
  metadataBase: new URL(siteUrl),

  title: {
    default: siteTitle,
    template: "%s | DekhoLand",
  },

  description: siteDescription,

  applicationName: "DekhoLand",

  keywords: [
    "DekhoLand",
    "India land",
    "India plots",
    "verified land India",
    "agricultural land India",
    "farmland India",
    "land for sale India",
    "plots for sale India",
    "buy land India",
    "sell land India",
    "Telangana land",
    "Hyderabad plots",
  ],

  authors: [{ name: "DekhoLand" }],
  creator: "DekhoLand",
  publisher: "DekhoLand",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: siteUrl,
    siteName: "DekhoLand",
    images: [
      {
        url: siteImage,
        width: 512,
        height: 512,
        alt: "DekhoLand — verified lands and plots marketplace",
      },
    ],
    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: [siteImage],
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
    name: "DekhoLand",
    alternateName: ["Dekho Land", "DekhoLand Lands & Plots"],
    url: siteUrl,
    description: siteDescription,
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "DekhoLand",
    url: siteUrl,
    logo: siteImage,
    description: siteDescription,
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
