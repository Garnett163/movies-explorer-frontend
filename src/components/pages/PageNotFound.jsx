import React from 'react';
import { Link } from 'react-router-dom';

function PageNotFound() {
  return (
    <div className='page-not-found'>
      <span className='page-not-found__number'>404</span>
      <p className='page-not-found__note'>Страница не найдена</p>
      <Link to='/' className='page-not-found__link'>
        Назад
      </Link>
    </div>
  );
}

export default PageNotFound;
