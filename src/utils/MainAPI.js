class MainAPI {
  constructor(options) {
    this._url = options.baseUrl;
    this._headers = options.headers;
  }

  _handleResponse(res, errorMessage) {
    if (res.ok) {
      return res.json();
    } else {
      if (res.status === 500) {
        errorMessage = "На сервере произошла ошибка."
      }
      return Promise.reject(errorMessage);
    }
  }

  signUp({ password, email, name }) {
    return fetch(`${this._url}/signup`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ name, email, password }),
    }).then((res) => {
      let message = "При регистрации пользователя произошла ошибка.";
      if (res.status === 409) {
        message = "Пользователь с таким email уже существует.";
      }
      return this._handleResponse(res, message);
    });
  }

  signIn({ password, email }) {
    return fetch(`${this._url}/signin`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ password, email }),
    })
      .then((res) => {
        let message = "При авторизации произошла ошибка.";
        if (res.status === 401) {
          message = "Вы ввели неправильный логин или пароль.";
        }
        return this._handleResponse(res, message);
      })
      .then((token) => token);
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      headers: {
        ...this._headers,
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    })
      .then((res) =>
        this._handleResponse(res, "Ошибка при получении данных пользователя.")
      )
      .then((res) => res);
  }

  saveUserInfo(name, email) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: {
        ...this._headers,
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      body: JSON.stringify({ name, email }),
    })
      .then((res) => {
        let message = "При обновлении профиля произошла ошибка.";
        if (res.status === 409) {
          message = "Пользователь с таким email уже существует.";
        }
        return this._handleResponse(res, message);
      })
      .then((res) => res);
  }

  getSavedMovies() {
    return fetch(`${this._url}/movies`, {
      headers: {
        ...this._headers,
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    })
      .then((res) => this._handleResponse(res, "Ошибка при получении фильмов"))
  }

  saveMovie({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    nameRU,
    nameEN,
    movieId,
  }) {
    return fetch(`${this._url}/movies`, {
      method: "POST",
      headers: {
        ...this._headers,
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      body: JSON.stringify({
        country,
        director,
        duration,
        year,
        description,
        image,
        trailer,
        thumbnail,
        nameRU,
        nameEN,
        movieId,
      }),
    }).then((res) => this._handleResponse(res, "Ошибка при сохранении данных изображения.")
    )
  }

  deleteMovie(id) {
    return fetch(`${this._url}/movies/${id}`, {
      method: "DELETE",
      headers: {
        ...this._headers,
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    }).then((res) =>
      this._handleResponse(res, "Ошибка при удалении изображения.")
    );
  }
}

export const mainAPI = new MainAPI({
  baseUrl: "https://api.angel.nomoredomains.icu",
  headers: {
    "Content-Type": "application/json",
  },
});
