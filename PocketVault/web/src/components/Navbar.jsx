import { NavLink } from "react-router-dom";
import { Wallet, Plus, Star, Archive } from "lucide-react";

function Navbar() {
  return (
    <header className="header">

      <div className="header-top">

        <NavLink to="/" className="logo">
          <Wallet size={30} />
          <span>PocketVault</span>
        </NavLink>

        <NavLink to="/add" className="add-btn">
          <Plus size={18} />
          Add Item
        </NavLink>

      </div>

      <p className="tagline">
        Save your links, notes and ideas in one place.
      </p>

      <nav className="nav-links">

        <NavLink to="/" end>
          All Items
        </NavLink>

        <NavLink to="/favorites">
          <Star size={18} />
          Favorites
        </NavLink>

        <NavLink to="/archived">
          <Archive size={18} />
          Archived
        </NavLink>

      </nav>

    </header>
  );
}

export default Navbar;