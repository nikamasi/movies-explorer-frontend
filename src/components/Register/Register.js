import "./Register.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import logo_movies from "../../images/logo_movies.svg";

function Register({ onSubmit }) {
  const [errorMessage, setErrorMessage] = useState({
    email: "",
    password: "",
    name: "",
  });

  const [signUpData, setSignUpData] = useState({
    password: "",
    email: "",
  });

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
    setSignUpData({ ...signUpData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
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
      <h1 className="auth__header">Добро пожаловать!</h1>
      <form onSubmit={handleSubmit} className="auth__container">
        <div className="auth__inputs">
          <label className="auth__label">Имя</label>
          <input
            id="name"
            name="name"
            onChange={handleChange}
            type="text"
            value={signUpData.name}
            className="auth__input"
            minLength={2}
            onInvalid={handleError}
          ></input>
          <span className="auth__error" id="name-error">
            {errorMessage.name}
          </span>
          <label className="auth__label">Email</label>
          <input
            id="email"
            name="email"
            onChange={handleChange}
            type="email"
            value={signUpData.email}
            className="auth__input"
            onInvalid={handleError}
          ></input>
          <span className="auth__error" id="email-error">
            {errorMessage.email}
          </span>
          <label className="auth__label">Пароль</label>
          <input
            id="password"
            name="password"
            onChange={handleChange}
            type="password"
            value={signUpData.password}
            className="auth__input"
            minLength={4}
            onInvalid={handleError}
          ></input>
          <span className="auth__error" id="password-error">
            {errorMessage.password}
          </span>
        </div>
        <button className="auth__button button" type="submit">
          Зарегистрироваться
        </button>
      </form>
      <p className="auth__prompt">
        Уже зарегистрированы?{" "}
        <Link to="/signin" className="auth__link link">
          Войти
        </Link>
      </p>
    </div>
  );
}

export default Register;
