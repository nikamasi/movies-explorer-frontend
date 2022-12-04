import "./Profile.css";
import { useState, useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";
import { useFormWithValidation } from "../../hooks/useFormWithValidation";

function Profile({
  onProfileSave,
  onLogout,
  editProfileResponse,
  setEditProfileResponse,
}) {
  const currentUser = useContext(CurrentUserContext);
  const [isEdit, setIsEdit] = useState(false);

  const { values, handleChange, errors, isValid, resetForm } =
    useFormWithValidation({ name: currentUser.name, email: currentUser.email });

  function handleSubmit(e) {
    e.preventDefault();
    onProfileSave(values.name, values.email)
    .catch((err) => console.log(err));
    resetForm();
    setIsEdit(false);
  }
  function handleElementChange(e) {
    setEditProfileResponse({ value: false, message: "" });
    handleChange(e);
  }

  function handleEditClick(e) {
    setIsEdit(true);
  }

  return (
    <div className="profile">
      <h1 className="profile__heading">Привет, {currentUser.name}!</h1>
      <form className="profile__elements" onSubmit={handleSubmit}>
        <div className="profile__element">
          <label className="profile__text">Имя</label>
          <input
            type="text"
            id="name"
            name="name"
            className="profile__input profile__text"
            value={isEdit ? values.name : currentUser.name}
            onChange={handleElementChange}
            disabled={!isEdit}
            minLength="2"
            required
          ></input>
        </div>
        <span className="profile__error">{errors.name}</span>
        <div className="profile__element">
          <label className="profile__text">E-mail</label>
          <input
            className="profile__input profile__text"
            value={isEdit ? values.email : currentUser.email}
            id="email"
            name="email"
            onChange={handleElementChange}
            disabled={!isEdit}
            type="email"
            required
          />
        </div>
        <span className="profile__error ">{errors.email}</span>

        <div className="profile__buttons">
        {isEdit ? (
          <>
            

            <button
              className={`profile__button profile__button-save ${
                !isValid ? "profile__button-save_disabled" : ""
              } button`}
              type="submit"
              disabled={!isValid}
            >
              Сохранить
            </button>
            </>
        ) : (
          <>
                      <span className="auth__result auth__result_error">
              {editProfileResponse.message}
            </span>
            <button className="profile__button" onClick={handleEditClick}>
              Редактировать
            </button>
            <button
              className="profile__button profile__button_out"
              onClick={onLogout}
            >
              Выйти из аккаунта
            </button>
            </>
        )}
        </div>
      </form>
    </div>
  );
}

export default Profile;
