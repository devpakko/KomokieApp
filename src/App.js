import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Movies from "./Movies";
import { useAuth } from "./contexts/AuthContext";
import Auth from "./Auth";

const App = () => {
  const { user } = useAuth();

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={user ? <Navigate to="/movies" /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={user ? <Navigate to="/movies" /> : <Auth />}
        />
        <Route
          path="/movies"
          element={user ? <Movies /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
};

export default App;
