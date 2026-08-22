import { useState, useEffect } from "react";
import {
  AUTH_CHANGED_EVENT,
  clearAuthSession,
  readAuthSession,
} from "@/utils/auth";

export function useAuth() {
  const [user, setUser] = useState<string | null>(null);
  const [userDisplayName, setUserDisplayName] = useState<string | null>(null);
  const [userType, setUserType] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const syncAuth = () => {
      const session = readAuthSession();
      setUser(session.user);
      setUserDisplayName(session.displayName);
      setUserType(session.userType);
      setToken(session.token);
    };

    syncAuth();

    window.addEventListener("storage", syncAuth);
    window.addEventListener(AUTH_CHANGED_EVENT, syncAuth);

    return () => {
      window.removeEventListener("storage", syncAuth);
      window.removeEventListener(AUTH_CHANGED_EVENT, syncAuth);
    };
  }, []);

  const logout = () => {
    clearAuthSession();
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
