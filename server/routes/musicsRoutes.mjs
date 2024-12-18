import express from "express";
import upload from "../utils/uploadConfig.js";
import { uploadMusic, getMusics, getMusicsByActor, deleteMusic, downloadMusic } from "../controllers/musicsController.mjs";
import authCheck from "../middlewares/authCheck.mjs";

const musicsRoutes = express.Router();

// ЗАГРУЗКА НОВОГО ТРЕКА
musicsRoutes.post('/musics/upload', authCheck, upload.fields([{ name: 'image', maxCount: 1 }, { name: 'audio', maxCount: 1 }]), uploadMusic);

// ПРОЧЕЕ УПРАВЛЕНИЕ ТРЕКАМИ
musicsRoutes.get('/musics', getMusics);
musicsRoutes.get('/musics/:userId', getMusicsByActor);
musicsRoutes.delete('/musics/delete', authCheck, deleteMusic);

// ЗАГРУЗКА ТРЕКА НА УСТРОЙСТВО
musicsRoutes.get('/musics/download/:id', downloadMusic);

export default musicsRoutes;