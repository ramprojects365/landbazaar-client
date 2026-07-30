"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { isAuthenticated } from "@/utils/auth";

interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
}

export default function ProtectedRoute({ children, redirectTo }: ProtectedRouteProps) {
  const router = useRouter();

  useEffect(() => {
    // Check if user is authenticated
    if (!isAuthenticated()) {
      // Build login URL with redirect
      const currentPath = typeof window !== "undefined" ? window.location.pathname + window.location.search : "";
      const loginUrl = redirectTo 
        ? `/sign-in?redirect=${encodeURIComponent(redirectTo)}`
        : `/sign-in?redirect=${encodeURIComponent(currentPath)}`;
      
      router.push(loginUrl);
      return;
    }
  }, [router, redirectTo]);

  // Only render children if authenticated
  if (!isAuthenticated()) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "50vh" }}>
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">Redirecting to login...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
