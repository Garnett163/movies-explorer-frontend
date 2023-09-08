import React from 'react';
import { useNavigate } from 'react-router-dom';

function PageNotFound() {
  const navigate = useNavigate();

  function handleGoBack() {
    navigate(-1);
  }

  return (
    <div className='page-not-found'>
      <span className='page-not-found__number'>404</span>
      <p className='page-not-found__note'>Страница не найдена</p>
      <button className='page-not-found__link' onClick={handleGoBack}>
        Назад
      </button>
    </div>
  );
}

export default PageNotFound;
