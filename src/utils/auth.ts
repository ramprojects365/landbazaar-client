"use client";

export const AUTH_CHANGED_EVENT = "dekholand-auth-changed";

export type AuthSession = {
  token: string | null;
  user: string | null;
  displayName: string | null;
  userType: string | null;
};

export function readAuthSession(): AuthSession {
  if (typeof window === "undefined") {
    return { token: null, user: null, displayName: null, userType: null };
  }

  const token = localStorage.getItem("authToken");
  if (!token) {
    return { token: null, user: null, displayName: null, userType: null };
  }

  const user =
    localStorage.getItem("loginUser") ||
    localStorage.getItem("username") ||
    localStorage.getItem("email") ||
    "User";
  const displayName =
    localStorage.getItem("loginUserDisplayName") || user;
  const userType = localStorage.getItem("loginUserType");

  return {
    token,
    user,
    displayName,
    userType,
  };
}

export function persistAuthSession(payload: {
  token?: string | null;
  username?: string | null;
  email?: string | null;
  fullName?: string | null;
  userType?: string | null;
}) {
  if (typeof window === "undefined") return;

  const loginUser = payload.username || payload.email || "";
  const displayName =
    payload.fullName || payload.username || payload.email || "";

  if (payload.token) {
    localStorage.setItem("authToken", payload.token);
  }
  if (loginUser) {
    localStorage.setItem("loginUser", loginUser);
  }
  if (displayName) {
    localStorage.setItem("loginUserDisplayName", displayName);
  }
  if (payload.userType) {
    localStorage.setItem("loginUserType", payload.userType);
  }

  window.dispatchEvent(new Event(AUTH_CHANGED_EVENT));
}

export function clearAuthSession() {
  if (typeof window === "undefined") return;
  localStorage.removeItem("authToken");
  localStorage.removeItem("loginUser");
  localStorage.removeItem("loginUserDisplayName");
  localStorage.removeItem("loginUserType");
  window.dispatchEvent(new Event(AUTH_CHANGED_EVENT));
}

/**
 * Check if user is authenticated
 * @returns boolean - true if user is logged in
 */
export const isAuthenticated = (): boolean => {
  if (typeof window === "undefined") return false;

  return !!readAuthSession().token;
};

/**
 * Handle authentication check and redirect
 * @param redirectTo - URL to redirect to after login (optional)
 * @returns boolean - true if authenticated, false if redirected
 */
export const requireAuth = (redirectTo?: string): boolean => {
  if (typeof window === "undefined") return false;
  
  if (!isAuthenticated()) {
    const loginUrl = redirectTo 
      ? `/sign-in?redirect=${encodeURIComponent(redirectTo)}`
      : "/sign-in";
    
    window.location.href = loginUrl;
    return false;
  }
  
  return true;
};

/**
 * Get current user information
 * @returns object with user info or null
 */
export const getCurrentUser = () => {
  const session = readAuthSession();
  return session.token
    ? { username: session.user, token: session.token }
    : null;
};
