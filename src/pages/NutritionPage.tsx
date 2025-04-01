
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Nutrition from "@/components/nutrition/Nutrition";
import Navigation from "@/components/layout/Navigation";
import { requireAuth } from "@/utils/authUtils";
import { useTheme } from "@/components/theme/ThemeProvider";
import { t } from "@/utils/languageUtils";
import SubscriptionPrompt from "@/components/subscription/SubscriptionPrompt";
import CalorieCalculator from "@/components/nutrition/CalorieCalculator";

const NutritionPage = () => {
  const navigate = useNavigate();
  const { language } = useTheme();
  const [showPrompt, setShowPrompt] = useState(false);
  
  useEffect(() => {
    requireAuth(navigate, language);
    
    // Показывать подсказку о подписке только каждые 4-5 посещений
    const visitCount = parseInt(localStorage.getItem('nutrition-visit-count') || '0');
    const newCount = visitCount + 1;
    localStorage.setItem('nutrition-visit-count', newCount.toString());
    
    if (newCount % 5 === 0 || newCount === 1) {
      setShowPrompt(true);
    }
  }, [navigate, language]);
  
  return (
    <div className="min-h-screen pt-10 pb-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-6">
          <Nutrition />
          <CalorieCalculator />
        </div>
      </div>
      <Navigation />
      {showPrompt && <SubscriptionPrompt type="nutrition" />}
    </div>
  );
};

export default NutritionPage;
