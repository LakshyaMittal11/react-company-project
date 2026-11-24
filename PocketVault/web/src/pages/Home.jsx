import { useState } from "react";

import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";
import ItemCard from "../components/ItemCard";

function Home() {

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const [items, setItems] = useState([
    {
      id: 1,
      title: "Learn React Native",
      url: "https://reactnative.dev",
      category: "Read Later",
      notes: "Learn mobile development",
      isFavorite: true,
      isArchived: false
    },
    {
      id: 2,
      title: "Project Ideas",
      url: "",
      category: "Idea",
      notes: "Create a personal portfolio",
      isFavorite: false,
      isArchived: false
    },
    {
      id: 3,
      title: "Express API",
      url: "https://expressjs.com",
      category: "Work",
      notes: "Learn REST API development",
      isFavorite: false,
      isArchived: false
    }
  ]);

  // Favorite
  function handleFavorite(id) {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, isFavorite: !item.isFavorite }
          : item
      )
    );
  }

  // Archive
  function handleArchive(id) {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, isArchived: !item.isArchived }
          : item
      )
    );
  }

  // Delete
  function handleDelete(id) {

    if (!window.confirm("Delete this item?")) return;

    setItems((prev) =>
      prev.filter((item) => item.id !== id)
    );
  }

  // Search and Category Filtering
  const filteredItems = items.filter((item) => {

    const searchText = search.toLowerCase();

    const matchesSearch =
      item.title.toLowerCase().includes(searchText) ||
      (item.notes || "").toLowerCase().includes(searchText) ||
      (item.url || "").toLowerCase().includes(searchText);

    const matchesCategory =
      category === "All" || item.category === category;

    return (
      matchesSearch &&
      matchesCategory &&
      !item.isArchived
    );
  });

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
        <p className="empty-message">
          No items found.
        </p>
      )}

    </main>
  );
}

export default Home;