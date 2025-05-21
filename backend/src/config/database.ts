import mysql from "mysql2/promise";
import dotenv from "dotenv";

// Load environment variables first
dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || "127.0.0.1", // Fallback to 127.0.0.1
  user: process.env.DB_USER || "root", // Fallback to root
  password: "Luxe#2023", // Handle empty password
  database: process.env.DB_NAME || "alcohol_wholesale",
  port: parseInt(process.env.DB_PORT || "3306"),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  connectTimeout: 10000, // 10 second timeout
});

// Test the pool connection on startup
pool
  .getConnection()
  .then((conn) => {
    console.log("Successfully connected to MySQL database!");
    conn.release();
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
    process.exit(1);
  });

export default pool;
