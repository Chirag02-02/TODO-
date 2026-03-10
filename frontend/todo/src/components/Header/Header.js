import React from "react";
import "./Header.css";

// Displays the app title, divider line, and pending/done task counters
function Header({ pendingCount, doneCount, showStats }) {
  return (
    <div className="header">
      <h1 className="app-title">
        Smart <span>Todo</span>
      </h1>
      <div className="divider" />
      {showStats && (
        <div className="stats-row">
          <span className="stat-pill">{pendingCount} pending</span>
          <span className="stat-pill done">{doneCount} done</span>
        </div>
      )}
    </div>
  );
}

export default Header;
