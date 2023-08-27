import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/header__logo.svg';

function Login() {
  return (
    <main className='login'>
      <div className='auth__container'>
        <Link to='/'>
          <img className='header__logo' src={logo} alt='Логотип сайта' />
        </Link>
        <h1 className='auth__title'>Рады видеть!</h1>
        <form className='auth__form' name='login'>
          <label className='auth__label' htmlFor='inputEmail'>
            E-mail
            <input
              className='auth__input'
              id='inputEmail'
              name='email'
              type='email'
              placeholder='E-mail'
              required
              minLength='5'
              maxLength='25'
            />
          </label>
          <label className='auth__label' htmlFor='inputPassword'>
            Пароль
            <input
              className='auth__input'
              id='inputPassword'
              name='password'
              type='password'
              placeholder='Пароль'
              required
              minLength='3'
              maxLength='25'
            />
          </label>
          <button className='auth__button' type='submit'>
            Войти
          </button>
          <p className='auth__text'>
            Ещё не зарегистрированы?
            <Link to='/signup' className='auth__link'>
              Регистрация
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
}

export default Login;
