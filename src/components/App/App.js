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
    isLogged: false,
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

  const [isLoading, setisLoading] = useState(false)

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
      setisLoading(true)
      mainAPI.getSavedMovies()
      .then((data) => {
        setSavedMovies(data);
        setisLoading(false)
      })
      .catch((err) => console.log(err));
    }

  }, [isLogged])

  function handleSignIn(data) {
    return (
      mainAPI
        .signIn(data)
        .then((res) => {
          setIsLogged(true);
          setCurrentUser({ data });
          localStorage.setItem("jwt", res.token);
        })
        .catch((err) => {
          setLoginResponse({ value: false, message: err });
        })
    );
  }

  function handleSignUp(data) {
    return mainAPI
      .signUp(data)
      .then((res) => {
        setRegisterResponse({ value: true, message: "Успешно!" });
      })
      .then(() => handleSignIn(data))
      .then(() => history.push("/movies"))
      .catch((err) => {
        setRegisterResponse({ value: false, message: err });
      });
  }

  function handleProfileEdit(name, email) {
    return mainAPI
      .saveUserInfo(name, email)
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => {
        setEditProfileResponse({ value: false, message: err });
      });
  }

  function handleLogout() {
    setIsLogged(false);
    localStorage.removeItem("jwt");
    localStorage.setItem("isLogged", false);
    history.push("/");
  }

  function handleDeleteClick(e, movie) {
    mainAPI.deleteMovie(movie._id).then(() => {
      setSavedMovies((savedMovies) =>
        savedMovies.filter((c) => c._id !== movie._id)
      );
    });
  }

  const [moviesData, setMoviesData] = useState([]);

  function handleLikeClick(e, movie, isSaved) {
    e.target.classList.toggle("card__like_active");
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
        setSavedMovies([addedMovie, ...savedMovies]);
      })
      .catch((err) => console.log(err));
    }
  }

  useEffect(() => {
    setisLoading(true)
    moviesAPI.getMovies().then((data) => {
      setMoviesData(data);
      setisLoading(false)
    })
    .catch((err) => console.log(err));
  }, []);

  function checkToken() {
    const jwt = localStorage.getItem("jwt");
    if (!jwt) {
      localStorage.setItem("isLogged", false);
      return;
    }
    mainAPI
      .getUserInfo(jwt)
      .then((data) => {
        setCurrentUser({ ...data, isLogged: true });
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
