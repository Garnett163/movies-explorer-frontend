import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../sections/Header';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';
import { mainApi } from '../../utils/MainApi';

function Profile({ isLoggedIn, setCurrentUser, setIsLoading, setIsLoggedIn }) {
  const [isEditSuccess, setIsEditSuccess] = useState('');
  const [error, setError] = useState(null);
  const currentUser = useContext(CurrentUserContext);
  const { values, handleInputChange, errors, isValid } = useFormAndValidation({
    name: currentUser.name || '',
    email: currentUser.email || '',
  });

  const initialValues = {
    name: currentUser.name || '',
    email: currentUser.email || '',
  };

  const isFormChanged = values.name !== initialValues.name || values.email !== initialValues.email;

  function handleSubmit(evt) {
    evt.preventDefault();

    mainApi
      .editUserInfo(values)
      .then((response) => {
        setCurrentUser(response);
        setError(null);
        setIsEditSuccess('Обновление данных прошло успешно');
        setTimeout(() => {
          setIsEditSuccess(null);
        }, 3000);
      })
      .catch((err) => {
        if (err.status === 409) {
          setError('Пользователь с таким email уже существует.');
        } else if (err.status === 500) {
          setError('На сервере произошла ошибка');
        } else {
          setError('При обновлении профиля произошла ошибка.');
        }
        setIsEditSuccess('');
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
          localStorage.clear();
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
              onChange={(evt) => handleInputChange('name', evt.target.value)}
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
              onChange={(evt) => handleInputChange('email', evt.target.value)}
              value={values.email || ''}
            />
            <span className={`profile__input-error ${errors.email ? 'profile__input-error_active' : ''}`}>{errors.email}</span>
          </label>
          <div className='profile__flex-box'>
            <p className='profile__edit-success'>{isEditSuccess}</p>
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

export default Profile;
