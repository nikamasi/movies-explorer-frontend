import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import { useEffect, useState } from "react";
import { useWindowWidth } from "../../hooks/useWindowWidth";
import {
  WINDOW_WIDTH_SMALL,
  WINDOW_WIDTH_MID,
  CARD_NUM_START_LARGE,
  CARD_NUM_START_MID,
  CARD_NUM_START_SMALL,
  CARD_NUM_ADD_LARGE,
  CARD_NUM_ADD_MID,
  CARD_NUM_ADD_SMALL,
} from "../../utils/constants";

function MoviesCardList({
  isSavedMovies,
  handleClick,
  savedMovies,
  foundMovies,
  isSearch,
  searchResult,
  setIsSearch,
  setSearchResult,
}) {
  const [cardNumberSettings, setCardsNumberSettings] = useState({
    start: 12,
    add: 4,
  });
  const [moviesNumber, setMoviesNumber] = useState(0);
  const [cardsNumber, setCardsNumber] = useState(0);
  const [shownCards, setShownCards] = useState([]);
  const width = useWindowWidth();

  function makeCards(movies) {
    setMoviesNumber(movies.length);
    return movies.map((movie) => {
      const isSaved = savedMovies.some((item) => movie.id === item.movieId);
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
  }

  function handleMoreClick() {
    setCardsNumber(cardsNumber + cardNumberSettings.add);
  }

  function setSizes(width) {
    if (WINDOW_WIDTH_MID <= width) {
      setCardsNumberSettings({ start: CARD_NUM_START_LARGE, add: CARD_NUM_ADD_LARGE });
    } else if (WINDOW_WIDTH_SMALL <= width) {
      setCardsNumberSettings({ start: CARD_NUM_START_MID, add: CARD_NUM_ADD_MID });
    } else {
      setCardsNumberSettings({ start: CARD_NUM_START_SMALL, add: CARD_NUM_ADD_SMALL });
    }
  }

  useEffect(() => {
    if (!isSavedMovies) {
      const movies = localStorage.getItem("filteredMovies");
      const searchMessage = localStorage.getItem("searchMessage");
      if (movies) {
        setShownCards(makeCards(JSON.parse(movies)));
      }
      setSearchResult(searchMessage);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isSavedMovies) {
      setShownCards(makeCards(savedMovies));
    } else {
      const movies = localStorage.getItem("filteredMovies");
      if (movies && movies.length !== 0) {
        setShownCards(makeCards(JSON.parse(movies)));
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [savedMovies]);
  

  useEffect(() => {
    if (foundMovies.length !== 0) {
      setShownCards(makeCards(foundMovies));
    } else if (isSearch) {
      setShownCards([]);
      setMoviesNumber(0);
      setIsSearch(false);
    }
    setCardsNumber(cardNumberSettings.start);
    // localStorage.setItem('foundMovies', )
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [foundMovies]);

  useEffect(() => {
    setCardsNumber(cardNumberSettings.start);
  }, [cardNumberSettings]);

  useEffect(() => {
    setSizes(width);
  }, [width]);

  return (
    <section className="movies-section">
      {shownCards.length === 0 ? (
        <p className="movies-section__result">{searchResult}</p>
      ) : (
        <div className="movies-section__gallery">
          {shownCards.slice(0, cardsNumber)}
        </div>
      )}
      {moviesNumber > cardsNumber ? (
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
