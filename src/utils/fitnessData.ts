import { v4 as uuidv4 } from 'uuid';
import { collection, getDocs, setDoc, doc, query, where } from 'firebase/firestore';
import { db } from './firebase'; // Убедитесь, что firebase.ts существует в src
import { t } from './languageUtils';

export interface Task {
  id: string;
  title: string;
  description: string;
  category: "strength" | "cardio" | "flexibility";
  completed: boolean;
  userId?: string; // Добавляем для Firestore
  date?: string;  // Добавляем для Firestore
}

const strengthExercises = [
  { titleKey: "pushUps", descriptionKey: "pushUpsDuration" },
  { titleKey: "squats", descriptionKey: "squatsDuration" },
  { titleKey: "lunges", descriptionKey: "lungesDuration" },
  { titleKey: "plank", descriptionKey: "plankDuration" },
  { titleKey: "dumbbellCurls", descriptionKey: "dumbbellCurlsDuration" }
];

const cardioExercises = [
  { titleKey: "running", descriptionKey: "runningDuration" },
  { titleKey: "jumpingJacks", descriptionKey: "jumpingJacksDuration" },
  { titleKey: "jumpRope", descriptionKey: "jumpRopeDuration" },
  { titleKey: "burpees", descriptionKey: "burpeesDuration" },
  { titleKey: "highKnees", descriptionKey: "highKneesDuration" }
];

const flexibilityExercises = [
  { titleKey: "hamstringStretch", descriptionKey: "hamstringStretchDuration" },
  { titleKey: "shoulderStretch", descriptionKey: "shoulderStretchDuration" },
  { titleKey: "hipFlexorStretch", descriptionKey: "hipFlexorStretchDuration" },
  { titleKey: "yogaPoses", descriptionKey: "yogaPosesDuration" },
  { titleKey: "dynamicStretching", descriptionKey: "dynamicStretchingDuration" }
];

export const generateRandomTasks = (language: "en" | "ru" = "ru"): Task[] => {
  const tasks: Task[] = [];
  
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
  
  const randomExercise = flexibilityExercises[Math.floor(Math.random() * flexibilityExercises.length)];
  const task: Task = {
    id: uuidv4(),
    title: t(randomExercise.titleKey, language),
    description: t(randomExercise.descriptionKey, language),
    category: "flexibility",
    completed: false
  };
  tasks.push(task);
  
  return tasks.sort(() => Math.random() - 0.5);
};

export const getTasksForDate = async (date: string, userId: string, language: "en" | "ru" = "ru"): Promise<Task[]> => {
  const tasksRef = collection(db, 'tasks');
  const q = query(tasksRef, where('userId', '==', userId), where('date', '==', date));
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    return querySnapshot.docs.map(doc => doc.data() as Task);
  }

  const newTasks = generateRandomTasks(language).map(task => ({
    ...task,
    userId,
    date,
  }));

  await Promise.all(newTasks.map(task => setDoc(doc(db, 'tasks', task.id), task)));
  return newTasks;
};

export const updateTasksForDate = async (date: string, userId: string, tasks: Task[]): Promise<void> => {
  await Promise.all(tasks.map(task => setDoc(doc(db, 'tasks', task.id), { ...task, userId, date })));
};
