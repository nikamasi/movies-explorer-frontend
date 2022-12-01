import "./Movies.css";
import SearchForm from "../SearchForm/SearchForm.js";
import MoviesCardList from "../MoviesCardList/MoviesCardList.js";
import { mockCards } from "../../utils/mockData";

function Movies() {
    function handleLikeClick(e) {
        e.target.classList.toggle("card__like_active")
    }
    return (
        <main className="movies">
        <SearchForm/>
        <MoviesCardList cards={mockCards} isSavedMovies={false} handleClick={handleLikeClick}/>
        </main>
    )
}

export default Movies;
