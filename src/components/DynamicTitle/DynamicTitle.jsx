import React, { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";

const DynamicTitle = () => {
  const location = useLocation();
  const { id } = useParams();
  const baseURL = "Ghoul Music | ";

  useEffect(() => {
    if (location.pathname.startsWith("/profile/")) {
      document.title = baseURL + 'Профиль музыканта';
    } else {
      switch (location.pathname) {
        case "/":
          document.title = baseURL + "Главная страница";
          break;
        case "/catalog":
          document.title = baseURL + "Каталог";
          break;
        case "/register":
          document.title = baseURL + "Регистрация";
          break;
        case "/login":
          document.title = baseURL + "Авторизация";
          break;
        case "/mymusic":
          document.title = baseURL + "Моя музыка";
          break;
        case "/favorites":
          document.title = baseURL + "Избранные";
          break;
        case "/me":
          document.title = baseURL + "Мой профиль";
          break;
        case "/uploadmusic":
          document.title = baseURL + "Загрузка трека";
          break;
        default:
          document.title = baseURL + "404";
      }
    }
  }, [location]);

  return null; // Этот компонент не рендерит ничего
};

export default DynamicTitle;
