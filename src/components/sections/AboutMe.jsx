import React from 'react';
import myPhoto from '../../images/my-photo.jpg';

function AboutMe() {
  return (
    <section className='about-me'>
      <h2 className='about-me__title'>Студент</h2>
      <div className='about-me__container'>
        <div className='about-me__box'>
          <h3 className='about-me__name'>Валерий</h3>
          <p className='about-me__subtitle'>Фронтенд-разработчик, 30&nbsp;лет</p>
          <p className='about-me__info'>
            Я&nbsp;родился и&nbsp;живу в&nbsp;Самаре, закончил факультет экономики СГУ. У&nbsp;меня есть жена и&nbsp;дочь. Я&nbsp;люблю
            слушать музыку, а&nbsp;ещё увлекаюсь бегом. Недавно начал кодить. С&nbsp;2015 года работал в&nbsp;компании &laquo;СКБ
            Контур&raquo;. После того, как прошёл курс по&nbsp;веб-разработке, начал заниматься фриланс-заказами и&nbsp;ушёл
            с&nbsp;постоянной работы.
          </p>
          <a className='about-me__link' href='https://github.com/Garnett163' target='_blank' rel='noreferrer'>
            Github
          </a>
        </div>
        <img className='about-me__photo' src={myPhoto} alt='Мое фото' />
      </div>
    </section>
  );
}

export default AboutMe;
