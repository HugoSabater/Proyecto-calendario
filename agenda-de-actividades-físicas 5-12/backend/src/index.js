import express from "express";
import mysql from "mysql2/promise";

const app = express();
app.use(express.json());

// Conexión MySQL en docker (usa el nombre del servicio: "db")
const pool = await mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

app.get("/api/activities", async (req, res) => {
    const [rows] = await pool.query("SELECT * FROM activities");
    res.json(rows);
});

app.listen(4000, () => console.log("Backend running on port 4000"));
