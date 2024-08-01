import "./Movies.css";
import { auth } from "./utils/firebase-config";
import { signOut } from "firebase/auth";
import { useAuth } from "./contexts/AuthContext";
import { useState, useEffect } from "react";

const Movies = () => {
  const { user } = useAuth(); // Using custom AuthContext to get user information

  const [movies, setMovies] = useState([]);
  const [randomMovie, setRandomMovie] = useState({});
  const [error, setError] = useState(null);
  const [startIndex, setStartIndex] = useState(0); // State for starting index of first slider
  const [sliderIndex, setSliderIndex] = useState(0); // State for starting index of second slider
  const [showModal, setShowModal] = useState(false); // State for modal visibility
  const [selectedMovie, setSelectedMovie] = useState(null); // State for selected movie in modal
  const [showLogout, setShowLogout] = useState(false); // State for logout button visibility
  const [showNavOverlay, setShowNavOverlay] = useState(false); // State for nav overlay visibility

  // Logout function
  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  // Function to randomly select a movie from the fetched list
  const randomMovieGenerator = () => {
    if (movies.length > 0) {
      setRandomMovie(movies[Math.floor(Math.random() * movies.length)]);
    }
  };

  // Fetching movies from API
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

  // Effect to fetch movies when user is authenticated
  useEffect(() => {
    if (user) {
      fetchMovies();
    }
  }, [user]);

  // Effect to generate a random movie when movies list changes
  useEffect(() => {
    randomMovieGenerator();
  }, [movies]);

  // Handlers for slider navigation
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

  // Modal functions
  const openModal = (movie) => {
    setSelectedMovie(movie);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedMovie(null);
  };

  // Toggle logout button visibility
  const toggleLogout = () => {
    setShowLogout((prevShowLogout) => !prevShowLogout);
  };

  // Toggle nav overlay visibility
  const openNavOverlay = () => {
    setShowNavOverlay(true);
  };

  const closeNavOverlay = () => {
    setShowNavOverlay(false);
  };

  return (
    <div className="movies">
      {/* Header section */}
      <header>
        <nav>
          <ul>
            {/* Logo and navigation links */}
            <li>
              <a href="/">
                <img
                  className="logo"
                  src="https://cdn.jsdelivr.net/gh/Th3Wall/assets-cdn/Fakeflix/Fakeflix_logo.png"
                  alt="Fakeflix logo"
                />
              </a>
            </li>
            <li>
              <a href="/">
                <i className="fa-solid fa-house-chimney"></i>
              </a>
            </li>
            <li>
              <a href="#">TV Series</a>
            </li>
            <li>
              <a href="Movies">Movies</a>
            </li>
            <li>
              <a href="#">My List</a>
            </li>
            <li>
              <div className="search-container">
                <label htmlFor="search-input">
                  <input
                    id="search-input"
                    type="text"
                    className="search-input"
                    placeholder="Search..."
                  />
                  <i className="fa-solid fa-magnifying-glass"></i>
                </label>
              </div>
            </li>
            <li>
              {/* Conditional logout button */}
              {showLogout && (
                <button className="logout-button" onClick={handleLogout}>
                  <i className="fa-solid fa-right-from-bracket"></i>
                </button>
              )}
              {/* User profile icon */}
              <i
                className="fa-solid fa-user-astronaut"
                onClick={toggleLogout}></i>
            </li>
          </ul>
        </nav>
        {/* Smaller screen navigation button */}
        <button className="discover-btn" onClick={openNavOverlay}>
          Discover <i class="fa-solid fa-angle-down"></i>
        </button>
      </header>

      {/* Smaller screen navigation */}
      {showNavOverlay && (
        <div className="nav-overlay" onClick={closeNavOverlay}>
          <div
            className="nav-overlay-content"
            onClick={(e) => e.stopPropagation()}>
            <span className="close-overlay" onClick={closeNavOverlay}>
              &times;
            </span>
            <a href="/">Home</a>
            <a href="#">TV Series</a>
            <a href="Movies">Movies</a>
            <a href="#">My List</a>
            <div className="search-container">
              <label htmlFor="search-input-overlay">
                <input
                  id="search-input-overlay"
                  type="text"
                  className="search-input"
                  placeholder="Search..."
                />
                <i className="fa-solid fa-magnifying-glass"></i>
              </label>
            </div>
          </div>
        </div>
      )}
      {/* Random movie section */}
      <div className="trending">
        <div className="img-container">
          <img
            src={`https://image.tmdb.org/t/p/original${randomMovie.backdrop_path}`}
            alt={randomMovie.title}
          />
        </div>
        <div className="details">
          <h2 className="title">{randomMovie.title}</h2>
          <input id="play" type="button" value="Play" />
          <input
            id="info"
            type="button"
            value="More Info"
            onClick={() => openModal(randomMovie)}
          />
          <p className="overview">{randomMovie.overview}</p>
        </div>
      </div>
      {/* Main content */}
      <div className="main">
        <h2 className="category">Backdrop Movies</h2>
        {/* Slider 1 */}
        <div className="slider">
          <button className="slider-btn prev" onClick={handlePrev}>
            &lt;
          </button>
          <div className="slider-container">
            {movies.length > 0 && (
              <div className="slider-content">
                {movies.slice(startIndex, startIndex + 7).map((movie) => (
                  <div className="movie" key={movie.id}>
                    <img
                      src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                      alt={movie.title}
                    />
                    <div className="poster-details">
                      <button onClick={() => openModal(movie)}>
                        <i className="fa-solid fa-circle-info"></i>
                      </button>
                      <h3>{movie.title}</h3>
                      <p className="poster-categories">Categories go here</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <button className="slider-btn next" onClick={handleNext}>
            &gt;
          </button>
        </div>

        <h2 className="category">Poster Movies</h2>
        {/* Slider 2 */}
        <div className="slider">
          <button className="slider-btn prev" onClick={handleSlider2Prev}>
            &lt;
          </button>
          <div className="slider-container">
            {movies.length > 0 && (
              <div className="slider-content">
                {movies.slice(sliderIndex, sliderIndex + 7).map((movie) => (
                  <div className="movie" key={movie.id}>
                    <img
                      src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                      alt={movie.title}
                    />
                    <div className="poster-details">
                      <button onClick={() => openModal(movie)}>
                        <i className="fa-solid fa-circle-info"></i>
                      </button>
                      <h3>{movie.title}</h3>
                      <p className="poster-categories">Categories go here</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <button className="slider-btn next" onClick={handleSlider2Next}>
            &gt;
          </button>
        </div>
      </div>
      {/* Movie details modal */}
      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={closeModal}>
              &times;
            </button>
            <img
              src={`https://image.tmdb.org/t/p/original${selectedMovie.backdrop_path}`}
              alt={selectedMovie.title}
            />
            <h2>{selectedMovie.title}</h2>
            <p className="more-info">{selectedMovie.overview}</p>
            <p className="more-info">
              <span>Release Date:</span> {selectedMovie.release_date}
            </p>
            <p className="more-info">
              <span>Rating:</span> {selectedMovie.vote_average}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Movies;
