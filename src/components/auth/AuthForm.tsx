
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GenderSelection from "./GenderSelection";
import ProfileSetup from "./ProfileSetup";
import { authenticateUser } from "@/utils/userUtils";
import { useTheme } from "@/components/theme/ThemeProvider";
import { t } from "@/utils/languageUtils";
import { toast } from "sonner";
import { ChevronLeft, Globe, Dumbbell } from "lucide-react";
import { v4 as uuidv4 } from 'uuid';

type AuthStep = "auth" | "gender" | "profile";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [step, setStep] = useState<AuthStep>("auth");
  const [gender, setGender] = useState<"male" | "female" | null>(null);
  const navigate = useNavigate();
  const { language, setLanguage } = useTheme();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      const user = authenticateUser(email, password);
      if (user) {
        navigate("/dashboard");
      } else {
        toast.error(t("invalidCredentials", language));
      }
    } else {
      setStep("gender");
    }
  };

  const handleGenderSelect = (selectedGender: "male" | "female") => {
    setGender(selectedGender);
    setStep("profile");
  };

  const handleProfileComplete = (profileData: any) => {
    const userData = {
      id: uuidv4(),
      email,
      password,
      gender,
      bodyProblems: [],
      dietRestrictions: [],
      ...profileData,
      loggedIn: true,
      createdAt: new Date().toISOString(),
      stats: {
        calories: [0, 0, 0, 0, 0, 0, 0],
        steps: [0, 0, 0, 0, 0, 0, 0],
        workoutsCompleted: 0,
        streakDays: 0
      },
      subscriptions: {
        workout: null,
        nutrition: null
      }
    };
    
    import("@/utils/userUtils").then(({ addUser, saveCurrentUser }) => {
      try {
        addUser(userData);
        saveCurrentUser(userData);
        navigate("/dashboard");
      } catch (error) {
        console.error("Registration error:", error);
        toast.error(String(error));
      }
    });
  };

  const goBack = () => {
    if (step === "gender") {
      setStep("auth");
    } else if (step === "profile") {
      setStep("gender");
    }
  };

  if (step === "gender") {
    return (
      <>
        <Button 
          onClick={goBack} 
          variant="ghost" 
          className="absolute top-4 left-4 flex items-center p-2"
        >
          <ChevronLeft className="w-5 h-5 mr-1" />
          {t("goBack", language)}
        </Button>
        <GenderSelection onSelect={handleGenderSelect} />
      </>
    );
  }

  if (step === "profile") {
    return (
      <>
        <Button 
          onClick={goBack} 
          variant="ghost" 
          className="absolute top-4 left-4 flex items-center p-2"
        >
          <ChevronLeft className="w-5 h-5 mr-1" />
          {t("goBack", language)}
        </Button>
        <ProfileSetup onComplete={handleProfileComplete} gender={gender || "male"} />
      </>
    );
  }

  const welcomeText = t("welcome", language);

  return (
    <Card className="w-full max-w-md mx-auto glass-card animate-scale-in border-arfit-purple/60 shadow-[0_10px_15px_-3px_rgba(74,42,130,0.3)]">
      <CardHeader className="pb-2">
        <CardTitle className="text-3xl font-bold text-center text-arfit-purple text-3d">
          {welcomeText}
        </CardTitle>
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
            <Button 
              type="submit" 
              className={`w-full glass-button ${isMobile ? 'py-3 text-base' : ''}`}
            >
              {isLogin ? t("login", language) : t("continue", language)}
            </Button>
          </form>
        </Tabs>
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        <p className="text-sm text-muted-foreground">
          {isLogin ? t("dontHaveAccount", language) : t("alreadyHaveAccount", language)}
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="text-arfit-purple hover:underline ml-1"
          >
            {isLogin ? t("register", language) : t("login", language)}
          </button>
        </p>
        
        <div className="flex justify-center items-center gap-2 text-sm">
          <Globe className="h-4 w-4" />
          <button
            onClick={() => setLanguage(language === "ru" ? "en" : "ru")}
            className="text-arfit-purple hover:underline"
          >
            {language === "ru" ? "English" : "Русский"}
          </button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default AuthForm;
