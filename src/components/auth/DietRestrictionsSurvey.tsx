
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useTheme } from "@/components/theme/ThemeProvider";
import { t } from "@/utils/languageUtils";
import { motion } from "framer-motion";

interface DietRestrictionsSurveyProps {
  onComplete: (restrictions: string[]) => void;
}

const dietRestrictionsList = [
  { id: "lactose", nameKey: "lactoseIntolerant" },
  { id: "gluten", nameKey: "glutenFree" },
  { id: "vegetarian", nameKey: "vegetarian" },
  { id: "vegan", nameKey: "vegan" },
  { id: "nuts", nameKey: "nutsAllergy" },
  { id: "seafood", nameKey: "seafoodAllergy" },
  { id: "citrus", nameKey: "citrusAllergy" },
  { id: "eggs", nameKey: "eggsAllergy" },
  { id: "soy", nameKey: "soyAllergy" },
  { id: "none", nameKey: "noDietRestrictions" },
];

const DietRestrictionsSurvey: React.FC<DietRestrictionsSurveyProps> = ({ onComplete }) => {
  const [selectedRestrictions, setSelectedRestrictions] = useState<string[]>([]);
  const { language } = useTheme();

  const toggleRestriction = (id: string) => {
    setSelectedRestrictions(prev => {
      // Если выбирается "none", снимаем все остальные выборы
      if (id === "none") {
        return prev.includes("none") ? [] : ["none"];
      }
      
      // Если выбирается какое-то ограничение, снимаем выбор с "none"
      const withoutNone = prev.filter(p => p !== "none");
      
      if (prev.includes(id)) {
        return withoutNone.filter(p => p !== id);
      } else {
        return [...withoutNone, id];
      }
    });
  };

  const handleSubmit = () => {
    onComplete(selectedRestrictions);
  };

  return (
    <Card className="w-full max-w-md mx-auto glass-card animate-scale-in border-4 border-arfit-purple/60 shadow-[0_10px_15px_-3px_rgba(74,42,130,0.3)]">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center text-arfit-purple">
          {t("dietRestrictionsSurvey", language)}
        </CardTitle>
        <CardDescription className="text-center">
          {t("dietRestrictionsSurveyDesc", language)}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 gap-4">
          {dietRestrictionsList.map((restriction) => (
            <motion.div 
              key={restriction.id} 
              className="flex items-start space-x-3 p-3 border border-arfit-purple/20 rounded-lg hover:bg-arfit-purple/5 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Checkbox
                id={restriction.id}
                checked={selectedRestrictions.includes(restriction.id)}
                onCheckedChange={() => toggleRestriction(restriction.id)}
                className="mt-1 data-[state=checked]:bg-arfit-purple data-[state=checked]:border-arfit-purple"
              />
              <Label 
                htmlFor={restriction.id} 
                className="font-medium cursor-pointer w-full"
              >
                {t(restriction.nameKey, language)}
              </Label>
            </motion.div>
          ))}
        </div>
        
        <Button
          onClick={handleSubmit}
          className="w-full glass-button mt-4"
          disabled={selectedRestrictions.length === 0}
        >
          {t("continue", language)}
        </Button>
      </CardContent>
    </Card>
  );
};

export default DietRestrictionsSurvey;
