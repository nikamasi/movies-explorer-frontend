import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox.js";
import { useEffect } from "react";
import { filterMovies, filterShortMovies } from "../../utils/filterMovies";
import { useLocation } from "react-router-dom";

function SearchForm({ moviesData, onResult, getAPIMovies }) {
  const location = useLocation();

  function matchPreviousSearch(e) {
    return (
      localStorage.getItem(`${location.pathname}-key`) === e.target.key.value &&
      localStorage.getItem(`${location.pathname}-toggleState`) ===
        e.target.checkbox.checked.toString()
    );
  }

  function updateStorage(e, foundMovies) {
    localStorage.setItem(`${location.pathname}-key`, e.target.key.value);
    localStorage.setItem(location.pathname, JSON.stringify(foundMovies));
    localStorage.setItem(`${location.pathname}-toggleState`, e.target.checked);
  }

  function handleSubmit(e) {
    e.preventDefault();
    let foundMovies = [];
    let searchMessage = "";
    if (e.target.key.value === "") {
      foundMovies = [];
      searchMessage = "Нужно ввести ключевое слово";
    } else if (matchPreviousSearch(e)) {
      foundMovies = JSON.parse(localStorage.getItem(location.pathname));
      searchMessage = "";
    } else if (moviesData.length === 0) {
      getAPIMovies().then((data) => {
        foundMovies = filterMovies(data, e.target.checkbox.checked, e.target.key.value);
        return onResult(
          foundMovies,
          foundMovies.length === 0 ? "Ничего не найдено" : ""
        );
      });
    } else {
      foundMovies = filterMovies(moviesData, e.target.checkbox.checked, e.target.key.value);
      searchMessage = foundMovies.length === 0 ? "Ничего не найдено" : "";
    }
    onResult(foundMovies, searchMessage);
    updateStorage(e, foundMovies)
  }

  function handleToggle(e) {
    if (e.target.checked) {
      const foundMovies = filterShortMovies(
        JSON.parse(localStorage.getItem(location.pathname))
      );
      if (foundMovies.length === 0) {
        onResult([], "Ничего не найдено");
      } else {
        onResult(foundMovies, "");
      }
    } else {
      onResult(JSON.parse(localStorage.getItem(location.pathname)));
    }
  }

  useEffect(() => {
    if (
      location.pathname === "/movies" && 
      localStorage.getItem(location.pathname) &&
      moviesData.length !== 0
    ) {
      onResult(JSON.parse(localStorage.getItem(location.pathname)), "");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return (
    <form className="search" onSubmit={handleSubmit}>
      <div className="search__input-container">
        <div className="search__logo" />
        <input
          className="search__input"
          type="text"
          id="key"
          name="search"
          placeholder={"Фильм"}
          defaultValue={moviesData.length !== 0 ? localStorage.getItem(`${location.pathname}-key`) : ""}
        ></input>
        <button className="search__button" type="submit" />
      </div>
      <FilterCheckbox handleToggle={handleToggle} />
    </form>
  );
}

export default SearchForm;
