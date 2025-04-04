
// DOM Elements
const loginPage = document.getElementById('login-page');
const registerPage = document.getElementById('register-page');
const dashboardPage = document.getElementById('dashboard-page');
const exercisesPage = document.getElementById('exercises-page');
const nutritionPage = document.getElementById('nutrition-page');
const profilePage = document.getElementById('profile-page');

const showRegisterBtn = document.getElementById('show-register');
const showLoginBtn = document.getElementById('show-login');
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const logoutButton = document.getElementById('logout-button');
const themeToggle = document.getElementById('theme-toggle');
const languageToggle = document.getElementById('language-toggle');
const languageSelect = document.getElementById('language-select');
const calorieCalculator = document.getElementById('calorie-calculator');
const calorieResult = document.getElementById('calorie-result');
const calorieValue = document.getElementById('calorie-value');
const profileForm = document.getElementById('profile-form');
const tabButtons = document.querySelectorAll('.tab-button');
const exerciseCards = document.querySelectorAll('.exercise-card');
const navItems = document.querySelectorAll('.nav-item');

// Database Simulation
let users = JSON.parse(localStorage.getItem('users')) || [];
let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;
let tasks = [
  {
    id: 't1',
    title: 'Утренняя тренировка',
    description: 'Сделайте 3 подхода отжиманий по 15 раз',
    category: 'strength',
    completed: false
  },
  {
    id: 't2',
    title: 'Кардио тренировка',
    description: '20 минут бега с умеренной интенсивностью',
    category: 'cardio',
    completed: false
  }
];

// Theme Management
function initTheme() {
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.body.classList.toggle('dark', savedTheme === 'dark');
  if (themeToggle) {
    themeToggle.checked = savedTheme === 'dark';
  }
}

function toggleTheme() {
  const isDark = document.body.classList.toggle('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

// Language Management
function initLanguage() {
  const savedLanguage = localStorage.getItem('language') || 'ru';
  if (languageSelect) {
    languageSelect.value = savedLanguage;
  }
  if (languageToggle) {
    languageToggle.innerText = savedLanguage === 'ru' ? 'EN' : 'RU';
  }
}

function toggleLanguage() {
  const currentLanguage = localStorage.getItem('language') || 'ru';
  const newLanguage = currentLanguage === 'ru' ? 'en' : 'ru';
  localStorage.setItem('language', newLanguage);
  
  if (languageToggle) {
    languageToggle.innerText = newLanguage === 'ru' ? 'EN' : 'RU';
  }
  
  // Here you would update all text content based on the selected language
  // This is simplified for the demo
  alert('Язык изменён на: ' + (newLanguage === 'ru' ? 'Русский' : 'English'));
}

// Navigation
function navigateTo(pageId) {
  const pages = [loginPage, registerPage, dashboardPage, exercisesPage, nutritionPage, profilePage];
  pages.forEach(page => {
    if (page) page.classList.add('hidden');
  });
  
  const selectedPage = document.getElementById(`${pageId}-page`);
  if (selectedPage) {
    selectedPage.classList.remove('hidden');
  }
  
  // Update navigation active state
  navItems.forEach(item => {
    item.classList.toggle('active', item.dataset.page === pageId);
  });
  
  window.scrollTo(0, 0);
}

// User Authentication
function registerUser(email, password) {
  const userExists = users.some(user => user.email === email);
  
  if (userExists) {
    alert('Пользователь с таким email уже существует');
    return false;
  }
  
  const newUser = {
    id: Date.now().toString(),
    email,
    password, // In a real app, you would hash the password
    name: email.split('@')[0],
    weight: 70,
    height: 170,
    age: 30,
    goal: 'muscle-gain',
    createdAt: new Date().toISOString()
  };
  
  users.push(newUser);
  localStorage.setItem('users', JSON.stringify(users));
  return true;
}

function loginUser(email, password) {
  const user = users.find(user => user.email === email && user.password === password);
  
  if (!user) {
    alert('Неверный email или пароль');
    return false;
  }
  
  currentUser = user;
  localStorage.setItem('currentUser', JSON.stringify(user));
  return true;
}

function logoutUser() {
  currentUser = null;
  localStorage.removeItem('currentUser');
  navigateTo('login');
}

function updateUserProfile(formData) {
  if (!currentUser) return;
  
  currentUser = {
    ...currentUser,
    ...formData
  };
  
  // Update user in the users array
  const userIndex = users.findIndex(user => user.id === currentUser.id);
  if (userIndex !== -1) {
    users[userIndex] = currentUser;
    localStorage.setItem('users', JSON.stringify(users));
  }
  
  localStorage.setItem('currentUser', JSON.stringify(currentUser));
  alert('Профиль обновлен');
}

// Load user data
function loadUserData() {
  if (!currentUser) return;
  
  // Set profile info
  const profileName = document.getElementById('profile-name');
  const profileEmail = document.getElementById('profile-email');
  const profileWeight = document.getElementById('profile-weight');
  const profileHeight = document.getElementById('profile-height');
  const profileAge = document.getElementById('profile-age');
  const profileGoal = document.getElementById('profile-goal');
  
  if (profileName) profileName.textContent = currentUser.name || 'Пользователь';
  if (profileEmail) profileEmail.textContent = currentUser.email;
  if (profileWeight) profileWeight.value = currentUser.weight || 70;
  if (profileHeight) profileHeight.value = currentUser.height || 170;
  if (profileAge) profileAge.value = currentUser.age || 30;
  if (profileGoal) profileGoal.value = currentUser.goal || 'muscle-gain';
}

// Calorie Calculator
function calculateCalories(weight, height, age, activity, gender) {
  // Basic Mifflin-St Jeor Equation
  let bmr;
  
  if (gender === 'male') {
    bmr = 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    bmr = 10 * weight + 6.25 * height - 5 * age - 161;
  }
  
  // Activity multiplier
  return Math.round(bmr * parseFloat(activity));
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initLanguage();
  
  // Check if user is logged in
  if (currentUser) {
    loadUserData();
    navigateTo('dashboard');
  } else {
    navigateTo('login');
  }
  
  // Auth navigation
  if (showRegisterBtn) {
    showRegisterBtn.addEventListener('click', (e) => {
      e.preventDefault();
      navigateTo('register');
    });
  }
  
  if (showLoginBtn) {
    showLoginBtn.addEventListener('click', (e) => {
      e.preventDefault();
      navigateTo('login');
    });
  }
  
  // Login form
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      
      if (loginUser(email, password)) {
        loadUserData();
        navigateTo('dashboard');
      }
    });
  }
  
  // Register form
  if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('reg-email').value;
      const password = document.getElementById('reg-password').value;
      
      if (registerUser(email, password)) {
        alert('Аккаунт создан! Теперь вы можете войти.');
        navigateTo('login');
      }
    });
  }
  
  // Logout
  if (logoutButton) {
    logoutButton.addEventListener('click', logoutUser);
  }
  
  // Theme toggling
  if (themeToggle) {
    themeToggle.addEventListener('change', toggleTheme);
  }
  
  // Language toggling
  if (languageToggle) {
    languageToggle.addEventListener('click', toggleLanguage);
  }
  
  if (languageSelect) {
    languageSelect.addEventListener('change', (e) => {
      localStorage.setItem('language', e.target.value);
    });
  }
  
  // Navigation
  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const page = item.dataset.page;
      navigateTo(page);
    });
  });
  
  // Calorie Calculator
  if (calorieCalculator) {
    calorieCalculator.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const weight = parseFloat(document.getElementById('weight').value);
      const height = parseFloat(document.getElementById('height').value);
      const age = parseInt(document.getElementById('age').value);
      const activity = document.getElementById('activity').value;
      const gender = document.querySelector('input[name="gender"]:checked').value;
      
      const calories = calculateCalories(weight, height, age, activity, gender);
      
      if (calorieResult) calorieResult.classList.remove('hidden');
      if (calorieValue) calorieValue.textContent = calories;
    });
  }
  
  // Profile form
  if (profileForm) {
    profileForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const formData = {
        weight: parseFloat(document.getElementById('profile-weight').value),
        height: parseFloat(document.getElementById('profile-height').value),
        age: parseInt(document.getElementById('profile-age').value),
        goal: document.getElementById('profile-goal').value
      };
      
      updateUserProfile(formData);
    });
  }
  
  // Exercise filtering
  if (tabButtons) {
    tabButtons.forEach(button => {
      button.addEventListener('click', () => {
        const category = button.dataset.category;
        
        // Update active tab
        tabButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Filter exercises
        exerciseCards.forEach(card => {
          if (category === 'all' || card.dataset.category === category) {
            card.style.display = 'block';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }
  
  // Task toggling
  document.querySelectorAll('input[type="checkbox"][id^="task"]').forEach(checkbox => {
    checkbox.addEventListener('change', () => {
      const taskId = checkbox.id.replace('task', '');
      const taskIndex = tasks.findIndex(t => t.id === 't' + taskId);
      
      if (taskIndex !== -1) {
        tasks[taskIndex].completed = checkbox.checked;
        
        // Update task appearance
        const label = document.querySelector(`label[for="${checkbox.id}"]`);
        const description = checkbox.closest('.task-card').querySelector('.task-description');
        
        if (checkbox.checked) {
          label.style.textDecoration = 'line-through';
          label.style.color = 'var(--muted-text)';
          description.style.textDecoration = 'line-through';
          description.style.color = 'var(--muted-text)';
        } else {
          label.style.textDecoration = 'none';
          label.style.color = 'var(--foreground)';
          description.style.textDecoration = 'none';
          description.style.color = 'var(--muted-text)';
        }
      }
    });
  });
});
