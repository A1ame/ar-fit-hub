
import React, { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@/components/theme/ThemeProvider";
import { t } from "@/utils/languageUtils";
import { hasActiveSubscription, getCurrentUser } from "@/utils/userUtils";

interface SubscriptionPromptProps {
  type: 'workout' | 'nutrition';
}

const SubscriptionPrompt: React.FC<SubscriptionPromptProps> = ({ type }) => {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  const { language } = useTheme();
  const user = getCurrentUser();
  
  const hasSubscription = hasActiveSubscription(user, type);
  
  if (hasSubscription) {
    return null;
  }
  
  const handleNavigateToProfile = () => {
    setOpen(false);
    navigate('/profile');
  };
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl text-arfit-purple">
            {t("subscriptionNeeded", language) || "Требуется подписка"}
          </DialogTitle>
          <DialogDescription>
            {type === 'workout'
              ? (t("workoutSubscriptionDesc", language) || "Для доступа к индивидуальным тренировкам необходима подписка")
              : (t("nutritionSubscriptionDesc", language) || "Для доступа к персонализированному питанию необходима подписка")}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <p>
            {type === 'workout'
              ? (t("workoutSubscriptionBenefit", language) || "Получите персонализированную программу тренировок на основе ваших проблемных зон и целей.")
              : (t("nutritionSubscriptionBenefit", language) || "Получите персонализированный план питания, учитывающий ваши предпочтения и ограничения.")}
          </p>
          <p className="text-sm text-muted-foreground">
            {type === 'workout'
              ? (t("workoutPriceInfo", language) || "Подписка от 499 ₽/месяц")
              : (t("nutritionPriceInfo", language) || "Подписка от 499 ₽/месяц")}
          </p>
        </div>
        <DialogFooter className="flex justify-between sm:justify-between flex-row">
          <Button variant="outline" onClick={() => setOpen(false)}>
            {t("later", language) || "Позже"}
          </Button>
          <Button onClick={handleNavigateToProfile} className="bg-arfit-purple hover:bg-arfit-purple/90">
            {t("subscribeNow", language) || "Подписаться"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SubscriptionPrompt;
