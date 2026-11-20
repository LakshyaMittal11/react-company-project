import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";

function Detail() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // API call
  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await fetch(
          `https://fakestoreapi.com/products/${id}`
        );

        if (!response.ok) {
          throw new Error("Product not found");
        }

        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [id]);

  // Loading state
  if (loading) {
    return <Loader />;
  }

  // Error state
  if (error) {
    return (
      <ErrorMessage
        message={error}
        onRetry={() => window.location.reload()}
      />
    );
  }

  return (
    <div className="container">
      <div className="detail-card">
        <img src={product.image} alt={product.title} />

        <div className="detail-info">
          <h1>{product.title}</h1>

          <p className="price">${product.price}</p>

          <p>
            <strong>Category:</strong> {product.category}
          </p>

          <p>
            <strong>Description:</strong> {product.description}
          </p>

          <p>
            <strong>Rating:</strong> {product.rating?.rate} / 5
          </p>

          <p>
            <strong>Reviews:</strong> {product.rating?.count}
          </p>

          <Link to="/products">
            <button>Back to Products</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Detail;