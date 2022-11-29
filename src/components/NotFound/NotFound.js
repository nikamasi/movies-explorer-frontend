import "./NotFound.css";
import { useNavigate } from "react-router-dom";

function NotFound(props) {
  const navigate = useNavigate();
  return (
    <div className="not-found">
      <h1 className="not-found__header">404</h1>
      <h2 className="not-found__subhead">Страница не найдена</h2>
      <button onClick={() => navigate(-1)} className="not-found__back">
        Назад
      </button>
    </div>
  );
}

export default NotFound;
