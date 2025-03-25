
export interface UserData {
  id: string;
  name: string;
  email: string;
  password: string;
  gender: "male" | "female";
  age: number;
  weight: number;
  height: number;
  loggedIn: boolean;
  createdAt: string;
  stats: {
    calories: number[];
    steps: number[];
    workoutsCompleted: number;
    streakDays: number;
  };
}

export const defaultStats = {
  calories: [0, 0, 0, 0, 0, 0, 0],
  steps: [0, 0, 0, 0, 0, 0, 0],
  workoutsCompleted: 0,
  streakDays: 0
};

export const getUsers = (): UserData[] => {
  try {
    const usersJson = localStorage.getItem('ar-fit-users');
    if (usersJson) {
      return JSON.parse(usersJson);
    }
  } catch (error) {
    console.error('Failed to parse users data:', error);
  }
  return [];
};

export const saveUsers = (users: UserData[]): void => {
  localStorage.setItem('ar-fit-users', JSON.stringify(users));
};

export const getCurrentUser = (): UserData | null => {
  try {
    const userJson = localStorage.getItem('ar-fit-user');
    if (userJson) {
      return JSON.parse(userJson);
    }
  } catch (error) {
    console.error('Failed to parse current user data:', error);
  }
  return null;
};

export const saveCurrentUser = (user: UserData): void => {
  localStorage.setItem('ar-fit-user', JSON.stringify(user));
  
  // Also update this user in the users array
  const users = getUsers();
  const updatedUsers = users.map(u => u.id === user.id ? user : u);
  saveUsers(updatedUsers);
};

export const addUser = (user: UserData): void => {
  const users = getUsers();
  users.push(user);
  saveUsers(users);
};

export const authenticateUser = (email: string, password: string): UserData | null => {
  const users = getUsers();
  const user = users.find(u => u.email === email && u.password === password);
  
  if (user) {
    // Mark as logged in
    const loggedInUser = { ...user, loggedIn: true };
    saveCurrentUser(loggedInUser);
    return loggedInUser;
  }
  
  return null;
};

export const logoutUser = (): void => {
  const currentUser = getCurrentUser();
  if (currentUser) {
    const loggedOutUser = { ...currentUser, loggedIn: false };
    
    // Update in users array
    const users = getUsers();
    const updatedUsers = users.map(u => u.id === currentUser.id ? loggedOutUser : u);
    saveUsers(updatedUsers);
    
    // Clear current user
    localStorage.removeItem('ar-fit-user');
  }
};
