
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

interface Task {
  id: string;
  title: string;
  description: string;
  category: "strength" | "cardio" | "flexibility";
  completed: boolean;
}

interface DailyTasksProps {
  tasks: Task[];
  updateTasks: (tasks: Task[]) => void;
}

const DailyTasks: React.FC<DailyTasksProps> = ({ tasks, updateTasks }) => {
  const toggleTask = (id: string) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    
    updateTasks(updatedTasks);
    
    const task = tasks.find((t) => t.id === id);
    if (task) {
      if (!task.completed) {
        toast.success("Task completed! Keep it up!", {
          description: `You've completed ${task.title}`,
        });
      }
    }
  };
  
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "strength":
        return "bg-arfit-purple/15 text-arfit-purple hover:bg-arfit-purple/20";
      case "cardio":
        return "bg-arfit-blue/15 text-arfit-blue-dark hover:bg-arfit-blue/20";
      case "flexibility":
        return "bg-purple-300/20 text-purple-700 hover:bg-purple-300/30";
      default:
        return "bg-gray-200 text-gray-700";
    }
  };

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Today's Tasks</CardTitle>
        <CardDescription>Complete these exercises to reach your goals</CardDescription>
      </CardHeader>
      <CardContent>
        <AnimatePresence>
          <div className="space-y-4">
            {tasks.map((task) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="flex items-start space-x-4 p-4 rounded-lg bg-white/40 dark:bg-black/10 hover:bg-white/60 dark:hover:bg-black/20 transition-colors"
              >
                <Checkbox
                  id={task.id}
                  checked={task.completed}
                  onCheckedChange={() => toggleTask(task.id)}
                  className="mt-1 data-[state=checked]:bg-arfit-purple data-[state=checked]:border-arfit-purple"
                />
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor={task.id}
                      className={`font-medium ${
                        task.completed ? "line-through text-muted-foreground" : ""
                      }`}
                    >
                      {task.title}
                    </label>
                    <Badge className={`${getCategoryColor(task.category)}`}>
                      {task.category}
                    </Badge>
                  </div>
                  <p className={`text-sm text-muted-foreground ${
                    task.completed ? "line-through" : ""
                  }`}>
                    {task.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </AnimatePresence>
      </CardContent>
    </Card>
  );
};

export default DailyTasks;
