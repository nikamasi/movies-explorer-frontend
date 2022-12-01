import "./Portfolio.css";
import arrow from "../../images/arrow.svg";

function Portfolio(props) {
  return (
    <section className="portfolio">
      <h2 className="portfolio__header">Портфолио</h2>
      <ul className="portfolio__elements">
        <li>
          <a
            className="portfolio__link"
            href="https://github.com/nikamasi/how-to-learn"
            target="_blank"
            rel="noreferrer"
          >
            <p className="portfolio__project">Статичный сайт</p>
            <img className="portfolio__link-img" alt="arrow" src={arrow} />
          </a>
        </li>
        <li>
          <a
            className="portfolio__link"
            href="https://github.com/nikamasi/russian-travel"
            target="_blank"
            rel="noreferrer"
          >
            <p className="portfolio__project">Адаптивный сайт</p>
            <img className="portfolio__link-img" alt="arrow" src={arrow} />
          </a>
        </li>
        <li>
          <a
            className="portfolio__link"
            href="https://github.com/nikamasi/react-mesto-auth"
            target="_blank"
            rel="noreferrer"
          >
            <p className="portfolio__project">Одностраничное приложение</p>
            <img className="portfolio__link-img" alt="arrow" src={arrow} />
          </a>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;
