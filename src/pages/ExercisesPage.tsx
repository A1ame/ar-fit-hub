
import React, { useEffect } from "react";
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
  
  useEffect(() => {
    requireAuth(navigate);
  }, [navigate]);
  
  return (
    <div className="min-h-screen pt-20 pb-20">
      <div className="container mx-auto px-4">
        <Exercises />
      </div>
      <Navigation />
      <SubscriptionPrompt type="workout" />
    </div>
  );
};

export default ExercisesPage;
