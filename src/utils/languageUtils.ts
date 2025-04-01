// src/utils/languageUtils.ts

// Функция получения текущего выбранного языка
export const getLanguage = (): 'en' | 'ru' => {
  const storedLanguage = localStorage.getItem('ar-fit-language');
  if (storedLanguage === 'en' || storedLanguage === 'ru') {
    return storedLanguage;
  }
  
  // Определение языка браузера
  const browserLanguage = navigator.language.split('-')[0];
  if (browserLanguage === 'ru') {
    return 'ru';
  }
  
  return 'en'; // Английский по умолчанию
};

// Функция установки языка
export const setLanguage = (language: 'en' | 'ru'): void => {
  localStorage.setItem('ar-fit-language', language);
};

// Словарь с переводами
const translations: Record<string, Record<'en' | 'ru', string>> = {
  // Приветствия
  welcome: {
    en: 'Welcome to AR-FIT',
    ru: 'Добро пожаловать в AR-FIT'
  },
  goodMorning: {
    en: 'Good morning',
    ru: 'Доброе утро'
  },
  goodAfternoon: {
    en: 'Good afternoon',
    ru: 'Добрый день'
  },
  goodEvening: {
    en: 'Good evening',
    ru: 'Добрый вечер'
  },
  
  // Аутентификация
  login: {
    en: 'Login',
    ru: 'Вход'
  },
  register: {
    en: 'Register',
    ru: 'Регистрация'
  },
  email: {
    en: 'Email',
    ru: 'Эл. почта'
  },
  password: {
    en: 'Password',
    ru: 'Пароль'
  },
  dontHaveAccount: {
    en: 'Don\'t have an account?',
    ru: 'Нет учетной записи?'
  },
  alreadyHaveAccount: {
    en: 'Already have an account?',
    ru: 'Уже есть учетная запись?'
  },
  invalidCredentials: {
    en: 'Invalid email or password',
    ru: 'Неверная эл. почта или пароль'
  },
  loggedOut: {
    en: 'Successfully logged out',
    ru: 'Вы успешно вышли из системы'
  },
  continue: {
    en: 'Continue',
    ru: 'Продолжить'
  },
  
  // Пол
  selectGender: {
    en: 'Select Your Gender',
    ru: 'Выберите ваш пол'
  },
  male: {
    en: 'Male',
    ru: 'Мужской'
  },
  female: {
    en: 'Female',
    ru: 'Женский'
  },
  
  // Настройка профиля
  profileSetup: {
    en: 'Set Up Your Profile',
    ru: 'Настройка профиля'
  },
  completeProfile: {
    en: 'Complete Your Profile',
    ru: 'Заполните ваш профиль'
  },
  completeProfileDesc: {
    en: 'Provide your basic information',
    ru: 'Укажите вашу основную информацию'
  },
  yourName: {
    en: 'Your Name',
    ru: 'Ваше имя'
  },
  enterName: {
    en: 'Enter your name',
    ru: 'Введите ваше имя'
  },
  complete: {
    en: 'Complete',
    ru: 'Завершить'
  },
  profileUpdated: {
    en: 'Profile successfully updated',
    ru: 'Профиль успешно обновлен'
  },
  name: {
    en: 'Name',
    ru: 'Имя'
  },
  age: {
    en: 'Age',
    ru: 'Возраст'
  },
  years: {
    en: 'years',
    ru: 'лет'
  },
  height: {
    en: 'Height',
    ru: 'Рост'
  },
  weight: {
    en: 'Weight',
    ru: 'Вес'
  },
  cm: {
    en: 'cm',
    ru: 'см'
  },
  kg: {
    en: 'kg',
    ru: 'кг'
  },
  
  // Навигация
  dashboard: {
    en: 'Home',
    ru: 'Главная'
  },
  exercises: {
    en: 'Exercises',
    ru: 'Тренировки'
  },
  nutrition: {
    en: 'Nutrition',
    ru: 'Питание'
  },
  profile: {
    en: 'Profile',
    ru: 'Профиль'
  },
  
  // Проблемные зоны тела
  bodyProblemsSurvey: {
    en: 'Body Problems Survey',
    ru: 'Опрос о проблемных зонах'
  },
  bodyProblemsSurveyDesc: {
    en: 'Select the areas you want to improve',
    ru: 'Выберите зоны, которые хотите улучшить'
  },
  selectBodyParts: {
    en: 'Select the areas of your body you want to improve:',
    ru: 'Выберите зоны тела, которые вы хотите улучшить:'
  },
  backPain: {
    en: 'Back',
    ru: 'Спина'
  },
  neck: {
    en: 'Neck',
    ru: 'Шея'
  },
  shoulders: {
    en: 'Shoulders',
    ru: 'Плечи'
  },
  arms: {
    en: 'Arms',
    ru: 'Руки'
  },
  legs: {
    en: 'Legs',
    ru: 'Ноги'
  },
  knees: {
    en: 'Knees',
    ru: 'Колени'
  },
  feet: {
    en: 'Feet',
    ru: 'Ступни'
  },
  chest: {
    en: 'Chest',
    ru: 'Грудь'
  },
  abdomen: {
    en: 'Abdomen',
    ru: 'Живот'
  },
  noProblems: {
    en: 'No problems',
    ru: 'Нет проблем'
  },
  
  // Пищевые ограничения
  dietRestrictionsSurvey: {
    en: 'Dietary Restrictions Survey',
    ru: 'Пищевые ограничения'
  },
  dietRestrictionsSurveyDesc: {
    en: 'Tell us about your dietary preferences and restrictions',
    ru: 'Расскажите нам о ваших пищевых предпочтениях и ограничениях'
  },
  lactose: {
    en: 'Lactose intolerance',
    ru: 'Непереносимость лактозы'
  },
  gluten: {
    en: 'Gluten intolerance',
    ru: 'Непереносимость глютена'
  },
  nuts: {
    en: 'Nut allergy',
    ru: 'Аллергия на орехи'
  },
  seafood: {
    en: 'Seafood allergy',
    ru: 'Аллергия на морепродукты'
  },
  eggs: {
    en: 'Egg allergy',
    ru: 'Аллергия на яйца'
  },
  soy: {
    en: 'Soy allergy',
    ru: 'Аллергия на сою'
  },
  vegetarian: {
    en: 'Vegetarian',
    ru: 'Вегетарианец'
  },
  vegan: {
    en: 'Vegan',
    ru: 'Веган'
  },
  keto: {
    en: 'Keto diet',
    ru: 'Кето-диета'
  },
  paleo: {
    en: 'Paleo diet',
    ru: 'Палео-диета'
  },
  noRestrictions: {
    en: 'No restrictions',
    ru: 'Нет ограничений'
  },
  
  // Профиль пользователя
  profileSettings: {
    en: 'Profile Settings',
    ru: 'Настройки профиля'
  },
  manageAccount: {
    en: 'Manage your account and preferences',
    ru: 'Управление учетной записью и настройками'
  },
  personalInfo: {
    en: 'Personal Information',
    ru: 'Личная информация'
  },
  preferences: {
    en: 'Preferences',
    ru: 'Предпочтения'
  },
  saveChanges: {
    en: 'Save Changes',
    ru: 'Сохранить изменения'
  },
  notifications: {
    en: 'Notifications',
    ru: 'Уведомления'
  },
  notificationsDesc: {
    en: 'Receive reminders and updates',
    ru: 'Получайте напоминания и обновления'
  },
  darkMode: {
    en: 'Dark Mode',
    ru: 'Темная тема'
  },
  darkModeDesc: {
    en: 'Toggle dark theme on/off',
    ru: 'Переключить темную тему'
  },
  language: {
    en: 'Language',
    ru: 'Язык'
  },
  languageDesc: {
    en: 'Select your preferred language',
    ru: 'Выберите предпочитаемый язык'
  },
  english: {
    en: 'English',
    ru: 'Английский'
  },
  russian: {
    en: 'Russian',
    ru: 'Русский'
  },
  account: {
    en: 'Account',
    ru: 'Учетная запись'
  },
  logOut: {
    en: 'Log Out',
    ru: 'Выйти'
  },
  goBack: {
    en: 'Back',
    ru: 'Назад'
  },
  
  // Панель управления
  yourFitnessProfile: {
    en: 'Your fitness profile overview',
    ru: 'Обзор вашего фитнес-профиля'
  },
  weeklyActivity: {
    en: 'Weekly Activity',
    ru: 'Активность за неделю'
  },
  caloriesBurn: {
    en: 'Calories burned throughout the week',
    ru: 'Сожженные калории за неделю'
  },
  calories: {
    en: 'calories',
    ru: 'калорий'
  },
  todaysGoal: {
    en: 'Today\'s Goal',
    ru: 'Цель на сегодня'
  },
  tasksForToday: {
    en: "Today's Tasks",
    ru: "Задания на сегодня"
  },
  tasksDesc: {
    en: 'Complete these tasks to reach your goals',
    ru: 'Выполните эти задания, чтобы достичь своих целей'
  },
  
  // Индекс массы тела
  underweight: {
    en: 'Underweight',
    ru: 'Недовес'
  },
  normal: {
    en: 'Normal',
    ru: 'Норма'
  },
  overweight: {
    en: 'Overweight',
    ru: 'Избыточный'
  },
  obese: {
    en: 'Obese',
    ru: 'Ожирение'
  },
  
  // Категории тренировок
  strength: {
    en: 'Strength',
    ru: 'Сила'
  },
  cardio: {
    en: 'Cardio',
    ru: 'Кардио'
  },
  flexibility: {
    en: 'Flexibility',
    ru: 'Гибкость'
  },
  
  // Задания на сегодня
  todaysWorkout: {
    en: "Today's Workout",
    ru: "Сегодняшняя тренировка"
  },
  cardioExercise: {
    en: "Cardio Exercise",
    ru: "Кардио упражнение"
  },
  morningYoga: {
    en: "Morning Yoga",
    ru: "Утренняя йога"
  },
  minutes: {
    en: "minutes",
    ru: "минут"
  },
  seconds: {
    en: "seconds",
    ru: "секунд"
  },
  reps: {
    en: "reps",
    ru: "повторений"
  },
  sets: {
    en: "sets",
    ru: "подходов"
  },
  completed: {
    en: "Completed",
    ru: "Выполнено"
  },
  pending: {
    en: "Pending",
    ru: "Ожидается"
  },
  
  // Additional translations for Today's Tasks
  tasksForToday: {
    en: "Today's Tasks",
    ru: "Задания на сегодня"
  },
  completeExercises: {
    en: "Complete exercises to reach your goals",
    ru: "Выполните упражнения для достижения целей"
  },
  moreDetails: {
    en: "More Details",
    ru: "Подробнее"
  },
  taskCompleted: {
    en: "Task Completed",
    ru: "Задание выполнено"
  },
  youCompleted: {
    en: "You completed",
    ru: "Вы выполнили"
  },
  
  // Additional translations for Exercises page
  chooseCategory: {
    en: "Choose a category of exercises",
    ru: "Выберите категорию упражнений"
  },
  strengthDesc: {
    en: "Build muscle and increase strength with these exercises",
    ru: "Наращивайте мышцы и увеличивайте силу с помощью этих упражнений"
  },
  cardioDesc: {
    en: "Improve heart health and burn calories",
    ru: "Улучшите здоровье сердца и сжигайте калории"
  },
  flexibilityDesc: {
    en: "Increase flexibility and prevent injuries",
    ru: "Повысьте гибкость и предотвратите травмы"
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
  
  // Exercise types translations
  pushUps: {
    en: "Push-ups",
    ru: "Отжимания"
  },
  pushUpsDesc: {
    en: "Great exercise for chest, shoulders and triceps",
    ru: "Отличное упражнение для груди, плеч и трицепсов"
  },
  pushUpsDuration: {
    en: "3 sets of 10 reps",
    ru: "3 подхода по 10 повторений"
  },
  squats: {
    en: "Squats",
    ru: "Приседания"
  },
  squatsDesc: {
    en: "Build strong legs and glutes",
    ru: "Укрепите ноги и ягодицы"
  },
  squatsDuration: {
    en: "3 sets of 15 reps",
    ru: "3 подхода по 15 повторений"
  },
  lunges: {
    en: "Lunges",
    ru: "Выпады"
  },
  lungesDesc: {
    en: "Improve balance and leg strength",
    ru: "Улучшите равновесие и силу ног"
  },
  lungesDuration: {
    en: "3 sets of 10 reps per leg",
    ru: "3 подхода по 10 повторений на каждую ногу"
  },
  running: {
    en: "Running",
    ru: "Бег"
  },
  runningDesc: {
    en: "Excellent cardio exercise for endurance",
    ru: "Отличное кардио упражнение для выносливости"
  },
  runningDuration: {
    en: "20 minutes",
    ru: "20 минут"
  },
  jumpingJacks: {
    en: "Jumping Jacks",
    ru: "Прыжки с хлопком"
  },
  jumpingJacksDesc: {
    en: "Full body cardio workout",
    ru: "Кардио для всего тела"
  },
  jumpingJacksDuration: {
    en: "3 sets of 30 seconds",
    ru: "3 подхода по 30 секунд"
  },
  burpees: {
    en: "Burpees",
    ru: "Берпи"
  },
  burpeesDesc: {
    en: "Intense full body exercise",
    ru: "Интенсивное упражнение для всего тела"
  },
  burpeesDuration: {
    en: "3 sets of 10 reps",
    ru: "3 подхода по 10 повторений"
  },
  hamstringStretch: {
    en: "Hamstring Stretch",
    ru: "Растяжка подколенных сухожилий"
  },
  hamstringStretchDesc: {
    en: "Stretch the backs of your legs",
    ru: "Растяните заднюю поверхность ног"
  },
  hamstringStretchDuration: {
    en: "Hold for 30 seconds each leg",
    ru: "Удерживайте 30 секунд на каждую ногу"
  },
  shoulderStretch: {
    en: "Shoulder Stretch",
    ru: "Растяжка плеч"
  },
  shoulderStretchDesc: {
    en: "Relieve tension in the shoulders",
    ru: "Снимите напряжение в плечах"
  },
  shoulderStretchDuration: {
    en: "Hold for 20 seconds each side",
    ru: "Удерживайте 20 секунд на каждую сторону"
  },
  hipFlexorStretch: {
    en: "Hip Flexor Stretch",
    ru: "Растяжка сгибателей бедра"
  },
  hipFlexorStretchDesc: {
    en: "Great for people who sit all day",
    ru: "Отлично подходит для людей, которые сидят весь день"
  },
  hipFlexorStretchDuration: {
    en: "Hold for 30 seconds each side",
    ru: "Удерживайте 30 секунд на каждую сторону"
  },
  
  // Categories
  strengthTraining: {
    en: "Strength Training",
    ru: "Силовые тренировки"
  },
  cardioTraining: {
    en: "Cardio Training",
    ru: "Кардио тренировки"
  },
  warmupStretching: {
    en: "Warmup & Stretching",
    ru: "Разминка и растяжка"
  },
  
  // Calorie tracking
  trackYourCalories: {
    en: "Track your calorie intake",
    ru: "Отслеживайте потребление калорий"
  },
  enterMealName: {
    en: "Please enter meal name",
    ru: "Пожалуйста, введите название блюда"
  },
  enterValidCalories: {
    en: "Please enter valid calorie amount",
    ru: "Пожалуйста, введите корректное количество калорий"
  },
  success: {
    en: "Success",
    ru: "Успешно"
  },
  error: {
    en: "Error",
    ru: "Ошибка"
  },
  mealAdded: {
    en: "Meal added successfully",
    ru: "Прием пищи успешно добавлен"
  },
  comingSoon: {
    en: 'Coming Soon',
    ru: 'Скоро'
  },
  nutritionComingSoonDesc: {
    en: 'We\'re working on personalized nutrition plans for your goals. Check back soon!',
    ru: 'Мы работаем над персонализированными планами питания для ваших целей. Загляните позже!'
  },
  exercisesComingSoonDesc: {
    en: 'We\'re working on personalized exercise plans for your goals. Check back soon!',
    ru: 'Мы работаем над персонализированными планами тренировок для ваших целей. Загляните позже!'
  },
  
  // Общие
  loading: {
    en: 'Loading...',
    ru: 'Загрузка...'
  },
  month: {
    en: 'month',
    ru: 'мес'
  },
  months: {
    en: 'months',
    ru: 'мес'
  },
  
  // Подписки
  subscriptions: {
    en: 'Subscriptions',
    ru: 'Подписки'
  },
  subscriptionsDesc: {
    en: 'Choose a subscription for personalized workouts and nutrition plans',
    ru: 'Выберите подписку для получения индивидуальных тренировок и планов питания'
  },
  monthly: {
    en: '1 month',
    ru: '1 месяц'
  },
  sixMonths: {
    en: '6 months',
    ru: '6 месяцев'
  },
  yearly: {
    en: '12 months',
    ru: '12 месяцев'
  },
  workoutPlan: {
    en: 'Workout Plan',
    ru: 'План тренировок'
  },
  nutritionPlan: {
    en: 'Nutrition Plan',
    ru: 'План питания'
  },
  comboPlan: {
    en: 'Combo Plan',
    ru: 'Комбо'
  },
  personalWorkout: {
    en: 'Personalized workouts',
    ru: 'Индивидуальные упражнения'
  },
  personalNutrition: {
    en: 'Personalized nutrition',
    ru: 'Индивидуальное питание'
  },
  bestValue: {
    en: 'Best value',
    ru: 'Лучшее предложение'
  },
  save: {
    en: 'Save 10%',
    ru: 'Скидка 10%'
  },
  personalizedWorkouts: {
    en: 'Personalized workouts',
    ru: 'Персонализированные тренировки'
  },
  problemZonesAnalysis: {
    en: 'Problem zones analysis',
    ru: 'Анализ проблемных зон'
  },
  personalizedMeals: {
    en: 'Personalized meals',
    ru: 'Персонализированные блюда'
  },
  dietaryRestrictions: {
    en: 'Dietary restrictions',
    ru: 'Учет пищевых ограничений'
  },
  fullSupport: {
    en: 'Full support',
    ru: 'Полная поддержка'
  },
  active: {
    en: 'Active',
    ru: 'Активно'
  },
  subscribe: {
    en: 'Subscribe',
    ru: 'Подписаться'
  },
  subscribed: {
    en: 'Subscribed',
    ru: 'Подписка активна'
  },
  confirmSubscription: {
    en: 'Confirm Subscription',
    ru: 'Подтверждение подписки'
  },
  confirmWorkoutSubscription: {
    en: 'You are about to subscribe to personalized workouts',
    ru: 'Вы собираетесь оформить подписку на индивидуальные тренировки'
  },
  confirmNutritionSubscription: {
    en: 'You are about to subscribe to personalized nutrition',
    ru: 'Вы собираетесь оформить подписку на индивидуальное питание'
  },
  confirmComboSubscription: {
    en: 'You are about to subscribe to combo plan',
    ru: 'Вы собираетесь оформить комбо-подписку'
  },
  plan: {
    en: 'Plan',
    ru: 'План'
  },
  duration: {
    en: 'Duration',
    ru: 'Длительность'
  },
  price: {
    en: 'Price',
    ru: 'Цена'
  },
  paymentSimulation: {
    en: 'This is a payment simulation for demonstration purposes.',
    ru: 'Это симуляция оплаты для демонстрационных целей.'
  },
  cancel: {
    en: 'Cancel',
    ru: 'Отмена'
  },
  confirmPayment: {
    en: 'Confirm Payment',
    ru: 'Подтвердить оплату'
  },
  subscriptionActivated: {
    en: 'Subscription successfully activated!',
    ru: 'Подписка успешно активирована!'
  },
  subscriptionNeeded: {
    en: 'Subscription Required',
    ru: 'Требуется подписка'
  },
  workoutSubscriptionDesc: {
    en: 'To access personalized workouts, a subscription is required',
    ru: 'Для доступа к индивидуальным тренировкам необходима подписка'
  },
  nutritionSubscriptionDesc: {
    en: 'To access personalized nutrition, a subscription is required',
    ru: 'Для доступа к персонализированному питанию необходима подписка'
  },
  workoutSubscriptionBenefit: {
    en: 'Get a personalized workout program based on your problem areas and goals.',
    ru: 'Получите персонализированную программу тренировок на основе ваших проблемных зон и целей.'
  },
  nutritionSubscriptionBenefit: {
    en: 'Get a personalized nutrition plan taking into account your preferences and restrictions.',
    ru: 'Получите персонализированный план питания, учитывающий ваши предпочтения и ограничения.'
  },
  workoutPriceInfo: {
    en: 'Subscription from $6.99/month',
    ru: 'Подписка от 499 ₽/месяц'
  },
  nutritionPriceInfo: {
    en: 'Subscription from $6.99/month',
    ru: 'Подписка от 499 ₽/месяц'
  },
  later: {
    en: 'Later',
    ru: 'Позже'
  },
  subscribeNow: {
    en: 'Subscribe Now',
    ru: 'Подписаться'
  },
  day: {
    en: "Day",
    ru: "День"
  },
  total: {
    en: "Total",
    ru: "Всего"
  },
  monday: {
    en: "Monday",
    ru: "Понедельник"
  },
  tuesday: {
    en: "Tuesday",
    ru: "Вторник"
  },
  wednesday: {
    en: "Wednesday",
    ru: "Среда"
  },
  thursday: {
    en: "Thursday",
    ru: "Четверг"
  },
  friday: {
    en: "Friday",
    ru: "Пятница"
  },
  saturday: {
    en: "Saturday",
    ru: "Суббота"
  },
  sunday: {
    en: "Sunday",
    ru: "Воскресенье"
  },
  authRequired: {
    en: "Authentication required",
    ru: "Требуется авторизация"
  },
  nutritionDesc: {
    en: "Track your nutrition intake",
    ru: "Отслеживайте ваше питание"
  },
  calorieCalculator: {
    en: "Calorie Calculator",
    ru: "Калькулятор калорий"
  },
  mealName: {
    en: "Meal name",
    ru: "Название блюда"
  },
  calorieAmount: {
    en: "Calorie amount",
    ru: "Количество калорий"
  },
  add: {
    en: "Add",
    ru: "Добавить"
  },
  addMeal: {
    en: "Add meal",
    ru: "Добавить блюдо"
  },
  calorieHistory: {
    en: "Calorie History",
    ru: "История калорий"
  },
  weeklyIntake: {
    en: "Weekly calorie intake",
    ru: "Потребление калорий за неделю"
  }
};

// Функция перевода текста
export const t = (key: string, language: 'en' | 'ru'): string => {
  const translation = translations[key];
  if (!translation) return key;
  
  return translation[language] || key;
};
