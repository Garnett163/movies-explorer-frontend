import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/header__logo.svg';
import { useFormAndValidation } from '../hooks/useFormAndValidation';

function Register({ onRegister, serverError }) {
  const { values, errors, isValid, handleInputChange } = useFormAndValidation({
    name: '',
    email: '',
    password: '',
  });

  function handleSubmit(event) {
    event.preventDefault();
    onRegister(values);
  }

  return (
    <main className='auth'>
      <div className='auth__container'>
        <Link to='/'>
          <img className='auth__logo' src={logo} alt='Логотип сайта' />
        </Link>
        <h1 className='auth__title'>Добро пожаловать!</h1>
        <form className='auth__form' name='register' onSubmit={handleSubmit}>
          <label className='auth__label' htmlFor='inputName'>
            Имя
            <input
              className='auth__input'
              id='inputName'
              name='name'
              type='text'
              placeholder='Имя'
              required
              minLength='2'
              maxLength='25'
              value={values.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
            />
          </label>
          <span className={`auth__error ${errors.name ? 'auth__error_active' : ''}`}>{errors.name}</span>

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
              value={values.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
            />
          </label>
          <span className={`auth__error ${errors.email ? 'auth__error_active' : ''}`}>{errors.email}</span>

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
              value={values.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
            />
          </label>
          <span className={`auth__error ${errors.password ? 'auth__error_active' : ''}`}>{errors.password}</span>

          <div className='auth__flex-box'>
            <span className='auth__server-error'>{serverError}</span>
            <button className={`auth__button ${!isValid ? 'auth__button_disabled' : ''}`} type='submit' disabled={!isValid}>
              Зарегистрироваться
            </button>
            <p className='auth__text'>
              Уже зарегистрированы?
              <Link to='/signin' className='auth__link'>
                Войти
              </Link>
            </p>
          </div>
        </form>
      </div>
    </main>
  );
}

export default Register;
