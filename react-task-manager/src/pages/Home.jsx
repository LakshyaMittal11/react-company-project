
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home-container">
      <div className="hero">

        <h1>Welcome to Product Explorer</h1>

        <p>
          Explore products, search your favorites,
          and view detailed product information.
        </p>

        {/* Real Image */}
        <img
          src="/images/banner.jpg"
          alt="Product Explorer Banner"
          className="hero-image"
        />

        <Link to="/products">
          <button>Explore Products</button>
        </Link>

      </div>
    </div>
  );
}

export default Home;
