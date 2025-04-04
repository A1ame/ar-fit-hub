
// This file is kept for compatibility but now uses the browserDB.ts implementation
import { initDatabase } from './browserDB';

// Initialize the database
export const initializeDatabase = async () => {
  await initDatabase();
  console.log('Database initialized via compatibility layer');
};

// Wrapper for executeQuery to maintain API compatibility
export async function executeQuery(query: string, params: any[] = []): Promise<any> {
  console.warn('executeQuery is deprecated. Use browserDB functions instead.');
  // This is just a stub - actual implementation is in browserDB.ts
  return [];
}
