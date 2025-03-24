import mysql from 'mysql';
import dotenv from 'dotenv';

dotenv.config(); // Load biến môi trường từ .env

export const db = mysql.createPool({
  connectionLimit: 10, // Giới hạn số kết nối đồng thời
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DBNAME,
  port: 3306
});

// Kiểm tra kết nối
db.getConnection((err, connection) => {
  if (err) {
    console.error("Database connection failed:", err.message);
  } else {
    console.log("Connected to MySQL database");
    connection.release(); // Giải phóng kết nối
  }
});
