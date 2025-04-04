
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeProvider } from "./components/theme/ThemeProvider";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import ExercisesPage from "./pages/ExercisesPage";
import NutritionPage from "./pages/NutritionPage";
import ProfilePage from "./pages/ProfilePage";
import NotFound from "./pages/NotFound";
import { getLanguage } from "./utils/languageUtils";
import "./App.css";

// Add Google Fonts Jost
const fontLink = document.createElement('link');
fontLink.href = 'https://fonts.googleapis.com/css2?family=Jost:wght@300;400;500;600;700&display=swap';
fontLink.rel = 'stylesheet';
document.head.appendChild(fontLink);

const queryClient = new QueryClient();

const App = () => {
  const defaultLanguage = getLanguage();
  
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" defaultLanguage="ru">
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AnimatePresence mode="wait">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/exercises" element={<ExercisesPage />} />
                  <Route path="/nutrition" element={<NutritionPage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </motion.div>
            </AnimatePresence>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
