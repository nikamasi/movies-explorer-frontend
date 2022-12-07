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
  const [isSearch, setIsSearch] = useState(false)

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
        setIsSearch={setIsSearch}
      />
      {isLoading ? (
        <Preloader></Preloader>
      ) : (
        <MoviesCardList
          foundMovies={foundMovies}
          isSavedMovies={false}
          isSearch={isSearch}
          setIsSearch={setIsSearch}
          savedMovies={savedMovies}
          handleClick={handleLikeClick}
          searchResult={searchResult}
          setSearchResult={setSearchResult}
        />
      )}
    </main>
  );
}

export default Movies;
