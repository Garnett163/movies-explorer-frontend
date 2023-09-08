import { useState } from 'react';

function useVisibleMoviesCount() {
  const [visibleMoviesCount, setVisibleMoviesCount] = useState(12);

  function resetVisibleMoviesCount() {
    setVisibleMoviesCount(visibleMoviesCount);
  }

  return [visibleMoviesCount, setVisibleMoviesCount, resetVisibleMoviesCount];
}

export default useVisibleMoviesCount;
