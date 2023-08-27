import React from 'react';
import Header from '../sections/Header';
import Promo from '../sections/Promo';
import AboutProject from '../sections/AboutProject';
import Techs from '../sections/Techs';
import AboutMe from '../sections/AboutMe';
import Portfolio from '../sections/Portfolio';
import Footer from '../sections/Footer';

function Main({ isLoggedIn }) {
  return (
    <>
      <Header isLoggedIn={isLoggedIn} />
      <main>
        <Promo />
        <AboutProject />
        <Techs />
        <AboutMe />
        <Portfolio />
      </main>
      <Footer />
    </>
  );
}

export default Main;
