
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Dumbbell, Flame } from "lucide-react";

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

const exerciseCategories: ExerciseCategory[] = [
  {
    id: "strength",
    title: "Strength Training",
    icon: <Dumbbell className="h-5 w-5" />,
    description: "Build muscle and improve strength with these resistance exercises",
    exercises: [
      {
        id: "push-ups",
        title: "Push-ups",
        description: "Classic chest and triceps exercise",
        duration: "3 sets x 10-15 reps",
        difficulty: "beginner",
        image: "https://images.unsplash.com/photo-1616803689943-5601631c7fec?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
      },
      {
        id: "squats",
        title: "Bodyweight Squats",
        description: "Lower body strength and mobility",
        duration: "3 sets x 15-20 reps",
        difficulty: "beginner",
        image: "https://images.unsplash.com/photo-1574680178050-55c6a6a96e0a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
      },
      {
        id: "lunges",
        title: "Lunges",
        description: "Single leg strength and balance",
        duration: "3 sets x 12 reps each leg",
        difficulty: "intermediate",
        image: "https://images.unsplash.com/photo-1597452485669-2c7bb5fef90d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
      },
    ]
  },
  {
    id: "cardio",
    title: "Cardio Training",
    icon: <Heart className="h-5 w-5" />,
    description: "Improve cardiovascular health and endurance",
    exercises: [
      {
        id: "running",
        title: "Interval Running",
        description: "Alternating between sprinting and jogging",
        duration: "20-30 minutes",
        difficulty: "intermediate",
        image: "https://images.unsplash.com/photo-1594882645126-14020914d58d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
      },
      {
        id: "jumping-jacks",
        title: "Jumping Jacks",
        description: "Full body cardio exercise",
        duration: "3 sets x 1 minute",
        difficulty: "beginner",
        image: "https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
      },
      {
        id: "burpees",
        title: "Burpees",
        description: "High-intensity full body exercise",
        duration: "3 sets x 10 reps",
        difficulty: "advanced",
        image: "https://images.unsplash.com/photo-1599058917765-a780eda07a3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
      },
    ]
  },
  {
    id: "flexibility",
    title: "Warm-up & Stretching",
    icon: <Flame className="h-5 w-5" />,
    description: "Improve flexibility and prevent injuries",
    exercises: [
      {
        id: "hamstring-stretch",
        title: "Hamstring Stretch",
        description: "Seated forward bend",
        duration: "Hold for 30 seconds x 3 sets",
        difficulty: "beginner",
        image: "https://images.unsplash.com/photo-1599447292561-75d5d5b0a044?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
      },
      {
        id: "shoulder-stretch",
        title: "Shoulder Stretch",
        description: "Across body stretch for shoulders",
        duration: "Hold for 20 seconds each side x 3 sets",
        difficulty: "beginner",
        image: "https://images.unsplash.com/photo-1600881333168-2ef49b341f30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
      },
      {
        id: "hip-flexor",
        title: "Hip Flexor Stretch",
        description: "Lunge position stretch for hip flexors",
        duration: "Hold for 30 seconds each side x 3 sets",
        difficulty: "intermediate",
        image: "https://images.unsplash.com/photo-1562771379-eafdca7a02f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
      },
    ]
  }
];

const Exercises = () => {
  const [selectedTab, setSelectedTab] = useState("strength");
  
  const getDifficultyBadge = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Beginner</Badge>;
      case "intermediate":
        return <Badge className="bg-arfit-blue/20 text-arfit-blue-dark hover:bg-arfit-blue/30">Intermediate</Badge>;
      case "advanced":
        return <Badge className="bg-arfit-purple/20 text-arfit-purple hover:bg-arfit-purple/30">Advanced</Badge>;
      default:
        return null;
    }
  };

  return (
    <Card className="glass-card animate-fade-in">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-arfit-purple">Exercises</CardTitle>
        <CardDescription>Choose your workout category</CardDescription>
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
                      className="overflow-hidden rounded-xl glass-card"
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
                            Details
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
