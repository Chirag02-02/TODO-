import React from "react";
import "./TodoItem.css";

// Renders a single todo with checkbox, title, due date badge, and edit/delete actions
function TodoItem({ todo, onToggle, onEdit, onDelete }) {
  return (
    <li className={`todo-item${todo.completed ? " done-item" : ""}`}>
      <div
        className={`check-wrap${todo.completed ? " checked" : ""}`}
        onClick={() => onToggle(todo)}
      >
        {todo.completed && <span className="check-icon">✓</span>}
      </div>

      <span className={`todo-text${todo.completed ? " striked" : ""}`}>
        {todo.title}
      </span>

      {todo.dueDate && <span className="due-tag">📅 {todo.dueDate}</span>}

      <div className="item-actions">
        <button
          className="icon-btn"
          onClick={() => onEdit(todo)}
          title="Edit"
        >
          ✏️
        </button>
        <button
          className="icon-btn del-btn"
          onClick={() => onDelete(todo.id)}
          disabled={!todo.completed}
          title={todo.completed ? "Delete" : "Complete first to delete"}
        >
          🗑️
        </button>
      </div>
    </li>
  );
}

export default TodoItem;
