import React, { useState, useEffect } from 'react';
import Header from '../sections/Header';
import Footer from '../sections/Footer';
import SearchForm from '../sections/SearchForm';
import MoviesCardList from '../sections/MoviesCardList';
import MoreButton from '../sections/MoreButton';
import Preloader from '../UI/Preloader';
import { moviesApi } from '../utils/Movies.Api';

function Movies({ isLoggedIn }) {
  const [moviesArray, setMoviesArray] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [displayCards, setDisplayCards] = useState(12);

  function handleSearchMovies() {
    setIsLoading(true);
    if (!searchQuery) {
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
        setDisplayCards(12); // сбрасываем количество отображаемых карточек при новом поиске
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleShowMoreCards() {
    setDisplayCards((prevDisplayedCards) => prevDisplayedCards + 3);
  }

  return (
    <>
      <Header isLoggedIn={isLoggedIn} />
      <main>
        <SearchForm onSearch={handleSearchMovies} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <MoviesCardList moviesArray={moviesArray.slice(0, displayCards)}></MoviesCardList>
        {displayCards < moviesArray.length && <MoreButton onClick={handleShowMoreCards} />}
      </main>
      <Footer />
    </>
  );
}

export default Movies;
