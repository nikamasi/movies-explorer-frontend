export function filterMovies(moviesData, isShortFilm, key) {
    let foundMovies = []
    Array.from(moviesData).forEach((movie) => {
        if ((isShortFilm && movie.duration < 40) || !isShortFilm) {
          if (JSON.stringify(movie).includes(key)) {
            foundMovies.push(movie)
          } 
        }
      })
    return foundMovies
}
