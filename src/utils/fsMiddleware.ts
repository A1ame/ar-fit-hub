
// This is a browser-compatible file system middleware that emulates Node.js fs operations
// in a browser environment using localStorage or IndexedDB

// Simple in-memory storage for development
const fileSystem: Record<string, string> = {};

// Emulating the fs module's functions
export const fs = {
  existsSync: (path: string): boolean => {
    return path in fileSystem;
  },
  
  mkdirSync: (path: string, options?: { recursive?: boolean }): void => {
    // In browser we don't need to create directories
    return;
  },
  
  writeFileSync: (path: string, data: string): void => {
    fileSystem[path] = data;
    // Also store in localStorage for persistence between page refreshes
    try {
      localStorage.setItem(`fs-file:${path}`, data);
    } catch (error) {
      console.error('Error writing to localStorage:', error);
    }
  },
  
  readFileSync: (path: string, encoding: string): string => {
    // Try reading from in-memory first
    if (path in fileSystem) {
      return fileSystem[path];
    }
    
    // Try reading from localStorage
    const data = localStorage.getItem(`fs-file:${path}`);
    if (data !== null) {
      fileSystem[path] = data; // Cache it in memory
      return data;
    }
    
    // File doesn't exist
    throw new Error(`ENOENT: no such file or directory, open '${path}'`);
  }
};

// Emulating the path module
export const path = {
  join: (...paths: string[]): string => {
    return paths.join('/').replace(/\/+/g, '/');
  },
  
  dirname: (path: string): string => {
    return path.split('/').slice(0, -1).join('/');
  }
};
