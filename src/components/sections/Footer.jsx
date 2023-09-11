import React from 'react';

function Footer() {
  return (
    <footer className='footer'>
      <p className='footer__feat'>Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <div className='footer__container'>
        <p className='footer__copyright'>© 2023 XO</p>
        <ul className='footer__list'>
          <li className='footer__item'>
            <a className='footer__link' href='https://practicum.yandex.ru' target='_blank' rel='noreferrer'>
              Яндекс.Практикум
            </a>
          </li>
          <li className='footer__item'>
            <a className='footer__link' href='https://github.com/Garnett163' target='_blank' rel='noreferrer'>
              Github
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
