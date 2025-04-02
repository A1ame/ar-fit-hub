
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Utensils } from "lucide-react";
import { t } from "@/utils/languageUtils";

const Nutrition = () => {
  return (
    <Card className="glass-card border border-arfit-purple/30">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-arfit-purple">{t("nutrition")}</CardTitle>
        <CardDescription>{t("trackYourCalories")}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center py-4">
        <div className="w-16 h-16 rounded-full bg-arfit-purple/10 flex items-center justify-center mb-4">
          <Utensils className="h-8 w-8 text-arfit-purple" />
        </div>
        
        <p className="text-sm text-muted-foreground text-center max-w-md">
          {t("nutritionDesc")}
        </p>
      </CardContent>
    </Card>
  );
};

export default Nutrition;
