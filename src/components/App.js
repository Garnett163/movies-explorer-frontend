import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Main from './pages/Main';
import Movies from './pages/Movies.jsx';
import SavedMovies from './pages/SavedMovies';
import Profile from './pages/Profile';
import Register from './pages/Register';
import Login from './pages/Login';
import PageNotFound from './pages/PageNotFound';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <div className='page'>
      <Routes>
        <Route path='/' element={<Main isLoggedIn={isLoggedIn} />}></Route>
        <Route path='/movies' element={<Movies isLoggedIn={isLoggedIn} />}></Route>
        <Route path='/saved-movies' element={<SavedMovies isLoggedIn={isLoggedIn} />}></Route>
        <Route path='/profile' element={<Profile isLoggedIn={isLoggedIn} />}></Route>
        <Route path='/signup' element={<Register />}></Route>
        <Route path='/signin' element={<Login />}></Route>
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
