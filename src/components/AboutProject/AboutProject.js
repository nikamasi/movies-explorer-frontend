import React from "react";
import "./AboutProject.css";

function AboutProject(props) {
  return (
    <section className="section about-project" id="about-project">
      <h2 className="section__header about-project__header">О проекте</h2>
      <div className="about-project__main">
        <div className="about-project__element">
          <h3 className="about-project__title">
            Дипломный проект включал 5 этапов
          </h3>
          <p className="about-project__paragraph">
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </div>
        <div className="about-project__element">
          <h3 className="about-project__title">
            На выполнение диплома ушло 5 недель
          </h3>
          <p className="about-project__paragraph">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </div>
      </div>
      <div className="about-project__bar">
        <p className="about-project__bar-element">1 неделя</p>
        <p className="about-project__bar-element">4 недели</p>
        <p className="about-project__bar-description">Back-end</p>
        <p className="about-project__bar-description">Front-end</p>
      </div>
    </section>
  );
}

export default AboutProject;
