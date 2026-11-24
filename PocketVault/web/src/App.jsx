import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import AddItem from "./pages/AddItem";
import Favorites from "./pages/Favorites";
import Archived from "./pages/Archived";

import "./App.css";

function App() {
  return (
    <BrowserRouter>

      <div className="app-container">

        <Navbar />

        <Routes>

          <Route path="/" element={<Home />} />

          <Route path="/add" element={<AddItem />} />

          <Route
            path="/favorites"
            element={<Favorites />}
          />

          <Route
            path="/archived"
            element={<Archived />}
          />

        </Routes>

      </div>

    </BrowserRouter>
  );
}

export default App;