
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Utensils } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "../theme/ThemeProvider";
import { t } from "@/utils/languageUtils";

const Nutrition = () => {
  const { language } = useTheme();
  
  return (
    <Card className="glass-card animate-fade-in border border-arfit-purple/30">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-arfit-purple">{t("nutrition", language)}</CardTitle>
        <CardDescription>{t("nutritionDesc", language)}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center py-12">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
        >
          <div className="w-24 h-24 rounded-full bg-arfit-purple/10 flex items-center justify-center mb-6">
            <Utensils className="h-12 w-12 text-arfit-purple" />
          </div>
        </motion.div>
        
        <h3 className="text-xl font-semibold mb-2">{t("comingSoon", language)}</h3>
        <p className="text-sm text-muted-foreground text-center max-w-md">
          {t("nutritionComingSoonDesc", language)}
        </p>
      </CardContent>
    </Card>
  );
};

export default Nutrition;
