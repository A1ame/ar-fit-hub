
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useTheme } from "@/components/theme/ThemeProvider";
import { t } from "@/utils/languageUtils";

interface ProfileSetupProps {
  onComplete: (profileData: any) => void;
  gender: "male" | "female";
}

const ProfileSetup: React.FC<ProfileSetupProps> = ({ onComplete, gender }) => {
  const [age, setAge] = useState(30);
  const [weight, setWeight] = useState(70);
  const [height, setHeight] = useState(170);
  const [name, setName] = useState("");
  const { language } = useTheme();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete({
      name,
      age,
      weight,
      height,
      fitnessLevel: "beginner", // Значение по умолчанию
      createdAt: new Date().toISOString(),
    });
  };

  return (
    <Card className="w-full max-w-md mx-auto glass-card animate-scale-in border border-arfit-purple/30">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center text-arfit-purple">{t("completeProfile", language)}</CardTitle>
        <CardDescription className="text-center">
          {t("completeProfileDesc", language)}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">{t("yourName", language)}</Label>
            <Input
              id="name"
              placeholder={t("enterName", language)}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="glass-input border-arfit-purple/30 focus:border-arfit-purple"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="age">{t("age", language)}: {age} {t("years", language)}</Label>
            <Slider
              id="age"
              min={16}
              max={80}
              step={1}
              value={[age]}
              onValueChange={(value) => setAge(value[0])}
              className="py-4"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="weight">{t("weight", language)}: {weight} {t("kg", language)}</Label>
            <Slider
              id="weight"
              min={40}
              max={150}
              step={1}
              value={[weight]}
              onValueChange={(value) => setWeight(value[0])}
              className="py-4"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="height">{t("height", language)}: {height} {t("cm", language)}</Label>
            <Slider
              id="height"
              min={140}
              max={220}
              step={1}
              value={[height]}
              onValueChange={(value) => setHeight(value[0])}
              className="py-4"
            />
          </div>
          
          <Button type="submit" className="w-full glass-button">
            {t("complete", language)}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ProfileSetup;
