import mysql from "mysql2/promise";

// 建立連線池
const db = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT, // Railway 會給你一個專屬 port
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// 保持連線活著，避免 idle timeout
setInterval(async () => {
  try {
    await db.query("SELECT 1");
  } catch (err) {
    console.error("資料庫連線異常", err);
  }
}, 60000);

export default db;
