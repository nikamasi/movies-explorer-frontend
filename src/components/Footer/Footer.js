import "./Footer.css";
import { Routes, Route } from "react-router-dom";

function Footer() {
  const year = new Date().getFullYear();
  return (
    <Routes>
      <Route path="/404" element={<></>} />
      <Route path="/signin" element={<></>} />
      <Route path="/profile" element={<></>} />
      <Route path="/signup" element={<></>} />

      <Route
        path="*"
        element={
          <footer className="footer">
            <p className="footer__copyright">
              Учебный проект Яндекс.Практикум х BeatFilm.
            </p>
            <div className="footer__info">
              <p className="footer__year">© {year}</p>
              <ul className="footer__links">
                <a
                  className="footer__link link"
                  href="https://practicum.yandex.ru"
                  target="_blank"
                  rel="noreferrer"
                >
                  Яндекс.Практикум
                </a>
                <a
                  className="footer__link link"
                  href="https://github.com/nikamasi"
                  target="_blank"
                  rel="noreferrer"
                >
                  Github
                </a>
              </ul>
            </div>
          </footer>
        }
      ></Route>
    </Routes>
  );
}

export default Footer;
