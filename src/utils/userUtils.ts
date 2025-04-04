
import { v4 as uuidv4 } from 'uuid';
import { fs, path } from './fsMiddleware';

export interface MealEntry {
  id: string;
  name: string;
  calories: number;
  date: string;
}

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
  bodyProblems?: string[];
  dietRestrictions?: string[];
  meals?: MealEntry[];
  stats: {
    calories: number[];
    steps: number[];
    workoutsCompleted: number;
    streakDays: number;
  };
  subscriptions?: {
    workout: SubscriptionData | null;
    nutrition: SubscriptionData | null;
  };
}

export interface SubscriptionData {
  type: 'workout' | 'nutrition' | 'combo';
  duration: 1 | 6 | 12; // months
  startDate: string;
  endDate: string;
  price: number;
}

export const defaultStats = {
  calories: [0, 0, 0, 0, 0, 0, 0],
  steps: [0, 0, 0, 0, 0, 0, 0],
  workoutsCompleted: 0,
  streakDays: 0
};

// Path to the JSON database file
const DB_FILE_PATH = path.join('src', 'data', 'users-db.json');

// Ensure data directory exists
const ensureDataDir = () => {
  console.log('Ensuring data directory exists...');
  const dir = path.dirname(DB_FILE_PATH);
  if (!fs.existsSync(dir)) {
    console.log(`Creating directory: ${dir}`);
    fs.mkdirSync(dir, { recursive: true });
  }
};

// Initialize db file if it doesn't exist
const initDbFile = () => {
  ensureDataDir();
  console.log(`Checking if database file exists: ${DB_FILE_PATH}`);
  if (!fs.existsSync(DB_FILE_PATH)) {
    console.log('Creating empty users database file');
    fs.writeFileSync(DB_FILE_PATH, JSON.stringify([], null, 2));
    console.log('Users database file created successfully');
  } else {
    console.log('Users database file already exists');
  }
};

// Get all users from JSON file
export const getUsers = (): UserData[] => {
  try {
    console.log('Getting all users from database');
    initDbFile();
    const data = fs.readFileSync(DB_FILE_PATH, 'utf8');
    console.log(`Read ${data.length} bytes from users database`);
    const users = JSON.parse(data);
    console.log(`Found ${users.length} users in database`);
    return users;
  } catch (error) {
    console.error('Error reading user database:', error);
    return [];
  }
};

// Save users to JSON file
export const saveUsers = (users: UserData[]): void => {
  try {
    console.log(`Saving ${users.length} users to database`);
    ensureDataDir();
    const data = JSON.stringify(users, null, 2);
    fs.writeFileSync(DB_FILE_PATH, data);
    console.log('User data successfully saved to database file');
  } catch (error) {
    console.error('Error saving user database:', error);
  }
};

// Current user session variable (in-memory only)
let currentUserSession: UserData | null = null;

// Get current logged in user
export const getCurrentUser = (): UserData | null => {
  return currentUserSession;
};

// Save current user and update in database
export const saveCurrentUser = (user: UserData): void => {
  console.log(`Saving current user: ${user.name} (${user.id})`);
  currentUserSession = user;
  
  const users = getUsers();
  const userIndex = users.findIndex(u => u.id === user.id);
  
  if (userIndex !== -1) {
    console.log(`Updating existing user at index ${userIndex}`);
    users[userIndex] = user;
  } else {
    console.log('Adding new user to database');
    users.push(user);
  }
  
  saveUsers(users);
};

// Add new user to database
export const addUser = (user: UserData): void => {
  console.log('Adding new user to database');
  const users = getUsers();
  
  if (!user.id) {
    user.id = uuidv4();
    console.log(`Generated new user ID: ${user.id}`);
  }
  
  const existingUser = users.find(u => u.email === user.email);
  if (existingUser) {
    console.error(`User with email ${user.email} already exists`);
    throw new Error('Пользователь с таким email уже существует');
  }
  
  users.push(user);
  console.log(`Added user: ${user.name} (${user.id})`);
  saveUsers(users);
};

// Authenticate user
export const authenticateUser = (email: string, password: string): UserData | null => {
  console.log(`Authenticating user: ${email}`);
  const users = getUsers();
  const user = users.find(u => u.email === email && u.password === password);
  
  if (user) {
    console.log(`User authenticated successfully: ${user.name} (${user.id})`);
    const loggedInUser = { ...user, loggedIn: true };
    saveCurrentUser(loggedInUser);
    return loggedInUser;
  }
  
  console.log('Authentication failed: invalid credentials');
  return null;
};

// Logout user
export const logoutUser = (): void => {
  const currentUser = getCurrentUser();
  if (currentUser) {
    const loggedOutUser = { ...currentUser, loggedIn: false };
    
    const users = getUsers();
    const updatedUsers = users.map(u => u.id === currentUser.id ? loggedOutUser : u);
    saveUsers(updatedUsers);
    
    currentUserSession = null;
  }
};

// Update user data
export const updateUserData = (userId: string, updatedFields: Partial<UserData>): UserData | null => {
  const users = getUsers();
  const userIndex = users.findIndex(u => u.id === userId);
  
  if (userIndex === -1) return null;
  
  const updatedUser = { ...users[userIndex], ...updatedFields };
  users[userIndex] = updatedUser;
  
  saveUsers(users);
  
  const currentUser = getCurrentUser();
  if (currentUser && currentUser.id === userId) {
    currentUserSession = updatedUser;
  }
  
  return updatedUser;
};

// Check if user has active subscription
export const hasActiveSubscription = (user: UserData | null, type: 'workout' | 'nutrition'): boolean => {
  if (!user || !user.subscriptions) return false;
  
  const { workout, nutrition } = user.subscriptions;
  
  if (workout?.type === 'combo') {
    const endDate = new Date(workout.endDate);
    if (endDate > new Date()) return true;
  }
  
  const subscription = type === 'workout' ? workout : nutrition;
  if (!subscription) return false;
  
  const endDate = new Date(subscription.endDate);
  return endDate > new Date();
};

// Activate subscription for user
export const activateSubscription = (
  userId: string, 
  type: 'workout' | 'nutrition' | 'combo', 
  duration: 1 | 6 | 12,
  price: number
): UserData | null => {
  const user = getCurrentUser();
  if (!user || user.id !== userId) return null;
  
  const startDate = new Date();
  const endDate = new Date();
  endDate.setMonth(endDate.getMonth() + duration);
  
  const subscriptionData: SubscriptionData = {
    type,
    duration,
    startDate: startDate.toISOString(),
    endDate: endDate.toISOString(),
    price
  };
  
  const updatedUser = {
    ...user,
    subscriptions: {
      ...user.subscriptions || {},
      workout: type === 'workout' || type === 'combo' ? subscriptionData : user.subscriptions?.workout || null,
      nutrition: type === 'nutrition' || type === 'combo' ? subscriptionData : user.subscriptions?.nutrition || null
    }
  };
  
  saveCurrentUser(updatedUser);
  return updatedUser;
};
