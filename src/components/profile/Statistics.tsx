
import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChartContainer } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useTheme } from "../theme/ThemeProvider";
import { t } from "@/utils/languageUtils";
import { BarChart3, ChevronLeft, ChevronRight } from "lucide-react";
import { getCurrentUser, updateUserData } from "@/utils/userUtils";

// Helper to get days in month
const getDaysInMonth = (month: number, year: number) => {
  return new Date(year, month + 1, 0).getDate();
};

// Generate data for April 2024 (month 3)
const generateMonthData = () => {
  const currentYear = new Date().getFullYear();
  const month = 3; // April (0-indexed)
  const daysInMonth = getDaysInMonth(month, currentYear);
  
  const user = getCurrentUser();
  
  // Create data array for each day
  return Array.from({ length: daysInMonth }, (_, i) => {
    const day = i + 1;
    const dayOfWeek = format(new Date(currentYear, month, day), 'EEE');
    
    // Random data for demonstration, but could be real data from user history
    const randomCaloriesBurned = Math.floor(Math.random() * 500) + 100;
    const randomCaloriesConsumed = Math.floor(Math.random() * 800) + 1200;
    
    return {
      day,
      dayOfWeek,
      caloriesBurned: randomCaloriesBurned,
      caloriesConsumed: randomCaloriesConsumed,
      weight: user?.weight || 70,
      height: user?.height || 170,
    };
  });
};

interface DailyStatProps {
  day: number;
  caloriesBurned: number;
  caloriesConsumed: number;
  weight: number;
  height: number;
  language: 'en' | 'ru';
}

const DailyStatDetails = ({ day, caloriesBurned, caloriesConsumed, weight, height, language }: DailyStatProps) => {
  return (
    <div className="space-y-4 p-2">
      <h3 className="font-medium">{t("april", language)} {day}</h3>
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
  const [data, setData] = useState(() => generateMonthData());
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  
  // Custom tooltip component for the chart
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const dayData = payload[0].payload;
      return (
        <div className="bg-white dark:bg-gray-800 p-2 rounded shadow-md border text-sm">
          <p className="font-semibold">{t("april", language)} {dayData.day}</p>
          <p>{t("caloriesBurned", language)}: {dayData.caloriesBurned}</p>
        </div>
      );
    }
    return null;
  };
  
  // Handle bar click
  const handleBarClick = (data: any) => {
    setSelectedDay(data.day);
  };
  
  // Save stats when user updates weight/height
  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      // In a real app this would come from actual tracking data
      // For demo, we update stats based on the current date
      const today = new Date().getDate() - 1; // Adjust for 0-index
      if (today < data.length) {
        const updatedData = [...data];
        updatedData[today] = {
          ...updatedData[today],
          weight: user.weight,
          height: user.height
        };
        setData(updatedData);
      }
    }
  }, []);
  
  return (
    <Card className="border-6 border-arfit-purple/60 shadow-[0_8px_12px_-3px_rgba(74,42,130,0.2)]">
      <CardHeader>
        <CardTitle className="text-lg font-bold flex items-center">
          <BarChart3 className="mr-2 h-5 w-5" />
          {t("statistics", language)}
        </CardTitle>
        <CardDescription>{t("statisticsDesc", language)}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-base font-medium">
            {t("april", language)} {new Date().getFullYear()}
          </h3>
        </div>
        
        {/* Chart section */}
        <div className="h-[200px] w-full">
          <ChartContainer className="h-full" config={{}}>
            <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 5 }}>
              <XAxis 
                dataKey="day" 
                tick={{ fontSize: 10 }}
                tickFormatter={(value) => `${value}`}
              />
              <YAxis hide />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="caloriesBurned" fill="#8884d8" onClick={handleBarClick}>
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`}
                    fill={selectedDay === entry.day ? "#b580ff" : "#8884d8"}
                    cursor="pointer"
                  />
                ))}
              </Bar>
            </BarChart>
          </ChartContainer>
        </div>
        
        {/* Day details popover */}
        {data.map((dayData, index) => (
          <Popover key={index}>
            <PopoverTrigger asChild>
              <Button 
                variant="ghost" 
                className={`h-8 w-8 p-0 ${selectedDay === dayData.day ? 'bg-purple-100 dark:bg-purple-900/20' : ''}`}
                onClick={() => setSelectedDay(dayData.day)}
              >
                {dayData.day}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-64">
              <DailyStatDetails 
                day={dayData.day}
                caloriesBurned={dayData.caloriesBurned}
                caloriesConsumed={dayData.caloriesConsumed}
                weight={dayData.weight}
                height={dayData.height}
                language={language}
              />
            </PopoverContent>
          </Popover>
        ))}
      </CardContent>
    </Card>
  );
};

export default Statistics;
