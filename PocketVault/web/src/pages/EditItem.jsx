import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Save } from "lucide-react";

import { getItems, updateItem } from "../services/api";

import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";

function EditItem() {

  const navigate = useNavigate();
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [category, setCategory] = useState("Read Later");
  const [notes, setNotes] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [formError, setFormError] = useState("");

  // GET - Load Existing Item

  useEffect(() => {

    async function loadItem() {

      try {

        setLoading(true);
        setError("");

        const data = await getItems();

        const item = data.find(
          (item) => String(item.id) === id
        );

        if (!item) {
          throw new Error("Item not found");
        }

        setTitle(item.title);
        setUrl(item.url || "");
        setCategory(item.category);
        setNotes(item.notes || "");

      } catch (err) {

        setError(err.message);

      } finally {

        setLoading(false);

      }
    }

    loadItem();

  }, [id]);


  // PATCH - Update Existing Item

  async function handleSubmit(e) {

    e.preventDefault();

    setFormError("");

    if (!title.trim()) {
      setFormError("Title is required");
      return;
    }

    try {

      setSaving(true);

      const updatedItem = {
        title: title.trim(),
        url: url.trim(),
        category,
        notes: notes.trim()
      };

      await updateItem(id, updatedItem);

      navigate("/");

    } catch (err) {

      setFormError(err.message);

    } finally {

      setSaving(false);

    }
  }


  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }


  return (

    <main className="form-page">

      <h1>Edit Item</h1>

      <p className="form-description">
        Update your saved link, note or idea.
      </p>

      <form
        className="item-form"
        onSubmit={handleSubmit}
      >

        <div className="form-group">

          <label>Title *</label>

          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={255}
            required
          />

        </div>


        <div className="form-group">

          <label>URL (Optional)</label>

          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />

        </div>


        <div className="form-group">

          <label>Category *</label>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >

            <option value="Read Later">Read Later</option>

            <option value="Work">Work</option>

            <option value="Personal">Personal</option>

            <option value="Idea">Idea</option>

          </select>

        </div>


        <div className="form-group">

          <label>Notes</label>

          <textarea
            rows={5}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />

        </div>


        {formError && (
          <p className="form-error">{formError}</p>
        )}


        <div className="form-actions">

          <button
            type="button"
            className="cancel-btn"
            onClick={() => navigate("/")}
            disabled={saving}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="save-btn"
            disabled={saving}
          >

            <Save size={18} />

            {saving ? "Updating..." : "Update Item"}

          </button>

        </div>

      </form>

    </main>

  );
}

export default EditItem;