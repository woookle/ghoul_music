import express from "express";
import upload from "../utils/uploadConfig.js";
import { uploadMusic, getMusics, getMusicsByActor, deleteMusic } from "../controllers/musicsController.mjs";

const musicsRoutes = express.Router();

musicsRoutes.post('/musics/upload', upload.fields([{ name: 'image', maxCount: 1 }, { name: 'audio', maxCount: 1 }]), uploadMusic);
musicsRoutes.get('/musics', getMusics);
musicsRoutes.get('/musics/:userId', getMusicsByActor);
musicsRoutes.delete('/musics/delete', deleteMusic);

export default musicsRoutes;