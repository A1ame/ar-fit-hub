
// Define language type
export type Language = "en" | "ru";

// Current language
let currentLanguage: Language = "ru";

// Get current language
export const getLanguage = (): Language => {
  const storedLanguage = localStorage.getItem("language");
  if (storedLanguage === "en" || storedLanguage === "ru") {
    currentLanguage = storedLanguage;
  }
  return currentLanguage;
};

// Set language
export const setLanguage = (language: Language): void => {
  localStorage.setItem("language", language);
  currentLanguage = language;
};

// Translation function
export const t = (key: string, language?: Language): string => {
  const lang = language || getLanguage();
  return translations[key]?.[lang] || key;
};

// Translations
const translations: Record<string, Record<Language, string>> = {
  // Auth
  "welcomeBack": {
    "en": "Welcome back!",
    "ru": "С возвращением!"
  },
  "loginToContinue": {
    "en": "Login to continue",
    "ru": "Войдите, чтобы продолжить"
  },
  "email": {
    "en": "Email",
    "ru": "Email"
  },
  "password": {
    "en": "Password",
    "ru": "Пароль"
  },
  "login": {
    "en": "Login",
    "ru": "Войти"
  },
  "newUser": {
    "en": "New user?",
    "ru": "Новый пользователь?"
  },
  "createAccount": {
    "en": "Create account",
    "ru": "Создать аккаунт"
  },
  "name": {
    "en": "Name",
    "ru": "Имя"
  },
  "confirmPassword": {
    "en": "Confirm password",
    "ru": "Подтвердите пароль"
  },
  "register": {
    "en": "Register",
    "ru": "Зарегистрироваться"
  },
  "haveAccount": {
    "en": "Already have an account?",
    "ru": "Уже есть аккаунт?"
  },
  "next": {
    "en": "Next",
    "ru": "Далее"
  },
  "previous": {
    "en": "Previous",
    "ru": "Назад"
  },
  "finish": {
    "en": "Finish",
    "ru": "Завершить"
  },
  "male": {
    "en": "Male",
    "ru": "Мужской"
  },
  "female": {
    "en": "Female",
    "ru": "Женский"
  },
  "yourGender": {
    "en": "Your gender",
    "ru": "Ваш пол"
  },
  "profileSetup": {
    "en": "Profile Setup",
    "ru": "Настройка профиля"
  },
  "age": {
    "en": "Age",
    "ru": "Возраст"
  },
  "height": {
    "en": "Height (cm)",
    "ru": "Рост (см)"
  },
  "weight": {
    "en": "Weight (kg)",
    "ru": "Вес (кг)"
  },
  "bodyProblems": {
    "en": "Body Problems",
    "ru": "Проблемы тела"
  },
  "selectBodyProblems": {
    "en": "Select your body problems",
    "ru": "Выберите ваши проблемы тела"
  },
  "back": {
    "en": "Back",
    "ru": "Спина"
  },
  "knees": {
    "en": "Knees",
    "ru": "Колени"
  },
  "shoulders": {
    "en": "Shoulders",
    "ru": "Плечи"
  },
  "wrists": {
    "en": "Wrists",
    "ru": "Запястья"
  },
  "ankles": {
    "en": "Ankles",
    "ru": "Лодыжки"
  },
  "hips": {
    "en": "Hips",
    "ru": "Бедра"
  },
  "neck": {
    "en": "Neck",
    "ru": "Шея"
  },
  "dietRestrictions": {
    "en": "Diet Restrictions",
    "ru": "Ограничения в диете"
  },
  "selectDietRestrictions": {
    "en": "Select your diet restrictions",
    "ru": "Выберите ваши ограничения в диете"
  },
  "vegetarian": {
    "en": "Vegetarian",
    "ru": "Вегетарианец"
  },
  "vegan": {
    "en": "Vegan",
    "ru": "Веган"
  },
  "glutenFree": {
    "en": "Gluten-free",
    "ru": "Без глютена"
  },
  "dairyFree": {
    "en": "Dairy-free",
    "ru": "Без лактозы"
  },
  "nutFree": {
    "en": "Nut-free",
    "ru": "Без орехов"
  },
  "lowCarb": {
    "en": "Low-carb",
    "ru": "Низкоуглеводная"
  },
  "passwordsDoNotMatch": {
    "en": "Passwords do not match",
    "ru": "Пароли не совпадают"
  },
  "invalidEmail": {
    "en": "Invalid email format",
    "ru": "Неверный формат email"
  },
  "emailAlreadyExists": {
    "en": "User with this email already exists",
    "ru": "Пользователь с таким email уже существует"
  },
  "authFailed": {
    "en": "Authentication failed. Check your email and password.",
    "ru": "Ошибка авторизации. Проверьте email и пароль."
  },
  "registerSuccess": {
    "en": "Registration successful! Please log in.",
    "ru": "Регистрация успешна! Пожалуйста, войдите в систему."
  },
  "loginSuccess": {
    "en": "Login successful!",
    "ru": "Вход выполнен успешно!"
  },
  
  // Navigation
  "dashboard": {
    "en": "Dashboard",
    "ru": "Дашборд"
  },
  "exercises": {
    "en": "Exercises",
    "ru": "Упражнения"
  },
  "nutrition": {
    "en": "Nutrition",
    "ru": "Питание"
  },
  "profile": {
    "en": "Profile",
    "ru": "Профиль"
  },
  "logout": {
    "en": "Logout",
    "ru": "Выйти"
  },
  
  // Dashboard
  "welcomeUser": {
    "en": "Welcome, {name}!",
    "ru": "Добро пожаловать, {name}!"
  },
  "todayStats": {
    "en": "Today's Stats",
    "ru": "Сегодняшняя статистика"
  },
  "calories": {
    "en": "Calories",
    "ru": "Калории"
  },
  "steps": {
    "en": "Steps",
    "ru": "Шаги"
  },
  "workouts": {
    "en": "Workouts",
    "ru": "Тренировки"
  },
  "streak": {
    "en": "Day streak",
    "ru": "Дней подряд"
  },
  "todayTasks": {
    "en": "Today's Tasks",
    "ru": "Задачи на сегодня"
  },
  "completed": {
    "en": "Completed",
    "ru": "Выполнено"
  },
  "noTasks": {
    "en": "No tasks for today",
    "ru": "Нет задач на сегодня"
  },
  "taskComplete": {
    "en": "Task completed!",
    "ru": "Задача выполнена!"
  },
  "taskAdded": {
    "en": "Task added!",
    "ru": "Задача добавлена!"
  },
  
  // Errors
  "errorOccurred": {
    "en": "An error occurred",
    "ru": "Произошла ошибка"
  },
  "dbInitError": {
    "en": "Database initialization error",
    "ru": "Ошибка инициализации базы данных"
  },
  "authRequired": {
    "en": "Authentication required",
    "ru": "Требуется авторизация"
  },
  "loggedOut": {
    "en": "You have been logged out",
    "ru": "Вы вышли из системы"
  },
  
  // Subscription
  "subscription": {
    "en": "Subscription",
    "ru": "Подписка"
  },
  "subscriptionExpired": {
    "en": "Your subscription has expired",
    "ru": "Ваша подписка истекла"
  },
  "subscribeNow": {
    "en": "Subscribe Now",
    "ru": "Подписаться сейчас"
  },
  "workoutPlan": {
    "en": "Workout Plan",
    "ru": "План тренировок"
  },
  "nutritionPlan": {
    "en": "Nutrition Plan",
    "ru": "План питания"
  },
  "comboOffer": {
    "en": "Combo Offer",
    "ru": "Комбо предложение"
  },
  "monthlyPrice": {
    "en": "Monthly Price",
    "ru": "Ежемесячная цена"
  },
  "subscribe": {
    "en": "Subscribe",
    "ru": "Подписаться"
  },
  "month1": {
    "en": "1 Month",
    "ru": "1 Месяц"
  },
  "month6": {
    "en": "6 Months",
    "ru": "6 Месяцев"
  },
  "month12": {
    "en": "12 Months",
    "ru": "12 Месяцев"
  },
  "discount": {
    "en": "Save {percent}%",
    "ru": "Сэкономьте {percent}%"
  },
  "subscriptionSuccess": {
    "en": "Subscription activated!",
    "ru": "Подписка активирована!"
  },
  "active": {
    "en": "Active",
    "ru": "Активно"
  },
  "expires": {
    "en": "Expires: {date}",
    "ru": "Истекает: {date}"
  }
};
