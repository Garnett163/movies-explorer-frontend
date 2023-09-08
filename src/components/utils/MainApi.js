class MainApi {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _sendFetchRequest(path, settings) {
    return fetch(`${this._baseUrl}${path}`, settings).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(res);
    });
  }

  signUp(name, email, password) {
    return this._sendFetchRequest(`/signup`, {
      method: 'POST',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
      }),
    });
  }

  signIn(email, password) {
    return this._sendFetchRequest(`/signin`, {
      method: 'POST',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
  }

  logOut() {
    return this._sendFetchRequest(`/signout`, {
      method: 'POST',
      credentials: 'include',
      headers: this._headers,
    });
  }

  getUserInfo() {
    return this._sendFetchRequest(`/users/me`, {
      method: 'GET',
      credentials: 'include',
      headers: this._headers,
    });
  }

  editUserInfo(userInfo) {
    return this._sendFetchRequest(`/users/me`, {
      method: 'PATCH',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        name: userInfo.name,
        email: userInfo.email,
      }),
    });
  }

  getSavesMovies() {
    return this._sendFetchRequest(`/movies`, {
      method: 'GET',
      credentials: 'include',
      headers: this._headers,
    });
  }

  saveMovie(movie) {
    return this._sendFetchRequest(`/movies`, {
      method: 'POST',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify(movie),
    });
  }

  deleteMovie(movieId) {
    return this._sendFetchRequest(`/movies/${movieId}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: this._headers,
    });
  }
}

export const mainApi = new MainApi({
  //   baseUrl: `api.movies.garnett163.nomoreparties.co`,
  baseUrl: 'http://localhost:4000',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});
