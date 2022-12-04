export function filterMovies(moviesData, isShortFilm, key) {
  let foundMovies = [];
  Array.from(moviesData).forEach((movie) => {
    if ((isShortFilm && movie.duration < 40) || !isShortFilm) {
      if (JSON.stringify(movie).toLowerCase().includes(key)) {
        foundMovies.push(movie);
      }
    }
  });
  return foundMovies;
}

export function filterShortMovies(moviesData) {
  let foundMovies = [];
  Array.from(moviesData).forEach((movie) => {
    if (movie.duration < 40) {
      foundMovies.push(movie);
    }
  });
  return foundMovies;
}
