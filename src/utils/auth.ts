"use client";

/**
 * Check if user is authenticated
 * @returns boolean - true if user is logged in
 */
export const isAuthenticated = (): boolean => {
  if (typeof window === "undefined") return false;
  
  const token = localStorage.getItem("authToken");
  const user = localStorage.getItem("loginUser");
  
  return !!(token && user);
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
  if (typeof window === "undefined") return null;
  
  const user = localStorage.getItem("loginUser");
  const token = localStorage.getItem("authToken");
  
  return user && token ? { username: user, token } : null;
};
