"use client";

import { useEffect } from "react";

/** Loads shared client scripts without the global preloader delay. */
export default function PropertyDetailsShell({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min").catch((err) =>
      console.error("Bootstrap failed to load", err),
    );
  }, []);

  return <>{children}</>;
}
