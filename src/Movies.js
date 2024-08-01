import "./Movies.css";
import { useAuth } from "./contexts/AuthContext";
import { useState, useEffect } from "react";
import Header from "./components/Header";
import NavOverlay from "./components/NavOverlay";
import RandomMovie from "./components/RandomMovie";
import PosterSlider from "./components/PosterSlider";
import BackdropSlider from "./components/BackdropSlider";
import Modal from "./components/Modal";

const Movies = () => {
  const { user } = useAuth();

  const [movies, setMovies] = useState([]);
  const [randomMovie, setRandomMovie] = useState({});
  const [error, setError] = useState(null);
  const [startIndex, setStartIndex] = useState(0);
  const [sliderIndex, setSliderIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showLogout, setShowLogout] = useState(false);
  const [showNavOverlay, setShowNavOverlay] = useState(false);

  const randomMovieGenerator = () => {
    if (movies.length > 0) {
      setRandomMovie(movies[Math.floor(Math.random() * movies.length)]);
    }
  };

  const fetchMovies = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: "Bearer " + process.env.REACT_APP_API_BEARER,
      },
    };

    try {
      const response = await fetch(
        "https://api.themoviedb.org/3/movie/popular",
        options
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setMovies(data.results);
      console.log(data.results);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    if (user) {
      fetchMovies();
    }
  }, [user]);

  useEffect(() => {
    randomMovieGenerator();
  }, [movies]);

  const handleNext = () => {
    setStartIndex(
      (prevIndex) => (prevIndex + 1) % Math.max(1, movies.length - 6)
    );
  };

  const handlePrev = () => {
    setStartIndex(
      (prevIndex) =>
        (prevIndex - 1 + Math.max(1, movies.length - 6)) %
        Math.max(1, movies.length - 6)
    );
  };

  const handleSlider2Next = () => {
    setSliderIndex(
      (prevIndex) => (prevIndex + 1) % Math.max(1, movies.length - 6)
    );
  };

  const handleSlider2Prev = () => {
    setSliderIndex(
      (prevIndex) =>
        (prevIndex - 1 + Math.max(1, movies.length - 6)) %
        Math.max(1, movies.length - 6)
    );
  };

  const openModal = (movie) => {
    setSelectedMovie(movie);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedMovie(null);
  };

  const toggleLogout = () => {
    setShowLogout((prevShowLogout) => !prevShowLogout);
  };

  const openNavOverlay = () => {
    setShowNavOverlay(true);
  };

  const closeNavOverlay = () => {
    setShowNavOverlay(false);
  };

  return (
    <div className="movies">
      <Header
        showLogout={showLogout}
        toggleLogout={toggleLogout}
        openNavOverlay={openNavOverlay}
      />
      <NavOverlay
        showNavOverlay={showNavOverlay}
        closeNavOverlay={closeNavOverlay}
      />
      <RandomMovie movie={randomMovie} openModal={openModal} />
      <div className="main">
        <BackdropSlider
          title="Poster Movies"
          movies={movies}
          startIndex={sliderIndex}
          handlePrev={handleSlider2Prev}
          handleNext={handleSlider2Next}
          openModal={openModal}
        />
        <PosterSlider
          title="Backdrop Movies"
          movies={movies}
          startIndex={startIndex}
          handlePrev={handlePrev}
          handleNext={handleNext}
          openModal={openModal}
        />
      </div>
      <Modal
        showModal={showModal}
        closeModal={closeModal}
        movie={selectedMovie}
      />
    </div>
  );
};

export default Movies;
