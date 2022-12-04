import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox.js";
import { useState } from "react";
import { filterMovies } from "../../utils/filterMovies";

function SearchForm({moviesData, onResult }) {
  const [key, setKey] = useState("")
  const [isShortFilm, setIsShortFilm] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    if (key === "") {
      onResult([], "Нужно ввести ключевое слово")
    } else {
      const foundMovies = filterMovies(moviesData, isShortFilm, key)
      if (foundMovies.length === 0) {
        onResult([], "Ничего не найдено")
      } else {
        onResult(foundMovies, "")
      }
    }
  }

  function handleChange(e) {
    setKey(e.target.value)
  }

  function handleToggle(e) {
    setIsShortFilm(e.target.checked)
  }
  
  return (
    <form className="search" onSubmit={handleSubmit}>
      <div className="search__input-container">
        <div className="search__logo"/>
        <input
          className="search__input"
          type="text"
          id="name"
          name="search"
          placeholder="Фильм"
          onChange={handleChange}
        ></input>
        <button className="search__button" type="submit" />
      </div>
      <FilterCheckbox handleToggle={handleToggle} />
    </form>
  );
}

export default SearchForm;
