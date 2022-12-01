import "./Techs.css";

function Tech(props) {
  return (
    <section className="section tech" id="tech">
      <h2 className="section__header tech__header">Технологии</h2>
      <h3 className="tech__title">7 технологий</h3>
      <p className="tech__text">
        На курсе веб-разработки мы освоили технологии, которые применили в
        дипломном проекте.
      </p>
      <ul className="tech__bar">
        <li className="tech__bar-element">HTML</li>
        <li className="tech__bar-element">CSS</li>
        <li className="tech__bar-element">JS</li>
        <li className="tech__bar-element">React</li>
        <li className="tech__bar-element">Git</li>
        <li className="tech__bar-element">Express.js</li>
        <li className="tech__bar-element">mongoDB</li>
      </ul>
    </section>
  );
}

export default Tech;
