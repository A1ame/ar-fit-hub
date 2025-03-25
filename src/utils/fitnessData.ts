
import { v4 as uuidv4 } from 'uuid';

export interface Task {
  id: string;
  title: string;
  description: string;
  category: "strength" | "cardio" | "flexibility";
  completed: boolean;
}

const strengthExercises = [
  { title: "Push-ups", description: "3 sets of 10 reps" },
  { title: "Squats", description: "3 sets of 15 reps" },
  { title: "Dumbbell Curls", description: "3 sets of 12 reps" },
  { title: "Plank", description: "Hold for 45 seconds, 3 sets" },
  { title: "Lunges", description: "3 sets of 12 reps each leg" }
];

const cardioExercises = [
  { title: "Running", description: "20 minutes at moderate pace" },
  { title: "Jumping Jacks", description: "3 sets of 30 seconds" },
  { title: "Jump Rope", description: "10 minutes" },
  { title: "Burpees", description: "3 sets of 10 reps" },
  { title: "High Knees", description: "3 sets of 20 seconds" }
];

const flexibilityExercises = [
  { title: "Hamstring Stretch", description: "Hold for 30 seconds each leg" },
  { title: "Shoulder Stretch", description: "Hold for 30 seconds each side" },
  { title: "Hip Flexor Stretch", description: "Hold for 30 seconds each side" },
  { title: "Yoga Poses", description: "Hold each pose for 45 seconds" },
  { title: "Dynamic Stretching", description: "10 minutes of various movements" }
];

export const generateRandomTasks = (): Task[] => {
  const tasks: Task[] = [];
  
  // Add 2 random strength tasks
  for (let i = 0; i < 2; i++) {
    const randomExercise = strengthExercises[Math.floor(Math.random() * strengthExercises.length)];
    const task: Task = {
      id: uuidv4(),
      title: randomExercise.title,
      description: randomExercise.description,
      category: "strength",
      completed: false
    };
    tasks.push(task);
  }
  
  // Add 2 random cardio tasks
  for (let i = 0; i < 2; i++) {
    const randomExercise = cardioExercises[Math.floor(Math.random() * cardioExercises.length)];
    const task: Task = {
      id: uuidv4(),
      title: randomExercise.title,
      description: randomExercise.description,
      category: "cardio",
      completed: false
    };
    tasks.push(task);
  }
  
  // Add 1 random flexibility task
  const randomExercise = flexibilityExercises[Math.floor(Math.random() * flexibilityExercises.length)];
  const task: Task = {
    id: uuidv4(),
    title: randomExercise.title,
    description: randomExercise.description,
    category: "flexibility",
    completed: false
  };
  tasks.push(task);
  
  // Shuffle the array to randomize order
  return tasks.sort(() => Math.random() - 0.5);
};

export const getTasksForDate = (date: string): Task[] => {
  const storedTasks = localStorage.getItem(`ar-fit-tasks-${date}`);
  if (storedTasks) {
    return JSON.parse(storedTasks);
  }
  
  // Generate new tasks for this date
  const newTasks = generateRandomTasks();
  localStorage.setItem(`ar-fit-tasks-${date}`, JSON.stringify(newTasks));
  return newTasks;
};

export const updateTasksForDate = (date: string, tasks: Task[]): void => {
  localStorage.setItem(`ar-fit-tasks-${date}`, JSON.stringify(tasks));
};
