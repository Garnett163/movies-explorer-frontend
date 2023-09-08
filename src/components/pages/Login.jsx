import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/header__logo.svg';
import { useFormAndValidation } from '../hooks/useFormAndValidation';

function Login({ onLogin, serverError }) {
  const { values, errors, isValid, handleInputChange } = useFormAndValidation({
    email: '',
    password: '',
  });

  function handleSubmit(evt) {
    evt.preventDefault();
    onLogin(values);
  }

  return (
    <main className='auth'>
      <div className='auth__container'>
        <Link to='/'>
          <img className='auth__logo' src={logo} alt='Логотип сайта' />
        </Link>
        <h1 className='auth__title'>Рады видеть!</h1>
        <form className='auth__form' name='login' onSubmit={handleSubmit}>
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
              Войти
            </button>
            <p className='auth__text'>
              Ещё не зарегистрированы?
              <Link to='/signup' className='auth__link'>
                Регистрация
              </Link>
            </p>
          </div>
        </form>
      </div>
    </main>
  );
}

export default Login;
