import { useState, useEffect } from "react";

import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";
import ItemCard from "../components/ItemCard";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";

import {
  getItems,
  updateItem,
  deleteItem
} from "../services/api";

function Home() {

  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [retry, setRetry] = useState(0);


  // GET - Fetch All Items
  useEffect(() => {

    let active = true;

    getItems()
      .then((data) => {

        if (!active) return;

        setItems(data);
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


  // PATCH - Favorite / Unfavorite
  async function handleFavorite(id) {

    const item = items.find(
      (item) => item.id === id
    );

    if (!item) return;

    try {

      const isFavorite = !item.isFavorite;

      await updateItem(id, {
        isFavorite
      });

      setItems((prev) =>
        prev.map((item) =>
          item.id === id
            ? { ...item, isFavorite }
            : item
        )
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
        prev.map((item) =>
          item.id === id
            ? { ...item, isArchived: true }
            : item
        )
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


  // Search and Category Filtering
  const filteredItems = items.filter((item) => {

    const searchText = search.toLowerCase();

    const matchesSearch =
      item.title.toLowerCase().includes(searchText) ||
      (item.notes || "").toLowerCase().includes(searchText) ||
      (item.url || "").toLowerCase().includes(searchText);

    const matchesCategory =
      category === "All" ||
      item.category === category;

    return (
      matchesSearch &&
      matchesCategory &&
      !item.isArchived
    );

  });


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

      <SearchBar
        search={search}
        setSearch={setSearch}
      />

      <CategoryFilter
        category={category}
        setCategory={setCategory}
      />

      <div className="items-grid">

        {filteredItems.map((item) => (

          <ItemCard
            key={item.id}
            item={item}
            onFavorite={handleFavorite}
            onArchive={handleArchive}
            onDelete={handleDelete}
          />

        ))}

      </div>

      {filteredItems.length === 0 && (

        <div className="empty-message">

          <h3>No items found</h3>

          <p>
            Try a different search or add a new item.
          </p>

        </div>

      )}

    </main>
  );
}

export default Home;