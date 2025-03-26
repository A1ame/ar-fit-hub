
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GenderSelection from "./GenderSelection";
import ProfileSetup from "./ProfileSetup";
import { authenticateUser } from "@/utils/userUtils";
import { useTheme } from "@/components/theme/ThemeProvider";
import { t } from "@/utils/languageUtils";
import { toast } from "sonner";

type AuthStep = "auth" | "gender" | "profile";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [step, setStep] = useState<AuthStep>("auth");
  const [gender, setGender] = useState<"male" | "female" | null>(null);
  const navigate = useNavigate();
  const { language } = useTheme();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      // Попытка входа в систему
      const user = authenticateUser(email, password);
      if (user) {
        navigate("/dashboard");
      } else {
        toast.error(t("invalidCredentials", language));
      }
    } else {
      // Если регистрация, перейти к выбору пола
      setStep("gender");
    }
  };

  const handleGenderSelect = (selectedGender: "male" | "female") => {
    setGender(selectedGender);
    setStep("profile");
  };

  const handleProfileComplete = (profileData: any) => {
    // Сохранить данные пользователя
    const userData = {
      id: crypto.randomUUID(),
      email,
      password,
      gender,
      ...profileData,
      loggedIn: true,
      createdAt: new Date().toISOString(),
      stats: {
        calories: [0, 0, 0, 0, 0, 0, 0],
        steps: [0, 0, 0, 0, 0, 0, 0],
        workoutsCompleted: 0,
        streakDays: 0
      }
    };
    
    // Добавить нового пользователя
    import("@/utils/userUtils").then(({ addUser, saveCurrentUser }) => {
      addUser(userData);
      saveCurrentUser(userData);
      navigate("/dashboard");
    });
  };

  if (step === "gender") {
    return <GenderSelection onSelect={handleGenderSelect} />;
  }

  if (step === "profile") {
    return <ProfileSetup onComplete={handleProfileComplete} gender={gender || "male"} />;
  }

  return (
    <Card className="w-full max-w-md mx-auto glass-card animate-scale-in border border-arfit-purple/30">
      <CardHeader className="space-y-1">
        <CardTitle className="text-3xl font-bold text-center text-arfit-purple">
          AR-FIT
        </CardTitle>
        <CardDescription className="text-center">
          {t("personalizedFitnessJourney", language)}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue={isLogin ? "login" : "register"} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger 
              value="login" 
              onClick={() => setIsLogin(true)}
              className="data-[state=active]:bg-arfit-purple data-[state=active]:text-white"
            >
              {t("login", language)}
            </TabsTrigger>
            <TabsTrigger 
              value="register" 
              onClick={() => setIsLogin(false)}
              className="data-[state=active]:bg-arfit-purple data-[state=active]:text-white"
            >
              {t("register", language)}
            </TabsTrigger>
          </TabsList>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">{t("email", language)}</Label>
              <Input
                id="email"
                type="email"
                placeholder="example@mail.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="glass-input border-arfit-purple/30 focus:border-arfit-purple"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">{t("password", language)}</Label>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="glass-input border-arfit-purple/30 focus:border-arfit-purple"
              />
            </div>
            <Button type="submit" className="w-full glass-button">
              {isLogin ? t("login", language) : t("continue", language)}
            </Button>
          </form>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-muted-foreground">
          {isLogin ? t("dontHaveAccount", language) : t("alreadyHaveAccount", language)}
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="text-arfit-purple hover:underline ml-1"
          >
            {isLogin ? t("register", language) : t("login", language)}
          </button>
        </p>
      </CardFooter>
    </Card>
  );
};

export default AuthForm;
