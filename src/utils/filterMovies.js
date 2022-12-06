import { SHORT_MOVIE_LENGTH } from "./constants";

export function filterMovies(moviesData, isShortFilm, key) {
  let foundMovies = [];
  if (isShortFilm) {
    Array.from(moviesData).forEach((movie) => {
      if (movie.duration < SHORT_MOVIE_LENGTH) {
        if ((movie.nameRU + movie.nameEN).toLowerCase().includes(key.toLowerCase()))  {
          foundMovies.push(movie);
        }
      }
    });
  } else {
    Array.from(moviesData).forEach((movie) => {
      if (movie.duration >= SHORT_MOVIE_LENGTH) {
        if ((movie.nameRU + movie.nameEN).toLowerCase().includes(key.toLowerCase())) {
          foundMovies.push(movie);
        }
      }
    });
  }

  return foundMovies;
}
