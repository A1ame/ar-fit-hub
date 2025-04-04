
// A browser-friendly database implementation using IndexedDB
import { v4 as uuidv4 } from 'uuid';

// Database name and version
const DB_NAME = 'ar_fit_db';
const DB_VERSION = 1;

// Table/store names
export const STORES = {
  USERS: 'users',
  USER_STATS: 'user_stats',
  SUBSCRIPTIONS: 'subscriptions',
  MEALS: 'meals',
  TASKS: 'tasks'
};

// Connection variable
let dbPromise: Promise<IDBDatabase> | null = null;

// Initialize the database
export const initDatabase = (): Promise<IDBDatabase> => {
  if (dbPromise) {
    return dbPromise;
  }

  dbPromise = new Promise((resolve, reject) => {
    console.log('Opening IndexedDB connection...');
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = (event) => {
      console.error('IndexedDB error:', event);
      reject('Failed to open database');
    };

    request.onsuccess = () => {
      console.log('IndexedDB connection opened successfully');
      resolve(request.result);
    };

    request.onupgradeneeded = (event) => {
      console.log('Creating/upgrading database schema...');
      const db = (event.target as IDBOpenDBRequest).result;

      // Create users store
      if (!db.objectStoreNames.contains(STORES.USERS)) {
        const usersStore = db.createObjectStore(STORES.USERS, { keyPath: 'id' });
        usersStore.createIndex('email', 'email', { unique: true });
        console.log('Created users store');
      }

      // Create user_stats store
      if (!db.objectStoreNames.contains(STORES.USER_STATS)) {
        const statsStore = db.createObjectStore(STORES.USER_STATS, { keyPath: 'user_id' });
        console.log('Created user_stats store');
      }

      // Create subscriptions store
      if (!db.objectStoreNames.contains(STORES.SUBSCRIPTIONS)) {
        const subscriptionsStore = db.createObjectStore(STORES.SUBSCRIPTIONS, { keyPath: 'id', autoIncrement: true });
        subscriptionsStore.createIndex('user_id', 'user_id', { unique: false });
        console.log('Created subscriptions store');
      }

      // Create meals store
      if (!db.objectStoreNames.contains(STORES.MEALS)) {
        const mealsStore = db.createObjectStore(STORES.MEALS, { keyPath: 'id' });
        mealsStore.createIndex('user_id', 'user_id', { unique: false });
        mealsStore.createIndex('date', 'date', { unique: false });
        console.log('Created meals store');
      }

      // Create tasks store
      if (!db.objectStoreNames.contains(STORES.TASKS)) {
        const tasksStore = db.createObjectStore(STORES.TASKS, { keyPath: 'id' });
        tasksStore.createIndex('user_id', 'user_id', { unique: false });
        tasksStore.createIndex('date', 'date', { unique: false });
        console.log('Created tasks store');
      }
    };
  });

  return dbPromise;
};

// Generic function to add data to any store
export const addData = async (storeName: string, data: any): Promise<any> => {
  try {
    const db = await initDatabase();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(storeName, 'readwrite');
      const store = transaction.objectStore(storeName);
      
      // Generate ID for objects that don't have one
      if (!data.id && storeName !== STORES.USER_STATS && storeName !== STORES.SUBSCRIPTIONS) {
        data.id = uuidv4();
      }
      
      const request = store.add(data);
      
      request.onsuccess = () => {
        console.log(`Added data to ${storeName}:`, data);
        resolve(data);
      };
      
      request.onerror = (event) => {
        console.error(`Error adding to ${storeName}:`, event);
        reject(`Failed to add data to ${storeName}`);
      };
    });
  } catch (error) {
    console.error(`Database error in addData(${storeName}):`, error);
    throw error;
  }
};

// Generic function to get an item by ID
export const getDataById = async (storeName: string, id: string): Promise<any> => {
  try {
    const db = await initDatabase();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(storeName, 'readonly');
      const store = transaction.objectStore(storeName);
      const request = store.get(id);
      
      request.onsuccess = () => {
        resolve(request.result || null);
      };
      
      request.onerror = (event) => {
        console.error(`Error getting data from ${storeName}:`, event);
        reject(`Failed to get data from ${storeName}`);
      };
    });
  } catch (error) {
    console.error(`Database error in getDataById(${storeName}):`, error);
    throw error;
  }
};

// Generic function to update data
export const updateData = async (storeName: string, data: any): Promise<any> => {
  try {
    const db = await initDatabase();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(storeName, 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.put(data);
      
      request.onsuccess = () => {
        console.log(`Updated data in ${storeName}:`, data);
        resolve(data);
      };
      
      request.onerror = (event) => {
        console.error(`Error updating data in ${storeName}:`, event);
        reject(`Failed to update data in ${storeName}`);
      };
    });
  } catch (error) {
    console.error(`Database error in updateData(${storeName}):`, error);
    throw error;
  }
};

// Generic function to delete data
export const deleteData = async (storeName: string, id: string): Promise<void> => {
  try {
    const db = await initDatabase();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(storeName, 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.delete(id);
      
      request.onsuccess = () => {
        console.log(`Deleted data from ${storeName} with ID: ${id}`);
        resolve();
      };
      
      request.onerror = (event) => {
        console.error(`Error deleting data from ${storeName}:`, event);
        reject(`Failed to delete data from ${storeName}`);
      };
    });
  } catch (error) {
    console.error(`Database error in deleteData(${storeName}):`, error);
    throw error;
  }
};

// Get all data from a store
export const getAllData = async (storeName: string): Promise<any[]> => {
  try {
    const db = await initDatabase();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(storeName, 'readonly');
      const store = transaction.objectStore(storeName);
      const request = store.getAll();
      
      request.onsuccess = () => {
        resolve(request.result || []);
      };
      
      request.onerror = (event) => {
        console.error(`Error getting all data from ${storeName}:`, event);
        reject(`Failed to get all data from ${storeName}`);
      };
    });
  } catch (error) {
    console.error(`Database error in getAllData(${storeName}):`, error);
    throw error;
  }
};

// Query data by index
export const queryByIndex = async (storeName: string, indexName: string, value: any): Promise<any[]> => {
  try {
    const db = await initDatabase();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(storeName, 'readonly');
      const store = transaction.objectStore(storeName);
      const index = store.index(indexName);
      const request = index.getAll(value);
      
      request.onsuccess = () => {
        resolve(request.result || []);
      };
      
      request.onerror = (event) => {
        console.error(`Error querying ${storeName} by index ${indexName}:`, event);
        reject(`Failed to query data by index`);
      };
    });
  } catch (error) {
    console.error(`Database error in queryByIndex(${storeName}, ${indexName}):`, error);
    throw error;
  }
};

// Get a single item by index
export const getByIndex = async (storeName: string, indexName: string, value: any): Promise<any> => {
  try {
    const db = await initDatabase();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(storeName, 'readonly');
      const store = transaction.objectStore(storeName);
      const index = store.index(indexName);
      const request = index.get(value);
      
      request.onsuccess = () => {
        resolve(request.result || null);
      };
      
      request.onerror = (event) => {
        console.error(`Error getting item from ${storeName} by index ${indexName}:`, event);
        reject(`Failed to get item by index`);
      };
    });
  } catch (error) {
    console.error(`Database error in getByIndex(${storeName}, ${indexName}):`, error);
    throw error;
  }
};

// Clear all data from a store
export const clearStore = async (storeName: string): Promise<void> => {
  try {
    const db = await initDatabase();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(storeName, 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.clear();
      
      request.onsuccess = () => {
        console.log(`Cleared all data from ${storeName}`);
        resolve();
      };
      
      request.onerror = (event) => {
        console.error(`Error clearing data from ${storeName}:`, event);
        reject(`Failed to clear data from ${storeName}`);
      };
    });
  } catch (error) {
    console.error(`Database error in clearStore(${storeName}):`, error);
    throw error;
  }
};
