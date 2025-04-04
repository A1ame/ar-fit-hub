
import { v4 as uuidv4 } from 'uuid';
import { 
  initDatabase, 
  addData, 
  getDataById, 
  updateData, 
  getAllData, 
  getByIndex, 
  queryByIndex,
  deleteData,
  STORES 
} from './browserDB';

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

// Current user session variable (in-memory only)
let currentUserSession: UserData | null = null;

// Initialize database if needed
export const initializeUserSystem = async () => {
  // Initialize the IndexedDB database
  await initDatabase();
  console.log('User system initialized');
};

// Get all users from database
export const getUsers = async (): Promise<UserData[]> => {
  try {
    console.log('Getting all users from database');
    
    // Get all users from the database
    const usersData = await getAllData(STORES.USERS);
    
    const users: UserData[] = [];
    
    for (const userData of usersData) {
      // Get stats for this user
      const statsData = await getDataById(STORES.USER_STATS, userData.id);
      
      // Get subscriptions for this user
      const subscriptionsData = await queryByIndex(STORES.SUBSCRIPTIONS, 'user_id', userData.id);
      
      // Create stats object
      let stats = defaultStats;
      if (statsData) {
        stats = {
          calories: statsData.calories,
          steps: statsData.steps,
          workoutsCompleted: statsData.workouts_completed,
          streakDays: statsData.streak_days
        };
      }
      
      // Create subscriptions object
      const subscriptions = {
        workout: null,
        nutrition: null
      };
      
      // Process each subscription
      for (const sub of subscriptionsData) {
        const subscriptionData = {
          type: sub.type,
          duration: sub.duration,
          startDate: sub.start_date,
          endDate: sub.end_date,
          price: sub.price
        };
        
        if (sub.type === 'workout' || sub.type === 'combo') {
          subscriptions.workout = subscriptionData;
        }
        
        if (sub.type === 'nutrition' || sub.type === 'combo') {
          subscriptions.nutrition = subscriptionData;
        }
      }
      
      // Add complete user object to array
      users.push({
        id: userData.id,
        name: userData.name,
        email: userData.email,
        password: userData.password,
        gender: userData.gender,
        age: userData.age,
        weight: userData.weight,
        height: userData.height,
        loggedIn: userData.logged_in,
        createdAt: userData.created_at,
        bodyProblems: userData.body_problems,
        dietRestrictions: userData.diet_restrictions,
        stats,
        subscriptions
      });
    }
    
    console.log(`Found ${users.length} users in database`);
    return users;
  } catch (error) {
    console.error('Error reading user database:', error);
    return [];
  }
};

// Get current logged in user
export const getCurrentUser = (): UserData | null => {
  return currentUserSession;
};

// Save current user and update in database
export const saveCurrentUser = async (user: UserData): Promise<void> => {
  console.log(`Saving current user: ${user.name} (${user.id})`);
  currentUserSession = user;
  
  try {
    // Update user in database
    await updateData(STORES.USERS, {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      gender: user.gender,
      age: user.age,
      weight: user.weight,
      height: user.height,
      logged_in: user.loggedIn,
      created_at: user.createdAt,
      body_problems: user.bodyProblems || [],
      diet_restrictions: user.dietRestrictions || []
    });
    
    // Update stats
    await updateData(STORES.USER_STATS, {
      user_id: user.id,
      calories: user.stats.calories,
      steps: user.stats.steps,
      workouts_completed: user.stats.workoutsCompleted,
      streak_days: user.stats.streakDays
    });
    
    console.log('User data successfully saved to database');
  } catch (error) {
    console.error('Error saving user data:', error);
  }
};

// Add new user to database
export const addUser = async (user: UserData): Promise<void> => {
  console.log('Adding new user to database');
  
  try {
    // Check if user exists
    const existingUser = await getByIndex(STORES.USERS, 'email', user.email);
    
    if (existingUser) {
      console.error(`User with email ${user.email} already exists`);
      throw new Error('Пользователь с таким email уже существует');
    }
    
    // Ensure user has an ID
    if (!user.id) {
      user.id = uuidv4();
      console.log(`Generated new user ID: ${user.id}`);
    }
    
    // Insert user
    await addData(STORES.USERS, {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      gender: user.gender,
      age: user.age,
      weight: user.weight,
      height: user.height,
      logged_in: user.loggedIn,
      created_at: user.createdAt,
      body_problems: user.bodyProblems || [],
      diet_restrictions: user.dietRestrictions || []
    });
    
    // Insert stats
    await addData(STORES.USER_STATS, {
      user_id: user.id,
      calories: user.stats.calories,
      steps: user.stats.steps,
      workouts_completed: user.stats.workoutsCompleted,
      streak_days: user.stats.streakDays
    });
    
    currentUserSession = user;
    console.log(`Added user: ${user.name} (${user.id})`);
  } catch (error) {
    console.error('Error adding user:', error);
    throw error;
  }
};

// Authenticate user
export const authenticateUser = async (email: string, password: string): Promise<UserData | null> => {
  console.log(`Authenticating user: ${email}`);
  
  try {
    // Find user by email
    const user = await getByIndex(STORES.USERS, 'email', email);
    
    if (user && user.password === password) {
      // Get stats for user
      const statsData = await getDataById(STORES.USER_STATS, user.id);
      
      // Get subscriptions for user
      const subscriptionsData = await queryByIndex(STORES.SUBSCRIPTIONS, 'user_id', user.id);
      
      // Parse stats
      let stats = defaultStats;
      if (statsData) {
        stats = {
          calories: statsData.calories,
          steps: statsData.steps,
          workoutsCompleted: statsData.workouts_completed,
          streakDays: statsData.streak_days
        };
      }
      
      // Create subscriptions object
      const subscriptions = {
        workout: null,
        nutrition: null
      };
      
      // Process each subscription
      for (const sub of subscriptionsData) {
        const subscriptionData = {
          type: sub.type,
          duration: sub.duration,
          startDate: sub.start_date,
          endDate: sub.end_date,
          price: sub.price
        };
        
        if (sub.type === 'workout' || sub.type === 'combo') {
          subscriptions.workout = subscriptionData;
        }
        
        if (sub.type === 'nutrition' || sub.type === 'combo') {
          subscriptions.nutrition = subscriptionData;
        }
      }
      
      // Update logged_in status
      user.logged_in = true;
      await updateData(STORES.USERS, user);
      
      // Create user object
      const userData: UserData = {
        id: user.id,
        name: user.name,
        email: user.email,
        password: user.password,
        gender: user.gender,
        age: user.age,
        weight: user.weight,
        height: user.height,
        loggedIn: true,
        createdAt: user.created_at,
        bodyProblems: user.body_problems || [],
        dietRestrictions: user.diet_restrictions || [],
        stats,
        subscriptions
      };
      
      console.log(`User authenticated successfully: ${userData.name} (${userData.id})`);
      currentUserSession = userData;
      return userData;
    }
    
    console.log('Authentication failed: invalid credentials');
    return null;
  } catch (error) {
    console.error('Authentication error:', error);
    return null;
  }
};

// Logout user
export const logoutUser = async (): Promise<void> => {
  const currentUser = getCurrentUser();
  if (currentUser) {
    try {
      // Get user from database
      const user = await getDataById(STORES.USERS, currentUser.id);
      if (user) {
        // Update logged_in status
        user.logged_in = false;
        await updateData(STORES.USERS, user);
      }
      
      console.log(`User logged out: ${currentUser.name} (${currentUser.id})`);
      currentUserSession = null;
    } catch (error) {
      console.error('Error logging out user:', error);
    }
  }
};

// Update user data
export const updateUserData = async (userId: string, updatedFields: Partial<UserData>): Promise<UserData | null> => {
  try {
    // Get current user data
    const user = await getDataById(STORES.USERS, userId);
    
    if (!user) {
      console.error(`User not found: ${userId}`);
      return null;
    }
    
    // Update user fields
    if (updatedFields.name !== undefined) user.name = updatedFields.name;
    if (updatedFields.email !== undefined) user.email = updatedFields.email;
    if (updatedFields.gender !== undefined) user.gender = updatedFields.gender;
    if (updatedFields.age !== undefined) user.age = updatedFields.age;
    if (updatedFields.weight !== undefined) user.weight = updatedFields.weight;
    if (updatedFields.height !== undefined) user.height = updatedFields.height;
    if (updatedFields.bodyProblems !== undefined) user.body_problems = updatedFields.bodyProblems;
    if (updatedFields.dietRestrictions !== undefined) user.diet_restrictions = updatedFields.dietRestrictions;
    
    // Save updated user
    await updateData(STORES.USERS, user);
    
    // Update stats if needed
    if (updatedFields.stats) {
      const statsData = await getDataById(STORES.USER_STATS, userId);
      
      if (statsData) {
        statsData.calories = updatedFields.stats.calories;
        statsData.steps = updatedFields.stats.steps;
        statsData.workouts_completed = updatedFields.stats.workoutsCompleted;
        statsData.streak_days = updatedFields.stats.streakDays;
        
        await updateData(STORES.USER_STATS, statsData);
      }
    }
    
    // Get updated user
    return authenticateUser(
      updatedFields.email || user.email,
      user.password
    );
  } catch (error) {
    console.error('Error updating user data:', error);
    return null;
  }
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
export const activateSubscription = async (
  userId: string, 
  type: 'workout' | 'nutrition' | 'combo', 
  duration: 1 | 6 | 12,
  price: number
): Promise<UserData | null> => {
  const user = getCurrentUser();
  if (!user || user.id !== userId) return null;
  
  try {
    const startDate = new Date();
    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + duration);
    
    // Insert subscription to database
    await addData(STORES.SUBSCRIPTIONS, {
      user_id: userId,
      type,
      duration,
      start_date: startDate.toISOString(),
      end_date: endDate.toISOString(),
      price
    });
    
    // Update current user with new subscription
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
    
    await saveCurrentUser(updatedUser);
    return updatedUser;
  } catch (error) {
    console.error('Error activating subscription:', error);
    return null;
  }
};

// Get tasks for user
export const getUserTasks = async (userId: string, date: string): Promise<any[]> => {
  try {
    // Find all tasks for the specified user and date
    const tasks = await queryByIndex(STORES.TASKS, 'user_id', userId);
    
    // Filter by date
    return tasks.filter(task => task.date === date) || [];
  } catch (error) {
    console.error('Error getting user tasks:', error);
    return [];
  }
};

// Save tasks for user
export const saveUserTasks = async (userId: string, date: string, tasks: any[]): Promise<boolean> => {
  try {
    // Get all existing tasks for this user and date
    const existingTasks = await queryByIndex(STORES.TASKS, 'user_id', userId);
    const tasksForDate = existingTasks.filter(task => task.date === date);
    
    // Delete existing tasks for this date
    for (const task of tasksForDate) {
      await deleteData(STORES.TASKS, task.id);
    }
    
    // Insert new tasks
    for (const task of tasks) {
      await addData(STORES.TASKS, {
        id: task.id,
        user_id: userId,
        title: task.title,
        description: task.description,
        category: task.category,
        completed: task.completed,
        date
      });
    }
    
    return true;
  } catch (error) {
    console.error('Error saving user tasks:', error);
    return false;
  }
};
