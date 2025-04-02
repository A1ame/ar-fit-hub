
// Language storage key
const LANGUAGE_STORAGE_KEY = 'ar-fit-language';

// Get language - now always returns 'ru'
export const getLanguage = (): 'ru' => {
  return 'ru';
};

// Set language in localStorage - kept for compatibility
export const setLanguage = (language: 'ru'): void => {
  localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
};

// Export translation function - now only returns Russian
export const t = (key: string): string => {
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
  selectDate: "Выбрать дату"
};

// English translations - kept for backward compatibility
const en: Record<string, string> = {};

