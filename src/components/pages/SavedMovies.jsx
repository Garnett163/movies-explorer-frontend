import React, { useEffect, useState } from 'react';
import Header from '../sections/Header';
import SearchForm from '../sections/SearchForm';
import MoviesCardList from '../sections/MoviesCardList';
import Footer from '../sections/Footer';
import { mainApi } from '../../utils/MainApi';
import { searchFilteringByWords, searchFilteringByDuration } from '../../utils/utils';

function SavedMovies({ isLoggedIn }) {
  const [isSaveMovie, setIsSaveMovie] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [shortFilm, setShortFilm] = useState(false);
  const [searchError, setSearchError] = useState('');

  useEffect(() => {
    mainApi.getSavesMovies().then((response) => {
      setIsSaveMovie(response);

      localStorage.setItem('savedMovies', JSON.stringify(response));
    });
  }, [setIsSaveMovie]);

  function handleSearchError(error) {
    setSearchError(error);
    setIsSaveMovie([]);
  }

  function handleSearchSuccess(filteredData, isShortFilm) {
    setIsSaveMovie(filteredData);
    setSearchError('');
  }

  const storedMovies = localStorage.getItem('savedMovies');

  function handleSearchMovies() {
    if (storedMovies) {
      setIsSaveMovie(JSON.parse(storedMovies));
      const filteredMovies = searchFilteringByWords(JSON.parse(storedMovies), searchQuery);

      if (filteredMovies.length === 0) {
        handleSearchError(`По вашему запросу ${searchQuery} ничего не найдено`);
        return;
      }

      if (shortFilm) {
        const filteredShortFilms = searchFilteringByDuration(filteredMovies, true);
        handleSearchSuccess(filteredShortFilms, true);
      } else {
        handleSearchSuccess(filteredMovies, false);
      }
    }
  }

  function handleCheckboxChange() {
    setShortFilm(!shortFilm);

    const storedMovies = localStorage.getItem('savedMovies');
    if (!storedMovies) {
      return;
    }

    if (shortFilm) {
      const storedMovies = localStorage.getItem('savedMovies');
      const filteredMovies = searchFilteringByWords(JSON.parse(storedMovies), searchQuery);

      setIsSaveMovie(filteredMovies);
    } else {
      const filteredShortFilms = searchFilteringByDuration(isSaveMovie, true);

      setIsSaveMovie(filteredShortFilms);
    }
  }

  function deleteMovie(movieId) {
    mainApi
      .deleteMovie(movieId)
      .then(() => {
        const updatedMovies = isSaveMovie.filter((movie) => movie._id !== movieId);
        setIsSaveMovie(updatedMovies);

        const updatedSavedMovies = JSON.parse(localStorage.getItem('savedMovies')).filter((item) => item._id !== movieId);
        localStorage.setItem('savedMovies', JSON.stringify(updatedSavedMovies));
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <>
      <Header isLoggedIn={isLoggedIn} />
      <main>
        <SearchForm
          onSearch={handleSearchMovies}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          shortFilm={shortFilm}
          setSearchError={setSearchError}
          onChangeCheckBox={handleCheckboxChange}
        />
        <MoviesCardList movies={isSaveMovie} deleteMovie={deleteMovie} searchError={searchError} />
      </main>
      <div className='divider'></div>
      <Footer />
    </>
  );
}

export default SavedMovies;
