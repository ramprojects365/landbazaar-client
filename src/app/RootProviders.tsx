"use client";

import React, { useEffect } from "react";
import AppProvider from "@/provider/AppProvider";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { Toaster } from "sonner";

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
      <AppProvider>
        {sanitizedChildren}
      </AppProvider>
      <Toaster position="top-center" richColors />
    </LanguageProvider>
  );
}