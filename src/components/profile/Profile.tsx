
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { LogOut, Save, Bell, Moon, Settings, Lock, Globe, ChevronLeft } from "lucide-react";
import { useTheme } from "../theme/ThemeProvider";
import { t } from "@/utils/languageUtils";

const Profile = () => {
  const navigate = useNavigate();
  const { theme, setTheme, language, setLanguage } = useTheme();
  const [user, setUser] = useState<any>(null);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
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
    toast.success(t("loggedOut", language));
    navigate("/");
  };
  
  const handleSaveProfile = () => {
    if (user) {
      const updatedUser = { ...user, name, email };
      localStorage.setItem("ar-fit-user", JSON.stringify(updatedUser));
      setUser(updatedUser);
      toast.success(t("profileUpdated", language));
    }
  };
  
  if (!user) {
    return <div>{t("loading", language)}</div>;
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <Button 
        onClick={() => navigate(-1)} 
        variant="ghost" 
        className="flex items-center mb-2"
      >
        <ChevronLeft className="w-5 h-5 mr-1" />
        {t("back", language)}
      </Button>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="glass-card border-4 border-arfit-purple/60 shadow-[0_10px_15px_-3px_rgba(74,42,130,0.3)] transform hover:scale-[1.01] transition-all">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-arfit-purple text-3d">{t("profileSettings", language)}</CardTitle>
            <CardDescription>{t("manageAccount", language)}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">{t("personalInfo", language)}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">{t("name", language)}</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="glass-input"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">{t("email", language)}</Label>
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
                {t("saveChanges", language)}
              </Button>
            </div>
            
            <Separator />
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium flex items-center">
                <Settings className="mr-2 h-5 w-5" />
                {t("preferences", language)}
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="notifications" className="flex items-center">
                      <Bell className="mr-2 h-4 w-4" />
                      {t("notifications", language)}
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      {t("notificationsDesc", language)}
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
                      {t("darkMode", language)}
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      {t("darkModeDesc", language)}
                    </p>
                  </div>
                  <Switch
                    id="darkMode"
                    checked={theme === "dark"}
                    onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="language" className="flex items-center">
                      <Globe className="mr-2 h-4 w-4" />
                      {t("language", language)}
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      {t("languageDesc", language)}
                    </p>
                  </div>
                  <Select
                    value={language}
                    onValueChange={(value: "en" | "ru") => setLanguage(value)}
                  >
                    <SelectTrigger className="w-[120px]">
                      <SelectValue placeholder={t("language", language)} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">{t("english", language)}</SelectItem>
                      <SelectItem value="ru">{t("russian", language)}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            
            <Separator />
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium flex items-center">
                <Lock className="mr-2 h-5 w-5" />
                {t("account", language)}
              </h3>
              <Button 
                variant="destructive" 
                onClick={handleLogout}
                className="w-full bg-red-500 hover:bg-red-600"
              >
                <LogOut className="mr-2 h-4 w-4" />
                {t("logOut", language)}
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Profile;
