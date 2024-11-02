import express from "express";
import cors from "cors";
import musicsRoutes from "./routes/musicsRoutes.mjs";
import mongoose from "mongoose";
import actorsRoutes from "./routes/actorsRoutes.mjs";
import { config } from "dotenv";

config({ path: ".env" });

const PORT = process.env.PORT || 5000;
const DATABASE_URL = process.env.DATABASE_URL;

mongoose
  .connect(DATABASE_URL)
  .then(() => {
    console.log("DB ok");
  })
  .catch((err) => {
    console.log("DB error", err);
  });

const app = express();

app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use(cors());

app.use(musicsRoutes);
app.use(actorsRoutes);

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
