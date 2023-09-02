import React, { useState, useEffect } from 'react';
import Header from '../sections/Header';
import Footer from '../sections/Footer';
import SearchForm from '../sections/SearchForm';
import MoviesCardList from '../sections/MoviesCardList';
import MoreButton from '../sections/MoreButton';

import { moviesApi } from '../utils/Movies.Api';

function Movies({ isLoggedIn }) {
  const [moviesArray, setMoviesArray] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [searchError, setSearchError] = useState('');

  // useEffect(() => {
  //   handleSearchMovies();
  // }, []);

  function handleSearchMovies() {
    setIsLoading(true);
    if (!searchQuery) {
      setSearchError(`По вашему запросу ${searchQuery} ничего не найдено`);
      return;
    }
    moviesApi
      .getMovies()
      .then((response) => {
        const filterMovies = response.filter((movie) => {
          return (
            movie.nameRU.toLowerCase().includes(searchQuery.toLowerCase()) || movie.nameEN.toLowerCase().includes(searchQuery.toLowerCase())
          );
        });
        setIsLoading(false);
        setMoviesArray(filterMovies);
      })
      .catch((err) => {
        setSearchError('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен.');
        setMoviesArray([]);
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <>
      <Header isLoggedIn={isLoggedIn} />
      <main>
        <SearchForm onSearch={handleSearchMovies} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <MoviesCardList moviesArray={moviesArray} isLoading={isLoading} searchError={searchError}></MoviesCardList>
        <MoreButton />
      </main>
      <Footer />
    </>
  );
}

export default Movies;
