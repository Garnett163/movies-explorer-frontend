import React from 'react';
import { Link } from 'react-router-dom';
import BurgerMenu from './BurgerMenu';

function NavHeader({ changeBg }) {
  return (
    <nav className='nav-header'>
      <div className='nav-header__menu'>
        <ul className='nav-header__list'>
          <li className='nav-header__item'>
            <Link to='/movies' className='nav-header__link'>
              Фильмы
            </Link>
          </li>
          <li className='nav-header__item'>
            <Link to='/saved-movies' className='nav-header__link'>
              Сохранённые фильмы
            </Link>
          </li>
        </ul>
        <Link to='/profile' className={`nav-header__link ${changeBg ? 'nav-header__link_profile-black' : 'nav-header__link_profile-blue'}`}>
          Аккаунт
        </Link>
      </div>
      <BurgerMenu />
    </nav>
  );
}

export default NavHeader;
