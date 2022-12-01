import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Navigation.css";

function Navigation() {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  function onClick() {
    setMenuIsOpen(!menuIsOpen);
  }
  const location = useLocation();

  useEffect(() => {
    if (menuIsOpen) {
      setMenuIsOpen(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div
        className={`background ${menuIsOpen ? "background_active" : ""}`}
      ></div>
      <nav className={`hidden-menu ${menuIsOpen ? "hidden-menu_active" : ""}`}>
        <Link to="/" className="hidden-menu__link" onClick={onClick}>
          Главная
        </Link>
        <Link
          to="/movies"
          className={`hidden-menu__link ${
            location.pathname === "/movies" ? "hidden-menu__link_active" : ""
          }`}
          onClick={onClick}
        >
          Фильмы
        </Link>
        <Link
          to="/saved-movies"
          className={`hidden-menu__link ${
            location.pathname === "/saved-movies"
              ? "hidden-menu__link_active"
              : ""
          }`}
          onClick={onClick}
        >
          Сохраненные фильмы
        </Link>
        <Link
          to="/profile"
          className="account-link hidden-menu__account-link"
          onClick={onClick}
        >
          <p className="account-link__account">Аккаунт</p>
          <div className="account-link__account-logo" />
        </Link>
      </nav>
      <div
        className={`menu-button ${
          menuIsOpen ? "menu-button_close" : "menu-button_burger"
        }`}
        onClick={onClick}
      >
        <span className="menu-button__bar" />
        <span className="menu-button__bar" />
        <span className="menu-button__bar" />
      </div>
    </>
  );
}

export default Navigation;
