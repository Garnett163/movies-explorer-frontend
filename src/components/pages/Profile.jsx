import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../sections/Header';

function Profile({ isLoggedIn }) {
  return (
    <>
      <Header isLoggedIn={isLoggedIn} />
      <main className='profile'>
        <h1 className='profile__title'>Привет, Валерий!</h1>
        <form className='profile__form'>
          <label htmlFor='name' className='profile__label'>
            Имя
            <input id='name' className='profile__input' type='text' placeholder='Имя' required></input>
          </label>
          <label htmlFor='email' className='profile__label profile__label_email'>
            E-mail
            <input id='email' className='profile__input' type='email' placeholder='E-mail' required></input>
          </label>
          <div className='profile__flex-box'>
            <button className='profile__edit-btn' type='submit'>
              Редактировать
            </button>
            <Link to='/' className='profile__sign-out-btn'>
              Выйти из аккаунта
            </Link>
          </div>
        </form>
      </main>
    </>
  );
}

export default Profile;
