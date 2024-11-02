import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeNickname } from "../../../api/artistAPI";
import { toast } from "react-toastify";

const ChangeNickname = (props) => {
  const dispatch = useDispatch();
  const [newnickname, setNewNickname] = useState("");
  const userId = useSelector((state) => state.auth.account._id);

  const handleNewNickname = (e) => {
    setNewNickname(e.target.value);
  };

  const changeNick = () => {
    if (newnickname.trim() !== "") {
      dispatch(changeNickname({ userId: userId, newnickname: newnickname }));
      props.setIsOpen(false);
    } else {
      toast.error("Строка пуста!");
    }
  };

  const goEnv = () => {
    props.setItem('main');
  }

  return (
    <div className="change_nickname animate__animated animate__fadeInUp">
      <input
        type="text"
        value={newnickname}
        onChange={handleNewNickname}
        placeholder="Введите новый ник"
      />
      <button type="button" onClick={changeNick}>
        Поменять
      </button>
      <button type="button" onClick={goEnv}>Назад</button>
    </div>
  );
};

export default ChangeNickname;
