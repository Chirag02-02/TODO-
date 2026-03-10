import React, { useState } from "react";
import { createTodo, updateTodo, deleteTodo, fetchTodosByDate } from "./api/todoApi";
import Header from "./components/Header/Header";
import TodoForm from "./components/TodoForm/TodoForm";
import TodoList from "./components/TodoList/TodoList";
import "./App.css";

// Root component that manages application state and orchestrates child components
function App() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(null);
  const [dueDate, setDueDate] = useState("");

  // Refreshes the todo list for the currently selected date
  const refreshTodos = (date) => {
    const targetDate = date !== undefined ? date : dueDate;
    if (!targetDate) {
      setTodos([]);
      return;
    }
    fetchTodosByDate(targetDate)
      .then((data) => setTodos(data))
      .catch((err) => console.error(err));
  };

  // Creates a new todo or updates an existing one, then refreshes the list
  const handleAddTask = () => {
    const trimmedTask = task.trim();
    if (!trimmedTask) return;

    if (editId !== null) {
      const todoToUpdate = todos.find((t) => t.id === editId);
      updateTodo(editId, {
        title: trimmedTask,
        completed: todoToUpdate.completed,
        dueDate: dueDate || todoToUpdate.dueDate,
      })
        .then(() => {
          setEditId(null);
          setTask("");
          refreshTodos();
        })
        .catch((err) => console.error(err));
    } else {
      createTodo(trimmedTask, dueDate)
        .then(() => {
          setTask("");
          refreshTodos();
        })
        .catch((err) => console.error(err));
    }
  };

  // Toggles a todo's completion status and refreshes the list
  const handleToggle = (todo) => {
    updateTodo(todo.id, {
      title: todo.title,
      completed: !todo.completed,
      dueDate: todo.dueDate,
    })
      .then(() => refreshTodos())
      .catch((err) => console.error(err));
  };

  // Deletes a completed todo after user confirmation
  const handleDelete = (id) => {
    if (!window.confirm("Delete this completed task?")) return;
    deleteTodo(id)
      .then(() => refreshTodos())
      .catch((err) => console.error(err));
  };

  // Populates the form with a todo's data for editing
  const handleEdit = (todo) => {
    setTask(todo.title);
    setDueDate(todo.dueDate || "");
    setEditId(todo.id);
  };

  // Clears the edit state and resets the form
  const handleCancelEdit = () => {
    setEditId(null);
    setTask("");
  };

  // Updates the selected date and fetches matching todos
  const handleDateChange = (selectedDate) => {
    setDueDate(selectedDate);
    refreshTodos(selectedDate);
  };

  // Handles keyboard shortcuts for adding and cancelling
  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleAddTask();
    if (e.key === "Escape") handleCancelEdit();
  };

  const pendingCount = todos.filter((t) => !t.completed).length;
  const doneCount = todos.filter((t) => t.completed).length;

  return (
    <div className="page">
      <div className="card">
        <Header
          pendingCount={pendingCount}
          doneCount={doneCount}
          showStats={todos.length > 0}
        />
        <TodoForm
          task={task}
          dueDate={dueDate}
          editId={editId}
          onTaskChange={setTask}
          onDateChange={handleDateChange}
          onAddTask={handleAddTask}
          onCancelEdit={handleCancelEdit}
          onSearch={() => refreshTodos()}
          onKeyDown={handleKeyDown}
        />
        <TodoList
          todos={todos}
          onToggle={handleToggle}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}

export default App;