import { Search } from "lucide-react";

function SearchBar({ search, setSearch }) {
  return (
    <div className="search-bar">

      <Search size={20} />

      <input
        type="text"
        placeholder="Search your items..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

    </div>
  );
}

export default SearchBar;