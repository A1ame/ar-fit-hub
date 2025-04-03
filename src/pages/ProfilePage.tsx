
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Profile from "@/components/profile/Profile";
import Navigation from "@/components/layout/Navigation";
import { requireAuth } from "@/utils/authUtils";
import { ScrollArea } from "@/components/ui/scroll-area";

const ProfilePage = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    requireAuth(navigate);
  }, [navigate]);
  
  return (
    <ScrollArea className="h-screen">
      <div className="min-h-screen pt-10 pb-20">
        <div className="container mx-auto px-4">
          <Profile />
        </div>
        <Navigation />
      </div>
    </ScrollArea>
  );
};

export default ProfilePage;
