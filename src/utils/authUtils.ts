
/**
 * Check if a user is logged in based on localStorage
 */
export const isLoggedIn = (): boolean => {
  const userData = localStorage.getItem("ar-fit-user");
  if (!userData) return false;
  
  try {
    const user = JSON.parse(userData);
    return !!user.loggedIn;
  } catch (error) {
    return false;
  }
};

/**
 * Get the current user data
 */
export const getCurrentUser = (): any => {
  const userData = localStorage.getItem("ar-fit-user");
  if (!userData) return null;
  
  try {
    return JSON.parse(userData);
  } catch (error) {
    return null;
  }
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
