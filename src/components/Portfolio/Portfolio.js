import "./Portfolio.css";
import arrow from "../../images/arrow.svg";

function Portfolio(props) {
  return (
    <section className="portfolio">
      <h2 className="portfolio__header">Портфолио</h2>
      <ul className="portfolio__elements">
        <li className="portfolio__element">
          <p className="portfolio__project">Статичный сайт</p>
          <a
            className="portfolio__link"
            href="https://github.com/nikamasi/how-to-learn"
            target="_blank"
            rel="noreferrer"
          >
            <img className="portfolio__link-img" alt="arrow" src={arrow} />
          </a>
        </li>
        <li className="portfolio__element">
          <p className="portfolio__project">Адаптивный сайт</p>
          <a
            className="portfolio__link"
            href="https://github.com/nikamasi/russian-travel"
            target="_blank"
            rel="noreferrer"
          >
            <img className="portfolio__link-img" alt="arrow" src={arrow} />
          </a>
        </li>
        <li className="portfolio__element">
          <p className="portfolio__project">Одностраничное приложение</p>
          <a
            className="portfolio__link"
            href="https://github.com/nikamasi/react-mesto-auth"
            target="_blank"
            rel="noreferrer"
          >
            <img className="portfolio__link-img" alt="arrow" src={arrow} />
          </a>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;
