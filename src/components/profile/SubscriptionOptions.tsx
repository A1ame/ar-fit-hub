
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Check, Dumbbell, Utensils, X } from "lucide-react";
import { activateSubscription, hasActiveSubscription, getCurrentUser } from "@/utils/userUtils";
import { useTheme } from "@/components/theme/ThemeProvider";
import { t } from "@/utils/languageUtils";
import { toast } from "sonner";
import BodyProblemsSurvey from "../auth/BodyProblemsSurvey";
import DietRestrictionsSurvey from "../auth/DietRestrictionsSurvey";

interface SubscriptionOptionsProps {
  onSubscriptionChange: () => void;
}

type PlanDuration = 1 | 6 | 12;

const SubscriptionOptions: React.FC<SubscriptionOptionsProps> = ({ onSubscriptionChange }) => {
  const { language } = useTheme();
  const [selectedDuration, setSelectedDuration] = useState<PlanDuration>(1);
  const [showBodyProblems, setShowBodyProblems] = useState(false);
  const [showDietRestrictions, setShowDietRestrictions] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<'workout' | 'nutrition' | 'combo' | null>(null);
  
  const user = getCurrentUser();
  const hasWorkoutSubscription = hasActiveSubscription(user, 'workout');
  const hasNutritionSubscription = hasActiveSubscription(user, 'nutrition');
  
  const getPlanPrices = () => {
    if (selectedDuration === 1) {
      return { workout: 499, nutrition: 499, combo: 880 };
    } else if (selectedDuration === 6) {
      return { workout: 2500, nutrition: 2500, combo: 3000 };
    } else {
      return { workout: 4000, nutrition: 4000, combo: 6000 };
    }
  };
  
  const planPrices = getPlanPrices();
  
  const handleSubscribe = (plan: 'workout' | 'nutrition' | 'combo') => {
    setSelectedPlan(plan);
    setOpenDialog(true);
  };
  
  const confirmSubscription = () => {
    if (!user || !selectedPlan) return;
    
    const price = planPrices[selectedPlan];
    activateSubscription(user.id, selectedPlan, selectedDuration, price);
    
    setOpenDialog(false);
    
    if (selectedPlan === 'workout' || selectedPlan === 'combo') {
      setShowBodyProblems(true);
    } else if (selectedPlan === 'nutrition') {
      setShowDietRestrictions(true);
    }
    
    toast.success(t("subscriptionActivated", language));
    onSubscriptionChange();
  };
  
  const handleBodyProblemsComplete = (problems: string[]) => {
    if (user) {
      const updatedUser = { ...user, bodyProblems: problems };
      import("@/utils/userUtils").then(({ saveCurrentUser }) => {
        saveCurrentUser(updatedUser);
        setShowBodyProblems(false);
        toast.success(t("profileUpdated", language));
      });
    }
  };

  const handleDietRestrictionsComplete = (restrictions: string[]) => {
    if (user) {
      const updatedUser = { ...user, dietRestrictions: restrictions };
      import("@/utils/userUtils").then(({ saveCurrentUser }) => {
        saveCurrentUser(updatedUser);
        setShowDietRestrictions(false);
        toast.success(t("profileUpdated", language));
      });
    }
  };
  
  if (showBodyProblems) {
    return <BodyProblemsSurvey onComplete={handleBodyProblemsComplete} />;
  }

  if (showDietRestrictions) {
    return <DietRestrictionsSurvey onComplete={handleDietRestrictionsComplete} />;
  }
  
  return (
    <>
      <Card className="glass-card border-4 border-arfit-purple/60 shadow-[0_10px_15px_-3px_rgba(74,42,130,0.3)] transform hover:scale-[1.01] transition-all">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-arfit-purple">
            {t("subscriptions", language) || "Подписки"}
          </CardTitle>
          <CardDescription>
            {t("subscriptionsDesc", language) || "Выберите подписку для получения индивидуальных тренировок и планов питания"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Tabs defaultValue="1" onValueChange={(value) => setSelectedDuration(parseInt(value) as PlanDuration)}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="1">{t("monthly", language) || "1 месяц"}</TabsTrigger>
              <TabsTrigger value="6">{t("sixMonths", language) || "6 месяцев"}</TabsTrigger>
              <TabsTrigger value="12">{t("yearly", language) || "12 месяцев"}</TabsTrigger>
            </TabsList>
            
            <TabsContent value="1" className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Workout Plan */}
                <Card className={`overflow-hidden ${hasWorkoutSubscription ? 'border-green-500' : ''}`}>
                  <CardHeader className="bg-arfit-purple/10 pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">
                        <Dumbbell className="inline-block mr-1 h-5 w-5" />
                        {t("workoutPlan", language) || "План тренировок"}
                      </CardTitle>
                      {hasWorkoutSubscription && (
                        <Badge className="bg-green-500">
                          {t("active", language) || "Активно"}
                        </Badge>
                      )}
                    </div>
                    <CardDescription>{t("personalWorkout", language) || "Индивидуальные упражнения"}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="text-3xl font-bold mb-4">{planPrices.workout} ₽<span className="text-sm font-normal text-muted-foreground">/{t("month", language) || "мес"}</span></div>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center">
                        <Check className="h-4 w-4 mr-2 text-green-500" />
                        {t("personalizedWorkouts", language) || "Персонализированные тренировки"}
                      </li>
                      <li className="flex items-center">
                        <Check className="h-4 w-4 mr-2 text-green-500" />
                        {t("problemZonesAnalysis", language) || "Анализ проблемных зон"}
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      onClick={() => handleSubscribe('workout')} 
                      className={`w-full ${hasWorkoutSubscription ? 'bg-green-500 hover:bg-green-600' : ''}`}
                      disabled={hasWorkoutSubscription}
                    >
                      {hasWorkoutSubscription 
                        ? (t("subscribed", language) || "Подписка активна")
                        : (t("subscribe", language) || "Подписаться")}
                    </Button>
                  </CardFooter>
                </Card>
                
                {/* Nutrition Plan */}
                <Card className={`overflow-hidden ${hasNutritionSubscription ? 'border-green-500' : ''}`}>
                  <CardHeader className="bg-arfit-purple/10 pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">
                        <Utensils className="inline-block mr-1 h-5 w-5" />
                        {t("nutritionPlan", language) || "План питания"}
                      </CardTitle>
                      {hasNutritionSubscription && (
                        <Badge className="bg-green-500">
                          {t("active", language) || "Активно"}
                        </Badge>
                      )}
                    </div>
                    <CardDescription>{t("personalNutrition", language) || "Индивидуальное питание"}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="text-3xl font-bold mb-4">{planPrices.nutrition} ₽<span className="text-sm font-normal text-muted-foreground">/{t("month", language) || "мес"}</span></div>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center">
                        <Check className="h-4 w-4 mr-2 text-green-500" />
                        {t("personalizedMeals", language) || "Персонализированные блюда"}
                      </li>
                      <li className="flex items-center">
                        <Check className="h-4 w-4 mr-2 text-green-500" />
                        {t("dietaryRestrictions", language) || "Учет пищевых ограничений"}
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      onClick={() => handleSubscribe('nutrition')} 
                      className={`w-full ${hasNutritionSubscription ? 'bg-green-500 hover:bg-green-600' : ''}`}
                      disabled={hasNutritionSubscription}
                    >
                      {hasNutritionSubscription 
                        ? (t("subscribed", language) || "Подписка активна")
                        : (t("subscribe", language) || "Подписаться")}
                    </Button>
                  </CardFooter>
                </Card>
                
                {/* Combo Plan */}
                <Card className={`overflow-hidden ${hasWorkoutSubscription && hasNutritionSubscription ? 'border-green-500' : 'border-arfit-purple'}`}>
                  <CardHeader className="bg-arfit-purple/20 pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">
                        {t("comboPlan", language) || "Комбо"}
                      </CardTitle>
                      {hasWorkoutSubscription && hasNutritionSubscription && (
                        <Badge className="bg-green-500">
                          {t("active", language) || "Активно"}
                        </Badge>
                      )}
                    </div>
                    <CardDescription>{t("bestValue", language) || "Лучшее предложение"}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="flex items-end gap-2 mb-4">
                      <div className="text-3xl font-bold">{planPrices.combo} ₽<span className="text-sm font-normal text-muted-foreground">/{t("month", language) || "мес"}</span></div>
                      <div className="text-sm line-through text-muted-foreground">{planPrices.workout + planPrices.nutrition} ₽</div>
                      <Badge className="bg-red-500">{t("save", language) || "Скидка"} 10%</Badge>
                    </div>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center">
                        <Check className="h-4 w-4 mr-2 text-green-500" />
                        {t("personalizedWorkouts", language) || "Персонализированные тренировки"}
                      </li>
                      <li className="flex items-center">
                        <Check className="h-4 w-4 mr-2 text-green-500" />
                        {t("personalizedMeals", language) || "Персонализированные блюда"}
                      </li>
                      <li className="flex items-center">
                        <Check className="h-4 w-4 mr-2 text-green-500" />
                        {t("fullSupport", language) || "Полная поддержка"}
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      onClick={() => handleSubscribe('combo')} 
                      className={`w-full ${hasWorkoutSubscription && hasNutritionSubscription ? 'bg-green-500 hover:bg-green-600' : 'bg-arfit-purple hover:bg-arfit-purple/90'}`}
                      disabled={hasWorkoutSubscription && hasNutritionSubscription}
                    >
                      {hasWorkoutSubscription && hasNutritionSubscription
                        ? (t("subscribed", language) || "Подписка активна")
                        : (t("subscribe", language) || "Подписаться")}
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="6" className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Similar structure for 6 months */}
                {/* Workout Plan */}
                <Card className={`overflow-hidden ${hasWorkoutSubscription ? 'border-green-500' : ''}`}>
                  <CardHeader className="bg-arfit-purple/10 pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">
                        <Dumbbell className="inline-block mr-1 h-5 w-5" />
                        {t("workoutPlan", language) || "План тренировок"}
                      </CardTitle>
                      {hasWorkoutSubscription && (
                        <Badge className="bg-green-500">
                          {t("active", language) || "Активно"}
                        </Badge>
                      )}
                    </div>
                    <CardDescription>{t("personalWorkout", language) || "Индивидуальные упражнения"}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="text-3xl font-bold mb-4">{planPrices.workout} ₽<span className="text-sm font-normal text-muted-foreground">/6 {t("months", language) || "мес"}</span></div>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center">
                        <Check className="h-4 w-4 mr-2 text-green-500" />
                        {t("personalizedWorkouts", language) || "Персонализированные тренировки"}
                      </li>
                      <li className="flex items-center">
                        <Check className="h-4 w-4 mr-2 text-green-500" />
                        {t("problemZonesAnalysis", language) || "Анализ проблемных зон"}
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      onClick={() => handleSubscribe('workout')} 
                      className={`w-full ${hasWorkoutSubscription ? 'bg-green-500 hover:bg-green-600' : ''}`}
                      disabled={hasWorkoutSubscription}
                    >
                      {hasWorkoutSubscription 
                        ? (t("subscribed", language) || "Подписка активна")
                        : (t("subscribe", language) || "Подписаться")}
                    </Button>
                  </CardFooter>
                </Card>
                
                {/* Nutrition Plan */}
                <Card className={`overflow-hidden ${hasNutritionSubscription ? 'border-green-500' : ''}`}>
                  <CardHeader className="bg-arfit-purple/10 pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">
                        <Utensils className="inline-block mr-1 h-5 w-5" />
                        {t("nutritionPlan", language) || "План питания"}
                      </CardTitle>
                      {hasNutritionSubscription && (
                        <Badge className="bg-green-500">
                          {t("active", language) || "Активно"}
                        </Badge>
                      )}
                    </div>
                    <CardDescription>{t("personalNutrition", language) || "Индивидуальное питание"}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="text-3xl font-bold mb-4">{planPrices.nutrition} ₽<span className="text-sm font-normal text-muted-foreground">/6 {t("months", language) || "мес"}</span></div>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center">
                        <Check className="h-4 w-4 mr-2 text-green-500" />
                        {t("personalizedMeals", language) || "Персонализированные блюда"}
                      </li>
                      <li className="flex items-center">
                        <Check className="h-4 w-4 mr-2 text-green-500" />
                        {t("dietaryRestrictions", language) || "Учет пищевых ограничений"}
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      onClick={() => handleSubscribe('nutrition')} 
                      className={`w-full ${hasNutritionSubscription ? 'bg-green-500 hover:bg-green-600' : ''}`}
                      disabled={hasNutritionSubscription}
                    >
                      {hasNutritionSubscription 
                        ? (t("subscribed", language) || "Подписка активна")
                        : (t("subscribe", language) || "Подписаться")}
                    </Button>
                  </CardFooter>
                </Card>
                
                {/* Combo Plan */}
                <Card className={`overflow-hidden ${hasWorkoutSubscription && hasNutritionSubscription ? 'border-green-500' : 'border-arfit-purple'}`}>
                  <CardHeader className="bg-arfit-purple/20 pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">
                        {t("comboPlan", language) || "Комбо"}
                      </CardTitle>
                      {hasWorkoutSubscription && hasNutritionSubscription && (
                        <Badge className="bg-green-500">
                          {t("active", language) || "Активно"}
                        </Badge>
                      )}
                    </div>
                    <CardDescription>{t("bestValue", language) || "Лучшее предложение"}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="flex items-end gap-2 mb-4">
                      <div className="text-3xl font-bold">{planPrices.combo} ₽<span className="text-sm font-normal text-muted-foreground">/6 {t("months", language) || "мес"}</span></div>
                      <div className="text-sm line-through text-muted-foreground">{5000} ₽</div>
                      <Badge className="bg-red-500">{t("save", language) || "Экономия"}</Badge>
                    </div>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center">
                        <Check className="h-4 w-4 mr-2 text-green-500" />
                        {t("personalizedWorkouts", language) || "Персонализированные тренировки"}
                      </li>
                      <li className="flex items-center">
                        <Check className="h-4 w-4 mr-2 text-green-500" />
                        {t("personalizedMeals", language) || "Персонализированные блюда"}
                      </li>
                      <li className="flex items-center">
                        <Check className="h-4 w-4 mr-2 text-green-500" />
                        {t("fullSupport", language) || "Полная поддержка"}
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      onClick={() => handleSubscribe('combo')} 
                      className={`w-full ${hasWorkoutSubscription && hasNutritionSubscription ? 'bg-green-500 hover:bg-green-600' : 'bg-arfit-purple hover:bg-arfit-purple/90'}`}
                      disabled={hasWorkoutSubscription && hasNutritionSubscription}
                    >
                      {hasWorkoutSubscription && hasNutritionSubscription
                        ? (t("subscribed", language) || "Подписка активна")
                        : (t("subscribe", language) || "Подписаться")}
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="12" className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Similar structure for 12 months */}
                {/* Workout Plan */}
                <Card className={`overflow-hidden ${hasWorkoutSubscription ? 'border-green-500' : ''}`}>
                  <CardHeader className="bg-arfit-purple/10 pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">
                        <Dumbbell className="inline-block mr-1 h-5 w-5" />
                        {t("workoutPlan", language) || "План тренировок"}
                      </CardTitle>
                      {hasWorkoutSubscription && (
                        <Badge className="bg-green-500">
                          {t("active", language) || "Активно"}
                        </Badge>
                      )}
                    </div>
                    <CardDescription>{t("personalWorkout", language) || "Индивидуальные упражнения"}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="text-3xl font-bold mb-4">{planPrices.workout} ₽<span className="text-sm font-normal text-muted-foreground">/12 {t("months", language) || "мес"}</span></div>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center">
                        <Check className="h-4 w-4 mr-2 text-green-500" />
                        {t("personalizedWorkouts", language) || "Персонализированные тренировки"}
                      </li>
                      <li className="flex items-center">
                        <Check className="h-4 w-4 mr-2 text-green-500" />
                        {t("problemZonesAnalysis", language) || "Анализ проблемных зон"}
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      onClick={() => handleSubscribe('workout')} 
                      className={`w-full ${hasWorkoutSubscription ? 'bg-green-500 hover:bg-green-600' : ''}`}
                      disabled={hasWorkoutSubscription}
                    >
                      {hasWorkoutSubscription 
                        ? (t("subscribed", language) || "Подписка активна")
                        : (t("subscribe", language) || "Подписаться")}
                    </Button>
                  </CardFooter>
                </Card>
                
                {/* Nutrition Plan */}
                <Card className={`overflow-hidden ${hasNutritionSubscription ? 'border-green-500' : ''}`}>
                  <CardHeader className="bg-arfit-purple/10 pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">
                        <Utensils className="inline-block mr-1 h-5 w-5" />
                        {t("nutritionPlan", language) || "План питания"}
                      </CardTitle>
                      {hasNutritionSubscription && (
                        <Badge className="bg-green-500">
                          {t("active", language) || "Активно"}
                        </Badge>
                      )}
                    </div>
                    <CardDescription>{t("personalNutrition", language) || "Индивидуальное питание"}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="text-3xl font-bold mb-4">{planPrices.nutrition} ₽<span className="text-sm font-normal text-muted-foreground">/12 {t("months", language) || "мес"}</span></div>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center">
                        <Check className="h-4 w-4 mr-2 text-green-500" />
                        {t("personalizedMeals", language) || "Персонализированные блюда"}
                      </li>
                      <li className="flex items-center">
                        <Check className="h-4 w-4 mr-2 text-green-500" />
                        {t("dietaryRestrictions", language) || "Учет пищевых ограничений"}
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      onClick={() => handleSubscribe('nutrition')} 
                      className={`w-full ${hasNutritionSubscription ? 'bg-green-500 hover:bg-green-600' : ''}`}
                      disabled={hasNutritionSubscription}
                    >
                      {hasNutritionSubscription 
                        ? (t("subscribed", language) || "Подписка активна")
                        : (t("subscribe", language) || "Подписаться")}
                    </Button>
                  </CardFooter>
                </Card>
                
                {/* Combo Plan */}
                <Card className={`overflow-hidden ${hasWorkoutSubscription && hasNutritionSubscription ? 'border-green-500' : 'border-arfit-purple'}`}>
                  <CardHeader className="bg-arfit-purple/20 pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">
                        {t("comboPlan", language) || "Комбо"}
                      </CardTitle>
                      {hasWorkoutSubscription && hasNutritionSubscription && (
                        <Badge className="bg-green-500">
                          {t("active", language) || "Активно"}
                        </Badge>
                      )}
                    </div>
                    <CardDescription>{t("bestValue", language) || "Лучшее предложение"}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="flex items-end gap-2 mb-4">
                      <div className="text-3xl font-bold">{planPrices.combo} ₽<span className="text-sm font-normal text-muted-foreground">/12 {t("months", language) || "мес"}</span></div>
                      <div className="text-sm line-through text-muted-foreground">{8000} ₽</div>
                      <Badge className="bg-red-500">{t("save", language) || "Экономия"}</Badge>
                    </div>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center">
                        <Check className="h-4 w-4 mr-2 text-green-500" />
                        {t("personalizedWorkouts", language) || "Персонализированные тренировки"}
                      </li>
                      <li className="flex items-center">
                        <Check className="h-4 w-4 mr-2 text-green-500" />
                        {t("personalizedMeals", language) || "Персонализированные блюда"}
                      </li>
                      <li className="flex items-center">
                        <Check className="h-4 w-4 mr-2 text-green-500" />
                        {t("fullSupport", language) || "Полная поддержка"}
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      onClick={() => handleSubscribe('combo')} 
                      className={`w-full ${hasWorkoutSubscription && hasNutritionSubscription ? 'bg-green-500 hover:bg-green-600' : 'bg-arfit-purple hover:bg-arfit-purple/90'}`}
                      disabled={hasWorkoutSubscription && hasNutritionSubscription}
                    >
                      {hasWorkoutSubscription && hasNutritionSubscription
                        ? (t("subscribed", language) || "Подписка активна")
                        : (t("subscribe", language) || "Подписаться")}
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("confirmSubscription", language) || "Подтверждение подписки"}</DialogTitle>
            <DialogDescription>
              {selectedPlan === 'workout' 
                ? (t("confirmWorkoutSubscription", language) || "Вы собираетесь оформить подписку на индивидуальные тренировки")
                : selectedPlan === 'nutrition'
                ? (t("confirmNutritionSubscription", language) || "Вы собираетесь оформить подписку на индивидуальное питание")
                : (t("confirmComboSubscription", language) || "Вы собираетесь оформить комбо-подписку")}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="flex justify-between">
              <span>{t("plan", language) || "План"}:</span>
              <span className="font-medium">
                {selectedPlan === 'workout' 
                  ? (t("workoutPlan", language) || "План тренировок")
                  : selectedPlan === 'nutrition'
                  ? (t("nutritionPlan", language) || "План питания")
                  : (t("comboPlan", language) || "Комбо")}
              </span>
            </div>
            
            <div className="flex justify-between">
              <span>{t("duration", language) || "Длительность"}:</span>
              <span className="font-medium">
                {selectedDuration === 1 
                  ? `1 ${t("month", language) || "месяц"}`
                  : `${selectedDuration} ${t("months", language) || "месяцев"}`}
              </span>
            </div>
            
            <div className="flex justify-between">
              <span>{t("price", language) || "Цена"}:</span>
              <span className="font-medium">
                {selectedPlan && planPrices[selectedPlan]} ₽
              </span>
            </div>
            
            <p className="text-sm text-muted-foreground pt-2">
              {t("paymentSimulation", language) || "Это симуляция оплаты для демонстрационных целей."}
            </p>
          </div>
          
          <DialogFooter className="flex justify-between items-center flex-row">
            <Button 
              variant="outline" 
              onClick={() => setOpenDialog(false)}
            >
              <X className="h-4 w-4 mr-2" />
              {t("cancel", language) || "Отмена"}
            </Button>
            <Button 
              onClick={confirmSubscription}
              className="bg-arfit-purple hover:bg-arfit-purple/90"
            >
              <Check className="h-4 w-4 mr-2" />
              {t("confirmPayment", language) || "Подтвердить оплату"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SubscriptionOptions;
