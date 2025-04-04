
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "@/components/auth/AuthForm";
import { isLoggedIn } from "@/utils/authUtils";
import { motion } from "framer-motion";
import { useTheme } from "@/components/theme/ThemeProvider";
import { t } from "@/utils/languageUtils";

const Index = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const { language } = useTheme();
  
  useEffect(() => {
    // Проверка, вошел ли пользователь в систему
    if (isLoggedIn()) {
      navigate("/dashboard");
    } else {
      setLoading(false);
    }
  }, [navigate]);
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse-subtle">{t("loading", language)}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-arfit-purple/10 via-white to-arfit-purple/5">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <AuthForm />
      </motion.div>
    </div>
  );
};

export default Index;
