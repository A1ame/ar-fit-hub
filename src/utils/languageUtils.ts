
// Dictionary for translations
export const translations: Record<string, Record<string, string>> = {
  en: {
    // Auth
    "welcome": "Welcome to AR-FIT",
    "login": "Login",
    "register": "Register",
    "email": "Email",
    "password": "Password",
    "continue": "Continue",
    "dontHaveAccount": "Don't have an account?",
    "alreadyHaveAccount": "Already have an account?",
    "invalidCredentials": "Invalid email or password",
    "goBack": "Go Back",
    
    // Gender
    "gender": "Select Your Gender",
    "genderHelp": "This helps us personalize your fitness and nutrition plans",
    "male": "Male",
    "female": "Female",
    
    // Profile
    "completeProfile": "Complete Your Profile",
    "completeProfileDesc": "Let's gather some basic information about you",
    "yourName": "Your Name",
    "enterName": "Enter your name",
    "age": "Age",
    "years": "years",
    "weight": "Weight",
    "kg": "kg",
    "height": "Height",
    "cm": "cm",
    "complete": "Complete",
    
    // Dashboard
    "loading": "Loading...",
    "goodMorning": "Good Morning",
    "goodAfternoon": "Good Afternoon",
    "goodEvening": "Good Evening",
    "yourFitnessProfile": "Your fitness profile",
    "todaysGoal": "Today's Goal",
    "weeklyActivity": "Weekly Activity",
    "caloriesBurn": "Calories burned this week",
    "calories": "calories",
    "todayTasks": "Today's Tasks",
    "completeExercises": "Complete these exercises for your daily goal",
    "taskCompleted": "Task Completed!",
    "youCompleted": "You have completed",
    "moreDetails": "More Details",
    
    // Nutrition
    "nutritionProfile": "Nutrition Profile",
    "calculateCalories": "Calculate Your Daily Calories",
    "caloriesDesc": "Find out how many calories you should consume daily",
    "activityLevel": "Activity Level",
    "sedentary": "Sedentary",
    "light": "Light",
    "moderate": "Moderate",
    "active": "Active",
    "veryActive": "Very Active",
    "goal": "Goal",
    "maintenance": "Maintain Weight",
    "mildLoss": "Mild Weight Loss",
    "weightLoss": "Weight Loss",
    "extremeLoss": "Extreme Weight Loss",
    "mildGain": "Mild Weight Gain",
    "weightGain": "Weight Gain",
    "extremeGain": "Extreme Weight Gain",
    "calculate": "Calculate",
    "dailyCalories": "Your Recommended Daily Calories",
    "protein": "Protein",
    "carbs": "Carbs",
    "fat": "Fat",
    "caloriesPerDay": "calories/day",
    "disclaimer": "This is an estimate based on the information provided",
    
    // Exercise
    "exercises": "Exercises",
    "chooseCategory": "Choose a category to explore exercises",
    "strengthTraining": "Strength",
    "strengthDesc": "Build muscle with these strength training exercises",
    "cardioTraining": "Cardio",
    "cardioDesc": "Improve your cardiovascular health with these exercises",
    "warmupStretching": "Stretching",
    "flexibilityDesc": "Improve your flexibility and prevent injuries",
    "beginner": "Beginner",
    "intermediate": "Intermediate",
    "advanced": "Advanced",
    
    // Exercise List
    "pushUps": "Push-ups",
    "pushUpsDesc": "Great for chest, shoulders, and triceps",
    "pushUpsDuration": "3 sets of 10-15 reps",
    "squats": "Squats",
    "squatsDesc": "Works your quadriceps, hamstrings, and glutes",
    "squatsDuration": "3 sets of 12-15 reps",
    "lunges": "Lunges",
    "lungesDesc": "Targets the legs, glutes, and core",
    "lungesDuration": "3 sets of 10 reps each leg",
    "running": "Running",
    "runningDesc": "Great for cardiovascular health and endurance",
    "runningDuration": "20-30 minutes",
    "jumpingJacks": "Jumping Jacks",
    "jumpingJacksDesc": "Full body workout to get your heart rate up",
    "jumpingJacksDuration": "3 sets of 30 seconds",
    "burpees": "Burpees",
    "burpeesDesc": "Intense full body exercise that builds strength and endurance",
    "burpeesDuration": "3 sets of 10 reps",
    "hamstringStretch": "Hamstring Stretch",
    "hamstringStretchDesc": "Improves flexibility in the back of your legs",
    "hamstringStretchDuration": "Hold for 30 seconds each leg",
    "shoulderStretch": "Shoulder Stretch",
    "shoulderStretchDesc": "Relieves tension in the shoulders and improves mobility",
    "shoulderStretchDuration": "Hold for 30 seconds each side",
    "hipFlexorStretch": "Hip Flexor Stretch",
    "hipFlexorStretchDesc": "Helps alleviate lower back pain and improves hip mobility",
    "hipFlexorStretchDuration": "Hold for 30 seconds each side",
    
    // Task Categories
    "strength": "Strength",
    "cardio": "Cardio",
    "flexibility": "Flexibility",
    
    // BMI Categories
    "underweight": "Недостаток",
    "normal": "Нормально",
    "overweight": "Избыток",
    "obese": "Ожирение",
    
    // Diet Survey
    "dietRestrictionsSurvey": "Dietary Restrictions",
    "dietRestrictionsSurveyDesc": "Select any dietary restrictions you have",
    "lactoseIntolerant": "Lactose Intolerant",
    "glutenFree": "Gluten Free",
    "vegetarian": "Vegetarian",
    "vegan": "Vegan",
    "nutsAllergy": "Nuts Allergy",
    "seafoodAllergy": "Seafood Allergy",
    "citrusAllergy": "Citrus Fruits Allergy",
    "eggsAllergy": "Eggs Allergy",
    "soyAllergy": "Soy Allergy",
    "noDietRestrictions": "No Dietary Restrictions",
    
    // Body Problems Survey
    "bodyProblemsSurvey": "Body Problem Areas",
    "bodyProblemsSurveyDesc": "Select areas where you experience discomfort or want to improve",
    "backPain": "Back Pain",
    "neck": "Neck",
    "shoulders": "Shoulders",
    "arms": "Arms",
    "legs": "Legs",
    "knees": "Knees",
    "feet": "Feet",
    "chest": "Chest",
    "abdomen": "Abdomen",
    "noProblems": "No Problem Areas",
    
    // Subscription
    "subscriptions": "Subscriptions",
    "subscriptionsDesc": "Choose a subscription to get personalized workouts and meal plans",
    "workoutPlan": "Workout Plan",
    "personalWorkout": "Personalized exercises",
    "nutritionPlan": "Nutrition Plan",
    "personalNutrition": "Personalized meals",
    "comboPlan": "Combo Plan",
    "bestValue": "Best value",
    "month": "month",
    "months": "months",
    "monthly": "1 month",
    "sixMonths": "6 months",
    "yearly": "12 months",
    "active": "Active",
    "save": "Save",
    "personalizedWorkouts": "Personalized workouts",
    "problemZonesAnalysis": "Problem zones analysis",
    "personalizedMeals": "Personalized meals",
    "dietaryRestrictions": "Dietary restrictions consideration",
    "fullSupport": "Full support",
    "subscribe": "Subscribe",
    "subscribed": "Subscribed",
    "confirmSubscription": "Confirm Subscription",
    "confirmWorkoutSubscription": "You are about to subscribe to personalized workouts",
    "confirmNutritionSubscription": "You are about to subscribe to personalized nutrition",
    "confirmComboSubscription": "You are about to subscribe to combo plan",
    "plan": "Plan",
    "duration": "Duration",
    "price": "Price",
    "paymentSimulation": "This is a payment simulation for demonstration purposes",
    "cancel": "Cancel",
    "confirmPayment": "Confirm Payment",
    "subscriptionActivated": "Subscription activated successfully!",
    "profileUpdated": "Profile updated successfully!",
    
    // Subscription Prompt
    "subscriptionNeeded": "Subscription Required",
    "workoutSubscriptionDesc": "You need an active subscription to access personalized workouts",
    "nutritionSubscriptionDesc": "You need an active subscription to access personalized meal plans",
    "workoutSubscriptionBenefit": "Get a personalized workout plan tailored to your goals and problems",
    "nutritionSubscriptionBenefit": "Get a personalized meal plan considering your preferences and restrictions",
    "workoutPriceInfo": "Workout subscription starts at 499₽ per month",
    "nutritionPriceInfo": "Nutrition subscription starts at 499₽ per month",
    "later": "Maybe Later",
    "subscribeNow": "Subscribe Now",
    
    // Navigation
    "dashboard": "Home",
    "training": "Exercises",
    "nutrition": "Nutrition",
    "profile": "Profile",

    // Stats
    "caloriesConsumed": "Calories Consumed",
    "caloriesBurned": "Calories Burned"
  },
  ru: {
    // Auth
    "welcome": "Добро пожаловать в AR-FIT",
    "login": "Вход",
    "register": "Регистрация",
    "email": "Эл. почта",
    "password": "Пароль",
    "continue": "Продолжить",
    "dontHaveAccount": "Нет аккаунта?",
    "alreadyHaveAccount": "Уже есть аккаунт?",
    "invalidCredentials": "Неверный email или пароль",
    "goBack": "Назад",
    
    // Gender
    "gender": "Выберите Ваш Пол",
    "genderHelp": "Это поможет персонализировать ваши планы тренировок и питания",
    "male": "Мужской",
    "female": "Женский",
    
    // Profile
    "completeProfile": "Заполните Ваш Профиль",
    "completeProfileDesc": "Соберем основную информацию о вас",
    "yourName": "Ваше Имя",
    "enterName": "Введите ваше имя",
    "age": "Возраст",
    "years": "лет",
    "weight": "Вес",
    "kg": "кг",
    "height": "Рост",
    "cm": "см",
    "complete": "Завершить",
    
    // Dashboard
    "loading": "Загрузка...",
    "goodMorning": "Доброе утро",
    "goodAfternoon": "Добрый день",
    "goodEvening": "Добрый вечер",
    "yourFitnessProfile": "Ваш фитнес-профиль",
    "todaysGoal": "Цель на сегодня",
    "weeklyActivity": "Недельная активность",
    "caloriesBurn": "Сожжено калорий за неделю",
    "calories": "калорий",
    "todayTasks": "Задачи на сегодня",
    "completeExercises": "Выполните эти упражнения для достижения дневной цели",
    "taskCompleted": "Задача выполнена!",
    "youCompleted": "Вы выполнили",
    "moreDetails": "Подробнее",
    
    // Nutrition
    "nutritionProfile": "Профиль питания",
    "calculateCalories": "Рассчитайте суточную норму калорий",
    "caloriesDesc": "Узнайте, сколько калорий вам нужно потреблять ежедневно",
    "activityLevel": "Уровень активности",
    "sedentary": "Сидячий образ жизни",
    "light": "Легкая активность",
    "moderate": "Умеренная активность",
    "active": "Активный образ жизни",
    "veryActive": "Очень активный образ жизни",
    "goal": "Цель",
    "maintenance": "Поддержание веса",
    "mildLoss": "Легкая потеря веса",
    "weightLoss": "Потеря веса",
    "extremeLoss": "Интенсивная потеря веса",
    "mildGain": "Легкий набор веса",
    "weightGain": "Набор веса",
    "extremeGain": "Интенсивный набор веса",
    "calculate": "Рассчитать",
    "dailyCalories": "Рекомендуемое количество калорий",
    "protein": "Белки",
    "carbs": "Углеводы",
    "fat": "Жиры",
    "caloriesPerDay": "калорий/день",
    "disclaimer": "Это примерная оценка на основе предоставленной информации",
    
    // Exercise
    "exercises": "Упражнения",
    "chooseCategory": "Выберите категорию для просмотра упражнений",
    "strengthTraining": "Сила",
    "strengthDesc": "Наращивайте мышцы с помощью этих силовых упражнений",
    "cardioTraining": "Кардио",
    "cardioDesc": "Улучшите здоровье сердечно-сосудистой системы с помощью этих упражнений",
    "warmupStretching": "Растяжка",
    "flexibilityDesc": "Улучшите гибкость и предотвратите травмы",
    "beginner": "Начинающий",
    "intermediate": "Средний",
    "advanced": "Продвинутый",
    
    // Exercise List
    "pushUps": "Отжимания",
    "pushUpsDesc": "Отлично для груди, плеч и трицепсов",
    "pushUpsDuration": "3 подхода по 10-15 повторений",
    "squats": "Приседания",
    "squatsDesc": "Работают квадрицепсы, подколенные сухожилия и ягодицы",
    "squatsDuration": "3 подхода по 12-15 повторений",
    "lunges": "Выпады",
    "lungesDesc": "Нацелены на ноги, ягодицы и корпус",
    "lungesDuration": "3 подхода по 10 повторений на каждую ногу",
    "running": "Бег",
    "runningDesc": "Отлично для сердечно-сосудистой системы и выносливости",
    "runningDuration": "20-30 минут",
    "jumpingJacks": "Прыжки «Звезда»",
    "jumpingJacksDesc": "Тренировка всего тела для повышения пульса",
    "jumpingJacksDuration": "3 подхода по 30 секунд",
    "burpees": "Бёрпи",
    "burpeesDesc": "Интенсивное упражнение для всего тела, развивающее силу и выносливость",
    "burpeesDuration": "3 подхода по 10 повторений",
    "hamstringStretch": "Растяжка подколенных сухожилий",
    "hamstringStretchDesc": "Улучшает гибкость задней поверхности ног",
    "hamstringStretchDuration": "Держите 30 секунд на каждую ногу",
    "shoulderStretch": "Растяжка плеч",
    "shoulderStretchDesc": "Снимает напряжение в плечах и улучшает подвижность",
    "shoulderStretchDuration": "Держите 30 секунд с каждой стороны",
    "hipFlexorStretch": "Растяжка сгибателей бедра",
    "hipFlexorStretchDesc": "Помогает облегчить боль в пояснице и улучшает подвижность бедер",
    "hipFlexorStretchDuration": "Держите 30 секунд с каждой стороны",
    
    // Task Categories
    "strength": "Сила",
    "cardio": "Кардио",
    "flexibility": "Гибкость",
    
    // BMI Categories
    "underweight": "Недостаток",
    "normal": "Нормально",
    "overweight": "Избыток",
    "obese": "Ожирение",
    
    // Diet Survey
    "dietRestrictionsSurvey": "Пищевые ограничения",
    "dietRestrictionsSurveyDesc": "Выберите любые пищевые ограничения, которые у вас есть",
    "lactoseIntolerant": "Непереносимость лактозы",
    "glutenFree": "Без глютена",
    "vegetarian": "Вегетарианство",
    "vegan": "Веганство",
    "nutsAllergy": "Аллергия на орехи",
    "seafoodAllergy": "Аллергия на морепродукты",
    "citrusAllergy": "Аллергия на цитрусовые",
    "eggsAllergy": "Аллергия на яйца",
    "soyAllergy": "Аллергия на сою",
    "noDietRestrictions": "Нет пищевых ограничений",
    
    // Body Problems Survey
    "bodyProblemsSurvey": "Проблемные зоны тела",
    "bodyProblemsSurveyDesc": "Выберите области, где вы испытываете дискомфорт или хотите улучшений",
    "backPain": "Боль в спине",
    "neck": "Шея",
    "shoulders": "Плечи",
    "arms": "Руки",
    "legs": "Ноги",
    "knees": "Колени",
    "feet": "Стопы",
    "chest": "Грудь",
    "abdomen": "Живот",
    "noProblems": "Нет проблемных зон",
    
    // Subscription
    "subscriptions": "Подписки",
    "subscriptionsDesc": "Выберите подписку для получения индивидуальных тренировок и планов питания",
    "workoutPlan": "План тренировок",
    "personalWorkout": "Индивидуальные упражнения",
    "nutritionPlan": "План питания",
    "personalNutrition": "Индивидуальное питание",
    "comboPlan": "Комбо",
    "bestValue": "Лучшее предложение",
    "month": "месяц",
    "months": "месяцев",
    "monthly": "1 месяц",
    "sixMonths": "6 месяцев",
    "yearly": "12 месяцев",
    "active": "Активно",
    "save": "Скидка",
    "personalizedWorkouts": "Персонализированные тренировки",
    "problemZonesAnalysis": "Анализ проблемных зон",
    "personalizedMeals": "Персонализированные блюда",
    "dietaryRestrictions": "Учет пищевых ограничений",
    "fullSupport": "Полная поддержка",
    "subscribe": "Подписаться",
    "subscribed": "Подписка активна",
    "confirmSubscription": "Подтверждение подписки",
    "confirmWorkoutSubscription": "Вы собираетесь оформить подписку на индивидуальные тренировки",
    "confirmNutritionSubscription": "Вы собираетесь оформить подписку на индивидуальное питание",
    "confirmComboSubscription": "Вы собираетесь оформить комбо-подписку",
    "plan": "План",
    "duration": "Длительность",
    "price": "Цена",
    "paymentSimulation": "Это симуляция оплаты для демонстрационных целей",
    "cancel": "Отмена",
    "confirmPayment": "Подтвердить оплату",
    "subscriptionActivated": "Подписка успешно активирована!",
    "profileUpdated": "Профиль успешно обновлен!",
    
    // Subscription Prompt
    "subscriptionNeeded": "Требуется подписка",
    "workoutSubscriptionDesc": "Вам нужна активная подписка для доступа к персонализированным тренировкам",
    "nutritionSubscriptionDesc": "Вам нужна активная подписка для доступа к персонализированным планам питания",
    "workoutSubscriptionBenefit": "Получите персонализированный план тренировок под ваши цели и проблемы",
    "nutritionSubscriptionBenefit": "Получите персонализированный план питания с учетом ваших предпочтений и ограничений",
    "workoutPriceInfo": "Подписка на тренировки начинается от 499₽ в месяц",
    "nutritionPriceInfo": "Подписка на питание начинается от 499₽ в месяц",
    "later": "Может быть позже",
    "subscribeNow": "Подписаться сейчас",
    
    // Navigation
    "dashboard": "Главная",
    "training": "Упражнения",
    "nutrition": "Питание",
    "profile": "Профиль",

    // Stats
    "caloriesConsumed": "Потреблено калорий",
    "caloriesBurned": "Сожжено калорий"
  }
};

// Default language
let defaultLanguage: "en" | "ru" = "ru";

// Function to get language from local storage or use default
export const getLanguage = (): "en" | "ru" => {
  const storedLanguage = localStorage.getItem("ar-fit-language");
  return (storedLanguage as "en" | "ru") || defaultLanguage;
};

// Function to set language in local storage
export const setDefaultLanguage = (language: "en" | "ru"): void => {
  defaultLanguage = language;
  localStorage.setItem("ar-fit-language", language);
};

// Translation function - now accepts optional language parameter
export const t = (key: string, language?: "en" | "ru"): string => {
  const lang = language || getLanguage();
  
  if (translations[lang] && translations[lang][key]) {
    return translations[lang][key];
  }
  
  // Fallback to English if translation not found
  if (translations["en"] && translations["en"][key]) {
    return translations["en"][key];
  }
  
  // Return key as is if no translation found
  return key;
};
