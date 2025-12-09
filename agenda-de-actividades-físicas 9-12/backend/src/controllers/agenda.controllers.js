import pool from "../config/db.js";

export const getActividades = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM actividades");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const crearActividad = async (req, res) => {
  try {
    console.log("DATOS RECIBIDOS EN BACKEND:", req.body);

    const { nombre, descripcion, fecha } = req.body;

    await pool.query(
      "INSERT INTO actividades (nombre, descripcion, fecha) VALUES (?, ?, ?)",
      [nombre, descripcion, fecha]
    );

    res.json({ message: "Actividad creada correctamente" });
  } catch (error) {
    console.error("ERROR SQL:", error);   // <-- añade esto también
    res.status(500).json({ error: error.message });
  }
};

