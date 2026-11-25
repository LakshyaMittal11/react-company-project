import { useState, useEffect, useCallback } from "react";
import { Archive } from "lucide-react";

import ItemCard from "../components/ItemCard";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";

import {
  getItems,
  updateItem,
  deleteItem
} from "../services/api";

function Archived() {

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // GET - Fetch Archived Items
  const fetchItems = useCallback(async () => {

    try {

      setLoading(true);
      setError("");

      const data = await getItems();

      const archivedItems = data.filter(
        (item) => item.isArchived
      );

      setItems(archivedItems);

    } catch (err) {

      setError(err.message);

    } finally {

      setLoading(false);

    }

  }, []);

  useEffect(() => {

    async function loadItems() {
      await fetchItems();
    }

    loadItems();

  }, [fetchItems]);


  // PATCH - Favorite / Unfavorite
  async function handleFavorite(id) {

    const item = items.find(
      (item) => item.id === id
    );

    if (!item) return;

    try {

      await updateItem(id, {
        isFavorite: !item.isFavorite
      });

      await fetchItems();

    } catch (err) {

      alert(err.message);

    }
  }


  // PATCH - Restore Item
  async function handleArchive(id) {

    try {

      await updateItem(id, {
        isArchived: false
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

    if (!window.confirm("Delete this item permanently?")) {
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


  // Loading State
  if (loading) {
    return <Loader />;
  }


  // Error State
  if (error) {
    return (
      <ErrorMessage
        message={error}
        onRetry={fetchItems}
      />
    );
  }


  return (
    <main className="page">

      <div className="section-heading">

        <Archive size={28} color="#8174ff" />

        <h1>Archived Items</h1>

      </div>

      <p className="section-description">
        View and restore your archived items.
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

          <Archive size={45} />

          <h3>No archived items</h3>

          <p>
            Your archived links and notes will appear here.
          </p>

        </div>

      )}

    </main>
  );
}

export default Archived;