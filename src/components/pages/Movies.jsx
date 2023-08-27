import React from 'react';
import Header from '../sections/Header';
import Footer from '../sections/Footer';
import SearchForm from '../sections/SearchForm';
import MoviesCardList from '../sections/MoviesCardList';
import MoviesCard from '../sections/MoviesCard';
import MoreButton from '../sections/MoreButton';

function Movies({ isLoggedIn }) {
  return (
    <>
      <Header isLoggedIn={isLoggedIn} />
      <main>
        <SearchForm />
        <MoviesCardList>
          <MoviesCard></MoviesCard>
          <MoviesCard></MoviesCard>
          <MoviesCard></MoviesCard>
          <MoviesCard></MoviesCard>
          <MoviesCard></MoviesCard>
          <MoviesCard></MoviesCard>
          <MoviesCard></MoviesCard>
          <MoviesCard></MoviesCard>
          <MoviesCard></MoviesCard>
          <MoviesCard></MoviesCard>
          <MoviesCard></MoviesCard>
          <MoviesCard></MoviesCard>
        </MoviesCardList>
        <MoreButton />
      </main>
      <Footer />
    </>
  );
}

export default Movies;
