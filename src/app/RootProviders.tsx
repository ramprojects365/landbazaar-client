"use client";

import React, { useEffect } from "react";
import GlobalVideoModal from "@/components/Popup/GlobalVideoModal";
import { VideoProvider } from "@/provider/VideoProvider";
import AppProvider from "@/provider/AppProvider";
import ReduxProvider from "@/redux/provider";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { Toaster } from "sonner";
import GoogleMapsProvider from "@/components/HeroBanner/subComponents/GoogleMapsProvider";

export default function RootProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        document.body.classList.add("scrolled");
      } else {
        document.body.classList.remove("scrolled");
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const sanitizedChildren =
    typeof children === "object" &&
    children !== null &&
    !React.isValidElement(children)
      ? JSON.stringify(children)
      : children;

  return (
    <LanguageProvider>
      <ReduxProvider>
        <VideoProvider>
          <AppProvider>
            <GoogleMapsProvider>{sanitizedChildren}</GoogleMapsProvider>
          </AppProvider>

          <Toaster position="top-center" richColors />
          <GlobalVideoModal />
        </VideoProvider>
      </ReduxProvider>
    </LanguageProvider>
  );
}