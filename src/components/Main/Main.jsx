import React from "react";
import WelcomeToGhoulMusic from "./Blocks/WelcomeToGhoulMusic";
import MoreInfo from "./Blocks/MoreInfo";
import PopulateActors from "./Blocks/PopulateActors";
import HaveQuestions from "./Blocks/HaveQuestions";


const Main = () => {
  // Главная страница (распределено на блоки)
  return (
    <div className="main">
      <WelcomeToGhoulMusic />
      <MoreInfo />
      <PopulateActors />
      <HaveQuestions />
    </div>
  )
}

export default Main;