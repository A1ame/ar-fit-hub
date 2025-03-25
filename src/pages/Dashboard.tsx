
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Dashboard from "@/components/dashboard/Dashboard";
import Navigation from "@/components/layout/Navigation";
import { requireAuth } from "@/utils/authUtils";

const DashboardPage = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    requireAuth(navigate);
  }, [navigate]);
  
  return (
    <div className="min-h-screen pt-6 pb-20">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6 text-arfit-purple text-center">AR-FIT</h1>
        <Dashboard />
      </div>
      <Navigation />
    </div>
  );
};

export default DashboardPage;
