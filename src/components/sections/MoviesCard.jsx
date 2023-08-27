import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Mickey from '../../images/Mick_Jagger.png';

function MoviesCard() {
  const location = useLocation();
  const changeBtn = location.pathname === '/saved-movies';

  const [isSaved, setIsSaved] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const handleSaveClick = () => {
    if (!changeBtn) {
      setIsSaved(!isSaved);
      setIsDisabled(true);
    }
  };

  return (
    <li className='card__item'>
      <div className='card__container'>
        <h2 className='card__title'>В погоне за Бенкси</h2>
        <p className='card__timer'>0ч 42м</p>
      </div>
      <img className='card__image' src={Mickey} alt='Изображение превью фильма' />
      <div className='card__button-container'>
        <button
          className={`card__button ${changeBtn ? 'card__button_delete' : ''} ${isSaved ? 'card__button_saved' : ''}`}
          type='submit'
          onClick={handleSaveClick}
          disabled={isDisabled}
        >
          Сохранить
        </button>
      </div>
    </li>
  );
}

export default MoviesCard;
