// Header.js
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase-config";
import { useAuth } from "../contexts/AuthContext";

const Header = ({ showLogout, toggleLogout, openNavOverlay }) => {
  const { user } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <header>
      <nav>
        <ul>
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
            {showLogout && (
              <button className="logout-button" onClick={handleLogout}>
                <i className="fa-solid fa-right-from-bracket"></i>
              </button>
            )}
            <i
              className="fa-solid fa-user-astronaut"
              onClick={toggleLogout}></i>
          </li>
        </ul>
      </nav>
      <button className="discover-btn" onClick={openNavOverlay}>
        Discover <i className="fa-solid fa-angle-down"></i>
      </button>
    </header>
  );
};

export default Header;
