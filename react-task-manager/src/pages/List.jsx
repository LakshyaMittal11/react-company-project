import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";

function List() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchError, setSearchError] = useState("");

  // API call
  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch(
          "https://fakestoreapi.com/products"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  // Retry function
  async function handleRetry() {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        "https://fakestoreapi.com/products"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      const data = await response.json();
      setProducts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  // Search form
  function handleSearch(e) {
    e.preventDefault();

    if (search.trim() === "") {
      setSearchError("Please enter a product name.");
      return;
    }

    setSearchError("");
  }

  // Filter products
  const filteredProducts = products.filter((product) =>
    product.title
      .toLowerCase()
      .includes(search.trim().toLowerCase())
  );

  // Loading state
  if (loading) {
    return <Loader />;
  }

  // Error state
  if (error) {
    return (
      <ErrorMessage
        message={error}
        onRetry={handleRetry}
      />
    );
  }

  return (
    <div className="container">
      <h1>Product List</h1>

      {/* Search Form */}
      <form className="search-form" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setSearchError("");
          }}
        />

        <button type="submit">Search</button>
      </form>

      {searchError && (
        <p className="search-error">{searchError}</p>
      )}

      <p>Total Products: {filteredProducts.length}</p>

      {/* Product Cards */}
      <div className="products-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div className="product-card" key={product.id}>
              <img
                src={product.image}
                alt={product.title}
              />

              <h3>{product.title}</h3>

              <p className="price">${product.price}</p>

              <Link to={`/products/${product.id}`}>
                View Details
              </Link>
            </div>
          ))
        ) : (
          <h2>No products found.</h2>
        )}
      </div>
    </div>
  );
}

export default List;