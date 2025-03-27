
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

const bodyPartsList = [
  { id: "back", nameKey: "back", x: 50, y: 30, width: 30, height: 25 },
  { id: "neck", nameKey: "neck", x: 50, y: 15, width: 15, height: 10 },
  { id: "shoulders", nameKey: "shoulders", x: 50, y: 20, width: 40, height: 10 },
  { id: "arms", nameKey: "arms", x: 75, y: 35, width: 15, height: 20 },
  { id: "legs", nameKey: "legs", x: 50, y: 70, width: 30, height: 25 },
  { id: "knees", nameKey: "knees", x: 50, y: 60, width: 20, height: 10 },
  { id: "feet", nameKey: "feet", x: 50, y: 90, width: 20, height: 10 },
  { id: "chest", nameKey: "chest", x: 50, y: 25, width: 30, height: 15 },
  { id: "abdomen", nameKey: "abdomen", x: 50, y: 45, width: 25, height: 15 },
  { id: "none", nameKey: "noProblems", x: 0, y: 0, width: 0, height: 0 },
];

const BodyProblemsSurvey: React.FC<BodyProblemsSurveyProps> = ({ onComplete }) => {
  const [selectedProblems, setSelectedProblems] = useState<string[]>([]);
  const { language } = useTheme();

  const toggleProblem = (id: string) => {
    setSelectedProblems(prev => {
      // Если выбирается "none", снимаем все остальные выборы
      if (id === "none") {
        return prev.includes("none") ? [] : ["none"];
      }
      
      // Если выбирается какая-то часть тела, снимаем выбор с "none"
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
    <Card className="w-full max-w-md mx-auto glass-card animate-scale-in border-4 border-arfit-purple/60 shadow-[0_10px_15px_-3px_rgba(74,42,130,0.3)]">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center text-arfit-purple">
          {t("bodyProblemsSurvey", language)}
        </CardTitle>
        <CardDescription className="text-center">
          {t("bodyProblemsSurveyDesc", language)}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="relative w-full h-[300px]">
          {/* Силуэт человека */}
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <path 
              d="M50,10 Q60,15 60,20 Q65,25 65,35 Q65,45 60,50 Q65,55 65,65 Q60,80 55,90 Q55,95 50,95 Q45,95 45,90 Q40,80 35,65 Q35,55 40,50 Q35,45 35,35 Q35,25 40,20 Q40,15 50,10"
              fill="#f0e6ff"
              stroke="#d8c8ff"
              strokeWidth="1"
            />
            
            {/* Обводка выбранных частей тела */}
            {bodyPartsList.filter(part => part.id !== "none" && selectedProblems.includes(part.id)).map(part => (
              <rect 
                key={part.id}
                x={part.x - part.width/2}
                y={part.y - part.height/2}
                width={part.width} 
                height={part.height}
                fill="rgba(255, 0, 0, 0.3)"
                stroke="rgba(255, 0, 0, 0.7)"
                strokeWidth="1"
                rx="2"
              />
            ))}
          </svg>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          {bodyPartsList.map((part) => (
            <div key={part.id} className="flex items-start space-x-2">
              <Checkbox
                id={part.id}
                checked={selectedProblems.includes(part.id)}
                onCheckedChange={() => toggleProblem(part.id)}
                className="mt-1 data-[state=checked]:bg-arfit-purple data-[state=checked]:border-arfit-purple"
              />
              <Label 
                htmlFor={part.id} 
                className="font-medium cursor-pointer"
              >
                {t(part.nameKey, language)}
              </Label>
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
