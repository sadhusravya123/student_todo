import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState(() => {
    return JSON.parse(localStorage.getItem("tasks")) || [];
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (task.trim() === "") return;

    setTasks([...tasks, { text: task, completed: false }]);
    setTask("");
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const toggleTask = (index) => {
    setTasks(
      tasks.map((item, i) =>
        i === index
          ? { ...item, completed: !item.completed }
          : item
      )
    );
  };

  return (
    <div className="container">
      <h1>Student Daily Activity To-Do</h1>

      <div className="input-box">
        <input
          type="text"
          placeholder="Enter today's task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />

        <button onClick={addTask}>Add Task</button>
      </div>

      <ul>
        {tasks.map((item, index) => (
          <li key={index}>
            <span
              className={item.completed ? "completed" : ""}
              onClick={() => toggleTask(index)}
            >
              {item.text}
            </span>

            <button onClick={() => deleteTask(index)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;