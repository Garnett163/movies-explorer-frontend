import React from 'react';

function MoviesCardList({ children }) {
  return (
    <section className='movies-card'>
      <ul className='movies-card__list'>{children}</ul>
    </section>
  );
}

export default MoviesCardList;
