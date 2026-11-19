
function Card({ task, onDelete, onToggle }) {
  return (
    <div className="card">
      <h3>{task.title}</h3>

      <p>Priority: {task.priority}</p>

      <p>
        Status: {task.completed ? "Completed" : "Pending"}
      </p>

      <button onClick={() => onToggle(task.id)}>
        {task.completed ? "Undo" : "Complete"}
      </button>

      <button onClick={() => onDelete(task.id)}>
        Delete
      </button>
    </div>
  );
}

export default Card;
