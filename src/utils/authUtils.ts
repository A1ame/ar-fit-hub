
import { getCurrentUser, logoutUser, getUsers } from "./userUtils";
import { toast } from "sonner";
import { t } from "./languageUtils";

/**
 * Проверка, вошел ли пользователь в систему на основе localStorage
 */
export const isLoggedIn = (): boolean => {
  const user = getCurrentUser();
  return user ? user.loggedIn : false;
};

/**
 * Перенаправление защищенного маршрута
 * @param navigate - функция навигации React Router
 * @param language - текущий язык
 */
export const requireAuth = (navigate: (path: string) => void, language: "en" | "ru" = "ru"): void => {
  if (!isLoggedIn()) {
    toast.error(t("authRequired", language));
    navigate("/");
  }
};

/**
 * Выход пользователя из системы
 * @param navigate - функция навигации React Router
 * @param language - текущий язык
 */
export const logout = (navigate: (path: string) => void, language: "en" | "ru" = "ru"): void => {
  logoutUser();
  toast.success(t("loggedOut", language));
  navigate("/");
};
