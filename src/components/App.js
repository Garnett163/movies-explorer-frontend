import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Main from './pages/Main';
import Movies from './pages/Movies.jsx';
import SavedMovies from './pages/SavedMovies';
import Profile from './pages/Profile';
import Register from './pages/Register';
import Login from './pages/Login';
import PageNotFound from './pages/PageNotFound';
import Preloader from './UI/Preloader';

import { mainApi } from './utils/MainApi';
import ProtectedRoute from './utils/ProtectedRoute';
import CurrentUserContext from './contexts/CurrentUserContext';

import ValidationTest from './pages/ValidationTest';
import LoginTEST from './pages/LoginTEST';
import ProfileTEST from './pages/ProfileTEST';

function App() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [serverError, setServerError] = useState(null);

  useEffect(() => {
    mainApi
      .getUserInfo()
      .then((response) => {
        if (!response) {
          return;
        } else {
          setIsLoggedIn(true);
          setCurrentUser(response);
        }
      })
      .catch((err) => {
        setIsLoggedIn(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [isLoading]);

  function handleRegisterSubmit({ name, email, password }) {
    mainApi
      .signUp(name, email, password)
      .then((response) => {
        handleLoginSubmit({ email, password });
      })
      .catch((err) => {
        if (err.status === 409) {
          setServerError('Пользователь с таким email уже существует.');
        } else if (err.status === 500) {
          setServerError('На сервере произошла ошибка');
        } else {
          setServerError('При регистрации пользователя произошла ошибка.');
        }
        setTimeout(() => {
          setServerError(null);
        }, 3000);
      });
  }

  function handleLoginSubmit({ email, password }) {
    mainApi
      .signIn(email, password)
      .then((response) => {
        setIsLoggedIn(true);
        setCurrentUser(response);
        navigate('/movies', { replace: true });
      })
      .catch((err) => {
        if (err.status === 401) {
          setServerError('Вы ввели неправильный логин и пароль');
        } else if (err.status === 500) {
          setServerError('На сервере произошла ошибка');
        } else {
          setServerError('При авторизации произошла ошибка. Токен не передан или передан не в том формате.');
        }
        setTimeout(() => {
          setServerError(null);
        }, 3000);
      });
  }

  return (
    <div className='page'>
      {isLoading ? (
        <Preloader />
      ) : (
        <CurrentUserContext.Provider value={currentUser}>
          <Routes>
            <Route path='/' element={<Main isLoggedIn={isLoggedIn} />}></Route>
            <Route path='/movies' element={<ProtectedRoute element={Movies} isLoggedIn={isLoggedIn} />}></Route>
            <Route path='/saved-movies' element={<ProtectedRoute element={SavedMovies} isLoggedIn={isLoggedIn} />}></Route>
            <Route
              path='/profile'
              element={
                <ProtectedRoute
                  element={ProfileTEST}
                  isLoggedIn={isLoggedIn}
                  setIsLoading={setIsLoading}
                  setIsLoggedIn={setIsLoggedIn}
                  setCurrentUser={setCurrentUser}
                />
              }
            ></Route>
            <Route path='/signup' element={<ValidationTest onRegister={handleRegisterSubmit} serverError={serverError} />}></Route>
            <Route path='/signin' element={<LoginTEST onLogin={handleLoginSubmit} serverError={serverError} />}></Route>
            <Route path='*' element={<PageNotFound />} />
          </Routes>
        </CurrentUserContext.Provider>
      )}
    </div>
  );
}

export default App;
