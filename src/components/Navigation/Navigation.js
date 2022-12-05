import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
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
        <NavLink exact to="/" 
        className={isActive => "hidden-menu__link " + (isActive ? "hidden-menu__link_active" : "")} onClick={onClick}>
          Главная
        </NavLink>
        <NavLink
          to="/movies"
          className={isActive => "hidden-menu__link " + (isActive ? "hidden-menu__link_active" : "")}
          onClick={onClick}
        >
          Фильмы
        </NavLink>
        <NavLink
          to="/saved-movies"
          className={isActive => "hidden-menu__link " + (isActive ? "hidden-menu__link_active" : "")}
          onClick={onClick}
        >
          Сохраненные фильмы
        </NavLink>
        <NavLink
          to="/profile"
          className="account-link hidden-menu__account-link"
          onClick={onClick}
        >
          <p className="account-link__account account-link__account_light">Аккаунт</p>
          <div className="account-link__account-logo" />
        </NavLink>
      </nav>
      <div
        className={`menu-button ${
          menuIsOpen ? "menu-button_close" : "menu-button_burger"
        }`}
        onClick={onClick}
      >
        <span className={`menu-button__bar ${location.pathname === "/" ? "menu-button__bar_dark": "" }`}/>
        <span className={`menu-button__bar ${location.pathname === "/" ? "menu-button__bar_dark": "" }`} />
        <span className={`menu-button__bar ${location.pathname === "/" ? "menu-button__bar_dark": "" }`} />
      </div>
    </>
  );
}

export default Navigation;
