export function getTimeFromMins(mins) {
  let hours = Math.trunc(mins / 60);
  let minutes = mins % 60;
  return hours + 'ч ' + minutes + 'м';
}

export function searchFilteringByWords(movies, searchQuery) {
  return movies.filter((movie) => {
    return movie.nameRU.toLowerCase().includes(searchQuery.toLowerCase()) || movie.nameEN.toLowerCase().includes(searchQuery.toLowerCase());
  });
}

export function searchFilteringByDuration(movies, shortFilm) {
  if (shortFilm) {
    return movies.filter((movie) => movie.duration <= 40);
  }

  return movies;
}
