
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
  { id: "back", nameKey: "backPain", x: 50, y: 34, width: 28, height: 20 },
  { id: "neck", nameKey: "neck", x: 50, y: 12, width: 12, height: 8 },
  { id: "shoulders", nameKey: "shoulders", x: 50, y: 18, width: 38, height: 8 },
  { id: "arms", nameKey: "arms", x: 33, y: 30, width: 12, height: 25, side: "left" },
  { id: "arms", nameKey: "arms", x: 67, y: 30, width: 12, height: 25, side: "right" },
  { id: "legs", nameKey: "legs", x: 40, y: 75, width: 12, height: 30, side: "left" },
  { id: "legs", nameKey: "legs", x: 60, y: 75, width: 12, height: 30, side: "right" },
  { id: "knees", nameKey: "knees", x: 40, y: 60, width: 10, height: 8, side: "left" },
  { id: "knees", nameKey: "knees", x: 60, y: 60, width: 10, height: 8, side: "right" },
  { id: "feet", nameKey: "feet", x: 40, y: 95, width: 12, height: 5, side: "left" },
  { id: "feet", nameKey: "feet", x: 60, y: 95, width: 12, height: 5, side: "right" },
  { id: "chest", nameKey: "chest", x: 50, y: 25, width: 30, height: 10 },
  { id: "abdomen", nameKey: "abdomen", x: 50, y: 40, width: 20, height: 15 },
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
        <div className="relative w-full h-[350px] bg-white/30 rounded-lg p-4">
          {/* Human figure - improved version */}
          <svg viewBox="0 0 100 100" className="w-full h-full">
            {/* Head */}
            <circle 
              cx="50" cy="10" r="6" 
              fill={selectedProblems.includes("neck") ? "rgba(255, 0, 0, 0.5)" : "#f0e6ff"} 
              stroke="#d8c8ff" 
              strokeWidth="1" 
            />
            
            {/* Neck */}
            <rect 
              x="48" y="16" width="4" height="4" 
              fill={selectedProblems.includes("neck") ? "rgba(255, 0, 0, 0.5)" : "#f0e6ff"}
              stroke="#d8c8ff" 
              strokeWidth="1" 
            />
            
            {/* Torso */}
            <path 
              d="M40,20 Q50,18 60,20 L60,45 Q50,50 40,45 Z" 
              fill={selectedProblems.includes("chest") || selectedProblems.includes("back") ? "rgba(255, 0, 0, 0.5)" : "#f0e6ff"}
              stroke="#d8c8ff" 
              strokeWidth="1"
            />
            
            {/* Abdomen */}
            <rect 
              x="40" y="38" width="20" height="15" 
              fill={selectedProblems.includes("abdomen") ? "rgba(255, 0, 0, 0.5)" : "#f0e6ff"}
              stroke="#d8c8ff" 
              strokeWidth="1" 
              rx="2"
            />
            
            {/* Shoulders */}
            <ellipse 
              cx="35" cy="22" rx="5" ry="3" 
              fill={selectedProblems.includes("shoulders") ? "rgba(255, 0, 0, 0.5)" : "#f0e6ff"}
              stroke="#d8c8ff" 
              strokeWidth="1"
            />
            <ellipse 
              cx="65" cy="22" rx="5" ry="3" 
              fill={selectedProblems.includes("shoulders") ? "rgba(255, 0, 0, 0.5)" : "#f0e6ff"}
              stroke="#d8c8ff" 
              strokeWidth="1"
            />
            
            {/* Arms */}
            <path 
              d="M30,23 L26,35 Q24,40 22,45" 
              stroke={selectedProblems.includes("arms") ? "rgba(255, 0, 0, 0.8)" : "#d8c8ff"}
              fill="none"
              strokeWidth="5" 
              strokeLinecap="round"
            />
            <path 
              d="M70,23 L74,35 Q76,40 78,45" 
              stroke={selectedProblems.includes("arms") ? "rgba(255, 0, 0, 0.8)" : "#d8c8ff"}
              fill="none"
              strokeWidth="5" 
              strokeLinecap="round"
            />
            
            {/* Legs */}
            <path 
              d="M45,45 L40,75 L38,95" 
              stroke={selectedProblems.includes("legs") ? "rgba(255, 0, 0, 0.8)" : "#d8c8ff"}
              fill="none"
              strokeWidth="5" 
              strokeLinecap="round"
            />
            <path 
              d="M55,45 L60,75 L62,95" 
              stroke={selectedProblems.includes("legs") ? "rgba(255, 0, 0, 0.8)" : "#d8c8ff"}
              fill="none"
              strokeWidth="5" 
              strokeLinecap="round"
            />
            
            {/* Knees - improved */}
            <ellipse 
              cx="40" cy="60" rx="4" ry="4" 
              fill={selectedProblems.includes("knees") ? "rgba(255, 0, 0, 0.8)" : "#f0e6ff"}
              stroke="#d8c8ff" 
              strokeWidth="1" 
            />
            <ellipse 
              cx="60" cy="60" rx="4" ry="4" 
              fill={selectedProblems.includes("knees") ? "rgba(255, 0, 0, 0.8)" : "#f0e6ff"}
              stroke="#d8c8ff" 
              strokeWidth="1" 
            />
            
            {/* Feet */}
            <path 
              d="M38,95 L34,95" 
              stroke={selectedProblems.includes("feet") ? "rgba(255, 0, 0, 0.8)" : "#d8c8ff"}
              strokeWidth="3" 
              strokeLinecap="round"
            />
            <path 
              d="M62,95 L66,95" 
              stroke={selectedProblems.includes("feet") ? "rgba(255, 0, 0, 0.8)" : "#d8c8ff"}
              strokeWidth="3" 
              strokeLinecap="round"
            />
          </svg>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          {/* Removing duplicates from the checkboxes list */}
          {[...new Set(bodyPartsList.map(part => part.id))].map((id) => {
            const part = bodyPartsList.find(p => p.id === id);
            if (!part) return null;
            
            return (
              <div key={id} className="flex items-start space-x-2">
                <Checkbox
                  id={id}
                  checked={selectedProblems.includes(id)}
                  onCheckedChange={() => toggleProblem(id)}
                  className="mt-1 data-[state=checked]:bg-arfit-purple data-[state=checked]:border-arfit-purple"
                />
                <Label 
                  htmlFor={id} 
                  className="font-medium cursor-pointer"
                >
                  {t(part.nameKey, language)}
                </Label>
              </div>
            );
          })}
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
