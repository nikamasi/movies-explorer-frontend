import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList(props) {
  const cards = props.cards.map((card) => {
    return (
      <MoviesCard
        card={card}
        key={card.title}
        buttonClass={props.isSavedMovies ? "card__delete" : "card__like"}
        handleClick={props.handleClick}
      />
    );
  });

  return (
    <section className="movies-section">
      <div className="movies-section__gallery">{cards}</div>
      {cards.length >= 16 ? (
        <button className="movies-section__more-button">Еще</button>
      ) : (
        <></>
      )}
    </section>
  );
}

export default MoviesCardList;
