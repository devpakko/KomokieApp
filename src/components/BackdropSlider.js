// Slider.js
const Slider = ({
  title,
  movies,
  startIndex,
  handlePrev,
  handleNext,
  openModal,
}) => {
  return (
    <div>
      <h2 className="category">{title}</h2>
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
    </div>
  );
};

export default Slider;
