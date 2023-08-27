import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/header__logo.svg';

function Register() {
  return (
    <main className='register'>
      <div className='auth__container'>
        <Link to='/'>
          <img className='header__logo' src={logo} alt='Логотип сайта' />
        </Link>
        <h1 className='auth__title'>Добро пожаловать!</h1>
        <form className='auth__form' name='register'>
          <label className='auth__label' htmlFor='inputName'>
            Имя
            <input className='auth__input' id='inputName' name='name' type='text' placeholder='Имя' required minLength='5' maxLength='25' />
          </label>
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
            Зарегистрироваться
          </button>
          <p className='auth__text'>
            Уже зарегестрированы?
            <Link to='/signin' className='auth__link'>
              Войти
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
}

export default Register;
