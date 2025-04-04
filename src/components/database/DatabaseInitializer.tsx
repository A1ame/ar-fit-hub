
import { useEffect, useState } from 'react';
import { initializeUserSystem } from '@/utils/userUtils';
import { toast } from 'sonner';
import { t } from '@/utils/languageUtils';

const DatabaseInitializer = () => {
  const [initialized, setInitialized] = useState(false);
  
  useEffect(() => {
    const init = async () => {
      try {
        await initializeUserSystem();
        setInitialized(true);
        console.log('Database initialized');
      } catch (error) {
        console.error('Database initialization error:', error);
        toast.error(t('dbInitError'));
      }
    };
    
    init();
  }, []);
  
  return null; // Этот компонент не отображает никакого UI
};

export default DatabaseInitializer;
