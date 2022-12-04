import "./Register.css";
import { Link } from "react-router-dom";
import logo_movies from "../../images/logo_movies.svg";
import { useFormWithValidation } from "../../hooks/useFormWithValidation.js";

function Register({ onSubmit, registerResponse }) {
  const { values, handleChange, errors, isValid, resetForm } =
    useFormWithValidation({
      name: "",
      email: "",
      password: "",
    });

  function handleSubmit(e) {
    e.preventDefault();
    if (isValid) {
      onSubmit(values).then(() => {
        resetForm();
      });
    }
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
            value={values.name}
            className={`auth__input ${
              (errors.name !== "" && isValid) ? "auth__input_error" : ""
            }`}
            minLength={2}
          ></input>
          <span className="auth__error" id="name-error">
            {errors.name}
          </span>

          <label className="auth__label">Email</label>

          <input
            id="email"
            name="email"
            onChange={handleChange}
            type="email"
            value={values.email}
            className={`auth__input ${
              (errors.email !== "" && isValid) ? "auth__input_error" : ""
            }`}
          ></input>
          <span className="auth__error" id="email-error">
            {errors.email}
          </span>
          <label className="auth__label">Пароль</label>
          <input
            id="password"
            name="password"
            onChange={handleChange}
            type="password"
            value={values.password}
            className="auth__input"
          ></input>
          <span className="auth__error" id="password-error">
            {errors.password}
          </span>
        </div>

        <span
            className={`auth__result ${
              registerResponse.value ? "" : "auth__result_error"
            }`}
          >
            {registerResponse.message}
        </span>


        <button
          className={`auth__button button ${isValid ? "" : "button_disabled"}`}
          type="submit"
          disabled={!isValid}
        >
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
