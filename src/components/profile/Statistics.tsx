
import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTheme } from "../theme/ThemeProvider";
import { t } from "@/utils/languageUtils";
import { BarChart3, Calendar as CalendarIcon } from "lucide-react";
import { getCurrentUser } from "@/utils/userUtils";

interface DailyStatProps {
  date: Date;
  caloriesBurned: number;
  caloriesConsumed: number;
  weight: number;
  height: number;
  language: 'en' | 'ru';
}

const DailyStatDetails = ({ date, caloriesBurned, caloriesConsumed, weight, height, language }: DailyStatProps) => {
  const formattedDate = format(date, 'PP');
  
  return (
    <div className="space-y-4 p-2">
      <h3 className="font-medium">{formattedDate}</h3>
      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-sm text-muted-foreground">{t("caloriesBurned", language)}:</span>
          <span className="font-medium">{caloriesBurned}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-muted-foreground">{t("caloriesConsumed", language)}:</span>
          <span className="font-medium">{caloriesConsumed}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-muted-foreground">{t("currentWeight", language)}:</span>
          <span className="font-medium">{weight} {t("kg", language)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-muted-foreground">{t("currentHeight", language)}:</span>
          <span className="font-medium">{height} {t("cm", language)}</span>
        </div>
      </div>
    </div>
  );
};

const Statistics = () => {
  const { language } = useTheme();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [showMonthlyView, setShowMonthlyView] = useState(false);
  const [todayStats, setTodayStats] = useState({
    caloriesBurned: 0,
    caloriesConsumed: 0,
    weight: 0,
    height: 0
  });
  const [monthlyData, setMonthlyData] = useState<any[]>([]);
  
  // Get calories burned from user stats
  const getTodayCaloriesBurned = () => {
    const user = getCurrentUser();
    if (user && user.stats && user.stats.calories) {
      const today = new Date().getDay();
      const dayIndex = today === 0 ? 6 : today - 1; // Convert to 0-6 where 0 is Monday
      return user.stats.calories[dayIndex] || 0;
    }
    return 0;
  };
  
  // Get calories consumed from meals
  const getTodayCaloriesConsumed = () => {
    const user = getCurrentUser();
    if (user && user.meals) {
      const today = new Date().toISOString().split('T')[0];
      const todayMeals = user.meals.filter((meal: any) => 
        meal.date.startsWith(today)
      );
      
      return todayMeals.reduce((sum: number, meal: any) => sum + meal.calories, 0);
    }
    return 0;
  };
  
  // Generate monthly data for chart
  const generateMonthlyData = () => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    
    const user = getCurrentUser();
    if (!user) return [];
    
    const data = [];
    
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(currentYear, currentMonth, i);
      const dateString = format(date, 'yyyy-MM-dd');
      
      // Get calorie data for this day
      let caloriesConsumed = 0;
      if (user.meals) {
        const dayMeals = user.meals.filter((meal: any) => 
          meal.date.startsWith(dateString)
        );
        caloriesConsumed = dayMeals.reduce((sum: number, meal: any) => sum + meal.calories, 0);
      }
      
      // For calories burned, we just use what we have for the current week
      // In a real app, historical data would be available
      let caloriesBurned = 0;
      if (date.getDate() === currentDate.getDate()) {
        caloriesBurned = getTodayCaloriesBurned();
      }
      
      data.push({
        day: i,
        date: date,
        caloriesBurned, 
        caloriesConsumed,
        weight: user.weight,
        height: user.height
      });
    }
    
    return data;
  };
  
  // Load data
  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      const caloriesBurned = getTodayCaloriesBurned();
      const caloriesConsumed = getTodayCaloriesConsumed();
      
      setTodayStats({
        caloriesBurned,
        caloriesConsumed,
        weight: user.weight,
        height: user.height
      });
      
      setMonthlyData(generateMonthlyData());
    }
  }, []);
  
  // Bar chart data for today
  const todayChartData = [
    {
      name: t("caloriesBurned", language),
      value: todayStats.caloriesBurned
    },
    {
      name: t("caloriesConsumed", language),
      value: todayStats.caloriesConsumed
    }
  ];
  
  return (
    <Card className="border border-gray-200 shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex items-center">
          <BarChart3 className="mr-2 h-5 w-5" />
          {t("statistics", language)}
        </CardTitle>
        <CardDescription>{t("statisticsDesc", language)}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Tabs defaultValue="today">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="today">{t("today", language)}</TabsTrigger>
            <TabsTrigger value="calendar">{t("thisMonth", language)}</TabsTrigger>
          </TabsList>
          
          <TabsContent value="today" className="space-y-4">
            {/* Today's stats bar chart */}
            <div className="h-[200px] w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={todayChartData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value) => [`${value} ${t("calories", language)}`, '']}
                  />
                  <Bar 
                    dataKey="value" 
                    fill="#8884d8" 
                    name={t("calories", language)}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            {/* Today's stats summary */}
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-md">
                <div className="text-sm text-muted-foreground">{t("weight", language)}</div>
                <div className="text-xl font-medium">{todayStats.weight} {t("kg", language)}</div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-md">
                <div className="text-sm text-muted-foreground">{t("height", language)}</div>
                <div className="text-xl font-medium">{todayStats.height} {t("cm", language)}</div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="calendar">
            <div className="flex justify-center my-4">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="flex items-center justify-center"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedDate ? format(selectedDate, 'PPP') : t("selectDate", language)}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            {selectedDate && (
              <DailyStatDetails 
                date={selectedDate}
                caloriesBurned={monthlyData.find(d => 
                  d.date.getDate() === selectedDate.getDate())?.caloriesBurned || 0}
                caloriesConsumed={monthlyData.find(d => 
                  d.date.getDate() === selectedDate.getDate())?.caloriesConsumed || 0}
                weight={todayStats.weight}
                height={todayStats.height}
                language={language}
              />
            )}
            
            <div className="mt-4">
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => setShowMonthlyView(!showMonthlyView)}
              >
                {showMonthlyView ? t("hideMonthly", language) : t("viewMonthly", language)}
              </Button>
            </div>
            
            {showMonthlyView && (
              <div className="h-[200px] w-full mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyData}>
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip 
                      formatter={(value, name) => {
                        const label = name === "caloriesBurned" 
                          ? t("caloriesBurned", language) 
                          : t("caloriesConsumed", language);
                        return [`${value} ${t("calories", language)}`, label];
                      }}
                    />
                    <Bar 
                      dataKey="caloriesBurned" 
                      fill="#8884d8" 
                      name={t("caloriesBurned", language)}
                    />
                    <Bar 
                      dataKey="caloriesConsumed" 
                      fill="#82ca9d" 
                      name={t("caloriesConsumed", language)}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default Statistics;
