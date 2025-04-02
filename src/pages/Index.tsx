
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "@/components/auth/AuthForm";
import { isLoggedIn } from "@/utils/authUtils";
import { motion } from "framer-motion";
import { useTheme } from "@/components/theme/ThemeProvider";
import { t } from "@/utils/languageUtils";
import { Dumbbell, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

const Index = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const { language, setLanguage } = useTheme();
  
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Проверка, вошел ли пользователь в систему
    if (isLoggedIn()) {
      navigate("/dashboard");
    } else {
      setLoading(false);
    }
  }, [navigate]);
  
  const toggleLanguage = () => {
    setLanguage(language === 'ru' ? 'en' : 'ru');
  };
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse-subtle">{t("loading")}</div>
      </div>
    );
  }

  return (
    <ScrollArea className="h-screen">
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-arfit-purple/10 via-white to-arfit-purple/5">
        <div className="fixed top-0 left-0 right-0 p-4 flex items-center justify-between shadow-sm bg-white/50 backdrop-blur-sm z-10">
          <div className="flex items-center">
            <Dumbbell className="h-6 w-6 text-arfit-purple mr-2" />
            <h1 className="text-xl font-bold text-arfit-purple">AR-FIT</h1>
          </div>
          
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={toggleLanguage}
            className="flex items-center gap-2"
          >
            <Globe className="h-4 w-4" />
            {language === 'ru' ? 'English' : 'Русский'}
          </Button>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <AuthForm />
        </motion.div>
      </div>
    </ScrollArea>
  );
};

export default Index;
