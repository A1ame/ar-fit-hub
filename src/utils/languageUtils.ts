
// Language storage key
const LANGUAGE_STORAGE_KEY = 'ar-fit-language';

// Get language from localStorage
export const getLanguage = (): 'en' | 'ru' => {
  const storedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY);
  return (storedLanguage === 'en' || storedLanguage === 'ru') ? storedLanguage : 'ru';
};

// Set language in localStorage
export const setLanguage = (language: 'en' | 'ru'): void => {
  localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
};

// Export translation function
export const t = (key: string, language: 'en' | 'ru'): string => {
  if (language === 'en') {
    return en[key] || key;
  }
  return ru[key] || en[key] || key;
};

// English translations
const en: Record<string, string> = {
  // Auth
  signIn: "Sign In",
  signUp: "Sign Up",
  email: "Email",
  password: "Password",
  forgotPassword: "Forgot Password?",
  noAccount: "Don't have an account?",
  createAccount: "Create Account",
  haveAccount: "Already have an account?",
  
  // Navigation
  home: "Home",
  workout: "Workout",
  nutrition: "Nutrition",
  profile: "Profile",
  
  // Dashboard
  dashboard: "Dashboard",
  yourWorkouts: "Your Workouts",
  todayTasks: "Tasks for Today",
  weeklyActivity: "Weekly Activity",
  caloriesBurn: "Calories burned this week",
  
  // Profile
  profileSettings: "Profile Settings",
  manageAccount: "Manage your account and preferences",
  personalInfo: "Personal Information",
  name: "Name",
  gender: "Gender",
  age: "Age",
  years: "years",
  height: "Height",
  weight: "Weight",
  saveChanges: "Save Changes",
  preferences: "Preferences",
  notifications: "Notifications",
  notificationsDesc: "Receive workout reminders and updates",
  darkMode: "Dark Mode",
  darkModeDesc: "Switch between light and dark theme",
  language: "Language",
  languageDesc: "Change application language",
  account: "Account",
  logOut: "Log Out",
  
  // Units
  cm: "cm",
  kg: "kg",
  calories: "calories",
  
  // Toasts
  profileUpdated: "Profile updated successfully",
  loggedOut: "Logged out successfully",
  
  // Language Selection
  english: "English",
  russian: "Russian",
  
  // Tasks
  complete: "Complete",
  completed: "Completed",
  markAsDone: "Mark as Done",
  strength: "Strength",
  cardio: "Cardio",
  flexibility: "Flexibility",
  
  // Exercise Types 
  pushUps: "Push-ups",
  squats: "Squats",
  lunges: "Lunges",
  plank: "Plank",
  running: "Running",
  jogging: "Jogging",
  jumpingJacks: "Jumping Jacks",
  burpees: "Burpees",
  mountainClimbers: "Mountain Climbers",
  dynamicStretching: "Dynamic Stretching",
  yoga: "Yoga",
  staticStretching: "Static Stretching",
  
  // Statistics
  statistics: "Statistics",
  statisticsDesc: "Track your progress over time",
  
  // Body Metrics
  bmi: "BMI",
  underweight: "Underweight",
  normal: "Normal",
  overweight: "Overweight",
  obese: "Obese",
  currentWeight: "Current Weight",
  currentHeight: "Current Height",
  
  // Time-related
  today: "Today",
  thisWeek: "This Week",
  thisMonth: "This Month",
  viewMonthly: "View Monthly",
  
  // Greetings
  goodMorning: "Good Morning",
  goodAfternoon: "Good Afternoon",
  goodEvening: "Good Evening",
  yourFitnessProfile: "Your Fitness Profile",
  
  // Goals
  todaysGoal: "Today's Goal",
  
  // Subscriptions
  subscriptions: "Subscriptions",
  
  // Loading
  loading: "Loading...",
  
  // Nutrition
  calorieCalculator: "Calorie Calculator",
  trackYourCalories: "Track your calorie intake",
  addMeal: "Add Meal",
  mealName: "Meal Name",
  calorieAmount: "Calories",
  calorieHistory: "Calorie History",
  day: "Day",
  total: "Total",
  
  // Days of the week
  monday: "Monday",
  tuesday: "Tuesday",
  wednesday: "Wednesday",
  thursday: "Thursday",
  friday: "Friday",
  saturday: "Saturday",
  sunday: "Sunday",
  
  // Months
  january: "January",
  february: "February",
  march: "March",
  april: "April",
  may: "May",
  june: "June",
  july: "July",
  august: "August",
  september: "September",
  october: "October",
  november: "November",
  december: "December",
  
  // Form validations
  error: "Error",
  success: "Success",
  enterMealName: "Please enter a meal name",
  enterValidCalories: "Please enter valid calories",
  mealAdded: "Meal added successfully",
  
  // Stats
  caloriesBurned: "Calories Burned",
  caloriesConsumed: "Calories Consumed"
};

// Russian translations
const ru: Record<string, string> = {
  // Auth
  signIn: "Войти",
  signUp: "Зарегистрироваться",
  email: "Электронная почта",
  password: "Пароль",
  forgotPassword: "Забыли пароль?",
  noAccount: "Нет учетной записи?",
  createAccount: "Создать учетную запись",
  haveAccount: "Уже есть учетная запись?",
  
  // Navigation
  home: "Главная",
  workout: "Тренировки",
  nutrition: "Питание",
  profile: "Профиль",
  
  // Dashboard
  dashboard: "Панель управления",
  yourWorkouts: "Ваши тренировки",
  todayTasks: "Задания на сегодня",
  weeklyActivity: "Активность за неделю",
  caloriesBurn: "Сожжено калорий за неделю",
  
  // Profile
  profileSettings: "Настройки профиля",
  manageAccount: "Управление аккаунтом и настройками",
  personalInfo: "Личная информация",
  name: "Имя",
  gender: "Пол",
  age: "Возраст",
  years: "лет",
  height: "Рост",
  weight: "Вес",
  saveChanges: "Сохранить изменения",
  preferences: "Предпочтения",
  notifications: "Уведомления",
  notificationsDesc: "Получать напоминания о тренировках и обновления",
  darkMode: "Темная тема",
  darkModeDesc: "Переключение между светлой и темной темой",
  language: "Язык",
  languageDesc: "Изменить язык приложения",
  account: "Аккаунт",
  logOut: "Выйти",
  
  // Units
  cm: "см",
  kg: "кг",
  calories: "калорий",
  
  // Toasts
  profileUpdated: "Профиль успешно обновлен",
  loggedOut: "Выход выполнен успешно",
  
  // Language Selection
  english: "Английский",
  russian: "Русский",
  
  // Tasks
  complete: "Завершить",
  completed: "Завершено",
  markAsDone: "Отметить как выполненное",
  strength: "Сила",
  cardio: "Кардио",
  flexibility: "Гибкость",
  
  // Exercise Types
  pushUps: "Отжимания",
  squats: "Приседания",
  lunges: "Выпады",
  plank: "Планка",
  running: "Бег",
  jogging: "Бег трусцой",
  jumpingJacks: "Прыжки Джека",
  burpees: "Бёрпи",
  mountainClimbers: "Скалолаз",
  dynamicStretching: "Динамическая растяжка",
  yoga: "Йога",
  staticStretching: "Статическая растяжка",
  
  // Statistics
  statistics: "Статистика",
  statisticsDesc: "Отслеживайте свой прогресс",
  
  // Body Metrics
  bmi: "ИМТ",
  underweight: "Недостаточный вес",
  normal: "Нормальный",
  overweight: "Избыточный вес",
  obese: "Ожирение",
  currentWeight: "Текущий вес",
  currentHeight: "Текущий рост",
  
  // Time-related
  today: "Сегодня",
  thisWeek: "Эта неделя",
  thisMonth: "Этот месяц",
  viewMonthly: "Помесячный просмотр",
  
  // Greetings
  goodMorning: "Доброе утро",
  goodAfternoon: "Добрый день",
  goodEvening: "Добрый вечер",
  yourFitnessProfile: "Ваш фитнес-профиль",
  
  // Goals
  todaysGoal: "Цель на сегодня",
  
  // Subscriptions
  subscriptions: "Подписки",
  
  // Loading
  loading: "Загрузка...",
  
  // Nutrition
  calorieCalculator: "Калькулятор калорий",
  trackYourCalories: "Отслеживайте потребление калорий",
  addMeal: "Добавить прием пищи",
  mealName: "Название блюда",
  calorieAmount: "Калории",
  calorieHistory: "История калорий",
  day: "День",
  total: "Всего",
  
  // Days of the week
  monday: "Понедельник",
  tuesday: "Вторник",
  wednesday: "Среда",
  thursday: "Четверг",
  friday: "Пятница",
  saturday: "Суббота",
  sunday: "Воскресенье",
  
  // Months
  january: "Январь",
  february: "Февраль",
  march: "Март",
  april: "Апрель",
  may: "Май",
  june: "Июнь",
  july: "Июль",
  august: "Август",
  september: "Сентябрь",
  october: "Октябрь",
  november: "Ноябрь",
  december: "Декабрь",
  
  // Form validations
  error: "Ошибка",
  success: "Успешно",
  enterMealName: "Пожалуйста, введите название блюда",
  enterValidCalories: "Пожалуйста, введите корректное количество калорий",
  mealAdded: "Прием пищи успешно добавлен",
  
  // Stats
  caloriesBurned: "Сожжено калорий",
  caloriesConsumed: "Потреблено калорий"
};
