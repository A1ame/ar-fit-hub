
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import DailyTasks from "./DailyTasks";
import { generateRandomTasks, getTasksForDate } from "@/utils/fitnessData";
import { motion } from "framer-motion";
import { useTheme } from "../theme/ThemeProvider";
import { t } from "@/utils/languageUtils";

const CALORIES_PER_TASK = {
  strength: 150,
  cardio: 250,
  flexibility: 80
};

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "goodMorning";
  if (hour < 18) return "goodAfternoon";
  return "goodEvening";
};

interface UserData {
  name: string;
  gender: "male" | "female";
  age: number;
  weight: number;
  height: number;
  loggedIn: boolean;
  createdAt: string;
  stats?: {
    calories: number[];
    steps: number[];
    workoutsCompleted: number;
    streakDays: number;
  };
}

// Sample data for the chart
const defaultActivityData = [
  { day: "Mon", calories: 0 },
  { day: "Tue", calories: 0 },
  { day: "Wed", calories: 0 },
  { day: "Thu", calories: 0 },
  { day: "Fri", calories: 0 },
  { day: "Sat", calories: 0 },
  { day: "Sun", calories: 0 },
];

const translateDays = (days: string[], language: string) => {
  if (language === "ru") {
    const russianDays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
    return days.map((day, index) => ({
      ...day,
      day: russianDays[index]
    }));
  }
  return days;
};

const Dashboard = () => {
  const { language } = useTheme();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [tasks, setTasks] = useState<any[]>([]);
  const [progress, setProgress] = useState(0);
  const [activityData, setActivityData] = useState(() => {
    const days = language === "ru" 
      ? [{ day: "Пн", calories: 0 }, { day: "Вт", calories: 0 }, { day: "Ср", calories: 0 }, 
         { day: "Чт", calories: 0 }, { day: "Пт", calories: 0 }, { day: "Сб", calories: 0 }, 
         { day: "Вс", calories: 0 }]
      : defaultActivityData;
    return days;
  });
  
  // Calculate calories burned based on completed tasks
  const calculateCaloriesBurned = (tasks: any[]) => {
    return tasks.reduce((total, task) => {
      if (task.completed) {
        return total + (CALORIES_PER_TASK[task.category] || 0);
      }
      return total;
    }, 0);
  };
  
  // Update activity data for the current day
  const updateActivityData = (caloriesBurned: number) => {
    const today = new Date().getDay();
    // Convert to 0-6 where 0 is Monday (not Sunday)
    const dayIndex = today === 0 ? 6 : today - 1;
    
    // Update chart data immediately
    const newActivityData = [...activityData];
    newActivityData[dayIndex] = {
      ...newActivityData[dayIndex],
      calories: caloriesBurned
    };
    setActivityData(newActivityData);
    
    // Get current user data to update stats
    const currentUser = userData;
    if (currentUser && currentUser.stats) {
      const newCalories = [...currentUser.stats.calories];
      newCalories[dayIndex] = caloriesBurned;
      
      // Update user stats
      const updatedUser = {
        ...currentUser,
        stats: {
          ...currentUser.stats,
          calories: newCalories
        }
      };
      
      // Save updated user data
      localStorage.setItem("ar-fit-user", JSON.stringify(updatedUser));
      setUserData(updatedUser);
    }
  };
  
  useEffect(() => {
    // Load user data from localStorage
    const storedUser = localStorage.getItem("ar-fit-user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUserData(parsedUser);
      
      // Initialize activity data from user stats
      if (parsedUser.stats && parsedUser.stats.calories) {
        const days = language === "ru" 
          ? ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"] 
          : ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

        const newActivityData = parsedUser.stats.calories.map((cal: number, index: number) => ({
          day: days[index],
          calories: cal
        }));
        setActivityData(newActivityData);
      }
    }
    
    // Load or generate tasks for today
    const today = new Date().toISOString().split('T')[0];
    const storedTasks = localStorage.getItem(`ar-fit-tasks-${today}`);
    
    if (storedTasks) {
      const parsedTasks = JSON.parse(storedTasks);
      setTasks(parsedTasks);
      
      // Calculate progress
      const completedPercentage = parsedTasks.filter((t: any) => t.completed).length / parsedTasks.length * 100;
      setProgress(completedPercentage || 0);
      
      // Calculate calories burned
      const calories = calculateCaloriesBurned(parsedTasks);
      updateActivityData(calories);
    } else {
      const newTasks = generateRandomTasks();
      localStorage.setItem(`ar-fit-tasks-${today}`, JSON.stringify(newTasks));
      setTasks(newTasks);
      setProgress(0);
    }
  }, [language]);
  
  // Update the tasks when they change
  const updateTasks = (updatedTasks: any[]) => {
    const today = new Date().toISOString().split('T')[0];
    localStorage.setItem(`ar-fit-tasks-${today}`, JSON.stringify(updatedTasks));
    
    // Update progress
    const completedPercentage = updatedTasks.filter(t => t.completed).length / updatedTasks.length * 100;
    setProgress(completedPercentage || 0);
    
    // Calculate calories burned and update activity data immediately
    const calories = calculateCaloriesBurned(updatedTasks);
    updateActivityData(calories);
    
    setTasks(updatedTasks);
  };
  
  const calculateBMI = () => {
    if (!userData) return "N/A";
    const heightInMeters = userData.height / 100;
    const bmi = userData.weight / (heightInMeters * heightInMeters);
    return bmi.toFixed(1);
  };

  if (!userData) {
    return <div>{t("loading", language)}</div>;
  }

  return (
    <div className="w-full animate-fade-in space-y-6">
      <div className="flex flex-col md:flex-row gap-6">
        {/* User stats card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="w-full md:w-1/3"
        >
          <Card className="glass-card h-full border border-arfit-purple/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl font-semibold flex items-center gap-2">
                <span className="text-arfit-purple">{t(getGreeting(), language)},</span>
                <span>{userData.name}</span>
              </CardTitle>
              <CardDescription>{t("yourFitnessProfile", language)}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="text-left">
                  <p className="text-sm text-muted-foreground">{t("age", language)}</p>
                  <p className="text-xl font-medium">{userData.age} {t("years", language)}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">BMI</p>
                  <p className="text-xl font-medium">{calculateBMI()}</p>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="text-left">
                  <p className="text-sm text-muted-foreground">{t("weight", language)}</p>
                  <p className="text-xl font-medium">{userData.weight} kg</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">{t("height", language)}</p>
                  <p className="text-xl font-medium">{userData.height} cm</p>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-1">
                  <p className="text-sm text-muted-foreground">{t("todaysGoal", language)}</p>
                  <Badge variant="outline" className="bg-arfit-purple/10 text-arfit-purple">
                    {progress.toFixed(0)}%
                  </Badge>
                </div>
                <Progress value={progress} className="h-2 bg-muted" />
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        {/* Activity chart */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="w-full md:w-2/3"
        >
          <Card className="glass-card h-full border border-arfit-purple/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl font-semibold">{t("weeklyActivity", language)}</CardTitle>
              <CardDescription>{t("caloriesBurn", language)}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[200px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={activityData}
                    margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: "rgba(255, 255, 255, 0.8)",
                        borderRadius: "0.5rem",
                        border: "none",
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)"
                      }}
                      formatter={(value) => [`${value} ${t("calories", language)}`, '']}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="calories" 
                      stroke="#4A2A82" 
                      strokeWidth={2}
                      activeDot={{ r: 8, fill: "#9B87F5" }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
      
      {/* Daily tasks */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <DailyTasks tasks={tasks} updateTasks={updateTasks} />
      </motion.div>
    </div>
  );
};

export default Dashboard;
