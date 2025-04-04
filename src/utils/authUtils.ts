import { getCurrentUser, logoutUser } from "./userUtils";
import { toast } from "sonner";
import { t } from "./languageUtils";

export const isLoggedIn = (): boolean => {
  const user = getCurrentUser();
  return user ? user.loggedIn : false;
};

export const requireAuth = (navigate: (path: string) => void, language: "en" | "ru" = "ru"): void => {
  if (!isLoggedIn()) {
    toast.error(t("authRequired", language));
    navigate("/");
  }
};

export const logout = async (navigate: (path: string) => void, language: "en" | "ru" = "ru"): Promise<void> => {
  await logoutUser();
  toast.success(t("loggedOut", language));
  navigate("/");
};
