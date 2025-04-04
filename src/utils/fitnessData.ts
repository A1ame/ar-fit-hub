import { v4 as uuidv4 } from 'uuid';
import { collection, getDocs, setDoc, doc, query, where } from 'firebase/firestore';
import { db } from './firebase';
import { t } from './languageUtils';

export interface Task {
  id: string;
  title: string;
  description: string;
  category: "strength" | "cardio" | "flexibility";
  completed: boolean;
  userId?: string;
  date?: string;
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
  console.log('Generating random tasks for language:', language);
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
  
  const shuffledTasks = tasks.sort(() => Math.random() - 0.5);
  console.log('Generated tasks:', shuffledTasks);
  return shuffledTasks;
};

export const getTasksForDate = async (date: string, userId: string, language: "en" | "ru" = "ru"): Promise<Task[]> => {
  console.log(`Getting tasks for date: ${date}, userId: ${userId}`);
  const tasksRef = collection(db, 'tasks');
  const q = query(tasksRef, where('userId', '==', userId), where('date', '==', date));
  
  try {
    const querySnapshot = await getDocs(q);
    console.log('Query snapshot size:', querySnapshot.size);

    if (!querySnapshot.empty) {
      const tasks = querySnapshot.docs.map(doc => doc.data() as Task);
      console.log('Found existing tasks:', tasks);
      return tasks;
    }

    const newTasks = generateRandomTasks(language).map(task => ({
      ...task,
      userId,
      date,
    }));

    await Promise.all(newTasks.map(task => setDoc(doc(db, 'tasks', task.id), task)));
    console.log('Created new tasks:', newTasks);
    return newTasks;
  } catch (error) {
    console.error('Error getting tasks:', error);
    throw error;
  }
};

export const updateTasksForDate = async (date: string, userId: string, tasks: Task[]): Promise<void> => {
  console.log(`Updating tasks for date: ${date}, userId: ${userId}`);
  try {
    await Promise.all(tasks.map(task => setDoc(doc(db, 'tasks', task.id), { ...task, userId, date })));
    console.log('Tasks updated successfully');
  } catch (error) {
    console.error('Error updating tasks:', error);
    throw error;
  }
};
