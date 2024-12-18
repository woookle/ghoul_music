import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { playerLogoutTrigger } from "../../../store/playerSlice";
import { exitAccount } from "../../../api/artistAPI";

const MainList = ({ setItem, setIsOpen }) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutfromaccount = () => {
    dispatch(exitAccount());
    dispatch(playerLogoutTrigger());
    navigate('/')
  }

  return (
    <div className="main_list animate__animated animate__fadeInUp">
      <ul>
        <li onClick={() => {setItem('changenickname')}}>Поменять ник</li>
        <li onClick={() => {setItem('changepassword')}}>Поменять пароль</li>
        <li onClick={logoutfromaccount}>Выйти из аккаунта</li>
        <li onClick={() => {setIsOpen(false)}}>Закрыть</li>
      </ul>
    </div>
  )
}

export default MainList;