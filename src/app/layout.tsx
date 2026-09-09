import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Sans_Telugu, Plus_Jakarta_Sans } from "next/font/google";
import Script from "next/script";

import "swiper/css/bundle";
import "./globals.scss";
import RootProviders from "./RootProviders";

const siteUrl = "https://www.dekholand.com";
const siteTitle = "DekhoLand | Buy & Sell Verified Lands and Plots";
const siteDescription =
  "Find plots for sale in Andhra Pradesh and Telangana — including Hyderabad, Visakhapatnam, Vizag, Vijayawada, and Amaravati. Browse HMDA, DTCP, and RERA approved plots, farm land, and agricultural land on DekhoLand.";
const siteImage = "https://www.dekholand.com/assets/img/logo/logo-blue.png";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const notoSansTelugu = Noto_Sans_Telugu({
  variable: "--font-noto-sans-telugu",
  subsets: ["telugu"],
  weight: ["400", "500", "600", "700"],
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
    "plots for sale in Andhra Pradesh",
    "plots for sale in Telangana",
    "land for sale in Andhra Pradesh",
    "land for sale in Telangana",
    "plots for sale in Hyderabad",
    "land for sale in Hyderabad",
    "open plots for sale in Hyderabad",
    "residential plots for sale in Hyderabad",
    "plots for sale in Visakhapatnam",
    "plots for sale in Vizag",
    "land for sale in Visakhapatnam",
    "plots for sale in Vijayawada",
    "land for sale in Vijayawada",
    "plots for sale in Amaravati",
    "land for sale in Amaravati",
    "plots for sale in Guntur",
    "plots for sale in Kakinada",
    "plots for sale in Tirupati",
    "plots for sale in Warangal",
    "plots for sale near Hyderabad",
    "farm land for sale near Hyderabad",
    "agricultural land for sale in Telangana",
    "agricultural land for sale in Andhra Pradesh",
    "HMDA plots for sale",
    "DTCP plots for sale",
    "RERA approved plots for sale",
    "VMRDA plots for sale",
    "APCRDA plots for sale",
    "gated community plots for sale",
    "best places to buy land in Hyderabad",
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
        alt: "DekhoLand — plots for sale in Hyderabad, Telangana, and Andhra Pradesh",
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
        className={`${plusJakartaSans.variable} ${notoSansTelugu.variable} ${geistSans.variable} ${geistMono.variable}`}
      >
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-MLP838YHVK"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-MLP838YHVK');
          `}
        </Script>
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
