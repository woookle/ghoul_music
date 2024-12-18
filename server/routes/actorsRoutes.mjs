import express from 'express';
import { addActor, addFavorite, allActors, changeAvatar, changeNickname, changePassword, checkAccount, loginActor, logoutActor, removeFavorite } from '../controllers/actorsController.mjs';
import upload from '../utils/uploadConfig.js';
import authCheck from '../middlewares/authCheck.mjs';

const actorsRoutes = express.Router();

// РЕГИСТРАЦИЯ И АВТОРИЗАЦИЯ ПОЛЬЗОВАТЕЛЯ
actorsRoutes.post('/actor/register', addActor);
actorsRoutes.post('/actor/login', loginActor);

// ВЫХОД ИЗ АККАУНТА
actorsRoutes.post('/actor/logout', authCheck, logoutActor);

// УПРАВЛЕНИЕ ИЗБРАННЫМИ
actorsRoutes.post('/actor/addfavorites', authCheck, addFavorite);
actorsRoutes.delete('/actor/removefavorites', authCheck, removeFavorite);

// ПРОВЕРКА НА ВАЛИДНОСТЬ
actorsRoutes.get('/actor/authcheck', authCheck, checkAccount);

// НАСТРОЙКИ АККАУНТА
actorsRoutes.patch('/actor/changeavatar', authCheck, upload.fields([{ name: 'image', maxCount: 1 }]), changeAvatar)
actorsRoutes.patch('/actor/changenickname', authCheck, changeNickname)
actorsRoutes.patch('/actor/changepassword', authCheck, changePassword)

// ПРОЧИЕ ДЕЙСТВИЯ
actorsRoutes.get('/actor/actors', allActors);

export default actorsRoutes