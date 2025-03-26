
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Dumbbell, Flame } from "lucide-react";
import { useTheme } from "../theme/ThemeProvider";
import { t } from "@/utils/languageUtils";

interface ExerciseCategory {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  exercises: Exercise[];
}

interface Exercise {
  id: string;
  title: string;
  description: string;
  duration: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  image: string;
}

const getExerciseCategories = (language: "en" | "ru"): ExerciseCategory[] => {
  return [
    {
      id: "strength",
      title: t("strengthTraining", language),
      icon: <Dumbbell className="h-5 w-5" />,
      description: t("strengthDesc", language),
      exercises: [
        {
          id: "push-ups",
          title: t("pushUps", language),
          description: t("pushUpsDesc", language),
          duration: t("pushUpsDuration", language),
          difficulty: "beginner",
          image: "https://images.unsplash.com/photo-1616803689943-5601631c7fec?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
        },
        {
          id: "squats",
          title: t("squats", language),
          description: t("squatsDesc", language),
          duration: t("squatsDuration", language),
          difficulty: "beginner",
          image: "https://images.unsplash.com/photo-1574680178050-55c6a6a96e0a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
        },
        {
          id: "lunges",
          title: t("lunges", language),
          description: t("lungesDesc", language),
          duration: t("lungesDuration", language),
          difficulty: "intermediate",
          image: "https://images.unsplash.com/photo-1597452485669-2c7bb5fef90d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
        },
      ]
    },
    {
      id: "cardio",
      title: t("cardioTraining", language),
      icon: <Heart className="h-5 w-5" />,
      description: t("cardioDesc", language),
      exercises: [
        {
          id: "running",
          title: t("running", language),
          description: t("runningDesc", language),
          duration: t("runningDuration", language),
          difficulty: "intermediate",
          image: "https://images.unsplash.com/photo-1594882645126-14020914d58d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
        },
        {
          id: "jumping-jacks",
          title: t("jumpingJacks", language),
          description: t("jumpingJacksDesc", language),
          duration: t("jumpingJacksDuration", language),
          difficulty: "beginner",
          image: "https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
        },
        {
          id: "burpees",
          title: t("burpees", language),
          description: t("burpeesDesc", language),
          duration: t("burpeesDuration", language),
          difficulty: "advanced",
          image: "https://images.unsplash.com/photo-1599058917765-a780eda07a3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
        },
      ]
    },
    {
      id: "flexibility",
      title: t("warmupStretching", language),
      icon: <Flame className="h-5 w-5" />,
      description: t("flexibilityDesc", language),
      exercises: [
        {
          id: "hamstring-stretch",
          title: t("hamstringStretch", language),
          description: t("hamstringStretchDesc", language),
          duration: t("hamstringStretchDuration", language),
          difficulty: "beginner",
          image: "https://images.unsplash.com/photo-1599447292561-75d5d5b0a044?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
        },
        {
          id: "shoulder-stretch",
          title: t("shoulderStretch", language),
          description: t("shoulderStretchDesc", language),
          duration: t("shoulderStretchDuration", language),
          difficulty: "beginner",
          image: "https://images.unsplash.com/photo-1600881333168-2ef49b341f30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
        },
        {
          id: "hip-flexor",
          title: t("hipFlexorStretch", language),
          description: t("hipFlexorStretchDesc", language),
          duration: t("hipFlexorStretchDuration", language),
          difficulty: "intermediate",
          image: "https://images.unsplash.com/photo-1562771379-eafdca7a02f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
        },
      ]
    }
  ];
};

const Exercises = () => {
  const { language } = useTheme();
  const [selectedTab, setSelectedTab] = useState("strength");
  const exerciseCategories = getExerciseCategories(language);
  
  const getDifficultyBadge = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">{t("beginner", language)}</Badge>;
      case "intermediate":
        return <Badge className="bg-arfit-blue/20 text-arfit-blue-dark hover:bg-arfit-blue/30">{t("intermediate", language)}</Badge>;
      case "advanced":
        return <Badge className="bg-arfit-purple/20 text-arfit-purple hover:bg-arfit-purple/30">{t("advanced", language)}</Badge>;
      default:
        return null;
    }
  };

  return (
    <Card className="glass-card animate-fade-in border border-arfit-purple/30">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-arfit-purple">{t("exercises", language)}</CardTitle>
        <CardDescription>{t("chooseCategory", language)}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Tabs defaultValue="strength" value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-8">
            {exerciseCategories.map((category) => (
              <TabsTrigger 
                key={category.id} 
                value={category.id}
                className="data-[state=active]:bg-arfit-purple data-[state=active]:text-white flex items-center gap-2"
              >
                {category.icon}
                <span className="hidden sm:inline">{category.title}</span>
              </TabsTrigger>
            ))}
          </TabsList>
          
          {exerciseCategories.map((category) => (
            <TabsContent key={category.id} value={category.id} className="space-y-6">
              <p className="text-muted-foreground">{category.description}</p>
              
              <AnimatePresence mode="wait">
                <motion.div 
                  key={category.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {category.exercises.map((exercise) => (
                    <motion.div
                      key={exercise.id}
                      whileHover={{ y: -5 }}
                      className="overflow-hidden rounded-xl glass-card border border-arfit-purple/30"
                    >
                      <div 
                        className="h-48 w-full bg-cover bg-center" 
                        style={{ backgroundImage: `url(${exercise.image})` }}
                      />
                      <div className="p-4">
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="font-semibold text-lg">{exercise.title}</h3>
                          {getDifficultyBadge(exercise.difficulty)}
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">{exercise.description}</p>
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">{exercise.duration}</span>
                          <Button variant="outline" size="sm" className="text-arfit-purple border-arfit-purple hover:bg-arfit-purple hover:text-white">
                            {t("moreDetails", language)}
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default Exercises;
