
import { v4 as uuidv4 } from 'uuid';

// Function to generate random tasks for the day
export const generateRandomTasks = () => {
  // In a real app, this would be dynamic based on user preferences and fitness level
  const possibleTasks = [
    {
      title: "Push-ups",
      description: "3 sets of 10-15 reps",
      category: "strength",
    },
    {
      title: "Squats",
      description: "3 sets of 15-20 reps",
      category: "strength",
    },
    {
      title: "Plank",
      description: "3 sets of 30-60 seconds",
      category: "strength",
    },
    {
      title: "Jumping Jacks",
      description: "3 sets of 30 seconds",
      category: "cardio",
    },
    {
      title: "Jogging",
      description: "20 minutes at moderate pace",
      category: "cardio",
    },
    {
      title: "High Knees",
      description: "3 sets of 30 seconds",
      category: "cardio",
    },
    {
      title: "Hamstring Stretch",
      description: "Hold for 30 seconds, 3 times each leg",
      category: "flexibility",
    },
    {
      title: "Shoulder Stretch",
      description: "Hold for 20 seconds, 3 times each side",
      category: "flexibility",
    },
    {
      title: "Child's Pose",
      description: "Hold for 1 minute",
      category: "flexibility",
    },
  ];
  
  // Select 4-5 random tasks
  const taskCount = Math.floor(Math.random() * 2) + 4; // 4-5 tasks
  const shuffled = [...possibleTasks].sort(() => 0.5 - Math.random());
  const selectedTasks = shuffled.slice(0, taskCount);
  
  // Ensure we have at least one task from each category
  const categories = ["strength", "cardio", "flexibility"];
  categories.forEach(category => {
    if (!selectedTasks.some(task => task.category === category)) {
      const taskFromCategory = possibleTasks.find(task => task.category === category);
      if (taskFromCategory) {
        selectedTasks.push(taskFromCategory);
      }
    }
  });
  
  // Add IDs and default completion status
  return selectedTasks.map(task => ({
    id: uuidv4(),
    ...task,
    completed: false,
  }));
};
