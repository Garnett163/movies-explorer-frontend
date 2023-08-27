import React from 'react';

function AboutProject() {
  return (
    <section id='about-project' className='about-project'>
      <h2 className='about-project__title'>О проекте</h2>
      <div className='about-project__info'>
        <div className='about-project__stages'>
          <h3 className='about-project__subtitle'>Дипломный проект включал 5 этапов</h3>
          <p className='about-project__text'>
            Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.
          </p>
        </div>
        <div className='about-project__stages'>
          <h3 className='about-project__subtitle'>На&nbsp;выполнение диплома ушло 5 недель</h3>
          <p className='about-project__text'>
            У&nbsp;каждого этапа был мягкий и&nbsp;жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.
          </p>
        </div>
      </div>
      <div className='about-project__table'>
        <div className='about-project__column-one'>
          <p className='about-project__stage-one'>1 неделя</p>
          <p className='about-project__stage-text'>Back-end</p>
        </div>
        <div className='about-project__column-two'>
          <p className='about-project__stage-two'>4 недели</p>
          <p className='about-project__stage-text'>Front-end</p>
        </div>
      </div>
    </section>
  );
}

export default AboutProject;
