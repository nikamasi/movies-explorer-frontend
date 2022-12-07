import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox.js";
import { useEffect, useState } from "react";
import { filterMovies } from "../../utils/filterMovies";
import { useLocation } from "react-router-dom";

function SearchForm({ moviesData, onResult, getAPIMovies, setIsSearch }) {

  const [key, setKey] = useState("")
  const [checked, setChecked] = useState(localStorage.getItem('checked') === 'true')

  function updateStorage(
    key,
    checked,
    foundMovies,
    filteredMovies,
    searchMessage
  ) {
    localStorage.setItem("key", key);
    localStorage.setItem("foundMovies", JSON.stringify(foundMovies));
    localStorage.setItem("filteredMovies", JSON.stringify(filteredMovies));
    localStorage.setItem("checked", checked);
    localStorage.setItem("searchMessage", searchMessage);
  }

  function handleSubmit(e) {
    e.preventDefault();
    let foundMovies = [];
    let filteredMovies = [];
    let searchMessage = "";
    setIsSearch(true);
    if (e.target.key.value === "") {
      searchMessage = "Нужно ввести ключевое слово";
    } else if (location.pathname === "/saved-movies") {
      filteredMovies = filterMovies(
        moviesData,
        e.target.checkbox.checked,
        e.target.key.value
      );
      searchMessage = filteredMovies.length === 0 ? "Ничего не найдено" : "";
    } else {
      const data = JSON.parse(localStorage.getItem("moviesData"));
      if (data) {
        foundMovies = data;
        filteredMovies = filterMovies(
          data,
          e.target.checkbox.checked,
          e.target.key.value
        );
        searchMessage = filteredMovies.length === 0 ? "Ничего не найдено" : "";
      } else {
        return getAPIMovies().then((data) => {
          foundMovies = data;
          filteredMovies = filterMovies(
            data,
            e.target.checkbox.checked,
            e.target.key.value
          );
          searchMessage = filteredMovies.length === 0 ? "Ничего не найдено" : "";
            updateStorage(
              e.target.key.value,
              e.target.checkbox.checked,
              foundMovies,
              filteredMovies,
              searchMessage
            );
          return onResult(
            filteredMovies,
            searchMessage
          );
        });
      }
      filteredMovies = filterMovies(
        foundMovies,
        e.target.checkbox.checked,
        e.target.key.value
      );
      searchMessage = filteredMovies.length === 0 ? "Ничего не найдено" : "";
    }
    onResult(filteredMovies, searchMessage);
    if (location.pathname === "/movies") {
      updateStorage(
        e.target.key.value,
        e.target.checkbox.checked,
        foundMovies,
        filteredMovies,
        searchMessage
      );
    }
  }

  useEffect(() => {
    if (location.pathname === "/saved-movies") {
      let filteredMovies = filterMovies(
        moviesData,
        checked,
        key
      );
      let searchMessage = filteredMovies.length === 0 ? "Ничего не найдено" : "";
      onResult(filteredMovies, searchMessage)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [moviesData])

  function handleToggle(e) {
    setChecked(e.target.checked)
    let foundMovies = []
    if (location.pathname === "/saved-movies") {
      foundMovies = moviesData;
    } else {
      foundMovies = JSON.parse(localStorage.getItem("foundMovies"));
    }
    let filteredMovies = [];
    let searchMessage = "";
    if (key === "") {
      filteredMovies = [];
      foundMovies = [];
      searchMessage = "Нужно ввести ключевое слово";
    } else {
      if (foundMovies.length === 0) {
        filteredMovies = [];
      } else {
        filteredMovies = filterMovies(foundMovies, e.target.checked, key);
      }
      searchMessage = filteredMovies.length !== 0 ? "" : "Ничего не найдено";
    }
    onResult(filteredMovies, searchMessage);
    if (location.pathname === "/movies") {
      updateStorage(
        key,
        e.target.checked,
        foundMovies,
        filteredMovies,
        searchMessage
      );
    }
  }

  const location = useLocation();

  function handleKeyChange(e) {
    setKey(e.target.value)
  }

  useEffect(() => {
    setKey(location.pathname === "/movies" ? localStorage.getItem("key") : "")
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <form className="search" onSubmit={handleSubmit}>
      <div className="search__input-container">
        <div className="search__logo" />
        <input
          className="search__input"
          type="text"
          id="key"
          name="search"
          value={key? key : ""}
          onChange={handleKeyChange}
          placeholder={"Фильм"}
        ></input>
        <button className="search__button" type="submit" />
      </div>
      <FilterCheckbox handleToggle={handleToggle} />
    </form>
  );
}

export default SearchForm;
