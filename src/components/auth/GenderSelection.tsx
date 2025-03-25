
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

interface GenderSelectionProps {
  onSelect: (gender: "male" | "female") => void;
}

const GenderSelection: React.FC<GenderSelectionProps> = ({ onSelect }) => {
  return (
    <Card className="w-full max-w-md mx-auto glass-card animate-scale-in">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center text-arfit-purple">Select Your Gender</CardTitle>
        <CardDescription className="text-center">
          This helps us personalize your fitness plan
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col md:flex-row gap-6 pt-4">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          className="flex-1 cursor-pointer"
          onClick={() => onSelect("male")}
        >
          <div className="aspect-square rounded-xl overflow-hidden border-2 border-transparent hover:border-arfit-purple transition-all duration-300">
            <div className="w-full h-full bg-gradient-to-br from-arfit-blue to-arfit-blue-dark flex items-center justify-center">
              <div className="w-4/5 h-4/5 bg-[url('https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80')] bg-cover bg-center rounded-full shadow-xl" />
            </div>
          </div>
          <p className="mt-2 font-medium text-center">Male</p>
        </motion.div>
        
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          className="flex-1 cursor-pointer"
          onClick={() => onSelect("female")}
        >
          <div className="aspect-square rounded-xl overflow-hidden border-2 border-transparent hover:border-arfit-purple transition-all duration-300">
            <div className="w-full h-full bg-gradient-to-br from-arfit-purple-light to-arfit-purple flex items-center justify-center">
              <div className="w-4/5 h-4/5 bg-[url('https://images.unsplash.com/photo-1609942072337-c3370e820d65?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80')] bg-cover bg-center rounded-full shadow-xl" />
            </div>
          </div>
          <p className="mt-2 font-medium text-center">Female</p>
        </motion.div>
      </CardContent>
    </Card>
  );
};

export default GenderSelection;
