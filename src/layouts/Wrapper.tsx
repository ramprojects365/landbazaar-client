"use client";

import Preloader from "@/components/Common/preloader/Preloader";
import AnimateMouse from "@/components/Common/AnimateMouse";
import React, { useEffect, useState } from "react";

interface WrapperProps {
  children: React.ReactNode;
}

const Wrapper: React.FC<WrapperProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Load Bootstrap JS only on the client-side
  useEffect(() => {
    if (typeof window !== "undefined") {
      import("bootstrap/dist/js/bootstrap.bundle.min")
        .then(() => console.log("Bootstrap loaded"))
        .catch((err) => console.error("Bootstrap failed to load", err));
    }
  }, []);

  // Set the loading state to false after a timeout
  useEffect(() => {
    const loadingTimeout = setTimeout(() => setIsLoading(false), 200);
    return () => clearTimeout(loadingTimeout);
  }, []);

  // Initialize WOW.js animations on the client side
  useEffect(() => {
    if (typeof window !== "undefined") {
      import("wow.js").then((WOWModule) => {
        const WOWClass = WOWModule.default; // Access the default export
        const wow = new WOWClass({
          boxClass: "wow",
          animateClass: "animated",
          offset: 0,
          mobile: true,
          live: true,
        });
        wow.init();
      });
    }
  }, []);

  return (
    <>
      {isLoading ? <Preloader /> : children}
      {/* Add this below children */}
      <AnimateMouse />
    </>
  );
};

export default Wrapper;
