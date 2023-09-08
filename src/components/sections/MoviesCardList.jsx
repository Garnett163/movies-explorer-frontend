import React from 'react';
import MoviesCard from './MoviesCard';
import Preloader from '../UI/Preloader';

function MoviesCardList({ movies, searchError, isLoading, deleteMovie, handleSaveMovie, handleDeleteMovie }) {
  return (
    <section className='movies-card'>
      <span className='movies-card__error'>{searchError}</span>
      {isLoading ? (
        <Preloader />
      ) : (
        <ul className='movies-card__list'>
          {movies.map((movie) => (
            <MoviesCard
              key={movie.id || movie._id}
              movie={movie}
              handleDeleteMovie={handleDeleteMovie}
              handleSaveMovie={handleSaveMovie}
              onDeleteMovie={deleteMovie}
            />
          ))}
        </ul>
      )}
    </section>
  );
}

export default MoviesCardList;
