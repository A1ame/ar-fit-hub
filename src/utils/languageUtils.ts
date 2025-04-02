
// Language storage key
const LANGUAGE_STORAGE_KEY = 'ar-fit-language';

// Language types
export type Language = 'ru' | 'en';

// Get language from localStorage or return default (ru)
export const getLanguage = (): Language => {
  const storedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY) as Language;
  return storedLanguage || 'ru';
};

// Set language in localStorage
export const setLanguage = (language: Language): void => {
  localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
};

// Export translation function
export const t = (key: string): string => {
  const language = getLanguage();
  
  if (language === 'en') {
    return en[key] || key;
  }
  
  return ru[key] || key;
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
  dashboard: "Главная",
  workout: "Тренировки",
  exercises: "Тренировки",
  nutrition: "Питание",
  profile: "Профиль",
  
  // Dashboard
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
  underweight: "Недостаток",
  normal: "Нормально",
  overweight: "Избыток",
  obese: "Ожирение",
  currentWeight: "Текущий вес",
  currentHeight: "Текущий рост",
  
  // Time-related
  today: "Сегодня",
  thisWeek: "Эта неделя",
  thisMonth: "Этот месяц",
  viewMonthly: "Помесячный просмотр",
  hideMonthly: "Скрыть помесячный вид",
  
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
  nutritionDesc: "Отслеживайте питание и достигайте своих целей",
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
  
  // Short day names
  mon: "Пн",
  tue: "Вт",
  wed: "Ср",
  thu: "Чт",
  fri: "Пт",
  sat: "Сб",
  sun: "Вс",
  
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
  caloriesConsumed: "Потреблено калорий",
  
  // Tasks & Activities
  completeExercises: "Выполните упражнения на сегодня",
  youCompleted: "Вы выполнили",
  taskCompleted: "Задание выполнено",
  moreDetails: "Подробнее",
  
  // Calendar
  selectDate: "Выбрать дату",
  
  // Language Switching
  changeLanguage: "Сменить язык",
  welcome: "Добро пожаловать",
  login: "Вход",
  register: "Регистрация",
  continue: "Продолжить",
  dontHaveAccount: "Еще нет аккаунта?",
  alreadyHaveAccount: "Уже есть аккаунт?",
  goBack: "Назад",
  invalidCredentials: "Неверные учетные данные",
};

// English translations
const en: Record<string, string> = {
  // Auth
  signIn: "Sign In",
  signUp: "Sign Up",
  email: "Email",
  password: "Password",
  forgotPassword: "Forgot password?",
  noAccount: "Don't have an account?",
  createAccount: "Create Account",
  haveAccount: "Already have an account?",
  
  // Navigation
  home: "Home",
  dashboard: "Home",
  workout: "Workouts",
  exercises: "Exercises",
  nutrition: "Nutrition",
  profile: "Profile",
  
  // Profile
  profileSettings: "Profile Settings",
  manageAccount: "Manage your account and settings",
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
  darkModeDesc: "Toggle between light and dark themes",
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
  markAsDone: "Mark as done",
  strength: "Strength",
  cardio: "Cardio",
  flexibility: "Flexibility",
  
  // Statistics
  statistics: "Statistics",
  statisticsDesc: "Track your progress",
  
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
  hideMonthly: "Hide Monthly View",
  
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
  nutritionDesc: "Track nutrition and achieve your goals",
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
  
  // Short day names
  mon: "Mon",
  tue: "Tue",
  wed: "Wed",
  thu: "Thu",
  fri: "Fri",
  sat: "Sat",
  sun: "Sun",
  
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
  enterValidCalories: "Please enter a valid calorie amount",
  mealAdded: "Meal added successfully",
  
  // Stats
  caloriesBurned: "Calories Burned",
  caloriesConsumed: "Calories Consumed",
  
  // Tasks & Activities
  completeExercises: "Complete today's exercises",
  youCompleted: "You completed",
  taskCompleted: "Task completed",
  moreDetails: "More Details",
  
  // Calendar
  selectDate: "Select Date",
  
  // Language Switching
  changeLanguage: "Change Language",
  welcome: "Welcome",
  login: "Login",
  register: "Register",
  continue: "Continue",
  dontHaveAccount: "Don't have an account?",
  alreadyHaveAccount: "Already have an account?",
  goBack: "Go Back",
  invalidCredentials: "Invalid credentials",
};
