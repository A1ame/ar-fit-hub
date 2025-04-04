
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { LogOut, Save, Bell, Moon, Settings, Lock, UserCircle, Ruler, Weight, CreditCard, Globe } from "lucide-react";
import { useTheme } from "../theme/ThemeProvider";
import { t } from "@/utils/languageUtils";
import SubscriptionOptions from "./SubscriptionOptions";
import Statistics from "./Statistics";

const Profile = () => {
  const navigate = useNavigate();
  const { theme, setTheme, language, setLanguage } = useTheme();
  const [user, setUser] = useState<any>(null);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [height, setHeight] = useState<number>(0);
  const [weight, setWeight] = useState<number>(0);
  
  useEffect(() => {
    const storedUser = localStorage.getItem("ar-fit-user");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      setName(userData.name || "");
      setEmail(userData.email || "");
      setHeight(userData.height || 170);
      setWeight(userData.weight || 70);
    }
  }, []);
  
  const handleLogout = () => {
    localStorage.removeItem("ar-fit-user");
    toast.success(t("loggedOut"));
    navigate("/");
  };
  
  const handleSaveProfile = () => {
    if (user) {
      const updatedUser = { ...user, name, email, height, weight };
      localStorage.setItem("ar-fit-user", JSON.stringify(updatedUser));
      setUser(updatedUser);
      toast.success(t("profileUpdated"));
    }
  };

  const handleSubscriptionChange = () => {
    // Refresh user data after subscription change
    const storedUser = localStorage.getItem("ar-fit-user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  };
  
  if (!user) {
    return <div>{t("loading")}</div>;
  }

  return (
    <div className="space-y-6">
      <Card className="border-6 border-arfit-purple/60 shadow-[0_10px_15px_-3px_rgba(74,42,130,0.3)]">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-arfit-purple">{t("profileSettings")}</CardTitle>
          <CardDescription>{t("manageAccount")}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium flex items-center">
              <UserCircle className="mr-2 h-5 w-5" />
              {t("personalInfo")}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">{t("name")}</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">{t("email")}</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="height" className="flex items-center">
                  <Ruler className="mr-2 h-4 w-4" />
                  {t("height")}
                </Label>
                <div className="flex">
                  <Input
                    id="height"
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(Number(e.target.value))}
                  />
                  <span className="ml-2 flex items-center">{t("cm")}</span>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="weight" className="flex items-center">
                  <Weight className="mr-2 h-4 w-4" />
                  {t("weight")}
                </Label>
                <div className="flex">
                  <Input
                    id="weight"
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(Number(e.target.value))}
                  />
                  <span className="ml-2 flex items-center">{t("kg")}</span>
                </div>
              </div>
            </div>
            <Button 
              onClick={handleSaveProfile}
              className="w-full mt-4"
            >
              <Save className="mr-2 h-4 w-4" />
              {t("saveChanges")}
            </Button>
          </div>
          
          <Separator />
          
          {/* Statistics Section */}
          <Statistics />
          
          <Separator />
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium flex items-center">
              <CreditCard className="mr-2 h-5 w-5" />
              {t("subscriptions")}
            </h3>
            
            <SubscriptionOptions onSubscriptionChange={handleSubscriptionChange} />
          </div>
          
          <Separator />
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium flex items-center">
              <Settings className="mr-2 h-5 w-5" />
              {t("preferences")}
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="notifications" className="flex items-center">
                    <Bell className="mr-2 h-4 w-4" />
                    {t("notifications")}
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    {t("notificationsDesc")}
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
                    {t("darkMode")}
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    {t("darkModeDesc")}
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
                    {t("language")}
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    {t("languageDesc")}
                  </p>
                </div>
                <Switch
                  id="language"
                  checked={language === 'en'}
                  onCheckedChange={(checked) => setLanguage(checked ? 'en' : 'ru')}
                />
              </div>
            </div>
          </div>
          
          <Separator />
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium flex items-center">
              <Lock className="mr-2 h-5 w-5" />
              {t("account")}
            </h3>
            <Button 
              variant="destructive" 
              onClick={handleLogout}
              className="w-full bg-red-500 hover:bg-red-600"
            >
              <LogOut className="mr-2 h-4 w-4" />
              {t("logOut")}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
