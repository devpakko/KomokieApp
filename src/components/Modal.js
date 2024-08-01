// Modal.js

const Modal = ({ showModal, closeModal, movie }) => {
  if (!showModal) return null;

  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={closeModal}>
          &times;
        </button>
        <img
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt={movie.title}
        />
        <h2>{movie.title}</h2>
        <p className="more-info">{movie.overview}</p>
        <p className="more-info">
          <span>Release Date:</span> {movie.release_date}
        </p>
        <p className="more-info">
          <span>Rating:</span> {movie.vote_average}
        </p>
      </div>
    </div>
  );
};

export default Modal;
