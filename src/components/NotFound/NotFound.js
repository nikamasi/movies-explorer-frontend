import "./NotFound.css";
import { useHistory } from "react-router-dom";

function NotFound() {

  const history = useHistory()
  

  return (
    <div className="not-found">
      <h1 className="not-found__header">404</h1>
      <h2 className="not-found__subhead">Страница не найдена</h2>
      <button className="not-found__back" onClick={history.goBack}>Назад</button>
    </div>
  );
}

export default NotFound;
