import "./App.css";
import { useEffect, useState } from "react";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { mainAPI } from "../../utils/MainAPI";
import { moviesAPI } from "../../utils/MoviesAPI";
import ProtectedRoute from "../../utils/ProtectedRoute";
import Header from "../Header/Header.js";
import Footer from "../Footer/Footer.js";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Main from "../Main/Main";
import Movies from "../Movies/Movies.js";
import SavedMovies from "../SavedMovies/SavedMovies.js";
import NotFound from "../NotFound/NotFound.js";
import Profile from "../Profile/Profile.js";
import "./App.css";

function App() {
  const [currentUser, setCurrentUser] = useState({
    name: "",
    email: "",
  });
  const [registerResponse, setRegisterResponse] = useState({
    value: false,
    message: "",
  });
  const [loginResponse, setLoginResponse] = useState({
    value: false,
    message: "",
  });
  const [editProfileResponse, setEditProfileResponse] = useState({
    value: false,
    message: "",
  });

  const [savedMovies, setSavedMovies] = useState([]);

  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    document.body.classList.add("root");
  }, []);

  const [isLogged, setIsLogged] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (isLogged) {
      mainAPI
        .getUserInfo()
        .then((data) => {
          setCurrentUser(data);
        })
        .catch((err) => console.log(err));
    }
  }, [isLogged]);

  useEffect(() => {
    if (isLogged) {
      setisLoading(true);
      mainAPI
        .getSavedMovies()
        .then((data) => {
          localStorage.setItem("savedMovies", JSON.stringify(data));
          setSavedMovies(data);
          setisLoading(false);
        })
        .catch((err) => console.log(err));
    }
  }, [isLogged]);

  function handleSignIn(data) {
    return mainAPI
      .signIn(data)
      .then((res) => {
        setIsLogged(true);
        setCurrentUser({ data });
        localStorage.setItem("jwt", res.token);
      })
      .catch((err) => {
        setLoginResponse({ value: false, message: err.errorMessage });
      });
  }

  function handleSignUp(data) {
    return mainAPI
      .signUp(data)
      .then(() => {
        setRegisterResponse({ value: true, message: "Успешно!" });
      })
      .then(() => handleSignIn(data))
      .then(() => history.push("/movies"))
      .catch((err) => {
        setRegisterResponse({ value: false, message: err.errorMessage });
      });
  }

  function handleProfileEdit(name, email) {
    return mainAPI
      .saveUserInfo(name, email)
      .then((res) => {
        setCurrentUser(res);
        setEditProfileResponse({ value: true, message: "Данные изменены." });
      })
      .catch((err) => {
        setEditProfileResponse({ value: false, message: err.errorMessage });
      });
  }

  function handleLogout() {
    setIsLogged(false);
    localStorage.clear();
    history.push("/");
  }

  function handleDeleteClick(e, movie, _) {
    const id =
      movie._id || savedMovies.find((item) => item.movieId === movie.id)._id;
    mainAPI
      .deleteMovie(id)
      .then(() => {
        e.target.classList.toggle("card__like_active");
        setSavedMovies((savedMovies) =>
          savedMovies.filter((c) => c._id !== id)
        );
      })
      .then();
  }

  const [moviesData, setMoviesData] = useState([]);

  function handleLikeClick(e, movie, isSaved) {
    if (!isSaved) {
      mainAPI
        .saveMovie({
          ...movie,
          image: `https://api.nomoreparties.co${movie.image.url}`,
          trailer: movie.trailerLink,
          thumbnail: `https://api.nomoreparties.co${movie.image.formats.thumbnail.hash}`,
          movieId: movie.id,
        })
        .then((addedMovie) => {
          e.target.classList.toggle("card__like_active");
          setSavedMovies([addedMovie, ...savedMovies]);
        })
        .catch((res) => {
          if (res.status === 401) {
            handleLogout();
          }
        });
    } else {
      handleDeleteClick(e, movie);
    }
  }

  function getAPIMovies() {
    setisLoading(true);
    return moviesAPI
      .getMovies()
      .then((data) => {
        setMoviesData(data);
        localStorage.setItem("moviesData", JSON.stringify(data));
        setisLoading(false);
        return data;
      })
      .catch((err) => console.log(err));
  }

  function checkToken() {
    const jwt = localStorage.getItem("jwt");
    if (!jwt) {
      localStorage.setItem("isLogged", false);
      return;
    }
    mainAPI
      .getUserInfo(jwt)
      .then((data) => {
        setCurrentUser(data);
        setIsLogged(true);
        localStorage.setItem("isLogged", true);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    checkToken();
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header isLogged={isLogged} />
      <Switch>
        <Route exact path="/" component={Main}></Route>

        <Route exact path="/signin">
          {isLogged ? (
            <Redirect to="/movies" />
          ) : (
            <Login onSubmit={handleSignIn} loginResponse={loginResponse} />
          )}
        </Route>

        <Route exact path="/signup">
          {isLogged ? (
            <Redirect to="/" />
          ) : (
            <Register
              onSubmit={handleSignUp}
              registerResponse={registerResponse}
            />
          )}
        </Route>

        <ProtectedRoute
          exact
          path="/movies"
          isLogged={isLogged}
          component={Movies}
          moviesData={moviesData}
          handleLikeClick={handleLikeClick}
          isLoading={isLoading}
          savedMovies={savedMovies}
          getAPIMovies={getAPIMovies}
        ></ProtectedRoute>

        <ProtectedRoute
          exact
          path="/saved-movies"
          isLogged={isLogged}
          component={SavedMovies}
          savedMovies={savedMovies}
          handleDeleteClick={handleDeleteClick}
          isLoading={isLoading}
        ></ProtectedRoute>

        <ProtectedRoute
          exact
          path="/profile"
          isLogged={isLogged}
          onProfileSave={handleProfileEdit}
          component={Profile}
          onLogout={handleLogout}
          editProfileResponse={editProfileResponse}
          setEditProfileResponse={setEditProfileResponse}
        />

        <Route path="/404" component={NotFound} />
        <Route path="*">
          <Redirect to="/404" />
        </Route>
      </Switch>
      <Footer />
    </CurrentUserContext.Provider>
  );
}

export default App;
