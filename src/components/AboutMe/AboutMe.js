import "./AboutMe.css";
import pic from "../../images/pic.jpg";
function AboutMe(props) {
  return (
    <section className="section about-me" id="about-me">
      <h2 className="section__header about-me__header">Студент</h2>
      <div className="about-me__content">
        <div className="about-me__text">
          <h3 className="about-me__title">Виталий</h3>
          <p className="about-me__caption">Фронтенд-разработчик, 30 лет</p>
          <p className="about-me__bio">
            Я родился и живу в Саратове, закончил факультет экономики СГУ. У
            меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь
            бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ
            Контур». После того, как прошёл курс по веб-разработке, начал
            заниматься фриланс-заказами и ушёл с постоянной работы.
          </p>
          <a
            href="https://github.com/nikamasi"
            target="_blank"
            rel="noreferrer"
            className="about-me__link"
          >
            Github
          </a>
        </div>
        <img className="about-me__pic" src={pic} alt="фотография портрет"/>
      </div>
    </section>
  );
}

export default AboutMe;
