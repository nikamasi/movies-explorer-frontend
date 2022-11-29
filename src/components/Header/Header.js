import { Route, Routes } from "react-router-dom";
import logo from "../../images/logo.svg";
import logo_movies from "../../images/logo_movies.svg";
import { Link } from "react-router-dom";
import Navigation from "../Navigation/Navigation.js";
import "./Header.css";

function Header() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <header className="header">
            <Link to="/">
              <img
                className="header__logo header__logo_main"
                src={logo}
                alt="логотип зеленый"
              />
            </Link>
            <nav className="header__nav header__nav_main">
              <Link
                to="/signup"
                className="header__link header__link_span link"
                href=""
              >
                Регистрация
              </Link>
              <Link to="/signin" className="header__signin-link link">
                Войти
              </Link>
            </nav>
          </header>
        }
      ></Route>

      <Route path="/signin"></Route>

      <Route path="/signup"></Route>

      <Route path="/404"></Route>

      <Route
        path="*"
        element={
          <>
            <header className="header header_light">
              <Link to="/">
                <img
                  className="header__logo"
                  src={logo_movies}
                  alt="логотип зеленый круг с буквой S"
                ></img>
              </Link>
              <nav className="header__nav">
                <Link
                  className="header__link header__link_light header__link_span link"
                  to="/movies"
                >
                  Фильмы
                </Link>
                <Link
                  className="header__link header__link_light link"
                  to="/saved-movies"
                >
                  Сохраненные фильмы
                </Link>
                <Link to="/profile" className="header__account-link link">
                  Аккаунт
                </Link>
              </nav>
            </header>
            <Navigation />
          </>
        }
      ></Route>
    </Routes>
  );
}

export default Header;
