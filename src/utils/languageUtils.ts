type LanguageKey = "en" | "ru";

interface Translations {
  [key: string]: {
    [key: string]: string;
  };
}

// Translation key-value pairs
export const translations: Translations = {
  // General
  appName: {
    en: "AR-FIT",
    ru: "AR-FIT"  // Keep AR-FIT in English for Russian as well
  },
  comingSoon: {
    en: "Coming Soon",
    ru: "Скоро"
  },
  // Dashboard
  goodMorning: {
    en: "Good Morning",
    ru: "Доброе утро"
  },
  goodAfternoon: {
    en: "Good Afternoon",
    ru: "Добрый день"
  },
  goodEvening: {
    en: "Good Evening",
    ru: "Добрый вечер"
  },
  yourFitnessProfile: {
    en: "Your fitness profile",
    ru: "Ваш фитнес-профиль"
  },
  age: {
    en: "Age",
    ru: "Возраст"
  },
  years: {
    en: "years",
    ru: "лет"
  },
  weight: {
    en: "Weight",
    ru: "Вес"
  },
  height: {
    en: "Height",
    ru: "Рост"
  },
  todaysGoal: {
    en: "Today's Goal",
    ru: "Цель на сегодня"
  },
  weeklyActivity: {
    en: "Weekly Activity",
    ru: "Активность за неделю"
  },
  caloriesBurn: {
    en: "Your calorie burn for the past week",
    ru: "Сожженные калории за неделю"
  },
  calories: {
    en: "calories",
    ru: "калорий"
  },
  // Daily Tasks
  todaysTasks: {
    en: "Today's Tasks",
    ru: "Задания на сегодня"
  },
  completeExercises: {
    en: "Complete these exercises to reach your goals",
    ru: "Выполните эти упражнения, чтобы достичь целей"
  },
  strength: {
    en: "strength",
    ru: "сила"
  },
  cardio: {
    en: "cardio",
    ru: "кардио"
  },
  flexibility: {
    en: "flexibility",
    ru: "гибкость"
  },
  // Profile
  profileSettings: {
    en: "Profile Settings",
    ru: "Настройки профиля"
  },
  manageAccount: {
    en: "Manage your account preferences",
    ru: "Управление настройками аккаунта"
  },
  personalInfo: {
    en: "Personal Information",
    ru: "Личная информация"
  },
  name: {
    en: "Name",
    ru: "Имя"
  },
  email: {
    en: "Email",
    ru: "Эл. почта"
  },
  saveChanges: {
    en: "Save Changes",
    ru: "Сохранить изменения"
  },
  preferences: {
    en: "Preferences",
    ru: "Предпочтения"
  },
  notifications: {
    en: "Notifications",
    ru: "Уведомления"
  },
  notificationsDesc: {
    en: "Receive workout and progress notifications",
    ru: "Получать уведомления о тренировках и прогрессе"
  },
  darkMode: {
    en: "Dark Mode",
    ru: "Темная тема"
  },
  darkModeDesc: {
    en: "Enable dark mode for the application",
    ru: "Включить темную тему для приложения"
  },
  language: {
    en: "Language",
    ru: "Язык"
  },
  languageDesc: {
    en: "Choose your preferred language",
    ru: "Выберите предпочитаемый язык"
  },
  english: {
    en: "English",
    ru: "Английский"
  },
  russian: {
    en: "Russian",
    ru: "Русский"
  },
  account: {
    en: "Account",
    ru: "Аккаунт"
  },
  logOut: {
    en: "Log Out",
    ru: "Выйти"
  },
  // Exercises
  exercises: {
    en: "Exercises",
    ru: "Упражнения"
  },
  chooseCategory: {
    en: "Choose your workout category",
    ru: "Выберите категорию тренировки"
  },
  strengthTraining: {
    en: "Strength Training",
    ru: "Силовые тренировки"
  },
  cardioTraining: {
    en: "Cardio Training",
    ru: "Кардио т��енировки"
  },
  warmupStretching: {
    en: "Warm-up & Stretching",
    ru: "Разминка и растяжка"
  },
  strengthDesc: {
    en: "Build muscle and improve strength with these resistance exercises",
    ru: "Наращивайте мышцы и улучшайте силу с помощью этих упражнений с сопротивлением"
  },
  cardioDesc: {
    en: "Improve cardiovascular health and endurance",
    ru: "Улучшайте сердечно-сосудистую систему и выносливость"
  },
  flexibilityDesc: {
    en: "Improve flexibility and prevent injuries",
    ru: "Улучшайте гибкость и предотвращайте травмы"
  },
  beginner: {
    en: "Beginner",
    ru: "Начинающий"
  },
  intermediate: {
    en: "Intermediate",
    ru: "Средний"
  },
  advanced: {
    en: "Advanced",
    ru: "Продвинутый"
  },
  details: {
    en: "Details",
    ru: "Подробности"
  },
  moreDetails: {
    en: "More Details",
    ru: "Подробнее"
  },
  loading: {
    en: "Loading...",
    ru: "Загрузка..."
  },
  // Success messages
  loggedOut: {
    en: "Logged out successfully",
    ru: "Выход выполнен успешно"
  },
  profileUpdated: {
    en: "Profile updated successfully",
    ru: "Профиль успешно обновлен"
  },
  taskCompleted: {
    en: "Task completed! Keep it up!",
    ru: "Задание выполнено! Так держать!"
  },
  youCompleted: {
    en: "You've completed",
    ru: "Вы выполнили"
  },
  // Additional translations
  login: {
    en: "Login",
    ru: "Вход"
  },
  register: {
    en: "Register",
    ru: "Регистрация"
  },
  username: {
    en: "Username",
    ru: "Имя пользователя"
  },
  password: {
    en: "Password",
    ru: "Пароль"
  },
  confirmPassword: {
    en: "Confirm Password",
    ru: "Подтвердите пароль"
  },
  gender: {
    en: "Choose your gender",
    ru: "Выберите ваш пол"
  },
  male: {
    en: "Male",
    ru: "Мужской"
  },
  female: {
    en: "Female",
    ru: "Женский"
  },
  next: {
    en: "Next",
    ru: "Далее"
  },
  back: {
    en: "Back",
    ru: "Назад"
  },
  complete: {
    en: "Complete",
    ru: "Завершить"
  },
  welcome: {
    en: "Welcome to AR-FIT",
    ru: "Добро пожаловать в AR-FIT"
  },
  nutrition: {
    en: "Nutrition",
    ru: "Питание"
  },
  nutritionDesc: {
    en: "Personalized meal plans and tracking",
    ru: "Персонализированные планы питания и отслеживание"
  },
  nutritionComingSoon: {
    en: "Nutrition tracking coming soon!",
    ru: "Отслеживание питания скоро появится!"
  },
  nutritionComingSoonDesc: {
    en: "We're currently developing personalized nutrition plans and meal tracking. Check back soon for updates!",
    ru: "Мы в настоящее время разрабатываем персонализированные планы питания и отслеживание приемов пищи. Скоро появятся обновления!"
  },
  profile: {
    en: "Profile",
    ru: "Профиль"
  },
  home: {
    en: "Home",
    ru: "Главная"
  },
  dashboard: {
    en: "Dashboard",
    ru: "Панель"
  },
  workout: {
    en: "Workout",
    ru: "Тренировка"
  },
  settings: {
    en: "Settings",
    ru: "Настройки"
  },
  notFound: {
    en: "Page Not Found",
    ru: "Страница не найдена"
  },
  goBack: {
    en: "Go Back",
    ru: "Вернуться назад"
  },
  // Navigation
  goToExercises: {
    en: "Go to Exercises",
    ru: "Перейти к упражнениям"
  },
  // Specific exercises translations
  pushUps: {
    en: "Push-ups",
    ru: "Отжимания"
  },
  pushUpsDesc: {
    en: "Upper body strength and core stability",
    ru: "Укрепление верхней части тела и стабильность корпуса"
  },
  pushUpsDuration: {
    en: "3 sets x 10-15 reps",
    ru: "3 подхода по 10-15 повторений"
  },
  squats: {
    en: "Bodyweight Squats",
    ru: "Приседания"
  },
  squatsDesc: {
    en: "Lower body strength and mobility",
    ru: "Сила и подвижность нижней части тела"
  },
  squatsDuration: {
    en: "3 sets x 15-20 reps",
    ru: "3 подхода по 15-20 повторений"
  },
  lunges: {
    en: "Lunges",
    ru: "Выпады"
  },
  lungesDesc: {
    en: "Single leg strength and balance",
    ru: "Сила одной ноги и баланс"
  },
  lungesDuration: {
    en: "3 sets x 12 reps each leg",
    ru: "3 подхода по 12 повторений на каждую ногу"
  },
  running: {
    en: "Interval Running",
    ru: "Интервальный бег"
  },
  runningDesc: {
    en: "Alternating between sprinting and jogging",
    ru: "Чередование спринта и бега трусцой"
  },
  runningDuration: {
    en: "20-30 minutes",
    ru: "20-30 минут"
  },
  jumpingJacks: {
    en: "Jumping Jacks",
    ru: "Прыжки 'Звездочка'"
  },
  jumpingJacksDesc: {
    en: "Full body cardio exercise",
    ru: "Кардио упражнение для всего тела"
  },
  jumpingJacksDuration: {
    en: "3 sets x 1 minute",
    ru: "3 подхода по 1 минуте"
  },
  burpees: {
    en: "Burpees",
    ru: "Бёрпи"
  },
  burpeesDesc: {
    en: "High-intensity full body exercise",
    ru: "Высокоинтенсивное упражнение для всего тела"
  },
  burpeesDuration: {
    en: "3 sets x 10 reps",
    ru: "3 подхода по 10 повторений"
  },
  hamstringStretch: {
    en: "Hamstring Stretch",
    ru: "Растяжка подколенных сухожилий"
  },
  hamstringStretchDesc: {
    en: "Seated forward bend",
    ru: "Наклон вперед сидя"
  },
  hamstringStretchDuration: {
    en: "Hold for 30 seconds x 3 sets",
    ru: "Удерживать 30 секунд x 3 подхода"
  },
  shoulderStretch: {
    en: "Shoulder Stretch",
    ru: "Растяжка плеч"
  },
  shoulderStretchDesc: {
    en: "Across body stretch for shoulders",
    ru: "Растяжка плеч поперек тела"
  },
  shoulderStretchDuration: {
    en: "Hold for 20 seconds each side x 3 sets",
    ru: "Удерживать 20 секунд каждую сторону x 3 подхода"
  },
  hipFlexorStretch: {
    en: "Hip Flexor Stretch",
    ru: "Растяжка сгибателей бедра"
  },
  hipFlexorStretchDesc: {
    en: "Lunge position stretch for hip flexors",
    ru: "Растяжка сгибателей бедра в положении выпада"
  },
  hipFlexorStretchDuration: {
    en: "Hold for 30 seconds each side x 3 sets",
    ru: "Удерживать 30 секунд каждую сторону x 3 подхода"
  },
  // Auth related translations
  personalizedFitnessJourney: {
    en: "Your personalized fitness journey",
    ru: "Ваш персонализированный фитнес-путь"
  },
  dontHaveAccount: {
    en: "Don't have an account?",
    ru: "Нет аккаунта?"
  },
  alreadyHaveAccount: {
    en: "Already have an account?",
    ru: "Уже есть аккаунт?"
  },
  continue: {
    en: "Continue",
    ru: "Продолжить"
  },
  genderHelp: {
    en: "This helps us personalize your fitness plan",
    ru: "Это поможет нам персонализировать ваш план тренировок"
  },
  completeProfile: {
    en: "Complete Your Profile",
    ru: "Заполните свой профиль"
  },
  completeProfileDesc: {
    en: "Tell us a bit about yourself so we can create your personalized plan",
    ru: "Расскажите немного о себе, чтобы мы могли создать ваш персонализированный план"
  },
  yourName: {
    en: "Your Name",
    ru: "Ваше имя"
  },
  enterName: {
    en: "Enter your name",
    ru: "Введите ваше имя"
  },
  kg: {
    en: "kg",
    ru: "кг"
  },
  cm: {
    en: "cm",
    ru: "см"
  },
  authRequired: {
    en: "Authentication required",
    ru: "Требуется авторизация"
  },
  invalidCredentials: {
    en: "Invalid email or password",
    ru: "Неверный email или пароль"
  }
};

// Function to get translation
export const t = (key: string, language: LanguageKey): string => {
  if (!translations[key]) {
    console.warn(`Translation key "${key}" not found`);
    return key;
  }
  
  return translations[key][language] || translations[key]["en"];
};

// Function to get language from storage
export const getLanguage = (): LanguageKey => {
  const storedLanguage = localStorage.getItem("ar-fit-language");
  return (storedLanguage as LanguageKey) || "ru"; // Default to Russian
};

// Function to set language in storage
export const setLanguage = (language: LanguageKey): void => {
  localStorage.setItem("ar-fit-language", language);
};
