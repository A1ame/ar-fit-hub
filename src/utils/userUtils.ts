import { v4 as uuidv4 } from 'uuid';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  UserCredential,
} from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from './firebase';

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
  password: string; // Не будем хранить в Firestore
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
  duration: 1 | 6 | 12;
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

let currentUserSession: UserData | null = null;

export const getCurrentUser = (): UserData | null => {
  return currentUserSession;
};

export const saveCurrentUser = async (user: UserData): Promise<void> => {
  console.log(`Saving current user: ${user.name} (${user.id})`);
  currentUserSession = user;
  const userRef = doc(db, 'users', user.id);
  await setDoc(userRef, { ...user, password: undefined }, { merge: true }); // Не сохраняем пароль
};

export const addUser = async (user: Partial<UserData>): Promise<UserData> => {
  const { email, password, name, gender, age, weight, height } = user;
  if (!email || !password) throw new Error('Email and password are required');

  const userCredential: UserCredential = await createUserWithEmailAndPassword(auth, email, password);
  const uid = userCredential.user.uid;

  const newUser: UserData = {
    id: uid,
    name: name || '',
    email,
    password: '', // Не храним в Firestore
    gender: gender || 'male',
    age: age || 0,
    weight: weight || 0,
    height: height || 0,
    loggedIn: true,
    createdAt: new Date().toISOString(),
    stats: defaultStats,
  };

  await saveCurrentUser(newUser);
  return newUser;
};

export const authenticateUser = async (email: string, password: string): Promise<UserData | null> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const uid = userCredential.user.uid;
    const userRef = doc(db, 'users', uid);
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      const userData = userDoc.data() as UserData;
      const loggedInUser = { ...userData, loggedIn: true };
      await saveCurrentUser(loggedInUser);
      return loggedInUser;
    }
    return null;
  } catch (error) {
    console.error('Authentication failed:', error);
    return null;
  }
};

export const logoutUser = async (): Promise<void> => {
  const currentUser = getCurrentUser();
  if (currentUser) {
    const updatedUser = { ...currentUser, loggedIn: false };
    await saveCurrentUser(updatedUser);
    await signOut(auth);
    currentUserSession = null;
  }
};

export const updateUserData = async (userId: string, updatedFields: Partial<UserData>): Promise<UserData | null> => {
  const userRef = doc(db, 'users', userId);
  const userDoc = await getDoc(userRef);

  if (!userDoc.exists()) return null;

  const updatedUser = { ...userDoc.data(), ...updatedFields } as UserData;
  await updateDoc(userRef, updatedFields);

  if (currentUserSession?.id === userId) {
    currentUserSession = updatedUser;
  }
  return updatedUser;
};

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

export const activateSubscription = async (
  userId: string,
  type: 'workout' | 'nutrition' | 'combo',
  duration: 1 | 6 | 12,
  price: number
): Promise<UserData | null> => {
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
    price,
  };

  const updatedUser = {
    ...user,
    subscriptions: {
      ...user.subscriptions || {},
      workout: type === 'workout' || type === 'combo' ? subscriptionData : user.subscriptions?.workout || null,
      nutrition: type === 'nutrition' || type === 'combo' ? subscriptionData : user.subscriptions?.nutrition || null,
    },
  };

  await saveCurrentUser(updatedUser);
  return updatedUser;
};
