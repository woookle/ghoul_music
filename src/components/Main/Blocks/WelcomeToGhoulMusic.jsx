import React from "react";
import { NavLink } from "react-router-dom";

const WelcomeToGhoulMusic = () => {
  // Первый блок с кнопкой, которая ведет к странице регистрации
  return (
    <section className="welcome_to_ghoul_music animate__animated animate__fadeIn">
      <div className="container">
        <h1 className="animate__animated animate__fadeInUp">Добро пожаловать в Ghoul Music!</h1>
        <p className="animate__animated animate__fadeInLeft">
          Ghoul Music - это платформа, где музыканты могут выкладывать и<br />
          продвигать свою музыку, а слушатели — обсуждать треки и<br />делиться ими в
          соцсетях{" "}
        </p>
        <NavLink to={"/register"} className="animate__animated animate__fadeInUp">Присоединиться</NavLink>
      </div>
    </section>
  );
};

export default WelcomeToGhoulMusic;