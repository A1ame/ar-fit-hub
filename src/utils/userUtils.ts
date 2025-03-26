
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

/**
 * Получение списка всех пользователей из localStorage
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
 * Сохранение списка пользователей в localStorage
 */
export const saveUsers = (users: UserData[]): void => {
  localStorage.setItem('ar-fit-users', JSON.stringify(users));
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
 * Сохранение текущего пользователя в localStorage
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
