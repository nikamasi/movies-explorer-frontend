import "./Profile.css";
import { useState } from "react";

function Profile(props) {
  const [isEdit, setEditState] = useState(false);
  const [name, setName] = useState("Виталий");
  const [email, setEmail] = useState("pochta@yandex.ru");
  const [errortext, setErrorText] = useState("");
  const [isError, setIsError] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setName(e.target.name.value);
    setEmail(e.target.email.value);
    setEditState(false);
  }

  function handleEditClick(e) {
    setEditState(true);
  }

  function handleError(e) {
    e.preventDefault();
    setErrorText("При обновлении профиля произошла ошибка.");
    setIsError(true);
  }

  return (
    <div className="profile">
      <h1 className="profile__heading">Привет, Виталий!</h1>
      <form className="profile__elements" onSubmit={handleSubmit}>
        <div className="profile__element">
          <label className="profile__text">Имя</label>
          <input
            type="text"
            id="name"
            name="name"
            className="profile__input profile__text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={!isEdit}
            minLength="2"
            required
            onInvalid={handleError}
          ></input>
        </div>
        <div className="profile__element">
          <label className="profile__text">E-mail</label>
          <input
            className="profile__input profile__text"
            value={email}
            id="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            disabled={!isEdit}
            type="email"
            required
            onInvalid={handleError}
          />
        </div>

        {isEdit ? (
          <div className="profile__buttons">
            <span className="profile__error ">{errortext}</span>
            <button
              className={`profile__button profile__button-save ${
                isError ? "profile__button-save_disabled" : ""
              } button`}
              type="submit"
              disabled={isError}
            >
              Сохранить
            </button>
          </div>
        ) : (
            <div className="profile__buttons">
              <button className="profile__button" onClick={handleEditClick}>
                Редактировать
              </button>
              <button className="profile__button profile__button_out">
                Выйти из аккаунта
              </button>
            </div>
        )}
      </form>
    </div>
  );
}

export default Profile;
