class MoviesAPI {
  constructor(options) {
    this._url = options.baseUrl;
    this._headers = options.headers;
  }

  _handleResponse(res, errorMessage) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(errorMessage);
    }
  }

  getMovies() {
    return fetch(this._url, { headers: this._headers })
      .then((res) => this._handleResponse(res, "Ошибка при получении карточек"))
      .then((res) => res);
  }
}

export const moviesAPI = new MoviesAPI({
  baseUrl: "https://api.nomoreparties.co/beatfilm-movies",
  headers: {
    "Content-Type": "application/json",
  },
});
