import React from 'react';
import arrowImg from '../../images/text__COLOR_font-main.svg';

function Portfolio() {
  return (
    <section className='portfolio'>
      <h2 className='portfolio__title'>Портфолио</h2>
      <ul className='portfolio__list'>
        <li className='portfolio__item'>
          <a className='portfolio__link' href='https://github.com/Garnett163/how-to-learn' target='_blank' rel='noreferrer'>
            Статичный сайт
            <img className='portfolio__image-arrow' src={arrowImg} alt='Стрелка для перехода' />
          </a>
        </li>
        <li className='portfolio__item'>
          <a className='portfolio__link' href='https://github.com/Garnett163/russian-travel' target='_blank' rel='noreferrer'>
            Адаптивный сайт
            <img className='portfolio__image-arrow' src={arrowImg} alt='Стрелка для перехода' />
          </a>
        </li>
        <li className='portfolio__item'>
          <a className='portfolio__link' href='https://mesto.garnett163.nomoreparties.co/' target='_blank' rel='noreferrer'>
            Одностраничное приложение
            <img className='portfolio__image-arrow' src={arrowImg} alt='Стрелка для перехода' />
          </a>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;
