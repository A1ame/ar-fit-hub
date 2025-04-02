
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Dashboard from "@/components/dashboard/Dashboard";
import Navigation from "@/components/layout/Navigation";
import { requireAuth } from "@/utils/authUtils";
import { useTheme } from "@/components/theme/ThemeProvider";
import { t } from "@/utils/languageUtils";
import { Dumbbell } from "lucide-react";

const DashboardPage = () => {
  const navigate = useNavigate();
  const { language } = useTheme();
  
  useEffect(() => {
    requireAuth(navigate, language);
  }, [navigate, language]);
  
  return (
    <div className="min-h-screen pt-10 pb-20">
      <div className="fixed top-0 left-0 right-0 p-2 flex items-center justify-center shadow-sm bg-white/50 backdrop-blur-sm z-10">
        <div className="flex items-center">
          <Dumbbell className="h-6 w-6 text-arfit-purple mr-2" />
          <h1 className="text-xl font-bold text-arfit-purple">AR-FIT</h1>
        </div>
      </div>
      
      <div className="container mx-auto px-4 mt-2">
        <Dashboard />
      </div>
      <Navigation />
    </div>
  );
};

export default DashboardPage;
