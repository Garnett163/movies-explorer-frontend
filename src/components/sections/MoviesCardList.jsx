import React from 'react';

function MoviesCardList({ children }) {
  return (
    <section className='movies-card-list'>
      <ul className='movies-card-list__list'>{children}</ul>
    </section>
  );
}

export default MoviesCardList;
