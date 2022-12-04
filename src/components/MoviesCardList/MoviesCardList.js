import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import { useState } from "react";

function MoviesCardList({
  isSavedMovies,
  handleClick,
  savedMovies,
  foundMovies,
  isSearch,
  searchResult,
}) {
  let cards = [];
  let movies = [];

  if (isSearch) {
    movies = foundMovies;
  } else {
    movies = savedMovies;
  }

  cards = movies.map((movie) => {
    const isSaved = savedMovies.some((item) => movie.id === item.movieId )

    return (
      <MoviesCard
        movie={movie}
        key={movie._id || movie.id}
        buttonClass={isSavedMovies ? "card__delete" : "card__like"}
        handleClick={handleClick}
        isSaved={isSaved}
      />
    );
  });


  function handleResize() {
    width = window.innerWidth;
    setSizes()
  }

  window.addEventListener('resize', handleResize)

  function setSizes() {
    if (769 <= width) {
      start = 12
      increment = 4
    } else if (width >= 480) {
      start = 8
      increment = 3
    } else {
      start = 5
      increment = 2
    }
  }

  let width = window.innerWidth;
  let start = 5;
  let increment = 2;

  setSizes()


  const [index, setIndex] = useState(start)

  const [shownCards, setShownCards] = useState([...cards.slice(0,start)])


  function handleMoreClick() {
    if (shownCards.length === 0) {
      setShownCards([...cards.slice(0,start), cards.slice(index + increment, index + increment*2)])
    } else {
      setShownCards([...shownCards, cards.slice(index + increment, index + increment*2)])
    }
    setIndex(index + increment)
  }


  return (
    <section className="movies-section">
      {cards.length === 0 ? (
        <p className="movies-section__result">{searchResult}</p>
      ) : (
        <div className="movies-section__gallery">{index === start ? cards.slice(0,start) : shownCards}</div>
      )}
      {cards.length > 3 && cards.length > index + increment ? (
        <button
          className="movies-section__more-button"
          onClick={handleMoreClick}
        >
          Еще
        </button>
      ) : (
        <></>
      )}
    </section>
  );
}

export default MoviesCardList;
