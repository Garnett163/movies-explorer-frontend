class MoviesApi {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _sendFetchRequest(path, settings) {
    return fetch(`${this._baseUrl}${path}`, settings).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  getMovies() {
    return this._sendFetchRequest('/beatfilm-movies', {
      method: 'GET',
      headers: this._headers,
    });
  }
}

export const moviesApi = new MoviesApi({
  baseUrl: `https://api.nomoreparties.co`,
  headers: {
    'Content-Type': 'application/json',
  },
});
