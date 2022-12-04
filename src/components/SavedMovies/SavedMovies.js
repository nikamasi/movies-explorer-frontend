import "./SavedMovies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { useState } from "react";
import Preloader from "../Preloader/Preloader";

function SavedMovies({ savedMovies, handleDeleteClick, isLoading }) {
  function handleClick(e, movie) {
    handleDeleteClick(e, movie);
  }

  const [isSearch, setIsSearch] = useState(false);
  const [searchResult, setSearchResult] = useState("")

  const [foundMovies, setFoundMovies] = useState([]);

  function handleSearchResult(movies, searchMessage) {
    setFoundMovies(movies);
    setIsSearch(true);
    setSearchResult(searchMessage)
  }

  return (
    <main className="movies">
      <SearchForm
        moviesData={savedMovies}
        setFoundMovies={setFoundMovies}
        onResult={handleSearchResult}
      />
      <MoviesCardList
        savedMovies={savedMovies}
        foundMovies={foundMovies}
        isSavedMovies={true}
        isSearch={isSearch}
        handleClick={handleClick}
        searchResult={searchResult}
      />
      {isLoading ? <Preloader></Preloader> : ""}
    </main>
  );
}

export default SavedMovies;
