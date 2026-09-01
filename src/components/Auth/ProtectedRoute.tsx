"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isAuthenticated } from "@/utils/auth";

interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
}

function AuthLoadingState({ message }: { message: string }) {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "50vh" }}
    >
      <div className="text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">{message}</p>
      </div>
    </div>
  );
}

export default function ProtectedRoute({
  children,
  redirectTo,
}: ProtectedRouteProps) {
  const router = useRouter();
  const [status, setStatus] = useState<"loading" | "authenticated">("loading");

  useEffect(() => {
    if (isAuthenticated()) {
      setStatus("authenticated");
      return;
    }

    const currentPath =
      window.location.pathname + window.location.search;
    const loginUrl = redirectTo
      ? `/sign-in?redirect=${encodeURIComponent(redirectTo)}`
      : `/sign-in?redirect=${encodeURIComponent(currentPath)}`;

    router.replace(loginUrl);
  }, [router, redirectTo]);

  if (status === "loading") {
    return <AuthLoadingState message="Loading..." />;
  }

  return <>{children}</>;
}
