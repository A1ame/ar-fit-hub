
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import DailyTasks from "./DailyTasks";
import { generateRandomTasks } from "@/utils/fitnessData";
import { motion } from "framer-motion";

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning";
  if (hour < 18) return "Good Afternoon";
  return "Good Evening";
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
const activityData = [
  { day: "Mon", calories: 320 },
  { day: "Tue", calories: 450 },
  { day: "Wed", calories: 280 },
  { day: "Thu", calories: 590 },
  { day: "Fri", calories: 400 },
  { day: "Sat", calories: 380 },
  { day: "Sun", calories: 240 },
];

const Dashboard = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [tasks, setTasks] = useState<any[]>([]);
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    // Load user data from localStorage
    const storedUser = localStorage.getItem("ar-fit-user");
    if (storedUser) {
      setUserData(JSON.parse(storedUser));
    }
    
    // Load or generate tasks for today
    const today = new Date().toISOString().split('T')[0];
    const storedTasks = localStorage.getItem(`ar-fit-tasks-${today}`);
    
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    } else {
      const newTasks = generateRandomTasks();
      localStorage.setItem(`ar-fit-tasks-${today}`, JSON.stringify(newTasks));
      setTasks(newTasks);
    }
    
    // Animate progress - calculate based on completed tasks
    setTimeout(() => {
      const storedTasks = localStorage.getItem(`ar-fit-tasks-${today}`);
      if (storedTasks) {
        const parsedTasks = JSON.parse(storedTasks);
        const completedPercentage = parsedTasks.filter((t: any) => t.completed).length / parsedTasks.length * 100;
        setProgress(completedPercentage || 0);
      } else {
        setProgress(0);
      }
    }, 500);
  }, []);
  
  // Update the tasks when they change
  const updateTasks = (updatedTasks: any[]) => {
    const today = new Date().toISOString().split('T')[0];
    localStorage.setItem(`ar-fit-tasks-${today}`, JSON.stringify(updatedTasks));
    
    // Update progress
    const completedPercentage = updatedTasks.filter(t => t.completed).length / updatedTasks.length * 100;
    setProgress(completedPercentage || 0);
    setTasks(updatedTasks);
  };
  
  const calculateBMI = () => {
    if (!userData) return "N/A";
    const heightInMeters = userData.height / 100;
    const bmi = userData.weight / (heightInMeters * heightInMeters);
    return bmi.toFixed(1);
  };

  if (!userData) {
    return <div>Loading...</div>;
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
          <Card className="glass-card h-full">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl font-semibold flex items-center gap-2">
                <span className="text-arfit-purple">{getGreeting()},</span>
                <span>{userData.name}</span>
              </CardTitle>
              <CardDescription>Your fitness profile</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="text-left">
                  <p className="text-sm text-muted-foreground">Age</p>
                  <p className="text-xl font-medium">{userData.age} years</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">BMI</p>
                  <p className="text-xl font-medium">{calculateBMI()}</p>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="text-left">
                  <p className="text-sm text-muted-foreground">Weight</p>
                  <p className="text-xl font-medium">{userData.weight} kg</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Height</p>
                  <p className="text-xl font-medium">{userData.height} cm</p>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-1">
                  <p className="text-sm text-muted-foreground">Today's Goal</p>
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
          <Card className="glass-card h-full">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl font-semibold">Weekly Activity</CardTitle>
              <CardDescription>Your calorie burn for the past week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[200px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={userData.stats?.calories ? userData.stats.calories.map((cal, index) => ({
                      day: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][index],
                      calories: cal
                    })) : activityData}
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
