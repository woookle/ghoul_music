import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { loginActors } from "../../api/artistAPI";

const Login = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isAuth = useSelector(state => state.auth.isAuth);

  useEffect(() => {
    if(isAuth) {
      navigate('/me')
    }
  }, [isAuth])

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const goLogin = () => {
    dispatch(loginActors(formData))
  }

  return (
    <section className="register animate__animated animate__fadeIn">
      <div className="container">
        <h1 className="animate__animated animate__fadeInUp">Авторизация</h1>
        <form className="register_form">
          <div className="inputs_container">
            <input className="animate__animated animate__fadeInLeft" type="email" name="email" placeholder="Введите почту" value={formData.email} onChange={handleInputChange} />
            <input className="animate__animated animate__fadeInRight" type="password" name="password" placeholder="Введите пароль" value={formData.password} onChange={handleInputChange} /> 
          </div>
          <button type="button" className="registerBtn animate__animated animate__fadeInDown" onClick={goLogin}>Войти</button>
        </form>
        <p className="have_account animate__animated animate__fadeInUp">Нет аккаунта? <NavLink to={'/register'}>Зарегистрироваться</NavLink></p>
      </div>
    </section>
  )
}

export default Login;