import "./Movies.css";
import SearchForm from "../SearchForm/SearchForm.js";
import MoviesCardList from "../MoviesCardList/MoviesCardList.js";
import { useState } from "react";
import Preloader from "../Preloader/Preloader";

function Movies({
  moviesData,
  handleLikeClick,
  isLoading,
  savedMovies,
  getAPIMovies,
}) {
  const [foundMovies, setFoundMovies] = useState([]);
  const [searchResult, setSearchResult] = useState("");

  function handleSearchResult(movies, searchMessage) {
    setFoundMovies(movies);
    setSearchResult(searchMessage);
  }

  return (
    <main className="movies">
      <SearchForm
        moviesData={moviesData}
        onResult={handleSearchResult}
        getAPIMovies={getAPIMovies}
      />
      {isLoading ? (
        <Preloader></Preloader>
      ) : (
        <MoviesCardList
          foundMovies={foundMovies}
          isSavedMovies={false}
          isSearch={true}
          savedMovies={savedMovies}
          handleClick={handleLikeClick}
          searchResult={searchResult}
        />
      )}
    </main>
  );
}

export default Movies;
