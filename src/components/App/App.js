import "./App.css";
import { useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
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

  useEffect(() => {
    document.body.classList.add("root");
  }, []);

  return (
    <>
      <Header />
      <Routes>
        <Route exact path="/" element={<Main />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/saved-movies" element={<SavedMovies />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" replace />}></Route>
        <Route path="/signin" element={<Login />} />
        <Route path="/signup" element={<Register />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
