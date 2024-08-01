// RandomMovie.js

const RandomMovie = ({ movie, openModal }) => {
  return (
    <div className="trending">
      <div className="img-container">
        <img
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt={movie.title}
        />
      </div>
      <div className="details">
        <h2 className="title">{movie.title}</h2>
        <input id="play" type="button" value="Play" />
        <input
          id="info"
          type="button"
          value="More Info"
          onClick={() => openModal(movie)}
        />
        <p className="overview">{movie.overview}</p>
      </div>
    </div>
  );
};

export default RandomMovie;
