import { Route } from "react-router-dom";
import logo_movies from "../../images/logo_movies.svg";
import { Link, NavLink } from "react-router-dom";
import Navigation from "../Navigation/Navigation.js";
import "./Header.css";

function Header({ isLogged }) {
  const loggedNavBar = (
    <nav className="header__nav">
      <div className="header__nav-left">
        <Link className="header__link header__link_span link" to="/movies">
          Фильмы
        </Link>
        <Link className="header__link link" to="/saved-movies">
          Сохраненные фильмы
        </Link>
      </div>
      <Link to="/profile" className="account-link header__account-link">
        <p className="account-link__account">Аккаунт</p>
        <div className="account-link__logo" />
      </Link>
    </nav>
  );

  const notLoggedNavBar = (
    <nav className="header__nav header__nav_main">
      <Link to="/signup" className="header__link header__link_span link">
        Регистрация
      </Link>
      <Link to="/signin" className="header__signin-link link">
        Войти
      </Link>
    </nav>
  );

  const logoLink = (
    <Link to="/">
      <img
        className="header__logo header__logo_main"
        src={logo_movies}
        alt="логотип зеленый"
      />
    </Link>
  );

  const moviesNavBar = (
    <nav className="header__nav">
      <div className="header__nav-left">
        <NavLink
          className={(isActive) =>
            "header__link header__link_light link " +
            (isActive ? "header__link_span" : "")
          }
          to="/movies"
        >
          Фильмы
        </NavLink>
        <NavLink
          className={(isActive) =>
            "header__link header__link_light link " +
            (isActive ? "header__link_span" : "")
          }
          to="/saved-movies"
        >
          Сохраненные фильмы
        </NavLink>
      </div>
      <Link to="/profile" className="account-link header__account-link">
        <p className="account-link__account account-link__account_light">
          Аккаунт
        </p>
        <div className="account-link__logo" />
      </Link>
    </nav>
  );

  return (
    <>
      <Route exact path="/">
        <header className="header">
          {logoLink}
          {isLogged ? loggedNavBar : notLoggedNavBar}
        </header>
        {isLogged ? <Navigation /> : ""}
      </Route>

      <Route exact path="/signin"></Route>

      <Route exact path="/signup"></Route>

      <Route exact path="/404"></Route>

      <Route exact path="/movies">
        <header className="header header_light">
          {logoLink}
          {moviesNavBar}
        </header>
        <Navigation />
      </Route>
      <Route exact path="/saved-movies">
        <header className="header header_light">
          {logoLink}
          {moviesNavBar}
        </header>
        <Navigation />
      </Route>
      <Route exact path="/profile">
        <header className="header header_light">
          {logoLink}
          {moviesNavBar}
        </header>
        <Navigation />
      </Route>
    </>
  );
}

export default Header;
