
import { useState } from "react";

import Button from "./components/button";
import Card from "./components/card";
import Modal from "./components/Modal";
import "./App.css";

function App() {

  // State: Tasks store करना
  const [tasks, setTasks] = useState([]);

  // State: Input value
  const [taskTitle, setTaskTitle] = useState("");

  // State: Priority
  const [priority, setPriority] = useState("Medium");

  // State: Modal
  const [showModal, setShowModal] = useState(false);

  // Add Task
  function handleAdd() {
    if (taskTitle.trim() === "") {
      alert("Please enter a task");
      return;
    }

    const newTask = {
      id: Date.now(),
      title: taskTitle,
      priority: priority,
      completed: false
    };

    setTasks([...tasks, newTask]);

    setTaskTitle("");
    setPriority("Medium");
  }

  // Delete Task
  function handleDelete(id) {
    setTasks(tasks.filter(task => task.id !== id));
  }

  // Complete Task
  function handleToggle(id) {
    setTasks(
      tasks.map(task =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  }

  return (
    <div className="container">

      <h1>Personal Task Manager</h1>

      <div className="task-form">

        <input
          type="text"
          placeholder="Enter your task"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
        />

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>

        <Button onClick={handleAdd}>
          Add Task
        </Button>

      </div>

      <h2>Total Tasks: {tasks.length}</h2>

      <h2>
        Completed: {tasks.filter(task => task.completed).length}
      </h2>

      <div className="task-list">

        {tasks.map(task => (
          <Card
            key={task.id}
            task={task}
            onDelete={handleDelete}
            onToggle={handleToggle}
          />
        ))}

      </div>

      <Button onClick={() => setShowModal(true)}>
        About Task Manager
      </Button>

      {showModal && (
        <Modal
          message="Welcome to your Personal Task Manager!"
          onClose={() => setShowModal(false)}
        />
      )}

    </div>
  );
}

export default App;
