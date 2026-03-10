import React from "react";
import "./TodoForm.css";

// Renders the task input field, add/update button, date picker, and search controls
function TodoForm({
  task,
  dueDate,
  editId,
  onTaskChange,
  onDateChange,
  onAddTask,
  onCancelEdit,
  onSearch,
  onKeyDown,
}) {
  return (
    <div className="input-section">
      <div className="input-row">
        <input
          className="task-input"
          value={task}
          onChange={(e) => onTaskChange(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder={
            editId !== null ? "Edit task title…" : "What needs to be done?"
          }
        />
        <button
          className={`add-btn${editId !== null ? " updating" : ""}`}
          onClick={onAddTask}
        >
          {editId !== null ? "Update" : "Add"}
        </button>
        {editId !== null && (
          <button className="cancel-btn" onClick={onCancelEdit}>
            ✕
          </button>
        )}
      </div>

      <div className="date-row">
        <input
          type="date"
          className="date-input"
          value={dueDate}
          onChange={(e) => onDateChange(e.target.value)}
        />
        <button className="search-btn" onClick={onSearch}>
          🔍 Search
        </button>
      </div>
    </div>
  );
}

export default TodoForm;
