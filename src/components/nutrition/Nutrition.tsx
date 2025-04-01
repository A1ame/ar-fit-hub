
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Utensils } from "lucide-react";
import { useTheme } from "../theme/ThemeProvider";
import { t } from "@/utils/languageUtils";

const Nutrition = () => {
  const { language } = useTheme();
  
  return (
    <Card className="glass-card border border-arfit-purple/30">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-arfit-purple">{t("nutrition", language)}</CardTitle>
        <CardDescription>{t("trackYourCalories", language)}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center py-4">
        <div className="w-16 h-16 rounded-full bg-arfit-purple/10 flex items-center justify-center mb-4">
          <Utensils className="h-8 w-8 text-arfit-purple" />
        </div>
        
        <p className="text-sm text-muted-foreground text-center max-w-md">
          {t("nutritionDesc", language) || "Отслеживайте питание и достигайте своих целей"}
        </p>
      </CardContent>
    </Card>
  );
};

export default Nutrition;
