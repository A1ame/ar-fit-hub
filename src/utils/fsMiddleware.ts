
// This is a browser-compatible file system middleware that emulates Node.js fs operations
// in a browser environment using localStorage or IndexedDB

// Simple in-memory storage for development
const fileSystem: Record<string, string> = {};

// Initialize the file system on load
const initFileSystem = () => {
  console.log('Initializing file system middleware...');
  
  // Load all stored files from localStorage
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith('fs-file:')) {
      const path = key.replace('fs-file:', '');
      const data = localStorage.getItem(key);
      if (data) {
        fileSystem[path] = data;
        console.log(`Loaded file: ${path}`);
      }
    }
  }
  
  // Ensure users database exists
  const usersDbPath = 'src/data/users-db.json';
  if (!fileSystem[usersDbPath]) {
    console.log('Users database not found, creating...');
    fileSystem[usersDbPath] = JSON.stringify([], null, 2);
    localStorage.setItem(`fs-file:${usersDbPath}`, fileSystem[usersDbPath]);
    console.log('Users database created successfully');
  }
};

// Initialize on load
initFileSystem();

// Emulating the fs module's functions
export const fs = {
  existsSync: (path: string): boolean => {
    const exists = path in fileSystem;
    console.log(`Checking if file exists: ${path} - ${exists}`);
    return exists;
  },
  
  mkdirSync: (path: string, options?: { recursive?: boolean }): void => {
    console.log(`Creating directory: ${path}`);
    // In browser we don't need to create directories, but we'll log it
    return;
  },
  
  writeFileSync: (path: string, data: string): void => {
    console.log(`Writing to file: ${path}`);
    fileSystem[path] = data;
    
    // Also store in localStorage for persistence between page refreshes
    try {
      localStorage.setItem(`fs-file:${path}`, data);
      console.log(`File written successfully: ${path}`);
    } catch (error) {
      console.error('Error writing to localStorage:', error);
    }
  },
  
  readFileSync: (path: string, encoding: string): string => {
    console.log(`Reading file: ${path}`);
    
    // Try reading from in-memory first
    if (path in fileSystem) {
      console.log(`File found in memory: ${path}`);
      return fileSystem[path];
    }
    
    // Try reading from localStorage
    const data = localStorage.getItem(`fs-file:${path}`);
    if (data !== null) {
      console.log(`File found in localStorage: ${path}`);
      fileSystem[path] = data; // Cache it in memory
      return data;
    }
    
    // If file doesn't exist but it's the users database, create it
    if (path === 'src/data/users-db.json') {
      console.log('Users database not found, creating empty database');
      const emptyDb = JSON.stringify([], null, 2);
      fileSystem[path] = emptyDb;
      localStorage.setItem(`fs-file:${path}`, emptyDb);
      return emptyDb;
    }
    
    // File doesn't exist
    console.error(`ENOENT: no such file or directory, open '${path}'`);
    throw new Error(`ENOENT: no such file or directory, open '${path}'`);
  }
};

// Emulating the path module
export const path = {
  join: (...paths: string[]): string => {
    const joinedPath = paths.join('/').replace(/\/+/g, '/');
    console.log(`Joined path: ${joinedPath}`);
    return joinedPath;
  },
  
  dirname: (path: string): string => {
    const dirPath = path.split('/').slice(0, -1).join('/');
    console.log(`Directory name: ${dirPath}`);
    return dirPath;
  }
};
