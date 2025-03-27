
import { v4 as uuidv4 } from 'uuid';
import { saveAs } from 'file-saver';

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

// File path for storing user data JSON
const USER_DATA_FILE = 'ar-fit-users-data.json';

/**
 * Получение списка всех пользователей из localStorage и файла
 */
export const getUsers = (): UserData[] => {
  try {
    // First try to get from localStorage
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
  // Save to localStorage
  localStorage.setItem('ar-fit-users', JSON.stringify(users));
  
  // Also save to file
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
  
  // Также обновляем этого пользователя в массиве пользователей
  const users = getUsers();
  const updatedUsers = users.map(u => u.id === user.id ? user : u);
  saveUsers(updatedUsers);
};

/**
 * Добавление нового пользователя
 */
export const addUser = (user: UserData): void => {
  const users = getUsers();
  
  // Если id не указан, создаем новый с помощью uuid
  if (!user.id) {
    user.id = uuidv4();
  }
  
  // Проверяем, не существует ли пользователь с таким email
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
    // Помечаем пользователя как вошедшего в систему
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
    
    // Обновляем в массиве пользователей
    const users = getUsers();
    const updatedUsers = users.map(u => u.id === currentUser.id ? loggedOutUser : u);
    saveUsers(updatedUsers);
    
    // Очищаем данные текущего пользователя
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
  
  // Если это текущий пользователь, обновляем и его
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
