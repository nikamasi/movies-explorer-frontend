import "./MoviesCard.css";

function MoviesCard({ movie, ...props }) {
  let url = "";
  if (movie.image.url) {
    url = `https://api.nomoreparties.co${movie.image.url}`;
  } else {
    url = `${movie.image}`;
  }
  let duration = "";

  if (movie.duration <= 60) {
    duration = `${movie.duration}м"`;
  } else {
    duration = `${Math.floor(movie.duration / 60)}ч ${movie.duration % 60}м`;
  }

  function handleClick(e) {

    props.handleClick(e, movie, props.isSaved);
  }


  return (
    <li className="card">
      <a
        className="card__img-link"
        href={movie.trailerLink}
        target="_blank"
        rel="noreferrer"
      >
        <img
          src={url}
          className="card__img"
          alt={movie.image.altrenativeText}
        />
      </a>

      <div className="card__caption">
        <p className="card__text">{movie.nameRU}</p>
        <button
          className={`${props.buttonClass} ${props.isSaved ? " card__like_active": ""}`}
          onClick={handleClick}
          id={movie.id}
        />
      </div>
      <p className="card__time">{duration}</p>
    </li>
  );
}

export default MoviesCard;
