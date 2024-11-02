import React, { useState } from "react";
import logo from '../../assets/images/logo.svg';
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const Header = () => {

  const auth = useSelector(state => state.auth);

  const [isActiveBurger, changeActiveBurgerMenu] = useState(false);

  const updateActiveBurger = () => {
    changeActiveBurgerMenu(!isActiveBurger)
  }

  const letsregisterbro = () => {
    toast.error('Вы не зарегистрированы!')
  }

  const API_URL = process.env.REACT_APP_API_URL;

  return (
    <header>
      <div className="container">
        <div className={isActiveBurger ? 'burger_menu active_burger' : 'burger_menu'} onClick={updateActiveBurger}>
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
        </div>
        <NavLink to={"/"}><img src={logo} alt="logo" /></NavLink>
        <ul className={isActiveBurger ? 'nav_links active_burger' : 'nav_links'}>
          <li><NavLink to={'/'} className={(navData) => navData.isActive ? "link active" : "link"} onClick={() => {changeActiveBurgerMenu(false)}} >Главная</NavLink></li>
          <li><NavLink to={'/catalog'} className={(navData) => navData.isActive  ? "link active" : "link"}  onClick={() => {changeActiveBurgerMenu(false)}}>Каталог</NavLink></li>
          <li>{auth.isAuth ? <NavLink to={'/mymusic'} className={(navData) => navData.isActive  ? "link active" : "link"} onClick={() => {changeActiveBurgerMenu(false)}}>Моя музыка</NavLink> : <span className="link" onClick={letsregisterbro} style={{cursor: 'default', userSelect: 'none'}}>Моя музыка</span>}</li>
          <li>{auth.isAuth ? <NavLink to={'/favorites'} className={(navData) => navData.isActive  ? "link active" : "link"} onClick={() => {changeActiveBurgerMenu(false)}}>Избранные</NavLink> : <span className="link" onClick={letsregisterbro} style={{cursor: 'default', userSelect: 'none'}}>Избранные</span>}</li>
        </ul>
        {auth.isAuth ? <NavLink to={'/me'} className="header_avatar" style={{backgroundImage: `url('${API_URL}${auth.account.avatar}')`}} onClick={() => {changeActiveBurgerMenu(false)}}></NavLink> : <NavLink className="login_account" to={'/login'}>Войти</NavLink>}
      </div>
    </header>
  )
}

export default Header;