import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getTimeFromMins } from '../../utils/utils';
import { mainApi } from '../../utils/MainApi';

function MoviesCard({ movie, onDeleteMovie, handleDeleteMovie, setIsSaveMovie, isSaveMovie }) {
  const srcImage = movie.image.url ? `https://api.nomoreparties.co/${movie.image.url}` : movie.image;
  const location = useLocation();
  const changeBtn = location.pathname === '/saved-movies';
  const [isSaved, setIsSaved] = useState(movie.saved);

  function handleSaveClick() {
    if (!changeBtn) {
      if (isSaved) {
        handleDeleteMovie(movie);
        setIsSaved(false);
      } else {
        handleSaveMovie(movie);
        setIsSaved(true);
      }
    } else {
      onDeleteMovie(movie._id);
    }
  }

  function handleSaveMovie(movie) {
    return mainApi
      .saveMovie({
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image: `https://api.nomoreparties.co/${movie.image.url}`,
        trailerLink: movie.trailerLink,
        thumbnail: `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`,
        movieId: movie.id,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
      })
      .then((response) => {
        setIsSaveMovie([response, ...isSaveMovie]);
        localStorage.setItem('savedMovies', JSON.stringify([response, ...isSaveMovie]));
      })
      .catch((err) => {
        setIsSaved(false);
        console.error(err);
      });
  }

  return (
    <li className='card'>
      <div className='card__container'>
        <h2 className='card__title'>{movie.nameRU}</h2>
        <p className='card__timer'>{getTimeFromMins(movie.duration)}</p>
      </div>
      <a href={movie.trailerLink} target='_blank' rel='noreferrer'>
        <img className='card__image' src={srcImage} alt={movie.nameRU} />
      </a>
      <div className='card__button-container'>
        <button
          className={`card__button ${changeBtn ? 'card__button_delete' : ''} ${isSaved ? 'card__button_saved' : ''}`}
          type='submit'
          onClick={handleSaveClick}
        >
          Сохранить
        </button>
      </div>
    </li>
  );
}

export default MoviesCard;
