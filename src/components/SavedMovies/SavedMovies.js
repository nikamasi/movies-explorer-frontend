import "./SavedMovies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { mockSavedCards } from "../../utils/mockData";

function SavedMovies(props) {
  return (
    <main className="movies">
      <SearchForm />
      <MoviesCardList cards={mockSavedCards} isSavedMovies={true} />
    </main>
  );
}

export default SavedMovies;
