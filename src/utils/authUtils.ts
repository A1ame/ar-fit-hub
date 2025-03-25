
import { getCurrentUser, logoutUser } from "./userUtils";

/**
 * Check if a user is logged in based on localStorage
 */
export const isLoggedIn = (): boolean => {
  const user = getCurrentUser();
  return user ? user.loggedIn : false;
};

/**
 * Protected route redirector
 * @param navigate - React Router's navigate function
 */
export const requireAuth = (navigate: (path: string) => void): void => {
  if (!isLoggedIn()) {
    navigate("/");
  }
};

/**
 * Log the user out
 * @param navigate - React Router's navigate function
 */
export const logout = (navigate: (path: string) => void): void => {
  logoutUser();
  navigate("/");
};
