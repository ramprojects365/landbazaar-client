import { useState, useEffect } from "react";

export function useAuth() {
  const [user, setUser] = useState<string | null>(null);
  const [userDisplayName, setUserDisplayName] = useState<string | null>(null);
  const [userType, setUserType] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // Check if we're in browser environment
    if (typeof window === "undefined") return;

    const syncAuth = () => {
      setUser(localStorage.getItem("loginUser"));
      setUserDisplayName(localStorage.getItem("loginUserDisplayName"));
      setUserType(localStorage.getItem("loginUserType"));
      setToken(localStorage.getItem("authToken"));
    };

    // Initial sync
    syncAuth();

    // Listen for storage changes
    window.addEventListener("storage", syncAuth);
    window.addEventListener("propertyla-auth-changed", syncAuth);

    return () => {
      window.removeEventListener("storage", syncAuth);
      window.removeEventListener("propertyla-auth-changed", syncAuth);
    };
  }, []);

  const logout = () => {
    if (typeof window === "undefined") return;
    localStorage.removeItem("authToken");
    localStorage.removeItem("loginUser");
    localStorage.removeItem("loginUserDisplayName");
    localStorage.removeItem("loginUserType");
    setUser(null);
    setUserDisplayName(null);
    setUserType(null);
    setToken(null);
  };

  return {
    user,
    userDisplayName,
    userType,
    token,
    isAuthenticated: !!token,
    logout,
  };
}
