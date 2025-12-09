import express from "express";
import cors from "cors";
import agendaRoutes from "./routes/agenda.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/agenda", agendaRoutes);

app.listen(4000, () => {
  console.log("Backend corriendo en puerto 4000");
});
