// backend/config/db.js
const mysql = require("mysql2/promise"); // Sử dụng thư viện mysql2/promise
require("dotenv").config();

// Tạo một connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true, // Chờ nếu tất cả các kết nối đang bận
  connectionLimit: 10, // Số lượng kết nối tối đa trong pool
  queueLimit: 0, // Kích thước hàng đợi của các yêu cầu đang chờ
});

console.log("Connection pool đã được tạo!");

module.exports = pool; // Export pool thay vì một kết nối duy nhất