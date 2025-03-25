
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { LogOut, Save, Bell, Moon, Settings, Lock } from "lucide-react";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  
  useEffect(() => {
    const storedUser = localStorage.getItem("ar-fit-user");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      setName(userData.name || "");
      setEmail(userData.email || "");
    }
  }, []);
  
  const handleLogout = () => {
    localStorage.removeItem("ar-fit-user");
    toast.success("Logged out successfully");
    navigate("/");
  };
  
  const handleSaveProfile = () => {
    if (user) {
      const updatedUser = { ...user, name, email };
      localStorage.setItem("ar-fit-user", JSON.stringify(updatedUser));
      setUser(updatedUser);
      toast.success("Profile updated successfully");
    }
  };
  
  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-arfit-purple">Profile Settings</CardTitle>
            <CardDescription>Manage your account preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="glass-input"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="glass-input"
                  />
                </div>
              </div>
              <Button 
                onClick={handleSaveProfile}
                className="glass-button"
              >
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </div>
            
            <Separator />
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium flex items-center">
                <Settings className="mr-2 h-5 w-5" />
                Preferences
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="notifications" className="flex items-center">
                      <Bell className="mr-2 h-4 w-4" />
                      Notifications
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Receive workout and progress notifications
                    </p>
                  </div>
                  <Switch
                    id="notifications"
                    checked={notificationsEnabled}
                    onCheckedChange={setNotificationsEnabled}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="darkMode" className="flex items-center">
                      <Moon className="mr-2 h-4 w-4" />
                      Dark Mode
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Enable dark mode for the application
                    </p>
                  </div>
                  <Switch
                    id="darkMode"
                    checked={darkModeEnabled}
                    onCheckedChange={setDarkModeEnabled}
                  />
                </div>
              </div>
            </div>
            
            <Separator />
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium flex items-center">
                <Lock className="mr-2 h-5 w-5" />
                Account
              </h3>
              <Button 
                variant="destructive" 
                onClick={handleLogout}
                className="w-full bg-red-500 hover:bg-red-600"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Log Out
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Profile;
