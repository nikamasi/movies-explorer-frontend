import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox.js";

function SearchForm() {
  return (
    <form className="search">
      <div className="search__input-container">
        <div className="search__logo"/>
        <input
          className="search__input"
          type="text"
          id="name"
          name="search"
          minLength="2"
          maxLength="200"
          placeholder="Фильм"
          required
        ></input>
        <button className="search__button" type="submit" />
      </div>
      <FilterCheckbox />
    </form>
  );
}

export default SearchForm;
