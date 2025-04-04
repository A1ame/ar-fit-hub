
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useTheme } from "@/components/theme/ThemeProvider";
import { t } from "@/utils/languageUtils";
import { motion } from "framer-motion";

interface BodyProblemsSurveyProps {
  onComplete: (problems: string[]) => void;
}

// Define body parts with their respective details
const bodyPartsList = [
  { id: "back", nameKey: "backPain", icon: "M" },
  { id: "neck", nameKey: "neck", icon: "M" },
  { id: "shoulders", nameKey: "shoulders", icon: "M" },
  { id: "arms", nameKey: "arms", icon: "M" },
  { id: "legs", nameKey: "legs", icon: "M" },
  { id: "knees", nameKey: "knees", icon: "M" },
  { id: "feet", nameKey: "feet", icon: "M" },
  { id: "chest", nameKey: "chest", icon: "M" },
  { id: "abdomen", nameKey: "abdomen", icon: "M" },
  { id: "none", nameKey: "noProblems", icon: "✓" },
];

const BodyProblemsSurvey: React.FC<BodyProblemsSurveyProps> = ({ onComplete }) => {
  const [selectedProblems, setSelectedProblems] = useState<string[]>([]);
  const { language } = useTheme();

  const toggleProblem = (id: string) => {
    setSelectedProblems(prev => {
      // If "none" is selected, clear all other selections
      if (id === "none") {
        return prev.includes("none") ? [] : ["none"];
      }
      
      // If any part is selected, remove "none" from selection
      const withoutNone = prev.filter(p => p !== "none");
      
      if (prev.includes(id)) {
        return withoutNone.filter(p => p !== id);
      } else {
        return [...withoutNone, id];
      }
    });
  };

  const handleSubmit = () => {
    onComplete(selectedProblems);
  };

  return (
    <Card className="w-full max-w-md mx-auto glass-card border-arfit-purple/60 shadow-[0_10px_15px_-3px_rgba(74,42,130,0.3)]">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center text-arfit-purple text-3d">
          {t("bodyProblemsSurvey", language)}
        </CardTitle>
        <CardDescription className="text-center">
          {t("bodyProblemsSurveyDesc", language)}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {bodyPartsList.map((part) => (
            <div 
              key={part.id}
              onClick={() => toggleProblem(part.id)}
              className={`
                cursor-pointer rounded-lg p-3 flex flex-col items-center justify-center
                transition-all duration-200 border-2
                ${selectedProblems.includes(part.id) 
                  ? 'border-arfit-purple bg-arfit-purple/20' 
                  : 'border-arfit-purple/20 hover:border-arfit-purple/40 bg-white/40'}
              `}
            >
              <div className={`
                w-14 h-14 rounded-full flex items-center justify-center text-2xl mb-2
                ${selectedProblems.includes(part.id) ? 'bg-arfit-purple text-white' : 'bg-arfit-purple/10 text-arfit-purple'}
              `}>
                {part.id === "none" ? "✓" : part.id.charAt(0).toUpperCase()}
              </div>
              <span className="text-sm font-medium text-center">{t(part.nameKey, language)}</span>
            </div>
          ))}
        </div>
        
        <Button
          onClick={handleSubmit}
          className="w-full glass-button mt-4"
          disabled={selectedProblems.length === 0}
        >
          {t("continue", language)}
        </Button>
      </CardContent>
    </Card>
  );
};

export default BodyProblemsSurvey;
