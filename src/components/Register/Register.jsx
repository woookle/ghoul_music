import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { registerActor } from "../../api/artistAPI";

const Register = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate('/');

  const isAuth = useSelector(state => state.auth.isAuth)

  useEffect(() => {
    if(isAuth) {
      navigate('/me')
    }
  }, [isAuth])

  const [formData, setFormData] = useState({
    nickname: '',
    email: '',
    password: ''
  })

  const [verifyPassword, setVerifyPassword] = useState('')

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const verifyPasswordChange = (e) => {
    setVerifyPassword(e.target.value)
  }

  const goRegister = () => {
    if(formData.password === verifyPassword) {
      dispatch(registerActor(formData))
    } else {
      toast.error('Пароли не совпадают!')
    }
  }

  return (
    <section className="register animate__animated animate__fadeIn">
      <div className="container">
        <h1 className="animate__animated animate__fadeInUp">Регистрация</h1>
        <form className="register_form">
          <div className="inputs_container">
            <input className="animate__animated animate__fadeInLeft" type="text" name="nickname" placeholder="Введите ник" value={formData.nickname} onChange={handleInputChange} />
            <input className="animate__animated animate__fadeInRight" type="email" name="email" placeholder="Введите почту" value={formData.email} onChange={handleInputChange} />
            <input className="animate__animated animate__fadeInLeft" type="password" name="password" placeholder="Введите пароль" value={formData.password} onChange={handleInputChange} />
            <input className="animate__animated animate__fadeInRight" type="password" placeholder="Подтвердите пароль" value={verifyPassword} onChange={verifyPasswordChange} />   
          </div>
          <button type="button" className="registerBtn animate__animated animate__fadeInDown" onClick={goRegister}>Зарегистрироваться</button>
        </form>
        <p className="have_account animate__animated animate__fadeInUp">Есть аккаунт? <NavLink to={'/login'}>Войти</NavLink></p>
      </div>
    </section>
  )
}

export default Register;