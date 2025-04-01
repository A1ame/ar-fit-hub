import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { useTheme } from "@/components/theme/ThemeProvider";
import { t } from "@/utils/languageUtils";
import { getCurrentUser, saveCurrentUser } from "@/utils/userUtils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface MealEntry {
  id: string;
  name: string;
  calories: number;
  date: string;
}

const getDayOfWeek = (dateString: string): number => {
  const date = new Date(dateString);
  let day = date.getDay();
  return day === 0 ? 6 : day - 1;
};

const getDayName = (dayIndex: number, language: 'en' | 'ru'): string => {
  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  return t(days[dayIndex], language);
};

const CalorieCalculator: React.FC = () => {
  const [mealName, setMealName] = useState("");
  const [calories, setCalories] = useState<string>("");
  const [meals, setMeals] = useState<MealEntry[]>([]);
  const [weeklyCalories, setWeeklyCalories] = useState<number[]>([0, 0, 0, 0, 0, 0, 0]);
  const [chartData, setChartData] = useState<any[]>([]);
  const { toast } = useToast();
  const { language } = useTheme();

  useEffect(() => {
    const user = getCurrentUser();
    if (user && user.meals) {
      setMeals(user.meals);
      updateWeeklyCalories(user.meals);
    }
  }, []);

  const updateWeeklyCalories = (mealsList: MealEntry[]) => {
    const currentDate = new Date();
    const monday = new Date(currentDate);
    monday.setDate(currentDate.getDate() - (currentDate.getDay() === 0 ? 6 : currentDate.getDay() - 1));
    monday.setHours(0, 0, 0, 0);
    
    const nextMonday = new Date(monday);
    nextMonday.setDate(monday.getDate() + 7);
    
    const thisWeekMeals = mealsList.filter(meal => {
      const mealDate = new Date(meal.date);
      return mealDate >= monday && mealDate < nextMonday;
    });
    
    const weekCalories = [0, 0, 0, 0, 0, 0, 0];
    
    thisWeekMeals.forEach(meal => {
      const dayIndex = getDayOfWeek(meal.date);
      weekCalories[dayIndex] += meal.calories;
    });
    
    setWeeklyCalories(weekCalories);
    
    const days = language === "ru" 
      ? ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"] 
      : ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
      
    const newChartData = weekCalories.map((calories, index) => ({
      day: days[index],
      calories: calories
    }));
    
    setChartData(newChartData);
  };

  const handleAddMeal = () => {
    if (!mealName.trim()) {
      toast({
        title: t("error", language),
        description: t("enterMealName", language) || "Введите название блюда",
        variant: "destructive",
      });
      return;
    }

    if (!calories.trim() || isNaN(Number(calories)) || Number(calories) <= 0) {
      toast({
        title: t("error", language),
        description: t("enterValidCalories", language) || "Введите корректное количество калорий",
        variant: "destructive",
      });
      return;
    }

    const newMeal: MealEntry = {
      id: Date.now().toString(),
      name: mealName,
      calories: Number(calories),
      date: new Date().toISOString(),
    };

    const updatedMeals = [...meals, newMeal];
    setMeals(updatedMeals);
    updateWeeklyCalories(updatedMeals);

    const user = getCurrentUser();
    if (user) {
      saveCurrentUser({
        ...user,
        meals: updatedMeals,
      });
    }

    setMealName("");
    setCalories("");

    toast({
      title: t("success", language),
      description: t("mealAdded", language) || "Прием пищи добавлен",
    });
  };

  return (
    <Card className="glass-card animate-fade-in border border-arfit-purple/30">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-arfit-purple">
          {t("calorieCalculator", language)}
        </CardTitle>
        <CardDescription>
          {t("trackYourCalories", language) || "Отслеживайте потребление калорий"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="add">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="add">{t("addMeal", language)}</TabsTrigger>
            <TabsTrigger value="history">{t("calorieHistory", language)}</TabsTrigger>
          </TabsList>
          
          <TabsContent value="add" className="space-y-4 pt-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <label htmlFor="meal-name" className="text-sm font-medium">
                  {t("mealName", language)}
                </label>
                <Input
                  id="meal-name"
                  value={mealName}
                  onChange={(e) => setMealName(e.target.value)}
                  placeholder={t("mealName", language) || "Название блюда"}
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="calories" className="text-sm font-medium">
                  {t("calorieAmount", language)}
                </label>
                <Input
                  id="calories"
                  type="number"
                  value={calories}
                  onChange={(e) => setCalories(e.target.value)}
                  placeholder={t("calorieAmount", language) || "Калории"}
                />
              </div>
              
              <Button 
                onClick={handleAddMeal}
                className="w-full bg-arfit-purple hover:bg-arfit-purple/90"
              >
                {t("addMeal", language)}
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="history" className="pt-4">
            <div className="h-[230px] w-full mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={chartData}
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
            
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t("day", language)}</TableHead>
                    <TableHead className="text-right">{t("calories", language)}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {weeklyCalories.map((calories, index) => (
                    <TableRow key={index}>
                      <TableCell>{getDayName(index, language)}</TableCell>
                      <TableCell className="text-right">{calories}</TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell className="font-bold">{t("total", language)}</TableCell>
                    <TableCell className="text-right font-bold">
                      {weeklyCalories.reduce((sum, val) => sum + val, 0)}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default CalorieCalculator;
