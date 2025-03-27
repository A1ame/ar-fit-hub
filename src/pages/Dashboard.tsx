
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Dashboard from "@/components/dashboard/Dashboard";
import Navigation from "@/components/layout/Navigation";
import { requireAuth } from "@/utils/authUtils";
import { useTheme } from "@/components/theme/ThemeProvider";
import { t } from "@/utils/languageUtils";

const DashboardPage = () => {
  const navigate = useNavigate();
  const { language } = useTheme();
  
  useEffect(() => {
    requireAuth(navigate, language);
  }, [navigate, language]);
  
  return (
    <div className="min-h-screen pt-6 pb-20">
      <div className="container mx-auto px-4">
        <Dashboard />
      </div>
      <Navigation />
    </div>
  );
};

export default DashboardPage;
