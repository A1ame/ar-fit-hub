
import { v4 as uuidv4 } from 'uuid';
import { executeQuery } from './dbConnection';

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
  // Import and initializeDatabase method from dbConnection is called at app startup
  const { initializeDatabase } = await import('./dbConnection');
  await initializeDatabase();
};

// Get all users from database
export const getUsers = async (): Promise<UserData[]> => {
  try {
    console.log('Getting all users from database');
    
    // Get basic user data
    const usersQuery = 'SELECT * FROM users';
    const usersData = await executeQuery(usersQuery);
    
    const users: UserData[] = [];
    
    for (const userData of usersData) {
      // Get stats for each user
      const statsQuery = 'SELECT * FROM user_stats WHERE user_id = ?';
      const statsData = await executeQuery(statsQuery, [userData.id]);
      
      // Get subscriptions for each user
      const subscriptionsQuery = 'SELECT * FROM subscriptions WHERE user_id = ?';
      const subscriptionsData = await executeQuery(subscriptionsQuery, [userData.id]);
      
      // Parse JSON fields
      const bodyProblems = userData.body_problems ? JSON.parse(userData.body_problems) : [];
      const dietRestrictions = userData.diet_restrictions ? JSON.parse(userData.diet_restrictions) : [];
      
      // Parse stats
      let stats = defaultStats;
      if (statsData && statsData.length > 0) {
        stats = {
          calories: JSON.parse(statsData[0].calories),
          steps: JSON.parse(statsData[0].steps),
          workoutsCompleted: statsData[0].workouts_completed,
          streakDays: statsData[0].streak_days
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
          startDate: sub.start_date.toISOString(),
          endDate: sub.end_date.toISOString(),
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
        gender: userData.gender as "male" | "female",
        age: userData.age,
        weight: userData.weight,
        height: userData.height,
        loggedIn: Boolean(userData.logged_in),
        createdAt: userData.created_at.toISOString(),
        bodyProblems,
        dietRestrictions,
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
    const updateUserQuery = `
      UPDATE users 
      SET name = ?, 
          email = ?, 
          password = ?, 
          gender = ?, 
          age = ?, 
          weight = ?, 
          height = ?, 
          logged_in = ?,
          body_problems = ?,
          diet_restrictions = ?
      WHERE id = ?
    `;
    
    const bodyProblemsJson = JSON.stringify(user.bodyProblems || []);
    const dietRestrictionsJson = JSON.stringify(user.dietRestrictions || []);
    
    await executeQuery(updateUserQuery, [
      user.name,
      user.email,
      user.password,
      user.gender,
      user.age,
      user.weight,
      user.height,
      user.loggedIn ? 1 : 0,
      bodyProblemsJson,
      dietRestrictionsJson,
      user.id
    ]);
    
    // Update or insert stats
    const statsExistsQuery = 'SELECT 1 FROM user_stats WHERE user_id = ?';
    const statsExists = await executeQuery(statsExistsQuery, [user.id]);
    
    if (statsExists && statsExists.length > 0) {
      // Update existing stats
      const updateStatsQuery = `
        UPDATE user_stats 
        SET calories = ?,
            steps = ?,
            workouts_completed = ?,
            streak_days = ?
        WHERE user_id = ?
      `;
      
      await executeQuery(updateStatsQuery, [
        JSON.stringify(user.stats.calories),
        JSON.stringify(user.stats.steps),
        user.stats.workoutsCompleted,
        user.stats.streakDays,
        user.id
      ]);
    } else {
      // Insert new stats
      const insertStatsQuery = `
        INSERT INTO user_stats (user_id, calories, steps, workouts_completed, streak_days)
        VALUES (?, ?, ?, ?, ?)
      `;
      
      await executeQuery(insertStatsQuery, [
        user.id,
        JSON.stringify(user.stats.calories),
        JSON.stringify(user.stats.steps),
        user.stats.workoutsCompleted,
        user.stats.streakDays
      ]);
    }
    
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
    const checkUserQuery = 'SELECT 1 FROM users WHERE email = ?';
    const existingUser = await executeQuery(checkUserQuery, [user.email]);
    
    if (existingUser && existingUser.length > 0) {
      console.error(`User with email ${user.email} already exists`);
      throw new Error('Пользователь с таким email уже существует');
    }
    
    // Ensure user has an ID
    if (!user.id) {
      user.id = uuidv4();
      console.log(`Generated new user ID: ${user.id}`);
    }
    
    // Insert user
    const insertUserQuery = `
      INSERT INTO users (
        id, name, email, password, gender, age, weight, height, 
        logged_in, created_at, body_problems, diet_restrictions
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    
    const bodyProblemsJson = JSON.stringify(user.bodyProblems || []);
    const dietRestrictionsJson = JSON.stringify(user.dietRestrictions || []);
    const created_at = new Date(user.createdAt);
    
    await executeQuery(insertUserQuery, [
      user.id,
      user.name,
      user.email,
      user.password,
      user.gender,
      user.age,
      user.weight,
      user.height,
      user.loggedIn ? 1 : 0,
      created_at,
      bodyProblemsJson,
      dietRestrictionsJson
    ]);
    
    // Insert stats
    const insertStatsQuery = `
      INSERT INTO user_stats (user_id, calories, steps, workouts_completed, streak_days)
      VALUES (?, ?, ?, ?, ?)
    `;
    
    await executeQuery(insertStatsQuery, [
      user.id,
      JSON.stringify(user.stats.calories),
      JSON.stringify(user.stats.steps),
      user.stats.workoutsCompleted,
      user.stats.streakDays
    ]);
    
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
    const query = 'SELECT * FROM users WHERE email = ? AND password = ?';
    const users = await executeQuery(query, [email, password]);
    
    if (users && users.length > 0) {
      const user = users[0];
      
      // Get stats for user
      const statsQuery = 'SELECT * FROM user_stats WHERE user_id = ?';
      const statsData = await executeQuery(statsQuery, [user.id]);
      
      // Get subscriptions for user
      const subscriptionsQuery = 'SELECT * FROM subscriptions WHERE user_id = ?';
      const subscriptionsData = await executeQuery(subscriptionsQuery, [user.id]);
      
      // Parse JSON fields
      const bodyProblems = user.body_problems ? JSON.parse(user.body_problems) : [];
      const dietRestrictions = user.diet_restrictions ? JSON.parse(user.diet_restrictions) : [];
      
      // Parse stats
      let stats = defaultStats;
      if (statsData && statsData.length > 0) {
        stats = {
          calories: JSON.parse(statsData[0].calories),
          steps: JSON.parse(statsData[0].steps),
          workoutsCompleted: statsData[0].workouts_completed,
          streakDays: statsData[0].streak_days
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
          startDate: sub.start_date.toISOString(),
          endDate: sub.end_date.toISOString(),
          price: sub.price
        };
        
        if (sub.type === 'workout' || sub.type === 'combo') {
          subscriptions.workout = subscriptionData;
        }
        
        if (sub.type === 'nutrition' || sub.type === 'combo') {
          subscriptions.nutrition = subscriptionData;
        }
      }
      
      // Create user object
      const userData: UserData = {
        id: user.id,
        name: user.name,
        email: user.email,
        password: user.password,
        gender: user.gender as "male" | "female",
        age: user.age,
        weight: user.weight,
        height: user.height,
        loggedIn: true,
        createdAt: user.created_at.toISOString(),
        bodyProblems,
        dietRestrictions,
        stats,
        subscriptions
      };
      
      // Update logged_in status
      const updateLoggedInQuery = 'UPDATE users SET logged_in = ? WHERE id = ?';
      await executeQuery(updateLoggedInQuery, [1, user.id]);
      
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
      // Update logged_in status in database
      const updateLoggedInQuery = 'UPDATE users SET logged_in = ? WHERE id = ?';
      await executeQuery(updateLoggedInQuery, [0, currentUser.id]);
      
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
    const userQuery = 'SELECT * FROM users WHERE id = ?';
    const usersData = await executeQuery(userQuery, [userId]);
    
    if (!usersData || usersData.length === 0) {
      console.error(`User not found: ${userId}`);
      return null;
    }
    
    const user = usersData[0];
    
    // Build update query fields
    const updateFields: string[] = [];
    const updateValues: any[] = [];
    
    if (updatedFields.name !== undefined) {
      updateFields.push('name = ?');
      updateValues.push(updatedFields.name);
    }
    
    if (updatedFields.email !== undefined) {
      updateFields.push('email = ?');
      updateValues.push(updatedFields.email);
    }
    
    if (updatedFields.gender !== undefined) {
      updateFields.push('gender = ?');
      updateValues.push(updatedFields.gender);
    }
    
    if (updatedFields.age !== undefined) {
      updateFields.push('age = ?');
      updateValues.push(updatedFields.age);
    }
    
    if (updatedFields.weight !== undefined) {
      updateFields.push('weight = ?');
      updateValues.push(updatedFields.weight);
    }
    
    if (updatedFields.height !== undefined) {
      updateFields.push('height = ?');
      updateValues.push(updatedFields.height);
    }
    
    if (updatedFields.bodyProblems !== undefined) {
      updateFields.push('body_problems = ?');
      updateValues.push(JSON.stringify(updatedFields.bodyProblems));
    }
    
    if (updatedFields.dietRestrictions !== undefined) {
      updateFields.push('diet_restrictions = ?');
      updateValues.push(JSON.stringify(updatedFields.dietRestrictions));
    }
    
    // Add userId to values
    updateValues.push(userId);
    
    // Execute update if there are fields to update
    if (updateFields.length > 0) {
      const updateQuery = `UPDATE users SET ${updateFields.join(', ')} WHERE id = ?`;
      await executeQuery(updateQuery, updateValues);
    }
    
    // Update stats if needed
    if (updatedFields.stats) {
      const updateStatsQuery = `
        UPDATE user_stats 
        SET calories = ?,
            steps = ?,
            workouts_completed = ?,
            streak_days = ?
        WHERE user_id = ?
      `;
      
      await executeQuery(updateStatsQuery, [
        JSON.stringify(updatedFields.stats.calories),
        JSON.stringify(updatedFields.stats.steps),
        updatedFields.stats.workoutsCompleted,
        updatedFields.stats.streakDays,
        userId
      ]);
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
    const insertSubscriptionQuery = `
      INSERT INTO subscriptions (user_id, type, duration, start_date, end_date, price)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    
    await executeQuery(insertSubscriptionQuery, [
      userId,
      type,
      duration,
      startDate,
      endDate,
      price
    ]);
    
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
    const query = 'SELECT * FROM tasks WHERE user_id = ? AND date = ?';
    const tasks = await executeQuery(query, [userId, date]);
    return tasks || [];
  } catch (error) {
    console.error('Error getting user tasks:', error);
    return [];
  }
};

// Save tasks for user
export const saveUserTasks = async (userId: string, date: string, tasks: any[]): Promise<boolean> => {
  try {
    // Delete existing tasks for this date
    const deleteQuery = 'DELETE FROM tasks WHERE user_id = ? AND date = ?';
    await executeQuery(deleteQuery, [userId, date]);
    
    // Insert new tasks
    for (const task of tasks) {
      const insertQuery = `
        INSERT INTO tasks (id, user_id, title, description, category, completed, date)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `;
      
      await executeQuery(insertQuery, [
        task.id,
        userId,
        task.title,
        task.description,
        task.category,
        task.completed ? 1 : 0,
        date
      ]);
    }
    
    return true;
  } catch (error) {
    console.error('Error saving user tasks:', error);
    return false;
  }
};
