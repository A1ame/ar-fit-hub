
import mysql from 'mysql2/promise';

// Конфигурация подключения к MySQL
const dbConfig = {
  host: 'localhost',  // Хост вашей базы данных
  user: 'root',       // Имя пользователя MySQL 
  password: '',       // Пароль пользователя MySQL
  database: 'ar_fit'  // Имя базы данных
};

// Создаем пул соединений
export const pool = mysql.createPool(dbConfig);

// Функция для выполнения SQL запросов
export async function executeQuery(query: string, params: any[] = []): Promise<any> {
  try {
    const connection = await pool.getConnection();
    try {
      const [results] = await connection.execute(query, params);
      return results;
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Database error:', error);
    throw error;
  }
}

// SQL для создания таблиц если они не существуют
export const initializeDatabase = async () => {
  const queries = [
    `CREATE TABLE IF NOT EXISTS users (
      id VARCHAR(36) PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(100) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      gender ENUM('male', 'female') NOT NULL,
      age INT NOT NULL,
      weight FLOAT NOT NULL,
      height FLOAT NOT NULL,
      logged_in BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      body_problems JSON,
      diet_restrictions JSON
    )`,
    
    `CREATE TABLE IF NOT EXISTS user_stats (
      user_id VARCHAR(36) PRIMARY KEY,
      calories JSON NOT NULL,
      steps JSON NOT NULL,
      workouts_completed INT DEFAULT 0,
      streak_days INT DEFAULT 0,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )`,
    
    `CREATE TABLE IF NOT EXISTS subscriptions (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id VARCHAR(36) NOT NULL,
      type ENUM('workout', 'nutrition', 'combo') NOT NULL,
      duration INT NOT NULL,
      start_date TIMESTAMP NOT NULL,
      end_date TIMESTAMP NOT NULL,
      price FLOAT NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )`,
    
    `CREATE TABLE IF NOT EXISTS meals (
      id VARCHAR(36) PRIMARY KEY,
      user_id VARCHAR(36) NOT NULL,
      name VARCHAR(255) NOT NULL,
      calories INT NOT NULL,
      date DATE NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )`,
    
    `CREATE TABLE IF NOT EXISTS tasks (
      id VARCHAR(36) PRIMARY KEY,
      user_id VARCHAR(36) NOT NULL,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      category ENUM('strength', 'cardio', 'flexibility') NOT NULL,
      completed BOOLEAN DEFAULT FALSE,
      date DATE NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )`
  ];

  try {
    for (const query of queries) {
      await executeQuery(query);
    }
    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Failed to initialize database:', error);
  }
};
