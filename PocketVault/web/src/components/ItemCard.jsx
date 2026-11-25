import{ useNavigate } from "react-router-dom";
import{ Pencil } from "lucide-react";
import {
  Link,
  FileText,
  Star,
  Archive,
  ArchiveRestore,
  Trash2,
  ExternalLink
} from "lucide-react";

function ItemCard({
  item,
  onFavorite,
  onArchive,
  onDelete
}) {
    const navigate = useNavigate();

  const safeUrl = /^https?:\/\//i.test(item.url || "")
    ? item.url
    : null;

  return (
    <div className="item-card">

      <div className="card-top">

        <span className="item-icon">
          {item.url ? (
            <Link size={20} />
          ) : (
            <FileText size={20} />
          )}
        </span>

        <button
          className={
            item.isFavorite
              ? "icon-btn favorite-active"
              : "icon-btn"
          }
          onClick={() => onFavorite(item.id)}
          title="Toggle Favorite"
        >
          <Star size={20} />
        </button>

      </div>

      <h3>{item.title}</h3>

      <span className="item-category">
        {item.category}
      </span>

      <p className="item-url">
        {item.url || ""}
      </p>

      <p className="item-notes">
        {item.notes}
      </p>

      <div className="card-actions">

        {safeUrl ? (
          <a
            href={safeUrl}
            target="_blank"
            rel="noopener noreferrer"
            title="Open Link"
          >
            <ExternalLink size={18} />
          </a>
        ) : (
          <span />
        )}

        <button
  className="icon-btn edit-btn"
  onClick={() => navigate(`/edit/${item.id}`)}
  title="Edit Item"
>
  <Pencil size={18} />
</button>

        <button
          className="icon-btn"
          onClick={() => onArchive(item.id)}
          title={item.isArchived ? "Restore" : "Archive"}
        >
          {item.isArchived ? (
            <ArchiveRestore size={18} />
          ) : (
            <Archive size={18} />
          )}
        </button>

        <button
          className="icon-btn delete-btn"
          onClick={() => onDelete(item.id)}
          title="Delete Item"
        >
          <Trash2 size={18} />
        </button>

      </div>

    </div>
  );
}

export default ItemCard;