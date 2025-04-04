
import { useEffect, useState } from 'react';
import { initDatabase } from '@/utils/browserDB';
import { initializeUserSystem } from '@/utils/userUtils';
import { toast } from 'sonner';
import { t } from '@/utils/languageUtils';

const DatabaseInitializer = () => {
  const [initialized, setInitialized] = useState(false);
  
  useEffect(() => {
    const init = async () => {
      try {
        // Initialize IndexedDB database
        await initDatabase();
        
        // Initialize user system
        await initializeUserSystem();
        
        setInitialized(true);
        console.log('Database initialized successfully');
      } catch (error) {
        console.error('Database initialization error:', error);
        toast.error(t('dbInitError'));
      }
    };
    
    init();
  }, []);
  
  return null; // This component doesn't render anything
};

export default DatabaseInitializer;
