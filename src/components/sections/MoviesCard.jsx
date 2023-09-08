import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getTimeFromMins } from '../../utils/utils';

function MoviesCard({ movie, onDeleteMovie, handleSaveMovie, handleDeleteMovie }) {
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
