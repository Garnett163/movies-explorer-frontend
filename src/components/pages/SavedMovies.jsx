import React from 'react';
import Header from '../sections/Header';
import SearchForm from '../sections/SearchForm';
import Footer from '../sections/Footer';

function SavedMovies({ isLoggedIn }) {
  return (
    <>
      <Header isLoggedIn={isLoggedIn} />
      <main>
        <SearchForm />
      </main>
      <div className='divider'></div>
      <Footer />
    </>
  );
}

export default SavedMovies;
