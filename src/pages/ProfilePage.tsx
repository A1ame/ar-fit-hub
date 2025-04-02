
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Profile from "@/components/profile/Profile";
import Navigation from "@/components/layout/Navigation";
import { requireAuth } from "@/utils/authUtils";

const ProfilePage = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    requireAuth(navigate);
  }, [navigate]);
  
  return (
    <div className="min-h-screen pt-4 pb-20">
      <div className="container mx-auto px-4">
        <Profile />
      </div>
      <Navigation />
    </div>
  );
};

export default ProfilePage;
