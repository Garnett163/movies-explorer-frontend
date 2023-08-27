import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import headerLogo from '../../images/header__logo.svg';
import NavHeader from './NavHeader';

function Header({ isLoggedIn }) {
  const location = useLocation();
  const changeBg = location.pathname !== '/';

  return (
    <header className={`header ${changeBg ? 'header_bg-black' : ''}`}>
      <div className='header__container'>
        <Link to='/'>
          <img className='header__logo' src={headerLogo} alt='Логотип сайта' />
        </Link>
        {!isLoggedIn ? (
          <NavHeader changeBg={changeBg} />
        ) : (
          <ul className='header__list'>
            <li className='header__item'>
              <Link to='/signup' className='header__link'>
                Регистрация
              </Link>
            </li>
            <li className='header__item'>
              <Link to='/signin' className='header__link header__link_auth'>
                Войти
              </Link>
            </li>
          </ul>
        )}
      </div>
    </header>
  );
}

export default Header;
