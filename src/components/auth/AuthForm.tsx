
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GenderSelection from "./GenderSelection";
import ProfileSetup from "./ProfileSetup";

type AuthStep = "auth" | "gender" | "profile";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [step, setStep] = useState<AuthStep>("auth");
  const [gender, setGender] = useState<"male" | "female" | null>(null);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      // Login logic would go here in a real application
      // For now, we'll just navigate to the dashboard
      localStorage.setItem("ar-fit-user", JSON.stringify({ email, loggedIn: true }));
      navigate("/dashboard");
    } else {
      // If registering, move to gender selection
      setStep("gender");
    }
  };

  const handleGenderSelect = (selectedGender: "male" | "female") => {
    setGender(selectedGender);
    setStep("profile");
  };

  const handleProfileComplete = (profileData: any) => {
    // Store user data in localStorage (in a real app, this would go to a backend)
    localStorage.setItem("ar-fit-user", JSON.stringify({
      email,
      gender,
      ...profileData,
      loggedIn: true
    }));
    navigate("/dashboard");
  };

  if (step === "gender") {
    return <GenderSelection onSelect={handleGenderSelect} />;
  }

  if (step === "profile") {
    return <ProfileSetup onComplete={handleProfileComplete} gender={gender || "male"} />;
  }

  return (
    <Card className="w-full max-w-md mx-auto glass-card animate-scale-in">
      <CardHeader className="space-y-1">
        <CardTitle className="text-3xl font-bold text-center text-arfit-purple">
          AR-FIT
        </CardTitle>
        <CardDescription className="text-center">
          Your personalized fitness journey starts here
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
              Login
            </TabsTrigger>
            <TabsTrigger 
              value="register" 
              onClick={() => setIsLogin(false)}
              className="data-[state=active]:bg-arfit-purple data-[state=active]:text-white"
            >
              Register
            </TabsTrigger>
          </TabsList>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="glass-input"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="glass-input"
              />
            </div>
            <Button type="submit" className="w-full glass-button">
              {isLogin ? "Login" : "Continue"}
            </Button>
          </form>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-muted-foreground">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="text-arfit-purple hover:underline"
          >
            {isLogin ? "Register" : "Login"}
          </button>
        </p>
      </CardFooter>
    </Card>
  );
};

export default AuthForm;
