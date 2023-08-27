import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

function BurgerMenu() {
  const [isOpen, setIsOpen] = useState(false);

  function toggleMenu() {
    setIsOpen(!isOpen);
  }

  return (
    <>
      <button className='burger-menu__button' onClick={toggleMenu}></button>
      <div className={`burger-menu ${isOpen ? 'burger-menu_open' : ''}`}>
        <div className={`burger-menu__container ${isOpen ? 'burger-menu__container_open' : ''}`}>
          <button className='burger-menu__close-btn' onClick={toggleMenu}></button>
          <ul className='burger-menu__list'>
            <li className='burger-menu__item'>
              <NavLink to='/' className={({ isActive }) => (isActive ? 'burger-menu__link_active' : 'burger-menu__link')}>
                Главная
              </NavLink>
            </li>
            <li className='burger-menu__item'>
              <NavLink to='/movies' className={({ isActive }) => (isActive ? 'burger-menu__link_active' : 'burger-menu__link')}>
                Фильмы
              </NavLink>
            </li>
            <li className='burger-menu__item'>
              <NavLink to='/saved-movies' className={({ isActive }) => (isActive ? 'burger-menu__link_active' : 'burger-menu__link')}>
                Сохранённые фильмы
              </NavLink>
            </li>
          </ul>
          <Link to='/profile' className='burger-menu__account'>
            Аккаунт
          </Link>
        </div>
      </div>
    </>
  );
}

export default BurgerMenu;
