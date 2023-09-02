import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../sections/Header';
import CurrentUserContext from '../contexts/CurrentUserContext';
import { useValidationTEST } from '../hooks/useFormValidationTest';
import { mainApi } from '../utils/MainApi';

function ProfileTEST({ isLoggedIn, setCurrentUser, setIsLoading, setIsLoggedIn }) {
  const currentUser = useContext(CurrentUserContext);
  const { values, handleInputChange, errors, isValid } = useValidationTEST({
    name: currentUser.name || '',
    email: currentUser.email || '',
  });

  const initialValues = {
    name: currentUser.name || '',
    email: currentUser.email || '',
  };

  const isFormChanged = values.name !== initialValues.name || values.email !== initialValues.email;

  const [error, setError] = useState(null);

  function handleSubmit(evt) {
    evt.preventDefault();

    mainApi
      .editUserInfo(values)
      .then((response) => {
        setCurrentUser(response);
        setError(null);
      })
      .catch((err) => {
        if (err.status === 409) {
          setError('Пользователь с таким email уже существует.');
        } else if (err.status === 500) {
          setError('На сервере произошла ошибка');
        } else {
          setError('При обновлении профиля произошла ошибка.');
        }
      });
  }

  function signOut() {
    mainApi
      .logOut()
      .then((res) => {
        if (res) {
          setIsLoggedIn(false);
          setCurrentUser({});
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <Header isLoggedIn={isLoggedIn} />
      <main className='profile'>
        <h1 className='profile__title'>Привет, {currentUser.name || 'Имя'}!</h1>
        <form className='profile__form' name='profile' onSubmit={handleSubmit}>
          <label htmlFor='name' className='profile__label'>
            Имя
            <input
              name='name'
              id='name'
              className='profile__input'
              type='text'
              placeholder='Имя'
              minLength='2'
              maxLength='25'
              required
              onChange={(e) => handleInputChange('name', e.target.value)}
              value={values.name || ''}
            />
            <span className={`profile__input-error ${errors.name ? 'profile__input-error_active' : ''}`}>{errors.name}</span>
          </label>
          <label htmlFor='email' className='profile__label profile__label_email'>
            E-mail
            <input
              name='email'
              className='profile__input'
              type='email'
              placeholder='E-mail'
              minLength='3'
              maxLength='25'
              required
              onChange={(e) => handleInputChange('email', e.target.value)}
              value={values.email || ''}
            />
            <span className={`profile__input-error ${errors.email ? 'profile__input-error_active' : ''}`}>{errors.email}</span>
          </label>
          <div className='profile__flex-box'>
            <span className='profile__error'>{error}</span>
            <button
              className={`profile__edit-btn ${!isValid || !isFormChanged ? 'profile__edit-btn_active' : ''}`}
              type='submit'
              disabled={!isValid || !isFormChanged}
            >
              Редактировать
            </button>
            <Link to='/' className='profile__sign-out-btn' onClick={signOut}>
              Выйти из аккаунта
            </Link>
          </div>
        </form>
      </main>
    </>
  );
}

export default ProfileTEST;
