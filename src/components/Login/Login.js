import "./Login.css";
import { Link } from "react-router-dom";
import logo_movies from "../../images/logo_movies.svg";
import { useFormWithValidation } from "../../hooks/useFormWithValidation";

function Login({ onSubmit, loginResponse }) {
  const { values, handleChange, errors, isValid, resetForm } =
    useFormWithValidation({ email: "", password: "" });


  function handleSubmit(e) {
    e.preventDefault();
    if (isValid) {
      onSubmit(values);
      resetForm();
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
      <h1 className="auth__header">Рады видеть!</h1>
      <form className="auth__container" onSubmit={handleSubmit}>
        <div className="auth__inputs">
          <label className="auth__label">Email</label>
          <input
            id="email"
            name="email"
            onChange={handleChange}
            type="email"
            className={`auth__input ${
              (errors.email !== "" && isValid) ? "auth__input_error" : ""
            }`}
          />
          <span className="auth__error" id="email-error">
            {errors.email}
          </span>
          <label className="auth__label">Пароль</label>
          <input
            id="password"
            name="password"
            onChange={handleChange}
            type="password"
            minLength="2"
            className={`auth__input ${
              (errors.password !== "" && isValid) ? "auth__input_error" : ""
            }`}
          />
          <span className="auth__error" id="password-error">
            {errors.password}
          </span>
        </div>
        <span
          className={`auth__result ${
            loginResponse.value ? "" : "auth__result_error"
          }`}
        >
          {loginResponse.message}
        </span>
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
