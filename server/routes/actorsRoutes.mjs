import express from 'express';
import { addActor, addFavorite, allActors, changeAvatar, changeNickname, changePassword, loginActor, removeFavorite } from '../controllers/actorsController.mjs';
import upload from '../utils/uploadConfig.js';

const actorsRoutes = express.Router();

actorsRoutes.post('/actor/register', addActor);
actorsRoutes.post('/actor/login', loginActor);
actorsRoutes.post('/actor/addfavorites', addFavorite);
actorsRoutes.delete('/actor/removefavorites', removeFavorite);
actorsRoutes.get('/actor/actors', allActors);
actorsRoutes.post('/actor/changeavatar', upload.fields([{ name: 'image', maxCount: 1 }]), changeAvatar)
actorsRoutes.post('/actor/changenickname', changeNickname)
actorsRoutes.post('/actor/changepassword', changePassword)

export default actorsRoutes