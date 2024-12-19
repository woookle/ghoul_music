import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changePassword } from "../../../api/artistAPI";
import { toast } from "react-toastify";

const ChangePassword = (props) => {
  const dispatch = useDispatch();

  const [newpassword, setNewPassword] = useState("");
  const [correctpassword, setCorrectPassword] = useState("");
  const [verifypassword, setVerifyPassword] = useState("");
  const user = useSelector((state) => state.auth.account);

  const handleNewPassword = (e) => {
    setNewPassword(e.target.value);
  };
  const handleCorrectPassword = (e) => {
    setCorrectPassword(e.target.value);
  };
  const handleVerifyPassword = (e) => {
    setVerifyPassword(e.target.value);
  };

  const changePas = () => {
    if (newpassword !== verifypassword) {
      return toast.error("Пароли не совпадают");
    } else {
      dispatch(
        changePassword({ userId: user._id, correctpassword, newpassword })
      ).then((response) => {
        if (response.meta.requestStatus !== "rejected") {
          props.setIsOpen(false);
        }
      });
    }
  };

  const goEnv = () => {
    props.setItem("main");
  };

  return (
    <div className="change_nickname animate__animated animate__fadeInUp">
      <div className="inputs_block">
        <input
          type="password"
          value={correctpassword}
          onChange={handleCorrectPassword}
          placeholder="Введите старый пароль"
        />
        <input
          type="password"
          value={newpassword}
          onChange={handleNewPassword}
          placeholder="Введите новый пароль"
        />
        <input
          type="password"
          value={verifypassword}
          onChange={handleVerifyPassword}
          placeholder="Подтвердите новый пароль"
        />
      </div>
      <button type="button" onClick={changePas}>
        Поменять
      </button>
      <button type="button" onClick={goEnv}>
        Назад
      </button>
    </div>
  );
};

export default ChangePassword;
