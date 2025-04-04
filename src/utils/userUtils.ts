import { v4 as uuidv4 } from 'uuid';
import { saveAs } from 'file-saver';

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

const USER_DATA_FILE = 'ar-fit-users-data.json';

/**
 * Получение списка всех пользователей из localStorage и файла
 */
export const getUsers = (): UserData[] => {
  try {
    const usersJson = localStorage.getItem('ar-fit-users');
    if (usersJson) {
      return JSON.parse(usersJson);
    }
  } catch (error) {
    console.error('Ошибка при получении данных пользователей:', error);
  }
  return [];
};

/**
 * Сохранение списка пользователей в localStorage и файл
 */
export const saveUsers = (users: UserData[]): void => {
  localStorage.setItem('ar-fit-users', JSON.stringify(users));
  
  const blob = new Blob([JSON.stringify(users, null, 2)], { type: 'application/json' });
  saveAs(blob, USER_DATA_FILE);
};

/**
 * Получение текущего пользователя из localStorage
 */
export const getCurrentUser = (): UserData | null => {
  try {
    const userJson = localStorage.getItem('ar-fit-user');
    if (userJson) {
      return JSON.parse(userJson);
    }
  } catch (error) {
    console.error('Ошибка при получении данных текущего пользователя:', error);
  }
  return null;
};

/**
 * Сохранение текущего пользователя в localStorage и обновление в файле
 */
export const saveCurrentUser = (user: UserData): void => {
  localStorage.setItem('ar-fit-user', JSON.stringify(user));
  
  const users = getUsers();
  const updatedUsers = users.map(u => u.id === user.id ? user : u);
  saveUsers(updatedUsers);
};

/**
 * Добавление нового пользователя
 */
export const addUser = (user: UserData): void => {
  const users = getUsers();
  
  if (!user.id) {
    user.id = uuidv4();
  }
  
  const existingUser = users.find(u => u.email === user.email);
  if (existingUser) {
    throw new Error('Пользователь с таким email уже существует');
  }
  
  users.push(user);
  saveUsers(users);
};

/**
 * Аутентификация пользователя по email и паролю
 */
export const authenticateUser = (email: string, password: string): UserData | null => {
  const users = getUsers();
  const user = users.find(u => u.email === email && u.password === password);
  
  if (user) {
    const loggedInUser = { ...user, loggedIn: true };
    saveCurrentUser(loggedInUser);
    return loggedInUser;
  }
  
  return null;
};

/**
 * Выход пользователя из системы
 */
export const logoutUser = (): void => {
  const currentUser = getCurrentUser();
  if (currentUser) {
    const loggedOutUser = { ...currentUser, loggedIn: false };
    
    const users = getUsers();
    const updatedUsers = users.map(u => u.id === currentUser.id ? loggedOutUser : u);
    saveUsers(updatedUsers);
    
    localStorage.removeItem('ar-fit-user');
  }
};

/**
 * Обновление данных пользователя
 */
export const updateUserData = (userId: string, updatedFields: Partial<UserData>): UserData | null => {
  const users = getUsers();
  const userIndex = users.findIndex(u => u.id === userId);
  
  if (userIndex === -1) return null;
  
  const updatedUser = { ...users[userIndex], ...updatedFields };
  users[userIndex] = updatedUser;
  
  saveUsers(users);
  
  const currentUser = getCurrentUser();
  if (currentUser && currentUser.id === userId) {
    saveCurrentUser(updatedUser);
  }
  
  return updatedUser;
};

/**
 * Экспорт данных всех пользователей в JSON файл
 */
export const exportUsersToJSON = (): void => {
  const users = getUsers();
  const blob = new Blob([JSON.stringify(users, null, 2)], { type: 'application/json' });
  saveAs(blob, USER_DATA_FILE);
};

/**
 * Импорт данных пользователей из JSON файла
 */
export const importUsersFromJSON = (jsonData: string): boolean => {
  try {
    const users = JSON.parse(jsonData);
    if (!Array.isArray(users)) {
      throw new Error('Некорректный формат данных');
    }
    
    saveUsers(users);
    return true;
  } catch (error) {
    console.error('Ошибка при импорте данных пользователей:', error);
    return false;
  }
};

/**
 * Проверка, имеет ли пользователь активную подписку определенного типа
 */
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

/**
 * Активация подписки для пользователя
 */
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
