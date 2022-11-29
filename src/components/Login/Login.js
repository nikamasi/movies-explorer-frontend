import "./Login.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import logo_movies from "../../images/logo_movies.svg";

function Login() {
  const [errorMessage, setErrorMessage] = useState({ email: "", password: "" });

  function handleError(e) {
    e.preventDefault();
    setErrorMessage({
      ...errorMessage,
      [e.target.name]: "Что-то пошло не так...",
    });
    e.target.classList.add("auth__input_error");
  }

  function handleChange(e) {
    e.target.classList.remove("auth__input_error");
    setErrorMessage({ ...errorMessage, [e.target.name]: "" });
  }

  return (
    <div className="auth">
      <Link to="/">
        <img
          className="auth__logo"
          src={logo_movies}
          alt="логотип зеленый круг с буквой S"
        ></img>
      </Link>
      <h1 className="auth__header">Рады видеть!</h1>
      <form className="auth__container">
        <div className="auth__inputs">
          <label className="auth__label">Email</label>
          <input
            id="email"
            name="email"
            onChange={handleChange}
            type="email"
            className="auth__input"
            onInvalid={handleError}
          />
          <span className="auth__error" id="email-error">
            {errorMessage.email}
          </span>
          <label className="auth__label">Пароль</label>
          <input
            id="password"
            name="password"
            onChange={handleChange}
            type="password"
            minLength="2"
            className="auth__input"
            onInvalid={handleError}
          />
          <span className="auth__error" id="password-error">
            {errorMessage.password}
          </span>
        </div>

        <button className="button auth__button">Войти</button>
      </form>
      <p className="auth__prompt">
        Ещё не зарегистрированы?{" "}
        <Link to="/signup" className="auth__link link">
          Регистрация
        </Link>
      </p>
    </div>
  );
}

export default Login;
