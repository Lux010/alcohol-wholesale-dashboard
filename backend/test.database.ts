import mysql from "mysql2/promise";

async function testConnection() {
  const connection = await mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "Luxe#2023",
    database: "alcohol_wholesale",
  });

  console.log("Successfully connected to MySQL!");
  await connection.end();
}

testConnection().catch((err) => {
  console.error("Connection failed:", err);
  process.exit(1);
});
