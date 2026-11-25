import { useState, useEffect } from "react";
import { Star } from "lucide-react";

import ItemCard from "../components/ItemCard";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";

import {
  getItems,
  updateItem,
  deleteItem
} from "../services/api";

function Favorites() {

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [retry, setRetry] = useState(0);


  // GET - Fetch Favorite Items
  useEffect(() => {

    let active = true;

    getItems()
      .then((data) => {

        if (!active) return;

        const favoriteItems = data.filter(
          (item) => item.isFavorite && !item.isArchived
        );

        setItems(favoriteItems);
        setError("");

      })
      .catch((err) => {

        if (active) {
          setError(err.message);
        }

      })
      .finally(() => {

        if (active) {
          setLoading(false);
        }

      });

    return () => {
      active = false;
    };

  }, [retry]);


  // PATCH - Unfavorite Item
  async function handleFavorite(id) {

    try {

      await updateItem(id, {
        isFavorite: false
      });

      setItems((prev) =>
        prev.filter((item) => item.id !== id)
      );

    } catch (err) {

      alert(err.message);

    }
  }


  // PATCH - Archive Item
  async function handleArchive(id) {

    try {

      await updateItem(id, {
        isArchived: true
      });

      setItems((prev) =>
        prev.filter((item) => item.id !== id)
      );

    } catch (err) {

      alert(err.message);

    }
  }


  // DELETE - Delete Item
  async function handleDelete(id) {

    if (!window.confirm("Delete this item?")) {
      return;
    }

    try {

      await deleteItem(id);

      setItems((prev) =>
        prev.filter((item) => item.id !== id)
      );

    } catch (err) {

      alert(err.message);

    }
  }


  // Retry API
  function handleRetry() {

    setLoading(true);
    setError("");
    setRetry((prev) => prev + 1);

  }


  // Loading State
  if (loading) {
    return <Loader />;
  }


  // Error State
  if (error) {
    return (
      <ErrorMessage
        message={error}
        onRetry={handleRetry}
      />
    );
  }


  return (
    <main className="page">

      <div className="section-heading">

        <Star size={28} color="#facc15" />

        <h1>Favorite Items</h1>

      </div>

      <p className="section-description">
        Your favorite links and notes.
      </p>

      <div className="items-grid">

        {items.map((item) => (

          <ItemCard
            key={item.id}
            item={item}
            onFavorite={handleFavorite}
            onArchive={handleArchive}
            onDelete={handleDelete}
          />

        ))}

      </div>

      {items.length === 0 && (

        <div className="empty-state">

          <Star size={45} />

          <h3>No favorite items</h3>

          <p>
            Mark an item as favorite to see it here.
          </p>

        </div>

      )}

    </main>
  );
}

export default Favorites;