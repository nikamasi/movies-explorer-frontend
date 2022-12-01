import "./MoviesCard.css";

function MoviesCard(props) {
  const card = props.card;

  return (
    <li className="card">
      <img src={card.img} className="card__img" alt="фото" />
      <div className="card__caption">
        <p className="card__text">{card.title}</p>
        <button className={props.buttonClass} onClick={props.handleClick} />
      </div>
      <p className="card__time">{card.time}</p>
    </li>
  );
}

export default MoviesCard;
