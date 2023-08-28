import React from 'react';
import Header from '../sections/Header';
import SearchForm from '../sections/SearchForm';
import MoviesCardList from '../sections/MoviesCardList';
import MoviesCard from '../sections/MoviesCard';
import Footer from '../sections/Footer';

function SavedMovies({ isLoggedIn }) {
  return (
    <>
      <Header isLoggedIn={isLoggedIn} />
      <main>
        <SearchForm />
        <MoviesCardList>
          <MoviesCard></MoviesCard>
          <MoviesCard></MoviesCard>
          <MoviesCard></MoviesCard>
        </MoviesCardList>
      </main>
      <div className='divider'></div>
      <Footer />
    </>
  );
}

export default SavedMovies;
