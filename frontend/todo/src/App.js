import React, { useState } from "react";

const API_URL = "http://localhost:8080/todos";

function App() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(null);
  const [dueDate, setDueDate] = useState("");

  // ✅ Add or Update Task
  const addTask = () => {
    const trimmedTask = task.trim();
    if (!trimmedTask) return;

    if (editId !== null) {
      const todoToUpdate = todos.find(t => t.id === editId);
      fetch(`${API_URL}/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: trimmedTask,
          completed: todoToUpdate.completed,
          dueDate: dueDate || todoToUpdate.dueDate
        })
      })
        .then(res => res.json())
        .then(() => {
          setEditId(null);
          setTask("");
          searchByDate();
        })
        .catch(err => console.error(err));
    } else {
      fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: trimmedTask,
          completed: false,
          dueDate: dueDate || null
        })
      })
        .then(res => res.json())
        .then(() => {
          setTask("");
          searchByDate();
        })
        .catch(err => console.error(err));
    }
  };

  // ✅ Toggle Complete
  const toggleTask = (todo) => {
    fetch(`${API_URL}/${todo.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: todo.title,
        completed: !todo.completed,
        dueDate: todo.dueDate
      })
    })
      .then(res => res.json())
      .then(searchByDate)
      .catch(err => console.error(err));
  };

  // ✅ Search By Date (MAIN LOGIC)
  const searchByDate = () => {
    if (!dueDate) {
      setTodos([]);
      return;
    }
    fetch(`${API_URL}/by-date?date=${dueDate}`)
      .then(res => res.json())
      .then(data => setTodos(data))
      .catch(err => console.error(err));
  };

  // ✅ Delete Task (only if completed)
  const deleteTask = (id) => {
    if (!window.confirm("Delete this completed task?")) return;
    fetch(`${API_URL}/${id}`, { method: "DELETE" })
      .then(searchByDate)
      .catch(err => console.error(err));
  };

  // ✅ Edit Task
  const editTask = (todo) => {
    setTask(todo.title);
    setDueDate(todo.dueDate || "");
    setEditId(todo.id);
  };

  const cancelEdit = () => {
    setEditId(null);
    setTask("");
  };

  const handleKey = (e) => {
    if (e.key === "Enter") addTask();
    if (e.key === "Escape") cancelEdit();
  };

  const pendingCount = todos.filter(t => !t.completed).length;
  const doneCount = todos.filter(t => t.completed).length;
  const sortedTodos = [...todos].sort((a, b) => a.completed - b.completed);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          font-family: 'Plus Jakarta Sans', sans-serif;
          background: #1A1A1A;
          min-height: 100vh;
        }

        .page {
          min-height: 100vh;
          background: #1A1A1A;
          display: flex;
          justify-content: center;
          align-items: flex-start;
          padding: 48px 16px 80px;
        }

        .card {
          width: 100%;
          max-width: 520px;
          background: #222222;
          border-radius: 24px;
          padding: 32px 28px;
          border: 1px solid #2E2E2E;
          box-shadow:
            0 0 0 1px rgba(212,175,55,0.06),
            0 8px 40px rgba(0,0,0,0.5),
            0 0 80px rgba(212,175,55,0.04);
        }

        /* Header */
        .header {
          margin-bottom: 28px;
          text-align: center;
        }

        .app-title {
          font-size: 30px;
          font-weight: 700;
          color: #F0EDE8;
          letter-spacing: -0.5px;
        }

        .app-title span {
          color: #D4AF37;
          text-shadow: 0 0 20px rgba(212,175,55,0.4);
        }

        .divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, #3A3228, transparent);
          margin: 16px 0 0;
        }

        .stats-row {
          display: flex;
          justify-content: center;
          gap: 12px;
          margin-top: 14px;
        }

        .stat-pill {
          font-size: 12px;
          font-weight: 600;
          padding: 5px 14px;
          border-radius: 99px;
          background: rgba(212,175,55,0.1);
          color: #D4AF37;
          border: 1px solid rgba(212,175,55,0.2);
        }

        .stat-pill.done {
          background: rgba(134,176,120,0.1);
          color: #86B078;
          border: 1px solid rgba(134,176,120,0.2);
        }

        /* Input section */
        .input-section {
          background: #1C1C1C;
          border: 1px solid #2E2E2E;
          border-radius: 16px;
          padding: 16px;
          margin-bottom: 24px;
        }

        .input-row {
          display: flex;
          gap: 8px;
          margin-bottom: 10px;
        }

        .task-input {
          flex: 1;
          padding: 11px 14px;
          border: 1px solid #333333;
          border-radius: 10px;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 14px;
          color: #E8E0D0;
          background: #222222;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
        }

        .task-input::placeholder { color: #444444; }

        .task-input:focus {
          border-color: #D4AF37;
          box-shadow: 0 0 0 3px rgba(212,175,55,0.12);
        }

        .add-btn {
          padding: 11px 22px;
          background: #D4AF37;
          border: none;
          border-radius: 10px;
          color: #1A1A1A;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-weight: 700;
          font-size: 14px;
          cursor: pointer;
          transition: background 0.15s, box-shadow 0.15s, transform 0.1s;
          white-space: nowrap;
          box-shadow: 0 0 16px rgba(212,175,55,0.25);
        }

        .add-btn:hover {
          background: #C9A227;
          box-shadow: 0 0 24px rgba(212,175,55,0.4);
        }

        .add-btn:active { transform: scale(0.97); }

        .add-btn.updating {
          background: #86B078;
          color: #1A1A1A;
          box-shadow: 0 0 16px rgba(134,176,120,0.25);
        }

        .add-btn.updating:hover {
          background: #74A066;
          box-shadow: 0 0 24px rgba(134,176,120,0.4);
        }

        .date-row {
          display: flex;
          gap: 8px;
          align-items: center;
        }

        .date-input {
          flex: 1;
          padding: 9px 12px;
          border: 1px solid #333333;
          border-radius: 10px;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 13px;
          color: #E8E0D0;
          background: #222222;
          outline: none;
          cursor: pointer;
          transition: border-color 0.2s, box-shadow 0.2s;
          color-scheme: dark;
        }

        .date-input:focus {
          border-color: #D4AF37;
          box-shadow: 0 0 0 3px rgba(212,175,55,0.12);
        }

        .search-btn {
          padding: 9px 16px;
          background: transparent;
          border: 1px solid #333333;
          border-radius: 10px;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 13px;
          font-weight: 500;
          color: #666666;
          cursor: pointer;
          transition: all 0.15s;
          white-space: nowrap;
        }

        .search-btn:hover {
          border-color: #D4AF37;
          color: #D4AF37;
          background: rgba(212,175,55,0.08);
        }

        .cancel-btn {
          padding: 9px 14px;
          background: transparent;
          border: 1px solid #333333;
          border-radius: 10px;
          font-size: 13px;
          font-weight: 500;
          color: #666666;
          cursor: pointer;
          transition: all 0.15s;
        }

        .cancel-btn:hover {
          border-color: #C0392B;
          color: #E57373;
          background: rgba(192,57,43,0.08);
        }

        /* List */
        .list-header {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #3A3A3A;
          margin-bottom: 12px;
        }

        .todo-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .todo-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 13px 15px;
          background: #1C1C1C;
          border: 1px solid #2E2E2E;
          border-radius: 12px;
          transition: all 0.18s;
        }

        .todo-item:hover {
          border-color: #D4AF37;
          background: #202018;
          box-shadow: 0 0 16px rgba(212,175,55,0.08), inset 0 0 16px rgba(212,175,55,0.02);
        }

        .todo-item.done-item {
          opacity: 0.45;
          border-color: #272727;
        }

        .todo-item.done-item:hover {
          opacity: 0.65;
          border-color: #2E2E2E;
          box-shadow: none;
        }

        /* Custom checkbox */
        .check-wrap {
          width: 20px;
          height: 20px;
          border-radius: 6px;
          border: 2px solid #383838;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          flex-shrink: 0;
          transition: all 0.18s;
          background: transparent;
        }

        .check-wrap:hover {
          border-color: #D4AF37;
          box-shadow: 0 0 8px rgba(212,175,55,0.25);
        }

        .check-wrap.checked {
          background: #D4AF37;
          border-color: #D4AF37;
          box-shadow: 0 0 10px rgba(212,175,55,0.35);
        }

        .check-icon {
          color: #1A1A1A;
          font-size: 11px;
          font-weight: 800;
          line-height: 1;
        }

        .todo-text {
          flex: 1;
          font-size: 14px;
          font-weight: 400;
          color: #D8D0C0;
          line-height: 1.4;
        }

        .todo-text.striked {
          text-decoration: line-through;
          color: #3A3A3A;
        }

        .due-tag {
          font-size: 11px;
          font-weight: 500;
          color: #8A7840;
          background: rgba(212,175,55,0.08);
          border: 1px solid rgba(212,175,55,0.14);
          padding: 3px 8px;
          border-radius: 6px;
          white-space: nowrap;
          flex-shrink: 0;
        }

        .item-actions {
          display: flex;
          gap: 5px;
          flex-shrink: 0;
          opacity: 0;
          transition: opacity 0.15s;
        }

        .todo-item:hover .item-actions { opacity: 1; }

        .icon-btn {
          width: 30px;
          height: 30px;
          border: 1px solid #2E2E2E;
          border-radius: 8px;
          background: #222222;
          cursor: pointer;
          font-size: 13px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.15s;
          color: #3A3A3A;
        }

        .icon-btn:hover {
          border-color: #D4AF37;
          color: #D4AF37;
          background: rgba(212,175,55,0.1);
          box-shadow: 0 0 8px rgba(212,175,55,0.15);
        }

        .icon-btn.del-btn:hover {
          border-color: #C0392B;
          color: #E57373;
          background: rgba(192,57,43,0.1);
          box-shadow: 0 0 8px rgba(192,57,43,0.15);
        }

        .icon-btn:disabled {
          opacity: 0.15;
          cursor: not-allowed;
          pointer-events: none;
        }

        /* Empty state */
        .empty {
          text-align: center;
          padding: 44px 20px;
          color: #333333;
          font-size: 14px;
        }

        .empty-icon {
          font-size: 32px;
          margin-bottom: 10px;
          filter: grayscale(1) opacity(0.3);
        }
      `}</style>

      <div className="page">
        <div className="card">

          {/* Header */}
          <div className="header">
            <h1 className="app-title">Smart <span>Todo</span></h1>
            <div className="divider" />
            {todos.length > 0 && (
              <div className="stats-row">
                <span className="stat-pill">{pendingCount} pending</span>
                <span className="stat-pill done">{doneCount} done</span>
              </div>
            )}
          </div>

          {/* Input Section */}
          <div className="input-section">
            <div className="input-row">
              <input
                className="task-input"
                value={task}
                onChange={e => setTask(e.target.value)}
                onKeyDown={handleKey}
                placeholder={editId !== null ? "Edit task title…" : "What needs to be done?"}
              />
              <button
                className={`add-btn${editId !== null ? " updating" : ""}`}
                onClick={addTask}
              >
                {editId !== null ? "Update" : "Add"}
              </button>
              {editId !== null && (
                <button className="cancel-btn" onClick={cancelEdit}>✕</button>
              )}
            </div>

            <div className="date-row">
              <input
                type="date"
                className="date-input"
                value={dueDate}
                onChange={(e) => {
                  const selectedDate = e.target.value;
                  setDueDate(selectedDate);
                  if (!selectedDate) {
                    setTodos([]);
                    return;
                  }
                  fetch(`${API_URL}/by-date?date=${selectedDate}`)
                    .then(res => res.json())
                    .then(data => setTodos(data))
                    .catch(err => console.error(err));
                }}
              />
              <button className="search-btn" onClick={searchByDate}>
                🔍 Search
              </button>
            </div>
          </div>

          {/* Task List */}
          {todos.length > 0 && (
            <div className="list-header">Tasks</div>
          )}

          <ul className="todo-list">
            {sortedTodos.length === 0 ? (
              <div className="empty">
                <div className="empty-icon">📋</div>
                Select a date to view tasks
              </div>
            ) : (
              sortedTodos.map(todo => (
                <li
                  key={todo.id}
                  className={`todo-item${todo.completed ? " done-item" : ""}`}
                >
                  <div
                    className={`check-wrap${todo.completed ? " checked" : ""}`}
                    onClick={() => toggleTask(todo)}
                  >
                    {todo.completed && <span className="check-icon">✓</span>}
                  </div>

                  <span className={`todo-text${todo.completed ? " striked" : ""}`}>
                    {todo.title}
                  </span>

                  {todo.dueDate && (
                    <span className="due-tag">📅 {todo.dueDate}</span>
                  )}

                  <div className="item-actions">
                    <button
                      className="icon-btn"
                      onClick={() => editTask(todo)}
                      title="Edit"
                    >✏️</button>
                    <button
                      className="icon-btn del-btn"
                      onClick={() => deleteTask(todo.id)}
                      disabled={!todo.completed}
                      title={todo.completed ? "Delete" : "Complete first to delete"}
                    >🗑️</button>
                  </div>
                </li>
              ))
            )}
          </ul>

        </div>
      </div>
    </>
  );
}

export default App;