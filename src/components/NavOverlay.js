// NavOverlay.js

const NavOverlay = ({ showNavOverlay, closeNavOverlay }) => {
  if (!showNavOverlay) return null;

  return (
    <div className="nav-overlay" onClick={closeNavOverlay}>
      <div className="nav-overlay-content" onClick={(e) => e.stopPropagation()}>
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
  );
};

export default NavOverlay;
