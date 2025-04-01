
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Exercises from "@/components/exercises/Exercises";
import Navigation from "@/components/layout/Navigation";
import { requireAuth } from "@/utils/authUtils";
import { useTheme } from "@/components/theme/ThemeProvider";
import { t } from "@/utils/languageUtils";
import SubscriptionPrompt from "@/components/subscription/SubscriptionPrompt";

const ExercisesPage = () => {
  const navigate = useNavigate();
  const { language } = useTheme();
  const [showPrompt, setShowPrompt] = useState(false);
  
  useEffect(() => {
    requireAuth(navigate);
    
    // Показывать подсказку о подписке только каждые 4-5 посещений
    const visitCount = parseInt(localStorage.getItem('exercise-visit-count') || '0');
    const newCount = visitCount + 1;
    localStorage.setItem('exercise-visit-count', newCount.toString());
    
    if (newCount % 5 === 0 || newCount === 1) {
      setShowPrompt(true);
    }
  }, [navigate]);
  
  return (
    <div className="min-h-screen pt-10 pb-20">
      <div className="container mx-auto px-4">
        <Exercises />
      </div>
      <Navigation />
      {showPrompt && <SubscriptionPrompt type="workout" />}
    </div>
  );
};

export default ExercisesPage;
