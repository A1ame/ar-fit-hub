
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Dumbbell, Utensils, User } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "../theme/ThemeProvider";
import { t } from "@/utils/languageUtils";

const Navigation = () => {
  const location = useLocation();
  const { language } = useTheme();
  
  const navItems = [
    {
      name: "dashboard",
      icon: <Home className="h-5 w-5" />,
      path: "/dashboard",
    },
    {
      name: "workout",
      icon: <Dumbbell className="h-5 w-5" />,
      path: "/exercises",
    },
    {
      name: "nutrition",
      icon: <Utensils className="h-5 w-5" />,
      path: "/nutrition",
    },
    {
      name: "profile",
      icon: <User className="h-5 w-5" />,
      path: "/profile",
    },
  ];
  
  return (
    <motion.div 
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="fixed bottom-0 left-0 right-0 z-10 pb-safe bg-white/70 backdrop-blur-xl border-t border-arfit-purple/20 dark:bg-black/70"
    >
      <nav className="container mx-auto px-4 py-2">
        <ul className="flex items-center justify-around">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <li key={item.name} className="relative">
                <Link
                  to={item.path}
                  className={`flex flex-col items-center p-2 rounded-lg transition-colors relative ${
                    isActive ? "text-arfit-purple" : "text-gray-500 hover:text-arfit-purple-light"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="navigation-pill"
                      className="absolute inset-0 bg-arfit-purple/10 rounded-lg -z-10"
                      transition={{ type: "spring", duration: 0.5 }}
                    />
                  )}
                  {item.icon}
                  <span className="text-xs mt-1">{t(item.name, language)}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </motion.div>
  );
};

export default Navigation;
