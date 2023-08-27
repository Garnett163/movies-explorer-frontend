import React from 'react';
import introLogo from '../../images/landing__logo.svg';

function Promo() {
  return (
    <section className='promo'>
      <div className='promo__container'>
        <div className='promo__flex-box'>
          <h1 className='promo__title'>Учебный проект студента факультета Веб&minus;разработки.</h1>
          <p className='promo__paragraph'>Листайте ниже, чтобы узнать больше про этот проект и&nbsp;его создателя.</p>
          <a href='#about-project' className='promo__button'>
            Узнать больше
          </a>
        </div>
        <img className='promo__logo' src={introLogo} alt='Логотип web earth' />
      </div>
    </section>
  );
}

export default Promo;
