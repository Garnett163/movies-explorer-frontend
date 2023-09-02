import React from 'react';
import MoviesCard from './MoviesCard';
import Preloader from '../UI/Preloader';

function MoviesCardList({ moviesArray, searchError, isLoading }) {
  return (
    <section className='movies-card'>
      <span className='movies-card__error'>{searchError}</span>
      {isLoading ? (
        <Preloader />
      ) : (
        <ul className='movies-card__list'>
          {moviesArray.map((movie) => (
            <MoviesCard
              key={movie.id}
              nameRU={movie.nameRU}
              duration={movie.duration}
              trailerLink={movie.trailerLink}
              country={movie.country}
              director={movie.director}
              year={movie.year}
              description={movie.description}
              image={`https://api.nomoreparties.co${movie.image.url}`}
              thumbnail={`https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`}
              owner={movie.owner}
              movieId={movie.id}
              nameEN={movie.nameEN}
              id={movie._id}
            />
          ))}
        </ul>
      )}
    </section>
  );
}

export default MoviesCardList;
