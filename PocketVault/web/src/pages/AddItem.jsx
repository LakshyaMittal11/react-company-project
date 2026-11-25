import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Save } from "lucide-react";

import { createItem } from "../services/api";

function AddItem() {

  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [category, setCategory] = useState("Read Later");
  const [notes, setNotes] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Form Submit
  async function handleSubmit(e) {

    e.preventDefault();

    setError("");

    // Validation
    if (!title.trim()) {
      setError("Title is required");
      return;
    }

    try {

      setLoading(true);

      const newItem = {
        title: title.trim(),
        url: url.trim(),
        category,
        notes: notes.trim()
      };

      // POST API Call
      await createItem(newItem);

      // Redirect to Home Page
      navigate("/");

    } catch (err) {

      setError(err.message);

    } finally {

      setLoading(false);

    }
  }

  return (
    <main className="form-page">

      <h1>Add New Item</h1>

      <p className="form-description">
        Save a new link, note or idea to your vault.
      </p>

      <form
        className="item-form"
        onSubmit={handleSubmit}
      >

        {/* Title */}

        <div className="form-group">

          <label>Title *</label>

          <input
            type="text"
            placeholder="Enter item title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={255}
            required
          />

        </div>

        {/* URL */}

        <div className="form-group">

          <label>URL (Optional)</label>

          <input
            type="url"
            placeholder="https://example.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />

        </div>

        {/* Category */}

        <div className="form-group">

          <label>Category *</label>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >

            <option value="Read Later">
              Read Later
            </option>

            <option value="Work">
              Work
            </option>

            <option value="Personal">
              Personal
            </option>

            <option value="Idea">
              Idea
            </option>

          </select>

        </div>

        {/* Notes */}

        <div className="form-group">

          <label>Notes</label>

          <textarea
            placeholder="Write your notes here..."
            rows={5}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />

        </div>

        {/* Error Message */}

        {error && (
          <p className="form-error">{error}</p>
        )}

        {/* Buttons */}

        <div className="form-actions">

          <button
            type="button"
            className="cancel-btn"
            onClick={() => navigate("/")}
            disabled={loading}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="save-btn"
            disabled={loading}
          >

            <Save size={18} />

            {loading ? "Saving..." : "Save Item"}

          </button>

        </div>

      </form>

    </main>
  );
}

export default AddItem;