import React, { useState, useEffect } from 'react';
import Header from '../sections/Header';
import Footer from '../sections/Footer';
import SearchForm from '../sections/SearchForm';
import MoviesCardList from '../sections/MoviesCardList';
import MoreButton from '../sections/MoreButton';
import { searchFilteringByWords, searchFilteringByDuration } from '../../utils/utils';
import { moviesApi } from '../../utils/MoviesApi';
import useVisibleMoviesCount from '../../hooks/useVisibleMoviesCount.js';
import { mainApi } from '../../utils/MainApi';

function Movies({ isLoggedIn }) {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchError, setSearchError] = useState('');
  const [shortFilm, setShortFilm] = useState(false);
  const [isSaveMovie, setIsSaveMovie] = useState([]);

  const [visibleMoviesCount, setVisibleMoviesCount, resetVisibleMoviesCount] = useVisibleMoviesCount();

  useEffect(() => {
    const storedSearchResults = localStorage.getItem('searchResults');
    const storedSearchQuery = localStorage.getItem('searchQuery');
    const storedShortFilm = localStorage.getItem('shortFilm');

    if (storedSearchResults && storedSearchQuery) {
      setSearchResults(JSON.parse(storedSearchResults));
      setSearchQuery(storedSearchQuery);
      setShortFilm(storedShortFilm ? storedShortFilm === 'true' : false);
    } else {
      setShortFilm(false);
      setSearchResults([]);
    }
    const storedSavedMovies = localStorage.getItem('savedMovies');

    if (storedSavedMovies) {
      setIsSaveMovie(JSON.parse(storedSavedMovies));
    }
  }, []);

  function findSaveMoviesById(movie, savedMovies) {
    return savedMovies.find((saveMovie) => saveMovie.movieId === movie.id);
  }

  const updatedSearchResults = searchResults.map((item) => ({ ...item, saved: findSaveMoviesById(item, isSaveMovie) }));

  function handleSearchError(error) {
    setSearchError(error);
    setSearchResults([]);
  }

  function handleSearchSuccess(filteredData, isShortFilm) {
    setSearchResults(filteredData);
    setSearchError('');
    localStorage.setItem('searchResults', JSON.stringify(filteredData));
    localStorage.setItem('searchQuery', searchQuery);
  }
  function handleSearchMovies() {
    resetVisibleMoviesCount(visibleMoviesCount);
    const storedMovies = localStorage.getItem('movies');

    if (storedMovies) {
      setMovies(JSON.parse(storedMovies));
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
    } else {
      setIsLoading(true);

      mainApi
        .getSavesMovies()
        .then((response) => {
          setIsSaveMovie(response);
          localStorage.setItem('savedMovies', JSON.stringify(response));
        })
        .catch((err) => {
          console.log(err);
        });

      moviesApi
        .getMovies()
        .then((response) => {
          setMovies(response);
          const filteredMovies = searchFilteringByWords(response, searchQuery);

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

          localStorage.setItem('movies', JSON.stringify(response));
          localStorage.setItem('searchQuery', searchQuery);
        })
        .catch((err) => {
          handleSearchError('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен.');
          setMovies([]);
          setSearchResults([]);
          console.log(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }

  function handleCheckboxChange() {
    setShortFilm(!shortFilm);
    localStorage.setItem('shortFilm', !shortFilm ? 'true' : 'false');

    const storedMovies = localStorage.getItem('movies');
    if (!storedMovies) {
      return;
    }
    const storedShortFilm = localStorage.getItem('shortFilm');
    if (storedShortFilm === 'true') {
      const filteredShortFilms = searchFilteringByDuration(searchResults, true);
      localStorage.setItem('searchResults', JSON.stringify(filteredShortFilms));
      setSearchResults(filteredShortFilms);
    } else {
      const storedMovies = localStorage.getItem('movies');
      const filteredMovies = searchFilteringByWords(JSON.parse(storedMovies), searchQuery);
      localStorage.setItem('searchResults', JSON.stringify(filteredMovies));
      setSearchResults(filteredMovies);
    }
  }

  function handleSaveMovie(movie) {
    return mainApi
      .saveMovie({
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image: `https://api.nomoreparties.co/${movie.image.url}`,
        trailerLink: movie.trailerLink,
        thumbnail: `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`,
        movieId: movie.id,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
      })
      .then((response) => {
        setIsSaveMovie([response, ...isSaveMovie]);
        localStorage.setItem('savedMovies', JSON.stringify([response, ...isSaveMovie]));
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function handleDeleteMovie(movie) {
    const findMovie = isSaveMovie.find((i) => i.movieId === movie.id);
    const movieId = findMovie._id;

    mainApi
      .deleteMovie(movieId)
      .then((response) => {
        setIsSaveMovie((state) => state.filter((c) => c._id !== movieId));
        localStorage.setItem('savedMovies', JSON.stringify(isSaveMovie.filter((item) => item._id !== movieId)));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    function handleResize() {
      const screenWidth = window.innerWidth;

      if (screenWidth >= 861) {
        setVisibleMoviesCount(12);
      } else if (screenWidth >= 550) {
        setVisibleMoviesCount(8);
      } else {
        setVisibleMoviesCount(5);
      }
      const resizeTimeoutDelay = 500;
      let resizeTimeout;

      window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(handleResize, resizeTimeoutDelay);
      });

      return () => {
        window.removeEventListener('resize', handleResize);
        clearTimeout(resizeTimeout);
      };
    }

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [searchQuery, setVisibleMoviesCount]);

  return (
    <>
      <Header isLoggedIn={isLoggedIn} />
      <main>
        <SearchForm
          onSearch={handleSearchMovies}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          setSearchError={setSearchError}
          shortFilm={shortFilm}
          onChangeCheckBox={handleCheckboxChange}
        />
        <MoviesCardList
          movies={updatedSearchResults.slice(0, visibleMoviesCount)}
          isLoading={isLoading}
          searchError={searchError}
          handleSaveMovie={handleSaveMovie}
          handleDeleteMovie={handleDeleteMovie}
        ></MoviesCardList>
        {visibleMoviesCount < searchResults.length && (
          <MoreButton setVisibleMoviesCount={setVisibleMoviesCount} visibleMoviesCount={visibleMoviesCount} />
        )}
      </main>
      <Footer />
    </>
  );
}

export default Movies;
