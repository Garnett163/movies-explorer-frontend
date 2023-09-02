import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getTimeFromMins } from '../utils/utils';

function MoviesCard(movie) {
  const location = useLocation();
  const changeBtn = location.pathname === '/saved-movies';

  const [isSaved, setIsSaved] = useState(false);

  const handleSaveClick = () => {
    if (!changeBtn) {
      setIsSaved(!isSaved);
    }
  };

  return (
    <li className='card'>
      <div className='card__container'>
        <h2 className='card__title'>{movie.nameRU}</h2>
        <p className='card__timer'>{getTimeFromMins(movie.duration)}</p>
      </div>
      <img className='card__image' src={movie.image} alt={movie.nameRU} />
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
