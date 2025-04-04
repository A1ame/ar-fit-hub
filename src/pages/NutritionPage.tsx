
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Nutrition from "@/components/nutrition/Nutrition";
import Navigation from "@/components/layout/Navigation";
import { requireAuth } from "@/utils/authUtils";
import { useTheme } from "@/components/theme/ThemeProvider";
import { t } from "@/utils/languageUtils";
import SubscriptionPrompt from "@/components/subscription/SubscriptionPrompt";

const NutritionPage = () => {
  const navigate = useNavigate();
  const { language } = useTheme();
  
  useEffect(() => {
    requireAuth(navigate, language);
  }, [navigate, language]);
  
  return (
    <div className="min-h-screen pt-20 pb-20">
      <div className="container mx-auto px-4">
        <Nutrition />
      </div>
      <Navigation />
      <SubscriptionPrompt type="nutrition" />
    </div>
  );
};

export default NutritionPage;
