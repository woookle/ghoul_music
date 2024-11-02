import React, { useState } from "react";
import MainList from "./Settings/MainList";
import ChangeNickname from "./Settings/ChangeNickname";
import ChangePassword from "./Settings/ChangePassword";

const MainSettings = (props) => {
  const [actualItem, setItem] = useState("main");

  return (
    <section className="main_settings_window">
      <div className="background_settings_trigger" onClick={() => {props.setIsOpen(false)}}></div>
      <div className="main_settings_container animate__animated animate__fadeInUp">
        {actualItem == "main" ? (
          <MainList setItem={setItem} setIsOpen={props.setIsOpen} />
        ) : actualItem == "changenickname" ? (
          <ChangeNickname setItem={setItem} setIsOpen={props.setIsOpen} />
        ) : actualItem == 'changepassword' && (
          <ChangePassword setItem={setItem} setIsOpen={props.setIsOpen} />
        )}
      </div>
    </section>
  );
};

export default MainSettings;
