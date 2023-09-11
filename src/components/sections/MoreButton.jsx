import React, { useCallback } from 'react';

function MoreButton({ setVisibleMoviesCount, visibleMoviesCount }) {
  const handleLoadMoreMovies = useCallback(() => {
    const screenWidth = window.innerWidth;
    if (screenWidth <= 1280 && screenWidth >= 861) {
      setVisibleMoviesCount(visibleMoviesCount + 3);
    } else if (screenWidth <= 860) {
      setVisibleMoviesCount(visibleMoviesCount + 2);
    } else {
      setVisibleMoviesCount(visibleMoviesCount + 3);
    }
  }, [visibleMoviesCount, setVisibleMoviesCount]);

  return (
    <section className='more'>
      <button className='more__button' type='submit' onClick={handleLoadMoreMovies}>
        Еще
      </button>
    </section>
  );
}

export default MoreButton;
