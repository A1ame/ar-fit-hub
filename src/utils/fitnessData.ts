
import { v4 as uuidv4 } from 'uuid';
import { t } from './languageUtils';

export interface Task {
  id: string;
  title: string;
  description: string;
  category: "strength" | "cardio" | "flexibility";
  completed: boolean;
}

const strengthExercises = [
  { 
    titleKey: "pushUps", 
    descriptionKey: "pushUpsDuration"
  },
  { 
    titleKey: "squats", 
    descriptionKey: "squatsDuration"
  },
  { 
    titleKey: "lunges", 
    descriptionKey: "lungesDuration"
  },
  { 
    titleKey: "plank", 
    descriptionKey: "plankDuration"
  },
  { 
    titleKey: "dumbbellCurls", 
    descriptionKey: "dumbbellCurlsDuration"
  }
];

const cardioExercises = [
  { 
    titleKey: "running", 
    descriptionKey: "runningDuration"
  },
  { 
    titleKey: "jumpingJacks", 
    descriptionKey: "jumpingJacksDuration"
  },
  { 
    titleKey: "jumpRope", 
    descriptionKey: "jumpRopeDuration"
  },
  { 
    titleKey: "burpees", 
    descriptionKey: "burpeesDuration"
  },
  { 
    titleKey: "highKnees", 
    descriptionKey: "highKneesDuration"
  }
];

const flexibilityExercises = [
  { 
    titleKey: "hamstringStretch", 
    descriptionKey: "hamstringStretchDuration"
  },
  { 
    titleKey: "shoulderStretch", 
    descriptionKey: "shoulderStretchDuration"
  },
  { 
    titleKey: "hipFlexorStretch", 
    descriptionKey: "hipFlexorStretchDuration"
  },
  { 
    titleKey: "yogaPoses", 
    descriptionKey: "yogaPosesDuration"
  },
  { 
    titleKey: "dynamicStretching", 
    descriptionKey: "dynamicStretchingDuration"
  }
];

export const generateRandomTasks = (language: "en" | "ru" = "ru"): Task[] => {
  const tasks: Task[] = [];
  
  // Add 2 random strength tasks
  for (let i = 0; i < 2; i++) {
    const randomExercise = strengthExercises[Math.floor(Math.random() * strengthExercises.length)];
    const task: Task = {
      id: uuidv4(),
      title: t(randomExercise.titleKey, language),
      description: t(randomExercise.descriptionKey, language),
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
      title: t(randomExercise.titleKey, language),
      description: t(randomExercise.descriptionKey, language),
      category: "cardio",
      completed: false
    };
    tasks.push(task);
  }
  
  // Add 1 random flexibility task
  const randomExercise = flexibilityExercises[Math.floor(Math.random() * flexibilityExercises.length)];
  const task: Task = {
    id: uuidv4(),
    title: t(randomExercise.titleKey, language),
    description: t(randomExercise.descriptionKey, language),
    category: "flexibility",
    completed: false
  };
  tasks.push(task);
  
  // Shuffle the array to randomize order
  return tasks.sort(() => Math.random() - 0.5);
};

export const getTasksForDate = (date: string, userId: string, language: "en" | "ru" = "ru"): Task[] => {
  const taskKey = `ar-fit-tasks-${userId}-${date}`;
  const storedTasks = localStorage.getItem(taskKey);
  if (storedTasks) {
    return JSON.parse(storedTasks);
  }
  
  // Generate new tasks for this date
  const newTasks = generateRandomTasks(language);
  localStorage.setItem(taskKey, JSON.stringify(newTasks));
  return newTasks;
};

export const updateTasksForDate = (date: string, userId: string, tasks: Task[]): void => {
  const taskKey = `ar-fit-tasks-${userId}-${date}`;
  localStorage.setItem(taskKey, JSON.stringify(tasks));
};
